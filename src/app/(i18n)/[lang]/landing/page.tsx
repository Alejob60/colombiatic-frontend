//i18n/[lang]/landing/page.tsx
'use client';

import HeroSectionWrapper from '@/components/landing/HeroSectionWrapper';
import AIEcosystemSection from '@/components/landing/AIEcosystemSection';
import PremiumServicesSection from '@/components/landing/PremiumServicesSection';
import EcosystemHowItWorksSection from '@/components/landing/EcosystemHowItWorksSection';
import SuccessCasesSection from '@/components/landing/SuccessCasesSection';
import AdvancedAISection from '@/components/landing/AdvancedAISection';
import IntegrationsSection from '@/components/landing/IntegrationsSection';
import PricingSection from '@/components/landing/PricingSection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FAQSection from '@/components/landing/FAQSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import SponsorsSection from '@/components/sections/SponsorsSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0C1116]">
      <HeroSectionWrapper />
      <AIEcosystemSection />
      <PremiumServicesSection />
      <EcosystemHowItWorksSection />
      <SuccessCasesSection />
      <AdvancedAISection />
      <IntegrationsSection />
      <PricingSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <SponsorsSection />
      <Footer />
    </div>
  );
}