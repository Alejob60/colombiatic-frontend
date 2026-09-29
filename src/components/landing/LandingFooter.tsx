'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, MapPin, Network, Handshake, Scale } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

const BRAND_EMAIL = 'enterprise@colombiatic.com.co';

const LEGAL_LINKS = [
  { key: 'legalTerms', href: '/terminos' },
  { key: 'legalPrivacy', href: '/privacidad' },
  { key: 'legalCookies', href: '/cookies' },
] as const;

export default function LandingFooter() {
  const { t, locale } = useTranslations();

  return (
    <footer className="bg-[#0C1116] border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xl font-bold tracking-tight text-[#E6EDF3]">ColombiaTIC</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#94A3B8]">
              {t('landing.footer.tagline')}
            </p>

            <p className="mt-6 flex items-center gap-2 text-sm text-[#94A3B8]">
              <MapPin className="h-4 w-4 shrink-0 text-[#00C2FF]" aria-hidden="true" />
              {t('landing.footer.location')}
            </p>

            <p className="mt-3 flex items-center gap-2 text-sm text-[#94A3B8]">
              <Mail className="h-4 w-4 shrink-0 text-[#00C2FF]" aria-hidden="true" />
              <span>{t('landing.footer.emailLabel')}</span>
              <a
                href={`mailto:${BRAND_EMAIL}`}
                className="text-[#E6EDF3] hover:text-[#00C2FF] transition-colors"
              >
                {BRAND_EMAIL}
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00C2FF]">
              <Network className="h-4 w-4" aria-hidden="true" />
              {t('landing.footer.ecosystemLabel')}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">
              {t('landing.footer.ecosystem')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00C2FF]">
              <Handshake className="h-4 w-4" aria-hidden="true" />
              {t('landing.footer.alliancesLabel')}
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              <span className="inline-flex w-fit rounded-lg bg-white p-2">
                <Image
                  src="/partners/nvidia-inception-program-badge-rgb-for-screen.jpg"
                  alt={t('landing.footer.nvidiaInceptionBadge')}
                  width={126}
                  height={55}
                  className="h-auto w-auto max-h-[34px] object-contain"
                />
              </span>
              <p className="text-sm leading-relaxed text-[#94A3B8]">
                {t('landing.footer.alliances')}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-white/[0.07] pt-8">
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00C2FF]">
            <Scale className="h-4 w-4" aria-hidden="true" />
            {t('landing.footer.legalLabel')}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="text-sm text-[#94A3B8] hover:text-[#E6EDF3] transition-colors"
                >
                  {t(`landing.footer.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs text-[#94A3B8]">
            {t('landing.footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
