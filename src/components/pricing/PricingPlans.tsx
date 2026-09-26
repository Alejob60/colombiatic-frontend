// src/components/pricing/PricingPlans.tsx
"use client";

import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { usePricing } from '@/contexts/PricingContext';
import { useRouter } from 'next/navigation';

export default function PricingPlans() {
  const { plans, loading, error, selectPlan } = usePricing();
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');
  const router = useRouter();

  const handleSelectPlan = (planId: string) => {
    selectPlan(planId);
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 text-center">
        <p className="text-red-300">Error al cargar los planes: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-800 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setBillingPeriod('month')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'month'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setBillingPeriod('year')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'year'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Anual (Ahorra 20%)
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const price = billingPeriod === 'year' ? plan.price * 10 : plan.price;
          const period = billingPeriod === 'year' ? 'año' : 'mes';
          
          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl bg-gray-800 border ${
                plan.popular
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-gray-700'
              } p-6 shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                  MÁS POPULAR
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-gray-400">{plan.description}</p>
                
                <div className="mt-6">
                  <span className="text-4xl font-bold text-white">${price}</span>
                  <span className="text-gray-400">/{period}</span>
                </div>
                
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`mt-6 w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary hover:bg-blue-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  Seleccionar Plan
                </button>
              </div>
              
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {feature.included ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <span className={`ml-3 text-sm ${feature.included ? 'text-gray-300' : 'text-gray-500'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}