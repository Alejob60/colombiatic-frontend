// src/app/services/ai-websites/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { Bot, Gauge, Search } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://colombiatic.com.co"),
  title: "Sitios web con IA | ColombiaTIC",
  description:
    "Sitios web rápidos, optimizados para SEO y con un asistente de ventas con inteligencia artificial que atiende, califica y convierte visitantes 24/7.",
  alternates: {
    canonical: "/services/ai-websites",
  },
  openGraph: {
    title: "Sitios web con IA | ColombiaTIC",
    description:
      "Sitios web rápidos, optimizados para SEO y con un asistente de ventas con inteligencia artificial que atiende, qualify y convierte 24/7.",
    url: "https://colombiatic.com.co/services/ai-websites",
    siteName: "ColombiaTIC",
    locale: "es_CO",
    type: "website",
  },
};

const features = [
  {
    icon: Gauge,
    title: "Rendimiento y SEO técnico",
    description:
      "Sitios construidos con Next.js y React, con carga rápida, diseño responsive y una base técnica optimizada para posicionar en buscadores.",
    items: [
      "Renderizado en servidor y generación estática",
      "Core Web Vitals optimizados",
      "Datos estructurados y metadatos por página",
    ],
  },
  {
    icon: Bot,
    title: "Asistente de ventas con IA",
    description:
      "Un agente conversa con tus visitantes en el sitio, responde preguntas frecuentes, recopila datos de contacto y entrega oportunidades calificadas a tu CRM.",
    items: [
      "Atención y conversión 24/7",
      "Calificación de prospectos en la conversación",
      "Entrega de leads al CRM y al equipo comercial",
    ],
  },
  {
    icon: Search,
    title: "Analítica comercial",
    description:
      "Visibilidad clara del comportamiento de tus visitantes para tomar decisiones de marketing basadas en datos y no en suposiciones.",
    items: [
      "Embudos y páginas de mayor rendimiento",
      "Integración con tus herramientas de medición",
      "Reportes periódicos de rendimiento",
    ],
  },
];

export default function AIWebsitesPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            Sitios web con inteligencia artificial
          </h1>
          <p className="text-gray-400">
            Un sitio web no debería ser solo una vitrina: debería vender. Diseñamos
            sitios rápidos y optimizados para SEO que incorporan un asistente de
            inteligencia artificial capaz de atender a tus visitantes, responder sus
            preguntas y entregarte oportunidades calificadas mientras tú te
            enfocas en cerrar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="bg-surface border-gray-700">
                <CardHeader>
                  <Icon className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-xl text-white">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className={buttonVariants({ size: "lg" })}
          >
            Solicitar cotización
          </Link>
          <Link
            href="/services"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Ver todos los servicios
          </Link>
        </div>
      </div>
    </div>
  );
}
