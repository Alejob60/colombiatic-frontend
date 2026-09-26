// src/app/(i18n)/[lang]/(dashboard)/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/components/hoc/withAuth';

function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div className="min-h-full">
      <div className="bg-surface/50 rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {t('dashboard.welcome') || 'Bienvenido al Panel de Control'}
        </h1>
        <p className="text-gray-400">
          {t('dashboard.subtitle') || 'Gestiona tus servicios de inteligencia artificial desde aquí'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-surface/50 rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-colors">
          <h2 className="text-xl font-semibold mb-4">{t('dashboard.quick_stats') || 'Estadísticas Rápidas'}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t('dashboard.conversations') || 'Conversaciones'}</span>
              <span className="font-bold">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t('dashboard.users') || 'Usuarios'}</span>
              <span className="font-bold">1,248</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t('dashboard.uptime') || 'Disponibilidad'}</span>
              <span className="font-bold text-green-500">99.9%</span>
            </div>
          </div>
        </div>

        <div className="bg-surface/50 rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-colors">
          <h2 className="text-xl font-semibold mb-4">{t('dashboard.recent_activity') || 'Actividad Reciente'}</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3"></div>
              <div>
                <p className="text-sm">{t('dashboard.activity_1') || 'Nueva conversación iniciada'}</p>
                <p className="text-xs text-gray-500">Hace 5 minutos</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3"></div>
              <div>
                <p className="text-sm">{t('dashboard.activity_2') || 'Informe mensual generado'}</p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3"></div>
              <div>
                <p className="text-sm">{t('dashboard.activity_3') || 'Nuevo usuario registrado'}</p>
                <p className="text-xs text-gray-500">Hace 1 día</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface/50 rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-colors md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">{t('dashboard.quick_actions') || 'Acciones Rápidas'}</h2>
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"
              onClick={() => router.push('/dashboard/channels')}
            >
              {t('dashboard.manage_channels') || 'Canales'}
            </button>
            <button 
              className="bg-tertiary hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"
              onClick={() => router.push('/dashboard/analytics')}
            >
              {t('dashboard.view_analytics') || 'Analítica'}
            </button>
            <button 
              className="bg-secondary hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"
              onClick={() => router.push('/dashboard/settings')}
            >
              {t('dashboard.settings') || 'Configuración'}
            </button>
            <button 
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm transition-colors"
              onClick={() => router.push('/dashboard/help')}
            >
              {t('dashboard.help') || 'Ayuda'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);