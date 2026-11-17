import { motion } from 'framer-motion'
import { ArrowRight, Building, Clock, ExternalLink, Info, Mail, Map as MapIcon, MapPin, Navigation, Phone } from 'lucide-react'
import { useState } from 'react'
import { CONTACT, MAPS } from '../../data/content'
import { Reveal } from '../ui/Reveal'

const cardBase = 'rounded-2xl bg-white shadow-[0_14px_40px_-26px_rgb(20_26_60_/_0.45)] ring-1 ring-line/70'
const card = `${cardBase} p-5 sm:p-6`

function CardTitle({ icon: Icon, tone = 'bg-brand', children }) {
  return (
    <h2 className="flex items-center gap-2.5 text-[18px] font-bold text-ink">
      <span className={`grid size-8 place-items-center rounded-lg text-white ${tone}`}>
        <Icon className="size-4" aria-hidden="true" />
      </span>
      {children}
    </h2>
  )
}

function Row({ icon: Icon, tone, title, children }) {
  return (
    <li className="group flex gap-4">
      <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110 ${tone}`}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 text-[14px] leading-[21px] text-muted">
        <h3 className="text-[15px] font-bold text-ink">{title}</h3>
        {children}
      </div>
    </li>
  )
}

/** Stylised (offline) map with a pin. The live Google map loads only on request. */
function MapCard() {
  const [live, setLive] = useState(false)
  return (
    <div className={`${cardBase} relative overflow-hidden`}>
      {live ? (
        <iframe
          title={`Map showing PrepCheck at ${CONTACT.address}`}
          src={MAPS.embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[240px] w-full border-0"
        />
      ) : (
        <div className="relative h-[240px] bg-[#eef1f6]">
          <svg aria-hidden="true" className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 400 240">
            <rect width="400" height="240" fill="#eef1f6" />
            <path d="M0 70 400 40M0 160 400 190M90 0 130 240M260 0 230 240M0 115 400 120" stroke="#ffffff" strokeWidth="10" />
            <path d="M0 70 400 40M0 160 400 190M90 0 130 240M260 0 230 240" stroke="#f6d38a" strokeWidth="3" />
            <path d="M40 0 20 240M330 0 360 240M0 210 400 225M175 0 185 240" stroke="#ffffff" strokeWidth="5" />
            <rect x="290" y="135" width="70" height="40" rx="10" fill="#d4ecd8" />
            <rect x="140" y="58" width="70" height="40" rx="10" fill="#dfe6f5" />
            <circle cx="60" cy="190" r="22" fill="#cfe8f5" />
          </svg>
          <span className="absolute top-[38%] left-[46%] text-center text-[11px] font-bold tracking-[0.12em] text-ink-700/70 uppercase">
            Mira Road East
          </span>
          <motion.span
            aria-hidden="true"
            className="absolute top-[26%] left-[34%] grid size-11 place-items-center rounded-full rounded-br-none bg-brand text-white shadow-brand"
            style={{ rotate: 45 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <MapPin className="size-5 -rotate-45" />
          </motion.span>
          <span aria-hidden="true" className="absolute top-[47%] left-[36.2%] h-2 w-5 rounded-[50%] bg-ink/15 blur-[1px]" />
          <a
            href={MAPS.view}
            target="_blank"
            rel="noreferrer noopener"
            className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-semibold text-brand shadow-sm transition-colors hover:bg-brand-50"
          >
            Open in Maps <ExternalLink className="size-3" aria-hidden="true" />
          </a>
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setLive(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-brand px-5 text-[13.5px] font-semibold text-white shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-600"
            >
              <MapIcon className="size-4" aria-hidden="true" /> Show interactive map
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/** Left column: contact info, office details + hours, map. */
export function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">
      <Reveal className={card}>
        <CardTitle icon={Info}>Contact Information</CardTitle>
        <ul className="mt-5 space-y-5">
          <Row icon={MapPin} tone="bg-emerald-500" title="Visit Our Office">
            <address className="not-italic">{CONTACT.address}</address>
          </Row>
          <Row icon={Phone} tone="bg-brand" title="Call Us Anytime">
            <a href={CONTACT.phoneHref} className="group/link inline-flex items-center gap-1 font-semibold text-brand hover:underline">
              {CONTACT.phone}
              <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
            </a>
            <p>Available {CONTACT.hours.time.replace(' Available', '')}</p>
          </Row>
          <Row icon={Mail} tone="bg-[#8b5cf6]" title="Email Us">
            <a href={`mailto:${CONTACT.email}`} className="font-semibold break-all text-brand hover:underline">
              {CONTACT.email}
            </a>
            <p>We’ll respond within 24 hours</p>
          </Row>
        </ul>
      </Reveal>

      <Reveal className={card} delay={0.08}>
        <CardTitle icon={Building} tone="bg-emerald-500">
          Office Details
        </CardTitle>
        <div className="mt-5 rounded-xl border border-line bg-panel/60 p-4">
          <h3 className="flex items-center gap-2 text-[15px] font-bold text-ink">
            <MapPin className="size-4 text-brand" aria-hidden="true" /> Office Address
          </h3>
          <address className="mt-1.5 text-[14px] leading-[21px] text-muted not-italic">{CONTACT.address}</address>
          <a
            href={MAPS.directions}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3 inline-flex h-9 items-center gap-2 rounded-full bg-brand px-4 text-[13px] font-semibold text-white shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            <Navigation className="size-3.5" aria-hidden="true" /> Get Directions
          </a>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Clock className="size-5 text-emerald-500" aria-hidden="true" />
            <div>
              <h3 className="text-[15px] font-bold text-ink">Operating Hours</h3>
              <p className="text-[13.5px] text-muted">{CONTACT.hours.days}</p>
            </div>
          </div>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-[13px] font-bold text-brand">{CONTACT.hours.time}</span>
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <MapCard />
      </Reveal>
    </div>
  )
}
