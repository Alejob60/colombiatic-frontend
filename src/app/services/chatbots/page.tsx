// src/app/services/chatbots/page.tsx
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
import { MessagesSquare, Share2, Workflow } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://colombiatic.com.co"),
  title: "Chatbots de IA omnicanal | ColombiaTIC",
  description:
    "Chatbots de inteligencia artificial para WhatsApp, Instagram, Facebook, Telegram y web. Un solo agente, todos tus canales, respuestas en español y seguimiento comercial automatico.",
  alternates: {
    canonical: "/services/chatbots",
  },
  openGraph: {
    title: "Chatbots de IA omnicanal | ColombiaTIC",
    description:
      "Un solo agente de inteligencia artificial para WhatsApp, Instagram, Facebook, Telegram y web, con respuestas en espanol y seguimiento comercial automatico.",
    url: "https://colombiatic.com.co/services/chatbots",
    siteName: "ColombiaTIC",
    locale: "es_CO",
    type: "website",
  },
};

const features = [
  {
    icon: Share2,
    title: "Omnicanal de verdad",
    description:
      "Conectamos tu agente a los canales donde ya estan tus clientes, para que la conversacion empiece donde ellos estan y no en otro formulario.",
    items: [
      "WhatsApp, Instagram, Facebook y Telegram",
      "Widget web incrustable en tu sitio",
      "Historial unificado por cliente",
    ],
  },
  {
    icon: MessagesSquare,
    title: "Respuestas en contexto",
    description:
      "El agente entiende la intencion del cliente, responde con informacion real de tu negocio y aprende de cada conversacion para mejorar.",
    items: [
      "Entrenamiento con tu catalogo y politicas",
      "Tono configurable por canal y por industria",
      "Escalamiento a un asesor humano cuando hace falta",
    ],
  },
  {
    icon: Workflow,
    title: "Del chat a la venta",
    description:
      "Cada conversacion se convierte en una oportunidad priorizada que tu equipo comercial puede revisar y cerrar.",
    items: [
      "Calificacion y puntuacion de prospectos",
      "Envio automatico de leads al CRM",
      "Seguimiento y recordatorios programados",
    ],
  },
];

export default function ChatbotsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            Chatbots de inteligencia artificial omnicanal
          </h1>
          <p className="text-gray-400">
            Tus clientes te escriben por WhatsApp, Instagram, Facebook, Telegram o
            desde tu propia web, y cada conversacion empieza en un lugar distinto.
            Un agente de inteligencia artificial conecta los cuatro canales y
            responde siempre en espanol, con la informacion real de tu negocio y sin
            importar de noche, tarde o festivo. Asi cada conversacion se convierte en
            una oportunidad que tu equipo comercial puede cerrar.
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
          <Link href="/contact" className={buttonVariants({ size: "lg" })}>
            Solicitar cotizacion
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
