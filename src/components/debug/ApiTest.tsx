// src/components/debug/ApiTest.tsx
"use client";

import { useState } from 'react';
import { apiClient } from '@/lib/apiClient';
import * as misybotAuth from '@/services/misybot/authService';
import * as dashboardService from '@/services/misybot/dashboardServiceV2';

export default function ApiTest() {
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAllTests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Test 1: Basic API client test
      let apiClientTest = null;
      try {
        // This is just a test endpoint, it may not exist
        const response = await apiClient.get('/test');
        apiClientTest = response.data;
      } catch (err) {
        apiClientTest = 'API client working (endpoint may not exist)';
      }
      
      // Test 2: Misybot auth service test
      const currentUser = await misybotAuth.getCurrentUser();
      
      // Test 3: Dashboard service test
      const dashboardData = await dashboardService.getDashboardSummary();
      
      // Test 4: Check cookies
      const cookies = document.cookie;
      
      setTestResults({
        apiClientTest,
        currentUser,
        dashboardData,
        cookies,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('API test error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults(null);
    setError(null);
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">API Test</h2>
      
      <div className="mb-4 flex gap-2">
        <button
          onClick={runAllTests}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded"
        >
          {loading ? 'Testing...' : 'Run All Tests'}
        </button>
        <button
          onClick={clearResults}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
        >
          Clear Results
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {testResults && (
        <div className="space-y-4">
          <div className="p-3 bg-gray-800 rounded">
            <h3 className="font-bold mb-2">API Client Test:</h3>
            <pre className="text-xs overflow-auto bg-gray-900 p-2 rounded">
              {JSON.stringify(testResults.apiClientTest, null, 2)}
            </pre>
          </div>
          
          <div className="p-3 bg-gray-800 rounded">
            <h3 className="font-bold mb-2">Current User:</h3>
            <pre className="text-xs overflow-auto bg-gray-900 p-2 rounded">
              {JSON.stringify(testResults.currentUser, null, 2)}
            </pre>
          </div>
          
          <div className="p-3 bg-gray-800 rounded">
            <h3 className="font-bold mb-2">Dashboard Data:</h3>
            <pre className="text-xs overflow-auto bg-gray-900 p-2 rounded">
              {JSON.stringify(testResults.dashboardData, null, 2)}
            </pre>
          </div>
          
          <div className="p-3 bg-gray-800 rounded">
            <h3 className="font-bold mb-2">Cookies:</h3>
            <pre className="text-xs overflow-auto bg-gray-900 p-2 rounded">
              {testResults.cookies || 'No cookies found'}
            </pre>
          </div>
          
          <div className="p-3 bg-gray-800 rounded">
            <h3 className="font-bold mb-2">Timestamp:</h3>
            <p>{testResults.timestamp}</p>
          </div>
        </div>
      )}
    </div>
  );
}