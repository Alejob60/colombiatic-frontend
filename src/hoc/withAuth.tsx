// src/hoc/withAuth.tsx
"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuth(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // If not loading and no user, redirect to login
      if (!isLoading && !user) {
        router.push('/login');
      }
    }, [user, isLoading, router]);

    // Show loading state while checking auth
    if (isLoading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Verificando autenticación...</p>
          </div>
        </div>
      );
    }

    // If user exists, render the component
    if (user) {
      return <WrappedComponent {...props} />;
    }

    // If no user and not loading, render nothing (will redirect)
    return null;
  };
}