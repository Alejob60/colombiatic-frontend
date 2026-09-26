// src/components/debug/SessionDebug.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getTokens, isAuthenticated } from '@/lib/tokenManager';

export default function SessionDebug() {
  const { user, isLoading } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [tokens, setTokens] = useState<any>(null);
  const [authStatus, setAuthStatus] = useState<boolean>(false);

  useEffect(() => {
    refreshDebugInfo();
  }, []);

  const refreshDebugInfo = () => {
    try {
      const tokens = getTokens();
      const authStatus = isAuthenticated();
      
      setTokens(tokens);
      setAuthStatus(authStatus);
      
      setDebugInfo({
        timestamp: new Date().toISOString(),
        tokens,
        isAuthenticated: authStatus,
        user: user,
        isLoading: isLoading
      });
    } catch (error) {
      console.error('Error refreshing debug info:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Session Debug</h2>
      
      <div className="mb-4">
        <button
          onClick={refreshDebugInfo}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Refresh Debug Info
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Auth Context</h3>
          <p><strong>Loading:</strong> <span className={isLoading ? 'text-yellow-400' : 'text-green-400'}>{isLoading.toString()}</span></p>
          <p><strong>Authenticated:</strong> <span className={user ? 'text-green-400' : 'text-red-400'}>{(!!user).toString()}</span></p>
          <p><strong>User Name:</strong> {user ? user.name : 'Not authenticated'}</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Token Manager</h3>
          <p><strong>Is Authenticated:</strong> <span className={authStatus ? 'text-green-400' : 'text-red-400'}>{authStatus.toString()}</span></p>
          <p><strong>Tokens Exist:</strong> <span className={tokens ? 'text-green-400' : 'text-red-400'}>{(!!tokens).toString()}</span></p>
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded">
        <h3 className="font-bold mb-2">Debug Information</h3>
        <pre className="text-xs overflow-auto max-h-60 bg-gray-900 p-2 rounded">
          {debugInfo ? JSON.stringify(debugInfo, null, 2) : 'No debug info available'}
        </pre>
      </div>
      
      <div className="mt-4 bg-gray-800 p-4 rounded">
        <h3 className="font-bold mb-2">Tokens</h3>
        <pre className="text-xs overflow-auto max-h-40 bg-gray-900 p-2 rounded">
          {tokens ? JSON.stringify(tokens, null, 2) : 'No tokens stored'}
        </pre>
      </div>
    </div>
  );
}