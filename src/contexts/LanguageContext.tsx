"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Locale } from '../types/locale';
import { getTranslations } from '../lib/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children,
  initialLocale = 'es'
}: { 
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale as Locale);
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    // Load translations for the current locale
    const loadTranslations = async () => {
      try {
        const trans = getTranslations(locale);
        setTranslations(trans);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to empty object to prevent crashes
        setTranslations({});
      }
    };
    
    loadTranslations();
  }, [locale]);

  // Function to get translation by key (supports nested keys like "hero.title")
  const t = (key: string): string => {
    try {
      // If translations haven't loaded yet, show the key as placeholder
      if (Object.keys(translations).length === 0) {
        return key;
      }
      
      const result = key.split('.').reduce((obj: any, k) => obj?.[k], translations) as string;
      return result || key;
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}