// src/services/authService.ts
// Servicio de autenticación mejorado con persistencia de sesión tras recargar la página.

import {
  storeTokens,
  getTokens,
  clearTokens,
  isAuthenticated,
  getAccessToken
} from '@/lib/tokenManager';
import * as misybotAuth from '@/services/misybot/authService';
import { clearAuthCookies } from '@/lib/securityUtils';
import { useTenant } from '@/contexts/TenantContext';

// Tipado del usuario
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  organization_id?: string;
  created_at: string;
  updated_at: string;
  organization?: any;
  permissions?: string[];
  branding_config?: any;
}

/**
 * Login del usuario
 */
export async function login(email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> {
  try {
    console.log('[Auth] Iniciando login para:', email);

    const response = await misybotAuth.login({ email, password });
    console.log('[Auth] Respuesta recibida:', response);

    // More detailed validation with logging
    if (!response) {
      console.error('[Auth] Respuesta es null o undefined');
      throw new Error('Respuesta inválida del servidor: No response received');
    }
    
    // Handle both 'token' and 'access_token' field names
    const token = response.token || (response as any).access_token;
    if (!token) {
      console.error('[Auth] Token no encontrado en la respuesta:', response);
      throw new Error(`Respuesta inválida del servidor: Token missing. Response structure: ${JSON.stringify(Object.keys(response))}`);
    }
    
    if (!response.user) {
      console.error('[Auth] Usuario no encontrado en la respuesta:', response);
      throw new Error(`Respuesta inválida del servidor: User data missing. Response structure: ${JSON.stringify(Object.keys(response))}`);
    }

    // Guardar tokens
    storeTokens({
      accessToken: token,
      userId: response.user.id,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24h
    });

    const user: User = {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      role: response.user.role,
      organization_id: response.user.organization_id,
      created_at: response.user.created_at,
      updated_at: response.user.updated_at,
      organization: response.organization,
      permissions: [], // Will be populated later
      branding_config: {} // Will be populated later
    };

    return { success: true, user };
  } catch (error: any) {
    console.error('[Auth] Error en login:', error);

    // Manejo específico de errores de red y CORS
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS') || error.message.includes('Network Error')) {
      return { 
        success: false, 
        message: 'No se pudo conectar con el servidor de autenticación. Por favor verifica tu conexión a internet.' 
      };
    }

    const status = error.response?.status;
    const message =
      status === 401
        ? 'Credenciales inválidas. Verifica tu correo y contraseña.'
        : status === 404
        ? 'Servicio de autenticación no disponible.'
        : status === 500
        ? 'Error interno del servidor. Por favor intenta más tarde.'
        : 'Error al iniciar sesión. Inténtalo nuevamente.';

    return { success: false, message };
  }
}

/**
 * Registro de usuario
 */
export async function register(name: string, email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> {
  try {
    console.log('[Auth] Registrando usuario:', email);

    const response = await misybotAuth.register({ name, email, password });
    
    // More detailed validation with logging
    if (!response) {
      console.error('[Auth] Respuesta es null o undefined');
      throw new Error('Respuesta inválida del servidor: No response received');
    }
    
    // Handle both 'token' and 'access_token' field names
    const token = response.token || (response as any).access_token;
    if (!token) {
      console.error('[Auth] Token no encontrado en la respuesta:', response);
      throw new Error(`Respuesta inválida del servidor: Token missing. Response structure: ${JSON.stringify(Object.keys(response))}`);
    }
    
    if (!response.user) {
      console.error('[Auth] Usuario no encontrado en la respuesta:', response);
      throw new Error(`Respuesta inválida del servidor: User data missing. Response structure: ${JSON.stringify(Object.keys(response))}`);
    }

    storeTokens({
      accessToken: token,
      userId: response.user.id,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    });

    const user: User = {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      role: response.user.role,
      organization_id: response.user.organization_id,
      created_at: response.user.created_at,
      updated_at: response.user.updated_at,
      organization: response.organization,
      permissions: [], // Will be populated later
      branding_config: {} // Will be populated later
    };

    return { success: true, user };
  } catch (error: any) {
    console.error('[Auth] Error en registro:', error);

    // Manejo específico de errores de red y CORS
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS') || error.message.includes('Network Error')) {
      return { 
        success: false, 
        message: 'No se pudo conectar con el servidor de registro. Por favor verifica tu conexión a internet.' 
      };
    }

    const status = error.response?.status;
    const message =
      status === 409
        ? 'El correo ya está registrado.'
        : status === 404
        ? 'Servicio de registro no disponible.'
        : status === 500
        ? 'Error interno del servidor. Por favor intenta más tarde.'
        : 'Error al registrarse. Inténtalo nuevamente.';

    return { success: false, message };
  }
}

/**
 * Obtener usuario actual
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = getAccessToken();
    if (!token) {
      console.log('[Auth] No hay token disponible en almacenamiento');
      return null;
    }

    const userData = await misybotAuth.getCurrentUser();
    console.log('[Auth] Datos de usuario recibidos:', userData);
    
    if (!userData) {
      console.log('[Auth] No se recibieron datos de usuario');
      return null;
    }

    const user: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      organization_id: userData.organization_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      organization: userData.organization,
      permissions: userData.permissions,
      branding_config: userData.branding_config
    };

    return user;
  } catch (error: any) {
    console.error('[Auth] Error al obtener usuario actual:', error);
    
    // Manejo específico de errores de red y CORS
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS') || error.message.includes('Network Error')) {
      console.warn('[Auth] Error de red al obtener usuario, pero manteniendo sesión local');
      // Podríamos retornar un usuario parcial o mantener el existente
    }
    
    if (error.response?.status === 401) clearTokens();
    return null;
  }
}

/**
 * Restore user session from stored tokens
 */
export async function restoreSession(): Promise<{ isAuthenticated: boolean; user: User | null }> {
  try {
    console.log('[Auth] Restoring session...');
    
    // Check if we have valid tokens
    if (!isAuthenticated()) {
      console.log('[Auth] No valid authentication tokens found');
      return { isAuthenticated: false, user: null };
    }

    // Get current user data
    const userData = await getCurrentUser();
    
    if (!userData) {
      console.log('[Auth] No user data found, clearing tokens');
      clearTokens();
      return { isAuthenticated: false, user: null };
    }

    const user: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      organization_id: userData.organization_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      organization: userData.organization,
      permissions: userData.permissions,
      branding_config: userData.branding_config
    };

    console.log('[Auth] Session restored successfully for user:', user.email);
    return { isAuthenticated: true, user };
  } catch (error: any) {
    console.error('[Auth] Error restoring session:', error);
    clearTokens(); // Clear invalid tokens
    return { isAuthenticated: false, user: null };
  }
}

/**
 * Logout
 */
export async function logout(): Promise<void> {
  try {
    console.log('[Auth] Cerrando sesión');
    
    // Call backend logout endpoint
    await misybotAuth.logout().catch(error => {
      // Ignore logout errors as the session might already be invalid
      console.warn('[Auth] Backend logout failed (ignoring):', error);
    });
    
    // Clear local tokens
    clearTokens();
    
    // Clear auth cookies
    clearAuthCookies();
    
    console.log('[Auth] Sesión cerrada exitosamente');
  } catch (error) {
    console.error('[Auth] Error al cerrar sesión:', error);
    // Still clear local data even if backend call fails
    clearTokens();
    clearAuthCookies();
  }
}

/**
 * Refrescar token de autenticación
 */
export async function refreshToken(): Promise<{ success: boolean; message?: string }> {
  try {
    console.log('[Auth] Refrescando token...');
    const response = await misybotAuth.refreshToken();
    console.log('[Auth] Respuesta de refresh token:', response);

    if (!response) {
      console.error('[Auth] Respuesta de refresh es null o undefined');
      throw new Error('No se recibió respuesta del servidor al refrescar token');
    }
    
    // Handle both 'token' and 'access_token' field names
    const token = response.token || (response as any).access_token;
    if (!token) {
      console.error('[Auth] Token no encontrado en la respuesta de refresh:', response);
      throw new Error(`Token missing in refresh response. Response structure: ${JSON.stringify(Object.keys(response))}`);
    }

    storeTokens({
      accessToken: token,
      userId: response.user?.id,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    });

    return { success: true };
  } catch (error: any) {
    console.error('[Auth] Falló la renovación del token:', error);
    
    // Manejo específico para cuando el endpoint de refresh no existe
    if (error.response?.status === 404) {
      console.warn('[Auth] Endpoint de refresh no encontrado, limpiando sesión');
      clearTokens();
      return { success: false, message: 'Sesión expirada. Inicia sesión nuevamente.' };
    }
    
    clearTokens();
    return { success: false, message: 'Sesión expirada. Inicia sesión nuevamente.' };
  }
}

/**
 * Verificar si hay sesión activa
 */
export async function checkAuthStatus(): Promise<{ isAuthenticated: boolean; user?: User }> {
  try {
    const tokens = getTokens();
    if (tokens?.accessToken) {
      const user = await getCurrentUser();
      if (user) return { isAuthenticated: true, user };
    }

    // Si no hay token, probar con cookies (si existen)
    const misybotUser = await misybotAuth.getCurrentUser().catch(() => null);
    if (misybotUser) {
      const user: User = {
        id: misybotUser.id,
        name: misybotUser.name,
        email: misybotUser.email,
        role: misybotUser.role,
        organization_id: misybotUser.organization_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        organization: misybotUser.organization,
        permissions: misybotUser.permissions,
        branding_config: misybotUser.branding_config
      };
      return { isAuthenticated: true, user };
    }

    return { isAuthenticated: false };
  } catch (error) {
    console.error('[Auth] Error verificando autenticación:', error);
    return { isAuthenticated: false };
  }
}

export default {
  login,
  register,
  getCurrentUser,
  logout,
  refreshToken,
  checkAuthStatus,
  restoreSession
};