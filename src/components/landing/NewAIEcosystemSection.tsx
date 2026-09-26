// src/components/landing/NewAIEcosystemSection.tsx
"use client";

import { motion } from 'framer-motion';
import { Brain, Zap, Shield, TrendingUp } from 'lucide-react';

const benefits = [
  {
    icon: Brain,
    title: "Control total",
    description: "Gestiona todos tus servicios desde un solo panel intuitivo"
  },
  {
    icon: Zap,
    title: "Automatización 24/7",
    description: "Procesos repetitivos manejados automáticamente por IA"
  },
  {
    icon: TrendingUp,
    title: "Velocidad en decisiones",
    description: "Analítica predictiva para tomar decisiones informadas"
  },
  {
    icon: Shield,
    title: "Reducción de esfuerzo",
    description: "Hasta 80% menos de trabajo operativo manual"
  }
];

export default function NewAIEcosystemSection() {
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
            ¿Qué es <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#00C2FF]">ColombiaTIC AI Ecosystem</span>?
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto mt-4">
            Una plataforma unificada que combina inteligencia artificial, automatización y presencia digital para impulsar tu negocio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
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
                <h3 className="text-xl font-bold mb-2 text-[#FFFFFF]">{benefit.title}</h3>
                <p className="text-[#A1A1AA]">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}