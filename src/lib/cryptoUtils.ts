// src/lib/cryptoUtils.ts
// Cryptographic utilities for secure token storage

/**
 * Generate a random key for encryption
 * @returns A random string suitable for use as an encryption key
 */
export function generateRandomKey(length: number = 32): string {
  const array = new Uint8Array(length);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback for environments without crypto support
    for (let i = 0; i < length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Simple XOR encryption with a key
 * @param text - Text to encrypt
 * @param key - Encryption key
 * @returns Encrypted text
 */
export function xorEncrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

/**
 * Simple XOR decryption with a key
 * @param encryptedText - Text to decrypt
 * @param key - Decryption key
 * @returns Decrypted text
 */
export function xorDecrypt(encryptedText: string, key: string): string {
  return xorEncrypt(encryptedText, key); // XOR is symmetric
}

/**
 * Encode binary data to base64
 * @param data - Data to encode
 * @returns Base64 encoded string
 */
export function base64Encode(data: string): string {
  try {
    return btoa(encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  } catch (error) {
    console.error('Base64 encoding error:', error);
    return data;
  }
}

/**
 * Decode base64 data
 * @param data - Base64 encoded data
 * @returns Decoded string
 */
export function base64Decode(data: string): string {
  try {
    return decodeURIComponent(atob(data).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (error) {
    console.error('Base64 decoding error:', error);
    return data;
  }
}

/**
 * Securely store data in localStorage with encryption
 * @param key - localStorage key
 * @param data - Data to store
 * @param encryptionKey - Encryption key
 */
export function secureSetItem(key: string, data: string, encryptionKey: string): void {
  try {
    // Encrypt the data
    const encryptedData = xorEncrypt(data, encryptionKey);
    // Encode to base64 for safe storage
    const encodedData = base64Encode(encryptedData);
    // Store in localStorage
    localStorage.setItem(key, encodedData);
  } catch (error) {
    console.error('Error securely storing data:', error);
  }
}

/**
 * Securely retrieve data from localStorage with decryption
 * @param key - localStorage key
 * @param encryptionKey - Decryption key
 * @returns Decrypted data or null if not found
 */
export function secureGetItem(key: string, encryptionKey: string): string | null {
  try {
    // Retrieve from localStorage
    const encodedData = localStorage.getItem(key);
    if (!encodedData) {
      return null;
    }
    // Decode from base64
    const encryptedData = base64Decode(encodedData);
    // Decrypt the data
    const decryptedData = xorDecrypt(encryptedData, encryptionKey);
    return decryptedData;
  } catch (error) {
    console.error('Error securely retrieving data:', error);
    // Clear invalid data
    localStorage.removeItem(key);
    return null;
  }
}

/**
 * Securely remove data from localStorage
 * @param key - localStorage key
 */
export function secureRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing secure data:', error);
  }
}

export default {
  generateRandomKey,
  xorEncrypt,
  xorDecrypt,
  base64Encode,
  base64Decode,
  secureSetItem,
  secureGetItem,
  secureRemoveItem
};