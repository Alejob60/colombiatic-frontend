// src/components/landing/EcosystemSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Gauge, Network, ShieldCheck, type LucideIcon } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import SectionHeader from '@/components/landing/SectionHeader';

type Pillar = {
  key: string;
  icon: LucideIcon;
};

const PILLARS: Pillar[] = [
  { key: 'scalable', icon: Network },
  { key: 'privacy', icon: ShieldCheck },
  { key: 'efficiency', icon: Gauge },
];

const PILLAR_CARD_CLASS =
  'group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#18181B] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#00C2FF]/30 hover:shadow-[0_18px_40px_-16px_rgba(0,198,255,0.35)]';

const ACCENT_RING_CLASS =
  'pointer-events-none absolute inset-0 rounded-2xl p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 [-webkit-mask-image:linear-gradient(#000_0_0)] [-webkit-mask-clip:content-box,border-box] [-webkit-mask-composite:xor] [mask-image:linear-gradient(#000_0_0)] [mask-clip:content-box,border-box] [mask-composite:exclude] bg-[linear-gradient(140deg,rgba(0,198,255,0.55)_0%,rgba(0,198,255,0)_38%,rgba(255,255,255,0.1)_55%,rgba(0,198,255,0)_100%)]';

const SECTION_HAIRLINE_CLASS =
  'absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent';

export default function EcosystemSection() {
  const { t } = useTranslations();

  return (
    <section id="ecosistema" className="relative bg-white/[0.015] py-20 sm:py-28 px-6">
      <span aria-hidden="true" className={SECTION_HAIRLINE_CLASS} />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={t('landing.ecosystem.badge')}
          title={t('landing.ecosystem.title')}
          description={t('landing.ecosystem.description')}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.article
                key={pillar.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className={PILLAR_CARD_CLASS}
              >
                <span aria-hidden="true" className={ACCENT_RING_CLASS} />

                <span className="relative inline-flex">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-2xl bg-[#00C2FF]/20 blur-lg opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#00C2FF]/20 bg-[#00C2FF]/10 text-[#00C2FF]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </span>

                <h3 className="mt-6 text-xl font-bold text-[#E6EDF3] tracking-tight text-balance">
                  {t(`landing.ecosystem.pillars.${pillar.key}.title`)}
                </h3>
                <p className="mt-3 text-[#94A3B8] leading-relaxed text-pretty">
                  {t(`landing.ecosystem.pillars.${pillar.key}.description`)}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
