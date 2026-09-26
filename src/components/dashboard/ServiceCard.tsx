// src/components/dashboard/ServiceCard.tsx
"use client";

import { motion } from 'framer-motion';
import { Bot, Globe, MessageSquare, BarChart3, ShoppingCart, Music } from 'lucide-react';
import Link from 'next/link';

// Definición de tipos
type ServiceStatus = "No adquirido" | "Activo" | "Configuración pendiente";

interface Service {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
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

export default function ServiceCard({ service }: { service: Service }) {
  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case "Activo":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Configuración pendiente":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getButtonText = (status: ServiceStatus) => {
    switch (status) {
      case "No adquirido":
        return "Comprar con Wompi";
      case "Activo":
        return "Ir al Panel del Servicio";
      default:
        return "Continuar Configuración";
    }
  };

  const getButtonAction = (status: ServiceStatus) => {
    switch (status) {
      case "No adquirido":
        return `/checkout/${service.id}`;
      case "Activo":
        return `/service/${service.id}`;
      default:
        return `/service/${service.id}/setup`;
    }
  };

  // Obtener el icono principal basado en las etiquetas
  const primaryTag = service.tags[0] || "IA";
  const IconComponent = serviceIcons[primaryTag as keyof typeof serviceIcons] || Bot;

  return (
    <motion.div
      className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{service.name}</h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(service.status)}`}>
              {service.status}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-400 mb-4">{service.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {service.tags.map((tag, index) => (
          <span 
            key={index} 
            className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Link 
        href={getButtonAction(service.status)}
        className="w-full px-4 py-2 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-center block"
      >
        {getButtonText(service.status)}
      </Link>
    </motion.div>
  );
}