// src/components/debug/AuthTest.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getTokens, storeTokens, clearTokens } from '@/lib/tokenManager';

export default function AuthTest() {
  const { user, login, logout, isLoading } = useAuth();
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('password123');
  const [testResult, setTestResult] = useState<any>(null);
  const [tokens, setTokens] = useState<any>(null);

  useEffect(() => {
    // Check current tokens
    const currentTokens = getTokens();
    setTokens(currentTokens);
  }, []);

  const handleTestLogin = async () => {
    try {
      console.log('Attempting login with:', testEmail, testPassword);
      
      // Check tokens before login
      const tokensBefore = getTokens();
      console.log('Tokens before login:', tokensBefore);
      
      const result = await login(testEmail);
      setTestResult(result);
      
      // Check tokens after login
      const tokensAfter = getTokens();
      console.log('Tokens after login:', tokensAfter);
      setTokens(tokensAfter);
    } catch (error) {
      console.error('Login error:', error);
          setTestResult({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const handleStoreTestTokens = () => {
    const testTokens = {
      accessToken: 'test_access_token_' + Date.now(),
      refreshToken: 'test_refresh_token_' + Date.now(),
      userId: 'test_user',
      expiresAt: Date.now() + 3600000 // 1 hour
    };
    
    storeTokens(testTokens);
    setTokens(getTokens());
  };

  const handleClearTokens = () => {
    clearTokens();
    setTokens(null);
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Authentication Test</h2>
      
      {isLoading && <p>Loading...</p>}
      
      <div className="mb-4">
        <p><strong>Current User:</strong> {user ? user.name : 'Not authenticated'}</p>
        <p><strong>User ID:</strong> {user ? user.id : 'N/A'}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="font-bold mb-2">Test Tokens</h3>
        <pre className="text-xs overflow-auto max-h-40 bg-gray-800 p-2 rounded">
          {tokens ? JSON.stringify(tokens, null, 2) : 'No tokens stored'}
        </pre>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mb-2"
          />
          <input
            type="password"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <button
            onClick={handleTestLogin}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Test Login
          </button>
          <button
            onClick={handleStoreTestTokens}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Store Test Tokens
          </button>
          <button
            onClick={handleClearTokens}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Clear Tokens
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      
      {testResult && (
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Test Result</h3>
          <pre className="text-xs overflow-auto max-h-40">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}