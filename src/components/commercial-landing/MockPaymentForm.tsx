// src/components/commercial-landing/MockPaymentForm.tsx
"use client";

import { useState } from 'react';
import { useQuickOrder } from '@/hooks/useQuickOrder';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

interface MockPaymentFormProps {
  orderId: string;
  tenantId: string;
  onPaymentSuccess?: () => void;
  onBack?: () => void;
}

export function MockPaymentForm({ orderId, tenantId, onPaymentSuccess, onBack }: MockPaymentFormProps) {
  const [status, setStatus] = useState<'approved' | 'declined'>('approved');
  const { isLoading, error, clearError } = useQuickOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      // Simular pago mock
      const response = await fetch('/api/payments/mock-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, tenantId, status }),
      });
      
      if (response.ok) {
        onPaymentSuccess?.();
      } else {
        throw new Error('Error al simular pago');
      }
    } catch (err) {
      console.error('[MockPaymentForm] Error:', err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Simulación de Pago</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Número de Orden</label>
          <Input 
            value={orderId} 
            readOnly 
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Resultado del Pago</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="approved"
                checked={status === 'approved'}
                onChange={() => setStatus('approved')}
                className="mr-2"
              />
              Aprobado
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="declined"
                checked={status === 'declined'}
                onChange={() => setStatus('declined')}
                className="mr-2"
              />
              Rechazado
            </label>
          </div>
        </div>
        
        <div className="flex space-x-3 pt-4">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onBack}
            disabled={isLoading}
          >
            Volver
          </Button>
          <Button 
            type="submit" 
            variant="default" 
            className="flex-1"
          >
            {isLoading ? 'Procesando...' : 'Simular Pago'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
