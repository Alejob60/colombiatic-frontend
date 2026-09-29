'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n';
import SectionHeader from '@/components/landing/SectionHeader';

type PhaseKey = 'phase1' | 'phase2' | 'phase3';

const PHASES: PhaseKey[] = ['phase1', 'phase2', 'phase3'];

const PHASE_STEP_CLASS =
  'group relative flex gap-5 transition-all duration-300 lg:flex-col lg:items-center lg:text-center';

export default function PhasesSection() {
  const { t } = useTranslations();

  return (
    <section id="fases" className="relative bg-white/[0.015] py-20 sm:py-28 px-6">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={t('landing.phases.badge')}
          title={t('landing.phases.title')}
          description={t('landing.phases.subtitle')}
        />

        <ol className="relative mt-12 sm:mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8">
          <span
            aria-hidden="true"
            className="hidden lg:block absolute left-[16.67%] right-[16.67%] top-6 h-px bg-gradient-to-r from-[#0066FF] via-[#00C2FF] to-[#0066FF]"
          />

          {PHASES.map((phase, index) => (
            <motion.li
              key={phase}
              className={PHASE_STEP_CLASS}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.14 }}
            >
              {index < PHASES.length - 1 && (
                <span
                  aria-hidden="true"
                  className="lg:hidden absolute left-6 top-14 bottom-[-2.5rem] w-px bg-gradient-to-b from-[#0066FF] to-[#00C2FF]/30"
                />
              )}

              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[#00C2FF]/20 blur-lg opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#00C2FF]/60 bg-[#0C1116] text-lg font-bold text-[#00C2FF] shadow-[0_10px_30px_-12px_rgba(0,198,255,0.6)]">
                  {index + 1}
                </span>
              </span>

              <div className="min-w-0 flex-1 lg:mt-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#00C2FF]">
                  {t(`landing.phases.${phase}.label`)}
                </p>
                <h3 className="mt-3 text-lg sm:text-xl font-semibold text-[#E6EDF3] tracking-tight">
                  {t(`landing.phases.${phase}.title`)}
                </h3>
                <p className="mt-3">
                  <span className="inline-block rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#94A3B8] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                    {t(`landing.phases.${phase}.timing`)}
                  </span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">
                  {t(`landing.phases.${phase}.description`)}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
