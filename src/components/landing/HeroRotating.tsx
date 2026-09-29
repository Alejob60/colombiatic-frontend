// src/components/landing/HeroRotating.tsx
'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

const ROTATION_MS = 4500;
const SLIDE_KEYS = ['government', 'commerce', 'edge', 'legal'] as const;
const SLIDE_OFFSET = 40;

const slideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? SLIDE_OFFSET : -SLIDE_OFFSET,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -SLIDE_OFFSET : SLIDE_OFFSET,
  }),
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const GRID_DECOR_STYLE: CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.35) 45%, transparent 80%)',
  maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.35) 45%, transparent 80%)',
};

export default function HeroRotating() {
  const { t } = useTranslations();

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mounted, setMounted] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const armTimer = useCallback(() => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % SLIDE_KEYS.length);
    }, ROTATION_MS);
  }, [clearTimer]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    armTimer();
    return clearTimer;
  }, [mounted, armTimer, clearTimer]);

  const goToSlide = useCallback(
    (next: number) => {
      setDirection(next >= index ? 1 : -1);
      setIndex(next);
      armTimer();
    },
    [armTimer, index]
  );

  const total = SLIDE_KEYS.length;
  const activeKey = SLIDE_KEYS[index];

  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28 px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -left-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full bg-[#0066FF]/20 blur-[130px] motion-safe:animate-[heroDriftA_22s_ease-in-out_infinite]"
        />
        <div
          className="absolute -right-[15%] top-[5%] h-[60vh] w-[60vh] rounded-full bg-[#00C2FF]/15 blur-[140px] motion-safe:animate-[heroDriftB_28s_ease-in-out_infinite]"
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={GRID_DECOR_STYLE} />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.5]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 600"
        fill="none"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 35%, black 70%)',
          maskImage:
            'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 35%, black 70%)',
        }}
      >
        <g stroke="#00C2FF" strokeWidth="1">
          <path d="M120 140 L340 90 L520 210 L760 120 L980 230 L1120 130" />
          <path d="M180 420 L420 480 L640 400 L880 470 L1080 390" />
          <path d="M340 90 L420 480" />
          <path d="M760 120 L640 400" />
          <path d="M980 230 L880 470" />
          <path d="M120 140 L180 420" />
        </g>
        <g fill="#00C2FF">
          <circle cx="120" cy="140" r="3" />
          <circle cx="340" cy="90" r="3" />
          <circle cx="520" cy="210" r="3" />
          <circle cx="760" cy="120" r="3" />
          <circle cx="980" cy="230" r="3" />
          <circle cx="1120" cy="130" r="3" />
          <circle cx="180" cy="420" r="3" />
          <circle cx="420" cy="480" r="3" />
          <circle cx="640" cy="400" r="3" />
          <circle cx="880" cy="470" r="3" />
          <circle cx="1080" cy="390" r="3" />
        </g>
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-[#00C2FF]/10 to-transparent motion-safe:animate-[heroScan_9s_linear_infinite]"
      />

      <div className="max-w-7xl mx-auto grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <p className="font-[family-name:var(--font-geist-mono)] text-[11px] font-medium uppercase tracking-[0.28em] text-[#00C2FF]">
              {t('landing.hero.badge')}
            </p>
            <p className="mt-2 font-[family-name:var(--font-geist-mono)] text-[11px] font-medium uppercase tracking-[0.28em] text-[#64748B]">
              {t('landing.hero.badgeSecondary')}
            </p>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-[#E6EDF3] tracking-tight leading-[1.12]"
          >
            {t('landing.hero.title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg sm:text-xl font-medium text-[#E6EDF3]/90 leading-snug"
          >
            {(['clause1', 'clause2', 'clause3'] as const).map((key) => (
              <span
                key={key}
                className="mr-2 inline-block cursor-default rounded-md px-1 -mx-1 transition-colors duration-300 hover:text-[#00C2FF]"
              >
                {t(`landing.hero.${key}`)}
              </span>
            ))}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-2xl text-[#94A3B8] text-sm sm:text-base leading-relaxed"
          >
            {t('landing.hero.body')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00C2FF] text-white font-semibold hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1116] transition-opacity"
            >
              {t('landing.hero.ctaPrimary')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#ecosistema"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-[#E6EDF3] hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1116] transition-colors"
            >
              {t('landing.hero.ctaSecondary')}
            </a>
          </motion.div>
        </motion.div>

        <div className="relative min-h-[280px] sm:min-h-[300px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeKey}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#18181B] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 sm:p-8 flex flex-col justify-center shadow-[0_24px_60px_-30px_rgba(0,198,255,0.35)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/70 to-transparent"
              />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#00C2FF]">
                {t(`landing.hero.slides.${activeKey}.label`)}
              </span>
              <span className="mt-3 text-2xl sm:text-3xl font-bold text-[#E6EDF3] tracking-tight">
                {t(`landing.hero.slides.${activeKey}.product`)}
              </span>
              <span className="mt-4 block text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                {t(`landing.hero.slides.${activeKey}.description`)}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex items-center gap-2">
          {SLIDE_KEYS.map((key, dotIndex) => {
            const isActive = dotIndex === index;
            return (
              <button
                key={key}
                type="button"
                onClick={() => goToSlide(dotIndex)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={t(`landing.hero.slides.${key}.product`)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1116] ${
                  isActive
                    ? 'w-8 bg-gradient-to-r from-[#0066FF] to-[#00C2FF]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            );
          })}
        </div>

        <span className="text-xs font-medium tracking-widest text-[#94A3B8]">
          {index + 1} {t('landing.hero.slideOf')} {total}
        </span>
      </div>
    </section>
  );
}
