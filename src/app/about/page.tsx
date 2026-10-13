// src/app/about/page.tsx
//
// `/about` en la raiz no tenia pagina: la unica version vivia en
// `(i18n)/[lang]/about`, y como el middleware deja pasar los nombres de ruta
// que no son locales, `about` caia en `[lang]`, `notFound()` reventaba en
// Next 15.3.0 y la respuesta era 500 en vez de 404. `/contact` tenia el mismo
// problema, y son justo las dos URLs que la gente escribe a mano.
//
// Esta pagina sirve la version en espanol reutilizando el componente de la
// ruta i18n, de modo que no hay dos copias del contenido que se puedan
// desincronizar.

import { LanguageProvider } from '@/contexts/LanguageContext';
import AboutPage from '../(i18n)/[lang]/about/page';

export default function About() {
  return (
    <LanguageProvider initialLocale={'es' as any}>
      <AboutPage />
    </LanguageProvider>
  );
}