// src/services/wompi.service.ts
import { ServiceItem } from '@/types/colombiatic';

export type { ServiceItem };

export interface WompiCreateOrderRequest {
  userId: string;
  moduleId: string;
  amount: number;
  currency: string;
  callbackUrl: string;
}

export interface WompiOrderResponse {
  checkoutUrl: string;
  orderId: string;
  status: string;
}

class WompiService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_WOMPI_BASE_URL || 'https://sandbox.wompi.co/v1';
    this.apiKey = process.env.NEXT_PUBLIC_WOMPI_API_KEY || '';
  }

  /**
   * Create a payment order in Wompi
   * @param orderData - Order information
   * @returns Promise with checkout URL and order details
   */
  async createOrder(orderData: WompiCreateOrderRequest): Promise<WompiOrderResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          amount_in_cents: orderData.amount * 100, // Convert to cents
          currency: orderData.currency,
          customer_email: 'customer@colombiatic.com.co', // This should come from user data
          payment_method: {
            type: 'NEQUI', // Default payment method
          },
          reference: `${orderData.moduleId}-${Date.now()}`,
          redirect_url: orderData.callbackUrl,
        })
      });

      if (!response.ok) {
        throw new Error(`Wompi API error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        checkoutUrl: data.data.transaction.payment_link,
        orderId: data.data.transaction.id,
        status: data.data.transaction.status
      };
    } catch (error) {
      console.error('Error creating Wompi order:', error);
      throw new Error('Failed to create payment order');
    }
  }

  /**
   * Get order status from Wompi
   * @param orderId - Wompi order ID
   * @returns Promise with order status
   */
  async getOrderStatus(orderId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/transactions/${orderId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Wompi API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data.transaction;
    } catch (error) {
      console.error('Error getting Wompi order status:', error);
      throw new Error('Failed to get order status');
    }
  }

  /**
   * Handle webhook callback from Wompi
   * @param requestBody - Webhook payload from Wompi
   * @returns Promise with validation result
   */
  async handleWebhook(requestBody: any): Promise<boolean> {
    try {
      // Validate webhook signature (simplified for this example)
      // In production, you should validate the signature using your secret key
      
      // Update order status in your database
      const orderId = requestBody.transaction.id;
      const status = requestBody.transaction.status;
      
      // Here you would update your database with the new status
      console.log(`Order ${orderId} status updated to: ${status}`);
      
      return true;
    } catch (error) {
      console.error('Error handling Wompi webhook:', error);
      return false;
    }
  }

  /**
   * Calculate total amount for a service
   * @param service - Service item
   * @param quantity - Quantity (default: 1)
   * @returns Total amount in COP
   */
  calculateAmount(service: ServiceItem, quantity: number = 1): number {
    return service.price_cop * quantity;
  }

  /**
   * Format currency for display
   * @param amount - Amount in COP
   * @returns Formatted currency string
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  }
}

export default new WompiService();