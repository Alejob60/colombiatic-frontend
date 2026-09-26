// src/app/solutions/page.tsx
"use client";

import Link from 'next/link';

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#0C1116] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nuestras Soluciones
          </h1>
          <p className="text-xl text-[#A9B8C6] max-w-3xl mx-auto">
            Transformamos tu negocio con inteligencia artificial y automatización avanzada
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
            <Link href="/contact" className="text-[#3BA5FF] hover:text-[#5EA0FF] font-medium">
              Saber más →
            </Link>
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
            <Link href="/contact" className="text-[#3BA5FF] hover:text-[#5EA0FF] font-medium">
              Saber más →
            </Link>
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
            <Link href="/contact" className="text-[#3BA5FF] hover:text-[#5EA0FF] font-medium">
              Saber más →
            </Link>
          </div>

          {/* Solución 4 */}
          <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#3BA5FF]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">Analítica Avanzada</h3>
            <p className="text-[#A3B4C8] mb-4">
              Métricas en tiempo real para tomar decisiones inteligentes basadas en datos.
            </p>
            <Link href="/contact" className="text-[#3BA5FF] hover:text-[#5EA0FF] font-medium">
              Saber más →
            </Link>
          </div>

          {/* Solución 5 */}
          <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#3BA5FF]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">Seguridad Empresarial</h3>
            <p className="text-[#A3B4C8] mb-4">
              Protege tus datos y sistemas con nuestras soluciones de ciberseguridad avanzadas.
            </p>
            <Link href="/contact" className="text-[#3BA5FF] hover:text-[#5EA0FF] font-medium">
              Saber más →
            </Link>
          </div>

          {/* Solución 6 */}
          <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#3BA5FF]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">Marketing Automatizado</h3>
            <p className="text-[#A3B4C8] mb-4">
              Campañas personalizadas que llegan a la audiencia adecuada en el momento preciso.
            </p>
            <Link href="/contact" className="text-[#3BA5FF] hover:text-[#5EA0FF] font-medium">
              Saber más →
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/contact" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#1E90FF] to-[#3BA5FF] text-white font-bold rounded-xl transition-all duration-300 hover:from-[#3BA5FF] hover:to-[#1E90FF]"
          >
            Solicita una Consulta Personalizada
          </Link>
        </div>
      </div>
    </div>
  );
}