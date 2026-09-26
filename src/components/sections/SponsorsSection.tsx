// src/components/sections/SponsorsSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, easeOut } from 'framer-motion';
import MicrosoftIcon from '@/components/icons/MicrosoftIcon';
import NvidiaIcon from '@/components/icons/NvidiaIcon';

const getSponsors = (locale: string) => {
  return [
    { name: 'Microsoft', icon: MicrosoftIcon },
    { name: 'NVIDIA', icon: NvidiaIcon },
  ];
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1,
    y: 0
  }
};

export default function SponsorsSection() {
  const [locale, setLocale] = useState('es');
  const sponsors = getSponsors(locale);

  useEffect(() => {
    // Detectar el idioma del navegador o usar 'es' por defecto
    const browserLang = typeof navigator !== 'undefined' ? navigator.language : 'es';
    const detectedLocale = browserLang.startsWith('en') ? 'en' : 'es';
    setLocale(detectedLocale);
  }, []);

  const titlePart1 = locale === 'es' 
    ? 'Patrocinadores' 
    : 'Technology';
    
  const titlePart2 = locale === 'es' 
    ? 'Tecnológicos' 
    : 'Sponsors';

  return (
    <section className="w-full py-24 px-6 text-center bg-[#0C1116]">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-12 text-[#FFFFFF]"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
        viewport={{ once: true }}
      >
        <span className="bg-gradient-to-r from-[#5EA0FF] to-[#3BA5FF] bg-clip-text text-transparent">
          {titlePart1}
        </span>{' '}
        {titlePart2}
      </motion.h2>

      <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24">
        {sponsors.map((sponsor, index) => {
          const IconComponent = sponsor.icon;
          return (
            <motion.div
              key={index}
              className="flex items-center justify-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              custom={index}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="p-6 rounded-2xl backdrop-blur-sm border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)]"
              >
                <IconComponent className="w-20 h-20 md:w-24 md:h-24" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}