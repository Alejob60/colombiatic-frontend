// src/services/misybot/dataRightsService.ts
// Data rights service for export and deletion requests

import { apiClient } from '@/lib/apiClient';

// Types for data rights management
export interface DataExportRequest {
  user_id: string;
  email: string;
  format: 'json' | 'csv' | 'pdf';
  include: {
    profile: boolean;
    conversations: boolean;
    documents: boolean;
    settings: boolean;
  };
}

export interface DataDeletionRequest {
  user_id: string;
  email: string;
  reason?: string;
}

export interface DataExportResponse {
  request_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  estimated_completion: string;
}

export interface DataDeletionResponse {
  request_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  confirmation_required: boolean;
}

/**
 * Request data export
 */
export async function requestDataExport(request: DataExportRequest): Promise<DataExportResponse> {
  try {
    const response = await apiClient.post<DataExportResponse>('/users/request-data-export', request);
    return response.data;
  } catch (error) {
    console.error('Error requesting data export:', error);
    throw error;
  }
}

/**
 * Request account deletion
 */
export async function requestAccountDeletion(request: DataDeletionRequest): Promise<DataDeletionResponse> {
  try {
    const response = await apiClient.post<DataDeletionResponse>('/users/request-delete', request);
    return response.data;
  } catch (error) {
    console.error('Error requesting account deletion:', error);
    throw error;
  }
}

/**
 * Get export request status
 */
export async function getExportRequestStatus(requestId: string): Promise<DataExportResponse> {
  try {
    const response = await apiClient.get<DataExportResponse>(`/users/export-status/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching export request status:', error);
    throw error;
  }
}

/**
 * Get deletion request status
 */
export async function getDeletionRequestStatus(requestId: string): Promise<DataDeletionResponse> {
  try {
    const response = await apiClient.get<DataDeletionResponse>(`/users/deletion-status/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching deletion request status:', error);
    throw error;
  }
}

export default {
  requestDataExport,
  requestAccountDeletion,
  getExportRequestStatus,
  getDeletionRequestStatus
};