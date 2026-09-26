// src/app/(auth)/components/AuthNavbar.tsx
// Navbar simplificado para las páginas de autenticación

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthNavbar() {
  const pathname = usePathname();
  const isLoginPage = pathname.includes('/login');

  return (
    <nav className="fixed w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#5EA0FF] to-[#3BA5FF] bg-clip-text text-transparent">
              ColombiaTIC AI
            </span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {isLoginPage ? (
                <Link
                  href="/register"
                  className="text-[#94A3B8] hover:text-[#E6EDF3] px-3 py-2 text-sm font-medium transition-colors"
                >
                  Registrarse
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-[#94A3B8] hover:text-[#E6EDF3] px-3 py-2 text-sm font-medium transition-colors"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <div className="h-6 w-6"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}