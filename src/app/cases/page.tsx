// src/app/cases/page.tsx
"use client";

import Link from 'next/link';

export default function CasesPage() {
  const cases = [
    {
      company: "TechGlobal S.A.",
      industry: "Tecnología",
      challenge: "Necesitaba automatizar atención al cliente en múltiples canales",
      solution: "Implementamos chatbots omnicanal con IA entrenada en su base de conocimiento",
      results: "85% reducción en tiempos de respuesta, 40% aumento en satisfacción del cliente",
      metrics: [
        { label: "Reducción de costos", value: "60%" },
        { label: "Aumento en ventas", value: "25%" },
        { label: "Disponibilidad", value: "24/7" }
      ]
    },
    {
      company: "RetailShop Ltda",
      industry: "Retail",
      challenge: "Baja conversión en su sitio web y altas tasas de abandono",
      solution: "Sitio web con IA de ventas y chatbot de asistencia personalizada",
      results: "150% aumento en conversiones, 70% reducción en abandonos del carrito",
      metrics: [
        { label: "Aumento de tráfico", value: "80%" },
        { label: "Mejora en SEO", value: "120%" },
        { label: "ROI", value: "300%" }
      ]
    },
    {
      company: "HealthFirst IPS",
      industry: "Salud",
      challenge: "Sobrecarga en call center y largos tiempos de espera para citas",
      solution: "Asistente virtual de triage y programación automatizada de citas",
      results: "75% reducción en llamadas al call center, 90% mejora en puntualidad de citas",
      metrics: [
        { label: "Reducción de costos", value: "50%" },
        { label: "Satisfacción pacientes", value: "+40%" },
        { label: "Eficiencia", value: "200%" }
      ]
    },
    {
      company: "EduSmart Academy",
      industry: "Educación",
      challenge: "Necesitaba personalizar la experiencia de aprendizaje para miles de estudiantes",
      solution: "Plataforma de e-learning con recomendaciones de contenido basadas en IA",
      results: "65% mejora en retención de estudiantes, 45% aumento en calificaciones promedio",
      metrics: [
        { label: "Personalización", value: "100%" },
        { label: "Engagement", value: "+70%" },
        { label: "Eficiencia docente", value: "150%" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0C1116] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Casos de Éxito
          </h1>
          <p className="text-xl text-[#A9B8C6] max-w-3xl mx-auto">
            Descubre cómo hemos ayudado a empresas como la tuya a transformarse con inteligencia artificial
          </p>
        </div>

        <div className="space-y-12">
          {cases.map((caseStudy, index) => (
            <div 
              key={index}
              className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)]"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#E6EDF3] mb-2">{caseStudy.company}</h3>
                  <span className="inline-block px-3 py-1 text-sm font-semibold bg-[#3BA5FF]/10 text-[#3BA5FF] rounded-full">
                    {caseStudy.industry}
                  </span>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link 
                    href="/contact" 
                    className="inline-block px-4 py-2 bg-[rgba(255,255,255,0.06)] text-[#3BA5FF] font-medium rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                  >
                    Ver detalles completos
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-bold text-[#E6EDF3] mb-2">Desafío</h4>
                  <p className="text-[#A3B4C8] mb-4">{caseStudy.challenge}</p>
                  
                  <h4 className="text-lg font-bold text-[#E6EDF3] mb-2">Solución</h4>
                  <p className="text-[#A3B4C8] mb-4">{caseStudy.solution}</p>
                  
                  <h4 className="text-lg font-bold text-[#E6EDF3] mb-2">Resultados</h4>
                  <p className="text-[#3BA5FF] font-semibold">{caseStudy.results}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-[#E6EDF3] mb-4">Métricas Clave</h4>
                  <div className="space-y-4">
                    {caseStudy.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex justify-between items-center py-2 border-b border-[rgba(255,255,255,0.07)]">
                        <span className="text-[#A3B4C8]">{metric.label}</span>
                        <span className="text-[#3BA5FF] font-bold">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-[#E6EDF3] mb-4">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-[#A3B4C8] mb-6 max-w-2xl mx-auto">
            Únete a las empresas que ya están aprovechando el poder de la inteligencia artificial
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-gradient-to-r from-[#1E90FF] to-[#3BA5FF] text-white font-bold rounded-xl transition-all duration-300 hover:from-[#3BA5FF] hover:to-[#1E90FF]"
            >
              Solicita tu Diagnóstico Gratuito
            </Link>
            <Link 
              href="/solutions" 
              className="px-8 py-4 bg-transparent border border-[rgba(255,255,255,0.1)] text-[#E6EDF3] font-bold rounded-xl transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]"
            >
              Explora Nuestras Soluciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}