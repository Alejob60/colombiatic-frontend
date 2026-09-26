import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getTokens } from '@/lib/tokenManager';

interface ApiConfig {
  baseUrl?: string;
  timeout?: number;
}

class ApiService {
  private axiosInstance: AxiosInstance;
  private tenantId: string;

  constructor(config: ApiConfig = {}) {
    this.tenantId = process.env.TENANT_ID || '7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba';
    
    this.axiosInstance = axios.create({
      baseURL: config.baseUrl || process.env.API_BASE_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net',
      timeout: config.timeout || 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Interceptor de solicitud
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Agregar header de tenant ID
        if (config.headers) {
          config.headers.set('x-tenant-id', this.tenantId);
        }

        // Agregar token de autenticación si existe
        const tokens = getTokens();
        if (tokens && tokens.accessToken && config.headers) {
          config.headers.set('Authorization', `Bearer ${tokens.accessToken}`);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor de respuesta
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Manejo de errores común
        if (error.response?.status === 401) {
          // Token expirado, podríamos intentar refrescarlo
          console.warn('Token expirado, se necesita refrescar');
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Métodos HTTP
  public async get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public async post<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  public async patch<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  // Método para actualizar el tenant ID dinámicamente
  public setTenantId(tenantId: string): void {
    this.tenantId = tenantId;
  }

  // Método para obtener la instancia de axios (para casos especiales)
  public getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Crear una instancia singleton del ApiService
const apiService = new ApiService();

export default apiService;
export { ApiService };