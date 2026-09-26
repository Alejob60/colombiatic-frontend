// src/components/sections/CallToAction.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";

const benefits = [
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    text: "Implementación en 48 horas"
  },
  {
    icon: <Shield className="w-6 h-6 text-secondary" />,
    text: "Tecnología segura y confiable"
  },
  {
    icon: <Clock className="w-6 h-6 text-accent" />,
    text: "Soporte 24/7 garantizado"
  }
];

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transforma tu negocio <span className="gradient-text">hoy mismo</span>
              </h2>
              
              <p className="text-xl text-gray-400 mb-8">
                Únete a cientos de empresas que ya están revolucionando su forma de hacer negocios con inteligencia artificial.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                      {benefit.icon}
                    </div>
                    <span className="text-gray-300">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="bg-surface/50 rounded-xl p-8 border border-gray-800"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">Comienza ahora</h3>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="tu@empresa.com"
                    className="w-full px-4 py-3 bg-surface border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+57 300 123 4567"
                    className="w-full px-4 py-3 bg-surface border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center group"
                >
                  Activar IA ahora
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  Al registrarte, aceptas nuestros términos de servicio y política de privacidad.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}