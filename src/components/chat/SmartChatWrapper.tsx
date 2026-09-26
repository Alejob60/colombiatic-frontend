// src/components/chat/SmartChatWrapper.tsx
// Componente wrapper que maneja la disponibilidad del chat y muestra fallback cuando es necesario

"use client";

import { useState, useEffect } from 'react';
import ColombiaTICChat from '@/components/chat/ColombiaTICChat';
import FallbackChat from '@/components/chat/FallbackChat';

const SmartChatWrapper = () => {
  const [isClient, setIsClient] = useState(false);
  const [chatError, setChatError] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [tenantReady, setTenantReady] = useState(false);

  // Verificar disponibilidad del cliente
  useEffect(() => {
    setIsClient(true);
    
    // Simular verificación de tenant
    setTimeout(() => {
      setTenantReady(true);
    }, 1000);
  }, []);

  // Manejar errores del chat
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error && event.error.message) {
        console.warn('[SmartChat] Error en componente de chat:', event.error);
        // Verificar si es un error de contexto
        if (event.error.message.includes('MetaAgentProvider') || event.error.message.includes('useMetaAgent') || event.error.message.includes('Context')) {
          console.warn('[SmartChat] Error de contexto detectado, mostrando fallback');
          setChatError(true);
        } else if (event.error.message.includes('chat')) {
          setChatError(true);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('error', handleError);
      return () => window.removeEventListener('error', handleError);
    }
  }, []);

  // Mostrar estado de carga o error
  if (!isClient) {
    return (
      <div className="flex flex-col h-full bg-gray-900 rounded-xl overflow-hidden">
        <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Asistente IA ColombiaTIC</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Cargando asistente...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar fallback si hay error O si el tenant no está listo
  if (chatError || connectionError || !tenantReady) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-[#A9B8C6]">
        {tenantReady ? <FallbackChat /> : 'Inicializando asistente…'}
      </div>
    );
  }

  // Intentar mostrar el chat real
  try {
    return <ColombiaTICChat />;
  } catch (error) {
    console.error('[SmartChat] Error al renderizar chat:', error);
    // Si hay un error de contexto, mostrar el fallback
    if (error instanceof Error && (error.message.includes('MetaAgentProvider') || error.message.includes('useMetaAgent'))) {
      return (
        <div className="flex items-center justify-center h-full text-sm text-[#A9B8C6]">
          <FallbackChat />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-full text-sm text-[#A9B8C6]">
        <FallbackChat />
      </div>
    );
  }
};

export default SmartChatWrapper;