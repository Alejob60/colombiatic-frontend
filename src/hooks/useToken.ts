// src/hooks/useToken.ts
// Custom hook for token management

import { useState, useEffect } from 'react';
import { 
  getTokens, 
  storeTokens, 
  clearTokens, 
  isAuthenticated,
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
  updateRefreshToken
} from '@/lib/tokenManager';

export function useToken() {
  const [tokens, setTokens] = useState(getTokens());
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    // Update state when tokens change
    const handleStorageChange = () => {
      setTokens(getTokens());
      setAuthenticated(isAuthenticated());
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Initial check
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const storeAuthTokens = (tokens: any) => {
    storeTokens(tokens);
    setTokens(tokens);
    setAuthenticated(isAuthenticated());
  };

  const clearAuthTokens = () => {
    clearTokens();
    setTokens(null);
    setAuthenticated(false);
  };

  const updateAuthAccessToken = (newToken: string) => {
    updateAccessToken(newToken);
    setTokens(getTokens());
  };

  const updateAuthRefreshToken = (newToken: string) => {
    updateRefreshToken(newToken);
    setTokens(getTokens());
  };

  return {
    tokens,
    authenticated,
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    storeTokens: storeAuthTokens,
    clearTokens: clearAuthTokens,
    updateAccessToken: updateAuthAccessToken,
    updateRefreshToken: updateAuthRefreshToken,
    isAuthenticated: isAuthenticated()
  };
}