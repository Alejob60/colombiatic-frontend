"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          Colombia TIC
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 text-sm text-gray-700 font-medium">
          <Link href="#nosotros" className="hover:text-blue-600 transition">Nosotros</Link>
          <Link href="#servicios" className="hover:text-blue-600 transition">Servicios</Link>
          <Link href="#contacto" className="hover:text-blue-600 transition">Contacto</Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="#contacto"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
          >
            Agenda una reunión
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          title={isOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700 text-sm font-medium">
          <Link href="#nosotros" onClick={() => setIsOpen(false)} className="block hover:text-blue-600 transition">Nosotros</Link>
          <Link href="#servicios" onClick={() => setIsOpen(false)} className="block hover:text-blue-600 transition">Servicios</Link>
          <Link href="#contacto" onClick={() => setIsOpen(false)} className="block hover:text-blue-600 transition">Contacto</Link>
          <Link
            href="#contacto"
            onClick={() => setIsOpen(false)}
            className="block mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
          >
            Agenda una reunión
          </Link>
        </div>
      )}
    </header>
  );
}
