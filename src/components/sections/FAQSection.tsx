// src/components/sections/FAQSection.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Mail, Phone } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto tiempo tarda la implementación?",
    answer: "Nuestra implementación garantizada es en 48 horas para los productos estrella. Los módulos adicionales se implementan en un plazo de 12 a 72 horas dependiendo de la complejidad."
  },
  {
    question: "¿Qué necesito para comenzar?",
    answer: "Solo necesitas compartirnos tus datos básicos de empresa, enlaces a tus canales de comunicación actuales (WhatsApp, Instagram, etc.) y acceso a tu sitio web si ya tienes uno. Nosotros nos encargamos del resto."
  },
  {
    question: "¿Ofrecen soporte técnico?",
    answer: "Sí, ofrecemos soporte técnico 24/7 incluido en todos nuestros planes. Nuestro equipo de expertos está disponible para resolver cualquier inconveniente que puedas tener."
  },
  {
    question: "¿Puedo cancelar en cualquier momento?",
    answer: "Sí, puedes cancelar tus suscripciones mensuales en cualquier momento sin penalidades. Los productos de pago único no son reembolsables pero pueden transferirse."
  },
  {
    question: "¿Es necesario tener conocimientos técnicos?",
    answer: "No, nuestra plataforma está diseñada para ser intuitiva y fácil de usar. Ofrecemos capacitación gratuita y soporte continuo para asegurar tu éxito."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Preguntas <span className="gradient-text">Frecuentes</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Encuentra respuestas a las dudas más comunes sobre nuestros servicios
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-surface/80 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-surface/50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-100">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
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
                  >
                    <div className="px-6 pb-6 text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center p-8 bg-surface/80 backdrop-blur-sm rounded-xl border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">¿Tienes otras preguntas?</h3>
            <p className="text-gray-400 mb-6">
              Nuestro equipo está listo para ayudarte a resolver cualquier duda
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:contacto@colombiatic.com.co" 
                className="flex items-center justify-center px-6 py-3 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                contacto@colombiatic.com.co
              </a>
              
              <a 
                href="tel:+573001234567" 
                className="flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                +57 300 123 4567
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}