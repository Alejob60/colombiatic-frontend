// src/components/landing/EcosystemHowItWorksSection.tsx
"use client";

import { motion } from 'framer-motion';
import { 
  Scan, 
  Construction, 
  Zap, 
  BarChart3,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const getSteps = (locale: string) => {
  if (locale === 'en') {
    return [
      {
        icon: Scan,
        title: "We scan your business (Web DNA)",
        description: "Technical analysis + improvement opportunities."
      },
      {
        icon: Construction,
        title: "We build your intelligent presence",
        description: "Website, landing, optimization, flows."
      },
      {
        icon: Zap,
        title: "We install AI automations",
        description: "Sales, support, omnichannel, recommendations."
      },
      {
        icon: BarChart3,
        title: "Continuous optimization",
        description: "Monthly analysis + constant improvements."
      }
    ];
  }

  return [
    {
      icon: Scan,
      title: "Escaneamos tu negocio (ADN Web)",
      description: "Análisis técnico + oportunidad de mejoras."
    },
    {
      icon: Construction,
      title: "Construimos tu presencia inteligente",
      description: "Sitio, landing, optimización, flujos."
    },
    {
      icon: Zap,
      title: "Instalamos automatizaciones IA",
      description: "Ventas, soporte, omnicanal, recomendaciones."
    },
    {
      icon: BarChart3,
      title: "Optimización continua",
      description: "Análisis mensual + mejoras constantes."
    }
  ];
};

export default function EcosystemHowItWorksSection() {
  const { locale } = useLanguage();
  const steps = getSteps(locale);

  const title = locale === 'es' 
    ? 'Cómo Funciona el ' 
    : 'How the ';
    
  const subtitle = locale === 'es' 
    ? 'Ecosistema IA' 
    : 'AI Ecosystem Works';
    
  const description = locale === 'es' 
    ? 'Transformamos tu negocio en 4 pasos simples y efectivos' 
    : 'We transform your business in 4 simple and effective steps';
    
  const guaranteeText = locale === 'es' 
    ? 'Implementación garantizada en 48 horas' 
    : 'Guaranteed implementation in 48 hours';

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
            {title}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#00C2FF]">
              {subtitle}
            </span>
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#00C2FF] rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative w-20 h-20 mx-auto bg-[#18181B] border border-[#27272A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[#00C2FF]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#00C2FF] rounded-full flex items-center justify-center text-[#0A0A0A] text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-[#FFFFFF]">{step.title}</h3>
                <p className="text-[#A1A1AA]">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-[#18181B] bg-opacity-80 backdrop-blur-sm rounded-full border border-[#27272A]">
            <RefreshCw className="w-5 h-5 text-[#00C2FF] mr-2" />
            <span className="text-[#D4D4D8]">{guaranteeText}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}