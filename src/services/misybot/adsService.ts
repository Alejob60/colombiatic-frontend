// src/services/misybot/adsService.ts
// Ads Management Service

import { apiClient } from '@/lib/apiClient';

// Types for ads management
export interface Campaign {
  id: string;
  name: string;
  objective: string;
  budget: number;
  status: 'active' | 'paused' | 'completed' | 'draft';
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface Creative {
  id: string;
  campaign_id: string;
  name: string;
  type: 'image' | 'text';
  content: string;
  url?: string;
  size?: string;
  created_at: string;
}

export interface CampaignPerformance {
  campaign_id: string;
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

export interface BillingInfo {
  balance: number;
  monthly_spending: number;
  credits: number;
  last_payment?: string;
}

export interface CreateCampaignRequest {
  name: string;
  objective: string;
  budget: number;
  start_date: string;
  end_date: string;
  targeting: {
    audience: string;
    locations: string[];
    devices: string[];
  };
}

export interface AllocateBudgetRequest {
  campaign_id: string;
  amount: number;
}

/**
 * Create a new ad campaign
 */
export async function createCampaign(request: CreateCampaignRequest): Promise<Campaign> {
  try {
    const response = await apiClient.post<Campaign>('/ads/campaigns', request);
    return response.data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
}

/**
 * Get campaign details
 */
export async function getCampaign(id: string): Promise<Campaign> {
  try {
    const response = await apiClient.get<Campaign>(`/ads/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaign:', error);
    throw error;
  }
}

/**
 * Update campaign status (pause/resume)
 */
export async function updateCampaignStatus(id: string, status: 'active' | 'paused'): Promise<Campaign> {
  try {
    const response = await apiClient.put<Campaign>(`/ads/campaigns/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating campaign status:', error);
    throw error;
  }
}

/**
 * Allocate budget to a campaign
 */
export async function allocateBudget(request: AllocateBudgetRequest): Promise<void> {
  try {
    await apiClient.post<void>('/ads/allocate-budget', request);
  } catch (error) {
    console.error('Error allocating budget:', error);
    throw error;
  }
}

/**
 * Get campaign performance report
 */
export async function getCampaignReport(campaignId: string, startDate?: string, endDate?: string): Promise<CampaignPerformance[]> {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    const response = await apiClient.get<CampaignPerformance[]>(`/ads/report?campaign_id=${campaignId}&${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaign report:', error);
    throw error;
  }
}

/**
 * Get user billing information
 */
export async function getBillingInfo(): Promise<BillingInfo> {
  try {
    const response = await apiClient.get<BillingInfo>('/ads/billing');
    return response.data;
  } catch (error) {
    console.error('Error fetching billing info:', error);
    throw error;
  }
}

/**
 * Add funds to account
 */
export async function addFunds(amount: number): Promise<BillingInfo> {
  try {
    const response = await apiClient.post<BillingInfo>('/ads/billing/add-funds', { amount });
    return response.data;
  } catch (error) {
    console.error('Error adding funds:', error);
    throw error;
  }
}

export default {
  createCampaign,
  getCampaign,
  updateCampaignStatus,
  allocateBudget,
  getCampaignReport,
  getBillingInfo,
  addFunds
};