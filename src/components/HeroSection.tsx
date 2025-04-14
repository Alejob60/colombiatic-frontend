'use client';

import React from 'react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Impulsamos la innovación en <br />
          <span className="text-white">Colombia</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl font-medium">
          Colombia TIC Ingeniería SAS desarrolla soluciones en inteligencia artificial, <br />
          ciberseguridad, antidrones, blockchain y más.
        </p>
        <div className="mt-8">
          <a
            href="#contacto"
            className="inline-block bg-white text-blue-700 font-semibold py-3 px-6 rounded-md shadow-md hover:bg-gray-100 transition"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}
