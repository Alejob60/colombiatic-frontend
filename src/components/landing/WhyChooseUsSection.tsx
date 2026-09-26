'use client';

import { motion } from 'framer-motion';
import { 
  Rocket, 
  Clock, 
  Zap, 
  Users, 
  Shield, 
  TrendingUp,
  Cpu,
  Heart
} from 'lucide-react';

const whyChooseUs = [
  {
    icon: Rocket,
    title: "Ecosistema Unificado IA + Omnicanal",
    description: "Integramos inteligencia artificial, comunicaciones omnicanal y automatización en una sola plataforma. Ningún competidor lo hace."
  },
  {
    icon: Clock,
    title: "Implementación Rápida en 48h",
    description: "Activación básica en 48 horas y solución completa en 5 días. Velocidad empresarial garantizada."
  },
  {
    icon: Zap,
    title: "Automatización Avanzada",
    description: "Agentes IA especializados, automatización comercial completa y procesos internos optimizados."
  },
  {
    icon: Cpu,
    title: "Twin AI Personalización Real",
    description: "Memoria contextual avanzada que personaliza cada interacción según el historial del cliente."
  },
  {
    icon: TrendingUp,
    title: "Métricas + Dashboards",
    description: "ROI medible desde la primera semana con dashboards personalizados y analítica predictiva."
  },
  {
    icon: Shield,
    title: "Mantenimiento y Optimización Continua",
    description: "Mejoras constantes, actualizaciones automáticas y soporte técnico especializado 24/7."
  },
  {
    icon: Users,
    title: "Tecnología Propietaria",
    description: "Desarrollamos nuestra propia IA especializada y plataforma integrada única en Latinoamérica."
  },
  {
    icon: Heart,
    title: "Impacto Social Responsable",
    description: "Creamos soluciones éticas que mejoran vidas y apoyan el talento tecnológico colombiano."
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Por qué elegir <span className="text-blue-400">ColombiaTIC</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ventajas diferenciales que nos posicionan como líderes en transformación digital con IA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-gray-400">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}