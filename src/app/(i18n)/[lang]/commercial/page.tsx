// src/app/(i18n)/[lang]/commercial/page.tsx
"use client";

import CommercialLandingPage from '@/components/commercial-landing/CommercialLandingPage';
import Footer from '@/components/layout/Footer';

export default function CommercialPage() {
  return (
    <>
      <CommercialLandingPage />
      <Footer />
    </>
  );
}