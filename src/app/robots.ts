import type { MetadataRoute } from 'next';

/**
 * robots.txt del sitio publico.
 *
 * Esto NO existia: `/robots.txt` caia en la ruta dinamica `/(i18n)/[lang]`,
 * que hace `notFound()`, y como no habia `not-found.tsx` en toda la app la
 * respuesta era 500 en vez de 404. Un crawler que recibe 500 deja de rastrear
 * el sitio entero, no solo esa URL.
 *
 * Se declara como `MetadataRoute.Robots` y no como archivo estatico porque
 * Next.js le da prioridad a las rutas estaticas sobre `[lang]`: asi el
 * 404 silencioso no vuelve a aparecer para esta URL.
 */
export default function robots(): MetadataRoute.Robots {
  const base = 'https://www.colombiatic.com.co';

  /**
   * Rutas internas que no son producto y que ademas exponen detalle de la
   * plataforma: nombres de agentes, arneses de prueba y rutas del constructor
   * de sitios. Bloquearlas en robots es la primera barrera, no la unica: el
   * middleware tambien las saca del indice.
   */
  const internas = [
    '/api/',
    '/dashboard',
    '/settings',
    '/profile',
    '/chat-layout',
    '/commercial',
    '/checkout',
    '/login',
    '/register',
    '/test',
    '/debug',
    '/chat-test',
    '/test-chat',
    '/widget-test',
    '/colombiatic-agent-test',
    '/orchestrator-test',
    '/demo',
    '/web-builder',
    '/_next',
  ];

  return {
    rules: [
      {
        // Motores de busqueda: acceso completo. Es lo que el sitio quiere.
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'YandexBot'],
        allow: '/',
        disallow: internas,
      },
      {
        /**
         * Rastreadores de entrenamiento de IA.
         *
         * El sitio publico es material comercial y la plataforma es un
         * desarrollo propio: no corresponde que un tercero lo use como corpus
         * de entrenamiento ni lo replique en sus respuestas. Esto NO
         * bloquea busqueda: los buscadores de arriba siguen indexando todo.
         *
         * Se enumeran por token de agente de usuario, que es lo unico que
         * robots.txt puede honestar. Un crawler que miente en su user-agent no
         * lo respeta ningun robots.txt del mundo; para eso haria falta WAF.
         */
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'anthropic-ai',
          'Google-Extended',
          'PerplexityBot',
          'Perplexity-User',
          'Applebot-Extended',
          'Amazonbot',
          'meta-externalagent',
          'FacebookBot',
          'Bytespider',
          'CCBot',
          'cohere-ai',
          'cohere-training-data-crawler',
          'Diffbot',
          'ImagesiftBot',
          'Omgilibot',
          'Scrapy',
          'Timpibot',
          'YouBot',
        ],
        disallow: '/',
      },
      {
        // Todo lo demas entra, pero sin las rutas internas.
        userAgent: '*',
        allow: '/',
        disallow: internas,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}