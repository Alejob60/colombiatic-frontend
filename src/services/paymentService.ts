// src/services/paymentService.ts

import axios, { AxiosInstance } from 'axios';
import { QuickCheckoutRequest, QuickCheckoutResponse, MockPaymentRequest, QuickOrderAPIError } from '../types/quickOrder.types';

class PaymentService {
  private apiClient: AxiosInstance;
  private mockPaymentsEnabled: boolean;

  constructor() {
    this.mockPaymentsEnabled = process.env.NEXT_PUBLIC_USE_MOCK_PAYMENTS === 'true';
    this.apiClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007/api',
      timeout: 15000,
    });

    this.apiClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('colombiatic_jwt');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  }

  async initiateQuickCheckout(request: QuickCheckoutRequest): Promise<QuickCheckoutResponse> {
    const response = await this.apiClient.post('/payments/quick-checkout', request);
    return response.data;
  }

  async simulateMockPayment(request: MockPaymentRequest): Promise<void> {
    if (!this.mockPaymentsEnabled) {
      throw new QuickOrderAPIError('MOCK deshabilitado', 'MOCK_DISABLED', 403);
    }
    await this.apiClient.post('/payments/mock-complete', request);
  }

  openCheckoutWindow(checkoutUrl: string): Window | null {
    const width = 600;
    const height = 700;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    return window.open(checkoutUrl, 'CheckoutWindow', `width=${width},height=${height},left=${left},top=${top}`);
  }

  isMockPaymentsEnabled(): boolean {
    return this.mockPaymentsEnabled;
  }

  getReturnUrl(): string {
    return `${window.location.origin}/checkout/return`;
  }
}

export default new PaymentService();
