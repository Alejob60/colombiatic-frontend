'use client';

import HeroRotating from '@/components/landing/HeroRotating';
import StickySalesCta from '@/components/landing/StickySalesCta';
import EcosystemSection from '@/components/landing/EcosystemSection';
import CapabilitiesSection from '@/components/landing/CapabilitiesSection';
import SectorsSection from '@/components/landing/SectorsSection';
import TractionSection from '@/components/landing/TractionSection';
import PhasesSection from '@/components/landing/PhasesSection';
import ContactForm from '@/components/landing/ContactForm';
import LandingFooter from '@/components/landing/LandingFooter';

export default function LandingSections() {
  return (
    <div className="min-h-screen bg-[#0C1116]">
      <HeroRotating />
      <StickySalesCta />
      <EcosystemSection />
      <CapabilitiesSection />
      <SectorsSection />
      <TractionSection />
      <PhasesSection />
      <ContactForm />
      <LandingFooter />
    </div>
  );
}
