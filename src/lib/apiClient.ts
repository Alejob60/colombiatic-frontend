// src/lib/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/tokenManager';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      withCredentials: true, // Essential for cookie-based auth
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token from localStorage as fallback if cookies aren't working
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Attempt to refresh token using the misybot auth service
            await this.refreshAuthToken();
            
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

        return Promise.reject(error);
      }
    );
  }

  // Refresh auth token
  private async refreshAuthToken(): Promise<void> {
    try {
      // Import the refresh function dynamically to avoid circular dependencies
      const { refreshToken } = await import('@/services/misybot/authService');
      await refreshToken();
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }

  // Generic request method
  public async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.request<T>(config);
    } catch (error) {
      console.error('API request error:', error);
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
      console.error(`GET request error for ${url}:`, error);
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
      console.error(`POST request error for ${url}:`, error);
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
      console.error(`PUT request error for ${url}:`, error);
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
      console.error(`DELETE request error for ${url}:`, error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();