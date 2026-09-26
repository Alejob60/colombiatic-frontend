// src/app/services/[id]/page.tsx
"use client";

import ServiceDetailPage from '@/components/landing/ServiceDetailPage';
import RightPanelChat from '@/components/landing/RightPanelChat';

export default function ServiceDetail() {
  return (
    <div className="min-h-screen bg-[#0C1116]">
      <div className="flex pt-16">
        {/* Panel izquierdo - Contenido del servicio con scroll */}
        <div className="flex-1 overflow-y-auto">
          <ServiceDetailPage />
        </div>
        
        {/* Panel derecho - Asistente IA fijo */}
        <div className="hidden lg:block w-[420px] fixed top-16 right-0 h-[calc(100vh-4rem)] z-40">
          <div 
            className="h-full rounded-l-2xl backdrop-blur-2xl"
            style={{
              background: 'linear-gradient(145deg, #0D1117, #10151B)',
              borderLeft: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '-4px 0 18px rgba(0,0,0,0.35)'
            }}
          >
            <RightPanelChat />
          </div>
        </div>
      </div>
    </div>
  );
}