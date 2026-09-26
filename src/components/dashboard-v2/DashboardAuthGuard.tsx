// src/components/dashboard-v2/DashboardAuthGuard.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface DashboardAuthGuardProps {
  children: React.ReactNode;
}

/**
 * Guard component para proteger rutas del dashboard
 * Verifica autenticación antes de renderizar el contenido
 */
export default function DashboardAuthGuard({ children }: DashboardAuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      console.log('[DashboardAuthGuard] Verificando autenticación...');
      console.log('[DashboardAuthGuard] isLoading:', isLoading);
      console.log('[DashboardAuthGuard] user:', user);
      console.log('[DashboardAuthGuard] current path:', pathname);

      if (!isLoading) {
        if (!user) {
          console.log('[DashboardAuthGuard] No hay usuario, redirigiendo a login');
          router.push('/login');
        } else {
          console.log('[DashboardAuthGuard] Usuario autenticado:', user.email);
          setIsChecking(false);
        }
      }
    };

    checkAuth();
  }, [user, isLoading, router, pathname]);

  // Show loading while checking auth or while loading
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-white text-lg">Verificando autenticación...</p>
          <p className="text-gray-400 text-sm">Por favor espera</p>
        </div>
      </div>
    );
  }

  // Only render children if user is authenticated
  if (user) {
    return <>{children}</>;
  }

  // If no user and not loading, render nothing (redirect will happen)
  return null;
}