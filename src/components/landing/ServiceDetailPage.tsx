// src/components/landing/ServiceDetailPage.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// Datos de ejemplo para un servicio específico
const serviceData = {
  id: "ia_omnicanal",
  name: "Chatbot con IA Omnicanal",
  subtitle: "Atención automática en WhatsApp, Instagram, Web, SMS y Messenger usando IA avanzada.",
  description: "Nuestro chatbot inteligente proporciona atención al cliente 24/7 en múltiples canales, mejorando la experiencia del usuario y aumentando las conversiones.",
  benefits: [
    "Respuestas instantáneas las 24 horas",
    "Integración con múltiples canales",
    "Personalización avanzada por IA",
    "Métricas en tiempo real",
    "Entrenamiento continuo del bot",
    "Asistente humano cuando sea necesario"
  ],
  includes: [
    "Configuración inicial del chatbot",
    "Integración con WhatsApp Business",
    "Integración con Instagram y Facebook",
    "Panel de administración",
    "500 mensajes mensuales",
    "Soporte técnico básico"
  ],
  deliverables: [
    "Chatbot completamente funcional",
    "Documentación de uso",
    "Manual de administración",
    "Reporte inicial de métricas",
    "Acceso al panel de control"
  ],
  implementationTime: "48 horas",
  price: "$340.000 - $900.000 COP",
  testimonials: [
    {
      name: "María González",
      position: "CEO, TechStart S.A.S",
      content: "Increíble aumento en la atención al cliente. Nuestro chatbot resuelve el 85% de las consultas sin intervención humana.",
      rating: 5
    }
  ]
};

export default function ServiceDetailPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/services" 
            className="inline-flex items-center text-primary hover:text-blue-400 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a servicios
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{serviceData.name}</h1>
                <p className="text-xl text-gray-400 mb-6">{serviceData.subtitle}</p>
                <p className="text-gray-300 text-lg">{serviceData.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Beneficios</h2>
                <ul className="space-y-3">
                  {serviceData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">¿Qué incluye?</h2>
                <ul className="space-y-3">
                  {serviceData.includes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Entregables</h2>
                <ul className="space-y-3">
                  {serviceData.deliverables.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 sticky top-6">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">{serviceData.price}</div>
                  <div className="text-gray-400">Tiempo de implementación: {serviceData.implementationTime}</div>
                </div>

                <div className="space-y-4">
                  <button 
                    className="w-full px-6 py-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                    onClick={() => {
                      // Lógica para comprar ahora
                      console.log("Comprar ahora");
                    }}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Comprar ahora
                  </button>

                  <button 
                    className="w-full px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                    onClick={() => {
                      // Lógica para hablar con asesor IA
                      console.log(`Quiero más información sobre el servicio ${serviceData.name}`);
                    }}
                  >
                    Hablar con Asesor IA
                  </button>
                </div>
              </div>

              {serviceData.testimonials.length > 0 && (
                <div className="mt-8 bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold mb-4">Testimonios</h3>
                  {serviceData.testimonials.map((testimonial, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <p className="text-gray-300 italic mb-3">&quot;{testimonial.content}&quot;</p>
                      <div className="font-medium text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.position}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}