// src/services/tenantService.ts
// Servicio para manejar la validación y gestión del tenant

import apiClient from '@/lib/apiInterceptor';

interface TenantInfo {
  id: string;
  name: string;
  plan: string;
  status: string;
  domain: string;
}

interface TenantValidationResponse {
  valid: boolean;
  tenant?: TenantInfo;
  message?: string;
}

const REFERENCE_TENANT: TenantInfo = {
  id: '7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba',
  name: 'test-tenant',
  plan: 'FREE',
  status: 'Active',
  domain: 'test.colombiatic.com'
};

// El tenant se identifica por el host de la petición, así que si el backend no
// lo devuelve explícitamente usamos el host actual como dominio del tenant.
function currentHost(): string {
  return typeof window !== 'undefined' && window.location.host
    ? window.location.host
    : REFERENCE_TENANT.domain;
}

function withDomain(response: TenantValidationResponse, fallbackDomain: string): TenantValidationResponse {
  if (!response.tenant) {
    return response;
  }

  return {
    ...response,
    tenant: {
      ...response.tenant,
      domain: response.tenant.domain || fallbackDomain
    }
  };
}

/**
 * Validar el tenant actual
 */
export async function validateCurrentTenant(): Promise<TenantValidationResponse> {
  try {
    console.log('[TenantService] Validando tenant actual');
    
    // En entornos de desarrollo, retornar el tenant de referencia
    if (process.env.NODE_ENV === 'development') {
      console.log('[TenantService] Entorno de desarrollo, usando tenant de referencia');
      return {
        valid: true,
        tenant: { ...REFERENCE_TENANT }
      };
    }
    
    // En producción, podríamos hacer una llamada real al backend
    // Por ahora, simulamos una validación exitosa
    const response = await apiClient.get<TenantValidationResponse>('/auth/tenant/validate');
    
    return withDomain(response.data, currentHost());
  } catch (error: any) {
    console.error('[TenantService] Error validando tenant:', error);
    
    // Retornar un tenant por defecto en caso de error
    return {
      valid: true,
      tenant: { ...REFERENCE_TENANT },
      message: 'Usando tenant por defecto debido a error de validación'
    };
  }
}

/**
 * Validar un dominio de tenant explícito
 * @param domain Dominio a validar (ej. ejemplo.colombiatic.com)
 */
export async function validateTenantDomain(domain: string): Promise<TenantValidationResponse> {
  const normalizedDomain = domain.trim().toLowerCase();

  try {
    console.log(`[TenantService] Validando dominio de tenant: ${normalizedDomain}`);

    const response = await apiClient.get<TenantValidationResponse>('/auth/tenant/validate', {
      params: { domain: normalizedDomain }
    });

    return withDomain(response.data, normalizedDomain);
  } catch (error: any) {
    console.error(`[TenantService] Error validando el dominio ${normalizedDomain}:`, error);

    return {
      valid: false,
      message: 'No se pudo validar el dominio del tenant'
    };
  }
}

/**
 * Obtener información detallada del tenant
 */
export async function getTenantDetails(tenantId: string): Promise<any> {
  try {
    console.log(`[TenantService] Obteniendo detalles del tenant: ${tenantId}`);
    
    const response = await apiClient.get(`/tenants/${tenantId}`);
    
    return response.data;
  } catch (error: any) {
    console.error(`[TenantService] Error obteniendo detalles del tenant ${tenantId}:`, error);
    throw error;
  }
}

export default {
  validateCurrentTenant,
  validateTenantDomain,
  getTenantDetails
};