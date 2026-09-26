// src/components/dashboard/NotificationSettings.tsx
"use client";

import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { Save, Mail, MessageSquare, Bell } from 'lucide-react';

export default function NotificationSettings() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    email: {
      enabled: true,
      newUsers: true,
      orders: true,
      marketing: false,
      security: true,
    },
    sms: {
      enabled: false,
      orders: false,
      security: true,
    },
    push: {
      enabled: true,
      messages: true,
      updates: true,
      marketing: false,
    },
  });

  const handleToggle = (category: keyof typeof settings, key: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key as keyof typeof prev[typeof category]],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Preferencias de notificaciones actualizadas', 'success');
    } catch (error) {
      showToast('Error al actualizar preferencias', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Notificaciones</h2>
        <p className="text-gray-400">Configura cómo y cuándo deseas recibir notificaciones</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Notifications */}
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-medium text-white">Notificaciones por Email</h3>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center justify-between py-2">
              <span className="text-gray-300">Activar notificaciones por email</span>
              <input
                type="checkbox"
                checked={settings.email.enabled}
                onChange={() => handleToggle('email', 'enabled')}
                className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
              />
            </label>

            {settings.email.enabled && (
              <>
                <label className="flex items-center justify-between py-2 pl-4 border-l-2 border-gray-700">
                  <span className="text-gray-300">Nuevos usuarios</span>
                  <input
                    type="checkbox"
                    checked={settings.email.newUsers}
                    onChange={() => handleToggle('email', 'newUsers')}
                    className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between py-2 pl-4 border-l-2 border-gray-700">
                  <span className="text-gray-300">Órdenes y transacciones</span>
                  <input
                    type="checkbox"
                    checked={settings.email.orders}
                    onChange={() => handleToggle('email', 'orders')}
                    className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between py-2 pl-4 border-l-2 border-gray-700">
                  <span className="text-gray-300">Marketing y promociones</span>
                  <input
                    type="checkbox"
                    checked={settings.email.marketing}
                    onChange={() => handleToggle('email', 'marketing')}
                    className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between py-2 pl-4 border-l-2 border-gray-700">
                  <span className="text-gray-300">Alertas de seguridad</span>
                  <input
                    type="checkbox"
                    checked={settings.email.security}
                    onChange={() => handleToggle('email', 'security')}
                    className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-medium text-white">Notificaciones por SMS</h3>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center justify-between py-2">
              <span className="text-gray-300">Activar notificaciones por SMS</span>
              <input
                type="checkbox"
                checked={settings.sms.enabled}
                onChange={() => handleToggle('sms', 'enabled')}
                className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
              />
            </label>

            {settings.sms.enabled && (
              <>
                <label className="flex items-center justify-between py-2 pl-4 border-l-2 border-gray-700">
                  <span className="text-gray-300">Órdenes importantes</span>
                  <input
                    type="checkbox"
                    checked={settings.sms.orders}
                    onChange={() => handleToggle('sms', 'orders')}
                    className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between py-2 pl-4 border-l-2 border-gray-700">
                  <span className="text-gray-300">Alertas de seguridad</span>
                  <input
                    type="checkbox"
                    checked={settings.sms.security}
                    onChange={() => handleToggle('sms', 'security')}
                    className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-medium text-white">Notificaciones Push</h3>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center justify-between py-2">
              <span className="text-gray-300">Activar notificaciones push</span>
              <input
                type="checkbox"
                checked={settings.push.enabled}
                onChange={() => handleToggle('push', 'enabled')}
                className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
              />
            </label>

            {settings.push.enabled && (
              <>
                <label className="flex items-center justify-between py-2 pl-4 border-l-2 border-gray-700">
                  <span className="text-gray-300">Nuevos mensajes</span>
                  <input
                    type="checkbox"
                    checked={settings.push.messages}
                    onChange={() => handleToggle('push', 'messages')}
                    className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between py-2 pl-4 border-l-2 border-gray-700">
                  <span className="text-gray-300">Actualizaciones del sistema</span>
                  <input
                    type="checkbox"
                    checked={settings.push.updates}
                    onChange={() => handleToggle('push', 'updates')}
                    className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between py-2 pl-4 border-l-2 border-gray-700">
                  <span className="text-gray-300">Promociones</span>
                  <input
                    type="checkbox"
                    checked={settings.push.marketing}
                    onChange={() => handleToggle('push', 'marketing')}
                    className="w-5 h-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                  />
                </label>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2 bg-primary hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Guardando...' : 'Guardar Preferencias'}
          </button>
        </div>
      </form>
    </div>
  );
}
