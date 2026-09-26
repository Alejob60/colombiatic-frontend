// src/components/sections/CasesSection.tsx
'use client';

const cases = [
  {
    company: "TechSolutions S.A.S",
    industry: "Tecnología",
    result: "85% aumento en leads calificados",
    description: "Implementamos chatbots omnicanal que automatizaron el 70% de las consultas iniciales."
  },
  {
    company: "RetailGlobal Ltda",
    industry: "Comercio",
    result: "60% reducción en costos de atención",
    description: "Sistema de atención automatizada con escalado inteligente a agentes humanos."
  },
  {
    company: "HealthCare Plus",
    industry: "Salud",
    result: "45% incremento en citas agendadas",
    description: "Asistente virtual especializado en triage y programación de citas médicas."
  }
];

export default function CasesSection() {
  return (
    <section className="py-20 bg-[#0C1116] px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#5EA0FF] to-[#3BA5FF] bg-clip-text text-transparent">
              Casos
            </span>{' '}
            de Éxito
          </h2>
          <p className="text-[#A3B4C8] max-w-2xl mx-auto text-lg">
            Empresas que han transformado sus operaciones con nuestra plataforma de IA
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((caseStudy, index) => (
            <div 
              key={index}
              className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#E6EDF3]">{caseStudy.company}</h3>
                <span className="text-xs px-2 py-1 bg-[#3BA5FF]/10 text-[#3BA5FF] rounded-full">
                  {caseStudy.industry}
                </span>
              </div>
              <p className="text-[#3BA5FF] font-semibold mb-3">{caseStudy.result}</p>
              <p className="text-[#A3B4C8]">{caseStudy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}