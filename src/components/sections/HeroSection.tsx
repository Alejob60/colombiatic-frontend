// src/components/sections/HeroSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-white bg-black overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <Image
        src="/assets/hero-code.png"
        alt="Fondo de código"
        fill
        className="object-cover opacity-10 pointer-events-none z-0"
        priority
      />

      <motion.div
        className="max-w-4xl px-6 text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight font-sans"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          IA, Innovación y Tecnología
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Aliados en el diseño y ejecución de soluciones tecnológicas inteligentes.
          <br />
          Transformamos empresas, gobierno y defensa con tecnología desarrollada en Colombia.
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
         <div className="mt-10 flex justify-center flex-wrap gap-4">
          {/* Botón: Ir a la sección de contacto */}
          <a
            href="#contacto"
            className="relative inline-flex items-center justify-center px-6 py-3 text-white font-medium text-sm rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 group overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-blue-700 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center opacity-20"></span>
            <span className="relative z-10">Contáctanos</span>
          </a>

          {/* Botón: Ir a la sección de servicios */}
          <a
            href="#servicios"
            className="relative inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium text-sm rounded-lg hover:bg-white hover:text-black transition duration-300 group overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-white scale-0 group-hover:scale-100 transition-transform duration-300 origin-center opacity-20"></span>
            <span className="relative z-10">Ver Servicios</span>
          </a>
        </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
