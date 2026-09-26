// src/app/(i18n)/[lang]/(dashboard)/test-debug/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/components/hoc/withAuth';

function TestDebugPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    setDebugInfo({
      user: user,
      isLoading: isLoading,
      timestamp: new Date().toISOString(),
      location: typeof window !== 'undefined' ? window.location : null,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null
    });
  }, [user, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Debug Dashboard</h1>
        
        <div className="mb-4">
          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
          >
            Ir a Dashboard Principal
          </button>
          <button 
            onClick={() => router.push('/login')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Ir a Login
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-2">Información de Debug</h2>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default withAuth(TestDebugPage);