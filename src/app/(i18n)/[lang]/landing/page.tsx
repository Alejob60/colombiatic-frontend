import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales } from '@/lib/locales';
import LandingSections from '@/components/landing/LandingSections';

export function generateStaticParams() {
  return locales.map((entry) => ({ lang: entry.locale }));
}

export const metadata: Metadata = {
  title: 'Automatizamos lo repetitivo. Resolvemos lo complejo. Optimizamos lo caro.',
  description:
    'Sistemas autónomos que convierten procesos manuales en operaciones medibles, con cumplimiento normativo verificado y sin que tu equipo cambie de proveedor. IA aplicada a gobierno y comercio.',
  keywords: [
    'automatización con IA',
    'sistemas autónomos',
    'IA soberana',
    'cumplimiento normativo',
    'orquestación de agentes de IA',
    'LegalTech Colombia',
    'Goverment tech IA',
    'Memory OS',
    'automatización empresarial',
    'Cali-Lex',
    'Misybot',
    'Twin AI',
    'Orbital Prime',
  ],
  authors: [{ name: 'ColombiaTIC Ingeniería SAS' }],
  creator: 'ColombiaTIC Ingeniería SAS',
  alternates: {
    canonical: '/es',
    languages: {
      es: '/es',
      en: '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    alternateLocale: 'en_US',
    siteName: 'ColombiaTIC',
    title: 'Automatizamos lo repetitivo. Resolvemos lo complejo. Optimizamos lo caro.',
    description:
      'Sistemas autónomos que convierten procesos manuales en operaciones medibles, con cumplimiento normativo verificado.',
  },
};

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!locales.some((entry) => entry.locale === lang)) {
    notFound();
  }

  return <LandingSections />;
}
