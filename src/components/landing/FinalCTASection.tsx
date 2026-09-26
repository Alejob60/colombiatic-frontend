// src/components/landing/FinalCTASection.tsx
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import ActivateEcosystemForm from './ActivateEcosystemForm';

export default function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Activa tu Ecosistema IA con un Diagnóstico Profesional
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Descubre cómo nuestra plataforma puede transformar tu negocio en 48 horas
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link 
              href="/diagnostico-profesional"
              className="px-8 py-4 bg-white text-primary font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300"
            >
              Solicitar Diagnóstico
            </Link>
            <Link 
              href="/contacto"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Hablar con un experto
            </Link>
          </div>
          
          {/* Formulario de activación de ecosistema */}
          <ActivateEcosystemForm />
        </motion.div>
      </div>
    </section>
  );
}