// src/services/contextService.ts
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'http://localhost:3001';

export interface ContextData {
  contextId: string;
  conversationId: string;
  origin: 'landing' | 'dashboard';
  intention?: string;
  serviceId?: string;
  sessionId: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface PendingPurchase {
  serviceId: string;
  intention: 'buy' | 'activate' | 'configure';
  contextId: string;
  timestamp: number;
  serviceName?: string;
}

/**
 * Start a new context session
 */
export async function startContext(params: {
  origin: 'landing' | 'dashboard';
  intention?: string;
  serviceId?: string;
  userId?: string;
}): Promise<ContextData> {
  try {
    const sessionId = uuidv4();
    const contextId = uuidv4();

    const response = await axios.post(`${API_URL}/context/start`, {
      origin: params.origin,
      intention: params.intention,
      serviceId: params.serviceId,
      sessionId,
      userId: params.userId,
      timestamp: new Date().toISOString()
    });

    const data: ContextData = {
      contextId: response.data.contextId || contextId,
      conversationId: response.data.conversationId || uuidv4(),
      origin: params.origin,
      intention: params.intention,
      serviceId: params.serviceId,
      sessionId,
      userId: params.userId,
      metadata: response.data.metadata
    };

    // Store context in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('current_context', JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.warn('[ContextService] Error starting context (usando fallback local):', error instanceof Error ? error.message : error);
    
    // Fallback to local context if backend fails
    const fallbackContext: ContextData = {
      contextId: uuidv4(),
      conversationId: uuidv4(),
      origin: params.origin,
      intention: params.intention,
      serviceId: params.serviceId,
      sessionId: uuidv4(),
      userId: params.userId
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('current_context', JSON.stringify(fallbackContext));
    }

    return fallbackContext;
  }
}

/**
 * Restore context from backend or localStorage
 */
export async function restoreContext(contextId: string): Promise<ContextData | null> {
  try {
    const response = await axios.get(`${API_URL}/context/restore`, {
      params: { contextId }
    });

    if (response.data) {
      const data: ContextData = response.data;
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('current_context', JSON.stringify(data));
      }

      return data;
    }

    return null;
  } catch (error) {
    console.warn('[ContextService] Error restoring context (usando localStorage):', error instanceof Error ? error.message : error);
    
    // Try to get from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('current_context');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.contextId === contextId) {
            return parsed as ContextData;
          }
        } catch (e) {
          console.error('[ContextService] Error parsing stored context:', e);
        }
      }
    }

    return null;
  }
}

/**
 * Get current context from localStorage
 */
export function getCurrentContext(): ContextData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem('current_context');
    if (stored) {
      return JSON.parse(stored) as ContextData;
    }
  } catch (error) {
    console.error('[ContextService] Error getting current context:', error);
  }

  return null;
}

/**
 * Clear current context
 */
export function clearContext(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('current_context');
  }
}

/**
 * Save pending purchase when user is not logged in
 */
export function savePendingPurchase(purchase: Omit<PendingPurchase, 'timestamp'>): void {
  if (typeof window === 'undefined') return;

  const pendingPurchase: PendingPurchase = {
    ...purchase,
    timestamp: Date.now()
  };

  localStorage.setItem('pending_purchase', JSON.stringify(pendingPurchase));
  console.log('[ContextService] Pending purchase saved:', pendingPurchase);
}

/**
 * Get pending purchase from localStorage
 */
export function getPendingPurchase(): PendingPurchase | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem('pending_purchase');
    if (stored) {
      const purchase = JSON.parse(stored) as PendingPurchase;
      
      // Check if purchase is not too old (24 hours)
      const age = Date.now() - purchase.timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (age < maxAge) {
        return purchase;
      } else {
        // Clear expired purchase
        clearPendingPurchase();
        return null;
      }
    }
  } catch (error) {
    console.error('[ContextService] Error getting pending purchase:', error);
  }

  return null;
}

/**
 * Clear pending purchase
 */
export function clearPendingPurchase(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('pending_purchase');
  }
}

/**
 * Update context metadata
 */
export async function updateContext(
  contextId: string,
  updates: Partial<ContextData>
): Promise<void> {
  try {
    await axios.patch(`${API_URL}/context/update`, {
      contextId,
      ...updates
    });

    // Update localStorage
    const current = getCurrentContext();
    if (current && current.contextId === contextId) {
      const updated = { ...current, ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem('current_context', JSON.stringify(updated));
      }
    }
  } catch (error) {
    console.error('[ContextService] Error updating context:', error);
  }
}

export default {
  startContext,
  restoreContext,
  getCurrentContext,
  clearContext,
  savePendingPurchase,
  getPendingPurchase,
  clearPendingPurchase,
  updateContext
};
