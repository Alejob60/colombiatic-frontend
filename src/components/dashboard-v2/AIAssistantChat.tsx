// src/components/dashboard-v2/AIAssistantChat.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  Minimize2,
  Maximize2,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { useDashboardStore, Message } from '@/store/useDashboardStore';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useChatSession } from '@/hooks/useChatSession';
import { useRestoreContextOnMount } from '@/hooks/useRestoreContextOnMount';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AIAssistantChat() {
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const isAuthenticated = !!user;

  // Use new chat session hook for Sprint 1
  const {
    messages: chatMessages,
    isLoading: chatLoading,
    sendMessage: sendChatMessage,
    clearMessages: clearChatMessages,
  } = useChatSession({
    isAuthenticated,
    currentLocation: 'dashboard',
  });

  // Restore context after login (Sprint 1 Story 1.3)
  useRestoreContextOnMount({
    isAuthenticated,
    sendMessage: sendChatMessage,
    isInDashboard: true,
  });

  const {
    messages,
    isTyping,
    isConnected,
    conversationId,
    clearMessages,
  } = useDashboardStore();

  const { sendMessage, executeAction } = useChatSocket(user?.id);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, chatMessages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Use new chat session for Sprint 1
    sendChatMessage(input.trim());
    setInput('');
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const handleActionClick = (action: string, data?: Record<string, any>) => {
    executeAction(action, data);
  };

  const handleClearChat = () => {
    if (confirm('¿Estás seguro de que quieres borrar el historial del chat?')) {
      clearChatMessages();
      clearMessages();
    }
  };

  // Merge messages from both systems (for transition period)
  const allMessages = [...chatMessages.map(msg => ({
    id: msg.id,
    role: msg.role,
    content: msg.text,
    timestamp: msg.timestamp.toISOString(),
    quickReplies: [] as string[],
    actions: [] as any[],
    metadata: undefined,
  })), ...messages];

  return (
    <motion.aside
      initial={{ width: isMinimized ? 60 : 384 }}
      animate={{ width: isMinimized ? 60 : 384 }}
      transition={{ duration: 0.3 }}
      className="h-screen sticky top-0 bg-gray-900 border-l border-gray-800 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isMinimized && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  {isConnected && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Tu IA Personal</h3>
                  <p className="text-xs text-gray-400">
                    {isConnected ? 'Conectado' : 'Desconectado'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1">
            {!isMinimized && (
              <>
                <button
                  onClick={handleClearChat}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  title="Borrar historial"
                >
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </button>
              </>
            )}
            
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4 text-gray-400" />
              ) : (
                <Minimize2 className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {!isMinimized && conversationId && (
          <div className="mt-2 text-xs text-gray-500">
            ID: {conversationId.substring(0, 8)}...
          </div>
        )}
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1 min-h-0"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {allMessages.length === 0 && (
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                  <p className="text-gray-400 text-sm">
                    ¡Hola! Soy tu IA Personal.
                    <br />
                    ¿En qué puedo ayudarte hoy?
                  </p>
                </div>
              )}

              {allMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.role === 'system'
                        ? 'bg-purple-900/50 text-purple-100 border border-purple-700/50'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>

                    {('metadata' in message) && message.metadata?.data && (
                      <div className="mt-2 p-2 bg-black/20 rounded text-xs">
                        <pre className="text-gray-300 overflow-x-auto">
                          {JSON.stringify(message.metadata.data, null, 2)}
                        </pre>
                      </div>
                    )}

                    {/* Quick Replies */}
                    {message.quickReplies && message.quickReplies.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.quickReplies.map((reply, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickReply(reply)}
                            className="w-full text-left px-3 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-sm text-gray-300 hover:text-white transition-colors"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.actions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleActionClick(action.action, action.data)}
                            className="w-full text-left px-3 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-sm text-white transition-colors font-medium"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <p className="text-xs opacity-50 mt-2">
                      {format(new Date(message.timestamp), 'HH:mm', { locale: es })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {(isTyping || chatLoading) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800 rounded-2xl p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu mensaje..."
                  disabled={!isConnected && !isAuthenticated}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || (!isConnected && !isAuthenticated)}
                  className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>

              {!isConnected && !isAuthenticated && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Reconectando...
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized view */}
      {isMinimized && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          {/* Botón burbuja cuando está minimizado */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-xl z-50"
          >
            <Sparkles className="w-6 h-6 text-white" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                {unreadCount}
              </div>
            )}
          </motion.button>
          
          {/* Versión minimizada en el sidebar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {isConnected && (
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>
      )}
    </motion.aside>
  );
}
