// src/components/commercial-landing/CommercialLandingPage.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Globe, MessageCircle, BarChart3, ShoppingCart, Users, Rocket, Shield, Cpu, Code } from 'lucide-react';
import Link from 'next/link';
import { generateStructuredData, generateFAQSchema, generateOrganizationSchema } from '@/lib/seoUtils';

export default function CommercialLandingPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would connect to a backend service
    alert(`Gracias por tu interés! Te contactaremos pronto al correo: ${email}`);
    setEmail('');
  };

  const features = [
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Sitios Web Potenciados por IA",
      description: "Creamos sitios web inteligentes que se adaptan y evolucionan con tu negocio, con contenido generado automáticamente."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-secondary" />,
      title: "Chat Omnicanal",
      description: "Atiende a tus clientes en todos los canales simultáneamente: web, WhatsApp, Facebook, Instagram y email."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-tertiary" />,
      title: "Métricas Avanzadas",
      description: "Visualiza el rendimiento de tu negocio en tiempo real con dashboards personalizados y análisis predictivo."
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-accent" />,
      title: "Ventas Asistidas por IA",
      description: "Incrementa tus conversiones con recomendaciones inteligentes y embudos de venta automatizados."
    }
  ];

  const benefits = [
    "Diseño responsive y moderno",
    "Integración con redes sociales",
    "SEO optimizado",
    "Soporte 24/7",
    "Actualizaciones automáticas",
    "Escalabilidad ilimitada"
  ];

  const plans = [
    {
      name: "Básico",
      price: "$49",
      period: "mes",
      features: [
        "Sitio web básico con IA",
        "Chat en sitio web",
        "500 mensajes mensuales",
        "Estadísticas básicas"
      ],
      cta: "Comenzar ahora"
    },
    {
      name: "Profesional",
      price: "$99",
      period: "mes",
      features: [
        "Sitio web avanzado con IA",
        "Chat omnicanal",
        "2,000 mensajes mensuales",
        "Estadísticas avanzadas",
        "Integración con redes"
      ],
      cta: "Comenzar ahora",
      popular: true
    },
    {
      name: "Empresarial",
      price: "$199",
      period: "mes",
      features: [
        "Sitio web premium con IA",
        "Chat omnicanal ilimitado",
        "Mensajes ilimitados",
        "Estadísticas avanzadas",
        "Integración completa",
        "Soporte prioritario"
      ],
      cta: "Comenzar ahora"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "¿Necesito conocimientos técnicos para usar la plataforma?",
      answer: "No, nuestra plataforma está diseñada para ser intuitiva y fácil de usar, incluso sin conocimientos técnicos previos."
    },
    {
      question: "¿Cuánto tiempo tarda en crearse un sitio web con IA?",
      answer: "Con nuestra tecnología de IA, un sitio web básico puede estar listo en cuestión de minutos."
    },
    {
      question: "¿Puedo migrar mi sitio web actual a la plataforma?",
      answer: "Sí, ofrecemos servicios de migración para que puedas aprovechar nuestras herramientas con tu contenido existente."
    }
  ];

  // Structured data
  const organizationSchema = generateOrganizationSchema();
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={organizationSchema}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block">Transforma tu Negocio con</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mt-2">
                Inteligencia Artificial
              </span>
            </motion.h1>
            <motion.p 
              className="mt-6 max-w-lg mx-auto text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Sitios web inteligentes, atención al cliente automatizada y ventas asistidas por IA. Todo en una plataforma.
            </motion.p>
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                href="#planes" 
                className="px-8 py-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                Crear mi sitio con IA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#contacto" 
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                Hablar con un asesor
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Soluciones Integrales para tu Negocio</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Todo lo que necesitas para digitalizar y potenciar tu empresa con inteligencia artificial.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-center">{feature.title}</h3>
                  <p className="mt-2 text-gray-300 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">¿Cómo Funciona?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Implementa inteligencia artificial en tu negocio en simples pasos.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex justify-center">
                  <div className="bg-primary rounded-full p-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold">1. Configuración</h3>
                <p className="mt-2 text-gray-300">
                  Responde unas preguntas sobre tu negocio y nuestra IA crea tu sitio web personalizado.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex justify-center">
                  <div className="bg-secondary rounded-full p-4">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold">2. Personalización</h3>
                <p className="mt-2 text-gray-300">
                  Ajusta el diseño, contenido y funcionalidades según las necesidades de tu negocio.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex justify-center">
                  <div className="bg-tertiary rounded-full p-4">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold">3. Lanzamiento</h3>
                <p className="mt-2 text-gray-300">
                  Publica tu sitio y comienza a atraer clientes con inteligencia artificial trabajando para ti.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold">Beneficios Exclusivos</h2>
              <p className="mt-4 text-xl text-gray-300">
                Descubre por qué miles de empresas eligen nuestra plataforma.
              </p>
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="mt-10 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
                <div className="aspect-w-16 aspect-h-9">
                  <div className="bg-gray-700 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                    <Code className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planes" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Planes y Precios</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Elige el plan perfecto para tu negocio.
            </p>
          </div>

          <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative p-8 bg-gray-900 border rounded-2xl shadow-sm ${
                  plan.popular ? 'ring-2 ring-primary border-primary' : 'border-gray-700'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute top-0 py-1.5 px-4 bg-primary rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
                    Más popular
                  </div>
                )}
                <div className="flex justify-center">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                </div>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-xl font-semibold">/{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="#contacto"
                    className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium ${
                      plan.popular
                        ? 'bg-primary hover:bg-blue-700 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Preguntas Frecuentes</h2>
            <p className="mt-4 text-xl text-gray-300">
              Todo lo que necesitas saber sobre nuestra plataforma.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                <p className="mt-4 text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="mt-4 text-xl text-white/90">
              Únete a miles de empresas que ya están utilizando inteligencia artificial para crecer.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 sm:flex">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary rounded-md"
                placeholder="Ingresa tu email"
              />
              <button
                type="submit"
                className="mt-3 w-full sm:mt-0 sm:ml-3 sm:flex-shrink-0 px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
              >
                Comenzar ahora
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}