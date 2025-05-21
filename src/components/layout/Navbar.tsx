"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/60 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-white font-semibold tracking-tight text-lg md:text-xl transition duration-200 hover:opacity-90">
          <span className="text-white">Colombia</span>
          <span className="text-primary">TIC</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="/" className="hover:text-white transition-colors duration-200">Inicio</Link>
          <Link href="/about" className="hover:text-white transition-colors duration-200">Nosotros</Link>
          <Link href="/services" className="hover:text-white transition-colors duration-200">Servicios</Link>
          <Link href="/contact" className="hover:text-white transition-colors duration-200">Contacto</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            href="#ingresar"
            className="bg-primary hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg shadow-lg transition-all duration-300"
          >
            Ingresar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:opacity-80"
          aria-label="Abrir menú móvil"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-black/90 border-t border-white/10 px-6 py-4 text-white text-sm space-y-3 animate-fade-in-down">
          <Link href="/" onClick={() => setIsOpen(false)} className="block hover:text-primary">Inicio</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block hover:text-primary">Nosotros</Link>
          <Link href="#servicios" onClick={() => setIsOpen(false)} className="block hover:text-primary">Servicios</Link>
          <Link href="#contacto" onClick={() => setIsOpen(false)} className="block hover:text-primary">Contacto</Link>
          <Link
            href="#ingresar"
            onClick={() => setIsOpen(false)}
            className="block bg-primary text-center text-white font-semibold px-4 py-2 mt-2 rounded-md transition"
          >
            Ingresar
          </Link>
        </nav>
      )}
    </header>
  );
}
