'use client';

import { useTranslations } from '@/lib/i18n';
import { ShieldCheck } from 'lucide-react';

export type LegalDoc = 'terms' | 'privacy' | 'cookies';

const SECTIONS: Record<LegalDoc, string[]> = {
  terms: ['scope', 'services', 'ip', 'liability', 'law'],
  privacy: ['collect', 'purpose', 'rights', 'retention', 'security'],
  cookies: ['essential', 'analytics', 'manage'],
};

const UPDATED: Record<LegalDoc, string> = {
  terms: '2026-01-15',
  privacy: '2026-01-15',
  cookies: '2026-01-15',
};

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-[#0C1116] pt-[72px]">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/25 bg-[#00C2FF]/[0.06] px-3 py-1 text-xs font-medium tracking-wide text-[#00C2FF] uppercase">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Legal
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-[#E6EDF3] tracking-tight">
          {t(`landing.legal.${doc}.title`)}
        </h1>

        <p className="mt-3 text-sm text-[#64748B]">
          {t('landing.legal.terms.updated')}:{' '}
          <time dateTime={UPDATED[doc]}>{UPDATED[doc]}</time>
        </p>

        <p className="mt-6 text-[#94A3B8] text-base sm:text-lg leading-relaxed">
          {t(`landing.legal.${doc}.intro`)}
        </p>

        <div className="mt-12 space-y-8">
          {SECTIONS[doc].map((sectionKey) => (
            <section
              key={sectionKey}
              className="rounded-2xl bg-[#18181B] border border-white/[0.07] p-6 sm:p-8"
            >
              <h2 className="text-xl font-semibold text-[#E6EDF3]">
                {t(`landing.legal.${doc}.sections.${sectionKey}.title`)}
              </h2>
              <p className="mt-3 text-[#94A3B8] leading-relaxed">
                {t(`landing.legal.${doc}.sections.${sectionKey}.body`)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
