// src/components/sections/WhyChooseUsSection.tsx
'use client';

import { Brain, ShieldCheck, Globe, Server, Bot, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Globe size={32} className="text-primary" />,
    title: "Aplicaciones Web Modernas",
    description:
      "Creamos plataformas web escalables, rápidas y seguras con tecnologías como React, Next.js y Spring Boot.",
  },
  {
    icon: <Link2 size={32} className="text-primary" />,
    title: "Integración con Sistemas Empresariales",
    description:
      "Conectamos APIs, servicios en la nube y sistemas legados para una operación empresarial fluida.",
  },
  {
    icon: <Server size={32} className="text-primary" />,
    title: "Microservicios & Backend Sólido",
    description:
      "Diseñamos backends robustos con Java, Spring Boot y AWS, optimizados para rendimiento y seguridad.",
  },
  {
    icon: <Bot size={32} className="text-primary" />,
    title: "Drones Autónomos sin Internet",
    description:
      "Sistemas de control autónomo para agro y defensa, operando sin conexión gracias a IA y redes locales.",
  },
  {
    icon: <ShieldCheck size={32} className="text-primary" />,
    title: "Seguridad para Gobierno y Defensa",
    description:
      "Soluciones de protección, control de comunicaciones y análisis inteligente de datos críticos.",
  },
  {
    icon: <Brain size={32} className="text-primary" />,
    title: "Tecnología para Marketing Político",
    description:
      "Bots, plataformas y analítica avanzada para campañas electorales y participación ciudadana digital.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="porque" className="relative py-24 bg-background text-white">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2
          className="text-center text-3xl sm:text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          ¿Por qué elegir a Colombia TIC?
        </motion.h2>
        <p className="text-center text-lg md:text-2xl font-medium text-gray-300 mb-12 max-w-3xl mx-auto">
  Innovación, <span className="text-accent font-semibold">seguridad</span> y soluciones a la medida para tu organización.
</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-background/80 ring-1 ring-white/5 hover:ring-primary transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
