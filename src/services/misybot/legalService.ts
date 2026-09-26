// src/services/misybot/legalService.ts
// Legal service for Misybot integration

import { apiClient } from '@/lib/apiClient';

export interface LegalDocument {
  id: string;
  title: string;
  content: string;
  type: 'terms' | 'privacy' | 'cookies' | 'compliance';
  version: string;
  created_at: string;
  updated_at: string;
}

/**
 * Get legal document by type
 */
export async function getLegalDocument(type: string): Promise<LegalDocument> {
  try {
    const response = await apiClient.get<LegalDocument>(`/legal/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type} document:`, error);
    throw error;
  }
}

/**
 * Get terms of service
 */
export async function getTermsOfService(): Promise<LegalDocument> {
  return getLegalDocument('terms');
}

/**
 * Get privacy policy
 */
export async function getPrivacyPolicy(): Promise<LegalDocument> {
  return getLegalDocument('privacy');
}

/**
 * Get cookie policy
 */
export async function getCookiePolicy(): Promise<LegalDocument> {
  return getLegalDocument('cookies');
}

/**
 * Get compliance information
 */
export async function getComplianceInfo(): Promise<LegalDocument> {
  return getLegalDocument('compliance');
}

export default {
  getLegalDocument,
  getTermsOfService,
  getPrivacyPolicy,
  getCookiePolicy,
  getComplianceInfo
};