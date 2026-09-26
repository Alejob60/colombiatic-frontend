// src/components/TenantSelector.tsx
"use client";

import { useState } from 'react';
import { useTenant } from '@/contexts/TenantContext';
import { useRouter } from 'next/navigation';

export default function TenantSelector() {
  const { tenant, validateTenant, loading, error } = useTenant();
  const [domain, setDomain] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);
  const router = useRouter();

  const handleSelectTenant = async () => {
    if (!domain.trim()) return;
    
    const isValid = await validateTenant(domain);
    if (isValid) {
      // Redirect to dashboard or home page
      router.push('/dashboard');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSelectTenant();
    }
  };

  if (tenant && !isSelecting) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-white mb-4">Tenant Seleccionado</h2>
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <p className="text-white font-medium">{tenant.name}</p>
          <p className="text-gray-400 text-sm">{tenant.domain}</p>
        </div>
        <button
          onClick={() => setIsSelecting(true)}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Cambiar Tenant
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-white mb-4">Seleccionar Tenant</h2>
      <p className="text-gray-400 mb-6">
        Ingresa el dominio de tu organización para acceder a tu espacio.
      </p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-gray-300 mb-1">
            Dominio
          </label>
          <input
            type="text"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ejemplo.colombiatic.com"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={loading}
          />
        </div>
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-3">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}
        
        <button
          onClick={handleSelectTenant}
          disabled={loading || !domain.trim()}
          className="w-full bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Validando...' : 'Acceder'}
        </button>
      </div>
    </div>
  );
}