// src/components/sections/PersonaSelector.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  ShoppingCart, 
  Headphones, 
  Code, 
  Building, 
  Users, 
  Laptop 
} from "lucide-react";

interface Persona {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  industry: string;
  useCase: string;
}

export default function PersonaSelector() {
  const { t } = useLanguage();
  const [selectedPersona, setSelectedPersona] = useState<string>("retail");

  const personas: Persona[] = [
    {
      id: "retail",
      name: "Asistente de Retail",
      description: "Especializado en atención al cliente y ventas minoristas",
      icon: ShoppingCart,
      industry: "Retail",
      useCase: "Atención al cliente, ventas, gestión de productos"
    },
    {
      id: "support",
      name: "Agente de Soporte",
      description: "Experto en resolución de problemas técnicos y atención al cliente",
      icon: Headphones,
      industry: "Tecnología",
      useCase: "Soporte técnico, resolución de problemas, guías de usuario"
    },
    {
      id: "developer",
      name: "Asistente de Desarrollo",
      description: "Ayuda con programación, debugging y mejores prácticas",
      icon: Code,
      industry: "Desarrollo de Software",
      useCase: "Programación, debugging, arquitectura de software"
    },
    {
      id: "corporate",
      name: "Asistente Corporativo",
      description: "Especializado en procesos empresariales y gestión",
      icon: Building,
      industry: "Corporativo",
      useCase: "Gestión de proyectos, análisis de datos, reportes"
    },
    {
      id: "hr",
      name: "Asistente de RRHH",
      description: "Experto en recursos humanos y gestión de talento",
      icon: Users,
      industry: "Recursos Humanos",
      useCase: "Reclutamiento, onboarding, gestión de empleados"
    },
    {
      id: "marketing",
      name: "Asistente de Marketing",
      description: "Especializado en estrategias de marketing y análisis",
      icon: Laptop,
      industry: "Marketing Digital",
      useCase: "Estrategias de contenido, análisis de campañas, SEO"
    }
  ];

  const selected = personas.find(p => p.id === selectedPersona) || personas[0];

  return (
    <section className="py-16 px-6 bg-background text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Selecciona tu contexto
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Elige un contexto pre-configurado para ver cómo nuestra IA se adapta a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {personas.map((persona) => {
            const Icon = persona.icon;
            return (
              <div
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className={`bg-surface/80 backdrop-blur-sm rounded-xl p-6 border cursor-pointer transition-all duration-300 ${
                  selectedPersona === persona.id
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-gray-800 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{persona.name}</h3>
                </div>
                <p className="text-gray-400 mb-3">{persona.description}</p>
                <div className="text-sm">
                  <span className="text-gray-500">Industria: </span>
                  <span className="text-primary">{persona.industry}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {(() => {
                  const Icon = selected.icon;
                  return <Icon className="w-8 h-8 text-primary" />;
                })()}
              </div>
              <h3 className="text-2xl font-bold mb-2">{selected.name}</h3>
              <p className="text-gray-400 mb-4">{selected.description}</p>
              <div className="text-sm">
                <span className="text-gray-500">Industria: </span>
                <span className="text-primary">{selected.industry}</span>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h4 className="text-lg font-semibold mb-4">Casos de uso:</h4>
              <ul className="space-y-3">
                {selected.useCase.split(", ").map((use, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-300">{use}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                <h5 className="font-semibold mb-2">Ejemplo de interacción:</h5>
                <p className="text-gray-400 text-sm">
                  &quot;Como {selected.name}, puedo ayudarte con tareas específicas de {selected.industry.toLowerCase()}. 
                  Por ejemplo, si trabajas en {selected.industry.toLowerCase()}, puedo ayudarte a {selected.useCase.split(", ")[0].toLowerCase()}.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}