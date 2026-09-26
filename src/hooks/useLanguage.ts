// src/hooks/useLanguage.ts
// Hook personalizado para manejar el idioma y las traducciones

import { useTranslations } from '@/lib/i18n';

// Mantener compatibilidad con la interfaz anterior
export const useLanguage = () => {
  const { t, locale } = useTranslations();
  
  // Devolver el mismo objeto que el contexto anterior
  return {
    locale,
    setLocale: () => {
      console.warn('setLocale is not implemented in this version');
    },
    t
  };
};