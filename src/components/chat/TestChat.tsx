// src/components/chat/TestChat.tsx
'use client';

import { useState } from 'react';

export default function TestChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "¡Hola! Este es un chat de prueba para verificar que el panel derecho funciona correctamente.", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user"
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue("");
      
      // Simular respuesta del bot
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Recibí tu mensaje. Esto confirma que el panel derecho está funcionando correctamente.",
          sender: "bot"
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Chat de Prueba</h3>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-800 text-gray-100 rounded-bl-none'
              }`}
            >
              <div className="text-sm">{message.text}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="border-t border-gray-700 p-3 bg-gray-800">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe un mensaje de prueba..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}