// src/types/userStates.ts
/**
 * User States - Canonical Model
 * Source of truth for user state management across the system
 */

export type UserStateCode = 
  | 'public'
  | 'pending_purchase'
  | 'authenticated'
  | 'in_dashboard'
  | 'in_checkout'
  | 'purchase_complete'
  | 'service_active'
  | 'abandoned';

export interface BaseUserState {
  code: UserStateCode;
  description: string;
  timestamp?: string;
}

export interface PublicState extends BaseUserState {
  code: 'public';
}

export interface PendingPurchaseState extends BaseUserState {
  code: 'pending_purchase';
  payload: {
    contextId: string;
    serviceId: string;
    origin: 'landing' | 'dashboard';
    timestamp: string;
    serviceName?: string;
  };
}

export interface AuthenticatedState extends BaseUserState {
  code: 'authenticated';
  payload?: {
    userId: string;
    email: string;
  };
}

export interface InDashboardState extends BaseUserState {
  code: 'in_dashboard';
  payload: {
    userId: string;
    chatActive: boolean;
  };
}

export interface InCheckoutState extends BaseUserState {
  code: 'in_checkout';
  payload: {
    checkoutId: string;
    serviceId: string;
    userId: string;
  };
}

export interface PurchaseCompleteState extends BaseUserState {
  code: 'purchase_complete';
  payload: {
    orderId: string;
    serviceId: string;
    paymentMethod: string;
    timestamp: string;
    userId: string;
  };
}

export interface ServiceActiveState extends BaseUserState {
  code: 'service_active';
  payload: {
    serviceId: string;
    activatedAt: string;
    userId: string;
  };
}

export interface AbandonedState extends BaseUserState {
  code: 'abandoned';
  payload?: {
    lastStateCode: UserStateCode;
    contextId?: string;
    timestamp: string;
  };
}

export type UserState = 
  | PublicState
  | PendingPurchaseState
  | AuthenticatedState
  | InDashboardState
  | InCheckoutState
  | PurchaseCompleteState
  | ServiceActiveState
  | AbandonedState;

/**
 * User State Definitions (canonical)
 */
export const USER_STATES: Record<UserStateCode, Omit<BaseUserState, 'timestamp'>> = {
  public: {
    code: 'public',
    description: 'Usuario sin autenticar. Puede explorar la landing y usar chat limitado.'
  },
  pending_purchase: {
    code: 'pending_purchase',
    description: 'Usuario no autenticado que inició proceso de compra. Contexto guardado (serviceId, intent).'
  },
  authenticated: {
    code: 'authenticated',
    description: 'Usuario autenticado en sistema.'
  },
  in_dashboard: {
    code: 'in_dashboard',
    description: 'Usuario autenticado dentro del dashboard. Chat embebido activo.'
  },
  in_checkout: {
    code: 'in_checkout',
    description: 'Usuario navegando el checkout (checkout abierto en nueva pestaña).'
  },
  purchase_complete: {
    code: 'purchase_complete',
    description: 'Pago completado. Awaiting activation/fulfillment.'
  },
  service_active: {
    code: 'service_active',
    description: 'Servicio activado y disponible en tenant.'
  },
  abandoned: {
    code: 'abandoned',
    description: 'Proceso dejado a medias. Usado para retargeting y push notifications.'
  }
};

/**
 * State Transitions - Valid transitions between states
 */
export const STATE_TRANSITIONS: Record<UserStateCode, UserStateCode[]> = {
  public: ['pending_purchase', 'authenticated'],
  pending_purchase: ['authenticated', 'abandoned'],
  authenticated: ['in_dashboard', 'in_checkout'],
  in_dashboard: ['in_checkout', 'service_active'],
  in_checkout: ['purchase_complete', 'abandoned', 'in_dashboard'],
  purchase_complete: ['service_active'],
  service_active: ['in_dashboard'],
  abandoned: ['public', 'authenticated']
};

/**
 * Check if state transition is valid
 */
export function isValidTransition(from: UserStateCode, to: UserStateCode): boolean {
  return STATE_TRANSITIONS[from]?.includes(to) ?? false;
}

/**
 * Get state definition
 */
export function getStateDefinition(code: UserStateCode): Omit<BaseUserState, 'timestamp'> {
  return USER_STATES[code];
}
