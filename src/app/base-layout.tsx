// src/app/base-layout.tsx
// Layout base simplificado para la aplicación

import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
};

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-textPrimary antialiased min-h-screen`}>
      {children}
    </div>
  );
}