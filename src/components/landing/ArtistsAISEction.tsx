// src/components/landing/ArtistsAISEction.tsx
"use client";

import { motion } from 'framer-motion';
import { Music, MessageCircle, Headphones, ShoppingCart, Users } from 'lucide-react';
import Link from 'next/link';

const artistFeatures = [
  {
    icon: Music,
    title: "Web del artista con IA",
    description: "Sitio web inteligente que evoluciona con tu carrera"
  },
  {
    icon: MessageCircle,
    title: "Chat IA para fans",
    description: "Atención personalizada 24/7 para tu comunidad"
  },
  {
    icon: Headphones,
    title: "Playlist personalizada",
    description: "Recomendaciones musicales basadas en gustos"
  },
  {
    icon: ShoppingCart,
    title: "Venta de merch con IA",
    description: "Sugerencias de productos según intereses del fan"
  },
  {
    icon: Users,
    title: "Segmentación de fans",
    description: "Grupos personalizados para campañas dirigidas"
  }
];

export default function ArtistsAISEction() {
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
            <Music className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            IA para <span className="gradient-text">Artistas & Creadores</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experiencia personalizada para conectar con tu audiencia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {artistFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            href="/crear-experiencia-personalizada"
            className="px-8 py-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 inline-flex items-center"
          >
            Crear experiencia personalizada
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}