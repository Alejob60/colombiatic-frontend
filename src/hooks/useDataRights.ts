// src/hooks/useDataRights.ts
// Custom hook for data rights management

import { useState } from 'react';
import * as dataRightsService from '@/services/misybot/dataRightsService';

export interface DataRightsState {
  loading: boolean;
  error: string | null;
  exportRequestId: string | null;
  deletionRequestId: string | null;
  exportStatus: dataRightsService.DataExportResponse | null;
  deletionStatus: dataRightsService.DataDeletionResponse | null;
}

export const useDataRights = (userId: string) => {
  const [state, setState] = useState<DataRightsState>({
    loading: false,
    error: null,
    exportRequestId: null,
    deletionRequestId: null,
    exportStatus: null,
    deletionStatus: null
  });

  const requestExport = async (request: Omit<dataRightsService.DataExportRequest, 'user_id'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const exportRequest: dataRightsService.DataExportRequest = {
        ...request,
        user_id: userId
      };
      
      const response = await dataRightsService.requestDataExport(exportRequest);
      
      setState(prev => ({
        ...prev,
        loading: false,
        exportRequestId: response.request_id,
        exportStatus: response
      }));
      
      return response;
    } catch (error) {
      console.error('Error requesting data export:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to request data export';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      throw error;
    }
  };

  const requestDeletion = async (request: Omit<dataRightsService.DataDeletionRequest, 'user_id'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const deletionRequest: dataRightsService.DataDeletionRequest = {
        ...request,
        user_id: userId
      };
      
      const response = await dataRightsService.requestAccountDeletion(deletionRequest);
      
      setState(prev => ({
        ...prev,
        loading: false,
        deletionRequestId: response.request_id,
        deletionStatus: response
      }));
      
      return response;
    } catch (error) {
      console.error('Error requesting account deletion:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to request account deletion';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      throw error;
    }
  };

  const checkExportStatus = async (requestId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await dataRightsService.getExportRequestStatus(requestId);
      
      setState(prev => ({
        ...prev,
        loading: false,
        exportStatus: response
      }));
      
      return response;
    } catch (error) {
      console.error('Error checking export status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to check export status';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      throw error;
    }
  };

  const checkDeletionStatus = async (requestId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await dataRightsService.getDeletionRequestStatus(requestId);
      
      setState(prev => ({
        ...prev,
        loading: false,
        deletionStatus: response
      }));
      
      return response;
    } catch (error) {
      console.error('Error checking deletion status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to check deletion status';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      throw error;
    }
  };

  return {
    ...state,
    requestExport,
    requestDeletion,
    checkExportStatus,
    checkDeletionStatus
  };
};

export default useDataRights;