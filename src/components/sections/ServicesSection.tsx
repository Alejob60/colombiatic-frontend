"use client";

import { motion } from "framer-motion";
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
    <section id="servicios" className="py-24 px-6 bg-background text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-6"
      >
        Nuestros Servicios
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-muted mb-12 max-w-2xl mx-auto"
      >
        Soluciones tecnológicas adaptadas a entornos complejos y de alto impacto.
      </motion.p>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#0e1525] text-white rounded-2xl border border-gray-800 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
