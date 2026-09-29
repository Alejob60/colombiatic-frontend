// src/app/(i18n)/[lang]/layout.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BaseLayout from '@/app/base-layout';
import ClientShell from '@/app/ClientShell';
import RightPanelChat from '@/components/landing/RightPanelChat';
import PartnerTicker from '@/components/landing/PartnerTicker';

import { locales } from '@/lib/locales';

const SUPPORTED_LOCALES: string[] = locales.map((entry) => entry.locale);

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

  if (!SUPPORTED_LOCALES.includes(lang)) {
    notFound();
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-textPrimary antialiased min-h-screen scroll-smooth`}
    >
      <BaseLayout>
        <LanguageProvider initialLocale={lang as any}>
          <div className="min-h-screen bg-[#0C1116]">
            <div className="fixed top-0 left-0 w-full z-[9999]">
              <ClientShell />
            </div>

            <div className="pt-[72px]">
              <PartnerTicker />
              <main className="p-4 sm:p-6">{children}</main>
            </div>

            <RightPanelChat />
          </div>
        </LanguageProvider>
      </BaseLayout>
    </div>
  );
}