// src/services/misybot/authService.ts
// Servicios de autenticación para Misybot API con soporte para tenant

import apiClient from '@/lib/apiInterceptor';
import { LoginCredentials, RegisterCredentials, AuthResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net';

/**
 * Login del usuario
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    console.log('[Misybot Auth] Iniciando login con:', credentials.email);
    
    const response = await apiClient.post<AuthResponse>(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    
    console.log('[Misybot Auth] Login exitoso para:', credentials.email);
    return response.data;
  } catch (error: any) {
    console.error('[Misybot Auth] Error en login:', error);
    
    // Propagar el error para que pueda ser manejado por el servicio de autenticación principal
    throw error;
  }
}

/**
 * Registro de usuario
 */
export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  try {
    console.log('[Misybot Auth] Registrando usuario:', credentials.email);
    
    const response = await apiClient.post<AuthResponse>(
      `${API_BASE_URL}/auth/register`,
      credentials
    );
    
    console.log('[Misybot Auth] Registro exitoso para:', credentials.email);
    return response.data;
  } catch (error: any) {
    console.error('[Misybot Auth] Error en registro:', error);
    
    // Propagar el error para que pueda ser manejado por el servicio de autenticación principal
    throw error;
  }
}

/**
 * Obtener usuario actual
 */
export async function getCurrentUser(): Promise<any> {
  try {
    console.log('[Misybot Auth] Obteniendo usuario actual');
    
    const response = await apiClient.get(`${API_BASE_URL}/auth/me`);
    
    console.log('[Misybot Auth] Usuario obtenido:', response.data.email);
    return response.data;
  } catch (error: any) {
    console.error('[Misybot Auth] Error obteniendo usuario:', error);
    
    // Propagar el error para que pueda ser manejado por el servicio de autenticación principal
    throw error;
  }
}

/**
 * Logout
 */
export async function logout(): Promise<void> {
  try {
    console.log('[Misybot Auth] Cerrando sesión');
    
    await apiClient.post(`${API_BASE_URL}/auth/logout`);
    
    console.log('[Misybot Auth] Sesión cerrada exitosamente');
  } catch (error: any) {
    console.error('[Misybot Auth] Error al cerrar sesión:', error);
    
    // Propagar el error para que pueda ser manejado por el servicio de autenticación principal
    throw error;
  }
}

/**
 * Refrescar token
 */
export async function refreshToken(): Promise<AuthResponse> {
  try {
    console.log('[Misybot Auth] Refrescando token');
    
    const response = await apiClient.post<AuthResponse>(
      `${API_BASE_URL}/auth/refresh`
    );
    
    console.log('[Misybot Auth] Token refrescado exitosamente');
    return response.data;
  } catch (error: any) {
    console.error('[Misybot Auth] Error refrescando token:', error);
    
    // Propagar el error para que pueda ser manejado por el servicio de autenticación principal
    throw error;
  }
}

export default {
  login,
  register,
  getCurrentUser,
  logout,
  refreshToken
};