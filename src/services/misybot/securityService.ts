// src/services/misybot/securityService.ts
// Security service for Misybot integration

import axios from 'axios';
import { getAccessToken } from '@/lib/tokenManager';

const securityApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

securityApiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    const tenantId = localStorage.getItem('tenant_id') || process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID;
    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  prefix: string;
  status: 'active' | 'revoked';
  created_at: string;
  last_used_at?: string;
  expires_at?: string;
}

export interface CreateApiKeyDto {
  name: string;
  expires_in_days?: number;
}

export interface SecurityLog {
  id: string;
  event_type: 'login' | 'logout' | 'failed_login' | 'api_key_used' | 'password_change' | 'suspicious_activity';
  user_id?: string;
  ip_address: string;
  user_agent: string;
  details?: Record<string, any>;
  created_at: string;
}

/**
 * Get all API keys
 */
export async function getApiKeys(): Promise<ApiKey[]> {
  try {
    const response = await securityApiClient.get('/api/api-keys');
    return response.data;
  } catch (error) {
    console.error('Get API keys error:', error);
    throw error;
  }
}

/**
 * Create new API key
 */
export async function createApiKey(data: CreateApiKeyDto): Promise<ApiKey> {
  try {
    const response = await securityApiClient.post('/api/api-keys', data);
    return response.data;
  } catch (error) {
    console.error('Create API key error:', error);
    throw error;
  }
}

/**
 * Revoke API key
 */
export async function revokeApiKey(keyId: string): Promise<void> {
  try {
    await securityApiClient.delete(`/api/api-keys/${keyId}`);
  } catch (error) {
    console.error('Revoke API key error:', error);
    throw error;
  }
}

/**
 * Get security logs
 */
export async function getSecurityLogs(params?: {
  page?: number;
  limit?: number;
  event_type?: string;
}): Promise<{ logs: SecurityLog[]; total: number }> {
  try {
    const response = await securityApiClient.get('/api/security/logs', { params });
    return response.data;
  } catch (error) {
    console.error('Get security logs error:', error);
    throw error;
  }
}

/**
 * Get login attempts
 */
export async function getLoginAttempts(params?: {
  page?: number;
  limit?: number;
  status?: 'success' | 'failed';
}): Promise<{ attempts: SecurityLog[]; total: number }> {
  try {
    const response = await securityApiClient.get('/api/security/login-attempts', { params });
    return response.data;
  } catch (error) {
    console.error('Get login attempts error:', error);
    throw error;
  }
}

/**
 * Enable 2FA
 */
export async function enable2FA(): Promise<{ qr_code: string; secret: string }> {
  try {
    const response = await securityApiClient.post('/api/security/2fa/enable');
    return response.data;
  } catch (error) {
    console.error('Enable 2FA error:', error);
    throw error;
  }
}

/**
 * Verify 2FA
 */
export async function verify2FA(code: string): Promise<boolean> {
  try {
    const response = await securityApiClient.post('/api/security/2fa/verify', { code });
    return response.data.verified;
  } catch (error) {
    console.error('Verify 2FA error:', error);
    throw error;
  }
}

/**
 * Disable 2FA
 */
export async function disable2FA(): Promise<void> {
  try {
    await securityApiClient.post('/api/security/2fa/disable');
  } catch (error) {
    console.error('Disable 2FA error:', error);
    throw error;
  }
}

export default {
  getApiKeys,
  createApiKey,
  revokeApiKey,
  getSecurityLogs,
  getLoginAttempts,
  enable2FA,
  verify2FA,
  disable2FA,
};
