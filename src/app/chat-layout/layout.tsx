// src/app/chat-layout/layout.tsx
// Layout para páginas con chat - Arquitectura dual panel

import BaseLayout from '@/app/base-layout';
import RightPanelChat from '@/components/landing/RightPanelChat';
import NavbarWrapper from '@/components/landing/NavbarWrapper';
import TenantInfoDisplay from '@/components/TenantInfoDisplay';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseLayout>
      <div className="min-h-screen bg-[#0C1116]">
        <div className="fixed top-0 left-0 w-full z-[9999]">
          <NavbarWrapper />
        </div>
        <div className="pt-[72px]">
          <TenantInfoDisplay />

          {/* Versión desktop - Layout dual panel */}
          <div className="hidden md:flex">
            {/* Panel izquierdo - Contenido con scroll */}
            <div className="flex-1 overflow-y-auto pr-[420px]">
              <main>
                {children}
              </main>
            </div>

            {/* Panel derecho - Asistente IA fijo */}
            <div className="fixed top-[72px] right-0 w-[420px] h-[calc(100vh-72px)] z-[9998] border-l border-[rgba(255,255,255,0.07)]">
              <div 
                className="h-full"
                style={{
                  background: 'linear-gradient(145deg, #0D1117, #10151B)',
                }}
              >
                <RightPanelChat />
              </div>
            </div>
          </div>

          {/* Versión mobile */}
          <div className="md:hidden flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto p-4">
              <main>
                {children}
              </main>
            </div>
            
            {/* Chat container centrado en mobile */}
            <div className="mx-4 mb-6 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)]">
              <div 
                className="backdrop-blur-2xl rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, #0D1117, #10151B)',
                }}
              >
                <RightPanelChat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}