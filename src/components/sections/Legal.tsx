// src/components/sections/Legal.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, FileText, Lock } from "lucide-react";

export default function Legal() {
  const { t } = useLanguage();

  const legalItems = [
    {
      icon: Shield,
      title: t('legal.privacy'),
      description: ""
    },
    {
      icon: FileText,
      title: t('legal.documents'),
      description: ""
    }
  ];

  return (
    <section className="py-24 px-6 bg-surface/50 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('legal.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {legalItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-400">
                      {item.description || "Nuestro compromiso con la privacidad y transparencia es fundamental en todos nuestros servicios."}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="bg-gradient-to-r from-primary/10 to-tertiary/10 rounded-2xl p-8 border border-primary/20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block p-4 rounded-full bg-primary/20 mb-6">
            <Lock className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{t('legal.badge')}</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Cumplimos con todas las normativas de protección de datos y tenemos certificaciones internacionales en seguridad de la información.
          </p>
        </motion.div>
      </div>
    </section>
  );
}