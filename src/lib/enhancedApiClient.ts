// src/lib/enhancedApiClient.ts
// Enhanced API client with monitoring and error handling

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenManager';

// Performance monitoring interface
interface PerformanceMetrics {
  requestTime: number;
  responseTime: number;
  totalTime: number;
  statusCode: number;
  url: string;
  method: string;
}

// Error reporting interface
interface ErrorReport {
  timestamp: string;
  error: string;
  url: string;
  method: string;
  statusCode?: number;
  stack?: string;
}

class EnhancedApiClient {
  private client: AxiosInstance;
  private performanceMetrics: PerformanceMetrics[] = [];
  private errorReports: ErrorReport[] = [];

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for performance monitoring
    this.client.interceptors.request.use(
      (config) => {
        // Add timing information
        (config as any)._startTime = Date.now();
        
        // Add auth token from localStorage as fallback if cookies aren't working
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log request for debugging
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
        
        return config;
      },
      (error) => {
        this.reportError(error, 'Request Interceptor');
        return Promise.reject(error);
      }
    );

    // Response interceptor for performance monitoring and error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Calculate performance metrics
        const config = response.config;
        const startTime = (config as any)._startTime || Date.now();
        const endTime = Date.now();
        
        const metrics: PerformanceMetrics = {
          requestTime: startTime,
          responseTime: endTime,
          totalTime: endTime - startTime,
          statusCode: response.status,
          url: config.url || '',
          method: config.method?.toUpperCase() || 'UNKNOWN'
        };
        
        this.performanceMetrics.push(metrics);
        
        // Log successful response
        console.log(`[API Response] ${response.status} ${config.url}`, response.data);
        
        return response;
      },
      async (error) => {
        // Record error metrics
        this.reportError(error, 'Response Interceptor');
        
        const originalRequest = error.config;
        
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Attempt to refresh token using the misybot auth service
            const { refreshToken } = await import('@/services/misybot/authService');
            await refreshToken();
            
            // Retry the original request
            return this.client(originalRequest);
          } catch (refreshError) {
            // If refresh fails, redirect to login
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }
        
        // Handle network errors
        if (!error.response) {
          console.error('Network Error:', error.message);
          throw new Error('NETWORK_ERROR');
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Report error for monitoring
  private reportError(error: any, context: string) {
    const errorReport: ErrorReport = {
      timestamp: new Date().toISOString(),
      error: error.message || 'Unknown error',
      url: error.config?.url || 'Unknown URL',
      method: error.config?.method?.toUpperCase() || 'UNKNOWN',
      statusCode: error.response?.status,
      stack: error.stack
    };
    
    this.errorReports.push(errorReport);
    console.error(`[API Error - ${context}]`, errorReport);
  }

  // Get performance metrics
  public getPerformanceMetrics(): PerformanceMetrics[] {
    return [...this.performanceMetrics];
  }

  // Get error reports
  public getErrorReports(): ErrorReport[] {
    return [...this.errorReports];
  }

  // Clear metrics (for testing)
  public clearMetrics() {
    this.performanceMetrics = [];
    this.errorReports = [];
  }

  // Generic request method with enhanced error handling
  public async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.request<T>(config);
    } catch (error) {
      this.reportError(error, 'Request Method');
      throw error;
    }
  }

  // GET request
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.get<T>(url, config);
    } catch (error: any) {
      // Handle CORS errors specifically
      if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
        throw new Error('CONNECTION_ERROR');
      }
      this.reportError(error, 'GET Request');
      throw error;
    }
  }

  // POST request
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.post<T>(url, data, config);
    } catch (error: any) {
      // Handle CORS errors specifically
      if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
        throw new Error('CONNECTION_ERROR');
      }
      this.reportError(error, 'POST Request');
      throw error;
    }
  }

  // PUT request
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.put<T>(url, data, config);
    } catch (error: any) {
      // Handle CORS errors specifically
      if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
        throw new Error('CONNECTION_ERROR');
      }
      this.reportError(error, 'PUT Request');
      throw error;
    }
  }

  // DELETE request
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.delete<T>(url, config);
    } catch (error: any) {
      // Handle CORS errors specifically
      if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
        throw new Error('CONNECTION_ERROR');
      }
      this.reportError(error, 'DELETE Request');
      throw error;
    }
  }
}

export const enhancedApiClient = new EnhancedApiClient();