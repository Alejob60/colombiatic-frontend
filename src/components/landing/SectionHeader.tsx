// src/components/landing/SectionHeader.tsx
'use client';

import { motion } from 'framer-motion';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`mx-auto max-w-3xl text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#00C2FF]">
          <span
            aria-hidden="true"
            className="h-px w-6 bg-gradient-to-r from-transparent to-[#00C2FF]/60 sm:w-10"
          />
          {eyebrow}
          <span
            aria-hidden="true"
            className="h-px w-6 bg-gradient-to-l from-transparent to-[#00C2FF]/60 sm:w-10"
          />
        </span>
      ) : null}

      <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-[#E6EDF3] tracking-tight text-balance">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 text-[#94A3B8] text-base sm:text-lg leading-relaxed text-pretty">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
