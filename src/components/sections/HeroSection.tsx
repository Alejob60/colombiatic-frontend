// src/components/sections/HeroSection.tsx
'use client';

import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0C1116] px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#5EA0FF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#3BA5FF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#E6EDF3] to-[#A9B8C6]">
              Transforma tu negocio
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#5EA0FF] to-[#3BA5FF] mt-3">
              con IA empresarial
            </span>
          </h1>
          
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-[#A3B4C8] mb-10">
            Automatiza procesos, aumenta ventas y reduce esfuerzo operativo con nuestra plataforma de inteligencia artificial.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-[#1E90FF] to-[#3BA5FF] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center group hover:from-[#3BA5FF] hover:to-[#1E90FF]">
              Comenzar ahora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 bg-transparent border border-[rgba(255,255,255,0.1)] text-[#E6EDF3] font-bold rounded-xl transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]">
              Ver demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}