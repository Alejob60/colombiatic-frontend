import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  ],
  authors: [{ name: "Colombia TIC Ingeniería SAS" }],
  creator: "Colombia TIC Ingeniería SAS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text`}
      >
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
