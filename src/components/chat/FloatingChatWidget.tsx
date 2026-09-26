'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircleIcon, XIcon, BotIcon, SettingsIcon } from 'lucide-react';
import ColombiaticChatInterface from './ColombiaticChatInterface';
import ChatSettingsPanel from './ChatSettingsPanel';
import { useChatPreferences, ChatPreferences } from '@/hooks/useChatPreferences';

const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { preferences, updatePreferences, getSizeClasses, getPositionClasses } = useChatPreferences();

  // Simular mensajes no leídos
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setUnreadCount(prev => prev < 9 ? prev + 1 : 9);
      }, 30000); // Incrementar cada 30 segundos cuando el chat está cerrado
      
      return () => clearInterval(interval);
    } else {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const savePreferences = (newPreferences: ChatPreferences) => {
    updatePreferences(newPreferences);
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className={`fixed ${getPositionClasses()} bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 hover:scale-110`}
          aria-label="Abrir chat con asistente AI"
        >
          <div className="relative">
            <MessageCircleIcon className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </button>
      )}

      {/* Ventana de chat */}
      {isOpen && (
        <div className={`fixed ${getPositionClasses()} z-50`}>
          <div className={`bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : getSizeClasses()
          }`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BotIcon className="h-5 w-5" />
                <span className="font-semibold">Asistente AI</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={openSettings}
                  className="text-white hover:bg-white/20 rounded p-1 transition-colors"
                  aria-label="Configuración"
                >
                  <SettingsIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={minimizeChat}
                  className="text-white hover:bg-white/20 rounded p-1 transition-colors"
                  aria-label={isMinimized ? "Maximizar chat" : "Minimizar chat"}
                >
                  {isMinimized ? '□' : '−'}
                </button>
                <button
                  onClick={closeChat}
                  className="text-white hover:bg-white/20 rounded p-1 transition-colors"
                  aria-label="Cerrar chat"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Contenido del chat */}
            {!isMinimized && (
              <div className="h-[calc(100%-52px)]">
                <ColombiaticChatInterface />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Panel de configuración */}
      <ChatSettingsPanel
        isOpen={isSettingsOpen}
        onClose={closeSettings}
        onSave={savePreferences}
        initialPreferences={preferences}
      />
    </>
  );
};

export default FloatingChatWidget;