// src/services/userStateService.ts
import { 
  UserState, 
  UserStateCode, 
  isValidTransition,
  PendingPurchaseState,
  InCheckoutState,
  PurchaseCompleteState,
  ServiceActiveState,
  AbandonedState
} from '@/types/userStates';

const STATE_STORAGE_KEY = 'user_state';
const STATE_HISTORY_KEY = 'user_state_history';

/**
 * Get current user state
 */
export function getCurrentUserState(): UserState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STATE_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as UserState;
    }
  } catch (error) {
    console.error('[UserStateService] Error getting current state:', error);
  }

  return null;
}

/**
 * Set user state
 */
export function setUserState(state: UserState): void {
  if (typeof window === 'undefined') return;

  try {
    // Add timestamp
    const stateWithTimestamp = {
      ...state,
      timestamp: new Date().toISOString()
    };

    // Validate transition if there's a previous state
    const currentState = getCurrentUserState();
    if (currentState && !isValidTransition(currentState.code, state.code)) {
      console.warn(
        `[UserStateService] Invalid state transition: ${currentState.code} -> ${state.code}`
      );
    }

    // Store state
    localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(stateWithTimestamp));

    // Add to history
    addToStateHistory(stateWithTimestamp);

    console.log('[UserStateService] State updated:', stateWithTimestamp);
  } catch (error) {
    console.error('[UserStateService] Error setting state:', error);
  }
}

/**
 * Clear user state
 */
export function clearUserState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STATE_STORAGE_KEY);
}

/**
 * Add state to history
 */
function addToStateHistory(state: UserState): void {
  if (typeof window === 'undefined') return;

  try {
    const history = getStateHistory();
    history.push(state);

    // Keep only last 20 states
    const trimmedHistory = history.slice(-20);
    
    localStorage.setItem(STATE_HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('[UserStateService] Error adding to history:', error);
  }
}

/**
 * Get state history
 */
export function getStateHistory(): UserState[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STATE_HISTORY_KEY);
    if (stored) {
      return JSON.parse(stored) as UserState[];
    }
  } catch (error) {
    console.error('[UserStateService] Error getting state history:', error);
  }

  return [];
}

/**
 * Clear state history
 */
export function clearStateHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STATE_HISTORY_KEY);
}

/**
 * Helper: Set public state
 */
export function setPublicState(): void {
  setUserState({
    code: 'public',
    description: 'Usuario sin autenticar'
  });
}

/**
 * Helper: Set pending purchase state
 */
export function setPendingPurchaseState(params: {
  contextId: string;
  serviceId: string;
  origin: 'landing' | 'dashboard';
  serviceName?: string;
}): void {
  const state: PendingPurchaseState = {
    code: 'pending_purchase',
    description: 'Proceso de compra iniciado',
    payload: {
      contextId: params.contextId,
      serviceId: params.serviceId,
      origin: params.origin,
      timestamp: new Date().toISOString(),
      serviceName: params.serviceName
    }
  };
  
  setUserState(state);
}

/**
 * Helper: Set authenticated state
 */
export function setAuthenticatedState(userId: string, email: string): void {
  setUserState({
    code: 'authenticated',
    description: 'Usuario autenticado',
    payload: {
      userId,
      email
    }
  });
}

/**
 * Helper: Set in dashboard state
 */
export function setInDashboardState(userId: string, chatActive: boolean = true): void {
  setUserState({
    code: 'in_dashboard',
    description: 'Usuario en dashboard',
    payload: {
      userId,
      chatActive
    }
  });
}

/**
 * Helper: Set in checkout state
 */
export function setInCheckoutState(params: {
  checkoutId: string;
  serviceId: string;
  userId: string;
}): void {
  const state: InCheckoutState = {
    code: 'in_checkout',
    description: 'Usuario en proceso de pago',
    payload: params
  };
  
  setUserState(state);
}

/**
 * Helper: Set purchase complete state
 */
export function setPurchaseCompleteState(params: {
  orderId: string;
  serviceId: string;
  paymentMethod: string;
  userId: string;
}): void {
  const state: PurchaseCompleteState = {
    code: 'purchase_complete',
    description: 'Pago completado',
    payload: {
      ...params,
      timestamp: new Date().toISOString()
    }
  };
  
  setUserState(state);
}

/**
 * Helper: Set service active state
 */
export function setServiceActiveState(params: {
  serviceId: string;
  userId: string;
}): void {
  const state: ServiceActiveState = {
    code: 'service_active',
    description: 'Servicio activado',
    payload: {
      serviceId: params.serviceId,
      activatedAt: new Date().toISOString(),
      userId: params.userId
    }
  };
  
  setUserState(state);
}

/**
 * Helper: Set abandoned state
 */
export function setAbandonedState(lastStateCode: UserStateCode, contextId?: string): void {
  const state: AbandonedState = {
    code: 'abandoned',
    description: 'Proceso abandonado',
    payload: {
      lastStateCode,
      contextId,
      timestamp: new Date().toISOString()
    }
  };
  
  setUserState(state);
}

/**
 * Check if user is in specific state
 */
export function isInState(stateCode: UserStateCode): boolean {
  const currentState = getCurrentUserState();
  return currentState?.code === stateCode;
}

/**
 * Check if user can transition to state
 */
export function canTransitionTo(targetState: UserStateCode): boolean {
  const currentState = getCurrentUserState();
  if (!currentState) return true; // Can set initial state

  return isValidTransition(currentState.code, targetState);
}

export default {
  getCurrentUserState,
  setUserState,
  clearUserState,
  getStateHistory,
  clearStateHistory,
  setPublicState,
  setPendingPurchaseState,
  setAuthenticatedState,
  setInDashboardState,
  setInCheckoutState,
  setPurchaseCompleteState,
  setServiceActiveState,
  setAbandonedState,
  isInState,
  canTransitionTo
};
