// src/components/dashboard-v2/views/ServiceDetailView.tsx
"use client";

import { motion } from 'framer-motion';
import { Package, Check, Settings, ExternalLink } from 'lucide-react';

interface ServiceDetailViewProps {
  data: Record<string, any>;
}

export default function ServiceDetailView({ data }: ServiceDetailViewProps) {
  const { serviceId, serviceName, description, features, price } = data;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{serviceName || 'Servicio'}</h1>
              <p className="text-gray-400">{description || 'Descripción del servicio'}</p>
            </div>
          </div>
          {price && (
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-400">${price}</p>
              <p className="text-sm text-gray-500">/mes</p>
            </div>
          )}
        </div>

        {/* Features */}
        {features && features.length > 0 && (
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Características</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
            Activar Servicio
          </button>
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white flex items-center gap-2 transition-colors">
            <Settings className="w-5 h-5" />
            Configurar
          </button>
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white flex items-center gap-2 transition-colors">
            <ExternalLink className="w-5 h-5" />
            Documentación
          </button>
        </div>
      </motion.div>
    </div>
  );
}
