// src/components/sections/PartnersSection.tsx
<<<<<<< HEAD
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const partners = [
  { src: '/partners/openai4.png', alt: 'OpenAI' },
  { src: '/partners/Microsoft3.png', alt: 'Microsoft' },
  { src: '/partners/Azure.png', alt: 'Azure' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function PartnersSection() {
  return (
    <section className="w-full py-24 px-6 text-center bg-background">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-12 text-white"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        Tecnología Aliada
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={index}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="p-4 rounded-lg"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={250}
                height={100}
                className="object-contain max-h-250 w-auto opacity-80 hover:opacity-100 transition"
                priority
              />
            </motion.div>
          </motion.div>
        ))}
=======

import Image from "next/image";

export default function PartnersSection() {
  return (
    <section className="w-full py-20 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
          Aliados estratégicos
        </h2>

        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-base">
          Trabajamos junto a líderes globales en tecnología, infraestructura e innovación
          para brindar soluciones sólidas y escalables en toda Colombia.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          {logos.map((logo) => (
            <div key={logo.alt} className="opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="mx-auto"
              />
            </div>
          ))}
        </div>
>>>>>>> feature/hero-section
      </div>
    </section>
  );
}
<<<<<<< HEAD
=======

const logos = [
  {
    src: "/aws.png",
    alt: "Amazon Web Services",
    width: 120,
    height: 40,
  },
  {
    src: "/openai.png",
    alt: "OpenAI",
    width: 120,
    height: 40,
  },
  {
    src: "/gobierno.png",
    alt: "Gobierno de Colombia",
    width: 120,
    height: 40,
  },
  {
    src: "/react.png",
    alt: "React",
    width: 100,
    height: 40,
  },
];
>>>>>>> feature/hero-section
