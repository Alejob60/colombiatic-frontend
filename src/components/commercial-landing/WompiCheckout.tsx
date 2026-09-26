// src/components/commercial-landing/WompiCheckout.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '@/types/colombiatic';
import wompiService from '@/services/wompi.service';
import { Button } from '@/components/ui/Button';
import { 
  ExternalLink, 
  CreditCard, 
  Shield, 
  Lock, 
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface WompiCheckoutProps {
  service: ServiceItem;
  userId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function WompiCheckout({ service, userId, onSuccess, onCancel }: WompiCheckoutProps) {
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createCheckout = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Calculate amount
        const amount = wompiService.calculateAmount(service);
        
        // Create order with Wompi
        const orderResponse = await wompiService.createOrder({
          userId,
          moduleId: service.id,
          amount,
          currency: 'COP',
          callbackUrl: `${window.location.origin}/dashboard/wompi/callback`
        });
        
        setCheckoutUrl(orderResponse.checkoutUrl);
      } catch (err) {
        console.error('Error creating checkout:', err);
        setError('Failed to create checkout session');
      } finally {
        setLoading(false);
      }
    };

    createCheckout();
  }, [service, userId]);

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-gray-300">Preparando tu pago seguro...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Error al procesar el pago</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Confirmar Compra</h2>
        <p className="text-gray-400">
          Estás a punto de adquirir <span className="text-white font-semibold">{service.name}</span>
        </p>
      </div>

      <div className="bg-surface/50 rounded-xl p-6 mb-8 border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-300">Producto</span>
          <span className="text-white font-medium">{service.name}</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-300">Precio</span>
          <span className="text-2xl font-bold text-primary">
            ${service.price_cop.toLocaleString('es-CO')}
          </span>
        </div>
        
        {service.billing_cycle === 'mensual' && (
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Facturación</span>
            <span className="text-white">Mensual</span>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <Shield className="w-5 h-5 text-blue-400" />
          <span className="text-sm text-blue-300">
            Pago 100% seguro con encriptación SSL
          </span>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
          <Lock className="w-5 h-5 text-green-400" />
          <span className="text-sm text-green-300">
            Tus datos están protegidos y nunca serán compartidos
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button onClick={handleCheckout} className="flex-1 group">
          <CreditCard className="w-5 h-5 mr-2" />
          Proceder al Pago
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Al proceder, serás redirigido a la pasarela de pago segura de Wompi
        </p>
      </div>
    </div>
  );
}