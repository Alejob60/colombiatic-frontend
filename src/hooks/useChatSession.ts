// src/hooks/useChatSession.ts
import { useState, useEffect, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  role: 'user' | 'bot' | 'system';
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatContext {
  serviceId?: string;
  intention?: string;
  contextId?: string;
}

export interface UseChatSessionOptions {
  isAuthenticated?: boolean;
  currentLocation?: 'landing' | 'dashboard';
  onIntentDetected?: (intent: string, data?: Record<string, any>) => void;
}

export const useChatSession = (options: UseChatSessionOptions = {}) => {
  const { onIntentDetected } = options;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<ChatContext>({});
  const [isLoading, setIsLoading] = useState(false);

  // Inicializar sesión de chat
  useEffect(() => {
    // Mensaje de bienvenida
    setMessages([{
      id: '1',
      text: "Hola, soy tu IA Asesora. ¿Qué tienes en mente hoy? Puedo mostrarte los servicios y guiarte paso a paso.",
      role: 'bot',
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, []);

  const saveContext = useCallback((newContext: ChatContext) => {
    setContext(newContext);
    // Guardar en localStorage para persistencia
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatContext', JSON.stringify(newContext));
    }
  }, []);

  const addSystemMessage = useCallback((text: string) => {
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      role: 'system',
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, systemMessage]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const sendMessage = useCallback(async (text: string, intent?: string) => {
    if (!text.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      role: 'user',
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    if (intent) {
      saveContext({ ...context, intention: intent });
    }

    try {
      // Simular llamada a API del Meta-Agente
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Respuesta simulada del bot
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Gracias por tu mensaje. Estoy procesando tu solicitud. ¿Te gustaría conocer más sobre alguno de nuestros servicios?",
        role: 'bot',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      if (intent) {
        onIntentDetected?.(intent, { ...context, intention: intent });
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, inténtalo de nuevo.",
        role: 'bot',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [context, onIntentDetected, saveContext]);

  return {
    messages,
    context,
    isLoading,
    sendMessage,
    saveContext,
    addSystemMessage,
    clearMessages
  };
};
