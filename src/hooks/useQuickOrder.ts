// src/hooks/useQuickOrder.ts
"use client";

import { useState, useCallback } from 'react';
import quickOrderService from '../services/quickOrderService';
import paymentService from '../services/paymentService';
import { Order, QuickCheckoutResponse, QuickOrderAPIError } from '../types/quickOrder.types';

export function useQuickOrder(metaAgentSessionId?: string) {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutData, setCheckoutData] = useState<QuickCheckoutResponse | null>(null);

  const createOrder = useCallback(async (productId: string, quantity = 1, context?: Record<string, any>) => {
    setIsLoading(true);
    setError(null);
    try {
      const tenantId = quickOrderService.getTenantIdFromToken();
      const response = await quickOrderService.createQuickOrder(tenantId, {
        productId,
        quantity,
        channel: 'web',
        metaAgentSessionId,
        context: { source: 'colombiatic-chat', ...context },
      });
      const order = await quickOrderService.getOrderDetails(tenantId, response.data.orderId);
      setCurrentOrder(order);
      return response.data.orderId;
    } catch (err) {
      setError(err instanceof QuickOrderAPIError ? err.message : 'Error al crear orden');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [metaAgentSessionId]);

  const initiateCheckout = useCallback(async (orderId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const tenantId = quickOrderService.getTenantIdFromToken();
      const response = await paymentService.initiateQuickCheckout({
        tenantId,
        orderId,
        returnUrl: paymentService.getReturnUrl(),
      });
      setCheckoutData(response);
    } catch (err) {
      setError(err instanceof QuickOrderAPIError ? err.message : 'Error al iniciar checkout');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openCheckout = useCallback(() => {
    if (checkoutData) {
      paymentService.openCheckoutWindow(checkoutData.checkoutUrl);
    }
  }, [checkoutData]);

  return {
    currentOrder,
    isLoading,
    error,
    checkoutData,
    createOrder,
    initiateCheckout,
    openCheckout,
    clearError: () => setError(null),
    resetOrder: () => { setCurrentOrder(null); setCheckoutData(null); setError(null); },
  };
}
