// src/types/quickOrder.types.ts

export interface CreateQuickOrderRequest {
  productId: string;
  quantity: number;
  channel: 'web' | 'mobile';
  metaAgentSessionId?: string;
  context?: Record<string, any>;
}

export interface QuickOrderResponse {
  success: boolean;
  data: {
    orderId: string;
    status: OrderStatus;
    amount: number;
    currency: string;
    productId: string;
    quantity: number;
  };
}

export type OrderStatus = 
  | 'pending'
  | 'pending_payment'
  | 'paid'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface Order {
  id: string;
  tenantId: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface QuickCheckoutRequest {
  tenantId: string;
  orderId: string;
  returnUrl: string;
}

export interface QuickCheckoutResponse {
  checkoutUrl: string;
  provider: 'wompi' | 'mock';
  orderId: string;
  reference: string;
}

export interface MockPaymentRequest {
  orderId: string;
  tenantId: string;
  status: 'approved' | 'declined';
}

export type PaymentProvider = 'wompi' | 'mock';

export class QuickOrderAPIError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'QuickOrderAPIError';
  }
}
