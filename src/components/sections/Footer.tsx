// src/components/sections/Footer.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Productos",
    links: [
      { name: "IA Omnicanal", href: "#" },
      { name: "Sitio Web + IA", href: "#" },
      { name: "Módulo Redes", href: "#" },
      { name: "Automatización", href: "#" }
    ]
  },
  {
    title: "Empresa",
    links: [
      { name: "Nosotros", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Carreras", href: "#" },
      { name: "Contacto", href: "#" }
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Términos de Uso", href: "#" },
      { name: "Política de Privacidad", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "SLA", href: "#" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-surface/80 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Información de la empresa */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              ColombiaTIC
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transformamos negocios en Colombia con inteligencia artificial, automatización 
              y soluciones tecnológicas avanzadas.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <span>Bogotá, Colombia</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span>+57 300 123 4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span>contacto@colombiatic.com.co</span>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Enlaces del footer */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-500">
            © {new Date().getFullYear()} ColombiaTIC. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}