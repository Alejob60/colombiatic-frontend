// src/examples/custom-chat-page.tsx
// Ejemplo de implementación personalizada del chat

'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import ColombiaticChatInterface from '@/components/chat/ColombiaticChatInterface';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

/**
 * Ejemplo de página personalizada con chat del agente AI
 * 
 * Este componente muestra cómo integrar el chat del agente AI en una página personalizada
 * con estilos y funcionalidades adicionales.
 */
export default function CustomChatPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {t('dashboard.agentChat.title', 'Chat con Asistente AI')}
          </CardTitle>
          <CardDescription>
            {t('dashboard.agentChat.description', 'Interactúa con el asistente AI de ColombiaTIC para obtener ayuda y orientación')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <ColombiaticChatInterface />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Ejemplo de integración en un componente existente
 * 
 * Este componente muestra cómo integrar el chat en un dashboard existente
 * con funcionalidades adicionales como estadísticas y acciones rápidas.
 */
export function DashboardWithChat() {
  const { t } = useLanguage();
  
  // Funciones de ejemplo para acciones rápidas
  const handleQuickAction = (action: string) => {
    console.log('Acción rápida seleccionada:', action);
    // Aquí podrías enviar un mensaje predefinido al agente
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel izquierdo - Estadísticas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Panel de Control</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800">Conversaciones</h3>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">Resueltas</h3>
                <p className="text-2xl font-bold">18</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-medium text-yellow-800">Pendientes</h3>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </div>
          
          {/* Acciones rápidas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleQuickAction('ayuda')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Solicitar Ayuda
              </button>
              <button 
                onClick={() => handleQuickAction('reporte')}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Generar Reporte
              </button>
              <button 
                onClick={() => handleQuickAction('configuracion')}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Configuración
              </button>
              <button 
                onClick={() => handleQuickAction('contacto')}
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Contactar Soporte
              </button>
            </div>
          </div>
        </div>
        
        {/* Panel derecho - Chat */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Asistente AI</h2>
          <div className="h-[500px]">
            <ColombiaticChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Ejemplo de chat embebido en una sección
 * 
 * Este componente muestra cómo embeber el chat en una sección específica
 * de una página más grande.
 */
export function EmbeddedChatSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestro asistente AI está disponible 24/7 para ayudarte con cualquier pregunta
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-[400px]">
            <ColombiaticChatInterface />
          </div>
        </div>
      </div>
    </section>
  );
}