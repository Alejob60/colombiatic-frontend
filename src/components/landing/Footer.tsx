'use client';

import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const getFooterLinks = (locale: string) => {
  if (locale === 'en') {
    return {
      company: [
        { name: 'About', href: '/about' },
        { name: 'Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Press', href: '/press' }
      ],
      resources: [
        { name: 'Documentation', href: '/docs' },
        { name: 'API', href: '/api' },
        { name: 'Guides', href: '/guides' },
        { name: 'Tutorials', href: '/tutorials' },
        { name: 'Support', href: '/support' }
      ],
      services: [
        { name: 'AI Websites', href: '/services/web-ia' },
        { name: 'Misybot AI', href: '/services/misybot' },
        { name: 'Omnichannel Chat', href: '/services/chat' },
        { name: 'Automation', href: '/services/automation' },
        { name: 'Consulting', href: '/services/consulting' }
      ],
      legal: [
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Cookies', href: '/cookies' },
        { name: 'Licenses', href: '/licenses' },
        { name: 'Security', href: '/security' }
      ]
    };
  }

  return {
    company: [
      { name: 'Acerca de', href: '/about' },
      { name: 'Equipo', href: '/team' },
      { name: 'Carreras', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Prensa', href: '/press' }
    ],
    resources: [
      { name: 'Documentación', href: '/docs' },
      { name: 'API', href: '/api' },
      { name: 'Guías', href: '/guides' },
      { name: 'Tutoriales', href: '/tutorials' },
      { name: 'Soporte', href: '/support' }
    ],
    services: [
      { name: 'Sitios Web IA', href: '/services/web-ia' },
      { name: 'Misybot AI', href: '/services/misybot' },
      { name: 'Chat Omnicanal', href: '/services/chat' },
      { name: 'Automatización', href: '/services/automation' },
      { name: 'Consultoría', href: '/services/consulting' }
    ],
    legal: [
      { name: 'Términos', href: '/terms' },
      { name: 'Privacidad', href: '/privacy' },
      { name: 'Cookies', href: '/cookies' },
      { name: 'Licencias', href: '/licenses' },
      { name: 'Seguridad', href: '/security' }
    ]
  };
};

export default function Footer() {
  const { locale } = useLanguage();
  const footerLinks = getFooterLinks(locale);

  const sectionTitles = {
    company: locale === 'es' ? 'Empresa' : 'Company',
    resources: locale === 'es' ? 'Recursos' : 'Resources',
    services: locale === 'es' ? 'Servicios' : 'Services',
    legal: locale === 'es' ? 'Legales' : 'Legal'
  };

  const contactInfo = {
    email: 'contacto@colombiatic.com',
    phone: '+57 300 123 4567',
    location: locale === 'es' ? 'Bogotá, Colombia' : 'Bogotá, Colombia'
  };

  const description = locale === 'es' 
    ? 'Transformamos negocios con inteligencia artificial, automatización y ecosistemas digitales unificados. Democratizamos la tecnología de vanguardia para pymes y empresas en Colombia.'
    : 'We transform businesses with artificial intelligence, automation and unified digital ecosystems. We democratize cutting-edge technology for SMEs and companies in Colombia.';

  const rightsText = locale === 'es' 
    ? `© ${new Date().getFullYear()} ColombiaTIC Ingeniería SAS. Todos los derechos reservados.`
    : `© ${new Date().getFullYear()} ColombiaTIC Engineering SAS. All rights reserved.`;

  return (
    <footer className="bg-[#0C1116] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#5EA0FF] to-[#3BA5FF] bg-clip-text text-transparent">
                ColombiaTIC
              </span>
            </Link>
            <p className="mt-4 text-[#A1A1AA] max-w-md">
              {description}
            </p>
            
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-[#A1A1AA] hover:text-[#5EA0FF] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#A1A1AA] hover:text-[#5EA0FF] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#A1A1AA] hover:text-[#5EA0FF] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#A1A1AA] hover:text-[#5EA0FF] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#A1A1AA] hover:text-[#5EA0FF] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Enlaces de navegación */}
          <div>
            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">{sectionTitles.company}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={`/${locale}${item.href}`} 
                    className="text-[#A1A1AA] hover:text-[#5EA0FF] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">{sectionTitles.resources}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={`/${locale}${item.href}`} 
                    className="text-[#A1A1AA] hover:text-[#5EA0FF] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">{sectionTitles.services}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={`/${locale}${item.href}`} 
                    className="text-[#A1A1AA] hover:text-[#5EA0FF] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">{sectionTitles.legal}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={`/${locale}${item.href}`} 
                    className="text-[#A1A1AA] hover:text-[#5EA0FF] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Información de contacto y derechos */}
        <div className="border-t border-[#27272A] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#A1A1AA] text-sm">
              {rightsText}
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
              <div className="flex items-center text-[#A1A1AA] text-sm">
                <Mail className="w-4 h-4 mr-2" />
                {contactInfo.email}
              </div>
              <div className="flex items-center text-[#A1A1AA] text-sm">
                <Phone className="w-4 h-4 mr-2" />
                {contactInfo.phone}
              </div>
              <div className="flex items-center text-[#A1A1AA] text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                {contactInfo.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}