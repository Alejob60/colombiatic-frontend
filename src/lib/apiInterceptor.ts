// src/lib/apiInterceptor.ts
// Interceptor para agregar información de tenant a las solicitudes API

import axios, { AxiosRequestConfig } from 'axios';

// Tenant de referencia para ColombiaTIC AI
const REFERENCE_TENANT_ID = '7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba';

// Crear una instancia de axios con interceptor
const apiClient = axios.create();

// Interceptor de solicitudes
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Agregar encabezado de tenant a todas las solicitudes
    if (config.headers) {
      config.headers['x-tenant-id'] = REFERENCE_TENANT_ID;
    } else {
      config.headers = {
        'x-tenant-id': REFERENCE_TENANT_ID
      };
    }

    // Agregar otros encabezados comunes si es necesario
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    console.log(`[API Interceptor] Request to ${config.url} with tenant ID: ${REFERENCE_TENANT_ID}`);
    return config;
  },
  (error) => {
    console.error('[API Interceptor] Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
apiClient.interceptors.response.use(
  (response) => {
    // Puedes procesar respuestas aquí si es necesario
    return response;
  },
  (error) => {
    console.error('[API Interceptor] Response error:', error);
    
    // Manejo específico de errores relacionados con tenant
    if (error.response?.status === 400 && error.response?.data?.message?.includes('tenant')) {
      console.warn('[API Interceptor] Posible error de tenant en la solicitud');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;