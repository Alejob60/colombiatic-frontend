// src/components/commercial-landing/QuickOrderButton.tsx
"use client";

import { useState } from 'react';
import { useQuickOrder } from '@/hooks/useQuickOrder';
import { usePaymentStatus } from '@/hooks/usePaymentStatus';
import { CheckoutModal } from './CheckoutModal';
import { Button } from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';

interface QuickOrderButtonProps {
  productId: string;
  quantity?: number;
  context?: Record<string, any>;
  metaAgentSessionId?: string;
  onOrderCreated?: (orderId: string) => void;
  onPaymentComplete?: (orderId: string) => void;
  children?: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function QuickOrderButton({
  productId,
  quantity = 1,
  context,
  metaAgentSessionId,
  onOrderCreated,
  onPaymentComplete,
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: QuickOrderButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  
  const { 
    createOrder, 
    isLoading: isCreatingOrder, 
    error: createOrderError 
  } = useQuickOrder(metaAgentSessionId);
  
  const { 
    status, 
    order, 
    isPolling,
    startPolling 
  } = usePaymentStatus({ 
    orderId: createdOrderId || '',
    tenantId: tenantId || '',
    onPaymentComplete: (completedOrder) => {
      onPaymentComplete?.(completedOrder.id);
    }
  });

  const handleCreateOrder = async () => {
    try {
      // Obtener tenantId antes de crear la orden
      const tenantIdFromToken = localStorage.getItem('colombiatic_jwt') 
        ? JSON.parse(atob(localStorage.getItem('colombiatic_jwt')!.split('.')[1])).tenantId 
        : 'colombiatic-001';
      
      setTenantId(tenantIdFromToken);
      
      const orderId = await createOrder(productId, quantity, context);
      
      if (orderId) {
        setCreatedOrderId(orderId);
        onOrderCreated?.(orderId);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('[QuickOrderButton] Error creando orden:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Resetear estado
    setCreatedOrderId(null);
    setTenantId(null);
  };

  return (
    <>
      <Button
        onClick={handleCreateOrder}
        variant={variant || 'default'}
        size={size}
        className={className}
        disabled={isCreatingOrder}
      >
        {isCreatingOrder ? (
          <>
            <Loader size="sm" />
            Procesando...
          </>
        ) : (
          children || 'Comprar Ahora'
        )}
      </Button>

      {createOrderError && (
        <div className="text-red-500 text-sm mt-1">
          {createOrderError}
        </div>
      )}

      {createdOrderId && tenantId && (
        <CheckoutModal
          orderId={createdOrderId}
          tenantId={tenantId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onPaymentComplete={() => {
            onPaymentComplete?.(createdOrderId);
            handleCloseModal();
          }}
        />
      )}
    </>
  );
}
