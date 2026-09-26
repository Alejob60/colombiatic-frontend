// src/app/services/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/lib/i18n';

// Datos de ejemplo de servicios
const servicesData = [
  {
    id: "ia_omnichannel",
    name: "IA Omnicanal + CRM Automatizado",
    description: "Conecta todos tus canales de comunicación y automatiza tus ventas con inteligencia artificial.",
    price: "COP $159.000 / mes",
    category: "Principal",
    features: [
      "Conexión WhatsApp API",
      "Conexión Instagram API",
      "CRM automatizado",
      "Respuestas IA personalizadas"
    ]
  },
  {
    id: "web_commercial",
    name: "Sitio Web Comercial con SEO + IA Humanizada de Ventas",
    description: "Sitio web optimizado para conversiones con asistente de ventas basado en IA.",
    price: "COP $899.000 pago único",
    category: "Principal",
    features: [
      "Diseño responsive moderno",
      "Optimización SEO avanzada",
      "Asistente de ventas IA",
      "Integración con redes sociales"
    ]
  },
  {
    id: "refactor_pro",
    name: "Refactor Pro Web",
    description: "Modernización completa de tu sitio web existente con las últimas tecnologías.",
    price: "COP $350.000",
    category: "Adicional",
    features: [
      "Rediseño responsive",
      "Optimización de performance",
      "Compatibilidad móviles",
      "SEO técnico"
    ]
  },
  {
    id: "social_media",
    name: "Módulo de Redes y Contenidos",
    description: "Gestiona todas tus redes sociales y crea contenido automatizado.",
    price: "COP $120.000 / mes",
    category: "Adicional",
    features: [
      "Programador de publicaciones",
      "Generador de contenido IA",
      "Analytics avanzado",
      "Inbox social unificado"
    ]
  },
  {
    id: "automation",
    name: "Automatización Avanzada",
    description: "Automatiza procesos empresariales con flujos inteligentes.",
    price: "COP $90.000 / mes",
    category: "Adicional",
    features: [
      "Creación de flujos",
      "Integración con apps",
      "Notificaciones automáticas",
      "Reportes en tiempo real"
    ]
  },
  {
    id: "analytics",
    name: "Dashboard Analítico Comercial",
    description: "Visualiza métricas clave de tu negocio en tiempo real.",
    price: "COP $60.000 / mes",
    category: "Adicional",
    features: [
      "Métricas personalizadas",
      "Gráficos interactivos",
      "Exportación de datos",
      "Alertas automáticas"
    ]
  }
];

export default function ServicesPage() {
  const { t } = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Obtener categorías únicas
  const categories = ['Todos', ...new Set(servicesData.map(service => service.category))];

  // Filtrar servicios por categoría
  const filteredServices = selectedCategory === 'Todos' 
    ? servicesData 
    : servicesData.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Nuestros Servicios</h1>
        <p className="text-gray-400 text-center mb-12">Soluciones digitales avanzadas para transformar tu negocio</p>
        
        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-surface text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{service.name}</h3>
                  <span className="px-2 py-1 text-xs font-semibold bg-blue-900 text-blue-200 rounded-full">
                    {service.category}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4">{service.description}</p>
                
                <div className="mb-6">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex space-x-3">
                  <Link 
                    href={`/services/${service.id}`}
                    className="flex-1 text-center bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Ver Detalles
                  </Link>
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}