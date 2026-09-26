// src/app/(i18n)/[lang]/(dashboard)/test-dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/components/hoc/withAuth';

function TestDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard de Prueba</h1>
        <p className="text-gray-400">Esta es una página de prueba para verificar que el dashboard funciona correctamente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Información del Usuario</h2>
          <div className="space-y-2">
            <p className="text-gray-300"><span className="font-medium">Nombre:</span> {user?.name}</p>
            <p className="text-gray-300"><span className="font-medium">Email:</span> {user?.email}</p>
            <p className="text-gray-300"><span className="font-medium">Rol:</span> {user?.role}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Información del Sistema</h2>
          <div className="space-y-2">
            <p className="text-gray-300"><span className="font-medium">Hora actual:</span> {currentTime.toLocaleTimeString()}</p>
            <p className="text-gray-300"><span className="font-medium">Fecha:</span> {currentTime.toLocaleDateString()}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Navegación</h2>
          <div className="space-y-2">
            <button 
              onClick={() => router.push('/dashboard')}
              className="w-full bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Dashboard Principal
            </button>
            <button 
              onClick={() => router.push('/dashboard/settings')}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Configuración
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Acciones de Prueba</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => router.push('/dashboard/test-debug')}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Debug Info
          </button>
          <button 
            onClick={() => router.push('/services')}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Ver Servicios
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(TestDashboardPage);