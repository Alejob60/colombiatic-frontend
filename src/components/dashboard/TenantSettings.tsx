// src/components/dashboard/TenantSettings.tsx
"use client";

import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import * as tenantService from '@/services/misybot/tenantService';
import type { Tenant } from '@/services/misybot/tenantService';
import { Save, Building2 } from 'lucide-react';

export default function TenantSettings() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    timezone: 'America/Bogota',
    language: 'es',
    currency: 'COP',
  });

  useEffect(() => {
    loadTenant();
  }, []);

  const loadTenant = async () => {
    try {
      const data = await tenantService.getCurrentTenant();
      setTenant(data);
      setFormData({
        name: data.name,
        domain: data.domain || '',
        timezone: data.settings?.timezone || 'America/Bogota',
        language: data.settings?.language || 'es',
        currency: data.settings?.currency || 'COP',
      });
    } catch (error) {
      console.error('Error loading tenant:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await tenantService.updateTenant({
        name: formData.name,
        domain: formData.domain,
        settings: {
          timezone: formData.timezone,
          language: formData.language,
          currency: formData.currency,
        },
      });
      
      showToast('Configuración de organización actualizada', 'success');
      loadTenant();
    } catch (error) {
      showToast('Error al actualizar configuración', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Configuración de Organización</h2>
        <p className="text-gray-400">Gestiona la información de tu organización</p>
      </div>

      {/* Organization Info */}
      {tenant && (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-white font-medium text-lg">{tenant.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  tenant.plan === 'PRO' ? 'bg-purple-900 text-purple-300' :
                  tenant.plan === 'CREATOR' ? 'bg-blue-900 text-blue-300' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {tenant.plan}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  tenant.status === 'active' ? 'bg-green-900 text-green-300' :
                  'bg-yellow-900 text-yellow-300'
                }`}>
                  {tenant.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">ID de Organización</p>
              <p className="text-white font-mono text-xs">{tenant.id}</p>
            </div>
            <div>
              <p className="text-gray-400">Creada el</p>
              <p className="text-white">{new Date(tenant.created_at).toLocaleDateString('es-ES')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre de la organización
            </label>
            <input
              type="text"
              id="orgName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-300 mb-1">
              Dominio
            </label>
            <input
              type="text"
              id="domain"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="miempresa.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="orgTimezone" className="block text-sm font-medium text-gray-300 mb-1">
              Zona horaria
            </label>
            <select
              id="orgTimezone"
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="America/Bogota">Bogotá (UTC-5)</option>
              <option value="America/Mexico_City">Ciudad de México (UTC-6)</option>
              <option value="America/Buenos_Aires">Buenos Aires (UTC-3)</option>
            </select>
          </div>

          <div>
            <label htmlFor="orgLanguage" className="block text-sm font-medium text-gray-300 mb-1">
              Idioma
            </label>
            <select
              id="orgLanguage"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-300 mb-1">
              Moneda
            </label>
            <select
              id="currency"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="COP">COP - Peso Colombiano</option>
              <option value="USD">USD - Dólar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="MXN">MXN - Peso Mexicano</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2 bg-primary hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}
