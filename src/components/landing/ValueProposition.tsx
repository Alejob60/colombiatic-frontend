// src/components/landing/ValueProposition.tsx
"use client";

import { motion } from 'framer-motion';
import { 
  Rocket, 
  Bot, 
  Monitor, 
  DollarSign, 
  Repeat, 
  Wrench 
} from 'lucide-react';

const benefits = [
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "Implementación rápida",
    description: "Procesos optimizados para entregar resultados en tiempo récord"
  },
  {
    icon: <Bot className="w-8 h-8 text-secondary" />,
    title: "IA conversacional multicanal",
    description: "Atención automatizada en todos tus canales de comunicación"
  },
  {
    icon: <Monitor className="w-8 h-8 text-accent" />,
    title: "Webs modernas y escalables",
    description: "Sitios web profesionales que crecen con tu negocio"
  },
  {
    icon: <DollarSign className="w-8 h-8 text-primary" />,
    title: "Sistemas de venta automática",
    description: "Convierte visitantes en clientes las 24 horas del día"
  },
  {
    icon: <Repeat className="w-8 h-8 text-secondary" />,
    title: "Automatización 24/7",
    description: "Procesos sin interrupciones, productividad constante"
  },
  {
    icon: <Wrench className="w-8 h-8 text-accent" />,
    title: "Soporte experto + IA guiada",
    description: "Asistencia técnica avanzada con acompañamiento inteligente"
  }
];

export default function ValueProposition() {
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
            Beneficios <span className="gradient-text">Clave</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transformamos tu negocio con tecnología de vanguardia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-surface/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">
                <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}