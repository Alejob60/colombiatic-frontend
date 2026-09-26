// src/components/sections/BenefitsSection.tsx
'use client';

import { CheckCircle } from 'lucide-react';

const benefits = [
  {
    title: "Implementación Rápida",
    description: "Activa tu solución de IA en menos de 48 horas con nuestro proceso optimizado."
  },
  {
    title: "ROI Garantizado",
    description: "Incrementa tus ventas y reduce costos operativos con métricas medibles."
  },
  {
    title: "Integración Total",
    description: "Conectamos con tus canales existentes: WhatsApp, web, redes sociales y más."
  },
  {
    title: "Soporte Continuo",
    description: "Equipo especializado disponible 24/7 para optimizar tu experiencia."
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-[#0C1116] px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#5EA0FF] to-[#3BA5FF] bg-clip-text text-transparent">
              Beneficios
            </span>{' '}
            Exclusivos
          </h2>
          <p className="text-[#A3B4C8] max-w-2xl mx-auto text-lg">
            Descubre por qué miles de empresas eligen nuestra plataforma para transformar sus operaciones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#3BA5FF]/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#3BA5FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">{benefit.title}</h3>
              <p className="text-[#A3B4C8]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}