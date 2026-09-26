// src/app/page.tsx
"use client";

import HeroSectionWrapper from '@/components/landing/HeroSectionWrapper';
import NewAIEcosystemSection from '@/components/landing/NewAIEcosystemSection';
import MainServicesSection from '@/components/landing/MainServicesSection';
import EnterpriseSolutionsSection from '@/components/landing/EnterpriseSolutionsSection';
import PYMESolutionsSection from '@/components/landing/PYMESolutionsSection';
import ArtistsAISEction from '@/components/landing/ArtistsAISEction';
import SuccessMetricsSection from '@/components/landing/SuccessMetricsSection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import FinalCTASection from '@/components/landing/FinalCTASection';

import NewFooter from '@/components/landing/NewFooter';

export default function Home() {
  return (
    <>
      <HeroSectionWrapper />
      
      {/* Sección de soluciones principales */}
      <section id="soluciones-principales" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Soluciones Principales
            </h2>
            <p className="text-xl text-[#A9B8C6] max-w-3xl mx-auto">
              Descubre cómo nuestra inteligencia artificial puede transformar tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Solución 1 */}
            <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#3BA5FF]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">Automatización de Procesos</h3>
              <p className="text-[#A3B4C8] mb-4">
                Elimina tareas repetitivas y mejora la eficiencia operativa con flujos automatizados.
              </p>
            </div>

            {/* Solución 2 */}
            <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#3BA5FF]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">Chatbots Inteligentes</h3>
              <p className="text-[#A3B4C8] mb-4">
                Atiende a tus clientes 24/7 con asistentes virtuales entrenados en tu negocio.
              </p>
            </div>

            {/* Solución 3 */}
            <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#3BA5FF]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">Sitios Web con IA</h3>
              <p className="text-[#A3B4C8] mb-4">
                Sitios modernos que convierten visitantes en clientes con inteligencia artificial.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <NewAIEcosystemSection />
      <MainServicesSection />
      <EnterpriseSolutionsSection />
      <PYMESolutionsSection />
      <ArtistsAISEction />
      <SuccessMetricsSection />
      <SponsorsSection />
      <FinalCTASection />
      {/* Footer */}
      <NewFooter />
    </>
  );
}