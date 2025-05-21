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
      </div>
    </section>
  );
}
