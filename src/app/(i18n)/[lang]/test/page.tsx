// src/app/[lang]/test/page.tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function TestPage() {
  const { t, locale } = useLanguage();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Translation Test</h1>
      <p>Current locale: {locale}</p>
      <p>Hero title: {t('hero.title')}</p>
      <p>Hero subtitle: {t('hero.subtitle')}</p>
      <p>Non-existent key: {t('non.existent.key')}</p>
    </div>
  );
}