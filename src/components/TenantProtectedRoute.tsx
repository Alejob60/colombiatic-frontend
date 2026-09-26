// src/components/TenantProtectedRoute.tsx
"use client";

import { useTenant } from '@/contexts/TenantContext';
import TenantSelector from './TenantSelector';
import { Loader } from '@/components/ui/Loader';

interface TenantProtectedRouteProps {
  children: React.ReactNode;
}

export default function TenantProtectedRoute({ children }: TenantProtectedRouteProps) {
  const { tenant, loading } = useTenant();

  // Show loading spinner while checking tenant
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  // If no tenant is selected, show tenant selector
  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <TenantSelector />
      </div>
    );
  }

  // If tenant is selected, render children
  return <>{children}</>;
}