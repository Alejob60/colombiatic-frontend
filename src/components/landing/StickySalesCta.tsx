// src/components/landing/StickySalesCta.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

/* Show the CTA once the user is clearly past the hero band. */
const REVEAL_AFTER_PX = 600;

export default function StickySalesCta() {
  const { t } = useTranslations();
  const [isPastHero, setIsPastHero] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsPastHero(window.scrollY > REVEAL_AFTER_PX);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dismiss = useCallback(() => setIsDismissed(true), []);

  const isOpen = isPastHero && !isDismissed;

  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          data-sticky-sales-cta=""
          className="pointer-events-none fixed bottom-5 left-1/2 z-[9997] w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 print:hidden lg:bottom-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-[#0C1116]/85 py-1.5 pl-1.5 pr-1.5 shadow-[0_20px_50px_-18px_rgba(0,198,255,0.55)] backdrop-blur-xl"
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00C2FF] px-4 py-2 text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1116] sm:px-5"
            >
              {t('landing.hero.ctaPrimary')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={dismiss}
              aria-label={t('landing.stickyCta.dismiss')}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#94A3B8] transition-colors duration-300 hover:bg-white/[0.06] hover:text-[#E6EDF3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1116]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
