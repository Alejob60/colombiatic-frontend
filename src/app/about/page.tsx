'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-24 text-white bg-background">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Encabezado */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Nosotros</h1>
          <p className="mt-4 text-lg text-textSecondary max-w-3xl mx-auto">
            Colombia TIC Ingeniería SAS es una empresa colombiana fundada en 2022 con el propósito de liderar el avance tecnológico desde Latinoamérica. 
            Impulsamos soluciones innovadoras en inteligencia artificial, automatización, integración y tecnologías emergentes para transformar sectores estratégicos como defensa, gobierno y agroindustria.
          </p>
        </motion.section>

        {/* Misión y Visión */}
        <section className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-surface p-8 rounded-xl shadow-md border border-white/10"
          >
            <h2 className="text-2xl font-semibold text-primary mb-3">Nuestra Misión</h2>
            <p className="text-textSecondary">
              Desarrollar soluciones tecnológicas innovadoras que integren inteligencia artificial, automatización e infraestructura digital, 
              contribuyendo al crecimiento de sectores estratégicos como defensa, gobierno, agroindustria y sociedad civil.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-surface p-8 rounded-xl shadow-md border border-white/10"
          >
            <h2 className="text-2xl font-semibold text-primary mb-3">Nuestra Visión</h2>
            <p className="text-textSecondary">
              Ser en 2030 el referente latinoamericano en investigación y desarrollo de tecnología basada en inteligencia artificial, 
              soluciones descentralizadas y plataformas de integración digital con impacto positivo y global.
            </p>
          </motion.div>
        </section>

        {/* Valores */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-surface p-8 rounded-xl shadow-md border border-white/10"
        >
          <h2 className="text-2xl font-semibold text-primary mb-6">Nuestros Valores</h2>
          <ul className="list-disc list-inside text-textSecondary space-y-2 pl-4">
            <li><strong>Innovación Permanente:</strong> Buscamos nuevas formas de resolver desafíos reales.</li>
            <li><strong>Ética y Seguridad:</strong> Creamos soluciones responsables y confiables.</li>
            <li><strong>I+D Abierto:</strong> Fomentamos el desarrollo colectivo.</li>
            <li><strong>Soberanía Tecnológica:</strong> Apostamos por el talento colombiano.</li>
            <li><strong>Impacto Social:</strong> Todo lo que desarrollamos busca mejorar vidas.</li>
          </ul>
        </motion.section>

        {/* Objetivos */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-surface p-8 rounded-xl shadow-md border border-white/10"
        >
          <h2 className="text-2xl font-semibold text-primary mb-6">Objetivos Estratégicos 2025</h2>
          <ol className="list-decimal list-inside text-textSecondary space-y-2 pl-4">
            <li>Implementar 3 plataformas IA funcionales en defensa, agro y gobierno.</li>
            <li>Desplegar drones autónomos con comunicación sin internet en pruebas reales.</li>
            <li>Integrar un bot de trading con IA + ML para operaciones automáticas.</li>
            <li>Desarrollar herramientas para campañas políticas con análisis IA.</li>
            <li>Alianzas con 5 entidades gubernamentales y 3 universidades en proyectos I+D.</li>
          </ol>
        </motion.section>
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-primary text-white py-16 px-6 rounded-xl shadow-xl text-center mt-12"
          >
            <h3 className="text-3xl font-bold mb-4">¿Listo para transformar tu organización con IA?</h3>
            <p className="text-lg text-white/90 mb-6">
              En ColombiaTIC estamos construyendo el futuro con tecnología avanzada. Hablemos.
            </p>
            <a
              href="#contacto"
              className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Contáctanos
            </a>
          </motion.section>

      </div>
    </main>
  );
}
