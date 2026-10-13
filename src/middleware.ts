import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Rutas reales de primer nivel de `src/app`, mas los dos locales de
 * `src/lib/locales.ts`. Se declara explicito y no derivado a proposito: es la
 * lista que decide que Paths son legos, asi que tiene que poder auditarse.
 */
const RUTAS_VALIDAS = new Set([
  // Locales reales.
  'es',
  'en',
  // Paginas publicas.
  'about',
  'cases',
  'contact',
  'help',
  'industries',
  'resources',
  'services',
  'solutions',
  // Aplicacion autenticada.
  'dashboard',
  'profile',
  'settings',
  'chat-layout',
  'demo',
  // Arneses internos publicados en el build.
  'chat-test',
  'colombiatic-agent-test',
  'orchestrator-test',
  'widget-test',
]);

/**
 * Enhanced security middleware
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  // Cualquier ruta de un solo segmento que no sea una ruta real la reclama
  // `/(i18n)/[lang]`, cuyo layout hace `notFound()` para locales invalidos.
  // En Next 15.3.0 ese camino revienta con
  // `TypeError: Cannot read properties of undefined (reading 'entryCSSFiles')`
  // y responde 500 en vez de 404, tanto con boundary en la raiz como dentro
  // del grupo i18n.
  //
  // Por eso no se usa `notFound()`: se reescribe a una ruta que no matchea
  // ningun segmento, y ahi responde el 404 nativo del router, que si funciona.
  // Dos segmentos a proposito: con uno solo el destino volveria a matchear
  // `/(i18n)/[lang]` y a fallar por la misma razon.
  const segmentos = pathname.split('/').filter(Boolean);
  if (segmentos.length === 1 && !RUTAS_VALIDAS.has(segmentos[0])) {
    const url = request.nextUrl.clone();
    url.pathname = '/__ruta-inexistente__/404';
    return NextResponse.rewrite(url);
  }

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  
  // Content Security Policy
  const isDevelopment = process.env.NODE_ENV === 'development';
  const cspHeader = isDevelopment
    ? `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net http://localhost:3007; frame-ancestors 'none';`
    : `default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.colombiatic.ai; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net; frame-ancestors 'none';`;
  
  response.headers.set('Content-Security-Policy', cspHeader);
  
  // HTML must never be cached immutably, otherwise a deploy never reaches visitors.
  // Next.js already serves content-hashed files under /_next/static with a long
  // immutable cache, so this middleware only has to protect the documents.
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  
  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};