// src/components/landing/PYMESolutionsSection.tsx
"use client";

import { motion } from 'framer-motion';
import { Building, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PYMESolutionsSection() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Building className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Soluciones para <span className="gradient-text">PYMES</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Planes orientativos desde implementaciones básicas hasta soluciones completas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Implementaciones Básicas</h3>
            <p className="text-gray-400 mb-4">
              Soluciones de entrada para pequeños negocios que comienzan su transformación digital
            </p>
            <p className="text-sm text-gray-500">
              Ideal para startups y freelancers
            </p>
          </motion.div>

          <motion.div
            className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Soluciones Medianas</h3>
            <p className="text-gray-400 mb-4">
              Paquetes completos para PYMES en crecimiento que necesitan automatización y presencia digital
            </p>
            <p className="text-sm text-gray-500">
              Perfecto para empresas consolidadas
            </p>
          </motion.div>

          <motion.div
            className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Building className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Soluciones Avanzadas</h3>
            <p className="text-gray-400 mb-4">
              Implementaciones completas para PYMES que buscan escalar con inteligencia artificial
            </p>
            <p className="text-sm text-gray-500">
              Para negocios en expansión
            </p>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            El valor final depende del análisis de tu negocio. Nuestros expertos evaluarán tus necesidades 
            específicas para ofrecerte la solución más adecuada.
          </p>
          <Link 
            href="/diagnostico-pyme"
            className="px-8 py-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 inline-flex items-center"
          >
            Diagnóstico para tu empresa
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}