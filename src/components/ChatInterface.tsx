// src/components/ChatInterface.tsx
"use client";

import React from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import DashboardChat from '@/components/chat/DashboardChat';

interface ChatInterfaceProps {
  toggleChat?: () => void;
  isChatOpen?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ toggleChat, isChatOpen = true }) => {
  const { isLoggedIn, loading } = useAuthState();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex flex-col h-full bg-gray-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Render Dashboard Chat (for authenticated users in dashboard)
  // Landing chat is handled via RightPanelChat component
  return (
    <DashboardChat 
      isChatOpen={isChatOpen} 
      toggleChat={toggleChat || (() => {})} 
    />
  );
};

export default ChatInterface;