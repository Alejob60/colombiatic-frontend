// src/components/landing/MainServicesSection.tsx
"use client";

import { motion } from 'framer-motion';
import { 
  Globe, 
  Bot, 
  MessageSquare, 
  Users, 
  ShoppingCart,
  BarChart3,
  Music
} from 'lucide-react';
import Link from 'next/link';

const mainServices = [
  {
    id: "sitios-web-inteligentes",
    icon: Globe,
    title: "Sitios Web Inteligentes + ADN Web",
    description: "Sitios optimizados técnicamente con IA que aprende de tu negocio",
    result: "Mayor visibilidad, tráfico cualificado y posicionamiento SEO",
    link: "/servicios/sitios-web-inteligentes"
  },
  {
    id: "automatizacion-comercial",
    icon: Bot,
    title: "Automatización Comercial IA",
    description: "Flujos automatizados de ventas, atención y seguimiento",
    result: "Incremento de ventas hasta 3x y reducción de costos operativos",
    link: "/servicios/automatizacion-comercial"
  },
  {
    id: "ia-omnicanal",
    icon: MessageSquare,
    title: "IA Omnicanal (WhatsApp, IG, Web, Email, SMS)",
    description: "Atención y ventas automatizadas en todos tus canales",
    result: "Experiencia unificada para clientes y aumento de conversiones",
    link: "/servicios/ia-omnicanal"
  },
  {
    id: "twin-ai",
    icon: Users,
    title: "Twin AI (memoria y personalización)",
    description: "IA que recuerda historial de clientes y personaliza interacciones",
    result: "Relación más cercana con clientes y fidelización mejorada",
    link: "/servicios/twin-ai"
  },
  {
    id: "ecommerce-ia",
    icon: ShoppingCart,
    title: "E-Commerce IA + integraciones (Shopify/WooCommerce)",
    description: "Tienda virtual inteligente con recomendaciones personalizadas",
    result: "Aumento de ventas cruzadas y carrito promedio",
    link: "/servicios/ecommerce-ia"
  },
  {
    id: "dashboard-analitica",
    icon: BarChart3,
    title: "Dashboard empresarial + analítica avanzada",
    description: "Métricas en tiempo real y predicciones de negocio",
    result: "Toma de decisiones basada en datos y crecimiento sostenible",
    link: "/servicios/dashboard-analitica"
  },
  {
    id: "ia-artistas",
    icon: Music,
    title: "IA para Artistas & Influencers",
    description: "Experiencia personalizada para fans con recomendaciones únicas",
    result: "Mayor engagement y monetización de la comunidad",
    link: "/servicios/ia-artistas"
  }
];

export default function MainServicesSection() {
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
            Servicios <span className="gradient-text">Principales</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Soluciones premium con implementación rápida y resultados garantizados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400 mb-3">{service.description}</p>
                  <p className="text-gray-300 text-sm mb-4"><strong>Resultado:</strong> {service.result}</p>
                </div>
                
                <Link 
                  href={service.link}
                  className="w-full px-4 py-2 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-center block"
                >
                  Ver detalles del servicio
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}