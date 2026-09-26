// src/components/sections/HowItWorks.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Settings, 
  Rocket, 
  BarChart3, 
  Users, 
  Shield 
} from "lucide-react";

const steps = [
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: "Descubre",
    description: "Identificamos tus necesidades y objetivos específicos"
  },
  {
    icon: <Settings className="w-8 h-8 text-secondary" />,
    title: "Configura",
    description: "Personalizamos la solución según tu modelo de negocio"
  },
  {
    icon: <Rocket className="w-8 h-8 text-accent" />,
    title: "Activa",
    description: "Implementamos y lanzamos tu ecosistema en 48 horas"
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Mide",
    description: "Monitoreamos el rendimiento y resultados obtenidos"
  },
  {
    icon: <Users className="w-8 h-8 text-secondary" />,
    title: "Escala",
    description: "Ampliamos capacidades según tu crecimiento"
  }
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Cómo <span className="gradient-text">Funciona</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transforma tu negocio en 5 pasos simples y efectivos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative w-20 h-20 mx-auto bg-surface border border-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-surface/80 backdrop-blur-sm rounded-full border border-gray-800">
            <Shield className="w-5 h-5 text-primary mr-2" />
            <span className="text-gray-300">Implementación garantizada en 48 horas</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}