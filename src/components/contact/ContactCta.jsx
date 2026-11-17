import { motion, useReducedMotion } from 'framer-motion'
import { Headphones, Phone, Send } from 'lucide-react'
import { CONTACT } from '../../data/content'
import { DEMO_SECTION_ID } from '../DemoContext'
import { LogoMark } from '../ui/Logo'
import { Reveal } from '../ui/Reveal'

/** Closing banner: call now, or jump back up to the contact form. */
export function ContactCta() {
  const reduce = useReducedMotion()
  const toForm = () => {
    const el = document.getElementById(DEMO_SECTION_ID)
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    setTimeout(() => el?.querySelector('input')?.focus({ preventScroll: true }), reduce ? 0 : 600)
  }
  return (
    <section aria-labelledby="contact-cta-title" className="container-site pt-20 lg:pt-24">
      <Reveal className="relative overflow-hidden rounded-3xl bg-[linear-gradient(110deg,#2f45e0_0%,#384fe9_45%,#6d5ef0_100%)] px-6 py-12 sm:px-12 lg:py-14">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full">
          {[80, 150, 220, 290].map((r) => (
            <circle key={r} cx="18%" cy="50%" r={r} fill="none" stroke="rgb(255 255 255 / 0.12)" />
          ))}
        </svg>
        <div className="relative grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* emblem */}
          <div className="relative mx-auto hidden size-[220px] lg:block" aria-hidden="true">
            <motion.span
              className="absolute inset-6 rounded-full bg-white/12 backdrop-blur"
              animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="absolute inset-14 grid place-items-center rounded-full bg-white shadow-[0_20px_40px_-16px_rgb(0_0_0_/_0.4)]">
              <LogoMark className="h-14 w-auto" />
            </span>
            <motion.span
              className="absolute top-4 right-6 grid size-11 place-items-center rounded-full bg-white text-brand shadow-float"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Headphones className="size-5" />
            </motion.span>
            <motion.span
              className="absolute bottom-6 left-4 grid size-10 place-items-center rounded-full bg-[#f5b82e] text-white shadow-float"
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <Phone className="size-4" />
            </motion.span>
          </div>

          <div className="text-center text-white lg:text-left">
            <h2 id="contact-cta-title" className="heading-lg text-[clamp(1.75rem,3.6vw,2.5rem)]">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-3 max-w-[460px] text-[15.5px] leading-6 text-white/85 lg:mx-0">
              Book a free consultation today and discover how PrepCheck can help your child excel academically.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href={CONTACT.phoneHref}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-brand shadow-[0_10px_24px_-10px_rgb(0_0_0_/_0.35)] transition-all hover:-translate-y-0.5 hover:bg-brand-50"
              >
                <Phone className="size-4 transition-transform group-hover:rotate-12" aria-hidden="true" /> Call Now: {CONTACT.phone}
              </a>
              <button
                type="button"
                onClick={toForm}
                className="inline-flex h-12 items-center gap-2 rounded-full border-[1.5px] border-white/70 px-6 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                <Send className="size-4" aria-hidden="true" /> Fill Contact Form
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
