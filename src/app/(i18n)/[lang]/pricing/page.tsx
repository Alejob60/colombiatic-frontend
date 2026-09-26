// src/app/(i18n)/[lang]/pricing/page.tsx
"use client";

import { useState } from 'react';
import PricingPlans from '@/components/pricing/PricingPlans';
import { useTenant } from '@/contexts/TenantContext';

export default function PricingPage() {
  const { tenant } = useTenant();
  const [showAnnual, setShowAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Planes y Precios
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Elige el plan perfecto para tu negocio y comienza a transformarlo con inteligencia artificial.
          </p>
        </div>

        {/* Tenant Info */}
        {tenant && (
          <div className="mt-8 bg-blue-900/20 border border-blue-700 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-center text-blue-300">
              Planes disponibles para: <span className="font-medium">{tenant.name}</span>
            </p>
          </div>
        )}

        {/* Pricing Plans */}
        <div className="mt-16">
          <PricingPlans />
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Preguntas Frecuentes
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white">
                ¿Puedo cambiar de plan en cualquier momento?
              </h3>
              <p className="mt-2 text-gray-400">
                Sí, puedes actualizar o degradar tu plan en cualquier momento. 
                Los cambios se aplican de forma inmediata y se prorratean según el tiempo restante.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white">
                ¿Hay un período de prueba gratuito?
              </h3>
              <p className="mt-2 text-gray-400">
                Ofrecemos una prueba gratuita de 14 días para todos nuestros planes. 
                No se requiere tarjeta de crédito para comenzar.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white">
                ¿Qué métodos de pago aceptan?
              </h3>
              <p className="mt-2 text-gray-400">
                Aceptamos todas las principales tarjetas de crédito y débito, 
                así como pagos mediante transferencia bancaria y PayPal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}