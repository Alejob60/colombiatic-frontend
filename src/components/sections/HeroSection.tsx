// src/components/sections/HeroSection.tsx

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full py-28 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Tecnología & Innovación <br /> para empresas en Colombia
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Desarrollamos soluciones de IA, Blockchain, Ciberseguridad, Drones autónomos y plataformas web de alto nivel.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="#contacto"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Contáctanos
          </Link>

          <Link
            href="#servicios"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:border-gray-500 transition"
          >
            Ver Servicios
          </Link>
        </div>

      </div>
    </section>
  );
}
