"use client";

import {
  FaRobot,
  FaShieldAlt,
  FaCloud,
  FaNetworkWired,
  FaLaptopCode,
  FaSatelliteDish,
  FaUsersCog,
} from "react-icons/fa";

const services = [
  {
    icon: <FaLaptopCode className="text-primary text-4xl" />,
    title: "Desarrollo Web y Apps",
    description:
      "Creamos plataformas empresariales escalables con tecnologías modernas, enfocadas en rendimiento y experiencia de usuario.",
  },
  {
    icon: <FaNetworkWired className="text-accent text-4xl" />,
    title: "Integraciones API & Automatización",
    description:
      "Integramos sistemas críticos para optimizar procesos y reducir errores humanos con flujos automatizados e inteligentes.",
  },
  {
    icon: <FaRobot className="text-primary text-4xl" />,
    title: "Backend & Microservicios",
    description:
      "Diseñamos arquitecturas robustas con Java, Spring Boot y microservicios para entornos exigentes y escalables.",
  },
  {
    icon: <FaCloud className="text-tertiary text-4xl" />,
    title: "Infraestructura en la Nube",
    description:
      "Desplegamos soluciones en AWS y Azure, optimizadas para alta disponibilidad, seguridad y costos.",
  },
  {
    icon: <FaSatelliteDish className="text-secondary text-4xl" />,
    title: "Drones con IA Autónoma",
    description:
      "Implementamos drones inteligentes para agricultura, defensa y monitoreo, incluso sin conexión a internet.",
  },
  {
    icon: <FaShieldAlt className="text-red-500 text-4xl" />,
    title: "Tecnología para Defensa",
    description:
      "Soluciones tecnológicas para seguridad, vigilancia táctica y protección de infraestructura crítica.",
  },
  {
    icon: <FaUsersCog className="text-yellow-400 text-4xl" />,
    title: "Gobierno y Marketing Político",
    description:
      "Desarrollamos plataformas de participación ciudadana, comunicación estratégica y automatización electoral.",
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
