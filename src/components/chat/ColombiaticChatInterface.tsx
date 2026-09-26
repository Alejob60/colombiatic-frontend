'use client';

import React, { useState, useEffect, useRef } from 'react';
import colombiaticAgentService, { AgentResponse } from '@/services/colombiaticAgentService';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { SendIcon, BotIcon, UserIcon, LoaderIcon, TrashIcon, DownloadIcon, UploadIcon } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  isError?: boolean;
  missingInfo?: string[];
}

const ColombiaticChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { token } = useAuth();
  const { tenant } = useTenant();

  useEffect(() => {
    // Limpiar sesiones expiradas al iniciar
    colombiaticAgentService.cleanupExpiredSessions();
    
    // Generar sesión al cargar el componente
    const newSessionId = colombiaticAgentService.generateSessionId();
    setSessionId(newSessionId);
    
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
    colombiaticAgentService.onAgentUpdate((data) => {
      console.log('Actualización de agente:', data);
    });

    colombiaticAgentService.onTaskProgress((data) => {
      console.log('Progreso de tarea:', data);
    });

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    
    try {
      // Enviar mensaje al agente
      const response: AgentResponse = await colombiaticAgentService.sendMessage(inputMessage, {
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
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: 'error-' + Date.now(),
        text: 'Lo siento, hubo un error procesando tu mensaje. Por favor intenta de nuevo.',
        sender: 'agent',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    const newSessionId = colombiaticAgentService.generateSessionId();
    setSessionId(newSessionId);
    
    const welcomeMessage: ChatMessage = {
      id: 'welcome-' + Date.now(),
      text: '¡Hola! Soy tu asistente AI de ColombiaTIC. ¿En qué puedo ayudarte hoy?',
      sender: 'agent',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  };

  const exportChat = () => {
    const chatData = {
      sessionId,
      timestamp: new Date().toISOString(),
      messages: messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString()
      }))
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `colombiatic-chat-${sessionId.substring(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importChat = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const chatData = JSON.parse(content);
        
        if (chatData.messages && Array.isArray(chatData.messages)) {
          // Convertir timestamps a objetos Date
          const parsedMessages = chatData.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          
          setMessages(parsedMessages);
          if (chatData.sessionId) {
            setSessionId(chatData.sessionId);
          }
        }
      } catch (error) {
        alert('Error al importar el archivo de chat');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BotIcon className="h-6 w-6" />
            <div>
              <h3 className="font-semibold text-lg">Asistente ColombiaTIC AI</h3>
              <p className="text-blue-100 text-sm">Sesión ID: {sessionId.substring(0, 12)}...</p>
            </div>
          </div>
          <div className="flex gap-2">
            <label className="cursor-pointer text-white hover:bg-white/20 rounded p-1 transition-colors" title="Importar conversación">
              <UploadIcon className="h-4 w-4" />
              <input 
                type="file" 
                accept=".json" 
                className="hidden" 
                onChange={importChat} 
              />
            </label>
            <button 
              onClick={exportChat}
              className="text-white hover:bg-white/20 rounded p-1 transition-colors"
              title="Exportar conversación"
            >
              <DownloadIcon className="h-4 w-4" />
            </button>
            <button 
              onClick={clearChat}
              className="text-white hover:bg-white/20 rounded p-1 transition-colors"
              title="Limpiar chat"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : message.isError 
                    ? 'bg-red-50 border border-red-200 text-red-800 rounded-bl-none'
                    : 'bg-white border border-gray-200 rounded-bl-none'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.sender === 'agent' && (
                  <BotIcon className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
                )}
                {message.sender === 'user' && (
                  <UserIcon className="h-4 w-4 mt-0.5 flex-shrink-0 text-white" />
                )}
                <div>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  
                  {message.sender === 'agent' && message.missingInfo && message.missingInfo.length > 0 && (
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-xs text-yellow-800 font-medium">Información adicional necesaria:</p>
                      <ul className="mt-1 text-xs text-yellow-700 list-disc list-inside">
                        {message.missingInfo.map((info, index) => (
                          <li key={index}>{info}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 max-w-[80%]">
              <div className="flex items-center gap-2">
                <BotIcon className="h-4 w-4 text-blue-500" />
                <div className="flex items-center gap-1">
                  <LoaderIcon className="h-4 w-4 animate-spin text-blue-500" />
                  <span className="text-gray-600">Escribiendo...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Container */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje aquí..."
            disabled={isLoading}
            rows={2}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg p-2 h-fit self-end transition-colors"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Presiona Enter para enviar, Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
};

export default ColombiaticChatInterface;