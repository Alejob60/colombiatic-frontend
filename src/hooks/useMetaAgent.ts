// src/hooks/useMetaAgent.ts
// Hook personalizado para facilitar el uso del meta-agente

import { useMetaAgent } from '@/contexts/MetaAgentContext';

export const useMetaAgentChat = () => {
  const context = useMetaAgent();
  
  // Función para enviar un mensaje con contexto adicional
  const sendWithContext = async (message: string, context?: Record<string, any>) => {
    if (!message.trim()) return;
    
    await context.sendMessage(message);
  };
  
  // Función para obtener el historial de conversación formateado
  const getConversationHistory = () => {
    return context.messages.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content,
      timestamp: msg.timestamp
    }));
  };
  
  // Función para verificar si hay una conversación activa
  const hasActiveConversation = () => {
    return context.messages.length > 0;
  };
  
  // Función para obtener el estado actual de la conversación
  const getConversationStatus = () => {
    if (context.messages.length === 0) return 'idle';
    if (context.isProcessing) return 'processing';
    
    // Verificar si la última respuesta indica que está lista para enrutar
    const lastAgentMessage = [...context.messages]
      .reverse()
      .find(msg => msg.type === 'agent');
      
    if (lastAgentMessage && lastAgentMessage.isComplete) {
      return 'ready_to_route';
    }
    
    return 'waiting_for_input';
  };
  
  return {
    ...context,
    sendWithContext,
    getConversationHistory,
    hasActiveConversation,
    getConversationStatus
  };
};