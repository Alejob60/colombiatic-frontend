// src/components/sections/Pricing.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import PricingCard from "@/components/ui/PricingCard";
import { useEffect, useState } from "react";

interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price_monthly: number;
  price_annual: number;
  features: string[];
  trial_days: number;
  limits: {
    requests_per_day: number;
    users: number;
  };
  isPopular?: boolean;
}

export default function Pricing() {
  const { t, locale } = useLanguage();
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        setLoading(true);
        // Use absolute path for API calls
        const response = await fetch(`/api/pricing?locale=${locale}`);
        const plans = await response.json();
        setPricingPlans(plans);
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
        // Fallback to default plans
        setPricingPlans([
          {
            id: 'starter',
            title: t('pricing.starter.name') || 'Starter',
            description: t('pricing.starter.description') || 'Perfecto para pequeñas empresas',
            price_monthly: 39,
            price_annual: 390,
            features: [
              "Asistente de chat IA básico",
              "Página web inteligente",
              "Respuestas predefinidas",
              "Integración con WhatsApp",
              "Panel de análisis básico"
            ],
            trial_days: 14,
            limits: {
              requests_per_day: 100,
              users: 1
            }
          },
          {
            id: 'business',
            title: t('pricing.business.name') || 'Business',
            description: t('pricing.business.description') || 'Ideal para empresas en crecimiento',
            price_monthly: 99,
            price_annual: 990,
            features: [
              "Asistente de chat IA avanzado",
              "Sitio web personalizado",
              "Respuestas personalizadas",
              "Integración omnicanal",
              "Panel de análisis avanzado",
              "Automatización de ventas",
              "Soporte prioritario"
            ],
            trial_days: 14,
            limits: {
              requests_per_day: 1000,
              users: 5
            },
            isPopular: true
          },
          {
            id: 'enterprise',
            title: t('pricing.enterprise.name') || 'Enterprise',
            description: t('pricing.enterprise.description') || 'Para grandes organizaciones',
            price_monthly: 299,
            price_annual: 2990,
            features: [
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
            trial_days: 14,
            limits: {
              requests_per_day: 10000,
              users: 50
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingPlans();
  }, [locale, t]);

  if (loading) {
    return (
      <section id="pricing" className="py-24 px-6 bg-background text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('pricing.title') || 'Planes y Precios'}
            </h2>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 px-6 bg-background text-white">
      <div className="max-w-7xl mx-auto">
        {/* Fireblocks-style header section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('pricing.title') || 'Planes y Precios'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            {t('pricing.subtitle') || 'Elige el plan perfecto para tu negocio'}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Fireblocks-inspired pricing cards with clear divisions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PricingCard
                title={plan.title}
                price_monthly={plan.price_monthly}
                price_annual={plan.price_annual}
                features={plan.features}
                cta_label={t('pricing.cta') || 'Comenzar'}
                trial_days={plan.trial_days}
                limits={plan.limits}
                isPopular={plan.isPopular}
              />
            </motion.div>
          ))}
        </div>

        {/* Fireblocks-style comparison section */}
        <motion.div
          className="mt-20 text-center bg-gradient-to-r from-primary/10 to-tertiary/10 rounded-2xl p-12 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            {t('pricing.compare_plans') || 'Comparar planes detalladamente'}
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            {t('pricing.compare_desc') || 'Descubre todas las características de cada plan para tomar la mejor decisión'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/es/pricing-comparison"
              className="relative inline-flex items-center justify-center px-8 py-4 text-white font-medium text-base rounded-lg bg-primary hover:bg-blue-700 transition duration-300 group overflow-hidden shadow-lg hover:shadow-xl"
            >
              <span className="absolute inset-0 w-full h-full bg-blue-700 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center opacity-20"></span>
              <span className="relative z-10 flex items-center">
                {t('pricing.view_comparison') || 'Ver comparación detallada'}
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}