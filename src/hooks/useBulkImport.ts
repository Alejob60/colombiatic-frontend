// src/hooks/useBulkImport.ts
// Custom hook for bulk import functionality

import { useState, useEffect } from 'react';
import * as bulkImportService from '@/services/misybot/bulkImportService';

export interface BulkImportState {
  jobs: bulkImportService.ImportJob[];
  currentJob: bulkImportService.ImportJob | null;
  jobDetail: bulkImportService.ImportJobDetail | null;
  loading: boolean;
  error: string | null;
  previewData: {
    headers: string[];
    sampleData: any[][];
    suggestedMapping: Record<string, string>;
  } | null;
}

export const useBulkImport = (instanceId: string) => {
  const [state, setState] = useState<BulkImportState>({
    jobs: [],
    currentJob: null,
    jobDetail: null,
    loading: false,
    error: null,
    previewData: null
  });

  useEffect(() => {
    if (instanceId) {
      refreshJobs();
    }
  }, [instanceId]);

  const refreshJobs = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const jobs = await bulkImportService.getImportJobs(instanceId);
      
      setState(prev => ({
        ...prev,
        jobs,
        loading: false,
        error: null
      }));
    } catch (error) {
      console.error('Error refreshing import jobs:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to refresh import jobs'
      }));
    }
  };

  const startImport = async (
    file: File | null | undefined, 
    columnMapping: Record<string, string>,
    connectorType: 'csv' | 'google-sheets' | 'api' = 'csv',
    googleSheetUrl?: string,
    apiEndpoint?: string,
    apiHeaders?: Record<string, string>
  ) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await bulkImportService.startImport({
        instance_id: instanceId,
        file: file || undefined,
        column_mapping: columnMapping,
        connector_type: connectorType,
        google_sheet_url: googleSheetUrl,
        api_endpoint: apiEndpoint,
        api_headers: apiHeaders
      });
      
      // Start polling for job status
      const job = await bulkImportService.getImportJob(response.job_id);
      setState(prev => ({
        ...prev,
        currentJob: job,
        loading: false,
        error: null
      }));
      
      // Start polling for job updates
      pollJobStatus(response.job_id);
      
      return response;
    } catch (error) {
      console.error('Error starting import:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to start import'
      }));
      throw error;
    }
  };

  const pollJobStatus = async (jobId: string) => {
    try {
      const job = await bulkImportService.getImportJob(jobId);
      setState(prev => ({
        ...prev,
        currentJob: job
      }));
      
      // Continue polling if job is still processing
      if (job.status === 'processing' || job.status === 'pending') {
        setTimeout(() => pollJobStatus(jobId), 2000); // Poll every 2 seconds
      } else if (job.status === 'completed' || job.status === 'failed') {
        // Refresh jobs list when job completes
        refreshJobs();
      }
    } catch (error) {
      console.error('Error polling job status:', error);
    }
  };

  const getJobDetail = async (jobId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const jobDetail = await bulkImportService.getImportJobDetail(jobId);
      
      setState(prev => ({
        ...prev,
        jobDetail,
        loading: false,
        error: null
      }));
      
      return jobDetail;
    } catch (error) {
      console.error('Error getting job detail:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to get job detail'
      }));
      throw error;
    }
  };

  const cancelJob = async (jobId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      await bulkImportService.cancelImportJob(jobId);
      
      // Refresh jobs list
      await refreshJobs();
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
    } catch (error) {
      console.error('Error canceling job:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to cancel job'
      }));
      throw error;
    }
  };

  const retryJob = async (jobId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await bulkImportService.retryImportJob(jobId);
      
      // Start polling for job status
      const job = await bulkImportService.getImportJob(response.job_id);
      setState(prev => ({
        ...prev,
        currentJob: job,
        loading: false,
        error: null
      }));
      
      // Start polling for job updates
      pollJobStatus(response.job_id);
      
      return response;
    } catch (error) {
      console.error('Error retrying job:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to retry job'
      }));
      throw error;
    }
  };

  const previewCSV = async (file: File) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const previewData = await bulkImportService.previewCSV(file);
      
      setState(prev => ({
        ...prev,
        previewData,
        loading: false,
        error: null
      }));
      
      return previewData;
    } catch (error) {
      console.error('Error previewing CSV:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to preview CSV'
      }));
      throw error;
    }
  };

  const previewGoogleSheets = async (url: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const previewData = await bulkImportService.previewGoogleSheets(url);
      
      setState(prev => ({
        ...prev,
        previewData,
        loading: false,
        error: null
      }));
      
      return previewData;
    } catch (error) {
      console.error('Error previewing Google Sheets:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to preview Google Sheets'
      }));
      throw error;
    }
  };

  const previewAPI = async (endpoint: string, headers: Record<string, string>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const previewData = await bulkImportService.previewAPI(endpoint, headers);
      
      setState(prev => ({
        ...prev,
        previewData,
        loading: false,
        error: null
      }));
      
      return previewData;
    } catch (error) {
      console.error('Error previewing API data:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to preview API data'
      }));
      throw error;
    }
  };

  return {
    ...state,
    refreshJobs,
    startImport,
    getJobDetail,
    cancelJob,
    retryJob,
    previewCSV,
    previewGoogleSheets,
    previewAPI
  };
};

export default useBulkImport;