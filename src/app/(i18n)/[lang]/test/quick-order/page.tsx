// src/app/(i18n)/[lang]/test/quick-order/page.tsx
"use client";

import { useState } from 'react';
import { QuickOrderButton } from '@/components/commercial-landing/QuickOrderButton';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function QuickOrderTestPage() {
  const [events, setEvents] = useState<string[]>([]);

  const handleOrderCreated = (orderId: string) => {
    setEvents(prev => [...prev, `Orden creada: ${orderId}`]);
  };

  const handlePaymentComplete = (orderId: string) => {
    setEvents(prev => [...prev, `Pago completado para orden: ${orderId}`]);
  };

  const clearEvents = () => {
    setEvents([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Demo de Compra Rápida</h1>
        
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Productos de Ejemplo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Servicio Básico</h3>
              <p className="text-gray-600 text-sm mb-4">Plan básico con características esenciales</p>
              <QuickOrderButton
                productId="service-basic-001"
                quantity={1}
                context={{ plan: 'basic', source: 'demo' }}
                onOrderCreated={handleOrderCreated}
                onPaymentComplete={handlePaymentComplete}
                variant="primary"
              >
                Comprar Básico ($29)
              </QuickOrderButton>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Servicio Premium</h3>
              <p className="text-gray-600 text-sm mb-4">Plan premium con todas las características</p>
              <QuickOrderButton
                productId="service-premium-001"
                quantity={1}
                context={{ plan: 'premium', source: 'demo' }}
                onOrderCreated={handleOrderCreated}
                onPaymentComplete={handlePaymentComplete}
                variant="secondary"
              >
                Comprar Premium ($99)
              </QuickOrderButton>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Eventos del Sistema</h2>
            <Button onClick={clearEvents} variant="outline" size="sm">
              Limpiar
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
            {events.length === 0 ? (
              <p className="text-gray-500 italic">No hay eventos aún...</p>
            ) : (
              <ul className="space-y-2">
                {events.map((event, index) => (
                  <li key={index} className="text-sm">
                    <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {event}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
