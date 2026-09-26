// src/components/landing/HeroSectionWrapper.tsx
// Wrapper para HeroSection que maneja el contexto de manera segura

"use client";

import { useState, useEffect } from 'react';
import HeroSectionSafe from '@/components/landing/HeroSectionSafe';

export default function HeroSectionWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Función para abrir el chat con un mensaje
  const handleOpenChat = (message: string) => {
    try {
      // Enviar un evento personalizado que puede ser capturado por el ChatProvider
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('openChatWithMessage', { detail: message }));
      }
    } catch (error) {
      console.error('[HeroSectionWrapper] Error al abrir chat:', error);
    }
  };

  // Si no estamos en el cliente, mostrar un placeholder
  if (!isClient) {
    return (
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0C1116] py-12">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="h-20 bg-gray-800 rounded animate-pulse mb-8 mx-auto max-w-4xl"></div>
            <div className="h-12 bg-gray-800 rounded animate-pulse mb-6 mx-auto max-w-2xl"></div>
            <div className="h-6 bg-gray-800 rounded animate-pulse mb-4 mx-auto max-w-xl"></div>
            <div className="h-6 bg-gray-800 rounded animate-pulse mb-12 mx-auto max-w-lg"></div>
            <div className="flex justify-center gap-4">
              <div className="h-12 w-48 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-12 w-48 bg-gray-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Mostrar el hero section con funcionalidad de chat
  return <HeroSectionSafe onOpenChat={handleOpenChat} />;
}