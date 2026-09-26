// src/components/sections/ModulesSection.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, CheckCircle } from "lucide-react";
import modulesData from "@/data/modules.json";

export default function ModulesSection() {
  const [activeFilter, setActiveFilter] = useState("todos");

  // Obtener categorías únicas
  const categories = ["todos", ...new Set(modulesData.map(module => module.category))];

  // Filtrar módulos según la categoría seleccionada
  const filteredModules = activeFilter === "todos" 
    ? modulesData 
    : modulesData.filter(module => module.category === activeFilter);

  return (
    <section id="modulos" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Módulos <span className="gradient-text">Adicionales</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Amplía las capacidades de tu ecosistema con módulos especializados
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeFilter === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-surface/80 text-gray-300 hover:bg-surface border border-gray-800"
              }`}
            >
              <Filter className="w-4 h-4" />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Grid de módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModules.map((module, index) => (
            <motion.div
              key={module.id}
              className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                <p className="text-gray-400 text-sm">{module.description}</p>
              </div>

              <ul className="space-y-2 mb-6">
                {module.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-bold text-primary">
                    {module.billing_cycle === "único" 
                      ? `${module.price_cop.toLocaleString()} COP` 
                      : `${module.price_cop.toLocaleString()} COP/${module.billing_cycle}`}
                  </div>
                  <div className="text-xs text-gray-500">Implementación en {module.setup_time}</div>
                </div>

                <button className="px-4 py-2 bg-primary hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Agregar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}