// src/components/dashboard/SecurityDashboard.tsx
"use client";

import { useState } from 'react';
import { Key, Shield, Activity, AlertTriangle } from 'lucide-react';
import ApiKeyManager from './ApiKeyManager';
import SecurityLogs from './SecurityLogs';

type SecurityTab = 'api-keys' | 'logs' | '2fa' | 'sessions';

export default function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState<SecurityTab>('api-keys');

  const tabs = [
    { id: 'api-keys' as SecurityTab, name: 'API Keys', icon: Key },
    { id: 'logs' as SecurityTab, name: 'Logs de Seguridad', icon: Activity },
    { id: '2fa' as SecurityTab, name: '2FA', icon: Shield },
    { id: 'sessions' as SecurityTab, name: 'Sesiones Activas', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Seguridad</h1>
        <p className="text-gray-400 mt-1">Gestiona claves API, autenticación y monitoreo</p>
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
        {activeTab === 'api-keys' && <ApiKeyManager />}
        {activeTab === 'logs' && <SecurityLogs />}
        {activeTab === '2fa' && <TwoFactorAuth />}
        {activeTab === 'sessions' && <ActiveSessions />}
      </div>
    </div>
  );
}

function TwoFactorAuth() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Autenticación de Dos Factores (2FA)</h2>
        <p className="text-gray-400">Agrega una capa adicional de seguridad a tu cuenta</p>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-white mb-2">Estado Actual</h3>
            <p className="text-sm text-gray-400 mb-4">
              {enabled ? 'La autenticación de dos factores está activada' : 'La autenticación de dos factores está desactivada'}
            </p>
            <button className={`px-4 py-2 rounded transition-colors ${
              enabled
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-primary hover:bg-blue-700 text-white'
            }`}>
              {enabled ? 'Desactivar 2FA' : 'Activar 2FA'}
            </button>
          </div>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            enabled ? 'bg-green-900' : 'bg-gray-700'
          }`}>
            <Shield className={`h-8 w-8 ${enabled ? 'text-green-300' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveSessions() {
  const sessions = [
    { id: '1', device: 'Chrome - Windows', ip: '192.168.1.1', location: 'Bogotá, Colombia', lastActive: '2025-01-04 10:30', current: true },
    { id: '2', device: 'Safari - iPhone', ip: '192.168.1.100', location: 'Bogotá, Colombia', lastActive: '2025-01-03 15:20', current: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Sesiones Activas</h2>
        <p className="text-gray-400">Dispositivos que han accedido a tu cuenta</p>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div key={session.id} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-medium">{session.device}</h3>
                {session.current && (
                  <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Sesión actual</span>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-1">{session.ip} - {session.location}</p>
              <p className="text-xs text-gray-500 mt-1">Último acceso: {session.lastActive}</p>
            </div>
            {!session.current && (
              <button className="px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors">
                Cerrar sesión
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="text-red-400 hover:text-red-300 text-sm font-medium">
        Cerrar todas las demás sesiones
      </button>
    </div>
  );
}
