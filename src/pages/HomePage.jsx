import { CountrySection } from '../components/sections/CountrySection'
import { CtaSection } from '../components/sections/CtaSection'
import { FaqSection } from '../components/sections/FaqSection'
import { Hero } from '../components/sections/Hero'
import { MatchSection } from '../components/sections/MatchSection'
import { SatSection } from '../components/sections/SatSection'
import { SessionsSection } from '../components/sections/SessionsSection'
import { StatsSection } from '../components/sections/StatsSection'
import { SubjectsSection } from '../components/sections/SubjectsSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { TrustSection } from '../components/sections/TrustSection'
import { TutorsSection } from '../components/sections/TutorsSection'
import { VideoSection } from '../components/sections/VideoSection'
import { usePageTitle } from '../hooks/usePageTitle'

export default function HomePage() {
  usePageTitle('PrepCheck — Exceptional Tutors for Your Child')
  return (
    <>
      <Hero />
      <TrustSection />
      <MatchSection />
      <SatSection />
      <StatsSection />
      <SubjectsSection />
      <VideoSection />
      <TutorsSection />
      <TestimonialsSection />
      <SessionsSection />
      <FaqSection />
      <CountrySection />
      <CtaSection />
    </>
  )
}
