// src/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { checkAuthStatus } from '@/services/authService';
import { getAccessToken } from '@/lib/tokenManager';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  organization_id?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  login: (userId: string) => void;
  logout: () => void;
  loading: boolean;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        setError(null);
        const authStatus = await checkAuthStatus();
        setIsAuthenticated(authStatus.isAuthenticated);
        setUser(authStatus.user || null);
        setToken(getAccessToken());
      } catch (error: any) {
        console.error('Error checking auth status:', error);
        setError('Error al verificar el estado de autenticación. Por favor, inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    // No bloquear la renderización por la autenticación
    setTimeout(() => {
      checkAuth();
    }, 0);
  }, []);

  const login = (userId: string) => {
    // En una implementación real, obtendríamos los datos del usuario del backend
    // Por ahora, simulamos con datos básicos
    const mockUser: AuthUser = {
      id: userId,
      name: 'Usuario',
      email: 'usuario@example.com',
      role: 'user'
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    setError(null);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, loading, isLoading: loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  // En lugar de lanzar un error, devolvemos valores por defecto
  // Esto previene errores cuando el contexto no está disponible
  if (context === undefined) {
    console.warn('[AuthContext] useAuth debe ser usado dentro de un AuthProvider. Devolviendo valores por defecto.');
    return {
      isAuthenticated: false,
      user: null,
      token: null,
      login: () => {
        console.warn('[AuthContext] login llamado fuera de AuthProvider');
      },
      logout: () => {
        console.warn('[AuthContext] logout llamado fuera de AuthProvider');
      },
      loading: false,
      isLoading: false,
      error: null
    };
  }
  return context;
}