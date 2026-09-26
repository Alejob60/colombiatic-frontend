// src/components/sections/HeroIA.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Zap, ArrowRight, Bot, BarChart3, MessageSquare, Globe, Shield, Database, Cpu, Cloud, Lock, ZapIcon } from "lucide-react";

export default function HeroIA() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-background to-surface overflow-hidden p-4 md:p-8">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-tertiary rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <motion.div
        className="max-w-6xl w-full mx-auto text-center relative z-10 flex flex-col items-center justify-center min-h-[80vh]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight font-sans mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t('hero.title') || 'Potencia tu negocio con inteligencia artificial'}
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t('hero.subtitle') || 'Soluciones de IA personalizadas para atención al cliente, ventas automatizadas y sitios web inteligentes.'}
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="#pricing"
            className="relative inline-flex items-center justify-center px-8 py-4 text-white font-medium text-base rounded-lg bg-primary hover:bg-blue-700 transition duration-300 group overflow-hidden shadow-lg hover:shadow-xl"
          >
            <span className="absolute inset-0 w-full h-full bg-blue-700 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center opacity-20"></span>
            <span className="relative z-10 flex items-center">
              {t('hero.cta_primary') || 'Prueba gratis'}
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          <a
            href="#demo"
            className="relative inline-flex items-center justify-center px-8 py-4 border border-white text-white font-medium text-base rounded-lg hover:bg-white hover:text-black transition duration-300 group overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-white scale-0 group-hover:scale-100 transition-transform duration-300 origin-center opacity-20"></span>
            <span className="relative z-10 flex items-center">
              {t('hero.cta_secondary') || 'Explorar soluciones'}
              <Zap className="w-5 h-5 ml-2" />
            </span>
          </a>
        </motion.div>

        {/* Fireblocks-inspired Architecture Diagram */}
        <div className="mt-20 relative w-full max-w-6xl h-96 rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm mx-auto">
          {/* Grid background for tech feel */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="border-r border-gray-700"></div>
              ))}
            </div>
          </div>
          
          {/* Central AI Core - Fireblocks Vault equivalent */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-2xl bg-gradient-to-br from-primary to-tertiary flex items-center justify-center shadow-2xl border-2 border-white/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          >
            <div className="text-center">
              <Cpu className="w-16 h-16 text-white mx-auto" />
              <span className="text-white text-lg font-bold mt-2 block">IA Central</span>
              <span className="text-gray-300 text-xs mt-1 block">Núcleo Inteligente</span>
            </div>
          </motion.div>
          
          {/* Peripheral Services - Fireblocks Service Offerings */}
          <motion.div
            className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-24 rounded-xl bg-blue-500/20 border border-blue-400/30 flex flex-col items-center justify-center backdrop-blur-sm"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <Globe className="w-8 h-8 text-blue-300 mx-auto" />
            <span className="text-blue-300 text-sm mt-2 text-center">Sitio Web Inteligente</span>
          </motion.div>
          
          <motion.div
            className="absolute top-1/2 left-8 transform -translate-y-1/2 w-32 h-24 rounded-xl bg-green-500/20 border border-green-400/30 flex flex-col items-center justify-center backdrop-blur-sm"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <MessageSquare className="w-8 h-8 text-green-300 mx-auto" />
            <span className="text-green-300 text-sm mt-2 text-center">ChatBot IA</span>
          </motion.div>
          
          <motion.div
            className="absolute top-1/2 right-8 transform -translate-y-1/2 w-32 h-24 rounded-xl bg-purple-500/20 border border-purple-400/30 flex flex-col items-center justify-center backdrop-blur-sm"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <BarChart3 className="w-8 h-8 text-purple-300 mx-auto" />
            <span className="text-purple-300 text-sm mt-2 text-center">Analítica Avanzada</span>
          </motion.div>
          
          <motion.div
            className="absolute bottom-8 left-1/4 transform -translate-x-1/2 w-32 h-24 rounded-xl bg-yellow-500/20 border border-yellow-400/30 flex flex-col items-center justify-center backdrop-blur-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <Shield className="w-8 h-8 text-yellow-300 mx-auto" />
            <span className="text-yellow-300 text-sm mt-2 text-center">Seguridad</span>
          </motion.div>
          
          <motion.div
            className="absolute bottom-8 right-1/4 transform translate-x-1/2 w-32 h-24 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex flex-col items-center justify-center backdrop-blur-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <Database className="w-8 h-8 text-cyan-300 mx-auto" />
            <span className="text-cyan-300 text-sm mt-2 text-center">Datos</span>
          </motion.div>
          
          {/* Connecting lines to show relationships */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse delay-300" />
            <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse delay-500" />
            <line x1="50%" y1="50%" x2="30%" y2="85%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse delay-700" />
            <line x1="50%" y1="50%" x2="70%" y2="85%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse delay-1000" />
          </svg>
          
          {/* Data flow particles */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-400 rounded-full"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ 
              x: [-100, -200, -150, 0], 
              y: [-50, -100, -150, 0], 
              opacity: [0, 1, 1, 0] 
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-400 rounded-full"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ 
              x: [100, 200, 150, 0], 
              y: [-50, -100, -150, 0], 
              opacity: [0, 1, 1, 0] 
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-purple-400 rounded-full"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ 
              x: [100, 200, 150, 0], 
              y: [50, 100, 150, 0], 
              opacity: [0, 1, 1, 0] 
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
          />
        </div>
        
        {/* Value Propositions - Fireblocks Target Audience Approach */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center hover:border-primary/50 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
              <Cpu className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">IA Central Inteligente</h3>
            <p className="text-gray-300">Núcleo de inteligencia artificial que coordina todas las interacciones con contexto global y aprendizaje continuo.</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center hover:border-primary/50 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/30 transition-colors duration-300">
              <MessageSquare className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Atención Omnicanal</h3>
            <p className="text-gray-300">Atendemos a sus clientes en todos los canales con una experiencia coherente e inteligente.</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center hover:border-primary/50 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/30 transition-colors duration-300">
              <ZapIcon className="w-8 h-8 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Tecnología Avanzada</h3>
            <p className="text-gray-300">Cada cliente tiene acceso a la última tecnología en sus servicios digitales y sitios web inteligentes.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}