// src/app/(i18n)/[lang]/test-layout.tsx
// Layout de prueba para diagnosticar problemas de navbar

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
  title: "Test Layout - ColombiaTIC IA",
  description: "Layout de prueba para diagnosticar problemas de navbar",
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-textPrimary antialiased min-h-screen`}
      >
        <nav className="fixed w-full z-[9999] bg-red-500 text-white p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold">TEST NAVBAR - SI ME VES, EL NAVBAR FUNCIONA</h1>
          </div>
        </nav>
        <div className="pt-[72px]">
          {children}
        </div>
      </body>
    </html>
  );
}