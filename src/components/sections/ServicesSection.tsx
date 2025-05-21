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
    <section className="py-24 px-6 relative bg-background text-white text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4  from-primary via-tertiary to-accent bg-clip-text  drop-shadow-lg">
        Nuestros Servicios
      </h2>
      <p className="mb-12 max-w-2xl mx-auto text-xl md:text-2xl font-medium text-gray-300">
        Soluciones tecnológicas estratégicas <span className="text-accent font-semibold">adaptadas al futuro</span> de tu organización.
      </p>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-surface/90 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-800"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
            <p className="text-gray-400 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}