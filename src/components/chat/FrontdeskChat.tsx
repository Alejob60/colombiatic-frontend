// src/components/chat/FrontdeskChat.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Bot } from 'lucide-react';
import { useChatSession } from '@/hooks/useChatSession';
import { usePendingPurchase } from '@/hooks/usePendingPurchase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface FrontdeskChatProps {
  isOpen?: boolean;
  onClose?: () => void;
  autoOpen?: boolean;
}

const WELCOME_MESSAGE = "Hola, soy tu Asesor IA de ColombiaTIC. Estoy aquí para ayudarte a transformar tu negocio con tecnología de última generación. ¿Qué tienes en mente hoy?";

const QUICK_REPLIES = [
  { id: 1, text: "Quiero actualizar mi sitio web", intent: "website_update" },
  { id: 2, text: "Quiero integrar IA en mi negocio", intent: "ai_integration" },
  { id: 3, text: "Quiero ver los servicios", intent: "view_services" },
  { id: 4, text: "Tengo un proyecto y quiero asesoría", intent: "project_consultation" },
  { id: 5, text: "Quiero comprar un servicio", intent: "purchase" },
];

export default function FrontdeskChat({ isOpen: controlledIsOpen, onClose, autoOpen = true }: FrontdeskChatProps) {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [inputText, setInputText] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user } = useAuth();
  const { savePendingPurchase } = usePendingPurchase();

  const isAuthenticated = !!user;

  const handleIntentDetected = (intent: string, data?: any) => {
    console.log('[FrontdeskChat] Intent detected:', intent, data);

    // Si el usuario no está autenticado y quiere comprar
    if (intent === 'purchase_without_auth' && !isAuthenticated) {
      // Guardar contexto
      savePendingPurchase({
        selectedServiceId: data?.serviceId || 'ai-assistant-pro',
        intent: 'purchase',
        origin: 'landing',
        conversationSummary: data?.conversationSummary || 'El usuario expresó interés en comprar un servicio',
      });

      // Redirigir a login
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    }
  };

  const {
    messages,
    isLoading,
    sendMessage,
    addSystemMessage,
  } = useChatSession({
    isAuthenticated,
    currentLocation: 'landing',
    onIntentDetected: handleIntentDetected,
  });

  // Agregar mensaje de bienvenida al cargar
  useEffect(() => {
    if (messages.length === 0) {
      addSystemMessage(WELCOME_MESSAGE);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsOpen(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const messageText = inputText.trim();
    setInputText('');
    setShowQuickReplies(false);

    await sendMessage(messageText);
  };

  const handleQuickReply = async (reply: typeof QUICK_REPLIES[0]) => {
    setShowQuickReplies(false);
    
    // Si es "comprar" y no está autenticado
    if (reply.intent === 'purchase' && !isAuthenticated) {
      await sendMessage(reply.text, 'purchase');
      
      // Trigger intent detection manually
      handleIntentDetected('purchase_without_auth', {
        serviceId: 'ai-assistant-pro',
        conversationSummary: reply.text,
      });
    } else {
      await sendMessage(reply.text, reply.intent);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const chatOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;

  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-surface/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Asesor IA ColombiaTIC</h3>
                <p className="text-white/80 text-xs">Tu asistente personal</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : message.role === 'system'
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-gray-200 border border-blue-500/30'
                      : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-60 mt-1 block">
                    {message.timestamp.toLocaleTimeString('es-CO', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Quick Replies */}
            {showQuickReplies && messages.length <= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply)}
                    disabled={isLoading}
                    className="w-full text-left bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {reply.text}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-700 rounded-2xl px-4 py-3 flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span className="text-sm text-gray-300">Escribiendo...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700 bg-surface/50">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="bg-primary hover:bg-blue-600 text-white p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
