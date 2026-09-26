// src/components/dashboard-v2/DashboardLayoutV2.tsx
"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDashboardStore } from '@/store/useDashboardStore';
import SidebarLeft from './SidebarLeft';
import AIAssistantChat from './AIAssistantChat';
import DynamicRenderer from './DynamicRenderer';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';

interface DashboardLayoutV2Props {
  children: React.ReactNode;
}

export default function DashboardLayoutV2({ children }: DashboardLayoutV2Props) {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed, setCurrentRoute } = useDashboardStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Update current route when pathname changes
  useEffect(() => {
    if (pathname) {
      setCurrentRoute(pathname);
    }
  }, [pathname, setCurrentRoute]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {/* Left Sidebar - Fixed */}
      <SidebarLeft />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <DashboardNavbar toggleMenu={toggleMenu} toggleChat={toggleChat} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-hidden">
          <DynamicRenderer>
            {children}
          </DynamicRenderer>
        </main>
      </div>

      {/* Right Chat Panel - Fixed, Always Visible */}
      <AIAssistantChat />
    </div>
  );
}