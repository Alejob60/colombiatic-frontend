// src/components/sections/PricingSection.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$39",
    period: "por mes",
    description: "Perfecto para emprendedores y pequeños negocios",
    popular: false,
    features: [
      { text: "1 canal de comunicación", included: true },
      { text: "1.000 mensajes mensuales", included: true },
      { text: "Respuestas automatizadas", included: true },
      { text: "Dashboard básico", included: true },
      { text: "Integración WhatsApp", included: true },
      { text: "Soporte por email", included: true },
      { text: "Integración Instagram", included: false },
      { text: "Sitio web + SEO", included: false },
      { text: "Asistente de ventas IA", included: false },
      { text: "Soporte prioritario", included: false }
    ]
  },
  {
    name: "Business",
    price: "$99",
    period: "por mes",
    description: "Ideal para pymes en crecimiento",
    popular: true,
    features: [
      { text: "Canales ilimitados", included: true },
      { text: "10.000 mensajes mensuales", included: true },
      { text: "Respuestas automatizadas", included: true },
      { text: "Dashboard avanzado", included: true },
      { text: "Integración WhatsApp", included: true },
      { text: "Integración Instagram", included: true },
      { text: "Sitio web básico", included: true },
      { text: "Asistente de ventas IA", included: true },
      { text: "Soporte prioritario", included: true },
      { text: "Reportes personalizados", included: false }
    ]
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "por mes",
    description: "Para empresas que buscan máxima automatización",
    popular: false,
    features: [
      { text: "Canales ilimitados", included: true },
      { text: "Mensajes ilimitados", included: true },
      { text: "Respuestas automatizadas", included: true },
      { text: "Dashboard avanzado", included: true },
      { text: "Integración WhatsApp", included: true },
      { text: "Integración Instagram", included: true },
      { text: "Sitio web + SEO premium", included: true },
      { text: "Asistente de ventas IA", included: true },
      { text: "Soporte 24/7", included: true },
      { text: "Reportes personalizados", included: true },
      { text: "Consultoría estratégica", included: true },
      { text: "Capacitación personalizada", included: true }
    ]
  }
];

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="precios" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planes y <span className="gradient-text">Precios</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Elige el plan perfecto para tu negocio y escala cuando lo necesites
          </p>
        </motion.div>

        {/* Toggle de ciclo de facturación */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-surface/80 backdrop-blur-sm rounded-full p-1 border border-gray-800">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Mensual
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "annual"
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setBillingCycle("annual")}
            >
              Anual (Ahorra 20%)
            </button>
          </div>
        </motion.div>

        {/* Grid de planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl border ${
                plan.popular
                  ? "border-primary ring-2 ring-primary/20 relative bg-surface/80 backdrop-blur-sm"
                  : "border-gray-800 bg-surface/50"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    MÁS POPULAR
                  </div>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <div className="text-4xl font-bold mb-1">
                    {plan.price}
                    <span className="text-lg text-gray-400">/{plan.period}</span>
                  </div>
                  {billingCycle === "annual" && plan.name !== "Starter" && (
                    <div className="text-sm text-gray-500">
                      Equivalente a ${(parseInt(plan.price.replace("$", "")) * 0.8).toFixed(0)}/mes
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-gray-300" : "text-gray-600"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-primary hover:bg-blue-700 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                >
                  Comenzar ahora
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota sobre precios en COP */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-500">
            * Todos los precios están en USD. Precios equivalentes en COP: Starter $159.000/mes, 
            Business $399.000/mes, Enterprise $1.199.000/mes
          </p>
        </motion.div>
      </div>
    </section>
  );
}