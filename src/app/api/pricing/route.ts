// src/app/api/pricing/route.ts
import { NextResponse } from 'next/server';

// Mock pricing data - in a real app this would come from a database
const pricingPlans = [
  {
    id: 'starter',
    title: {
      es: 'Plan Starter',
      en: 'Starter Plan'
    },
    description: {
      es: 'Chat IA + Página inteligente básica',
      en: 'AI Chat + Basic intelligent page'
    },
    price_monthly: 39,
    price_annual: 390,
    features: {
      es: [
        "Asistente de chat IA básico",
        "Página web inteligente",
        "Respuestas predefinidas",
        "Integración con WhatsApp",
        "Panel de análisis básico"
      ],
      en: [
        "Basic AI chat assistant",
        "Intelligent web page",
        "Predefined responses",
        "WhatsApp integration",
        "Basic analytics panel"
      ]
    },
    trial_days: 14,
    limits: {
      requests_per_day: 100,
      users: 1
    }
  },
  {
    id: 'business',
    title: {
      es: 'Plan Business',
      en: 'Business Plan'
    },
    description: {
      es: 'IA + Ventas + Dashboard',
      en: 'AI + Sales + Dashboard'
    },
    price_monthly: 99,
    price_annual: 990,
    features: {
      es: [
        "Asistente de chat IA avanzado",
        "Sitio web personalizado",
        "Respuestas personalizadas",
        "Integración omnicanal",
        "Panel de análisis avanzado",
        "Automatización de ventas",
        "Soporte prioritario"
      ],
      en: [
        "Advanced AI chat assistant",
        "Custom website",
        "Custom responses",
        "Omnichannel integration",
        "Advanced analytics panel",
        "Sales automation",
        "Priority support"
      ]
    },
    trial_days: 14,
    limits: {
      requests_per_day: 1000,
      users: 5
    },
    isPopular: true
  },
  {
    id: 'enterprise',
    title: {
      es: 'Plan Enterprise',
      en: 'Enterprise Plan'
    },
    description: {
      es: 'Ecosistema completo + control de datos + publicidad IA',
      en: 'Complete ecosystem + data control + AI advertising'
    },
    price_monthly: 299,
    price_annual: 2990,
    features: {
      es: [
        "Asistente de chat IA premium",
        "Sitio web completamente personalizado",
        "Respuestas sin límites",
        "Integración completa",
        "Panel de análisis completo",
        "Automatización avanzada",
        "Control de datos",
        "Publicidad IA",
        "Soporte 24/7",
        "Onboarding personalizado"
      ],
      en: [
        "Premium AI chat assistant",
        "Fully custom website",
        "Unlimited responses",
        "Complete integration",
        "Full analytics panel",
        "Advanced automation",
        "Data control",
        "AI advertising",
        "24/7 support",
        "Custom onboarding"
      ]
    },
    trial_days: 14,
    limits: {
      requests_per_day: 10000,
      users: 50
    }
  }
];

// GET /api/pricing - Get pricing plans
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const locale = url.searchParams.get('locale') || 'es';
    
    // Validate locale
    const validLocale = locale === 'en' ? 'en' : 'es';
    
    // Return pricing plans localized to the requested locale
    const localizedPlans = pricingPlans.map(plan => ({
      ...plan,
      title: plan.title[validLocale as 'es' | 'en'],
      description: plan.description[validLocale as 'es' | 'en'],
      features: plan.features[validLocale as 'es' | 'en']
    }));
    
    return NextResponse.json(localizedPlans);
  } catch (error) {
    console.error('Error in pricing API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing plans' },
      { status: 500 }
    );
  }
}