// src/components/landing/AdvancedAISection.tsx
"use client";

import { motion } from 'framer-motion';
import { 
  Brain, 
  UserCircle, 
  Sparkles, 
  MessageSquare,
  Zap,
  BarChart3
} from 'lucide-react';

const aiFeatures = [
  {
    icon: Brain,
    title: "Twin Memory – Personalización dinámica",
    description: "Memoria contextual avanzada que recuerda preferencias y comportamientos para personalizar cada interacción."
  },
  {
    icon: Sparkles,
    title: "Recomendaciones IA – Productos/servicios inteligentes",
    description: "Sugerencias personalizadas basadas en análisis predictivo y patrones de comportamiento del usuario."
  },
  {
    icon: UserCircle,
    title: "Agentes FrontDesk – Atención 24/7",
    description: "Asistentes virtuales inteligentes disponibles las 24 horas para atención al cliente y soporte técnico."
  },
  {
    icon: Zap,
    title: "Automatizaciones empresariales – Procesos internos IA",
    description: "Optimización de procesos internos mediante automatización inteligente y toma de decisiones basada en datos."
  },
  {
    icon: MessageSquare,
    title: "Embudo inteligente post-anuncio (Misybot)",
    description: "Sistema de seguimiento y conversión automatizado que maximiza el retorno de inversión de campañas publicitarias."
  },
  {
    icon: BarChart3,
    title: "Analítica Predictiva Avanzada",
    description: "Insights en tiempo real con modelos de predicción para anticipar tendencias y comportamientos del mercado."
  }
];

export default function AdvancedAISection() {
  return (
    <section className="py-20 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sección IA <span className="gradient-text">Avanzada</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Agentes inteligentes que convierten y fidelizan clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}