import type { Metadata } from 'next'
import Hero from './_components/Hero'
import StatsSection from './_components/StatsSection'
import FeaturesSection from './_components/FeaturesSection'
import CTABanner from './_components/CTABanner'

export const metadata: Metadata = {
  title: 'BarcaPulse — Més que un club',
  description:
    'Az FC Barcelona rajongóinak prémium platformja. Hírek, élő meccskövetés, jegyek, webshop és közösség egy helyen.',
}

export default function LandingPage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <CTABanner />
    </>
  )
}
