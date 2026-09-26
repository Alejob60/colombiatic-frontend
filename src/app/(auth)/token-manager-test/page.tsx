// src/app/(auth)/token-manager-test/page.tsx
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

export default function TokenManagerTestPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [tokens, setTokens] = useState<any>(null);

  useEffect(() => {
    // Check current tokens
    refreshTokens();
  }, []);

  const refreshTokens = () => {
    const currentTokens = getTokens();
    setTokens(currentTokens);
  };

  const testStoreTokens = () => {
    try {
      const testTokens = {
        accessToken: 'test_access_token_' + Date.now(),
        refreshToken: 'test_refresh_token_' + Date.now(),
        userId: 'test_user',
        expiresAt: Date.now() + 3600000 // 1 hour
      };
      
      storeTokens(testTokens);
      setTestResult({
        success: true,
        message: 'Tokens stored successfully',
        tokens: testTokens
      });
      
      refreshTokens();
    } catch (error: any) {
      setTestResult({
        success: false,
        error: error.message
      });
    }
  };

  const testGetTokens = () => {
    try {
      const retrievedTokens = getTokens();
      const authStatus = isAuthenticated();
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      
      setTestResult({
        success: true,
        message: 'Tokens retrieved successfully',
        retrievedTokens,
        authStatus,
        accessToken,
        refreshToken
      });
    } catch (error: any) {
      setTestResult({
        success: false,
        error: error.message
      });
    }
  };

  const testClearTokens = () => {
    try {
      clearTokens();
      setTestResult({
        success: true,
        message: 'Tokens cleared successfully'
      });
      
      refreshTokens();
    } catch (error: any) {
      setTestResult({
        success: false,
        error: error.message
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Token Manager Test</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Current Tokens</h2>
          <pre className="text-sm overflow-auto max-h-40 bg-gray-900 p-2 rounded">
            {tokens ? JSON.stringify(tokens, null, 2) : 'No tokens stored'}
          </pre>
          <button
            onClick={refreshTokens}
            className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Refresh Tokens
          </button>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Token Manager Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={testStoreTokens}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Store Test Tokens
            </button>
            <button
              onClick={testGetTokens}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Get Tokens
            </button>
            <button
              onClick={testClearTokens}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              Clear Tokens
            </button>
          </div>
        </div>
        
        {testResult && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Test Result</h2>
            <pre className="text-sm overflow-auto max-h-96 bg-gray-900 p-2 rounded">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}