// src/components/chat/SmartChatWrapper.tsx
// Componente wrapper que maneja la disponibilidad del chat y muestra fallback cuando es necesario

"use client";

import { useState, useEffect } from 'react';
import ColombiaTICChat from '@/components/chat/ColombiaTICChat';
import FallbackChat from '@/components/chat/FallbackChat';
import { useTranslations } from '@/lib/i18n';

const SmartChatWrapper = () => {
  const { t } = useTranslations();
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
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#00C2FF]/25 border-t-[#00C2FF]" />
        <p className="text-xs text-[#94A3B8]">{t('chat.loading')}</p>
      </div>
    );
  }

  // Mostrar fallback si hay error O si el tenant no está listo
  if (chatError || connectionError || !tenantReady) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-center text-sm text-[#94A3B8]">
        {tenantReady ? <FallbackChat /> : t('chat.initializing')}
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