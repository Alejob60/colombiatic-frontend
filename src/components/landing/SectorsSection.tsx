'use client';

import { motion } from 'framer-motion';
import { Landmark, Briefcase, Palette, Check, type LucideIcon } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import SectionHeader from '@/components/landing/SectionHeader';

type SectorKey = 'government' | 'business' | 'creators';

interface SectorDef {
  key: SectorKey;
  icon: LucideIcon;
  items: string[];
}

const SECTORS: SectorDef[] = [
  { key: 'government', icon: Landmark, items: ['intake', 'compliance', 'sovereignty'] },
  { key: 'business', icon: Briefcase, items: ['funnels', 'dashboards', 'omnichannel'] },
  { key: 'creators', icon: Palette, items: ['experiences', 'monetization'] },
];

const SECTOR_CARD_CLASS =
  'group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#18181B] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#00C2FF]/30 hover:shadow-[0_18px_40px_-16px_rgba(0,198,255,0.35)]';

const ACCENT_RING_CLASS =
  'pointer-events-none absolute inset-0 rounded-2xl p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 [-webkit-mask-image:linear-gradient(#000_0_0)] [-webkit-mask-clip:content-box,border-box] [-webkit-mask-composite:xor] [mask-image:linear-gradient(#000_0_0)] [mask-clip:content-box,border-box] [mask-composite:exclude] bg-[linear-gradient(140deg,rgba(0,198,255,0.55)_0%,rgba(0,198,255,0)_38%,rgba(255,255,255,0.1)_55%,rgba(0,198,255,0)_100%)]';

export default function SectorsSection() {
  const { t } = useTranslations();

  return (
    <section id="sectores" className="relative bg-white/[0.015] py-20 sm:py-28 px-6">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={t('landing.sectors.badge')}
          title={t('landing.sectors.title')}
          description={t('landing.sectors.subtitle')}
        />

        <div className="mt-12 sm:mt-16 grid gap-6 lg:grid-cols-3">
          {SECTORS.map((sector, index) => {
            const Icon = sector.icon;

            return (
              <motion.article
                key={sector.key}
                className={SECTOR_CARD_CLASS}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
              >
                <span aria-hidden="true" className={ACCENT_RING_CLASS} />

                <div className="relative inline-flex">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-2xl bg-[#00C2FF]/20 blur-lg opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div
                    data-sector-icon={t(`landing.sectors.${sector.key}.icon`)}
                    className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00C2FF]/25 bg-[#00C2FF]/10 text-[#00C2FF]"
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#E6EDF3] tracking-tight">
                  {t(`landing.sectors.${sector.key}.title`)}
                </h3>

                <ul className="mt-5 space-y-3">
                  {sector.items.map((itemKey) => (
                    <li
                      key={itemKey}
                      className="flex gap-3 text-[#94A3B8] text-sm sm:text-[15px] leading-relaxed"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00C2FF]" aria-hidden="true" />
                      <span>{t(`landing.sectors.${sector.key}.items.${itemKey}`)}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
