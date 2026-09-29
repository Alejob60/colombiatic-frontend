// src/components/chat/ColombiaTICChat.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { useMetaAgent } from '@/contexts/MetaAgentContext';
import { useTranslations } from '@/lib/i18n';
import { Send, RotateCcw } from 'lucide-react';

// Definir la interfaz para los mensajes
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

const ColombiaTICChat = () => {
  const { t } = useTranslations();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Manejar errores de contexto
  let messages: ChatMessage[] = [];
  let isProcessing = false;
  let sendMessage = async (message: string) => {
    console.warn('[ColombiaTICChat] sendMessage no disponible - MetaAgent no conectado');
  };
  let clearChat = () => {
    console.warn('[ColombiaTICChat] clearChat no disponible - MetaAgent no conectado');
  };
  let connectionError = false;
  
  try {
    const metaAgentData = useMetaAgent();
    messages = metaAgentData.messages;
    isProcessing = metaAgentData.isProcessing;
    sendMessage = metaAgentData.sendMessage;
    clearChat = metaAgentData.clearChat;
    connectionError = metaAgentData.connectionError;
  } catch (error) {
    console.warn('[ColombiaTICChat] Error al acceder al MetaAgentContext:', error);
    // Usar valores por defecto
    messages = [];
    isProcessing = false;
    connectionError = false;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;
    
    await sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getEmotionColor = (emotion?: string) => {
    switch (emotion) {
      case 'excited': return 'text-yellow-400';
      case 'frustrated': return 'text-red-400';
      case 'satisfied': return 'text-green-400';
      case 'curious': return 'text-blue-400';
      case 'confused': return 'text-purple-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end items-center px-3 pt-2">
        <button
          onClick={clearChat}
          aria-label={t('chat.clearChat')}
          title={t('chat.clearChat')}
          className="grid h-7 w-7 place-items-center rounded-lg text-[#94A3B8] transition-colors hover:bg-white/10 hover:text-white"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {connectionError ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <div className="bg-gray-800 p-4 rounded-full mb-4">
              <div className="bg-gradient-to-br from-red-500 to-orange-600 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">!</span>
              </div>
            </div>
            <h4 className="text-lg font-medium mb-2 text-red-400">{t('chat.errorConnection')}</h4>
            <p className="text-sm max-w-xs text-gray-400">
              {t('chat.errorConnectionBody')}
            </p>
            <button
              onClick={clearChat}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              {t('chat.retry')}
            </button>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <div className="bg-gray-800 p-4 rounded-full mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
            </div>
            <h4 className="text-lg font-medium mb-2 text-[#E6EDF3]">{t('chat.greeting')}</h4>
            <p className="text-sm max-w-xs">
              {t('chat.greetingHint')}
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : msg.type === 'error'
                      ? 'bg-red-900 text-red-100 rounded-bl-none'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none'
                }`}
              >
                <div className="text-sm">{msg.content}</div>
                {msg.confidence !== undefined && (
                  <div className="text-xs mt-1 opacity-70">
                    Confianza: {(msg.confidence * 100).toFixed(0)}%
                  </div>
                )}
                {msg.emotion && (
                  <div className={`text-xs mt-1 ${getEmotionColor(msg.emotion)}`}>
                    Emoción: {msg.emotion}
                  </div>
                )}
                {msg.isComplete && msg.targetAgent && (
                  <div className="text-xs mt-1 text-green-400">
                    Listo para enrutar a: {msg.targetAgent}
                  </div>
                )}
                <div className="text-xs opacity-50 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-100 rounded-2xl rounded-bl-none px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700 p-3 bg-gray-800">
        <div className="flex items-end space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.placeholder')}
            className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
            disabled={isProcessing || connectionError}
          />
          <button
            onClick={handleSendMessage}
            disabled={isProcessing || !inputMessage.trim() || connectionError}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg p-2 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-2 text-center">
          Presiona Enter para enviar
        </div>
      </div>
    </div>
  );
};

export default ColombiaTICChat;