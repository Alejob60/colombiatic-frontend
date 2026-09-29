'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/i18n';

const LOCALES = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
] as const;

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, t } = useTranslations();

  const switchTo = (next: string) => {
    const segments = (pathname ?? `/${locale}`).split('/');
    segments[1] = next;
    router.push(segments.join('/') || `/${next}`);
  };

  return (
    <div
      role="group"
      aria-label={t('language.switchLabel')}
      className="inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-0.5"
    >
      {LOCALES.map((option) => {
        const isActive = locale === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => switchTo(option.code)}
            aria-pressed={isActive}
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-widest transition-colors ${
              isActive
                ? 'bg-[#5EA0FF] text-[#0C1116]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
