// src/components/sections/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Quote, Star, Building, Trophy } from "lucide-react";

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "María González",
      company: "TechStart S.A.S",
      content: "La implementación de la IA de ColombiaTIC transformó nuestra atención al cliente. Redujimos tiempos de respuesta en un 70% y aumentamos la satisfacción del cliente en un 45%.",
      results: "70% reducción en tiempos de respuesta | 45% aumento en satisfacción",
      rating: 5,
      industry: "Tecnología"
    },
    {
      name: "Carlos Ramírez",
      company: "RetailPlus Ltda",
      content: "Con el asistente de ventas automatizado, logramos incrementar nuestras conversiones en un 35% sin aumentar el equipo de ventas. Una solución realmente innovadora.",
      results: "35% aumento en conversiones | Automatización del 80% de consultas",
      rating: 5,
      industry: "Retail"
    },
    {
      name: "Ana Martínez",
      company: "Servicios Profesionales S.A",
      content: "El dashboard de análisis nos permitió entender mejor a nuestros clientes y personalizar nuestra oferta. La ROI fue evidente en los primeros 3 meses.",
      results: "60% mejora en segmentación | 25% aumento en ventas repetidas",
      rating: 5,
      industry: "Servicios"
    }
  ];

  return (
    <section className="py-24 px-6 bg-background text-white">
      <div className="max-w-7xl mx-auto">
        {/* Fireblocks-style header with customer success focus */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('testimonials.title') || 'Historias de Éxito'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            {t('testimonials.subtitle') || 'Descubre cómo empresas líderes están transformando sus negocios con nuestra IA'}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Fireblocks-inspired customer success stories layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-surface/80 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-primary/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Rating stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="text-primary mb-4">
                <Quote className="w-8 h-8" />
              </div>
              
              <p className="text-gray-300 mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>
              
              <div className="border-t border-gray-800 pt-6">
                <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Building className="w-4 h-4 mr-2" />
                  {testimonial.company}
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded mr-2">
                    {testimonial.industry}
                  </span>
                </div>
                <p className="text-primary text-sm font-medium">{testimonial.results}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fireblocks-style trust indicators */}
        <motion.div
          className="mt-20 text-center bg-gradient-to-r from-primary/10 to-tertiary/10 rounded-2xl p-12 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            {t('testimonials.trusted_by') || 'Confían en nosotros'}
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            {t('testimonials.trusted_by_desc') || 'Más de 500 empresas han transformado sus operaciones con nuestra tecnología de IA'}
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-gray-400 mt-2">Empresas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-gray-400 mt-2">Satisfacción</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-gray-400 mt-2">Soporte</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">5.0</div>
              <div className="text-gray-400 mt-2">Calificación</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}