// src/app/chat-test/page.tsx
"use client";

import { useState } from 'react';
import ChatWidget from '@/features/omnichannel-ai-agent/components/ChatWidget';
import ChatConfigPanel from '@/features/omnichannel-ai-agent/components/ChatConfigPanel';
import { ChatConfig } from '@/features/omnichannel-ai-agent/types';

export default function ChatTestPage() {
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState<ChatConfig>({
    primaryColor: '#3b82f6',
    greetingMessage: '¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?',
    botName: 'Asistente IA',
    tone: 'friendly',
    language: 'es',
  });

  const handleSaveConfig = (newConfig: ChatConfig) => {
    setConfig(newConfig);
    setShowConfig(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Prueba del Chat IA Omnicanal</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Prueba el widget de chat de IA en esta página. Puedes personalizar la apariencia y el comportamiento del chat usando el panel de configuración.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-surface rounded-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Información del Chat</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Características</h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Integración con múltiples canales (Web, WhatsApp, Facebook, Telegram)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Respuestas impulsadas por IA (Azure OpenAI)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Personalización visual y de comportamiento
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Analítica de conversaciones en tiempo real
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Configuración Actual</h3>
                <div className="bg-gray-800 rounded-lg p-4 text-sm">
                  <div className="grid grid-cols-2 gap-2 text-gray-300">
                    <span>Nombre:</span>
                    <span className="text-white">{config.botName}</span>
                    
                    <span>Color:</span>
                    <span className="text-white">{config.primaryColor}</span>
                    
                    <span>Tono:</span>
                    <span className="text-white capitalize">{config.tone}</span>
                    
                    <span>Idioma:</span>
                    <span className="text-white">{config.language === 'es' ? 'Español' : 'English'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Controles de Prueba</h2>
            <div className="space-y-4">
              <button
                onClick={() => setShowConfig(true)}
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Personalizar Chat
              </button>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Instrucciones</h3>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>• Haz clic en el botón azul en la esquina inferior derecha para abrir el chat</li>
                  <li>• Escribe un mensaje y presiona Enter o haz clic en el botón de enviar</li>
                  <li>• Usa el botón de personalizar para cambiar la apariencia del chat</li>
                  <li>• Cierra el chat haciendo clic en la X en la esquina superior derecha</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Contenido de Ejemplo</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-400">
              Esta página de prueba incluye el widget de chat de IA que puede ser embebido en cualquier sitio web. 
              El chat está diseñado para funcionar en múltiples canales y proporcionar una experiencia de atención al cliente 
              consistente independientemente del canal que el usuario elija.
            </p>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Beneficios del Chat IA Omnicanal</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Consistencia en la experiencia del cliente a través de todos los canales</li>
              <li>Reducción de tiempos de respuesta y mejora en la satisfacción del cliente</li>
              <li>Integración con sistemas existentes de atención al cliente</li>
              <li>Analítica avanzada para entender patrones de conversación y comportamiento del cliente</li>
              <li>Escalabilidad para manejar múltiples conversaciones simultáneamente</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Tecnología Subyacente</h3>
            <p className="text-gray-400">
              El chat utiliza Azure OpenAI para generar respuestas inteligentes y contextualmente relevantes. 
              La arquitectura está diseñada para ser altamente disponible y escalable, con capacidad para 
              manejar picos de tráfico sin degradación del servicio.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />

      {/* Configuration Panel Modal */}
      {showConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ChatConfigPanel 
              initialConfig={config} 
              onSave={handleSaveConfig} 
              onCancel={() => setShowConfig(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}