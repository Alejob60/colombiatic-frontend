// src/components/sections/CallToAction.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-[#0a0f1c] to-[#0a0f1c] text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
          ¿Listo para llevar tu proyecto al siguiente nivel?
        </h2>
        <p className="text-gray-400 mb-10 text-lg">
          Te ayudamos a construir soluciones con IA, blockchain y tecnología avanzada. Nuestro equipo está listo para impulsarte.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="#contacto"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition shadow-md hover:shadow-lg"
          >
            Contáctanos
          </Link>
          <Link
            href="#servicios"
            className="border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-lg text-sm font-medium transition shadow-md hover:shadow-lg"
          >
            Ver Servicios
          </Link>
        </div>
      </motion.div>

      {/* Glow Animation */}
      <motion.div
        className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[140px] opacity-30 -translate-x-1/2 z-0"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      />
    </section>
  );
}
