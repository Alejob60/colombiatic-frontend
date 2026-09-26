// src/services/misybot/orderService.ts
// Order service for Misybot integration

import axios from 'axios';
import { getAccessToken } from '@/lib/tokenManager';

// Create axios instance for Misybot Order endpoints
const orderApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
orderApiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    const tenantId = localStorage.getItem('tenant_id') || process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID;
    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Types
export interface OrderItem {
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shipping_address?: string;
  billing_address?: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface CreateOrderDto {
  cart_id?: string;
  items: OrderItem[];
  shipping_address?: string;
  billing_address?: string;
  payment_method?: string;
}

export interface UpdateOrderDto {
  status?: Order['status'];
  shipping_address?: string;
  billing_address?: string;
}

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  status: 'pending' | 'approved' | 'declined' | 'error';
  payment_method: string;
  transaction_id?: string;
  created_at: string;
}

/**
 * Get all orders
 */
export async function getOrders(tenantId: string): Promise<Order[]> {
  try {
    const response = await orderApiClient.get(`/api/tenants/${tenantId}/orders`);
    return response.data;
  } catch (error) {
    console.error('Get orders error:', error);
    throw error;
  }
}

/**
 * Get order by ID
 */
export async function getOrder(tenantId: string, orderId: string): Promise<Order> {
  try {
    const response = await orderApiClient.get(`/api/tenants/${tenantId}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Get order error:', error);
    throw error;
  }
}

/**
 * Create new order
 */
export async function createOrder(tenantId: string, data: CreateOrderDto): Promise<Order> {
  try {
    const response = await orderApiClient.post(`/api/tenants/${tenantId}/orders`, data);
    return response.data;
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
}

/**
 * Update order
 */
export async function updateOrder(
  tenantId: string,
  orderId: string,
  data: UpdateOrderDto
): Promise<Order> {
  try {
    const response = await orderApiClient.put(
      `/api/tenants/${tenantId}/orders/${orderId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Update order error:', error);
    throw error;
  }
}

/**
 * Cancel order
 */
export async function cancelOrder(tenantId: string, orderId: string): Promise<Order> {
  try {
    const response = await orderApiClient.delete(`/api/tenants/${tenantId}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Cancel order error:', error);
    throw error;
  }
}

/**
 * Get order payment details
 */
export async function getOrderPayment(tenantId: string, orderId: string): Promise<Payment> {
  try {
    const response = await orderApiClient.get(`/api/tenants/${tenantId}/orders/${orderId}/payment`);
    return response.data;
  } catch (error) {
    console.error('Get order payment error:', error);
    throw error;
  }
}

/**
 * Initiate payment for order (Wompi)
 */
export async function initiatePayment(
  orderId: string,
  data: {
    amount: number;
    currency: string;
    customer_email: string;
    reference?: string;
  }
): Promise<{ payment_url: string; reference: string }> {
  try {
    const response = await orderApiClient.post('/api/payments/wompi/initiate', {
      ...data,
      order_id: orderId,
    });
    return response.data;
  } catch (error) {
    console.error('Initiate payment error:', error);
    throw error;
  }
}

/**
 * Get payment status
 */
export async function getPaymentStatus(reference: string): Promise<Payment> {
  try {
    const response = await orderApiClient.get(`/api/payments/wompi/status/${reference}`);
    return response.data;
  } catch (error) {
    console.error('Get payment status error:', error);
    throw error;
  }
}

export default {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  cancelOrder,
  getOrderPayment,
  initiatePayment,
  getPaymentStatus,
};
