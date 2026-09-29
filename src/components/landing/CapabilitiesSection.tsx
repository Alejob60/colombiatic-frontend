// src/components/landing/CapabilitiesSection.tsx
'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Cpu,
  Scale,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import SectionHeader from '@/components/landing/SectionHeader';

type Capability = {
  key: string;
  icon: LucideIcon;
  /** Accent identity for this product. Every colour-driven class lives here. */
  iconTile: string;
  iconGlow: string;
  product: string;
  edge: string;
  cardShadow: string;
  result: string;
};

const CAPABILITIES: Capability[] = [
  {
    key: 'misybot',
    icon: Bot,
    iconTile: 'border-[#00C2FF]/25 bg-[#00C2FF]/10 text-[#00C2FF]',
    iconGlow: 'bg-[#00C2FF]/25',
    product: 'text-[#00C2FF]',
    edge:
      'bg-[linear-gradient(140deg,rgba(0,198,255,0.6)_0%,rgba(0,198,255,0)_38%,rgba(255,255,255,0.1)_55%,rgba(0,198,255,0)_100%)]',
    cardShadow: 'hover:border-[#00C2FF]/35 hover:shadow-[0_18px_40px_-16px_rgba(0,198,255,0.4)]',
    result: 'border-[#00C2FF]/30 bg-[#00C2FF]/[0.08] text-[#00C2FF]',
  },
  {
    key: 'legal',
    icon: Scale,
    iconTile: 'border-[#A78BFA]/25 bg-[#A78BFA]/10 text-[#A78BFA]',
    iconGlow: 'bg-[#A78BFA]/25',
    product: 'text-[#A78BFA]',
    edge:
      'bg-[linear-gradient(140deg,rgba(167,139,250,0.6)_0%,rgba(167,139,250,0)_38%,rgba(255,255,255,0.1)_55%,rgba(167,139,250,0)_100%)]',
    cardShadow: 'hover:border-[#A78BFA]/35 hover:shadow-[0_18px_40px_-16px_rgba(167,139,250,0.4)]',
    result: 'border-[#A78BFA]/30 bg-[#A78BFA]/[0.08] text-[#A78BFA]',
  },
  {
    key: 'twin',
    icon: Cpu,
    iconTile: 'border-[#34D399]/25 bg-[#34D399]/10 text-[#34D399]',
    iconGlow: 'bg-[#34D399]/25',
    product: 'text-[#34D399]',
    edge:
      'bg-[linear-gradient(140deg,rgba(52,211,153,0.6)_0%,rgba(52,211,153,0)_38%,rgba(255,255,255,0.1)_55%,rgba(52,211,153,0)_100%)]',
    cardShadow: 'hover:border-[#34D399]/35 hover:shadow-[0_18px_40px_-16px_rgba(52,211,153,0.4)]',
    result: 'border-[#34D399]/30 bg-[#34D399]/[0.08] text-[#34D399]',
  },
  {
    key: 'adn',
    icon: ShoppingCart,
    iconTile: 'border-[#FBBF24]/25 bg-[#FBBF24]/10 text-[#FBBF24]',
    iconGlow: 'bg-[#FBBF24]/25',
    product: 'text-[#FBBF24]',
    edge:
      'bg-[linear-gradient(140deg,rgba(251,191,36,0.6)_0%,rgba(251,191,36,0)_38%,rgba(255,255,255,0.1)_55%,rgba(251,191,36,0)_100%)]',
    cardShadow: 'hover:border-[#FBBF24]/35 hover:shadow-[0_18px_40px_-16px_rgba(251,191,36,0.4)]',
    result: 'border-[#FBBF24]/30 bg-[#FBBF24]/[0.08] text-[#FBBF24]',
  },
];

const CAPABILITY_CARD_CLASS =
  'group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#18181B] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1';

const ACCENT_RING_CLASS =
  'pointer-events-none absolute inset-0 rounded-2xl p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 [-webkit-mask-image:linear-gradient(#000_0_0)] [-webkit-mask-clip:content-box,border-box] [-webkit-mask-composite:xor] [mask-image:linear-gradient(#000_0_0)] [mask-clip:content-box,border-box] [mask-composite:exclude]';

const STACK_CHIP_CLASS =
  'inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] leading-none text-[#94A3B8]';

export default function CapabilitiesSection() {
  const { t } = useTranslations();

  return (
    <section id="capacidades" className="py-20 sm:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={t('landing.capabilities.badge')}
          title={t('landing.capabilities.title')}
          description={t('landing.capabilities.subtitle')}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {CAPABILITIES.map((capability, index) => {
            const Icon = capability.icon;
            const stack = t(`landing.capabilities.${capability.key}.stack`)
              .split(',')
              .map((chip) => chip.trim())
              .filter((chip) => chip.length > 0);

            return (
              <motion.article
                key={capability.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className={`${CAPABILITY_CARD_CLASS} ${capability.cardShadow}`}
              >
                <span aria-hidden="true" className={`${ACCENT_RING_CLASS} ${capability.edge}`} />

                <ArrowUpRight
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-5 h-5 w-5 text-[#64748B] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#E6EDF3]"
                />

                <div className="flex items-center gap-3">
                  <span className="relative inline-flex">
                    <span
                      aria-hidden="true"
                      className={`absolute -inset-2 rounded-2xl blur-lg opacity-60 transition-opacity duration-300 group-hover:opacity-100 ${capability.iconGlow}`}
                    />
                    <span
                      className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${capability.iconTile}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </span>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-widest ${capability.product}`}
                  >
                    {t(`landing.capabilities.${capability.key}.product`)}
                  </span>
                </div>

                <h3 className="mt-6 pr-8 text-xl font-bold text-[#E6EDF3] tracking-tight">
                  {t(`landing.capabilities.${capability.key}.title`)}
                </h3>

                <p className="mt-3 text-[#94A3B8] leading-relaxed">
                  {t(`landing.capabilities.${capability.key}.description`)}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {stack.map((chip) => (
                    <li key={chip} className={STACK_CHIP_CLASS}>
                      {chip}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div
                    className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ${capability.result}`}
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80">
                        {t('landing.capabilities.resultLabel')}
                      </p>
                      <p className="mt-1.5 text-sm font-medium leading-relaxed">
                        {t(`landing.capabilities.${capability.key}.result`)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
