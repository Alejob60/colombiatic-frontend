import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Enhanced security middleware
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
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
  
  // Performance optimizations
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};