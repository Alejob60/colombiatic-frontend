// src/hooks/usePaymentStatus.ts
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import quickOrderService from '../services/quickOrderService';
import { OrderStatus, Order } from '../types/quickOrder.types';

export function usePaymentStatus({
  orderId,
  tenantId,
  pollingInterval = 3000,
  maxAttempts = 60,
  autoStart = false,
  onPaymentComplete,
}: {
  orderId: string;
  tenantId: string;
  pollingInterval?: number;
  maxAttempts?: number;
  autoStart?: boolean;
  onPaymentComplete?: (order: Order) => void;
}) {
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const attemptsRef = useRef(0);
  const prevStatusRef = useRef<OrderStatus | null>(null);

  const checkStatus = useCallback(async () => {
    try {
      const orderData = await quickOrderService.getOrderDetails(tenantId, orderId);
      setOrder(orderData);
      setStatus(orderData.status);
      
      if (prevStatusRef.current !== orderData.status && orderData.status === 'paid') {
        onPaymentComplete?.(orderData);
      }
      prevStatusRef.current = orderData.status;
      return orderData.status;
    } catch (err) {
      setError('Error al verificar estado');
      return null;
    }
  }, [tenantId, orderId, onPaymentComplete]);

  const startPolling = useCallback(() => {
    if (isPolling) return;
    setIsPolling(true);
    attemptsRef.current = 0;
    
    checkStatus();
    intervalRef.current = setInterval(async () => {
      attemptsRef.current += 1;
      const currentStatus = await checkStatus();
      
      if (attemptsRef.current >= maxAttempts || currentStatus === 'paid') {
        stopPolling();
      }
    }, pollingInterval);
  }, [isPolling, checkStatus, pollingInterval, maxAttempts]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
  }, []);

  useEffect(() => {
    if (autoStart && orderId && tenantId) startPolling();
    return () => stopPolling();
  }, [autoStart, orderId, tenantId, startPolling, stopPolling]);

  return { status, order, isPolling, error, startPolling, stopPolling };
}
