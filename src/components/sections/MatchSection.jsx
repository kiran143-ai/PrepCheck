import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { MATCH_GALLERY, MATCH_STEPS } from '../../data/content'
import { img } from '../../data/images'
import { useDemo } from '../DemoContext'
import { Button } from '../ui/Button'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

export function MatchSection() {
  const { openDemo } = useDemo()
  return (
    <section aria-labelledby="match-title" className="container-site pt-16 sm:pt-20">
      <Reveal className="grid items-center gap-10 rounded-3xl bg-panel p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:py-12">
        <div>
          <div className="group overflow-hidden rounded-2xl">
            <motion.img
              src={img['match-school']}
              alt="Red-brick school building with a clock tower and green lawn"
              width={488}
              height={305}
              loading="lazy"
              decoding="async"
              className="aspect-[488/305] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <RevealGroup as="ul" className="mt-3 grid grid-cols-3 gap-3" stagger={0.1}>
            {MATCH_GALLERY.map((g) => (
              <RevealItem as="li" key={g.src} className="group overflow-hidden rounded-xl">
                <img
                  src={g.src}
                  alt={g.alt}
                  width={155}
                  height={116}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[155/116] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div>
          <h2 id="match-title" className="heading-lg text-[clamp(1.75rem,3.8vw,2.375rem)] leading-[1] text-ink">
            How We Match a Tutor with Your Child
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-muted">
            We start by understanding your child’s learning style, goals and the subjects they find hardest. Our
            counselors then hand-pick a tutor who fits — and we keep checking in so you can watch the difference.
          </p>
          <RevealGroup as="ul" className="mt-6 space-y-3" stagger={0.09}>
            {MATCH_STEPS.map((step) => (
              <RevealItem as="li" key={step} className="flex items-start gap-3 text-[15px] leading-5 text-ink">
                <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {step}
              </RevealItem>
            ))}
          </RevealGroup>
          <Button arrow className="mt-8 h-11 px-6 text-[15px]" onClick={() => openDemo()}>
            Book Expert Counseling
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
