// src/components/sections/Solutions.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  MessageCircle, 
  TrendingUp, 
  Globe, 
  PieChart, 
  Share2, 
  LayoutDashboard,
  Bot,
  Shield,
  Zap,
  Database
} from "lucide-react";

export default function Solutions() {
  const { t } = useLanguage();

  const solutions = [
    {
      icon: Bot,
      titleKey: 'solutions.chatbot.title',
      descriptionKey: 'solutions.chatbot.description'
    },
    {
      icon: Globe,
      titleKey: 'solutions.website.title',
      descriptionKey: 'solutions.website.description'
    },
    {
      icon: TrendingUp,
      titleKey: 'solutions.analytics.title',
      descriptionKey: 'solutions.analytics.description'
    },
    {
      icon: Shield,
      titleKey: 'solutions.security.title',
      descriptionKey: 'solutions.security.description'
    },
    {
      icon: Database,
      titleKey: 'solutions.data.title',
      descriptionKey: 'solutions.data.description'
    },
    {
      icon: Zap,
      titleKey: 'solutions.automation.title',
      descriptionKey: 'solutions.automation.description'
    }
  ];

  return (
    <section className="py-24 px-6 bg-surface/50 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('solutions.title') || 'Soluciones Integrales de IA'}
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            {t('solutions.subtitle') || 'Descubre cómo nuestra plataforma de inteligencia artificial puede transformar tu negocio'}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Fireblocks-inspired grid layout with clear service divisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={index}
                className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-primary/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t(solution.titleKey) || `Solución ${index + 1}`}</h3>
                  <p className="text-gray-400 mb-6 flex-grow">{t(solution.descriptionKey) || 'Descripción de la solución'}</p>
                  <button className="mt-auto text-primary font-medium flex items-center group-hover:text-blue-400 transition-colors duration-300">
                    {t('solutions.learn_more') || 'Más información'}
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fireblocks-style call to action section */}
        <motion.div
          className="mt-20 text-center bg-gradient-to-r from-primary/10 to-tertiary/10 rounded-2xl p-12 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            {t('solutions.ready_to_start') || '¿Listo para transformar tu negocio?'}
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            {t('solutions.get_started_desc') || 'Únete a cientos de empresas que ya están aprovechando el poder de la inteligencia artificial'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#pricing"
              className="relative inline-flex items-center justify-center px-8 py-4 text-white font-medium text-base rounded-lg bg-primary hover:bg-blue-700 transition duration-300 group overflow-hidden shadow-lg hover:shadow-xl"
            >
              <span className="absolute inset-0 w-full h-full bg-blue-700 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center opacity-20"></span>
              <span className="relative z-10 flex items-center">
                {t('solutions.start_free_trial') || 'Prueba gratuita'}
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-8 py-4 border border-white text-white font-medium text-base rounded-lg hover:bg-white hover:text-black transition duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white scale-0 group-hover:scale-100 transition-transform duration-300 origin-center opacity-20"></span>
              <span className="relative z-10 flex items-center">
                {t('solutions.contact_sales') || 'Contactar ventas'}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}