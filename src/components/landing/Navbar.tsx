'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-[72px] z-[9999] bg-[#0C1116] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex-shrink-0 flex items-center">
          <span className="text-white font-bold">ColombiaTIC</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-[#E6EDF3] hover:text-[#5EA0FF] px-3 py-2 text-sm font-medium transition-colors">
              Inicio
            </Link>
            <Link href="/solutions" className="text-[#E6EDF3] hover:text-[#5EA0FF] px-3 py-2 text-sm font-medium transition-colors">
              Soluciones
            </Link>
            <Link href="/industries" className="text-[#E6EDF3] hover:text-[#5EA0FF] px-3 py-2 text-sm font-medium transition-colors">
              Industrias
            </Link>
            <Link href="/login" className="text-[#94A3B8] hover:text-[#E6EDF3] px-3 py-2 text-sm font-medium transition-colors">
              Login
            </Link>
            <button 
              className="ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #1A2633, #253545)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#E6EDF3',
                boxShadow: 'inset 0 0 12px rgba(153, 201, 255, 0.2), 0 0 18px rgba(0,0,0,0.4)'
              }}
            >
              Solicitar Diagnóstico
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-[#94A3B8] hover:text-[#E6EDF3] hover:bg-[rgba(255,255,255,0.04)] focus:outline-none"
          >
            <span className="sr-only">Abrir menú</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#0C1116]/95 backdrop-blur-lg border-t border-[rgba(255,255,255,0.07)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#E6EDF3] hover:text-[#5EA0FF] hover:bg-[rgba(255,255,255,0.04)]"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/solutions"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#E6EDF3] hover:text-[#5EA0FF] hover:bg-[rgba(255,255,255,0.04)]"
              onClick={() => setIsOpen(false)}
            >
              Soluciones
            </Link>
            <Link
              href="/industries"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#E6EDF3] hover:text-[#5EA0FF] hover:bg-[rgba(255,255,255,0.04)]"
              onClick={() => setIsOpen(false)}
            >
              Industrias
            </Link>
            <div className="pt-4 pb-3 border-t border-[rgba(255,255,255,0.07)]">
              <div className="flex items-center px-5">
                <Link
                  href="/login"
                  className="text-[#94A3B8] hover:text-[#E6EDF3] block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </div>
              <div className="mt-3 px-5">
                <button 
                  className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #1A2633, #253545)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#E6EDF3',
                    boxShadow: 'inset 0 0 12px rgba(153, 201, 255, 0.2), 0 0 18px rgba(0,0,0,0.4)'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Solicitar Diagnóstico
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}