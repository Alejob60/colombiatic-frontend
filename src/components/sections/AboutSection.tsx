<<<<<<< HEAD
"use client";

import { FaShieldAlt, FaBrain, FaHandshake, FaNetworkWired } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
    title: "Seguridad Avanzada",
    description: "Protegemos la infraestructura crítica con IA, defensa digital y monitoreo activo.",
  },
  {
    icon: <FaBrain className="text-purple-600 text-3xl" />,
    title: "Tecnología de Punta",
    description: "Implementamos IA, RAG, blockchain y drones autónomos en soluciones empresariales.",
  },
  {
    icon: <FaHandshake className="text-yellow-500 text-3xl" />,
    title: "Alianzas Estratégicas",
    description: "Trabajamos con entidades de defensa, industria y agro para impulsar la innovación.",
  },
  {
    icon: <FaNetworkWired className="text-pink-500 text-3xl" />,
    title: "Integración Tecnológica",
    description: "Conectamos sistemas legacy con tecnologías modernas, APIs y cloud computing.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 px-6 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          ¿Por qué elegirnos?
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Soluciones inteligentes adaptadas al futuro de Colombia
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-start gap-4 hover:shadow-lg transition-all"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
=======
// src/components/sections/AboutSection.tsx

export default function AboutSection() {
  return (
    <section
      id="nosotros"
      className="w-full py-24 bg-white border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
          ¿Quiénes somos?
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          En <span className="font-bold text-blue-600">Colombia TIC Ingeniería SAS</span> 
          desarrollamos soluciones tecnológicas de última generación para empresas, gobierno y sector agroindustrial.
          <br /><br />
          Nos especializamos en Inteligencia Artificial, Blockchain, Ciberseguridad, Automatización de Procesos,
          Drones Autónomos y Plataformas Web Escalables.
        </p>

        <div className="mt-10">
          <p className="text-sm text-gray-400 uppercase tracking-wide">
            Innovación · Tecnología · Futuro
          </p>
        </div>

>>>>>>> feature/hero-section
      </div>
    </section>
  );
}
