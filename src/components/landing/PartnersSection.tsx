// src/components/landing/PartnersSection.tsx
"use client";

import { motion } from 'framer-motion';

// Logos monocromáticos simulados (en implementación real, usar imágenes SVG)
const partners = [
  { name: "Shopify", logo: "S" },
  { name: "Meta", logo: "M" },
  { name: "WhatsApp", logo: "W" },
  { name: "AWS", logo: "A" },
  { name: "Google Cloud", logo: "G" },
  { name: "Stripe", logo: "S" },
  { name: "Wompi", logo: "W" }
];

export default function PartnersSection() {
  return (
    <section className="py-16 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="gradient-text">Integraciones</span> y Partners
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Conectamos con las plataformas líderes del mercado para ofrecerte soluciones completas
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-xl border border-gray-700 hover:border-primary/50 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              title={partner.name}
            >
              <span className="text-xl md:text-2xl font-bold text-gray-300">
                {partner.logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}