// src/components/sections/FeaturesSection.tsx
'use client';

import { 
  Bot, 
  TrendingUp, 
  Zap, 
  Shield,
  MessageSquare,
  BarChart3,
  Globe,
  Headphones
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: "Chatbots Inteligentes",
    description: "Asistentes virtuales entrenados con el ADN de tu negocio para atención personalizada."
  },
  {
    icon: TrendingUp,
    title: "Automatización de Ventas",
    description: "Embudos de ventas automáticos que convierten leads en clientes las 24 horas."
  },
  {
    icon: Zap,
    title: "Respuesta Instantánea",
    description: "Tiempo de respuesta menor a 2 segundos en todos los canales de comunicación."
  },
  {
    icon: Shield,
    title: "Seguridad Empresarial",
    description: "Certificaciones ISO 27001 y encriptación de extremo a extremo para tus datos."
  },
  {
    icon: MessageSquare,
    title: "Omnicanal",
    description: "Integración nativa con WhatsApp, web, email, redes sociales y más."
  },
  {
    icon: BarChart3,
    title: "Analítica Avanzada",
    description: "Dashboards en tiempo real con KPIs comerciales y métricas de performance."
  },
  {
    icon: Globe,
    title: "Sitios Web Inteligentes",
    description: "Páginas web con IA que convierten visitantes en leads calificados."
  },
  {
    icon: Headphones,
    title: "Soporte Humano + IA",
    description: "Escalado automático a agentes humanos cuando es necesario."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-[#0C1116] px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#5EA0FF] to-[#3BA5FF] bg-clip-text text-transparent">
              Funcionalidades
            </span>{' '}
            Avanzadas
          </h2>
          <p className="text-[#A3B4C8] max-w-2xl mx-auto text-lg">
            Todo lo que necesitas para digitalizar y escalar tu negocio con inteligencia artificial
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#3BA5FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#3BA5FF]/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-[#3BA5FF]" />
                </div>
                <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">{feature.title}</h3>
                <p className="text-[#A3B4C8]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}