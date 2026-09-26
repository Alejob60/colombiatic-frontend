'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "María González",
    position: "CEO, TechStart S.A.S",
    company: "Bogotá, Colombia",
    content: "ColombiaTIC transformó nuestra atención al cliente. En solo 48 horas teníamos nuestro chatbot funcionando y las métricas de conversión aumentaron un 45% en la primera semana.",
    rating: 5,
    avatar: "MG"
  },
  {
    name: "Carlos Ramírez",
    position: "Director de Marketing, GlobalRetail Ltda",
    company: "Medellín, Colombia",
    content: "La integración con nuestras redes sociales fue impecable. El dashboard analítico nos permite tomar decisiones informadas en tiempo real. Un verdadero game-changer para nuestro negocio.",
    rating: 5,
    avatar: "CR"
  },
  {
    name: "Ana Martínez",
    position: "Gerente Comercial, Innovatech Solutions",
    company: "Cali, Colombia",
    content: "El sitio web con IA de ventas ha generado un 30% más de leads calificados. La implementación fue rápida y el soporte técnico siempre disponible. Altamente recomendado.",
    rating: 5,
    avatar: "AM"
  },
  {
    name: "Jorge Silva",
    position: "Fundador, EduTech Colombia",
    company: "Cartagena, Colombia",
    content: "La automatización de nuestros procesos educativos ha mejorado la experiencia del estudiante en un 60%. La personalización gracias al Twin AI es impresionante.",
    rating: 5,
    avatar: "JS"
  },
  {
    name: "Laura Pérez",
    position: "Directora de Operaciones, HealthPlus S.A",
    company: "Barranquilla, Colombia",
    content: "Reducimos tiempos de espera en agendamiento en un 70% y mejoramos la satisfacción del paciente. La solución se adaptó perfectamente a nuestras necesidades.",
    rating: 5,
    avatar: "LP"
  },
  {
    name: "Daniel Torres",
    position: "Gerente de E-commerce, ModaOnline Ltda",
    company: "Cúcuta, Colombia",
    content: "Nuestras ventas aumentaron un 55% en el primer trimestre. La integración con Shopify y el chatbot de ventas funcionan perfectamente juntos.",
    rating: 5,
    avatar: "DT"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Testimonios <span className="text-blue-400">Reales</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Descubre cómo ColombiaTIC ha transformado negocios en toda Colombia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-400 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-gray-500 ml-auto" />
              </div>

              <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                  <span className="text-blue-400 font-bold">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.position}</div>
                  <div className="text-xs text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
            <span className="text-gray-300">
              <span className="text-blue-400 font-bold">+500</span> empresas transformadas en 2025
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}