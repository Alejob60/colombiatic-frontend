// src/components/landing/TractionSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n';
import SectionHeader from '@/components/landing/SectionHeader';

type MetricKey = 'cost' | 'efficiency' | 'conversion' | 'architecture';

const METRICS: MetricKey[] = ['cost', 'efficiency', 'conversion', 'architecture'];

const METRIC_CARD_CLASS =
  'group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#18181B] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#00C2FF]/30 hover:shadow-[0_18px_40px_-16px_rgba(0,198,255,0.35)]';

const METRIC_VALUE_CLASS =
  'relative text-4xl sm:text-[2.5rem] xl:text-[2.25rem] font-bold tracking-tighter bg-gradient-to-r from-[#0066FF] to-[#00C2FF] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(0,198,255,0.35)]';

export default function TractionSection() {
  const { t } = useTranslations();

  return (
    <section id="traccion" className="relative py-20 sm:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={t('landing.traction.badge')}
          title={t('landing.traction.title')}
          description={t('landing.traction.subtitle')}
        />

        <div className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {METRICS.map((metric, index) => (
            <motion.article
              key={metric}
              className={METRIC_CARD_CLASS}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/80 to-transparent"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -right-8 h-40 w-40 rounded-full bg-[#00C2FF]/20 blur-3xl opacity-60 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-70"
              />

              <p className={METRIC_VALUE_CLASS}>
                {t(`landing.traction.${metric}.value`)}
              </p>

              <p className="mt-5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
                {t(`landing.traction.${metric}.label`)}
              </p>

              <p className="mt-auto pt-3 text-sm leading-relaxed text-[#94A3B8]">
                {t(`landing.traction.${metric}.description`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
