// src/components/dashboard/ApiKeyManager.tsx
"use client";

import { useState, useEffect } from 'react';
import { Plus, Copy, Trash2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import * as securityService from '@/services/misybot/securityService';

export default function ApiKeyManager() {
  const { showToast } = useToast();
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      // Mock data para demostración
      setApiKeys([
        { id: '1', name: 'Production API', key: 'sk_live_1234567890abcdef', prefix: 'sk_live_', status: 'active', created_at: '2025-01-01', last_used_at: '2025-01-04' },
        { id: '2', name: 'Development', key: 'sk_test_0987654321fedcba', prefix: 'sk_test_', status: 'active', created_at: '2024-12-15' },
      ]);
    } catch (error) {
      showToast('Error al cargar API keys', 'error');
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyName) return;
    setLoading(true);
    
    try {
      // Simular creación
      const newKey = {
        id: Date.now().toString(),
        name: newKeyName,
        key: `sk_live_${Math.random().toString(36).substring(2, 15)}`,
        prefix: 'sk_live_',
        status: 'active',
        created_at: new Date().toISOString(),
      };
      setApiKeys([...apiKeys, newKey]);
      setShowCreateModal(false);
      setNewKeyName('');
      showToast('API Key creada exitosamente', 'success');
    } catch (error) {
      showToast('Error al crear API key', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (keyId: string) => {
    try {
      setApiKeys(apiKeys.filter(k => k.id !== keyId));
      showToast('API Key revocada', 'success');
    } catch (error) {
      showToast('Error al revocar API key', 'error');
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => ({...prev, [keyId]: !prev[keyId]}));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copiado al portapapeles', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">API Keys</h2>
          <p className="text-gray-400 text-sm mt-1">Gestiona claves para integración con APIs</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva API Key
        </button>
      </div>

      <div className="space-y-3">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white font-medium">{apiKey.name}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Creada: {new Date(apiKey.created_at).toLocaleDateString('es-ES')}
                  {apiKey.last_used_at && ` • Último uso: ${new Date(apiKey.last_used_at).toLocaleDateString('es-ES')}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title={visibleKeys[apiKey.id] ? 'Ocultar' : 'Mostrar'}
                >
                  {visibleKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.key)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Copiar"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleRevoke(apiKey.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  title="Revocar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="bg-gray-800 rounded p-3 font-mono text-sm text-gray-300 flex items-center justify-between">
              <span>{visibleKeys[apiKey.id] ? apiKey.key : apiKey.prefix + '••••••••••••••••'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Nueva API Key</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  placeholder="Production API"
                />
              </div>
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateKey}
                  disabled={loading || !newKeyName}
                  className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded disabled:opacity-50"
                >
                  {loading ? 'Creando...' : 'Crear'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
