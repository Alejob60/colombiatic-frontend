// src/hooks/useTenant.ts
// Hook personalizado para acceder a la información del tenant

import { useTenant } from '@/contexts/TenantContext';

export const useTenantInfo = () => {
  const { tenant, isLoading, error } = useTenant();
  
  // Función para obtener el ID del tenant
  const getTenantId = (): string | null => {
    return tenant?.id || null;
  };
  
  // Función para verificar si el tenant está cargado
  const isTenantLoaded = (): boolean => {
    return !isLoading && tenant !== null;
  };
  
  // Función para obtener información del tenant
  const getTenantInfo = (): { id: string; name: string; plan: string; status: string } | null => {
    if (!tenant) return null;
    
    return {
      id: tenant.id,
      name: tenant.name,
      plan: tenant.plan,
      status: tenant.status
    };
  };
  
  // Función para verificar si hay errores
  const hasTenantError = (): boolean => {
    return error !== null;
  };
  
  // Función para obtener el mensaje de error
  const getTenantError = (): string | null => {
    return error;
  };
  
  return {
    tenant,
    isLoading,
    error,
    getTenantId,
    isTenantLoaded,
    getTenantInfo,
    hasTenantError,
    getTenantError
  };
};