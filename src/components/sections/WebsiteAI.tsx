// src/components/sections/WebsiteAI.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  RefreshCw, 
  FileText, 
  TrendingUp,
  Zap,
  Globe,
  Cpu,
  BarChart3
} from "lucide-react";

export default function WebsiteAI() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Globe,
      titleKey: 'website_ai.feature1',
      descriptionKey: 'website_ai.feature1_desc'
    },
    {
      icon: Cpu,
      titleKey: 'website_ai.feature2',
      descriptionKey: 'website_ai.feature2_desc'
    },
    {
      icon: BarChart3,
      titleKey: 'website_ai.feature3',
      descriptionKey: 'website_ai.feature3_desc'
    },
    {
      icon: Zap,
      titleKey: 'website_ai.feature4',
      descriptionKey: 'website_ai.feature4_desc'
    }
  ];

  return (
    <section className="py-24 px-6 bg-surface/50 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Fireblocks-style section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('website_ai.title') || 'Sitios Web Impulsados por IA'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            {t('website_ai.subtitle') || 'Transforma tu presencia digital con inteligencia artificial avanzada'}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-6">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey) || `Característica ${index + 1}`}</h3>
                      <p className="text-gray-400">
                        {t(feature.descriptionKey) || "Nuestra IA analiza y optimiza continuamente tu sitio web para maximizar su rendimiento y conversión."}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Fireblocks-style CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <motion.button
                className="relative inline-flex items-center justify-center px-8 py-4 text-white font-medium text-base rounded-lg bg-primary hover:bg-blue-700 transition duration-300 group overflow-hidden shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 w-full h-full bg-blue-700 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center opacity-20"></span>
                <span className="relative z-10 flex items-center">
                  {t('website_ai.try_demo') || 'Probar demostración'}
                  <Zap className="w-5 h-5 ml-2" />
                </span>
              </motion.button>
              
              <motion.button
                className="relative inline-flex items-center justify-center px-8 py-4 border border-white text-white font-medium text-base rounded-lg hover:bg-white hover:text-black transition duration-300 group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 w-full h-full bg-white scale-0 group-hover:scale-100 transition-transform duration-300 origin-center opacity-20"></span>
                <span className="relative z-10 flex items-center">
                  {t('website_ai.learn_more') || 'Más información'}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Fireblocks-inspired website mockup with clear divisions */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-br from-background to-surface p-8 shadow-2xl">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
              
              {/* Browser mockup with Fireblocks-style header */}
              <div className="relative bg-black/50 rounded-lg border border-gray-800 overflow-hidden">
                {/* Browser header */}
                <div className="flex items-center px-4 py-3 border-b border-gray-800">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-sm text-gray-400">
                    www.tuempresa.com
                  </div>
                </div>
                
                {/* Browser content with clear section divisions */}
                <div className="p-6">
                  {/* Header section */}
                  <div className="h-16 bg-gradient-to-r from-primary/20 to-tertiary/20 rounded-lg mb-6 flex items-center px-4">
                    <div className="w-8 h-8 rounded-full bg-primary/30 mr-3"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-primary/30 rounded w-1/3 mb-2"></div>
                      <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                  
                  {/* Main content area with AI elements */}
                  <div className="h-64 bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-lg flex items-center justify-center relative">
                    <div className="text-center">
                      <div className="inline-block p-4 rounded-full bg-black/50 backdrop-blur-sm border border-gray-700 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-tertiary flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-300 font-medium">Sitio web inteligente</p>
                      <p className="text-gray-500 text-sm mt-2">Potenciado por IA</p>
                    </div>
                    
                    {/* Floating AI analysis elements */}
                    <div className="absolute top-4 -right-4 w-24 h-24 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center animate-float">
                      <span className="text-blue-300 text-xs text-center">Optimización<br/>SEO</span>
                    </div>
                    
                    <div className="absolute bottom-8 -left-4 w-20 h-20 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center animate-float delay-300">
                      <span className="text-green-300 text-xs text-center">Análisis<br/>de texto</span>
                    </div>
                  </div>
                  
                  {/* Footer section */}
                  <div className="h-12 bg-gray-800/50 rounded-lg mt-6 flex items-center px-4">
                    <div className="h-2 bg-gray-700 rounded w-1/4 mr-2"></div>
                    <div className="h-2 bg-gray-700 rounded w-1/3 mr-2"></div>
                    <div className="h-2 bg-gray-700 rounded w-1/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
}