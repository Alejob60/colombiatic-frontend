'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServicesSection from '../components/sections/ServicesSection'
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      
      <Footer />
    </>
  )
}
