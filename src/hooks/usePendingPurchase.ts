// src/hooks/usePendingPurchase.ts
import { useState, useEffect, useCallback } from 'react';

export interface PendingPurchase {
  selectedServiceId: string;
  intent: string;
  origin?: 'landing' | 'dashboard';
  conversationSummary?: string;
  serviceId?: string;
  intention?: string;
  contextId?: string;
}

const STORAGE_KEY = 'pending_purchase';

export const usePendingPurchase = () => {
  const [pendingPurchase, setPendingPurchase] = useState<PendingPurchase | null>(null);

  const getPendingPurchase = useCallback((): PendingPurchase | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    try {
      return JSON.parse(saved) as PendingPurchase;
    } catch (error) {
      console.error('Error parsing pending purchase:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    // Recuperar pending purchase de localStorage al cargar
    setPendingPurchase(getPendingPurchase());
  }, [getPendingPurchase]);

  const savePendingPurchase = (purchase: PendingPurchase) => {
    setPendingPurchase(purchase);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(purchase));
    }
  };

  const clearPendingPurchase = () => {
    setPendingPurchase(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    pendingPurchase,
    getPendingPurchase,
    savePendingPurchase,
    clearPendingPurchase
  };
};
