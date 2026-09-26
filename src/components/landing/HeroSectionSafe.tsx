// src/components/landing/HeroSectionSafe.tsx
// Versión segura del HeroSection que no depende directamente del ChatContext

"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Message {
  primary: string;
  secondary: string;
  description: string;
  cta: string;
}

export default function HeroSectionSafe({ onOpenChat }: { onOpenChat?: (message: string) => void }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [locale, setLocale] = useState<'es' | 'en'>('es');

  // Mensajes en ambos idiomas
  const messages: Record<'es' | 'en', Message[]> = {
    es: [
      {
        primary: "Transforma tu negocio",
        secondary: "con IA empresarial",
        description: "Automatiza procesos, aumenta ventas y reduce esfuerzo operativo",
        cta: "Implementa Agentes IA Que manejan los mensajes de tus clientes como el mejor vendedor humano"
      },
      {
        primary: "Potencia tu empresa",
        secondary: "con inteligencia artificial",
        description: "Soluciones personalizadas que escalan con tu negocio",
        cta: "Implementa Agentes IA Que manejan los mensajes de tus clientes como el mejor vendedor humano"
      },
      {
        primary: "Automatiza tu crecimiento",
        secondary: "con agentes inteligentes",
        description: "Delega tareas repetitivas y enfócate en lo estratégico",
        cta: "Implementa Agentes IA Que manejan los mensajes de tus clientes como el mejor vendedor humano"
      }
    ],
    en: [
      {
        primary: "Transform your business",
        secondary: "with enterprise AI",
        description: "Automate processes, increase sales and reduce operational effort",
        cta: "Implement AI Agents That Handle Customer Messages Like The Best Human Salesperson"
      },
      {
        primary: "Empower your company",
        secondary: "with artificial intelligence",
        description: "Custom solutions that scale with your business",
        cta: "Implement AI Agents That Handle Customer Messages Like The Best Human Salesperson"
      },
      {
        primary: "Automate your growth",
        secondary: "with intelligent agents",
        description: "Delegate repetitive tasks and focus on strategy",
        cta: "Implement AI Agents That Handle Customer Messages Like The Best Human Salesperson"
      }
    ]
  };

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      // Detectar el idioma del navegador o usar 'es' por defecto
      const browserLang = navigator.language;
      const detectedLocale: 'es' | 'en' = browserLang.startsWith('en') ? 'en' : 'es';
      setLocale(detectedLocale);
      
      // Seleccionar un mensaje aleatorio al cargar el componente
      const randomIndex = Math.floor(Math.random() * messages[detectedLocale].length);
      setCurrentMessageIndex(randomIndex);
    }
  }, []);

  const currentMessage = messages[locale][currentMessageIndex];

  // Función para abrir el chat con un mensaje predefinido
  const openChatWithMessage = () => {
    const diagnosticMessage = locale === 'es' 
      ? "quiero un diagnóstico y una cotización" 
      : "I want a diagnosis and quotation";
    
    // Llamar a la función proporcionada por el padre si existe
    if (onOpenChat) {
      onOpenChat(diagnosticMessage);
    }
  };

  // Función para desplazarse a la sección de soluciones
  const scrollToSolutions = () => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      const solutionsSection = document.getElementById('soluciones-principales');
      if (solutionsSection) {
        solutionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0C1116] py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0066FF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#00C2FF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <motion.h1 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block relative">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#E6EDF3] to-[#A9B8C6]">
                {currentMessage.primary}
              </span>
              <span className="absolute inset-0 text-[#E6EDF3] blur-[2px] z-0 opacity-30">
                {currentMessage.primary}
              </span>
            </span>
            <span className="block relative mt-3">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#3BA5FF] to-[#5EA0FF]">
                {currentMessage.secondary}
              </span>
              <span className="absolute inset-0 text-[#3BA5FF] blur-[2px] z-0 opacity-30">
                {currentMessage.secondary}
              </span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl lg:text-2xl text-[#94A3B8] mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block mb-4">{currentMessage.description}</span>
            <span className="block font-medium text-[#3BA5FF] text-base sm:text-lg md:text-xl">
              {currentMessage.cta}
            </span>
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={openChatWithMessage}
              className="px-6 py-4 md:px-8 md:py-5 font-bold rounded-xl transition-all duration-300 flex items-center justify-center group text-base md:text-lg"
              style={{
                background: 'linear-gradient(135deg, #18181B, #27272A)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                boxShadow: 'inset 0 0 12px rgba(0, 194, 255, 0.2), 0 0 18px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #27272A, #3F3F46)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #18181B, #27272A)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {locale === 'es' ? 'Solicitar Diagnóstico' : 'Request Diagnosis'}
              <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={scrollToSolutions}
              className="px-6 py-4 md:px-8 md:py-5 font-bold rounded-xl transition-all duration-300 flex items-center justify-center text-base md:text-lg"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#94A3B8',
                boxShadow: '0 0 16px rgba(0,0,0,0.45)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = '#E6EDF3';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = '#94A3B8';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {locale === 'es' ? 'Explorar Soluciones' : 'Explore Solutions'}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}