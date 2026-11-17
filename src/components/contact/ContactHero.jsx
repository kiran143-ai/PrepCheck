import { motion } from 'framer-motion'
import { Headphones, Mail, Phone, Users, Zap } from 'lucide-react'
import { CONTACT } from '../../data/content'
import { PortraitVisual } from '../ui/PortraitVisual'

const EASE = [0.22, 1, 0.36, 1]

const BADGES = [
  { icon: Headphones, label: '24/7 Support', cls: 'top-[18%] -left-2 sm:left-[-6%]', delay: 0.7, bob: 7, dur: 4.6 },
  { icon: Users, label: 'Expert Assistance', cls: 'top-[10%] -right-2 sm:right-[-4%]', delay: 0.85, bob: 8, dur: 5.2 },
  { icon: Zap, label: 'Quick Response', cls: 'bottom-[10%] right-0 sm:right-[-2%]', delay: 1, bob: 6, dur: 4.2 },
]

const pill =
  'group inline-flex h-12 items-center gap-2.5 rounded-full border-[1.5px] border-brand/25 bg-white px-5 text-[14.5px] font-semibold text-ink shadow-[0_10px_24px_-16px_rgb(56_79_233_/_0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand'

export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f1f2fe_0%,#f4f4fe_65%,#ffffff_100%)] pt-[70px]"
    >
      <svg aria-hidden="true" viewBox="0 0 40 30" className="absolute top-[118px] left-[calc(50%-640px)] hidden h-9 w-11 min-[1360px]:block">
        <g stroke="#f5b82e" strokeWidth="2.8" strokeLinecap="round">
          <path d="M6 22 12 8" /><path d="M20 22V4" /><path d="M33 22 28 9" />
        </g>
      </svg>

      <div className="container-site relative grid items-center gap-12 pt-10 pb-14 lg:grid-cols-[1.25fr_1fr] lg:gap-6 lg:pt-12 lg:pb-16">
        <div className="text-center lg:text-left">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/80 px-3 py-1 text-[12.5px] font-semibold text-brand"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" /> Get in Touch
          </motion.span>
          <motion.h1
            id="contact-title"
            className="heading-xl mt-5 text-[clamp(2.25rem,4.8vw,3.5rem)] leading-[1.05] text-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          >
            Let’s Start Your Child’s <span className="text-brand">Success Journey</span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-5 max-w-[480px] text-[16px] leading-[26px] text-muted sm:text-[17px] lg:mx-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            Have questions? We’re here to help! Our expert team is available 24/7 and we’ll get back to you within 24 hours.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            <a href={CONTACT.phoneHref} className={pill} aria-label={`Call ${CONTACT.phone}`}>
              <Phone className="size-4 text-brand transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className={pill} aria-label={`Email ${CONTACT.email}`}>
              <Mail className="size-4 text-brand" aria-hidden="true" />
              <span className="break-all">{CONTACT.email}</span>
            </a>
          </motion.div>
        </div>

        <PortraitVisual badges={BADGES} />
      </div>
    </section>
  )
}
