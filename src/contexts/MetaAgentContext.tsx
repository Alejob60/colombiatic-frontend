// src/contexts/MetaAgentContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import metaAgentService from '@/services/metaAgentService';
import { FrontDeskResponse } from '@/services/metaAgentService';

interface ChatMessage {
  id: string;
  type: 'user' | 'agent' | 'error' | 'system';
  content: string;
  timestamp: Date;
  confidence?: number;
  emotion?: string;
  isComplete?: boolean;
  targetAgent?: string;
}

interface MetaAgentContextType {
  messages: ChatMessage[];
  isProcessing: boolean;
  sendMessage: (message: string, context?: Record<string, any>) => Promise<void>;
  clearChat: () => void;
  sessionId: string;
  connectionError: boolean;
}

const MetaAgentContext = createContext<MetaAgentContextType | undefined>(undefined);

export function MetaAgentProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const sessionId = metaAgentService.getSessionId();

  const sendMessage = async (message: string, context?: Record<string, any>) => {
    if (!message.trim()) return;

    // Agregar mensaje del usuario al chat
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Procesar con el Front Desk Agent
      const response = await metaAgentService.processMessage(message, context);
      
      // Resetear el error de conexión si la llamada fue exitosa
      setConnectionError(false);
      
      // Agregar respuesta del agente al chat
      const agentMessage: ChatMessage = {
        id: `msg_${Date.now()}_agent`,
        type: 'agent',
        content: response.conversation.agentResponse,
        confidence: response.conversation.confidence,
        emotion: response.conversation.emotion,
        timestamp: new Date(),
        isComplete: response.conversation.isComplete,
        targetAgent: response.conversation.targetAgent
      };
      
      setMessages(prev => [...prev, agentMessage]);
      
      // Si la conversación está completa, podríamos enrutar al agente objetivo
      if (response.conversation.isComplete && response.conversation.targetAgent) {
        console.log(`Enrutando al agente: ${response.conversation.targetAgent}`);
        // Aquí se implementaría la lógica de enrutamiento al agente especializado
      }
    } catch (error) {
      // Verificar si es un error de conexión
      if (error instanceof Error && error.message === 'CONNECTION_ERROR') {
        setConnectionError(true);
      }
      
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        type: 'error',
        content: 'Lo siento, hubo un error procesando tu solicitud. Por favor intenta de nuevo.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setConnectionError(false);
    metaAgentService.updateSessionId();
  };

  return (
    <MetaAgentContext.Provider value={{ 
      messages, 
      isProcessing, 
      sendMessage, 
      clearChat,
      sessionId,
      connectionError
    }}>
      {children}
    </MetaAgentContext.Provider>
  );
}

export function useMetaAgent() {
  const context = useContext(MetaAgentContext);
  // En lugar de lanzar un error, devolvemos valores por defecto
  // Esto previene errores cuando el contexto no está disponible
  if (context === undefined) {
    console.warn('[MetaAgentContext] useMetaAgent debe ser usado dentro de un MetaAgentProvider. Devolviendo valores por defecto.');
    return {
      messages: [],
      isProcessing: false,
      sendMessage: async () => {
        console.warn('[MetaAgentContext] sendMessage llamado fuera de MetaAgentProvider');
      },
      clearChat: () => {
        console.warn('[MetaAgentContext] clearChat llamado fuera de MetaAgentProvider');
      },
      sessionId: '',
      connectionError: false
    };
  }
  return context;
}