// src/components/layout/ChatPanel.tsx
'use client';

import { useState } from 'react';
import { Send, Plus, Menu, X } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
      sender: "bot"
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Agregar mensaje del usuario
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user"
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue("");

      // Simular respuesta del bot después de un breve retraso
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Gracias por tu mensaje. Estoy procesando tu solicitud y te responderé en breve.",
          sender: "bot"
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0C1116] border-l border-[rgba(255,255,255,0.07)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.07)] bg-[#0C1116]/80 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#5EA0FF] to-[#3BA5FF] flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <h2 className="ml-3 text-lg font-semibold text-[#E6EDF3]">Asistente IA</h2>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 rounded-md hover:bg-[rgba(255,255,255,0.04)] transition-colors">
            <Plus className="w-5 h-5 text-[#94A3B8]" />
          </button>
          <button className="p-1 rounded-md hover:bg-[rgba(255,255,255,0.04)] transition-colors lg:hidden">
            <Menu className="w-5 h-5 text-[#94A3B8]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-[#3BA5FF] text-white rounded-br-none'
                  : 'bg-[rgba(255,255,255,0.06)] text-[#E0E5EB] rounded-bl-none border border-[rgba(255,255,255,0.08)]'
              }`}
            >
              <p className="leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.07)]">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="w-full rounded-xl px-4 py-3 resize-none focus:outline-none bg-[rgba(255,255,255,0.06)] text-[#E0E5EB] border border-[rgba(255,255,255,0.08)] focus:border-[#3BA5FF] transition-colors"
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="flex-shrink-0 rounded-full w-11 h-11 flex items-center justify-center bg-gradient-to-r from-[#1E90FF] to-[#3BA5FF] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}