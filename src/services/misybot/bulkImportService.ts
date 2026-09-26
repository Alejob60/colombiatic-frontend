// src/services/misybot/bulkImportService.ts
// Bulk import service for customer data

import { apiClient } from '@/lib/apiClient';

// Types for bulk import
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  meta: Record<string, any>;
}

export interface CustomerContext {
  id: string;
  customer_id: string;
  instance_id: string;
  embeddings_ref: string;
}

export interface ImportJob {
  id: string;
  instance_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  total_rows: number;
  processed_rows: number;
  failed_rows: number;
  file_name: string;
  created_at: string;
  updated_at: string;
  error?: string;
  connector_type: 'csv' | 'google-sheets' | 'api';
}

export interface ImportJobDetail extends ImportJob {
  column_mapping: Record<string, string>;
  validation_errors: Array<{
    row_number: number;
    error: string;
    data: Record<string, any>;
  }>;
}

export interface StartImportRequest {
  instance_id: string;
  file?: File;
  column_mapping: Record<string, string>;
  connector_type: 'csv' | 'google-sheets' | 'api';
  google_sheet_url?: string;
  api_endpoint?: string;
  api_headers?: Record<string, string>;
}

export interface StartImportResponse {
  job_id: string;
  message: string;
}

/**
 * Start a bulk import job
 */
export async function startImport(request: StartImportRequest): Promise<StartImportResponse> {
  try {
    if (request.connector_type === 'csv' && request.file) {
      const formData = new FormData();
      formData.append('instance_id', request.instance_id);
      formData.append('file', request.file);
      formData.append('column_mapping', JSON.stringify(request.column_mapping));
      formData.append('connector_type', request.connector_type);
      
      const response = await apiClient.post<StartImportResponse>('/imports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } else {
      // For Google Sheets and API connectors, send JSON data
      const requestData = {
        instance_id: request.instance_id,
        column_mapping: request.column_mapping,
        connector_type: request.connector_type,
        google_sheet_url: request.google_sheet_url,
        api_endpoint: request.api_endpoint,
        api_headers: request.api_headers
      };
      
      const response = await apiClient.post<StartImportResponse>('/imports', requestData);
      return response.data;
    }
  } catch (error) {
    console.error('Error starting import job:', error);
    throw error;
  }
}

/**
 * Get import job status
 */
export async function getImportJob(jobId: string): Promise<ImportJob> {
  try {
    const response = await apiClient.get<ImportJob>(`/imports/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching import job:', error);
    throw error;
  }
}

/**
 * Get detailed import job status with validation errors
 */
export async function getImportJobDetail(jobId: string): Promise<ImportJobDetail> {
  try {
    const response = await apiClient.get<ImportJobDetail>(`/imports/${jobId}/detail`);
    return response.data;
  } catch (error) {
    console.error('Error fetching import job detail:', error);
    throw error;
  }
}

/**
 * Get import jobs for an instance
 */
export async function getImportJobs(instanceId: string, limit: number = 10): Promise<ImportJob[]> {
  try {
    const response = await apiClient.get<ImportJob[]>(`/imports?instance_id=${instanceId}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching import jobs:', error);
    throw error;
  }
}

/**
 * Cancel an import job
 */
export async function cancelImportJob(jobId: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await apiClient.post<{ success: boolean; message: string }>(`/imports/${jobId}/cancel`);
    return response.data;
  } catch (error) {
    console.error('Error canceling import job:', error);
    throw error;
  }
}

/**
 * Retry a failed import job
 */
export async function retryImportJob(jobId: string): Promise<StartImportResponse> {
  try {
    const response = await apiClient.post<StartImportResponse>(`/imports/${jobId}/retry`);
    return response.data;
  } catch (error) {
    console.error('Error retrying import job:', error);
    throw error;
  }
}

/**
 * Preview CSV file and suggest column mapping
 */
export async function previewCSV(file: File, rows: number = 5): Promise<{ 
  headers: string[]; 
  sampleData: any[][]; 
  suggestedMapping: Record<string, string> 
}> {
  try {
    // In a real implementation, this would call an API endpoint
    // For now, we'll simulate the response
    
    // Read the file content
    const content = await file.text();
    const lines = content.split('\n');
    
    if (lines.length === 0) {
      throw new Error('Empty file');
    }
    
    // Parse headers
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    // Parse sample data
    const sampleData = lines.slice(1, Math.min(rows + 1, lines.length))
      .map(line => line.split(',').map(cell => cell.trim().replace(/"/g, '')));
    
    // Suggest column mapping based on header names
    const suggestedMapping: Record<string, string> = {};
    headers.forEach(header => {
      const lowerHeader = header.toLowerCase();
      if (lowerHeader.includes('name') || lowerHeader.includes('nombre')) {
        suggestedMapping[header] = 'name';
      } else if (lowerHeader.includes('email') || lowerHeader.includes('correo')) {
        suggestedMapping[header] = 'email';
      } else if (lowerHeader.includes('phone') || lowerHeader.includes('telefono') || lowerHeader.includes('tel')) {
        suggestedMapping[header] = 'phone';
      } else {
        // Default to meta for unknown columns
        suggestedMapping[header] = `meta.${header}`;
      }
    });
    
    return {
      headers,
      sampleData,
      suggestedMapping
    };
  } catch (error) {
    console.error('Error previewing CSV:', error);
    throw error;
  }
}

/**
 * Preview Google Sheets data
 */
export async function previewGoogleSheets(url: string, rows: number = 5): Promise<{ 
  headers: string[]; 
  sampleData: any[][]; 
  suggestedMapping: Record<string, string> 
}> {
  try {
    // In a real implementation, this would call an API endpoint to fetch data from Google Sheets
    // For now, we'll simulate the response
    console.warn('Google Sheets preview not implemented in frontend, would require backend integration');
    
    // Simulate response
    return {
      headers: ['Name', 'Email', 'Phone'],
      sampleData: [
        ['John Doe', 'john@example.com', '123-456-7890'],
        ['Jane Smith', 'jane@example.com', '098-765-4321']
      ],
      suggestedMapping: {
        'Name': 'name',
        'Email': 'email',
        'Phone': 'phone'
      }
    };
  } catch (error) {
    console.error('Error previewing Google Sheets:', error);
    throw error;
  }
}

/**
 * Preview API data
 */
export async function previewAPI(endpoint: string, headers: Record<string, string>, rows: number = 5): Promise<{ 
  headers: string[]; 
  sampleData: any[][]; 
  suggestedMapping: Record<string, string> 
}> {
  try {
    // In a real implementation, this would call an API endpoint to fetch data from the provided endpoint
    // For now, we'll simulate the response
    console.warn('API preview not implemented in frontend, would require backend integration');
    
    // Simulate response
    return {
      headers: ['name', 'email', 'phone'],
      sampleData: [
        ['John Doe', 'john@example.com', '123-456-7890'],
        ['Jane Smith', 'jane@example.com', '098-765-4321']
      ],
      suggestedMapping: {
        'name': 'name',
        'email': 'email',
        'phone': 'phone'
      }
    };
  } catch (error) {
    console.error('Error previewing API data:', error);
    throw error;
  }
}

export default {
  startImport,
  getImportJob,
  getImportJobDetail,
  getImportJobs,
  cancelImportJob,
  retryImportJob,
  previewCSV,
  previewGoogleSheets,
  previewAPI
};