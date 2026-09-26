// src/components/sections/DemoResultsCard.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  BarChart3, 
  MessageSquare, 
  Clock, 
  ThumbsUp, 
  Zap,
  TrendingUp
} from "lucide-react";

interface Metric {
  id: string;
  name: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

interface Interaction {
  id: string;
  type: string;
  content: string;
  timestamp: string;
  duration: string;
}

export default function DemoResultsCard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("metrics");

  const metrics: Metric[] = [
    {
      id: "accuracy",
      name: "Precisión de respuestas",
      value: "94%",
      change: "+12%",
      icon: ThumbsUp,
      color: "text-green-500"
    },
    {
      id: "speed",
      name: "Velocidad de respuesta",
      value: "2.3s",
      change: "-40%",
      icon: Zap,
      color: "text-blue-500"
    },
    {
      id: "satisfaction",
      name: "Satisfacción del usuario",
      value: "4.8/5",
      change: "+0.3",
      icon: TrendingUp,
      color: "text-purple-500"
    },
    {
      id: "efficiency",
      name: "Eficiencia operativa",
      value: "78%",
      change: "+25%",
      icon: BarChart3,
      color: "text-yellow-500"
    }
  ];

  const interactions: Interaction[] = [
    {
      id: "1",
      type: "Pregunta",
      content: "¿Cómo puedo mejorar mi estrategia de marketing digital?",
      timestamp: "Hace 2 minutos",
      duration: "3.2s"
    },
    {
      id: "2",
      type: "Respuesta",
      content: "Para mejorar tu estrategia de marketing digital, recomendaría...",
      timestamp: "Hace 2 minutos",
      duration: "1.8s"
    },
    {
      id: "3",
      type: "Pregunta",
      content: "¿Cuál es el ROI promedio de una campaña en redes sociales?",
      timestamp: "Hace 5 minutos",
      duration: "2.1s"
    },
    {
      id: "4",
      type: "Respuesta",
      content: "El ROI promedio de una campaña en redes sociales varía...",
      timestamp: "Hace 5 minutos",
      duration: "2.7s"
    }
  ];

  return (
    <section className="py-16 px-6 bg-surface/50 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Resultados de la demostración
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Métricas y análisis del rendimiento de nuestra IA en tiempo real
          </p>
        </div>

        <div className="bg-background/80 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
          <div className="border-b border-gray-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("metrics")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "metrics"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Métricas de rendimiento
              </button>
              <button
                onClick={() => setActiveTab("interactions")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "interactions"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Interacciones recientes
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "metrics" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div 
                      key={metric.id} 
                      className="bg-surface/50 rounded-xl p-6 border border-gray-800"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-full ${metric.color}/10 flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${metric.color}`} />
                        </div>
                        <span className="text-sm font-medium text-green-500">
                          {metric.change}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                      <p className="text-gray-400 text-sm">{metric.name}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {interactions.map((interaction) => (
                  <div 
                    key={interaction.id} 
                    className="bg-surface/50 rounded-xl p-4 border border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        interaction.type === "Pregunta" 
                          ? "bg-blue-500/10 text-blue-500" 
                          : "bg-green-500/10 text-green-500"
                      }`}>
                        {interaction.type}
                      </span>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {interaction.duration}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">{interaction.content}</p>
                    <p className="text-xs text-gray-500">{interaction.timestamp}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Análisis de rendimiento</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Nuestra IA demuestra un rendimiento sobresaliente en múltiples métricas clave, 
              superando los estándares de la industria en precisión, velocidad y satisfacción del usuario.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-300">Precisión del 94% en respuestas complejas</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-300">Respuesta en menos de 3 segundos</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-300">Satisfacción del usuario del 92%</span>
              </li>
            </ul>
          </div>

          <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mr-4">
                <MessageSquare className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold">Casos de uso</h3>
            </div>
            <p className="text-gray-400 mb-6">
              La IA puede adaptarse a múltiples industrias y casos de uso, 
              proporcionando valor inmediato en diversas áreas de negocio.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface/50 rounded-lg p-4 border border-gray-800">
                <h4 className="font-semibold mb-2">Atención al cliente</h4>
                <p className="text-xs text-gray-500">Reducción de tiempos de respuesta</p>
              </div>
              <div className="bg-surface/50 rounded-lg p-4 border border-gray-800">
                <h4 className="font-semibold mb-2">Generación de contenido</h4>
                <p className="text-xs text-gray-500">Creación de textos y artículos</p>
              </div>
              <div className="bg-surface/50 rounded-lg p-4 border border-gray-800">
                <h4 className="font-semibold mb-2">Análisis de datos</h4>
                <p className="text-xs text-gray-500">Insights y reportes automatizados</p>
              </div>
              <div className="bg-surface/50 rounded-lg p-4 border border-gray-800">
                <h4 className="font-semibold mb-2">Automatización</h4>
                <p className="text-xs text-gray-500">Flujos de trabajo inteligentes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}