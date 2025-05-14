"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Monitoreo Autónomo con Drones IA",
    description: "Vigilancia de cultivos y perímetros sin internet usando visión artificial y sensores inteligentes.",
    image: "/cases/dron-inteligente.png",
  },
  {
    title: "Plataforma Política Interactiva",
    description: "Aplicación diseñada para campañas electorales con IA para segmentación de audiencia.",
    image: "/cases/plataforma-politica.png",
  },
  {
    title: "Bot de Trading Algorítmico",
    description: "Sistema con IA para analizar mercados cripto y ejecutar operaciones en Binance.",
    image: "/cases/bot-trading.png",
  },
  {
    title: "Dashboard Inteligente para Gobierno",
    description: "Panel de control para monitorear proyectos, obras públicas y encuestas ciudadanas.",
    image: "/cases/dashboard-gobierno.png",
  },
  {
    title: "Sistema de Emergencia con IoT",
    description: "Red distribuida de dispositivos conectados para detección temprana de amenazas militares o naturales.",
    image: "/cases/emergencia-iot.png",
  },
  {
    title: "Integraciones Financieras con Blockchain",
    description: "Conectividad segura entre bancos, wallets y contratos inteligentes usando Web3.",
    image: "/cases/integration-blockchain.png",
  },
];

export default function ProjectsSection() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
  });

  const scrollPrev = () => instanceRef.current?.prev();
  const scrollNext = () => instanceRef.current?.next();

  return (
    <section className="py-24 px-6 bg-background text-center text-white">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Casos de Éxito</h2>
      <p className="text-textSecondary mb-12 max-w-3xl mx-auto">
        Algunos de nuestros desarrollos en defensa, automatización y plataformas digitales.
      </p>

      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {projects.map((project, index) => (
            <div
              key={index}
              className="keen-slider__slide bg-surface p-6 rounded-xl shadow-lg flex flex-col items-start text-left transition hover:shadow-2xl"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={350}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
              <p className="text-sm text-textSecondary">{project.description}</p>
            </div>
          ))}
        </div>

        {/* Flechas */}
        <button
          onClick={scrollPrev}
          title="Scroll to previous slide"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full"
        >
        </button>
          <ChevronLeft size={24} />
        <button
          onClick={scrollNext}
          title="Scroll to next slide"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
        
      </div>
    </section>
  );
}
