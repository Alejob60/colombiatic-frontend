import type { MetadataRoute } from 'next';

const base = 'https://www.colombiatic.com.co';

/**
 * Solo se listan paginas que existen y son publicas.
 *
 * Las rutas bajo `/(i18n)/[lang]` se generan para los dos locales reales
 * declarados en `src/lib/locales.ts` (es, en). Listar un locale que no existe
 * devuelve 500 por el mismo motivo que rompia robots.txt, asi que la lista se
 * limita a los que estan declarados.
 */
const PAGINAS_PUBLICAS = [
  { path: '', prioridad: 1.0, frecuencia: 'weekly' as const },
  { path: '/about', prioridad: 0.7, frecuencia: 'monthly' as const },
  { path: '/solutions', prioridad: 0.9, frecuencia: 'monthly' as const },
  { path: '/services', prioridad: 0.9, frecuencia: 'monthly' as const },
  { path: '/industries', prioridad: 0.8, frecuencia: 'monthly' as const },
  { path: '/cases', prioridad: 0.8, frecuencia: 'weekly' as const },
  { path: '/resources', prioridad: 0.6, frecuencia: 'weekly' as const },
  { path: '/contact', prioridad: 0.8, frecuencia: 'monthly' as const },
  { path: '/help', prioridad: 0.5, frecuencia: 'monthly' as const },
  { path: '/pricing', prioridad: 0.8, frecuencia: 'monthly' as const },
  { path: '/privacidad', prioridad: 0.3, frecuencia: 'yearly' as const },
  { path: '/terminos', prioridad: 0.3, frecuencia: 'yearly' as const },
  { path: '/cookies', prioridad: 0.3, frecuencia: 'yearly' as const },
];

const LOCALES = ['es', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  const entradas: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const pagina of PAGINAS_PUBLICAS) {
      entradas.push({
        url: `${base}/${locale}${pagina.path}`,
        lastModified: ahora,
        changeFrequency: pagina.frecuencia,
        priority: pagina.prioridad,
        alternates: {
          languages: {
            es: `${base}/es${pagina.path}`,
            en: `${base}/en${pagina.path}`,
          },
        },
      });
    }
  }

  return entradas;
}