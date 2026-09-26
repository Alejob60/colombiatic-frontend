// src/middleware/authMiddleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function authMiddleware(request: NextRequest) {
  console.log('Auth Middleware - Path:', request.nextUrl.pathname);

  const protectedRoutes = [
    '/dashboard',
    '/es/dashboard',
    '/en/dashboard',
    '/api/protected',
    '/profile'
  ];

  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) {
    // No se maneja aquí → continuar al siguiente middleware (i18n, etc.)
    return null;
  }

  // ✅ IMPORTANTE: aquí puedes validar token si más adelante usas cookies
  // const token = request.cookies.get('auth_token')?.value;

  // En este momento, dejas que el cliente maneje la autenticación
  // No redirige, solo permite continuar
  console.log('Auth Middleware - Protected route, continuing');
  return NextResponse.next();
}
