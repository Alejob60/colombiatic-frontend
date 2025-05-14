'use client'

import { motion } from 'framer-motion'
import { FaRobot, FaShieldAlt, FaCloud, FaProjectDiagram, FaRocket, FaHandshake } from "react-icons/fa"

const services = [
  {
    icon: <FaRobot size={40} className="text-primary" />,
    title: "Bots de IA y Automatización",
    description: "Desarrollamos sistemas autónomos para empresas, gobiernos y finanzas. IA real aplicada al negocio.",
  },
  {
    icon: <FaShieldAlt size={40} className="text-secondary" />,
    title: "Ciberseguridad Inteligente",
    description: "Protección proactiva con monitoreo en tiempo real, detección de amenazas e infraestructura segura.",
  },
  {
    icon: <FaCloud size={40} className="text-tertiary" />,
    title: "Plataformas Cloud y Web3",
    description: "Soluciones cloud escalables con microservicios, blockchain y arquitectura distribuida.",
  },
  {
    icon: <FaProjectDiagram size={40} className="text-accent" />,
    title: "Integraciones API / Backend",
    description: "Conectamos sistemas complejos con backend en Java, Spring Boot y arquitecturas modernas.",
  },
  {
    icon: <FaRocket size={40} className="text-purple-400" />,
    title: "Drones Autónomos sin Internet",
    description: "Tecnología de frontera para agricultura, seguridad, defensa y monitoreo en zonas remotas.",
  },
  
  {
    icon: <FaHandshake size={40} className="text-yellow-400" />,
    title: "Plataformas Políticas y Gubernamentales",
    description: "Herramientas de comunicación y análisis para campañas, gestión pública y reputación digital.",
  },
]

export default function ServicesPage() {
  return (
    <section className="min-h-screen bg-[#0a0f1c] text-white px-6 py-24 md:px-20">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl font-bold mb-4">Servicios Tecnológicos</h1>
        <p className="text-gray-400 text-lg">
          Lo que hacemos, lo hacemos bien. Nuestra tecnología está diseñada para resolver problemas reales.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-xl transition border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm">{service.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-24 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <a
          href="#contacto"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          ¿Tienes un reto tecnológico? Hablemos →
        </a>
      </motion.div>
    </section>
  )
}
