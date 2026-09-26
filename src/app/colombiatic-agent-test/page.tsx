// src/app/colombiatic-agent-test/page.tsx
// Test page for ColombiaTIC agent API

"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ColombiaTICAgentTestPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    site_url: 'https://miempresa.colombiatic.ai',
    industry: 'technology',
    language: 'es',
    tone: 'professional',
    connect_channels: ['web', 'whatsapp'],
    organization_id: user?.organization_id || ''
  });
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setError('');
    
    try {
      const res = await fetch('/api/colombiatic/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          organization_id: user?.organization_id || formData.organization_id
        })
      });
      
      const data = await res.json();
      setResponse(data);
      
      if (!res.ok) {
        setError(data.message || 'Error creating agent');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Prueba del API de Agentes ColombiaTIC</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Crea y configura agentes de IA para clientes ColombiaTIC a través del API.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-surface rounded-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Crear Agente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL del Sitio
                </label>
                <input
                  type="url"
                  value={formData.site_url}
                  onChange={(e) => setFormData({...formData, site_url: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Industria
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="technology">Tecnología</option>
                  <option value="healthcare">Salud</option>
                  <option value="finance">Finanzas</option>
                  <option value="education">Educación</option>
                  <option value="retail">Retail</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Idioma
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tono
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({...formData, tone: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="professional">Profesional</option>
                  <option value="friendly">Amigable</option>
                  <option value="formal">Formal</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ID de Organización
                </label>
                <input
                  type="text"
                  value={formData.organization_id || user?.organization_id || ''}
                  onChange={(e) => setFormData({...formData, organization_id: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Canales de Conexión
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['web', 'whatsapp', 'facebook', 'instagram', 'telegram'].map(channel => (
                    <label key={channel} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.connect_channels.includes(channel as any)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              connect_channels: [...formData.connect_channels, channel as any]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              connect_channels: formData.connect_channels.filter(c => c !== channel)
                            });
                          }
                        }}
                        className="rounded bg-gray-800 border-gray-700 text-primary focus:ring-primary"
                      />
                      <span className="text-gray-300 capitalize">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'Creando Agente...' : 'Crear Agente'}
              </button>
            </form>
          </div>
          
          <div className="bg-surface rounded-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Respuesta</h2>
            <div className="space-y-4">
              {error && (
                <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
                  <h3 className="text-red-400 font-medium mb-2">Error</h3>
                  <p className="text-red-300">{error}</p>
                </div>
              )}
              
              {response ? (
                <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-400">
                    Crea un agente para ver la respuesta del API.
                  </p>
                </div>
              )}
              
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Endpoint del API</h3>
                <code className="text-sm text-gray-400">
                  POST /api/colombiatic/agent
                </code>
                <p className="text-xs text-gray-500 mt-2">
                  Este endpoint crea un nuevo agente IA para clientes ColombiaTIC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}