// src/components/sections/PartnersSection.tsx
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
      </div>
    </section>
  );
}
