// src/hooks/useConsent.ts
// Custom hook for consent management

import { useState, useEffect } from 'react';
import * as consentService from '@/services/misybot/consentService';

export interface ConsentState {
  consentHistory: consentService.ConsentHistory[];
  loading: boolean;
  error: string | null;
}

export const useConsent = (userId: string) => {
  const [state, setState] = useState<ConsentState>({
    consentHistory: [],
    loading: false,
    error: null
  });

  useEffect(() => {
    if (userId) {
      fetchConsentHistory();
    }
  }, [userId]);

  const fetchConsentHistory = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const consentHistory = await consentService.getConsentHistory(userId);
      
      setState(prev => ({
        ...prev,
        consentHistory,
        loading: false,
        error: null
      }));
    } catch (error) {
      console.error('Error fetching consent history:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch consent history'
      }));
    }
  };

  const recordConsent = async (
    consentType: string, 
    granted: boolean, 
    details?: Record<string, any>
  ) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const consentRecord = await consentService.recordConsent({
        user_id: userId,
        consent_type: consentType,
        granted,
        details
      });
      
      // Refresh consent history
      await fetchConsentHistory();
      
      return consentRecord;
    } catch (error) {
      console.error('Error recording consent:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to record consent'
      }));
      throw error;
    }
  };

  const getConsentStatus = async (consentType: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const status = await consentService.getConsentStatus(userId, consentType);
      
      setState(prev => ({ ...prev, loading: false, error: null }));
      
      return status;
    } catch (error) {
      console.error('Error fetching consent status:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch consent status'
      }));
      throw error;
    }
  };

  const withdrawConsent = async (consentType: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      await consentService.withdrawConsent(userId, consentType);
      
      // Refresh consent history
      await fetchConsentHistory();
    } catch (error) {
      console.error('Error withdrawing consent:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to withdraw consent'
      }));
      throw error;
    }
  };

  return {
    ...state,
    recordConsent,
    getConsentStatus,
    withdrawConsent,
    fetchConsentHistory
  };
};

export default useConsent;