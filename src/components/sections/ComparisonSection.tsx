// src/components/sections/ComparisonSection.tsx
"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const competitors = [
  {
    name: "Kommo",
    features: {
      "IA Omnicanal": false,
      "Integración WhatsApp": true,
      "CRM Automatizado": true,
      "Sitio Web + SEO": false,
      "Dashboard Analítico": true,
      "Email Marketing": true,
      "Precio COP": "Desde $250.000/mes"
    }
  },
  {
    name: "Metricool",
    features: {
      "IA Omnicanal": false,
      "Integración WhatsApp": false,
      "CRM Automatizado": false,
      "Sitio Web + SEO": false,
      "Dashboard Analítico": true,
      "Email Marketing": true,
      "Precio COP": "Desde $180.000/mes"
    }
  },
  {
    name: "ColombiaTIC",
    features: {
      "IA Omnicanal": true,
      "Integración WhatsApp": true,
      "CRM Automatizado": true,
      "Sitio Web + SEO": true,
      "Dashboard Analítico": true,
      "Email Marketing": true,
      "Precio COP": "Desde $159.000/mes"
    },
    isPrimary: true
  }
];

type ComparisonFeatureName = keyof (typeof competitors)[number]['features'];

const featureNames: ComparisonFeatureName[] = [
  "IA Omnicanal",
  "Integración WhatsApp",
  "CRM Automatizado",
  "Sitio Web + SEO",
  "Dashboard Analítico",
  "Email Marketing",
  "Precio COP"
];

export default function ComparisonSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comparativa <span className="gradient-text">Competitiva</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Descubre por qué ColombiaTIC es la mejor opción para transformar tu negocio
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 w-1/4"></th>
                {competitors.map((competitor, index) => (
                  <th 
                    key={index} 
                    className={`p-4 text-center ${competitor.isPrimary ? 'bg-primary/10' : ''}`}
                  >
                    <div className={`font-bold text-lg ${competitor.isPrimary ? 'text-primary' : 'text-gray-300'}`}>
                      {competitor.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureNames.map((feature, featureIndex) => (
                <tr 
                  key={featureIndex} 
                  className={featureIndex % 2 === 0 ? 'bg-surface/30' : ''}
                >
                  <td className="p-4 font-medium text-gray-300 border-t border-gray-800">
                    {feature}
                  </td>
                  {competitors.map((competitor, competitorIndex) => (
                    <td 
                      key={competitorIndex} 
                      className={`p-4 text-center border-t border-gray-800 ${competitor.isPrimary ? 'bg-primary/10' : ''}`}
                    >
                      {typeof competitor.features[feature] === 'boolean' ? (
                        competitor.features[feature] ? (
                          <Check className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-red-500 mx-auto" />
                        )
                      ) : (
                        <span className="font-medium">
                          {competitor.features[feature]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-surface/80 backdrop-blur-sm rounded-full border border-gray-800">
            <span className="text-gray-300">
              <span className="gradient-text font-bold">✓ Ventaja diferencial:</span> Integración completa de IA en todos los módulos
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}