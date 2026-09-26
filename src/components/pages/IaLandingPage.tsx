// src/components/pages/IaLandingPage.tsx
"use client";

import HeroIA from "@/components/sections/HeroIA";
import HowItWorks from "@/components/sections/HowItWorks";
import Solutions from "@/components/sections/Solutions";
import Pricing from "@/components/sections/Pricing";
import WebsiteAI from "@/components/sections/WebsiteAI";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";
import Legal from "@/components/sections/Legal";
import Footer from "@/components/layout/Footer";
import FrontdeskChat from "@/components/chat/FrontdeskChat";

export default function IaLandingPage() {
  return (
    <main className="flex flex-col space-y-0">
      {/* Hero Section - Digital Asset Infrastructure */}
      <section id="hero" className="relative w-full">
        <HeroIA />
      </section>

      {/* How It Works Section - Platform Capabilities */}
      <section id="how-it-works" className="relative w-full bg-surface/50">
        <HowItWorks />
      </section>

      {/* Solutions Section - Service Offerings */}
      <section id="solutions" className="relative w-full bg-background">
        <Solutions />
      </section>

      {/* Pricing Section - Plans & Packages */}
      <section id="pricing" className="relative w-full bg-surface/50">
        <Pricing />
      </section>

      {/* Website AI Section - Target Audience Solutions */}
      <section id="website-ai" className="relative w-full bg-background">
        <WebsiteAI />
      </section>

      {/* Testimonials Section - Customer Success Stories */}
      <section id="testimonials" className="relative w-full bg-surface/50">
        <Testimonials />
      </section>

      {/* Contact CTA Section - Call to Action */}
      <section id="contact" className="relative w-full bg-background">
        <ContactCTA />
      </section>

      {/* Legal Section - Compliance & Policies */}
      <section id="legal" className="relative w-full bg-surface/50">
        <Legal />
      </section>

      {/* Footer Section */}
      <section id="footer" className="relative w-full bg-background">
        <Footer />
      </section>

      {/* Frontdesk Chat - Sprint 1 */}
      <FrontdeskChat autoOpen={true} />
    </main>
  );
}