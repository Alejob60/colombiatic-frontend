// src/components/dashboard/DashboardAIChat.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle, Bot, HelpCircle } from 'lucide-react';

declare global {
  interface Window {
    DashboardAIChat?: {
      open: () => void;
      close: () => void;
      send: (message: string) => void;
      isOpen: boolean;
    };
  }
}

export default function DashboardAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente IA para el dashboard. ¿En qué puedo ayudarte hoy? Puedo ayudarte con configuraciones, métricas, o resolver dudas sobre tus servicios.",
      sender: "bot"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Registrar el objeto global DashboardAIChat
  useEffect(() => {
    window.DashboardAIChat = {
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      send: (message: string) => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: message,
          sender: "user"
        }]);
      },
      isOpen: isOpen
    };

    return () => {
      window.DashboardAIChat = undefined;
    };
  }, [isOpen]);

  // Scroll al final de los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Agregar mensaje del usuario
      const userMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user"
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue("");

      // Simular respuesta del bot después de un breve retraso
      setTimeout(() => {
        const botResponses = [
          "Entiendo tu pregunta. Basado en tu configuración actual, te recomendaría revisar los ajustes de personalización en la sección de configuración.",
          "Excelente pregunta. Para ese servicio específico, puedes encontrar más detalles en la documentación técnica disponible en el panel de ayuda.",
          "Basado en las métricas actuales, veo que hay oportunidades de mejora. Te sugiero revisar las recomendaciones automáticas en la sección de insights.",
          "Puedo ayudarte con eso. ¿Te gustaría que active una configuración específica o que te guíe paso a paso?",
          "Gracias por tu consulta. Estoy procesando la información y te responderé en breve. Mientras tanto, ¿hay algo más en lo que pueda ayudarte?"
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const botResponse = {
          id: messages.length + 2,
          text: randomResponse,
          sender: "bot"
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fixed bottom-6 right-6 w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-blue-700 transition-colors"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <HelpCircle className="w-8 h-8 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-full max-w-md h-[70vh] max-h-[600px] flex flex-col bg-surface border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50"
            initial={{ opacity: 0, y: 20, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-primary">
              <div className="flex items-center space-x-2">
                <Bot className="w-6 h-6 text-white" />
                <span className="font-semibold text-white">Asistente IA del Dashboard</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-gray-800 text-gray-100 rounded-bl-none'
                  }`}>
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-gray-700 p-4">
              <div className="flex items-end space-x-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[40px] max-h-[120px]"
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-primary text-white rounded-lg p-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}