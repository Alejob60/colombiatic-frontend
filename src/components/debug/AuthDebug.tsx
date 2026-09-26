// src/components/debug/AuthDebug.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import * as misybotAuth from '@/services/misybot/authService';
import * as dashboardService from '@/services/misybot/dashboardServiceV2';

export default function AuthDebug() {
  const { user, isLoading } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookies] = useState<string>('');

  useEffect(() => {
    // Get current cookies
    setCookies(document.cookie);
    
    // Test authentication
    const testAuth = async () => {
      try {
        console.log('Testing authentication...');
        
        // Test getting current user
        const currentUser = await misybotAuth.getCurrentUser();
        console.log('Current user:', currentUser);
        
        // Test getting dashboard data
        const dashboardData = await dashboardService.getDashboardSummary();
        console.log('Dashboard data:', dashboardData);
        
        setDebugInfo({
          currentUser,
          dashboardData,
          cookies: document.cookie
        });
      } catch (err) {
        console.error('Auth debug error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };
    
    if (user && !isLoading) {
      testAuth();
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <div className="p-4 bg-yellow-900/50 text-yellow-300">Loading authentication status...</div>;
  }

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Authentication Debug</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="font-bold mb-2">User Status:</h3>
        {user ? (
          <div className="p-3 bg-green-900/50 text-green-300 rounded">
            <p><strong>Authenticated:</strong> Yes</p>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ) : (
          <div className="p-3 bg-red-900/50 text-red-300 rounded">
            <p><strong>Authenticated:</strong> No</p>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="font-bold mb-2">Cookies:</h3>
        <div className="p-3 bg-blue-900/50 text-blue-300 rounded font-mono text-sm">
          {cookies || 'No cookies found'}
        </div>
      </div>
      
      {debugInfo && (
        <div>
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <div className="p-3 bg-gray-800 text-gray-300 rounded">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}