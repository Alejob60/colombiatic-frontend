// src/app/resources/page.tsx
"use client";

import Link from 'next/link';

export default function ResourcesPage() {
  const resources = [
    {
      category: "Guías y Tutoriales",
      items: [
        {
          title: "Guía Completa de Implementación de IA",
          description: "Aprende paso a paso cómo integrar inteligencia artificial en tu negocio.",
          type: "PDF",
          link: "#"
        },
        {
          title: "Tutorial: Configuración de Chatbots",
          description: "Video tutorial detallado sobre cómo configurar y personalizar tus chatbots.",
          type: "Video",
          link: "#"
        },
        {
          title: "Mejores Prácticas de Automatización",
          description: "Descubre las mejores prácticas para automatizar procesos en tu empresa.",
          type: "Artículo",
          link: "#"
        }
      ]
    },
    {
      category: "Documentación Técnica",
      items: [
        {
          title: "API Reference",
          description: "Documentación completa de nuestra API REST para desarrolladores.",
          type: "Docs",
          link: "#"
        },
        {
          title: "SDK y Librerías",
          description: "Librerías y SDKs para integrar rápidamente nuestros servicios.",
          type: "Código",
          link: "#"
        },
        {
          title: "Guía de Seguridad",
          description: "Prácticas recomendadas para mantener seguras tus integraciones.",
          type: "PDF",
          link: "#"
        }
      ]
    },
    {
      category: "Estudios de Caso",
      items: [
        {
          title: "Transformación Digital en Retail",
          description: "Cómo una cadena de retail aumentó sus ventas en 150% con IA.",
          type: "PDF",
          link: "#"
        },
        {
          title: "Automatización en Salud",
          description: "Estudio de caso sobre mejora en atención médica con asistentes virtuales.",
          type: "PDF",
          link: "#"
        },
        {
          title: "Educación Personalizada",
          description: "Cómo una universidad mejoró la retención estudiantil con IA.",
          type: "PDF",
          link: "#"
        }
      ]
    },
    {
      category: "Webinars y Eventos",
      items: [
        {
          title: "IA en 2025: Tendencias y Predicciones",
          description: "Webinar grabado sobre las tendencias más importantes en IA para 2025.",
          type: "Webinar",
          link: "#"
        },
        {
          title: "Workshop: Automatización Avanzada",
          description: "Taller práctico sobre automatización de procesos empresariales.",
          type: "Evento",
          link: "#"
        },
        {
          title: "Roundtable: IA en Latinoamérica",
          description: "Discusión con expertos sobre el impacto de la IA en la región.",
          type: "Video",
          link: "#"
        }
      ]
    }
  ];

  const faqs = [
    {
      question: "¿Cuánto tiempo tarda en implementarse una solución de IA?",
      answer: "Nuestras soluciones básicas pueden estar operativas en 48 horas. Las implementaciones más complejas varían entre 2-8 semanas dependiendo del alcance."
    },
    {
      question: "¿Qué nivel de conocimiento técnico se requiere?",
      answer: "Nuestras plataformas están diseñadas para ser intuitivas. El equipo básico puede operarlas sin conocimientos técnicos avanzados, aunque contamos con documentación detallada para desarrolladores."
    },
    {
      question: "¿Cómo se integra con mis sistemas actuales?",
      answer: "Ofrecemos múltiples métodos de integración: APIs REST, webhooks, conectores pre-construidos para sistemas populares, y soluciones personalizadas para casos específicos."
    },
    {
      question: "¿Qué tipo de soporte ofrecen?",
      answer: "Contamos con soporte técnico 24/7, documentación completa, tutoriales en video, y sesiones de capacitación personalizadas para tu equipo."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0C1116] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Recursos y Ayuda
          </h1>
          <p className="text-xl text-[#A9B8C6] max-w-3xl mx-auto">
            Todo lo que necesitas para implementar y sacar el máximo provecho de nuestras soluciones de IA
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#E6EDF3] mb-6">Biblioteca de Recursos</h2>
            
            <div className="space-y-8">
              {resources.map((resourceCategory, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-xl font-bold text-[#E6EDF3] mb-4">{resourceCategory.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resourceCategory.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-xl p-5 border border-[rgba(255,255,255,0.07)] hover:border-[#3BA5FF]/30 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-[#E6EDF3]">{item.title}</h4>
                          <span className="text-xs px-2 py-1 bg-[#3BA5FF]/10 text-[#3BA5FF] rounded-full">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-[#A3B4C8] text-sm mb-4">{item.description}</p>
                        <Link 
                          href={item.link} 
                          className="text-[#3BA5FF] hover:text-[#5EA0FF] text-sm font-medium"
                        >
                          Acceder al recurso →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-[#E6EDF3] mb-6">Preguntas Frecuentes</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-xl p-5 border border-[rgba(255,255,255,0.07)]"
                >
                  <h3 className="font-bold text-[#E6EDF3] mb-2">{faq.question}</h3>
                  <p className="text-[#A3B4C8] text-sm">{faq.answer}</p>
                </div>
              ))}
              
              <div className="mt-8 text-center">
                <Link 
                  href="/contact" 
                  className="inline-block px-6 py-3 bg-gradient-to-r from-[#1E90FF] to-[#3BA5FF] text-white font-bold rounded-lg transition-all duration-300 hover:from-[#3BA5FF] hover:to-[#1E90FF]"
                >
                  Contacta con Soporte
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.07)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#E6EDF3] mb-4">
              ¿Necesitas ayuda personalizada?
            </h2>
            <p className="text-[#A3B4C8] mb-6 max-w-2xl mx-auto">
              Nuestro equipo de expertos está listo para ayudarte con cualquier pregunta técnica o consulta sobre nuestras soluciones.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-gradient-to-r from-[#1E90FF] to-[#3BA5FF] text-white font-bold rounded-xl transition-all duration-300 hover:from-[#3BA5FF] hover:to-[#1E90FF]"
              >
                Programar una Consulta
              </Link>
              <Link 
                href="/chat" 
                className="px-8 py-4 bg-transparent border border-[rgba(255,255,255,0.1)] text-[#E6EDF3] font-bold rounded-xl transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]"
              >
                Chatear con un Experto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}