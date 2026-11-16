import { MotionConfig } from 'framer-motion'
import { DemoProvider } from './components/DemoContext'
import { CountrySection } from './components/sections/CountrySection'
import { CtaSection } from './components/sections/CtaSection'
import { FaqSection } from './components/sections/FaqSection'
import { Footer } from './components/sections/Footer'
import { Hero } from './components/sections/Hero'
import { MatchSection } from './components/sections/MatchSection'
import { Navbar } from './components/sections/Navbar'
import { SatSection } from './components/sections/SatSection'
import { SessionsSection } from './components/sections/SessionsSection'
import { StatsSection } from './components/sections/StatsSection'
import { SubjectsSection } from './components/sections/SubjectsSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { TrustSection } from './components/sections/TrustSection'
import { TutorsSection } from './components/sections/TutorsSection'
import { VideoSection } from './components/sections/VideoSection'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
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
        </main>
        <Footer />
      </DemoProvider>
    </MotionConfig>
  )
}
