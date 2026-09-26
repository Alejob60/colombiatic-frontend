// src/app/settings/page.tsx
"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from '@/lib/i18n';

export default function SettingsPage() {
  const { t } = useTranslations();
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [theme, setTheme] = useState('dark');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En una implementación real:
      // const response = await fetch('/api/user/change-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ currentPassword, newPassword })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Error al cambiar la contraseña');
      // }
      
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En una implementación real:
      // const response = await fetch('/api/user/preferences', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ theme, emailNotifications, pushNotifications, smsNotifications })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Error al guardar las preferencias');
      // }
      
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar las preferencias');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">{t('settings.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seguridad */}
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-white mb-4">{t('settings.security')}</h2>
            
            {error && !success && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            
            {success && (
              <div className="mb-4 rounded-md bg-green-50 p-4">
                <div className="text-sm text-green-700">Cambios guardados correctamente</div>
              </div>
            )}
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('settings.currentPassword')}
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('settings.newPassword')}
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('settings.confirmNewPassword')}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? 'Guardando...' : t('settings.changePassword')}
              </button>
            </form>
          </div>
          
          {/* Preferencias */}
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-white mb-4">{t('settings.notifications')}</h2>
            
            <form onSubmit={handlePreferencesChange} className="space-y-4">
              {/* Tema */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('settings.theme')}
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={theme === 'light'}
                      onChange={() => setTheme('light')}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-gray-300">{t('preferences.theme.light')}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={theme === 'dark'}
                      onChange={() => setTheme('dark')}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-gray-300">{t('preferences.theme.dark')}</span>
                  </label>
                </div>
              </div>
              
              {/* Notificaciones */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('preferences.notifications.email')}
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded"
                  />
                  <label htmlFor="emailNotifications" className="ml-2 text-gray-300">
                    {t('preferences.notifications.email')}
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('preferences.notifications.push')}
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pushNotifications"
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded"
                  />
                  <label htmlFor="pushNotifications" className="ml-2 text-gray-300">
                    {t('preferences.notifications.push')}
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('preferences.notifications.sms')}
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smsNotifications"
                    checked={smsNotifications}
                    onChange={(e) => setSmsNotifications(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded"
                  />
                  <label htmlFor="smsNotifications" className="ml-2 text-gray-300">
                    {t('preferences.notifications.sms')}
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? 'Guardando...' : t('settings.saveChanges')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}