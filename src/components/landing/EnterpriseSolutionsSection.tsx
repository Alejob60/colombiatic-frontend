// src/components/landing/EnterpriseSolutionsSection.tsx
"use client";

import { motion } from 'framer-motion';
import { Briefcase, Settings, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function EnterpriseSolutionsSection() {
  return (
    <section className="py-20 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Soluciones <span className="gradient-text">Empresariales</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Paquetes completamente personalizados según industria y tamaño de operación
          </p>
        </motion.div>

        <motion.div
          className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Soluciones a Medida</h3>
              <p className="text-gray-300 mb-6">
                Nuestras soluciones empresariales se adaptan completamente a las necesidades específicas 
                de tu organización, integrando múltiples servicios en una plataforma unificada.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Implementación en 48 horas</span>
                </li>
                <li className="flex items-start">
                  <Settings className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Integración con sistemas existentes</span>
                </li>
                <li className="flex items-start">
                  <Briefcase className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Soporte ejecutivo dedicado</span>
                </li>
              </ul>
              <Link 
                href="/diagnostico-ejecutivo"
                className="px-6 py-3 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-colors inline-block"
              >
                Solicitar Diagnóstico Ejecutivo
              </Link>
            </div>
            <div className="flex-1 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-lg font-bold mb-4 text-center">¿Por qué elegir soluciones empresariales?</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-200">Escalabilidad Infinita</h5>
                  <p className="text-sm text-gray-400">Crecimiento sin límites con infraestructura cloud</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-200">Seguridad Empresarial</h5>
                  <p className="text-sm text-gray-400">Certificaciones y protección de datos avanzada</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-200">ROI Garantizado</h5>
                  <p className="text-sm text-gray-400">Métricas claras de retorno sobre inversión</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}