// src/app/(auth)/token-test/page.tsx
"use client";

import { useState } from 'react';
import { useToken } from '@/hooks/useToken';
import TokenDebug from '@/components/debug/TokenDebug';
import AuthTest from '@/components/debug/AuthTest';
import SessionDebug from '@/components/debug/SessionDebug';

export default function TokenTestPage() {
  const { 
    tokens, 
    authenticated,
    accessToken, 
    refreshToken,
    storeTokens,
    clearTokens,
    updateAccessToken,
    updateRefreshToken,
    isAuthenticated
  } = useToken();
  
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('password123');

  const handleStoreTestTokens = () => {
    const testTokens = {
      accessToken: 'test_access_token_' + Date.now(),
      refreshToken: 'test_refresh_token_' + Date.now(),
      userId: 'user_' + Date.now(),
      expiresAt: Date.now() + 3600000 // 1 hour from now
    };
    
    storeTokens(testTokens);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Token Management Test</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Token Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Is Authenticated:</strong> <span className={authenticated ? 'text-green-400' : 'text-red-400'}>{authenticated.toString()}</span></p>
              <p><strong>Has Access Token:</strong> <span className={!!accessToken ? 'text-green-400' : 'text-red-400'}>{(!!accessToken).toString()}</span></p>
              <p><strong>Has Refresh Token:</strong> <span className={!!refreshToken ? 'text-green-400' : 'text-red-400'}>{(!!refreshToken).toString()}</span></p>
            </div>
            
            <div>
              <p><strong>Access Token:</strong></p>
              <p className="text-sm font-mono break-words bg-gray-900 p-2 rounded">
                {accessToken || 'No access token'}
              </p>
            </div>
            
            <div className="md:col-span-2">
              <p><strong>All Tokens:</strong></p>
              <pre className="text-xs overflow-auto max-h-40 bg-gray-900 p-2 rounded">
                {tokens ? JSON.stringify(tokens, null, 2) : 'No tokens stored'}
              </pre>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Test Actions</h2>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={handleStoreTestTokens}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Store Test Tokens
            </button>
            <button
              onClick={clearTokens}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              Clear Tokens
            </button>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Update Tokens</h3>
            <div className="flex flex-wrap gap-4">
              <div>
                <input
                  type="text"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="New access token"
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 mr-2"
                  autoComplete="off"
                />
                <button
                  onClick={() => updateAccessToken(testEmail)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                >
                  Update Access Token
                </button>
              </div>
              <div>
                <input
                  type="text"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="New refresh token"
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 mr-2"
                  autoComplete="off"
                />
                <button
                  onClick={() => updateRefreshToken(testPassword)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                >
                  Update Refresh Token
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Authentication Test</h2>
          <AuthTest />
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Session Debug</h2>
          <SessionDebug />
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Token Debug Component</h2>
          <TokenDebug />
        </div>
      </div>
    </div>
  );
}