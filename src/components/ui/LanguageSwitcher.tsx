"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/types/locale";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale: Locale = locale === 'es' ? 'en' : 'es';
    setLocale(newLocale);
    
    // Get current path and replace the locale
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(es|en)/, `/${newLocale}`);
    
    // Navigate to the new path
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLocale}
      className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
      aria-label={locale === 'es' ? t('language.switch_to_english') || 'Switch to English' : t('language.switch_to_spanish') || 'Switch to Spanish'}
    >
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  );
}