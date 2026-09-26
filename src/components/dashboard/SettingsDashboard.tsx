// src/components/dashboard/SettingsDashboard.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Globe, Bell, CreditCard, Building2, Shield } from 'lucide-react';
import ProfileSettings from './ProfileSettings';
import TenantSettings from './TenantSettings';
import NotificationSettings from './NotificationSettings';

type SettingsTab = 'profile' | 'tenant' | 'notifications' | 'billing' | 'security';

export default function SettingsDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile' as SettingsTab, name: 'Perfil Personal', icon: User },
    { id: 'tenant' as SettingsTab, name: 'Organización', icon: Building2 },
    { id: 'notifications' as SettingsTab, name: 'Notificaciones', icon: Bell },
    { id: 'billing' as SettingsTab, name: 'Plan y Facturación', icon: CreditCard },
    { id: 'security' as SettingsTab, name: 'Seguridad', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-gray-400 mt-1">Administra tu perfil, organización y preferencias</p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-lg p-1">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-800 rounded-lg p-6">
        {activeTab === 'profile' && <ProfileSettings user={user} />}
        {activeTab === 'tenant' && <TenantSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'billing' && <BillingSettings />}
        {activeTab === 'security' && <SecuritySettings />}
      </div>
    </div>
  );
}

// Billing Settings Component
function BillingSettings() {
  const [subscription, setSubscription] = useState({
    plan: 'PRO',
    status: 'active',
    renewalDate: '2025-02-15',
    autoRenew: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Plan y Facturación</h2>
        <p className="text-gray-400">Gestiona tu suscripción y métodos de pago</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-white">Plan Actual</h3>
            <p className="text-2xl font-bold text-primary mt-1">{subscription.plan}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            subscription.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
          }`}>
            {subscription.status === 'active' ? 'Activo' : 'Inactivo'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Fecha de renovación</p>
            <p className="text-white font-medium">{new Date(subscription.renewalDate).toLocaleDateString('es-ES')}</p>
          </div>
          <div>
            <p className="text-gray-400">Renovación automática</p>
            <p className="text-white font-medium">{subscription.autoRenew ? 'Activada' : 'Desactivada'}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded transition-colors">
            Cambiar Plan
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors">
            Ver Historial
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Métodos de Pago</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-gray-400 mr-3" />
              <div>
                <p className="text-white font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-400">Vence 12/2026</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Principal</span>
          </div>
        </div>
        <button className="mt-4 text-primary hover:text-blue-400 text-sm font-medium">
          + Agregar método de pago
        </button>
      </div>
    </div>
  );
}

// Security Settings Component (placeholder)
function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Seguridad</h2>
        <p className="text-gray-400">Protege tu cuenta con configuraciones adicionales</p>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Cambiar Contraseña</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña actual
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Confirmar nueva contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded transition-colors"
          >
            Actualizar Contraseña
          </button>
        </form>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">Autenticación de Dos Factores</h3>
            <p className="text-sm text-gray-400 mt-1">Agrega una capa extra de seguridad</p>
          </div>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors">
            Configurar
          </button>
        </div>
      </div>
    </div>
  );
}
