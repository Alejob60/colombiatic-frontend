'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Globe, Wrench, BarChart3 } from "lucide-react"
import { useLanguage } from '@/hooks/useLanguage';
import Footer from "@/components/layout/Footer"

const services = [
  {
    icon: <MessageCircle size={40} className="text-primary" />,
    titleKey: "services.ai_chatbot.title",
    descriptionKey: "services.ai_chatbot.description",
    defaultTitle: "IA Omnicanal de Atención y Ventas",
    defaultDescription: "Automatiza conversaciones y cierra ventas 24/7 en todos tus canales. Implementación en 48h.",
  },
  {
    icon: <Globe size={40} className="text-accent" />,
    titleKey: "services.website.title",
    descriptionKey: "services.website.description",
    defaultTitle: "Sitio Web Comercial con SEO + IA Humanizada",
    defaultDescription: "Web empresarial optimizada para conversiones con IA conversacional integrada y posicionamiento orgánico.",
  },
  {
    icon: <Wrench size={40} className="text-tertiary" />,
    titleKey: "services.refactor.title",
    descriptionKey: "services.refactor.description",
    defaultTitle: "Refactor Pro de Sitios Web",
    defaultDescription: "Modernización tecnológica de tu sitio con optimización de performance y experiencia de usuario.",
  },
  {
    icon: <BarChart3 size={40} className="text-secondary" />,
    titleKey: "services.consulting.title",
    descriptionKey: "services.consulting.description",
    defaultTitle: "Consultoría Estratégica y Optimización",
    defaultDescription: "Análisis avanzado de tu modelo de negocio con recomendaciones accionables basadas en datos.",
  },
]

export default function ServicesPage() {
  const { t, locale } = useLanguage();
  
  return (
    <section className="min-h-screen bg-background text-white px-6 py-24 md:px-20">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl font-bold mb-4">{t('services.title') || 'Soluciones Inteligentes'}</h1>
        <p className="text-gray-400 text-lg">
          {t('services.description') || 'Tecnología de vanguardia para potenciar tu negocio. Implementación rápida, resultados tangibles.'}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-xl transition border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{t(service.titleKey) || service.defaultTitle}</h3>
            <p className="text-gray-400 text-sm">{t(service.descriptionKey) || service.defaultDescription}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-24 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <a
          href={`/${locale}/pricing`}
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          {t('services.view_plans') || 'Ver planes y precios →'}
        </a>
      </motion.div>
      <Footer />
    </section>
  )
}