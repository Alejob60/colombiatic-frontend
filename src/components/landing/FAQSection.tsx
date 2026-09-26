'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: "¿Cuánto tiempo tarda en implementarse una solución de ColombiaTIC?",
    answer: "Nuestro enfoque garantiza resultados rápidos: activación básica en 48 horas y solución completa en 5 días laborales. La mayoría de nuestros clientes ven mejoras medibles en la primera semana."
  },
  {
    question: "¿Qué necesito para empezar con ColombiaTIC?",
    answer: "Solo necesitas tu información básica de empresa. Nuestro equipo se encarga de todo el proceso de implementación, desde la configuración inicial hasta la puesta en marcha completa de tu ecosistema IA."
  },
  {
    question: "¿Ofrecen soporte técnico después de la implementación?",
    answer: "Sí, ofrecemos soporte técnico especializado 24/7 con tiempos de respuesta garantidos. Todos nuestros planes incluyen mantenimiento continuo, actualizaciones automáticas y optimización constante."
  },
  {
    question: "¿Puedo integrar ColombiaTIC con mis herramientas actuales?",
    answer: "Absolutamente. Nuestra plataforma se integra con las principales herramientas del mercado como Shopify, WooCommerce, WhatsApp Business, Instagram, Google Cloud, AWS y muchas más. Contamos con APIs abiertas para integraciones personalizadas."
  },
  {
    question: "¿Cómo funciona el cobro y qué métodos de pago aceptan?",
    answer: "Trabajamos con Wompi para procesar pagos seguros en COP y USD. Ofrecemos planes mensuales y anuales con descuentos por pago anual. Todos los precios son transparentes sin costos ocultos."
  },
  {
    question: "¿Qué tan personalizable es la solución?",
    answer: "Nuestra plataforma es altamente personalizable. Desde la apariencia visual hasta los flujos de automatización, todo puede adaptarse a las necesidades específicas de tu negocio. Los planes Enterprise incluyen personalización completa."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Preguntas <span className="text-blue-400">Frecuentes</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Todo lo que necesitas saber sobre nuestra plataforma y servicios
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <ChevronDown 
                  className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-300">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">¿Tienes otras preguntas?</h3>
          <p className="text-gray-400 mb-6">
            Nuestro equipo está listo para ayudarte a resolver cualquier duda
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact"
              className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              contacto@colombiatic.com.co
            </Link>
            
            <a 
              href="tel:+573001234567" 
              className="flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              +57 300 123 4567
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}