// src/components/debug/TokenDebug.tsx
"use client";

import { useState, useEffect } from 'react';
import { 
  storeTokens, 
  getTokens, 
  clearTokens, 
  isAuthenticated,
  getAccessToken,
  getRefreshToken
} from '@/lib/tokenManager';

export default function TokenDebug() {
  const [tokenData, setTokenData] = useState<any>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setTokenData(getTokens());
    setIsAuth(isAuthenticated());
    setAccessToken(getAccessToken());
    setRefreshToken(getRefreshToken());
  };

  const storeTestTokens = () => {
    const testTokens = {
      accessToken: 'test_access_token_12345',
      refreshToken: 'test_refresh_token_67890',
      userId: 'user_123',
      expiresAt: Date.now() + 3600000 // 1 hour from now
    };
    
    storeTokens(testTokens);
    refreshData();
  };

  const clearTestTokens = () => {
    clearTokens();
    refreshData();
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Token Debug</h2>
      
      <div className="mb-4 flex gap-2">
        <button
          onClick={storeTestTokens}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Store Test Tokens
        </button>
        <button
          onClick={clearTestTokens}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Clear Tokens
        </button>
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
        >
          Refresh Data
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Authentication Status</h3>
          <p>Is Authenticated: <span className={isAuth ? 'text-green-400' : 'text-red-400'}>{isAuth.toString()}</span></p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Access Token</h3>
          <p className="text-sm font-mono break-words">
            {accessToken || 'No access token'}
          </p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Refresh Token</h3>
          <p className="text-sm font-mono break-words">
            {refreshToken || 'No refresh token'}
          </p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">All Tokens</h3>
          <pre className="text-xs overflow-auto max-h-40">
            {tokenData ? JSON.stringify(tokenData, null, 2) : 'No tokens stored'}
          </pre>
        </div>
      </div>
    </div>
  );
}