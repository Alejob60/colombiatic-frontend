// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from '@/lib/i18n';

export default function DashboardPage() {
  const { t } = useTranslations();
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    activeServices: 3,
    totalSpent: 159000,
    pendingTasks: 2,
    unreadMessages: 5
  });
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'Servicio activado', description: 'IA Omnicanal + CRM Automatizado', time: 'Hace 2 horas' },
    { id: 2, action: 'Pago recibido', description: 'Web Comercial + IA Humanizada', time: 'Hace 1 día' },
    { id: 3, action: 'Nuevo mensaje', description: 'Soporte técnico respondió a tu consulta', time: 'Hace 2 días' }
  ]);

  // Simular carga de datos
  useEffect(() => {
    // En una implementación real, aquí se cargarían los datos del dashboard desde la API
    // const fetchDashboardData = async () => {
    //   const response = await fetch('/api/dashboard');
    //   const data = await response.json();
    //   setStats(data.stats);
    //   setRecentActivity(data.recentActivity);
    // };
    // fetchDashboardData();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Acceso denegado</h1>
          <p className="text-gray-400 mb-6">Debes iniciar sesión para acceder al panel de control</p>
          <Link href="/login" className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            Ir a iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard Principal</h1>
        
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Servicios Activos</h3>
            <p className="text-3xl font-bold text-white">{stats.activeServices}</p>
          </div>
          
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Total Gastado</h3>
            <p className="text-3xl font-bold text-white">COP ${stats.totalSpent.toLocaleString()}</p>
          </div>
          
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Tareas Pendientes</h3>
            <p className="text-3xl font-bold text-white">{stats.pendingTasks}</p>
          </div>
          
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Mensajes Sin Leer</h3>
            <p className="text-3xl font-bold text-white">{stats.unreadMessages}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Servicios activos */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Servicios Activos</h2>
                <Link href="/services" className="text-primary hover:text-blue-400">
                  Ver todos
                </Link>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">IA Omnicanal + CRM Automatizado</h3>
                    <p className="text-sm text-gray-400">COP $159.000 / mes</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold bg-green-900 text-green-200 rounded-full">
                    Activo
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">Sitio Web Comercial + IA Humanizada</h3>
                    <p className="text-sm text-gray-400">COP $899.000 (pago único)</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold bg-green-900 text-green-200 rounded-full">
                    Activo
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">Módulo de Redes y Contenidos</h3>
                    <p className="text-sm text-gray-400">COP $120.000 / mes</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold bg-green-900 text-green-200 rounded-full">
                    Activo
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actividad reciente */}
          <div>
            <div className="bg-surface rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Actividad Reciente</h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="border-l-4 border-primary pl-4 py-1">
                    <h3 className="font-medium text-white">{activity.action}</h3>
                    <p className="text-sm text-gray-400">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
              
              <Link href="/activity" className="block mt-6 text-primary hover:text-blue-400 text-center">
                Ver toda la actividad
              </Link>
            </div>
          </div>
        </div>
        
        {/* Acceso rápido a módulos principales */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-6">Acceso Rápido</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/dashboard/ia-omnichannel" className="bg-surface rounded-lg shadow-md p-6 hover:bg-gray-700 transition-colors">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-lg font-medium text-white mb-2">IA Omnichannel</h3>
              <p className="text-gray-400 text-sm">Gestiona tus canales de comunicación</p>
            </Link>
            
            <Link href="/dashboard/web-builder" className="bg-surface rounded-lg shadow-md p-6 hover:bg-gray-700 transition-colors">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="text-lg font-medium text-white mb-2">Web Builder</h3>
              <p className="text-gray-400 text-sm">Crea y edita tu sitio web</p>
            </Link>
            
            <Link href="/dashboard/social-media" className="bg-surface rounded-lg shadow-md p-6 hover:bg-gray-700 transition-colors">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-lg font-medium text-white mb-2">Social Media</h3>
              <p className="text-gray-400 text-sm">Administra tus redes sociales</p>
            </Link>
            
            <Link href="/dashboard/pipeline" className="bg-surface rounded-lg shadow-md p-6 hover:bg-gray-700 transition-colors">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-medium text-white mb-2">Pipeline</h3>
              <p className="text-gray-400 text-sm">Sigue tus oportunidades de venta</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}