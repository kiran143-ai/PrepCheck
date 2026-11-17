import { motion, useReducedMotion } from 'framer-motion'
import { CalendarCheck, Clock, GraduationCap, ShieldCheck, Star } from 'lucide-react'
import { img } from '../../data/images'
import { DEMO_SECTION_ID } from '../DemoContext'
import { DemoForm } from '../DemoForm'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const PERKS = [
  { icon: CalendarCheck, text: 'Free 30-minute demo class with a matched expert tutor' },
  { icon: Clock, text: 'Tutor matched within 48 hours of your counseling call' },
  { icon: ShieldCheck, text: 'Verified tutors, secure sessions, no payment needed' },
]

export function CtaSection({
  eyebrow = 'Start Your Journey Today',
  title = 'Set Your Child on the Journey to Academic Excellence',
  description = 'Tell us about your child and a PrepCheck counselor will match them with the right tutor — starting with a free demo class.',
  uppercase = true,
}) {
  const reduce = useReducedMotion()
  return (
    <section id={DEMO_SECTION_ID} aria-labelledby="cta-title" className="container-site pt-20 lg:pt-[77px]">
      <Reveal className="relative overflow-hidden rounded-3xl bg-brand px-5 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full">
          {[90, 170, 250, 330, 410, 490].map((r, i) => (
            <motion.circle
              key={r}
              cx="25%"
              cy="95%"
              r={r}
              fill="none"
              stroke="rgb(255 255 255 / 0.13)"
              animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            />
          ))}
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_460px] lg:gap-14">
          {/* Left: message */}
          <div className="text-center text-white lg:text-left">
            <motion.span
              className="mx-auto grid size-12 place-items-center rounded-full bg-white/15 lg:mx-0"
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GraduationCap className="size-5" aria-hidden="true" />
            </motion.span>
            <p className="mt-5 text-[15px] text-white/90">{eyebrow}</p>
            <h2 id="cta-title" className={`heading-lg mt-2 text-[clamp(1.625rem,3.4vw,2.375rem)] leading-[1.15] ${uppercase ? 'uppercase' : ''}`}>
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-[460px] text-[15px] leading-6 text-white/80 lg:mx-0">
              {description}
            </p>

            <RevealGroup as="ul" className="mx-auto mt-7 max-w-[440px] space-y-3 text-left lg:mx-0" stagger={0.1}>
              {PERKS.map(({ icon: Icon, text }) => (
                <RevealItem as="li" key={text} className="flex items-center gap-3 text-[14.5px] text-white">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/15">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {text}
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex">
                {[img['avatar-1'], img['avatar-2'], img['avatar-3']].map((src, i) => (
                  <img key={i} src={src} alt="" width={32} height={32} loading="lazy" className="-ml-2 size-8 rounded-full object-cover ring-2 ring-brand first:ml-0" />
                ))}
              </div>
              <div className="text-left">
                <span className="flex items-center gap-1 text-[13px] font-bold text-white">
                  <Star className="size-3.5 fill-[#fbbf24] text-[#fbbf24]" aria-hidden="true" /> 4.9/5 from 500+ parents
                </span>
                <span className="block text-[12px] text-white/70">Trusted across the USA, Australia, UK and UAE</span>
              </div>
            </div>
          </div>

          {/* Right: inline form */}
          <Reveal delay={0.15} y={36}>
            <DemoForm />
          </Reveal>
        </div>
      </Reveal>
    </section>
  )
}
