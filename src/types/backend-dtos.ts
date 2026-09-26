// src/types/backend-dtos.ts
/**
 * DTOs for Backend Integration (NestJS)
 * These match the backend controller expectations
 */

/**
 * Context Start DTO
 * POST /context/start
 */
export interface ContextStartDto {
  origin: 'landing' | 'dashboard';
  intention: 'explorar' | 'comprar' | 'consultar' | string;
  serviceId?: string;
  conversationId?: string;
  metadata?: Record<string, any>;
}

/**
 * Context Restore DTO
 * GET /context/restore
 */
export interface ContextRestoreDto {
  contextId: string;
  userId?: string;
}

/**
 * Activate Service DTO
 * POST /services/activate
 */
export interface ActivateServiceDto {
  userId: string;
  serviceId: string;
  contextId?: string;
}

/**
 * Checkout Link DTO
 * POST /checkout/link
 */
export interface CheckoutLinkDto {
  userId?: string;
  serviceId: string;
  returnUrl?: string;
  callbackUrl?: string;
}

/**
 * Checkout Webhook DTO
 * POST /webhook/checkout
 */
export interface CheckoutWebhookDto {
  orderId: string;
  userId: string;
  serviceId: string;
  paymentMethod: string;
  status: 'completed' | 'failed' | 'pending';
  amount: number;
  currency: string;
  timestamp: string;
}

/**
 * User State Response DTO
 * GET /user/state
 */
export interface UserStateResponseDto {
  userId: string;
  currentState: {
    code: string;
    description: string;
    timestamp: string;
    payload?: Record<string, any>;
  };
  history?: Array<{
    code: string;
    timestamp: string;
  }>;
}

/**
 * Service Catalog Response DTO
 * GET /services/catalog
 */
export interface ServiceCatalogResponseDto {
  categories: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    services: Array<{
      id: string;
      name: string;
      description: string;
      active: boolean;
      price?: number;
      currency?: string;
    }>;
  }>;
}

/**
 * Chat Message DTO
 * WebSocket event
 */
export interface ChatMessageDto {
  conversationId: string;
  userId?: string;
  message: string;
  context?: {
    sessionId?: string;
    origin?: 'landing' | 'dashboard';
    serviceId?: string;
  };
}

/**
 * Chat Response DTO
 * WebSocket event
 */
export interface ChatResponseDto {
  conversationId: string;
  message: string;
  suggestions?: string[];
  actions?: Array<{
    type: 'navigate' | 'purchase' | 'activate' | 'configure';
    label: string;
    data?: Record<string, any>;
  }>;
  metadata?: Record<string, any>;
}
