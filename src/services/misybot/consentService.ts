// src/services/misybot/consentService.ts
// Consent management service for legal compliance

import { apiClient } from '@/lib/apiClient';

// Types for consent management
export interface ConsentRecord {
  id: string;
  user_id: string;
  consent_type: string;
  granted: boolean;
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
  details?: Record<string, any>;
}

export interface ConsentRequest {
  user_id: string;
  consent_type: string;
  granted: boolean;
  details?: Record<string, any>;
}

export interface ConsentHistory {
  consent_type: string;
  granted: boolean;
  timestamp: string;
  details?: Record<string, any>;
}

/**
 * Record user consent
 */
export async function recordConsent(request: ConsentRequest): Promise<ConsentRecord> {
  try {
    const response = await apiClient.post<ConsentRecord>('/consent/record', request);
    return response.data;
  } catch (error) {
    console.error('Error recording consent:', error);
    throw error;
  }
}

/**
 * Get user consent history
 */
export async function getConsentHistory(userId: string): Promise<ConsentHistory[]> {
  try {
    const response = await apiClient.get<ConsentHistory[]>(`/consent/history/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching consent history:', error);
    throw error;
  }
}

/**
 * Get specific consent status
 */
export async function getConsentStatus(userId: string, consentType: string): Promise<boolean> {
  try {
    const response = await apiClient.get<{ granted: boolean }>(`/consent/status/${userId}/${consentType}`);
    return response.data.granted;
  } catch (error) {
    console.error('Error fetching consent status:', error);
    throw error;
  }
}

/**
 * Withdraw consent
 */
export async function withdrawConsent(userId: string, consentType: string): Promise<void> {
  try {
    await apiClient.post(`/consent/withdraw`, { user_id: userId, consent_type: consentType });
  } catch (error) {
    console.error('Error withdrawing consent:', error);
    throw error;
  }
}

export default {
  recordConsent,
  getConsentHistory,
  getConsentStatus,
  withdrawConsent
};