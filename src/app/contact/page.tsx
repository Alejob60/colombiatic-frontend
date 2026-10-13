// src/app/contact/page.tsx
//
// Ver la nota de `src/app/about/page.tsx`: la causa del 500 era la misma.
// `/contact` es la URL que mas escribe la gente a mano, asi que tenerla
// devolviendo error de servidor era lo peor que podia estar caido.

import { LanguageProvider } from '@/contexts/LanguageContext';
import ContactPage from '../(i18n)/[lang]/contact/page';

export default function Contact() {
  return (
    <LanguageProvider initialLocale={'es' as any}>
      <ContactPage />
    </LanguageProvider>
  );
}