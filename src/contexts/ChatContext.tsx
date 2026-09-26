// src/contexts/ChatContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ChatContextType {
  initialMessage: string | null;
  setInitialMessage: (message: string | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  useEffect(() => {
    // Escuchar el evento personalizado para abrir el chat con un mensaje
    const handleOpenChat = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setInitialMessage(customEvent.detail);
      }
    };

    window.addEventListener('openChatWithMessage', handleOpenChat as EventListener);
    
    return () => {
      window.removeEventListener('openChatWithMessage', handleOpenChat as EventListener);
    };
  }, []);

  return (
    <ChatContext.Provider value={{ initialMessage, setInitialMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  
  // En lugar de lanzar un error, devolvemos valores por defecto
  // Esto previene errores cuando el contexto no está disponible
  if (context === undefined) {
    console.warn('[ChatContext] useChat debe ser usado dentro de un ChatProvider. Devolviendo valores por defecto.');
    return {
      initialMessage: null,
      setInitialMessage: () => {
        console.warn('[ChatContext] setInitialMessage llamado fuera de ChatProvider');
      }
    };
  }
  
  return context;
}