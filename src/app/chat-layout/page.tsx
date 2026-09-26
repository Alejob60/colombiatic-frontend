// src/app/chat-layout/page.tsx
'use client';

import { useState } from 'react';
import ChatPanel from '@/components/layout/ChatPanel';
import HeroSectionWrapper from '@/components/landing/HeroSectionWrapper';
import FeaturesSection from '@/components/sections/FeaturesSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import CasesSection from '@/components/sections/CasesSection';
import DemoSection from '@/components/sections/DemoSection';
import Footer from '@/components/layout/Footer';

export default function ChatLayoutPage() {
  return (
    <div className="min-h-screen bg-[#0C1116] flex">
      {/* Panel izquierdo - Contenido de la landing */}
      <div className="flex-1 overflow-y-auto">
        <main>
          <HeroSectionWrapper />
          <BenefitsSection />
          <FeaturesSection />
          <CasesSection />
          <DemoSection />
          <Footer />
        </main>
      </div>

      {/* Panel derecho - Chat fijo */}
      <div className="hidden lg:block w-[400px] fixed right-0 top-0 h-screen z-50">
        <ChatPanel />
      </div>
    </div>
  );
}