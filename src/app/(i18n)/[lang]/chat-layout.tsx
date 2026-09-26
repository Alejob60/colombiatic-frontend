// src/app/(i18n)/[lang]/chat-layout.tsx
// Layout específico para páginas que necesitan el panel de chat

import RightPanelChat from '@/components/landing/RightPanelChat';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0C1116] flex flex-col lg:flex-row">
      {/* Panel izquierdo - Contenido de la landing */}
      <div className="flex-1 overflow-y-auto">
        <main>
          {children}
        </main>
      </div>

      {/* Panel derecho - Chat fijo */}
      <div className="w-full lg:w-[420px] h-[400px] lg:h-screen border-t lg:border-t-0 lg:border-l" 
           style={{ 
             backgroundColor: '#0D1117',
             borderColor: 'rgba(255,255,255,0.07)'
           }}>
        <div className="h-full">
          <RightPanelChat />
        </div>
      </div>
    </div>
  );
}