// src/hooks/useAuthState.ts
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { isAuthenticated as checkTokenAuth, getTokens } from '@/lib/tokenManager';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  organization_id?: string;
  plan?: 'FREE' | 'CREATOR' | 'PRO';
}

export interface AuthState {
  isLoggedIn: boolean;
  user: AuthUser | null;
  loading: boolean;
  origin: 'landing' | 'dashboard' | 'unknown';
}

export function useAuthState(): AuthState {
  const { user: contextUser, isLoading: contextLoading } = useAuth();
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    loading: true,
    origin: 'unknown'
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      // Check if user is authenticated via context or tokens
      const hasTokens = checkTokenAuth();
      const hasUser = !!contextUser;
      
      // Determine origin based on current path
      const path = typeof window !== 'undefined' ? window.location.pathname : '';
      const origin = path.includes('/dashboard') 
        ? 'dashboard' 
        : path === '/' || path.includes('/services') || path.includes('/pricing')
          ? 'landing'
          : 'unknown';

      const user: AuthUser | null = contextUser ? {
        id: contextUser.id,
        name: contextUser.name,
        email: contextUser.email,
        role: contextUser.role,
        organization_id: contextUser.organization_id,
        plan: (contextUser as any).plan || 'FREE'
      } : null;

      setAuthState({
        isLoggedIn: hasTokens || hasUser,
        user,
        loading: contextLoading,
        origin
      });
    };

    checkAuthStatus();

    // Listen for storage changes (cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_tokens' || e.key === 'user') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [contextUser, contextLoading]);

  return authState;
}
