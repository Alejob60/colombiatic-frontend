// src/app/demo/meta-agent-demo/page.tsx
"use client";

import ColombiaTICChat from '@/components/chat/ColombiaTICChat';
import ConversationStatus from '@/components/chat/ConversationStatus';
import { useMetaAgent } from '@/contexts/MetaAgentContext';

export default function MetaAgentDemo() {
  const { sessionId } = useMetaAgent();
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Demo del Meta-Agent de ColombiaTIC</h1>
          <p className="text-gray-400 mb-4">
            Integración con el FrontDesk Agent para procesamiento de mensajes de clientes
          </p>
          <div className="inline-block bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-gray-400">ID de Sesión: </span>
            <span className="font-mono text-blue-400">{sessionId}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl overflow-hidden h-[600px]">
              <ColombiaTICChat />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Estado de la Conversación</h2>
              <ConversationStatus />
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Instrucciones de prueba:</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Prueba solicitar un video para TikTok</li>
                  <li>• Pregunta sobre programación de publicaciones</li>
                  <li>• Solicita análisis de tendencias</li>
                  <li>• Pregunta sobre precios o planes</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Agentes Especializados</h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium">video-scriptor</div>
                    <div className="text-sm text-gray-400">Creación de videos virales</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium">post-scheduler</div>
                    <div className="text-sm text-gray-400">Programación de publicaciones</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium">trend-scanner</div>
                    <div className="text-sm text-gray-400">Análisis de tendencias</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium">faq-responder</div>
                    <div className="text-sm text-gray-400">Respuestas a preguntas frecuentes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Esta es una demostración de la integración con el Meta-Agent de ColombiaTIC</p>
        </div>
      </div>
    </div>
  );
}