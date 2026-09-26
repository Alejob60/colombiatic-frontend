// src/services/tenantService.ts
// Servicio para manejar la validación y gestión del tenant

import apiClient from '@/lib/apiInterceptor';

interface TenantValidationResponse {
  valid: boolean;
  tenant?: {
    id: string;
    name: string;
    plan: string;
    status: string;
  };
  message?: string;
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
        tenant: {
          id: '7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba',
          name: 'test-tenant',
          plan: 'FREE',
          status: 'Active'
        }
      };
    }
    
    // En producción, podríamos hacer una llamada real al backend
    // Por ahora, simulamos una validación exitosa
    const response = await apiClient.get<TenantValidationResponse>('/auth/tenant/validate');
    
    return response.data;
  } catch (error: any) {
    console.error('[TenantService] Error validando tenant:', error);
    
    // Retornar un tenant por defecto en caso de error
    return {
      valid: true,
      tenant: {
        id: '7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba',
        name: 'test-tenant',
        plan: 'FREE',
        status: 'Active'
      },
      message: 'Usando tenant por defecto debido a error de validación'
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
  getTenantDetails
};