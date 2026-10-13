// src/app/(i18n)/[lang]/checkout/page.tsx
"use client";

import CheckoutForm from '@/components/pricing/CheckoutForm';
import { PricingProvider, usePricing } from '@/contexts/PricingContext';

/**
 * `PricingProvider` solo estaba montado dentro de `pricing/page.tsx`, asi que
 * al navegar a /checkout directamente React lanzaba
 * "usePricing must be used within a PricingProvider" y la pagina devolvia 500.
 * Montarlo aqui cubre el acceso por URL, que es como entra un enlace de pago.
 */
export default function CheckoutPage() {
  return (
    <PricingProvider>
      <CheckoutContent />
    </PricingProvider>
  );
}

function CheckoutContent() {
  const { selectedPlan } = usePricing();

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Completar Compra
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            {selectedPlan 
              ? `Estás suscribiéndote al plan ${selectedPlan.name}` 
              : 'Por favor selecciona un plan para continuar'}
          </p>
        </div>

        {/* Checkout Form */}
        <div className="mt-16">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}