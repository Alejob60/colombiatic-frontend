// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
<<<<<<< HEAD
import Footer from "@/components/layout/Footer";
=======
>>>>>>> feature/hero-section

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
  title: "Colombia TIC Ingeniería SAS",
  description:
    "Soluciones tecnológicas con IA, Blockchain, Drones Autónomos y Ciberseguridad en Colombia.",
  keywords: [
    "Colombia TIC",
    "IA",
    "Blockchain",
    "Ciberseguridad",
    "Drones",
    "Desarrollo Web",
    "Automatización",
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
<<<<<<< HEAD
        <div className="relative z-10">
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
=======
        <Navbar />
        <main className="pt-20">{children}</main>
>>>>>>> feature/hero-section
      </body>
    </html>
  );
}
