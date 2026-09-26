'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Soluciones', href: '/solutions' },
    { name: 'Industrias', href: '/industries' },
    { name: 'Casos', href: '/cases' },
    { name: 'Recursos', href: '/resources' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0C1116]/90 backdrop-blur-md border-b border-[rgba(255,255,255,0.07)]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#3BA5FF] to-[#1E90FF] bg-clip-text text-transparent">
              ColombiaTIC AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? 'text-[#3BA5FF]'
                      : 'text-[#F2F5F7] hover:text-[#3BA5FF]'
                  } px-3 py-2 text-sm font-medium transition-colors`}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                href="/login"
                className="text-[#F2F5F7] hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                Login
              </Link>
              
              <button 
                className="ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #3BA5FF 0%, #1E90FF 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 15px rgba(59, 165, 255, 0.3)'
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
              className="inline-flex items-center justify-center p-2 rounded-md text-[#A7B2BD] hover:text-[#F2F5F7] hover:bg-[rgba(255,255,255,0.04)] focus:outline-none"
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
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#0C1116]/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'text-[#3BA5FF] bg-[rgba(255,255,255,0.04)]'
                    : 'text-[#F2F5F7] hover:text-[#3BA5FF] hover:bg-[rgba(255,255,255,0.04)]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 pb-3 border-t border-[rgba(255,255,255,0.07)]">
              <div className="flex items-center px-5">
                <Link
                  href="/login"
                  className="text-[#F2F5F7] hover:text-[#3BA5FF] block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </div>
              <div className="mt-3 px-5">
                <button 
                  className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #3BA5FF 0%, #1E90FF 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 15px rgba(59, 165, 255, 0.3)'
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