// src/components/sections/DemoSection.tsx
'use client';

export default function DemoSection() {
  return (
    <section className="py-20 bg-[#0C1116] px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="bg-gradient-to-r from-[#5EA0FF] to-[#3BA5FF] bg-clip-text text-transparent">
            Prueba Nuestra
          </span>{' '}
          Plataforma
        </h2>
        <p className="text-[#A3B4C8] text-lg mb-10 max-w-2xl mx-auto">
          Experimenta firsthand cómo nuestra IA puede transformar tu negocio. Agenda una demostración personalizada en menos de 24 horas.
        </p>
        
        <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.07)] max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3BA5FF] mb-2">48h</div>
              <div className="text-[#A3B4C8]">Implementación</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3BA5FF] mb-2">99%</div>
              <div className="text-[#A3B4C8]">Satisfacción</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3BA5FF] mb-2">24/7</div>
              <div className="text-[#A3B4C8]">Soporte</div>
            </div>
          </div>
          
          <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#1E90FF] to-[#3BA5FF] text-white font-bold rounded-xl transition-all duration-300 hover:from-[#3BA5FF] hover:to-[#1E90FF]">
            Solicitar Demostración
          </button>
        </div>
      </div>
    </section>
  );
}