'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const NAV_ITEMS = [
  { key: 'home', href: '' },
  { key: 'capabilities', href: '#capacidades' },
  { key: 'sectors', href: '#sectores' },
  { key: 'traction', href: '#traccion' },
  { key: 'contact', href: '#contacto' },
];

export default function Navbar() {
  const { t, locale } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const hrefFor = (href: string) => (href ? `/${locale}${href}` : `/${locale}`);

  return (
    <nav className="fixed top-0 left-0 w-full h-[72px] z-[9999] bg-[#0C1116]/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
        <Link href={hrefFor('')} className="flex-shrink-0 flex items-center">
          <span className="text-white font-bold">ColombiaTIC</span>
        </Link>

        <div className="hidden md:block">
          <div className="flex items-center space-x-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={hrefFor(item.href)}
                className="text-[#E6EDF3] hover:text-[#5EA0FF] px-3 py-2 text-sm font-medium transition-colors"
              >
                {t(`navbar.${item.key}`)}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link
              href={hrefFor('/login')}
              className="text-[#94A3B8] hover:text-[#E6EDF3] px-3 py-2 text-sm font-medium transition-colors"
            >
              {t('navbar.login')}
            </Link>
            <Link
              href={`/${locale}#contacto`}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #1A2633, #253545)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#E6EDF3',
                boxShadow: 'inset 0 0 12px rgba(153, 201, 255, 0.2), 0 0 18px rgba(0,0,0,0.4)',
              }}
            >
              {t('landing.hero.ctaPrimary')}
            </Link>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-[#94A3B8] hover:text-[#E6EDF3] hover:bg-[rgba(255,255,255,0.04)] focus:outline-none"
            aria-expanded={isOpen}
          >
            <span className="sr-only">{t('navbar.openMenu')}</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0C1116]/95 backdrop-blur-lg border-t border-[rgba(255,255,255,0.07)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={hrefFor(item.href)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#E6EDF3] hover:text-[#5EA0FF] hover:bg-[rgba(255,255,255,0.04)]"
                onClick={() => setIsOpen(false)}
              >
                {t(`navbar.${item.key}`)}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-[rgba(255,255,255,0.07)]">
              <div className="flex items-center px-5">
                <Link
                  href={hrefFor('/login')}
                  className="text-[#94A3B8] hover:text-[#E6EDF3] block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {t('navbar.login')}
                </Link>
              </div>
              <div className="mt-3 px-5">
                <Link
                  href={`/${locale}#contacto`}
                  className="block text-center px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #1A2633, #253545)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#E6EDF3',
                    boxShadow: 'inset 0 0 12px rgba(153, 201, 255, 0.2), 0 0 18px rgba(0,0,0,0.4)',
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {t('landing.hero.ctaPrimary')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
