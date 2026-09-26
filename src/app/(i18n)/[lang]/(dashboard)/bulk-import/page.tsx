// src/app/(dashboard)/bulk-import/page.tsx
// Bulk import dashboard

"use client";

import React from 'react';
import { withAuth } from '@/components/hoc/withAuth';
import { useAuth } from '@/contexts/AuthContext';
import useBulkImport from '@/hooks/useBulkImport';
import BulkImportWizard from '@/components/dashboard/BulkImportWizard';
import ImportJobStatus from '@/components/dashboard/ImportJobStatus';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { 
  Upload, 
  AlertTriangle
} from 'lucide-react';

const BulkImportDashboard = () => {
  const { user } = useAuth();
  
  // Use a default instance ID for now - in a real app this would come from the user's organization
  const instanceId = user?.organization_id || 'default-instance';
  
  const {
    jobs,
    currentJob,
    jobDetail,
    loading,
    error,
    previewData,
    refreshJobs,
    startImport,
    getJobDetail,
    cancelJob,
    retryJob,
    previewCSV,
    previewGoogleSheets,
    previewAPI
  } = useBulkImport(instanceId);

  // Wrapper functions to match component prop types
  const handleStartImport = async (
    file: File | null, 
    columnMapping: Record<string, string>,
    connectorType: 'csv' | 'google-sheets' | 'api' = 'csv',
    googleSheetUrl?: string,
    apiEndpoint?: string,
    apiHeaders?: Record<string, string>
  ) => {
    try {
      await startImport(file, columnMapping, connectorType, googleSheetUrl, apiEndpoint, apiHeaders);
    } catch (error) {
      console.error('Error starting import:', error);
      throw error;
    }
  };

  const handlePreviewCSV = async (file: File) => {
    try {
      await previewCSV(file);
    } catch (error) {
      console.error('Error previewing CSV:', error);
      throw error;
    }
  };

  const handlePreviewGoogleSheets = async (url: string) => {
    try {
      await previewGoogleSheets(url);
    } catch (error) {
      console.error('Error previewing Google Sheets:', error);
      throw error;
    }
  };

  const handlePreviewAPI = async (endpoint: string, headers: Record<string, string>) => {
    try {
      await previewAPI(endpoint, headers);
    } catch (error) {
      console.error('Error previewing API data:', error);
      throw error;
    }
  };

  const handleRetryJob = async (jobId: string) => {
    try {
      await retryJob(jobId);
    } catch (error) {
      console.error('Error retrying job:', error);
      throw error;
    }
  };

  const handleViewDetail = async (jobId: string) => {
    try {
      await getJobDetail(jobId);
    } catch (error) {
      console.error('Error viewing job detail:', error);
      throw error;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Upload className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-2xl font-bold text-white">Bulk Customer Import</h1>
      </div>

      {error && (
        <Alert className="mb-6 bg-red-900/50 border-red-700">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BulkImportWizard
          instanceId={instanceId}
          onImportStart={handleStartImport}
          loading={loading}
          error={error}
          previewData={previewData}
          onPreviewCSV={handlePreviewCSV}
        />
        
        <ImportJobStatus
          jobs={jobs}
          currentJob={currentJob}
          jobDetail={jobDetail}
          onRefresh={refreshJobs}
          onCancel={cancelJob}
          onRetry={handleRetryJob}
          onViewDetail={handleViewDetail}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default withAuth(BulkImportDashboard);