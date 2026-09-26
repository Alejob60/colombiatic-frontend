// src/components/landing/ServicesGrid.tsx
"use client";

import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

// Datos de servicios de ejemplo
const services = [
  {
    id: "landing_page",
    icon: "📱",
    name: "Landing Page de Alto Rendimiento",
    description: "Página de aterrizaje moderna, optimizada para conversión y diseñada para captar clientes rápidamente.",
    price: "Desde $350.000 COP",
    category: "web"
  },
  {
    id: "modern_website",
    icon: "🌐",
    name: "Sitio Web Corporativo Modernizado",
    description: "Página web completa, moderna, adaptable a móviles y optimizada para posicionamiento.",
    price: "Desde $650.000 COP",
    category: "web"
  },
  {
    id: "ecommerce_basic",
    icon: "🛒",
    name: "Tienda Virtual Básica",
    description: "E-commerce funcional con carrito, pagos online y administración simple.",
    price: "Desde $850.000 COP",
    category: "ecommerce"
  },
  {
    id: "ia_omnicanal",
    icon: "🤖",
    name: "Chatbot con IA Omnicanal",
    description: "Atención automática en WhatsApp, Instagram, Web, SMS y Messenger usando IA avanzada.",
    price: "Desde $340.000 COP",
    category: "ia"
  },
  {
    id: "ventas_auto",
    icon: "📈",
    name: "Embudo Automático de Ventas",
    description: "Sistema de ventas automático que contacta leads, envía seguimientos y recupera carritos.",
    price: "Desde $350.000 COP",
    category: "automation"
  },
  {
    id: "marketing_automation",
    icon: "📧",
    name: "Automatización de Marketing Multicanal",
    description: "Configuración de automatizaciones completas en Email, WhatsApp, SMS y Web con IA.",
    price: "Desde $500.000 COP",
    category: "automation"
  }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Servicios que <span className="gradient-text">impulsan tu negocio</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Soluciones tecnológicas diseñadas para acelerar tu crecimiento
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}