// src/app/widget-test/page.tsx
// Widget test page for ColombiaTIC AI

"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { generateChatWidgetScript, generateMultipleWidgetScripts } from '@/services/chatWidgetService';

export default function WidgetTestPage() {
  const { user } = useAuth();
  const [clientId, setClientId] = useState('test-client-123');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [generatedScript, setGeneratedScript] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateScript = () => {
    const script = generateChatWidgetScript(clientId, {
      position,
      theme,
      primaryColor
    });
    setGeneratedScript(script);
    setCopied(false);
  };

  const handleCopyToClipboard = () => {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGenerateMultiple = () => {
    const scripts = generateMultipleWidgetScripts(clientId, [
      { position: 'bottom-right', theme: 'dark' },
      { position: 'bottom-left', theme: 'light' },
      { position: 'top-right', theme: 'dark', primaryColor: '#ef4444' },
      { position: 'top-left', theme: 'light', primaryColor: '#10b981' }
    ]);
    
    setGeneratedScript(scripts.join('\n\n'));
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Prueba del Widget de Chat IA</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Genera y prueba el widget de chat universal para sitios web de clientes ColombiaTIC AI.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-surface rounded-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Configuración del Widget</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ID del Cliente
                </label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="test-client-123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Posición
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as any)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="bottom-right">Abajo a la derecha</option>
                  <option value="bottom-left">Abajo a la izquierda</option>
                  <option value="top-right">Arriba a la derecha</option>
                  <option value="top-left">Arriba a la izquierda</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tema
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="dark">Oscuro</option>
                  <option value="light">Claro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color Primario
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-12 border border-gray-700 rounded-lg bg-gray-800 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleGenerateScript}
                  className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Generar Script
                </button>
                <button
                  onClick={handleGenerateMultiple}
                  className="flex-1 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Generar Múltiples
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Script Generado</h2>
            <div className="space-y-4">
              {generatedScript ? (
                <>
                  <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                      {generatedScript}
                    </pre>
                  </div>
                  <button
                    onClick={handleCopyToClipboard}
                    className={`w-full py-2 rounded-lg font-medium transition-colors ${
                      copied 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {copied ? '¡Copiado!' : 'Copiar al Portapapeles'}
                  </button>
                </>
              ) : (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-400">
                    Genera un script de widget usando el formulario de la izquierda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Instrucciones de Uso</h2>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Cómo usar el widget</h3>
            <ol className="text-gray-400 space-y-2">
              <li>Obtén tu ID de cliente del panel de administración de ColombiaTIC AI</li>
              <li>Configura las opciones del widget según tus preferencias</li>
              <li>Genera el script usando esta herramienta</li>
              <li>Copia el script y pégalo en el &lt;head&gt; de tu sitio web</li>
              <li>El widget aparecerá automáticamente en tu sitio</li>
            </ol>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Personalización</h3>
            <ul className="text-gray-400 space-y-2">
              <li><strong>Posición:</strong> Elige dónde aparecerá el widget en tu sitio</li>
              <li><strong>Tema:</strong> Selecciona entre modo claro u oscuro</li>
              <li><strong>Color Primario:</strong> Adapta el widget a la identidad visual de tu marca</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Integración</h3>
            <p className="text-gray-400">
              El widget se conecta automáticamente con el agente IA de ColombiaTIC AI a través del 
              Meta-Agent y el backend de Misybot, permitiendo respuestas inteligentes y contextuales 
              en todos los canales configurados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}