// src/app/(i18n)/[lang]/solutions/page.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SolutionsPage() {
  const pathname = usePathname();
  const lang = pathname?.split('/')[1] || 'es';

  // Datos de soluciones en ambos idiomas
  const solutionsData = {
    es: {
      title: "Nuestras Soluciones",
      subtitle: "Transformamos tu negocio con inteligencia artificial y automatización avanzada",
      solutions: [
        {
          id: 1,
          title: "Automatización de Procesos",
          description: "Elimina tareas repetitivas y mejora la eficiencia operativa con flujos automatizados.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
          )
        },
        {
          id: 2,
          title: "Chatbots Inteligentes",
          description: "Atiende a tus clientes 24/7 con asistentes virtuales entrenados en tu negocio.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          )
        },
        {
          id: 3,
          title: "Sitios Web con IA",
          description: "Sitios modernos que convierten visitantes en clientes con inteligencia artificial.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          )
        },
        {
          id: 4,
          title: "Analítica Avanzada",
          description: "Métricas en tiempo real para tomar decisiones inteligentes basadas en datos.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          )
        },
        {
          id: 5,
          title: "Seguridad Empresarial",
          description: "Protege tus datos y sistemas con nuestras soluciones de ciberseguridad avanzadas.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          )
        },
        {
          id: 6,
          title: "Marketing Automatizado",
          description: "Campañas personalizadas que llegan a la audiencia adecuada en el momento preciso.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
            </svg>
          )
        }
      ],
      ctaButton: "Solicita una Consulta Personalizada"
    },
    en: {
      title: "Our Solutions",
      subtitle: "We transform your business with artificial intelligence and advanced automation",
      solutions: [
        {
          id: 1,
          title: "Process Automation",
          description: "Eliminate repetitive tasks and improve operational efficiency with automated workflows.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
          )
        },
        {
          id: 2,
          title: "Intelligent Chatbots",
          description: "Serve your customers 24/7 with virtual assistants trained on your business.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          )
        },
        {
          id: 3,
          title: "AI-Powered Websites",
          description: "Modern websites that convert visitors into customers with artificial intelligence.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          )
        },
        {
          id: 4,
          title: "Advanced Analytics",
          description: "Real-time metrics to make smart decisions based on data.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          )
        },
        {
          id: 5,
          title: "Enterprise Security",
          description: "Protect your data and systems with our advanced cybersecurity solutions.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          )
        },
        {
          id: 6,
          title: "Automated Marketing",
          description: "Personalized campaigns that reach the right audience at the right time.",
          icon: (
            <svg className="w-6 h-6 text-[#3BA5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
            </svg>
          )
        }
      ],
      ctaButton: "Request a Personalized Consultation"
    }
  };

  const data = solutionsData[lang as keyof typeof solutionsData] || solutionsData.es;

  return (
    <div className="min-h-screen bg-[#0C1116] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {data.title}
          </h1>
          <p className="text-xl text-[#A9B8C6] max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.solutions.map((solution) => (
            <div key={solution.id} className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#3BA5FF]/10 flex items-center justify-center mb-4">
                {solution.icon}
              </div>
              <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">{solution.title}</h3>
              <p className="text-[#A3B4C8] mb-4">
                {solution.description}
              </p>
              <Link href={`/${lang}/contact`} className="text-[#3BA5FF] hover:text-[#5EA0FF] font-medium">
                {lang === 'es' ? 'Saber más →' : 'Learn more →'}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href={`/${lang}/contact`} 
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#1E90FF] to-[#3BA5FF] text-white font-bold rounded-xl transition-all duration-300 hover:from-[#3BA5FF] hover:to-[#1E90FF]"
          >
            {data.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
}