import { useState, useEffect, useCallback } from 'react';
import colombiaticAgentService, { AgentResponse } from '@/services/colombiaticAgentService';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  isError?: boolean;
  missingInfo?: string[];
}

export const useAgentCommunication = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { token } = useAuth();
  const { tenant } = useTenant();

  // Inicializar sesión y conexión
  useEffect(() => {
    // Limpiar sesiones expiradas al iniciar
    colombiaticAgentService.cleanupExpiredSessions();
    
    // Generar nueva sesión
    const newSessionId = colombiaticAgentService.generateSessionId();
    setSessionId(newSessionId);
    setIsConnected(true);
    
    // Intentar cargar contexto previo
    const savedMessages = colombiaticAgentService.loadConversationContext(newSessionId);
    if (savedMessages && savedMessages.length > 0) {
      // Convertir timestamps a objetos Date
      const parsedMessages = savedMessages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsedMessages);
    } else {
      // Agregar mensaje de bienvenida
      const welcomeMessage: ChatMessage = {
        id: 'welcome-' + Date.now(),
        text: '¡Hola! Soy tu asistente AI de ColombiaTIC. ¿En qué puedo ayudarte hoy?',
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
    }
    
    // Configurar escuchadores de WebSocket
    const handleAgentUpdate = (data: any) => {
      console.log('Actualización de agente:', data);
    };

    const handleTaskProgress = (data: any) => {
      console.log('Progreso de tarea:', data);
    };

    colombiaticAgentService.onAgentUpdate(handleAgentUpdate);
    colombiaticAgentService.onTaskProgress(handleTaskProgress);

    // Limpiar al desmontar
    return () => {
      colombiaticAgentService.closeConnection();
    };
  }, []);

  // Guardar contexto cuando cambian los mensajes
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      colombiaticAgentService.saveConversationContext(sessionId, messages);
    }
  }, [messages, sessionId]);

  // Enviar mensaje al agente
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return;

    // Agregar mensaje del usuario
    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Enviar mensaje al agente
      const response: AgentResponse = await colombiaticAgentService.sendMessage(message, {
        sessionId,
        tenantId: tenant?.id,
        userId: token || undefined
      });
      
      // Agregar respuesta del agente
      const agentMessage: ChatMessage = {
        id: 'agent-' + Date.now(),
        text: response.conversation.agentResponse,
        sender: 'agent',
        timestamp: new Date(),
        missingInfo: response.conversation.missingInfo
      };
      
      setMessages(prev => [...prev, agentMessage]);
      return response;
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: 'error-' + Date.now(),
        text: 'Lo siento, hubo un error procesando tu mensaje. Por favor intenta de nuevo.',
        sender: 'agent',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, tenant?.id, token, isLoading]);

  // Limpiar conversación
  const clearConversation = useCallback(() => {
    const newSessionId = colombiaticAgentService.generateSessionId();
    setSessionId(newSessionId);
    
    const welcomeMessage: ChatMessage = {
      id: 'welcome-' + Date.now(),
      text: '¡Hola! Soy tu asistente AI de ColombiaTIC. ¿En qué puedo ayudarte hoy?',
      sender: 'agent',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, []);

  return {
    messages,
    sessionId,
    isLoading,
    isConnected,
    sendMessage,
    clearConversation
  };
};