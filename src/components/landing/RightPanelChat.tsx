'use client';

import SmartChatWrapper from '@/components/chat/SmartChatWrapper';

export default function RightPanelChat() {
  return (
    <div className="h-full flex flex-col">
      {/* Header más compacto al estilo ChatGPT */}
      <div className="flex items-center justify-between p-3 border-b" style={{ backgroundColor: '#1A2430', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div>
          <h2 className="text-md font-bold text-[#E6EDF3]">Asistente IA</h2>
          <p className="text-xs text-[#A9B8C6]">En línea</p>
        </div>
      </div>

      {/* Chat Wrapper inteligente */}
      <div className="flex-1 overflow-hidden">
        <SmartChatWrapper />
      </div>
    </div>
  );
}
