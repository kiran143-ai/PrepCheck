import { AboutHero } from '../components/about/AboutHero'
import { RoadmapSection } from '../components/about/RoadmapSection'
import { StepsSection } from '../components/about/StepsSection'
import { TeamSection } from '../components/about/TeamSection'
import { CtaSection } from '../components/sections/CtaSection'
import { usePageTitle } from '../hooks/usePageTitle'

export default function AboutPage() {
  usePageTitle('About Us — PrepCheck')
  return (
    <>
      <AboutHero />
      <StepsSection />
      <RoadmapSection />
      <TeamSection />
      <CtaSection
        eyebrow="Book a free trial"
        title="Ready to Transform Your Child’s Academic Journey?"
        description="Join thousands of students who are learning smarter and achieving their goals with PrepCheck."
        uppercase={false}
      />
    </>
  )
}
