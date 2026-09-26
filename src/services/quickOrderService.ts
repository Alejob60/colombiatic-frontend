// src/services/quickOrderService.ts

import axios, { AxiosInstance } from 'axios';
import { CreateQuickOrderRequest, QuickOrderResponse, Order, QuickOrderAPIError } from '../types/quickOrder.types';

class QuickOrderService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007/api',
      timeout: 15000,
      headers: { 'Content-Type': 'application/json' },
    });

    // Interceptor para JWT
    this.apiClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('colombiatic_jwt');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor de errores
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = error.response?.data?.message || error.message;
        const code = error.response?.data?.code || 'UNKNOWN_ERROR';
        throw new QuickOrderAPIError(message, code, error.response?.status, error.response?.data);
      }
    );
  }

  async createQuickOrder(tenantId: string, request: CreateQuickOrderRequest): Promise<QuickOrderResponse> {
    const response = await this.apiClient.post(`/tenants/${tenantId}/orders/quick`, request);
    return response.data;
  }

  async getOrderDetails(tenantId: string, orderId: string): Promise<Order> {
    const response = await this.apiClient.get(`/tenants/${tenantId}/orders/${orderId}`);
    return response.data.data;
  }

  getTenantIdFromToken(): string {
    const token = localStorage.getItem('colombiatic_jwt');
    if (!token) throw new QuickOrderAPIError('No hay sesión activa', 'NO_TOKEN', 401);
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.tenantId) throw new QuickOrderAPIError('Token inválido', 'INVALID_TOKEN', 401);
      return payload.tenantId;
    } catch {
      // Fallback para desarrollo
      console.warn('[QuickOrderService] Token sin tenantId, usando colombiatic-001');
      return 'colombiatic-001';
    }
  }
}

export default new QuickOrderService();
