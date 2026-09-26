// src/app/(i18n)/[lang]/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BaseLayout from '@/app/base-layout';
import ClientShell from '@/app/ClientShell';
import RightPanelChat from '@/components/landing/RightPanelChat';

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ColombiaTIC IA Ecosystem - Inteligencia Artificial para Negocios",
  description:
    "Ecosistema de inteligencia artificial para atención al cliente, ventas automatizadas y sitios web inteligentes. Soluciones IA desarrolladas en Colombia.",
  keywords: [
    "Colombia TIC",
    "IA",
    "Inteligencia Artificial",
    "Chatbot",
    "Automatización",
    "Ventas automatizadas",
    "Atención al cliente",
    "Sitios web inteligentes",
    "Tecnología en Colombia",
    "Startup IA",
  ],
  authors: [{ name: "Colombia TIC Ingeniería SAS" }],
  creator: "Colombia TIC Ingeniería SAS",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // Await the params to resolve the dynamic segment
  const { lang } = await params;

  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-textPrimary antialiased min-h-screen`}
      >
        <BaseLayout>
          <LanguageProvider initialLocale={lang as any}>
            <div className="min-h-screen bg-[#0C1116]">
              <div className="fixed top-0 left-0 w-full z-[9999]">
                <ClientShell />
              </div>
              
              {/* Versión desktop - Layout dual panel */}
              <div className="hidden md:flex pt-[72px]">
                {/* Panel izquierdo - Contenido con scroll */}
                <div className="flex-1 overflow-y-auto pr-[420px]">
                  <main className="p-6">
                    {children}
                  </main>
                </div>
                
                {/* Panel derecho - Asistente IA fijo */}
                <div className="fixed top-[72px] right-0 w-[420px] h-[calc(100vh-72px)] z-[9998] border-l border-[rgba(255,255,255,0.07)]">
                  <div 
                    className="h-full"
                    style={{
                      background: 'linear-gradient(145deg, #0D1117, #10151B)',
                    }}
                  >
                    <RightPanelChat />
                  </div>
                </div>
              </div>
              
              {/* Versión mobile */}
              <div className="md:hidden pt-[72px] flex flex-col h-screen">
                <div className="flex-1 overflow-y-auto p-4">
                  <main className="p-4">
                    {children}
                  </main>
                </div>
                
                {/* Chat container centrado en mobile */}
                <div className="mx-4 mb-6 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)]">
                  <div 
                    className="backdrop-blur-2xl rounded-2xl"
                    style={{
                      background: 'linear-gradient(145deg, #0D1117, #10151B)',
                    }}
                  >
                    <RightPanelChat />
                  </div>
                </div>
              </div>
            </div>
          </LanguageProvider>
        </BaseLayout>
      </body>
    </html>
  );
}