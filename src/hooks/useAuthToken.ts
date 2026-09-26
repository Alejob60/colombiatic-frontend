// src/hooks/useAuthToken.ts
import { useState, useEffect } from 'react';

export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recuperar token de localStorage al cargar
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('auth_token');
      setToken(savedToken);
      setIsLoading(false);
    }
  }, []);

  const saveToken = (newToken: string) => {
    setToken(newToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', newToken);
    }
  };

  const clearToken = () => {
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  };

  const isAuthenticated = !!token;

  return {
    token,
    isAuthenticated,
    isLoading,
    saveToken,
    clearToken
  };
};