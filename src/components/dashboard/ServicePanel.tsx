// src/components/dashboard/ServicePanel.tsx
"use client";

import { motion } from 'framer-motion';
import { 
  Bot, 
  Globe, 
  MessageSquare, 
  BarChart3, 
  ShoppingCart, 
  Music, 
  TrendingUp, 
  Users, 
  Settings,
  Zap,
  Headphones
} from 'lucide-react';

// Definición de tipos
interface Metric {
  name: string;
  value: string | number;
  icon: string;
  change?: string;
}

interface ConfigurationOption {
  name: string;
  description: string;
  value: string | boolean;
  type: "text" | "select" | "toggle";
  options?: string[];
}

interface ServicePanelProps {
  serviceType: "IA" | "Web" | "Artistas" | "E-Commerce";
  metrics: Metric[];
  configuration: ConfigurationOption[];
}

const iconMap = {
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
  "ventas de merch": ShoppingCart,
  "tono": MessageSquare,
  "prompts": Bot,
  "integración": Zap,
  "plantillas": Headphones
};

export default function ServicePanel({ serviceType, metrics, configuration }: ServicePanelProps) {
  const getServiceTitle = () => {
    switch (serviceType) {
      case "IA":
        return "Panel de IA";
      case "Web":
        return "Panel Web";
      case "Artistas":
        return "Panel para Artistas";
      case "E-Commerce":
        return "Panel E-Commerce";
      default:
        return "Panel del Servicio";
    }
  };

  const getServiceDescription = () => {
    switch (serviceType) {
      case "IA":
        return "Métricas y configuración de tu asistente de inteligencia artificial";
      case "Web":
        return "Métricas de rendimiento y optimización de tu sitio web";
      case "Artistas":
        return "Métricas de fans y herramientas de engagement";
      case "E-Commerce":
        return "Métricas de ventas y configuración de tu tienda";
      default:
        return "Panel de control del servicio";
    }
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">{getServiceTitle()}</h1>
        <p className="text-gray-400">{getServiceDescription()}</p>
      </motion.div>

      {/* Métricas */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Métricas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => {
            const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || BarChart3;
            return (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center mb-2">
                  <IconComponent className="w-5 h-5 text-primary mr-2" />
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

      {/* Configuración */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Configuración</h2>
        <div className="grid grid-cols-1 gap-6">
          {configuration.map((config, index) => (
            <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-white">{config.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{config.description}</p>
                </div>
                <div className="w-12">
                  {config.type === "toggle" && (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        defaultChecked={config.value as boolean}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  )}
                </div>
              </div>
              
              {config.type === "text" && (
                <input 
                  type="text" 
                  defaultValue={config.value as string}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
              
              {config.type === "select" && (
                <select 
                  defaultValue={config.value as string}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {config.options?.map((option, optIndex) => (
                    <option key={optIndex} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-right">
          <button className="px-6 py-2 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Guardar Cambios
          </button>
        </div>
      </motion.div>
    </div>
  );
}