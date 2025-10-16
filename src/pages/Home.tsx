/**
 * Home.tsx
 * Landing page assembling all sections for AI agents offering.
 * Enhanced with SEO components and conversion optimization sections.
 */
import React from 'react'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Pricing from '../components/sections/Pricing'
import Features from '../components/sections/Features'
import Process from '../components/sections/Process'
import Testimonials from '../components/sections/Testimonials'
import FAQ from '../components/sections/FAQ'
import Contact from '../components/sections/Contact'
import Footer from '../components/layout/Footer'
import SuccessStories from '../components/sections/SuccessStories'
import Comparison from '../components/sections/Comparison'
import TrustSignals from '../components/sections/TrustSignals'
import StructuredData from '../components/seo/StructuredData'

/**
 * Organization schema for SEO structured data
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Agentes IA",
  "description": "Soluciones de inteligencia artificial para automatización empresarial",
  "url": "https://agentesia.com",
  "logo": "https://agentesia.com/logo.png",
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  },
  "areaServed": "Worldwide",
  "knowsAbout": [
    "Inteligencia Artificial",
    "Automatización de Procesos",
    "Machine Learning",
    "Chatbots Empresariales",
    "Asistentes Virtuales IA"
  ]
};

/**
 * Home page with complete content and enhanced SEO structure.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <StructuredData data={organizationSchema} />
      <Navbar />
      <main>
        <Hero />
        <TrustSignals />
        <Services />
        <Pricing />
        <Features />
        <Process />
        <SuccessStories />
        <Comparison />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
