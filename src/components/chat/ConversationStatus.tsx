// src/components/chat/ConversationStatus.tsx
"use client";

import { useMetaAgent } from '@/contexts/MetaAgentContext';
import { Bot, User, Clock, CheckCircle } from 'lucide-react';

const ConversationStatus = () => {
  const { messages, isProcessing } = useMetaAgent();
  
  // Obtener el último mensaje del agente
  const lastAgentMessage = [...messages]
    .reverse()
    .find(msg => msg.type === 'agent');
  
  // Obtener el número de mensajes del usuario
  const userMessagesCount = messages.filter(msg => msg.type === 'user').length;
  
  // Determinar el estado de la conversación
  const getStatusInfo = () => {
    if (messages.length === 0) {
      return {
        icon: <Bot className="w-4 h-4" />,
        text: 'Listo para ayudarte',
        color: 'text-gray-400'
      };
    }
    
    if (isProcessing) {
      return {
        icon: <Clock className="w-4 h-4 animate-spin" />,
        text: 'Procesando tu solicitud...',
        color: 'text-blue-400'
      };
    }
    
    if (lastAgentMessage?.isComplete) {
      return {
        icon: <CheckCircle className="w-4 h-4" />,
        text: 'Conversación lista para continuar',
        color: 'text-green-400'
      };
    }
    
    return {
      icon: <Bot className="w-4 h-4" />,
      text: `${userMessagesCount} mensaje${userMessagesCount !== 1 ? 's' : ''} enviado${userMessagesCount !== 1 ? 's' : ''}`,
      color: 'text-gray-400'
    };
  };
  
  const statusInfo = getStatusInfo();
  
  return (
    <div className="flex items-center text-sm px-3 py-2 bg-gray-800 rounded-lg">
      <div className={`mr-2 ${statusInfo.color}`}>
        {statusInfo.icon}
      </div>
      <span className="text-gray-300 truncate">
        {statusInfo.text}
      </span>
    </div>
  );
};

export default ConversationStatus;