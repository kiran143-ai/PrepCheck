import { ContactCta } from '../components/contact/ContactCta'
import { ContactForm } from '../components/contact/ContactForm'
import { ContactHero } from '../components/contact/ContactHero'
import { ContactInfo } from '../components/contact/ContactInfo'
import { DifferenceSection } from '../components/contact/DifferenceSection'
import { Reveal } from '../components/ui/Reveal'
import { usePageTitle } from '../hooks/usePageTitle'

export default function ContactPage() {
  usePageTitle('Contact Us — PrepCheck')
  return (
    <>
      <ContactHero />
      <section aria-label="Contact details and form" className="container-site">
        <div className="grid items-start gap-6 lg:grid-cols-[400px_1fr]">
          <div className="order-2 lg:order-1">
            <ContactInfo />
          </div>
          <Reveal className="order-1 lg:order-2" delay={0.05}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
      <DifferenceSection />
      <ContactCta />
    </>
  )
}
