// src/hooks/useChatSession.ts
import { useState, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatContext {
  serviceId?: string;
  intention?: string;
  contextId?: string;
}

export const useChatSession = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<ChatContext>({});
  const [isLoading, setIsLoading] = useState(false);

  // Inicializar sesión de chat
  useEffect(() => {
    // Mensaje de bienvenida
    setMessages([{
      id: '1',
      text: "Hola, soy tu IA Asesora. ¿Qué tienes en mente hoy? Puedo mostrarte los servicios y guiarte paso a paso.",
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simular llamada a API del Meta-Agente
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Respuesta simulada del bot
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Gracias por tu mensaje. Estoy procesando tu solicitud. ¿Te gustaría conocer más sobre alguno de nuestros servicios?",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, inténtalo de nuevo.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContext = (newContext: ChatContext) => {
    setContext(newContext);
    // Guardar en localStorage para persistencia
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatContext', JSON.stringify(newContext));
    }
  };

  return {
    messages,
    context,
    isLoading,
    sendMessage,
    saveContext
  };
};