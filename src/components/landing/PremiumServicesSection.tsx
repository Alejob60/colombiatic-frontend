// src/components/landing/PremiumServicesSection.tsx
// Sección de servicios premium con animaciones y diseño futurista

"use client";

import { motion } from 'framer-motion';
import { 
  Bot, 
  Globe, 
  ShoppingCart,
  BarChart3,
  Zap,
  Cpu,
  Database,
  Shield
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Función para obtener los servicios premium según el idioma
const getPremiumServices = (locale: string) => {
  const services = {
    es: [
      {
        icon: Bot,
        title: "IA Comercial Inteligente",
        description: "Asistente virtual avanzado que gestiona ventas, atención al cliente y marketing automatizado 24/7.",
        features: [
          "Chatbot conversacional con IA generativa",
          "Gestión omnicanal de clientes potenciales",
          "Automatización de procesos comerciales"
        ]
      },
      {
        icon: Globe,
        title: "Sitio Web Comercial Premium",
        description: "Diseño web moderno con optimización SEO, integración de IA y experiencia de usuario premium.",
        features: [
          "Diseño responsive y adaptativo",
          "Optimización SEO avanzada",
          "Integración con IA de ventas"
        ]
      },
      {
        icon: ShoppingCart,
        title: "eCommerce Automatizado",
        description: "Tienda online con gestión automática de inventarios, procesamiento de pagos y logística.",
        features: [
          "Integración con Shopify/WooCommerce",
          "Gestión automática de inventarios",
          "Procesamiento seguro de pagos"
        ]
      },
      {
        icon: BarChart3,
        title: "Analítica Comercial Avanzada",
        description: "Dashboards ejecutivos con inteligencia artificial predictiva y alertas inteligentes.",
        features: [
          "KPIs en tiempo real",
          "Análisis predictivo de ventas",
          "Alertas inteligentes personalizadas"
        ]
      },
      {
        icon: Zap,
        title: "Automatización de Marketing",
        description: "Campañas automatizadas en múltiples canales con personalización basada en IA.",
        features: [
          "Email marketing automatizado",
          "Publicidad en redes sociales",
          "Segmentación inteligente de audiencias"
        ]
      },
      {
        icon: Cpu,
        title: "Integraciones Técnicas",
        description: "Conectividad con sistemas existentes y APIs para flujo de datos automatizado.",
        features: [
          "Integración con ERPs y CRMs",
          "APIs personalizadas",
          "Sincronización de datos en tiempo real"
        ]
      },
      {
        icon: Database,
        title: "Gestión de Datos",
        description: "Almacenamiento seguro, backup automático y análisis de grandes volúmenes de datos.",
        features: [
          "Almacenamiento en la nube seguro",
          "Backup automático diario",
          "Big Data analytics"
        ]
      },
      {
        icon: Shield,
        title: "Seguridad Empresarial",
        description: "Protección avanzada de datos, cumplimiento normativo y auditorías regulares.",
        features: [
          "Cifrado de extremo a extremo",
          "Cumplimiento GDPR y normativas locales",
          "Auditorías de seguridad mensuales"
        ]
      }
    ],
    en: [
      {
        icon: Bot,
        title: "Intelligent Commercial AI",
        description: "Advanced virtual assistant that manages sales, customer service and automated marketing 24/7.",
        features: [
          "Generative AI conversational chatbot",
          "Omnichannel lead management",
          "Commercial process automation"
        ]
      },
      {
        icon: Globe,
        title: "Premium Commercial Website",
        description: "Modern web design with SEO optimization, AI integration and premium user experience.",
        features: [
          "Responsive and adaptive design",
          "Advanced SEO optimization",
          "Sales AI integration"
        ]
      },
      {
        icon: ShoppingCart,
        title: "Automated eCommerce",
        description: "Online store with automatic inventory management, payment processing and logistics.",
        features: [
          "Integration with Shopify/WooCommerce",
          "Automatic inventory management",
          "Secure payment processing"
        ]
      },
      {
        icon: BarChart3,
        title: "Advanced Commercial Analytics",
        description: "Executive dashboards with predictive artificial intelligence and smart alerts.",
        features: [
          "Real-time KPIs",
          "Predictive sales analysis",
          "Custom smart alerts"
        ]
      },
      {
        icon: Zap,
        title: "Marketing Automation",
        description: "Automated campaigns across multiple channels with AI-based personalization.",
        features: [
          "Automated email marketing",
          "Social media advertising",
          "Intelligent audience segmentation"
        ]
      },
      {
        icon: Cpu,
        title: "Technical Integrations",
        description: "Connectivity with existing systems and APIs for automated data flow.",
        features: [
          "Integration with ERPs and CRMs",
          "Custom APIs",
          "Real-time data synchronization"
        ]
      },
      {
        icon: Database,
        title: "Data Management",
        description: "Secure storage, automatic backup and analysis of large volumes of data.",
        features: [
          "Secure cloud storage",
          "Daily automatic backup",
          "Big Data analytics"
        ]
      },
      {
        icon: Shield,
        title: "Enterprise Security",
        description: "Advanced data protection, regulatory compliance and regular audits.",
        features: [
          "End-to-end encryption",
          "GDPR and local regulations compliance",
          "Monthly security audits"
        ]
      }
    ]
  };

  return services[locale as keyof typeof services] || services.es;
};

export default function PremiumServicesSection() {
  const { locale } = useLanguage();
  const premiumServices = getPremiumServices(locale);

  return (
    <section className="py-20 bg-gradient-to-b from-[#0C1116] to-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'es' 
              ? 'Servicios Premium ' 
              : 'Premium Services '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#00C2FF]">
              ColombiaTIC
            </span>
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            {locale === 'es' 
              ? 'Soluciones tecnológicas de vanguardia diseñadas para transformar tu negocio' 
              : 'Cutting-edge technological solutions designed to transform your business'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {premiumServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-[#18181B] bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 border border-[#27272A] hover:border-[#0066FF]/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-[#0066FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#0066FF]/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#00C2FF]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#FFFFFF]">{service.title}</h3>
                <p className="text-[#A1A1AA] mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-sm text-[#D4D4D8]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}