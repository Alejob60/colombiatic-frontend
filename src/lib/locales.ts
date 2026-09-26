// src/lib/locales.ts
import type { LocaleConfig } from '../types/locale';

export const locales: LocaleConfig[] = [
  {
    locale: 'es',
    label: 'Español',
    flag: '🇪🇸'
  },
  {
    locale: 'en',
    label: 'English',
    flag: '🇺🇸'
  }
];

export const defaultLocale = 'es';