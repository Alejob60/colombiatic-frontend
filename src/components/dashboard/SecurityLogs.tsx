// src/components/dashboard/SecurityLogs.tsx
"use client";

import { useState } from 'react';
import { Calendar, MapPin, Monitor } from 'lucide-react';

export default function SecurityLogs() {
  const [logs] = useState([
    { id: '1', event_type: 'login', ip_address: '192.168.1.1', user_agent: 'Chrome 120', details: 'Login exitoso', created_at: '2025-01-04T10:30:00Z' },
    { id: '2', event_type: 'password_change', ip_address: '192.168.1.1', user_agent: 'Chrome 120', details: 'Contraseña actualizada', created_at: '2025-01-03T15:20:00Z' },
    { id: '3', event_type: 'failed_login', ip_address: '203.0.113.42', user_agent: 'Unknown', details: 'Intento fallido', created_at: '2025-01-03T08:15:00Z' },
  ]);

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'login':
        return 'bg-green-900 text-green-300';
      case 'failed_login':
        return 'bg-red-900 text-red-300';
      case 'password_change':
        return 'bg-blue-900 text-blue-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  const getEventLabel = (eventType: string) => {
    const labels: Record<string, string> = {
      login: 'Inicio de sesión',
      logout: 'Cierre de sesión',
      failed_login: 'Intento fallido',
      password_change: 'Cambio de contraseña',
      api_key_used: 'Uso de API key',
      suspicious_activity: 'Actividad sospechosa',
    };
    return labels[eventType] || eventType;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Logs de Seguridad</h2>
        <p className="text-gray-400">Historial de eventos de seguridad de tu cuenta</p>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getEventIcon(log.event_type)}`}>
                    {getEventLabel(log.event_type)}
                  </span>
                </div>
                <p className="text-white text-sm mb-2">{log.details}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {log.ip_address}
                  </div>
                  <div className="flex items-center">
                    <Monitor className="h-3 w-3 mr-1" />
                    {log.user_agent}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(log.created_at).toLocaleString('es-ES')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
