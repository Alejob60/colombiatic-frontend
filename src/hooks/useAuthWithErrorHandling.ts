// src/hooks/useAuthWithErrorHandling.ts
// Hook personalizado para manejar la autenticación con mejor manejo de errores

import { useState } from 'react';
import { login as authLogin, register as authRegister } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthWithErrorHandling = () => {
  const { login: contextLogin, logout: contextLogout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authLogin(email, password);
      
      if (result.success && result.user) {
        contextLogin(result.user.id);
        return { success: true };
      } else {
        setError(result.message || 'Error desconocido durante el inicio de sesión');
        return { success: false, message: result.message };
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Error al iniciar sesión. Por favor, inténtalo más tarde.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authRegister(name, email, password);
      
      if (result.success && result.user) {
        contextLogin(result.user.id);
        return { success: true };
      } else {
        setError(result.message || 'Error desconocido durante el registro');
        return { success: false, message: result.message };
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Error al registrarse. Por favor, inténtalo más tarde.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    contextLogout();
    setError(null);
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
    clearError: () => setError(null)
  };
};