// src/app/(i18n)/[lang]/chat/page.tsx
// Página de inicio con chat

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
import SponsorsSection from '@/components/sections/SponsorsSection';

export default function ChatHomePage() {
  return (
    <>
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
    </>
  );
}