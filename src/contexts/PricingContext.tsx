// src/contexts/PricingContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  tenantId?: string;
}

interface PricingContextType {
  plans: Plan[];
  loading: boolean;
  error: string | null;
  fetchPlans: (tenantId?: string) => Promise<void>;
  selectPlan: (planId: string) => void;
  selectedPlan: Plan | null;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

// Mock plans data
const mockPlans: Plan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 49,
    period: 'month',
    description: 'Perfecto para pequeñas empresas que comienzan',
    features: [
      { name: 'Sitio web básico con IA', included: true },
      { name: 'Chat en sitio web', included: true },
      { name: '500 mensajes mensuales', included: true },
      { name: 'Estadísticas básicas', included: true },
      { name: 'Integración con redes sociales', included: false },
      { name: 'Soporte prioritario', included: false }
    ]
  },
  {
    id: 'professional',
    name: 'Profesional',
    price: 99,
    period: 'month',
    description: 'Para empresas en crecimiento',
    features: [
      { name: 'Sitio web avanzado con IA', included: true },
      { name: 'Chat omnicanal', included: true },
      { name: '2,000 mensajes mensuales', included: true },
      { name: 'Estadísticas avanzadas', included: true },
      { name: 'Integración con redes sociales', included: true },
      { name: 'Soporte prioritario', included: false }
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    price: 199,
    period: 'month',
    description: 'Para grandes empresas con altas demandas',
    features: [
      { name: 'Sitio web premium con IA', included: true },
      { name: 'Chat omnicanal ilimitado', included: true },
      { name: 'Mensajes ilimitados', included: true },
      { name: 'Estadísticas avanzadas', included: true },
      { name: 'Integración con redes sociales', included: true },
      { name: 'Soporte prioritario', included: true }
    ]
  }
];

export function PricingProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const fetchPlans = async (tenantId?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would call the backend API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // If tenantId is provided, we could fetch tenant-specific plans
      // For now, we'll just return the mock plans
      setPlans(mockPlans);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  };

  const selectPlan = (planId: string) => {
    const plan = plans.find(p => p.id === planId) || null;
    setSelectedPlan(plan);
  };

  // Initialize plans
  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <PricingContext.Provider value={{ plans, loading, error, fetchPlans, selectPlan, selectedPlan }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
}