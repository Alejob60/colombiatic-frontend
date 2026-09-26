// src/components/dashboard/DashboardChatPanel.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import * as metaAgentService from '@/services/metaAgentService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function DashboardChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente IA conectado a los meta-agentes. ¿En qué puedo ayudarte hoy?',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agentId, setAgentId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  // Initialize meta agent
  useEffect(() => {
    const initializeAgent = async () => {
      try {
        // In a real implementation, you would either:
        // 1. Use an existing agent ID from user context
        // 2. Create a new agent for this user
        // For now, we'll simulate having an agent ID
        setAgentId('colombiatic-dashboard-agent-001');
      } catch (error) {
        console.error('Failed to initialize meta agent:', error);
      }
    };

    initializeAgent();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Process message through meta agent if available
      if (agentId) {
        try {
          const response = await metaAgentService.processMessageThroughMetaAgent(
            agentId,
            inputValue,
            {
              context: 'dashboard',
              user: 'current_user',
              timestamp: new Date().toISOString()
            }
          );
          
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: response?.response || 'Gracias por tu mensaje. He procesado tu solicitud a través de los meta-agentes.',
            sender: 'ai',
            timestamp: new Date(),
          };

          setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
          console.error('Meta agent processing error:', error);
          // Fallback response
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: 'Gracias por tu mensaje. Soy un asistente de IA conectado a los meta-agentes. ¿Tienes alguna pregunta específica sobre tus métricas o necesitas ayuda con alguna funcionalidad?',
            sender: 'ai',
            timestamp: new Date(),
          };

          setMessages(prev => [...prev, aiMessage]);
        }
      } else {
        // Simulate AI response - in a real app, this would call the API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Gracias por tu mensaje. Soy un asistente de IA conectado a los meta-agentes. ¿Tienes alguna pregunta específica sobre tus métricas o necesitas ayuda con alguna funcionalidad?',
          sender: 'ai',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, tuve un problema para procesar tu mensaje. Por favor, inténtalo de nuevo.',
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-700 text-white'
              }`}>
                {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="bg-gray-800 text-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-end space-x-2">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={1}
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="bg-primary text-white rounded-lg p-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}