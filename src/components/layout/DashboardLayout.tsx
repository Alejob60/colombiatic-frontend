// src/components/layout/DashboardLayout.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import DashboardNavbar from '@/components/layout/DashboardNavbar';
import ChatInterface from '@/components/ChatInterface';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // Toggle chat panel on mobile
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Toggle menu panel on mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close panels when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close menu if clicking outside and menu is open
      if (isMenuOpen && window.innerWidth < 768 && 
          !target.closest('.menu-panel') && 
          !target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
      
      // Close chat if clicking outside and chat is open
      if (isChatOpen && window.innerWidth < 768 && 
          !target.closest('.chat-panel') && 
          !target.closest('.chat-toggle')) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isChatOpen]);

  return (
    <div className="dashboard">
      {/* Left Menu Panel */}
      <div className={`menu-panel ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <DashboardSidebar 
          toggleMenu={toggleMenu} 
          isMenuOpen={isMenuOpen}
        />
      </div>

      {/* Center Content Panel with Scroll */}
      <div className="center-panel">
        {/* Navbar */}
        <DashboardNavbar 
          toggleMenu={toggleMenu}
          toggleChat={toggleChat}
        />
        
        {/* Main Content */}
        <div className="p-6">
          {children}
        </div>
      </div>

      {/* Right Chat Panel with Auto-scroll */}
      <div className={`chat-panel ${isChatOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}>
        <ChatInterface 
          toggleChat={toggleChat} 
          isChatOpen={isChatOpen}
        />
      </div>
    </div>
  );
}