// src/components/sections/ServicesSection.tsx
'use client';

import { FaRobot, FaShieldAlt, FaCloud, FaNetworkWired } from 'react-icons/fa';

const services = [
  {
    icon: <FaRobot className="text-blue-600 text-3xl" />,
    title: 'Bots de IA & Automatización',
    description:
      'Implementamos soluciones inteligentes con IA para procesos empresariales, financieros y defensa.',
  },
  {
    icon: <FaShieldAlt className="text-green-600 text-3xl" />,
    title: 'Ciberseguridad Avanzada',
    description:
      'Protegemos infraestructuras críticas con tecnologías de defensa, anti-fraude y monitoreo activo.',
  },
  {
    icon: <FaCloud className="text-purple-600 text-3xl" />,
    title: 'Plataformas Cloud & Web3',
    description:
      'Desarrollamos plataformas cloud nativas, con integración a sistemas distribuidos y blockchain.',
  },
  {
    icon: <FaNetworkWired className="text-yellow-600 text-3xl" />,
    title: 'Integración Tecnológica',
    description:
      'Conectamos sistemas legados con soluciones modernas para gobierno, industria y sector militar.',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-6 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-900">Nuestros Servicios</h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Soluciones tecnológicas estratégicas adaptadas a las necesidades del futuro.
      </p>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
            <p className="text-gray-500 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
