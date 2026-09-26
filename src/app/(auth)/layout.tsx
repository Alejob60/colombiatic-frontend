// src/app/(auth)/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { TenantProvider } from "@/contexts/TenantContext";
import AuthNavbar from '@/app/(auth)/components/AuthNavbar';

// Tipografías de Google (Geist)
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

// Metadatos para SEO
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

// Layout principal de la app
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-textPrimary antialiased min-h-screen`}
      >
        <TenantProvider>
          <AuthProvider>
            <AuthNavbar />
            <div className="pt-[72px]">
              {children}
            </div>
          </AuthProvider>
        </TenantProvider>
      </body>
    </html>
  );
}