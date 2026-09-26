// src/hooks/usePendingPurchase.ts
import { useState, useEffect } from 'react';

export interface PendingPurchase {
  serviceId: string;
  intention: string;
  contextId?: string;
  conversationSummary?: string;
}

export const usePendingPurchase = () => {
  const [pendingPurchase, setPendingPurchase] = useState<PendingPurchase | null>(null);

  useEffect(() => {
    // Recuperar pending purchase de localStorage al cargar
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pending_purchase');
      if (saved) {
        try {
          setPendingPurchase(JSON.parse(saved));
        } catch (error) {
          console.error('Error parsing pending purchase:', error);
        }
      }
    }
  }, []);

  const savePendingPurchase = (purchase: PendingPurchase) => {
    setPendingPurchase(purchase);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pending_purchase', JSON.stringify(purchase));
    }
  };

  const clearPendingPurchase = () => {
    setPendingPurchase(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pending_purchase');
    }
  };

  return {
    pendingPurchase,
    savePendingPurchase,
    clearPendingPurchase
  };
};