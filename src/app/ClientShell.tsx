'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import RightPanelChat from '@/components/landing/RightPanelChat';
import { MetaAgentProvider } from '@/contexts/MetaAgentContext';
import { TenantProvider } from '@/contexts/TenantContext';
import { ChatProvider } from '@/contexts/ChatContext';

export default function ClientShell() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <TenantProvider>
      <ChatProvider>
        <MetaAgentProvider>
          {ready ? (
            <>
              <Navbar />
              <RightPanelChat />
            </>
          ) : (
            // Placeholder para evitar hydration mismatch
            <nav className="fixed top-0 left-0 w-full h-[72px] z-[9999] bg-[#0C1116] border-b border-white/10">
              <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
                <div className="hidden md:block">
                  <div className="flex items-center space-x-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                    ))}
                    <div className="h-8 w-48 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="md:hidden w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </nav>
          )}
        </MetaAgentProvider>
      </ChatProvider>
    </TenantProvider>
  );
}