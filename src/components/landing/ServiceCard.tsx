// src/components/landing/ServiceCard.tsx
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ServiceCard({ service, index }: { service: any; index: number }) {
  return (
    <motion.div
      className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="mb-4">
        <div className="text-4xl mb-4">{service.icon}</div>
        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
        <p className="text-gray-400 mb-4">{service.description}</p>
        <div className="text-lg font-bold text-primary mb-4">{service.price}</div>
      </div>
      
      <Link 
        href={`/services/${service.id}`}
        className="w-full px-4 py-2 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-center block"
      >
        Ver detalles
      </Link>
    </motion.div>
  );
}