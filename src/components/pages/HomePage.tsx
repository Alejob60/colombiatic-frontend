<<<<<<< HEAD
// src/app/homepage.tsx

import HeroSection from "@/components/sections/HeroSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";
import SuccessCasesSection from "../sections/SuccesCasesSection";
import CallToAction from "@/components/sections/CallToAction";
export default function HomePage() {
  return (
    <main className="flex flex-col space-y-0 pt-[64px]">

      <HeroSection />
      <WhyChooseUsSection />
      <PartnersSection />
      <ServicesSection />
      <SuccessCasesSection />
      <CallToAction />
      <ContactSection />
    </main>
=======
"use client";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ContactSection from "@/components/sections/ContactSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PartnersSection />
      <ContactSection />
    </>
>>>>>>> feature/hero-section
  );
}
