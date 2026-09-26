// src/contexts/TenantContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { validateCurrentTenant, validateTenantDomain } from '@/services/tenantService';
import { Tenant } from '@/types/tenant';

interface TenantContextType {
  tenant: Tenant | null;
  setTenant: (tenant: Tenant | null) => void;
  validateTenant: (domain: string) => Promise<boolean>;
  isLoading: boolean;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeTenant = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Validar el tenant actual
        const validationResponse = await validateCurrentTenant();
        
        if (validationResponse.valid && validationResponse.tenant) {
          setTenant(validationResponse.tenant);
          console.log('[TenantContext] Tenant validado:', validationResponse.tenant);
        } else {
          setError(validationResponse.message || 'No se pudo validar el tenant');
          console.warn('[TenantContext] Error de validación de tenant:', validationResponse.message);
        }
      } catch (err) {
        console.error('[TenantContext] Error inicializando tenant:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido al inicializar el tenant');
      } finally {
        setIsLoading(false);
      }
    };

    // No bloquear la renderización por el tenant
    initializeTenant();
  }, []);

  // Si hay un error o está cargando, no bloquear la renderización
  if (isLoading) {
    console.log('[TenantContext] Cargando tenant...');
  }

  if (error) {
    console.warn('[TenantContext] Error:', error);
  }

  const validateTenant = useCallback(async (domain: string): Promise<boolean> => {
    if (!domain.trim()) {
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      const validationResponse = await validateTenantDomain(domain);

      if (validationResponse.valid && validationResponse.tenant) {
        setTenant(validationResponse.tenant);
        console.log('[TenantContext] Dominio validado:', validationResponse.tenant.domain);
        return true;
      }

      setError(validationResponse.message || 'No se pudo validar el tenant');
      return false;
    } catch (err) {
      console.error('[TenantContext] Error validando dominio de tenant:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al validar el tenant');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, setTenant, validateTenant, isLoading, loading: isLoading, error }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  
  // En lugar de lanzar un error, devolvemos valores por defecto
  // Esto previene errores cuando el contexto no está disponible
  if (context === undefined) {
    console.warn('[TenantContext] useTenant debe ser usado dentro de un TenantProvider. Devolviendo valores por defecto.');
    return {
      tenant: null,
      setTenant: () => {
        console.warn('[TenantContext] setTenant llamado fuera de TenantProvider');
      },
      validateTenant: async () => false,
      isLoading: false,
      loading: false,
      error: null
    };
  }
  
  return context;
}