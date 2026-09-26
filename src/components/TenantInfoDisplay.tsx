// src/components/TenantInfoDisplay.tsx
// Componente para mostrar información del tenant en la UI

"use client";

import { useTenantInfo } from '@/hooks/useTenant';

export default function TenantInfoDisplay() {
  const { tenant, isLoading, error } = useTenantInfo();
  
  // No mostrar nada en producción
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  // Mostrar información del tenant en desarrollo
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg z-50 text-xs">
      <h3 className="font-bold mb-1">Tenant Info (Dev)</h3>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <div>
          <p className="text-red-400">Error: {error}</p>
        </div>
      ) : tenant ? (
        <div>
          <p>ID: {tenant.id.substring(0, 8)}...</p>
          <p>Nombre: {tenant.name}</p>
          <p>Plan: {tenant.plan}</p>
          <p>Estado: {tenant.status}</p>
        </div>
      ) : (
        <p>No tenant</p>
      )}
    </div>
  );
}