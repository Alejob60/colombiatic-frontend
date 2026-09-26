// src/components/chat/FallbackChat.tsx
// Componente de chat de respaldo que no requiere conexión con el backend

"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'agent' | 'error' | 'system';
  content: string;
  timestamp: Date;
}

const FallbackChat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'agent',
      content: '¡Hola! Soy tu asistente IA de ColombiaTIC. Actualmente no puedo conectarme al servidor, pero estoy aquí para ayudarte.',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simular respuesta del asistente
    setTimeout(() => {
      const responses = [
        "Gracias por tu mensaje. Estoy teniendo problemas de conexión temporalmente.",
        "Lamento no poder ayudarte en este momento. Por favor, inténtalo más tarde.",
        "Estoy experimentando dificultades técnicas. ¿Hay algo más en lo que pueda ayudarte?",
        "No puedo procesar tu solicitud en este momento debido a problemas de conexión."
      ];
      
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'agent',
        content: '¡Hola! Soy tu asistente IA de ColombiaTIC. Actualmente no puedo conectarme al servidor, pero estoy aquí para ayudarte.',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Asistente IA ColombiaTIC</h3>
        <button 
          onClick={clearChat}
          className="text-gray-400 hover:text-white transition-colors"
          title="Limpiar chat"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <div className="bg-gray-800 p-4 rounded-full mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
            </div>
            <h4 className="text-lg font-medium mb-2">¡Hola! Soy tu asistente IA de ColombiaTIC</h4>
            <p className="text-sm max-w-xs">
              Actualmente no puedo conectarme al servidor, pero estoy aquí para ayudarte.
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
                    : 'bg-gray-800 text-gray-100 rounded-bl-none'
                }`}
              >
                <div className="text-sm">{msg.content}</div>
                <div className="text-xs opacity-50 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
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
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
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

export default FallbackChat;