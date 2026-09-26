// src/components/dashboard/ServiceDetail.tsx
"use client";

import { motion } from 'framer-motion';
import { Bot, Globe, MessageSquare, BarChart3, ShoppingCart, Music, TrendingUp, Users, Settings } from 'lucide-react';
import Link from 'next/link';

// Definición de tipos
interface ServiceMetric {
  name: string;
  value: string | number;
  change?: string;
}

interface UseCase {
  title: string;
  description: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  useCases: UseCase[];
  metrics: ServiceMetric[];
  configurationSteps: string[];
  tags: string[];
}

const serviceIcons = {
  "IA": Bot,
  "Web": Globe,
  "Omnicanal": MessageSquare,
  "Analítica": BarChart3,
  "E-Commerce": ShoppingCart,
  "Artistas": Music
};

const metricIcons = {
  "mensajes/día": MessageSquare,
  "conversaciones resueltas": Bot,
  "satisfacción del usuario": TrendingUp,
  "conversiones por IA": TrendingUp,
  "velocidad": TrendingUp,
  "Core Web Vitals": Globe,
  "errores": BarChart3,
  "mejoras sugeridas": Settings,
  "métricas de fans": Users,
  "top fans": Users,
  "playlist generadas": Music,
  "ventas de merch": ShoppingCart
};

export default function ServiceDetail({ service }: { service: Service }) {
  // Obtener el icono principal basado en las etiquetas
  const primaryTag = service.tags[0] || "IA";
  const IconComponent = serviceIcons[primaryTag as keyof typeof serviceIcons] || Bot;

  return (
    <div className="space-y-8">
      {/* Encabezado del servicio */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mr-6">
              <IconComponent className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{service.name}</h1>
              <p className="text-gray-400">{service.description}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {service.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <p className="mt-6 text-gray-300 leading-relaxed">
          {service.longDescription}
        </p>
      </motion.div>

      {/* Casos de uso */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Casos de Uso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.useCases.map((useCase, index) => (
            <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
              <h3 className="font-bold text-white mb-2">{useCase.title}</h3>
              <p className="text-gray-400">{useCase.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Métricas */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Métricas Asociadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.metrics.map((metric, index) => {
            const MetricIcon = metricIcons[metric.name as keyof typeof metricIcons] || BarChart3;
            return (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center mb-2">
                  <MetricIcon className="w-5 h-5 text-primary mr-2" />
                  <h3 className="font-bold text-white">{metric.name}</h3>
                </div>
                <div className="text-2xl font-bold text-primary my-1">{metric.value}</div>
                {metric.change && (
                  <div className="text-sm text-gray-400">{metric.change}</div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Línea de configuración */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Configuración</h2>
        <div className="space-y-4">
          {service.configurationSteps.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                <span className="text-primary font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-300">{step}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Botón de acción */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Link 
          href={`/service/${service.id}/activate`}
          className="px-8 py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 inline-flex items-center"
        >
          Activar Servicio
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}