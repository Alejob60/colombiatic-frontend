// src/components/landing/SuccessCasesSection.tsx
"use client";

import { motion } from 'framer-motion';
import { 
  Building, 
  ShoppingCart, 
  Users, 
  GraduationCap,
  Heart,
  BarChart3
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const getSuccessCases = (locale: string) => {
  if (locale === 'en') {
    return [
      {
        icon: Building,
        industry: "Ecommerce",
        metric: "65% ↑",
        description: "Increase in conversions",
        result: "320% ROI in 6 months"
      },
      {
        icon: Users,
        industry: "Consulting",
        metric: "82% ↓",
        description: "Reduction in response times",
        result: "98% customer satisfaction"
      },
      {
        icon: ShoppingCart,
        industry: "Corporate Services",
        metric: "45% ↑",
        description: "Increase in qualified leads",
        result: "75% query automation"
      },
      {
        icon: GraduationCap,
        industry: "Education",
        metric: "3x",
        description: "More students reached",
        result: "95% student retention"
      },
      {
        icon: Heart,
        industry: "Clinics / Private Health",
        metric: "50% ↓",
        description: "Reduction in cancellations",
        result: "24/7 scheduling without errors"
      },
      {
        icon: BarChart3,
        industry: "Finance",
        metric: "2.5x",
        description: "Improved attention",
        result: "92% operational efficiency"
      }
    ];
  }

  return [
    {
      icon: Building,
      industry: "Ecommerce",
      metric: "65% ↑",
      description: "Incremento en conversiones",
      result: "ROI del 320% en 6 meses"
    },
    {
      icon: Users,
      industry: "Consultoría",
      metric: "82% ↓",
      description: "Reducción en tiempos de respuesta",
      result: "98% satisfacción del cliente"
    },
    {
      icon: ShoppingCart,
      industry: "Servicios corporativos",
      metric: "45% ↑",
      description: "Aumento en leads cualificados",
      result: "Automatización del 75% de consultas"
    },
    {
      icon: GraduationCap,
      industry: "Educación",
      metric: "3x",
      description: "Más estudiantes alcanzados",
      result: "95% retención de alumnos"
    },
    {
      icon: Heart,
      industry: "Clínicas / Salud privada",
      metric: "50% ↓",
      description: "Reducción en cancelaciones",
      result: "Agendamiento 24/7 sin error"
    },
    {
      icon: BarChart3,
      industry: "Finanzas",
      metric: "2.5x",
      description: "Mejora en atención",
      result: "92% eficiencia operativa"
    }
  ];
};

export default function SuccessCasesSection() {
  const { locale } = useLanguage();
  const successCases = getSuccessCases(locale);

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'es' ? 'Casos de ' : 'Success '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#00C2FF]">
              {locale === 'es' ? 'Éxito' : 'Stories'}
            </span>
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            {locale === 'es' 
              ? 'Descubre cómo empresas de diferentes sectores han transformado sus operaciones' 
              : 'Discover how companies from different sectors have transformed their operations'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successCases.map((caseItem, index) => {
            const Icon = caseItem.icon;
            return (
              <motion.div
                key={index}
                className="bg-[#18181B] bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 border border-[#27272A] hover:border-[#0066FF]/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0066FF]/10 flex items-center justify-center group-hover:bg-[#0066FF]/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#00C2FF]" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#00C2FF]">{caseItem.metric}</div>
                    <div className="text-xs text-[#A1A1AA]">{caseItem.industry}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2 text-[#FFFFFF]">{caseItem.description}</h3>
                <p className="text-[#A1A1AA] text-sm">{caseItem.result}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-[#18181B] bg-opacity-80 backdrop-blur-sm rounded-full border border-[#27272A]">
            <span className="text-[#D4D4D8]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#00C2FF] font-bold">+500</span> 
              {locale === 'es' 
                ? ' empresas transformadas en 2025' 
                : ' companies transformed in 2025'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}