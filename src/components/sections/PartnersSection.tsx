// src/components/sections/PartnersSection.tsx

import Image from "next/image";

export default function PartnersSection() {
  return (
    <section className="w-full py-20 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
          Aliados estratégicos
        </h2>

        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-base">
          Trabajamos junto a líderes globales en tecnología, infraestructura e innovación
          para brindar soluciones sólidas y escalables en toda Colombia.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          {logos.map((logo) => (
            <div key={logo.alt} className="opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="mx-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const logos = [
  {
    src: "/aws.png",
    alt: "Amazon Web Services",
    width: 120,
    height: 40,
  },
  {
    src: "/openai.png",
    alt: "OpenAI",
    width: 120,
    height: 40,
  },
  {
    src: "/gobierno.png",
    alt: "Gobierno de Colombia",
    width: 120,
    height: 40,
  },
  {
    src: "/react.png",
    alt: "React",
    width: 100,
    height: 40,
  },
];
