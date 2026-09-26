// src/components/landing/SuccessMetricsSection.tsx
"use client";

import { motion } from 'framer-motion';
import { TrendingUp, Target, Clock, DollarSign } from 'lucide-react';

const successCases = [
  {
    company: "Empresa Manufacturera",
    metric: "+40%",
    description: "en leads calificados en 3 meses"
  },
  {
    company: "Tienda E-commerce",
    metric: "+65%",
    description: "en conversión de carrito abandonado"
  },
  {
    company: "Consultora",
    metric: "-70%",
    description: "en tiempo de atención al cliente"
  },
  {
    company: "Artista Independiente",
    metric: "+120%",
    description: "en engagement en redes sociales"
  }
];

export default function SuccessMetricsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Casos de <span className="gradient-text">Éxito</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Resultados reales que demuestran el impacto de nuestra plataforma
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {successCases.map((caseStudy, index) => (
            <motion.div
              key={index}
              className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-2 text-gray-300">{caseStudy.company}</h3>
              <div className="text-3xl font-bold text-primary my-3">{caseStudy.metric}</div>
              <p className="text-gray-400">{caseStudy.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <motion.div
            className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">Ahorro</div>
            <p className="text-gray-400 text-sm">
              Reducción de costos operativos hasta en un 70%
            </p>
          </motion.div>

          <motion.div
            className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Target className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">Incremento</div>
            <p className="text-gray-400 text-sm">
              Aumento de ventas hasta 3x en sectores clave
            </p>
          </motion.div>

          <motion.div
            className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">Eficiencia</div>
            <p className="text-gray-400 text-sm">
              Automatización de hasta 80% de tareas repetitivas
            </p>
          </motion.div>

          <motion.div
            className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">ROI</div>
            <p className="text-gray-400 text-sm">
              Retorno sobre inversión promedio del 300% en 6 meses
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}