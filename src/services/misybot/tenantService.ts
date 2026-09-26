// src/services/misybot/tenantService.ts
// Tenant service for Misybot integration

import axios from 'axios';
import { getAccessToken } from '@/lib/tokenManager';

const tenantApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

tenantApiClient.interceptors.request.use(
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

export interface Tenant {
  id: string;
  name: string;
  domain?: string;
  plan: 'FREE' | 'CREATOR' | 'PRO';
  plan_start_date?: string;
  plan_end_date?: string;
  plan_auto_renew: boolean;
  status: 'active' | 'suspended' | 'trial';
  created_at: string;
  updated_at: string;
  settings?: {
    timezone?: string;
    language?: string;
    currency?: string;
    notifications?: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
}

export interface UpdateTenantDto {
  name?: string;
  domain?: string;
  settings?: Tenant['settings'];
}

export interface TenantSubscription {
  plan: Tenant['plan'];
  start_date: string;
  end_date: string;
  auto_renew: boolean;
  status: 'active' | 'expired' | 'cancelled';
}

/**
 * Get current tenant information
 */
export async function getCurrentTenant(): Promise<Tenant> {
  try {
    const tenantId = localStorage.getItem('tenant_id');
    const response = await tenantApiClient.get(`/api/tenants/${tenantId}`);
    return response.data;
  } catch (error) {
    console.error('Get current tenant error:', error);
    throw error;
  }
}

/**
 * Update tenant information
 */
export async function updateTenant(data: UpdateTenantDto): Promise<Tenant> {
  try {
    const tenantId = localStorage.getItem('tenant_id');
    const response = await tenantApiClient.put(`/api/tenants/${tenantId}`, data);
    return response.data;
  } catch (error) {
    console.error('Update tenant error:', error);
    throw error;
  }
}

/**
 * Get tenant subscription status
 */
export async function getSubscriptionStatus(): Promise<TenantSubscription> {
  try {
    const response = await tenantApiClient.get('/subscriptions/status');
    return response.data;
  } catch (error) {
    console.error('Get subscription status error:', error);
    throw error;
  }
}

/**
 * Cancel auto-renewal
 */
export async function cancelAutoRenewal(): Promise<void> {
  try {
    await tenantApiClient.post('/subscriptions/cancel-auto-renewal');
  } catch (error) {
    console.error('Cancel auto-renewal error:', error);
    throw error;
  }
}

/**
 * Enable auto-renewal
 */
export async function enableAutoRenewal(): Promise<void> {
  try {
    await tenantApiClient.post('/subscriptions/enable-auto-renewal');
  } catch (error) {
    console.error('Enable auto-renewal error:', error);
    throw error;
  }
}

export default {
  getCurrentTenant,
  updateTenant,
  getSubscriptionStatus,
  cancelAutoRenewal,
  enableAutoRenewal,
};
