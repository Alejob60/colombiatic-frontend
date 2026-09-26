// src/components/landing/AIEcosystemSection.tsx
// Sección del ecosistema de IA con animaciones y diseño premium

"use client";

import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Shield,
  Globe,
  MessageSquare,
  BarChart3,
  Lock
} from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

// Función para obtener las características del ecosistema según el idioma
const getEcosystemFeatures = (locale: string) => {
  const features = {
    es: [
      {
        icon: Brain,
        title: "Inteligencia Artificial Avanzada",
        description: "Modelos de lenguaje de última generación entrenados específicamente para negocios."
      },
      {
        icon: Zap,
        title: "Integraciones y eCommerce",
        description: "Shopify, WooCommerce, analítica, inventarios automáticos."
      },
      {
        icon: TrendingUp,
        title: "Analítica Predictiva",
        description: "Insights en tiempo real para decisiones inteligentes y oportunas."
      },
      {
        icon: Shield,
        title: "Seguridad Empresarial",
        description: "Protección avanzada de datos y cumplimiento normativo."
      },
      {
        icon: Globe,
        title: "Presencia Global",
        description: "Dominios personalizados, hosting global y CDN de alta velocidad."
      },
      {
        icon: MessageSquare,
        title: "Atención al Cliente IA",
        description: "Respuestas humanizadas 24/7 en múltiples canales simultáneamente."
      },
      {
        icon: BarChart3,
        title: "Dashboards Ejecutivos",
        description: "KPIs en tiempo real con alertas inteligentes y recomendaciones."
      },
      {
        icon: Lock,
        title: "Privacidad Garantizada",
        description: "Datos cifrados, auditorías regulares y políticas transparentes."
      }
    ],
    en: [
      {
        icon: Brain,
        title: "Advanced Artificial Intelligence",
        description: "State-of-the-art language models specifically trained for businesses."
      },
      {
        icon: Zap,
        title: "Integrations and eCommerce",
        description: "Shopify, WooCommerce, analytics, automatic inventory."
      },
      {
        icon: TrendingUp,
        title: "Predictive Analytics",
        description: "Real-time insights for smart and timely decisions."
      },
      {
        icon: Shield,
        title: "Enterprise Security",
        description: "Advanced data protection and regulatory compliance."
      },
      {
        icon: Globe,
        title: "Global Presence",
        description: "Custom domains, global hosting and high-speed CDN."
      },
      {
        icon: MessageSquare,
        title: "AI Customer Support",
        description: "Humanized responses 24/7 across multiple channels simultaneously."
      },
      {
        icon: BarChart3,
        title: "Executive Dashboards",
        description: "Real-time KPIs with smart alerts and recommendations."
      },
      {
        icon: Lock,
        title: "Guaranteed Privacy",
        description: "Encrypted data, regular audits and transparent policies."
      }
    ]
  };

  return features[locale as keyof typeof features] || features.es;
};

export default function AIEcosystemSection() {
  // Usar useTranslations en lugar de useLanguage
  const { locale } = useTranslations();
  const ecosystemFeatures = getEcosystemFeatures(locale);
  
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
            {locale === 'es' 
              ? '¿Qué es ColombiaTIC ' 
              : 'What is ColombiaTIC '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#00C2FF]">
              AI Ecosystem
            </span>?
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            {locale === 'es' 
              ? 'Un ecosistema unificado de inteligencia artificial que transforma tu negocio' 
              : 'A unified artificial intelligence ecosystem that transforms your business'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ecosystemFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-[#18181B] bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 border border-[#27272A] hover:border-[#0066FF]/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-[#0066FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#0066FF]/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#00C2FF]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#FFFFFF]">{feature.title}</h3>
                <p className="text-[#A1A1AA]">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}