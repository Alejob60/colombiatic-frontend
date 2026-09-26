// src/app/industries/page.tsx
"use client";

import Link from 'next/link';

export default function IndustriesPage() {
  const industries = [
    {
      name: "Retail y Comercio Electrónico",
      description: "Potencia tus ventas online y offline con IA que entiende el comportamiento del cliente.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      name: "Salud y Bienestar",
      description: "Mejora la experiencia del paciente y optimiza procesos con asistentes virtuales especializados.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      )
    },
    {
      name: "Finanzas y Banca",
      description: "Automatiza procesos financieros y ofrece asesoría personalizada 24/7 a tus clientes.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      name: "Educación y E-learning",
      description: "Personaliza la experiencia educativa y automatiza la atención al estudiante.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
        </svg>
      )
    },
    {
      name: "Manufactura e Industria 4.0",
      description: "Optimiza la cadena de producción y mantenimiento predictivo con IA industrial.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      )
    },
    {
      name: "Turismo y Hospitalidad",
      description: "Mejora la experiencia del huésped y automatiza reservas con asistentes multilingües.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0C1116] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Industrias que Transformamos
          </h1>
          <p className="text-xl text-[#A9B8C6] max-w-3xl mx-auto">
            Adaptamos nuestra inteligencia artificial a las necesidades específicas de cada sector
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#3BA5FF]/10 flex items-center justify-center mb-4 text-[#3BA5FF]">
                {industry.icon}
              </div>
              <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">{industry.name}</h3>
              <p className="text-[#A3B4C8] mb-4">
                {industry.description}
              </p>
              <Link href="/contact" className="text-[#3BA5FF] hover:text-[#5EA0FF] font-medium">
                Ver soluciones →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.07)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#E6EDF3] mb-4">
              ¿Tu industria no está en la lista?
            </h2>
            <p className="text-[#A3B4C8] mb-6 max-w-2xl mx-auto">
              Desarrollamos soluciones personalizadas para cualquier sector. Nuestro equipo de expertos puede adaptar nuestra tecnología a las necesidades específicas de tu negocio.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#1E90FF] to-[#3BA5FF] text-white font-bold rounded-xl transition-all duration-300 hover:from-[#3BA5FF] hover:to-[#1E90FF]"
            >
              Habla con un Especialista
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}