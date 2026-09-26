// src/app/dashboard/ia-omnichannel/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/i18n';

export default function IAOmnichannelDashboard() {
  const { t } = useTranslations();
  const [metrics, setMetrics] = useState({
    activeConversations: 12,
    responseTime: 2.4,
    satisfactionRate: 92,
    totalMessages: 1240
  });
  const [channels, setChannels] = useState([
    { id: 1, name: 'WhatsApp', status: 'connected', messages: 8 },
    { id: 2, name: 'Instagram', status: 'connected', messages: 4 },
    { id: 3, name: 'Facebook', status: 'disconnected', messages: 0 }
  ]);
  const [conversations, setConversations] = useState([
    { id: 1, customer: 'María López', channel: 'WhatsApp', status: 'active', lastMessage: 'Hola, tengo una duda sobre mi pedido' },
    { id: 2, customer: 'Carlos Ruiz', channel: 'Instagram', status: 'pending', lastMessage: '¿Tienen disponible el producto X?' },
    { id: 3, customer: 'Ana García', channel: 'WhatsApp', status: 'resolved', lastMessage: 'Gracias por su ayuda' }
  ]);

  // Simular actualización en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeConversations: prev.activeConversations + Math.floor(Math.random() * 2),
        totalMessages: prev.totalMessages + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">IA Omnichannel + CRM</h1>
        
        {/* Métricas en tiempo real */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Conversaciones Activas</h3>
            <p className="text-3xl font-bold text-white">{metrics.activeConversations}</p>
          </div>
          
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Tiempo de Respuesta (min)</h3>
            <p className="text-3xl font-bold text-white">{metrics.responseTime}</p>
          </div>
          
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Satisfacción (%)</h3>
            <p className="text-3xl font-bold text-white">{metrics.satisfactionRate}%</p>
          </div>
          
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Mensajes Totales</h3>
            <p className="text-3xl font-bold text-white">{metrics.totalMessages}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuración de canales */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Canales Conectados</h2>
              
              <div className="space-y-4">
                {channels.map((channel) => (
                  <div key={channel.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${channel.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-white">{channel.name}</span>
                    </div>
                    <div className="flex items-center">
                      {channel.messages > 0 && (
                        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
                          {channel.messages}
                        </span>
                      )}
                      <button className="text-primary hover:text-blue-400">
                        {channel.status === 'connected' ? 'Desconectar' : 'Conectar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                + Agregar Canal
              </button>
            </div>
            
            {/* Métricas detalladas */}
            <div className="bg-surface rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Métricas de Conversación</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Resolución Automática</span>
                    <span className="text-white">78%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Transferencia Humano</span>
                    <span className="text-white">22%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Satisfacción Cliente</span>
                    <span className="text-white">4.2/5</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star} 
                        className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-600'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Conversaciones activas */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Conversaciones Activas</h2>
                <button className="bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                  Ver Todas
                </button>
              </div>
              
              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{conversation.customer}</h3>
                        <p className="text-sm text-gray-400">{conversation.channel}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        conversation.status === 'active' ? 'bg-green-900 text-green-200' :
                        conversation.status === 'pending' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-blue-900 text-blue-200'
                      }`}>
                        {conversation.status === 'active' ? 'Activa' :
                         conversation.status === 'pending' ? 'Pendiente' : 'Resuelta'}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-300">{conversation.lastMessage}</p>
                    <div className="mt-3 flex justify-end">
                      <button className="text-primary hover:text-blue-400 text-sm">
                        Ver Conversación
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Flujos automáticos */}
            <div className="bg-surface rounded-lg shadow-md p-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Flujos Automáticos</h2>
                <button className="bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                  + Crear Flujo
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="font-medium text-white mb-2">Bienvenida Nuevo Cliente</h3>
                  <p className="text-sm text-gray-400 mb-3">Flujo automático para nuevos contactos</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-green-900 text-green-200 px-2 py-1 rounded">Activo</span>
                    <button className="text-primary hover:text-blue-400 text-sm">Editar</button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="font-medium text-white mb-2">FAQ Automático</h3>
                  <p className="text-sm text-gray-400 mb-3">Respuestas automáticas a preguntas frecuentes</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-green-900 text-green-200 px-2 py-1 rounded">Activo</span>
                    <button className="text-primary hover:text-blue-400 text-sm">Editar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}