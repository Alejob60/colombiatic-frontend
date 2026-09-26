// src/app/services/process-automation/page.tsx
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
import { BellRing, PlugZap, Timer } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://colombiatic.com.co"),
  title: "Automatizacion de procesos | ColombiaTIC",
  description:
    "Automatiza los procesos manuales de tu empresa con flujos inteligentes: tareas programadas, integraciones entre aplicaciones y notificaciones automaticas. Sin equipo tecnico.",
  alternates: {
    canonical: "/services/process-automation",
  },
  openGraph: {
    title: "Automatizacion de procesos | ColombiaTIC",
    description:
      "Flujos inteligentes para automatizar tareas manuales, integrar tus aplicaciones y disparar notificaciones sin intervencion humana.",
    url: "https://colombiatic.com.co/services/process-automation",
    siteName: "ColombiaTIC",
    locale: "es_CO",
    type: "website",
  },
};

const features = [
  {
    icon: Timer,
    title: "Tareas que se ejecutan solas",
    description:
      "Definimos contigo las tareas repetitivas del dia a dia y las convertimos en flujos que se ejecutan en el horario que necesitas.",
    items: [
      "Programacion de tareas por dia, hora o evento",
      "Reintentos y alertas ante fallos",
      "Historial auditable de cada ejecucion",
    ],
  },
  {
    icon: PlugZap,
    title: "Tus herramientas, conectadas",
    description:
      "Conectamos las aplicaciones que ya usas para que la informacion fluya de un sistema a otro sin copiar y pegar a mano.",
    items: [
      "Integracion con CRM, correo y hojas de calculo",
      "Webhooks y API para procesos a medida",
      "Sincronizacion de datos entre sistemas",
    ],
  },
  {
    icon: BellRing,
    title: "Notificaciones en el momento justo",
    description:
      "Tu equipo recibe el aviso cuando algo requiere atencion, con el contexto necesario para actuar sin buscar informacion en otro lado.",
    items: [
      "Alertas por correo, chat y webhook",
      "Resumos automaticos diarios y semanales",
      "Reportes de rendimiento en tiempo real",
    ],
  },
];

export default function ProcessAutomationPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            Automatizacion de procesos empresariales
          </h1>
          <p className="text-gray-400">
            Parte del tiempo de tu equipo se va en tareas repetitivas que no requieren
            criterio: copiar datos, enviar el mismo correo, revisar un formulario o
            perseguir a alguien que falta. Convertimos esa carga en flujos
            inteligentes que se ejecutan solos, conectan tus herramientas y avisan a
            las personas correctas, para que tu equipo se concentre en lo que si
            aporta valor.
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
