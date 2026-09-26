// src/lib/tokenManager.ts
// Secure token management using localStorage with encryption

import { isSecureContext } from '@/lib/securityUtils';
import { 
  generateRandomKey, 
  xorEncrypt, 
  xorDecrypt, 
  base64Encode, 
  base64Decode 
} from '@/lib/cryptoUtils';

// Storage keys
const TOKEN_STORAGE_KEY = 'colombiatic_auth_tokens';
const ENCRYPTION_KEY_STORAGE = 'colombiatic_encryption_key';

// Get or generate encryption key
function getEncryptionKey(): string {
  try {
    // Try to retrieve existing encryption key
    let encryptionKey: string | null = localStorage.getItem(ENCRYPTION_KEY_STORAGE);
    
    if (!encryptionKey) {
      // Generate new encryption key
      encryptionKey = generateRandomKey(32);
      // Store it securely
      if (encryptionKey) {
        localStorage.setItem(ENCRYPTION_KEY_STORAGE, encryptionKey);
      }
    }
    
    return encryptionKey || 'colombiatic_static_encryption_key_2025';
  } catch (error) {
    console.error('Error getting encryption key:', error);
    // Fallback to a static key (less secure)
    return 'colombiatic_static_encryption_key_2025';
  }
}

// Token data structure
export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  userId?: string;
}

/**
 * Store authentication tokens securely in localStorage
 * @param tokens - Authentication tokens to store
 */
export function storeTokens(tokens: AuthTokens): void {
  try {
    if (!isSecureContext()) {
      console.warn('Not in secure context, tokens will not be stored');
      return;
    }

    // Add expiration time (24 hours from now)
    const tokenData = {
      ...tokens,
      expiresAt: tokens.expiresAt || Date.now() + 24 * 60 * 60 * 1000
    };

    // Get encryption key
    const encryptionKey = getEncryptionKey();
    
    // Encrypt the token data
    const jsonData = JSON.stringify(tokenData);
    const encryptedData = xorEncrypt(jsonData, encryptionKey);
    const encodedData = base64Encode(encryptedData);
    
    // Store in localStorage
    localStorage.setItem(TOKEN_STORAGE_KEY, encodedData);
    
    console.log('Tokens stored securely');
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
}

/**
 * Retrieve authentication tokens from localStorage
 * @returns AuthTokens or null if not found or expired
 */
export function getTokens(): AuthTokens | null {
  try {
    if (!isSecureContext()) {
      console.warn('Not in secure context, cannot retrieve tokens');
      return null;
    }

    // Get encryption key
    const encryptionKey = getEncryptionKey();
    
    // Retrieve encoded data from localStorage
    const encodedData = localStorage.getItem(TOKEN_STORAGE_KEY);
    
    if (!encodedData) {
      return null;
    }

    // Decode and decrypt the data
    const encryptedData = base64Decode(encodedData);
    const decryptedData = xorDecrypt(encryptedData, encryptionKey);
    
    if (!decryptedData) {
      // If decryption fails, clear the storage
      clearTokens();
      return null;
    }

    // Parse the token data
    const tokenData: AuthTokens = JSON.parse(decryptedData);
    
    // Check if tokens are expired
    if (tokenData.expiresAt && tokenData.expiresAt < Date.now()) {
      // Tokens expired, clear them
      clearTokens();
      return null;
    }
    
    return tokenData;
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    // Clear invalid data
    clearTokens();
    return null;
  }
}

/**
 * Clear authentication tokens from localStorage
 */
export function clearTokens(): void {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    console.log('Tokens cleared');
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
}

/**
 * Check if user is authenticated
 * @returns boolean indicating if user is authenticated
 */
export function isAuthenticated(): boolean {
  try {
    const tokens = getTokens();
    return tokens !== null && 
           tokens.accessToken !== undefined && 
           tokens.accessToken !== null &&
           tokens.accessToken.length > 0;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
}

/**
 * Get access token
 * @returns Access token or null if not available
 */
export function getAccessToken(): string | null {
  try {
    const tokens = getTokens();
    return tokens?.accessToken || null;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}

/**
 * Get refresh token
 * @returns Refresh token or null if not available
 */
export function getRefreshToken(): string | null {
  try {
    const tokens = getTokens();
    return tokens?.refreshToken || null;
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
}

/**
 * Update access token
 * @param newToken - New access token
 */
export function updateAccessToken(newToken: string): void {
  try {
    const tokens = getTokens();
    if (tokens) {
      tokens.accessToken = newToken;
      storeTokens(tokens);
    }
  } catch (error) {
    console.error('Error updating access token:', error);
  }
}

/**
 * Update refresh token
 * @param newToken - New refresh token
 */
export function updateRefreshToken(newToken: string): void {
  try {
    const tokens = getTokens();
    if (tokens) {
      tokens.refreshToken = newToken;
      storeTokens(tokens);
    }
  } catch (error) {
    console.error('Error updating refresh token:', error);
  }
}

/**
 * Refresh token middleware
 * @returns Promise that resolves when token is refreshed
 */
export async function refreshTokenMiddleware(): Promise<boolean> {
  try {
    // Import the refresh function dynamically to avoid circular dependencies
    const { refreshToken } = await import('@/services/misybot/authService');
    const result = await refreshToken();
    return result.success;
  } catch (error) {
    console.error('Token refresh middleware error:', error);
    clearTokens();
    return false;
  }
}

export default {
  storeTokens,
  getTokens,
  clearTokens,
  isAuthenticated,
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
  updateRefreshToken,
  refreshTokenMiddleware
};