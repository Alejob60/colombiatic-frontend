// src/components/sections/ProductsSection.tsx
"use client";

import { motion } from "framer-motion";
import { Zap, Globe, BarChart3 } from "lucide-react";

export default function ProductsSection() {
  const products = [
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "IA Omnicanal + CRM Automatizado",
      description: "Solución integral de atención al cliente con inteligencia artificial que se integra con todos tus canales de comunicación.",
      features: [
        "Integración WhatsApp e Instagram",
        "Respuestas automatizadas con IA",
        "Métricas de conversión en tiempo real",
        "Entrenamiento continuo del bot"
      ],
      price: "COP $159.000/mes",
      setupTime: "48 horas",
      popular: true
    },
    {
      icon: <Globe className="w-12 h-12 text-secondary" />,
      title: "Sitio Web Comercial con SEO + IA Humanizada de Ventas",
      description: "Sitio web inteligente con optimización SEO y asistente de ventas automatizado.",
      features: [
        "Diseño responsivo moderno",
        "Optimización SEO técnica",
        "Asistente de ventas IA 24/7",
        "Integración con redes sociales"
      ],
      price: "COP $899.000 único",
      setupTime: "72 horas",
      popular: true
    }
  ];

  return (
    <section id="productos" className="py-20 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Productos <span className="gradient-text">Estrella</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Soluciones tecnológicas avanzadas diseñadas para transformar tu negocio con inteligencia artificial
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-primary/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {product.popular && (
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-primary to-secondary text-xs font-bold rounded-full mb-4">
                  MÁS POPULAR
                </div>
              )}
              
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gray-800 rounded-lg mr-4">
                  {product.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{product.title}</h3>
                  <p className="text-gray-400">{product.description}</p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-bold text-primary">{product.price}</div>
                  <div className="text-sm text-gray-500">Implementación en {product.setupTime}</div>
                </div>
                
                <button className="px-6 py-3 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors group-hover:shadow-lg">
                  Comprar Ahora
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}