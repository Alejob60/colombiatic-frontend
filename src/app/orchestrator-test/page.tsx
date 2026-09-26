// src/app/orchestrator-test/page.tsx
// IA Orchestrator test page for ColombiaTIC AI

"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import * as aiAgentService from '@/services/misybot/aiAgentService';

export default function OrchestratorTestPage() {
  const { user } = useAuth();
  const [agentId, setAgentId] = useState('test-agent-123');
  const [message, setMessage] = useState('Hola, ¿cómo estás?');
  const [context, setContext] = useState('');
  const [timeframe, setTimeframe] = useState('24h');
  const [response, setResponse] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<'message' | 'analytics'>('message');

  const handleSendMessage = async () => {
    if (!agentId || !message) return;
    
    setLoading(true);
    setResponse(null);
    
    try {
      const contextObj = context ? JSON.parse(context) : {};
      const result = await aiAgentService.sendMessageToOrchestrator(agentId, message, contextObj);
      setResponse(result);
    } catch (error: any) {
      setResponse({ error: error.message || 'Error sending message' });
    } finally {
      setLoading(false);
    }
  };

  const handleGetAnalytics = async () => {
    if (!agentId) return;
    
    setLoading(true);
    setAnalytics(null);
    
    try {
      const result = await aiAgentService.getOrchestratorAnalytics(agentId, timeframe);
      setAnalytics(result);
    } catch (error: any) {
      setAnalytics({ error: error.message || 'Error fetching analytics' });
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    if (!agentId) return;
    
    setLoading(true);
    setResponse(null);
    
    try {
      const result = await aiAgentService.connectToOrchestrator(agentId, {
        channels: ['web', 'whatsapp'],
        language: 'es',
        industry: 'technology'
      });
      setResponse(result);
    } catch (error: any) {
      setResponse({ error: error.message || 'Error connecting to orchestrator' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Prueba del IA Orchestrator</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Prueba la conexión directa con el IA Orchestrator de Misybot para procesamiento avanzado de IA.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-surface rounded-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Configuración</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ID del Agente
                </label>
                <input
                  type="text"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="test-agent-123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Acción
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setAction('message')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      action === 'message'
                        ? 'bg-primary text-white'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    Enviar Mensaje
                  </button>
                  <button
                    onClick={() => setAction('analytics')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      action === 'analytics'
                        ? 'bg-primary text-white'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    Obtener Analíticas
                  </button>
                </div>
              </div>

              {action === 'message' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary h-24"
                      placeholder="Hola, ¿cómo estás?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contexto (JSON)
                    </label>
                    <textarea
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary h-24 font-mono text-sm"
                      placeholder='{"userId": "user-123", "channel": "web"}'
                    />
                  </div>
                </>
              )}

              {action === 'analytics' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Periodo de Tiempo
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="1h">Última 1 hora</option>
                    <option value="24h">Últimas 24 horas</option>
                    <option value="7d">Últimos 7 días</option>
                    <option value="30d">Últimos 30 días</option>
                  </select>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={action === 'message' ? handleSendMessage : handleGetAnalytics}
                  disabled={loading}
                  className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? 'Procesando...' : action === 'message' ? 'Enviar Mensaje' : 'Obtener Analíticas'}
                </button>
                <button
                  onClick={handleConnect}
                  disabled={loading}
                  className="flex-1 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium disabled:opacity-50"
                >
                  Conectar
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              {action === 'message' ? 'Respuesta' : 'Analíticas'}
            </h2>
            <div className="space-y-4">
              {response || analytics ? (
                <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(response || analytics, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-400">
                    {action === 'message' 
                      ? 'Envía un mensaje para ver la respuesta del IA Orchestrator.' 
                      : 'Obtén analíticas para ver los datos de rendimiento.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Instrucciones de Uso</h2>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Conexión con IA Orchestrator</h3>
            <p className="text-gray-400">
              El IA Orchestrator es el componente central de procesamiento de IA de Misybot que coordina
              todos los agentes y canales. Esta conexión permite:
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>Procesamiento avanzado de lenguaje natural</li>
              <li>Coordinación entre múltiples agentes</li>
              <li>Análisis de sentimientos y emociones</li>
              <li>Generación de respuestas contextuales</li>
              <li>Analíticas avanzadas de conversaciones</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Pruebas</h3>
            <ol className="text-gray-400 space-y-2">
              <li><strong>Conectar:</strong> Establece la conexión con el IA Orchestrator</li>
              <li><strong>Enviar Mensaje:</strong> Prueba el procesamiento de mensajes</li>
              <li><strong>Obtener Analíticas:</strong> Recupera datos de rendimiento</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}