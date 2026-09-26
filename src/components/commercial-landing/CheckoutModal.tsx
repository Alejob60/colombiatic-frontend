// src/components/commercial-landing/CheckoutModal.tsx
"use client";

import { useState } from 'react';
import { useQuickOrder } from '@/hooks/useQuickOrder';
import { usePaymentStatus } from '@/hooks/usePaymentStatus';
import { MockPaymentForm } from './MockPaymentForm';
import { OrderStatusIndicator } from './OrderStatusIndicator';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';

interface CheckoutModalProps {
  orderId: string;
  tenantId: string;
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete?: () => void;
}

export function CheckoutModal({ orderId, tenantId, isOpen, onClose, onPaymentComplete }: CheckoutModalProps) {
  const [step, setStep] = useState<'checkout' | 'mock-payment' | 'status'>('checkout');
  const { checkoutData, openCheckout, initiateCheckout, isLoading, error } = useQuickOrder();
  const { status, order, isPolling, startPolling } = usePaymentStatus({ 
    orderId, 
    tenantId,
    autoStart: step === 'status',
    onPaymentComplete: (completedOrder) => {
      onPaymentComplete?.();
    }
  });

  const handleInitiateCheckout = async () => {
    await initiateCheckout(orderId);
    setStep('checkout');
  };

  const handleOpenCheckout = () => {
    openCheckout();
    setStep('status');
    startPolling();
  };

  const handleMockPayment = () => {
    setStep('mock-payment');
  };

  const handlePaymentSuccess = () => {
    setStep('status');
    startPolling();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Proceso de Compra</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center py-8">
              <Loader />
              <p className="mt-4 text-gray-600">Procesando...</p>
            </div>
          )}

          {!isLoading && step === 'checkout' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Resumen de Orden</h3>
                <p className="text-gray-600">ID de Orden: {orderId}</p>
              </div>

              {checkoutData ? (
                <div className="space-y-4">
                  <Button 
                    onClick={handleOpenCheckout}
                    variant="default"
                    className="w-full"
                  >
                    Ir al Checkout ({checkoutData.provider})
                  </Button>
                  
                  {checkoutData.provider === 'mock' && (
                    <Button 
                      onClick={handleMockPayment}
                      variant="secondary"
                      className="w-full"
                    >
                      Simular Pago (Desarrollo)
                    </Button>
                  )}
                </div>
              ) : (
                <Button 
                  onClick={handleInitiateCheckout}
                  variant="default"
                  className="w-full"
                >
                  Iniciar Proceso de Pago
                </Button>
              )}

              {error && (
                <div className="text-red-500 text-center p-3 bg-red-50 rounded">
                  {error}
                </div>
              )}
            </div>
          )}

          {step === 'mock-payment' && (
            <MockPaymentForm 
              orderId={orderId}
              tenantId={tenantId}
              onPaymentSuccess={handlePaymentSuccess}
              onBack={() => setStep('checkout')}
            />
          )}

          {step === 'status' && (
            <div className="space-y-6">
              <OrderStatusIndicator 
                status={status || 'pending'} 
                order={order}
              />
              
              <div className="flex space-x-3">
                <Button 
                  onClick={onClose}
                  variant="secondary"
                >
                  Cerrar
                </Button>
                
                {isPolling && (
                  <Button 
                    onClick={() => {}}
                    variant="default"
                  >
                    Verificando...
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
