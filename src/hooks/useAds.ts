// src/hooks/useAds.ts
// Custom hook for ads management

import { useState, useEffect } from 'react';
import * as adsService from '@/services/misybot/adsService';

export interface AdsState {
  campaigns: adsService.Campaign[];
  billingInfo: adsService.BillingInfo | null;
  loading: boolean;
  error: string | null;
}

export const useAds = () => {
  const [state, setState] = useState<AdsState>({
    campaigns: [],
    billingInfo: null,
    loading: false,
    error: null
  });

  const fetchCampaigns = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would fetch from the API
      // const campaigns = await adsService.getCampaigns();
      // For now, we'll use mock data
      const mockCampaigns: adsService.Campaign[] = [
        {
          id: '1',
          name: 'Summer Promotion',
          objective: 'awareness',
          budget: 500,
          status: 'active',
          start_date: '2025-11-01',
          end_date: '2025-11-30',
          created_at: '2025-10-25',
          updated_at: '2025-11-01'
        },
        {
          id: '2',
          name: 'Black Friday Deal',
          objective: 'conversion',
          budget: 1000,
          status: 'paused',
          start_date: '2025-11-20',
          end_date: '2025-11-30',
          created_at: '2025-11-01',
          updated_at: '2025-11-20'
        }
      ];
      
      setState(prev => ({
        ...prev,
        campaigns: mockCampaigns,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch campaigns'
      }));
    }
  };

  const fetchBillingInfo = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would fetch from the API
      // const billingInfo = await adsService.getBillingInfo();
      // For now, we'll use mock data
      const mockBillingInfo: adsService.BillingInfo = {
        balance: 1250.75,
        monthly_spending: 890.50,
        credits: 2450
      };
      
      setState(prev => ({
        ...prev,
        billingInfo: mockBillingInfo,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching billing info:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch billing information'
      }));
    }
  };

  const createCampaign = async (request: adsService.CreateCampaignRequest) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // const campaign = await adsService.createCampaign(request);
      // For now, we'll simulate the creation
      const newCampaign: adsService.Campaign = {
        id: Date.now().toString(),
        ...request,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setState(prev => ({
        ...prev,
        campaigns: [...prev.campaigns, newCampaign],
        loading: false
      }));
      
      return newCampaign;
    } catch (error) {
      console.error('Error creating campaign:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to create campaign'
      }));
      throw error;
    }
  };

  const updateCampaignStatus = async (id: string, status: 'active' | 'paused') => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // const updatedCampaign = await adsService.updateCampaignStatus(id, status);
      // For now, we'll simulate the update
      const updatedCampaigns = state.campaigns.map(campaign => 
        campaign.id === id ? { ...campaign, status, updated_at: new Date().toISOString() } : campaign
      );
      
      setState(prev => ({
        ...prev,
        campaigns: updatedCampaigns,
        loading: false
      }));
      
      return updatedCampaigns.find(c => c.id === id) || null;
    } catch (error) {
      console.error('Error updating campaign status:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to update campaign status'
      }));
      throw error;
    }
  };

  const addFunds = async (amount: number) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // const updatedBillingInfo = await adsService.addFunds(amount);
      // For now, we'll simulate the update
      const updatedBillingInfo = state.billingInfo 
        ? { 
            ...state.billingInfo, 
            balance: state.billingInfo.balance + amount,
            credits: state.billingInfo.credits + Math.floor(amount * 10)
          }
        : null;
      
      setState(prev => ({
        ...prev,
        billingInfo: updatedBillingInfo,
        loading: false
      }));
      
      return updatedBillingInfo;
    } catch (error) {
      console.error('Error adding funds:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to add funds'
      }));
      throw error;
    }
  };

  return {
    ...state,
    fetchCampaigns,
    fetchBillingInfo,
    createCampaign,
    updateCampaignStatus,
    addFunds
  };
};

export default useAds;