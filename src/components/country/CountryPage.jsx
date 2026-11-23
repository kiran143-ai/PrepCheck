import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarClock,
  CircleCheck,
  Clock,
  GraduationCap,
  MapPin,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { COUNTRY_ORDER, COUNTRY_PAGES } from '../../data/countries'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useDemo } from '../DemoContext'
import { CtaSection } from '../sections/CtaSection'
import { Button } from '../ui/Button'
import { Counter } from '../ui/Counter'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const ICONS = { Award, BookOpen, CircleCheck, GraduationCap, Star, Target, TrendingUp, Users }
const EASE = [0.22, 1, 0.36, 1]

// Per-country accent, used sparingly on top of the brand blue.
const ACCENTS = {
  blue: { text: 'text-brand', soft: 'bg-brand-50', ring: 'ring-brand/20', dot: 'bg-brand', glow: 'from-[#dfe4ff]', bar: 'from-brand to-[#6d5ef0]' },
  green: { text: 'text-emerald-600', soft: 'bg-emerald-50', ring: 'ring-emerald-500/20', dot: 'bg-emerald-500', glow: 'from-[#d7f5e8]', bar: 'from-emerald-500 to-teal-500' },
  red: { text: 'text-rose-600', soft: 'bg-rose-50', ring: 'ring-rose-500/20', dot: 'bg-rose-500', glow: 'from-[#ffe1e4]', bar: 'from-rose-500 to-[#6d5ef0]' },
}

/** Re-renders every 30s so the clocks stay current. */
function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])
  return now
}

const fmt = (d, tz, opts) => new Intl.DateTimeFormat('en-US', { timeZone: tz, ...opts }).format(d)

/** Hero visual: live local time in each of the country's time zones. */
function ClockCard({ page, a }) {
  const now = useNow()
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[440px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
    >
      <div aria-hidden="true" className={`absolute -inset-6 rounded-[40px] bg-gradient-to-br ${a.glow} to-transparent blur-2xl`} />
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_30px_70px_-36px_rgb(20_26_60_/_0.55)] ring-1 ring-line/70 sm:p-7 sm:pb-12">
        <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${a.bar}`} aria-hidden="true" />
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <span className="relative flex size-2.5" aria-hidden="true">
              {!reduce && <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 ${a.dot}`} />}
              <span className={`relative inline-flex size-2.5 rounded-full ${a.dot}`} />
            </span>
            Tutors available now
          </p>
          <span className="text-[12px] text-subtle">Live local time</span>
        </div>
        <ul className={`mt-5 grid gap-3 ${page.zones.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {page.zones.map((z) => (
            <li key={z.tz} className="rounded-2xl bg-panel px-4 py-3.5">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-subtle">
                <MapPin className="size-3" aria-hidden="true" /> {z.city}
              </p>
              <p className={`mt-1 font-extrabold tracking-[-0.03em] text-ink tabular-nums ${page.zones.length > 1 ? 'text-[22px]' : 'text-[40px]'}`}>
                <time dateTime={now.toISOString()}>{fmt(now, z.tz, { hour: 'numeric', minute: '2-digit' })}</time>
              </p>
              <p className="text-[12px] text-muted">
                {z.label} · {fmt(now, z.tz, { weekday: 'short' })}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2 pb-6 sm:pb-0">
          {page.tracks.map((t) => (
            <span key={t} className={`rounded-full px-3 py-1 text-[12px] font-semibold ring-1 ${a.soft} ${a.text} ${a.ring}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <motion.div
        className="absolute -right-2 -bottom-8 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-float sm:-right-6"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className={`grid size-9 place-items-center rounded-xl ${a.soft} ${a.text}`}>
          <CalendarClock className="size-[18px]" aria-hidden="true" />
        </span>
        <span className="text-[12.5px] leading-tight font-bold text-ink">
          Sessions in
          <br />
          your time zone
        </span>
      </motion.div>
    </motion.div>
  )
}

function Hero({ page, a }) {
  const { openDemo } = useDemo()
  const reduce = useReducedMotion()
  const toSubjects = () => document.getElementById('curriculum')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  return (
    <section aria-labelledby="country-hero-title" className="relative overflow-hidden bg-[linear-gradient(180deg,#f1f2fe_0%,#f5f5fe_65%,#ffffff_100%)] pt-[70px]">
      <div className="container-site relative grid items-center gap-14 pt-10 pb-16 lg:grid-cols-[1.2fr_1fr] lg:gap-10 lg:pt-14 lg:pb-20">
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className={`inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[12.5px] font-semibold ring-1 ${a.text} ${a.ring}`}
          >
            <span className={`size-1.5 rounded-full ${a.dot}`} aria-hidden="true" /> {page.badge}
          </motion.span>
          <motion.h1
            id="country-hero-title"
            className="heading-xl mt-5 text-[clamp(2.125rem,4.6vw,3.4rem)] leading-[1.05] text-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          >
            {page.title}
          </motion.h1>
          <motion.p
            className="mt-4 text-[16px] font-semibold text-ink-700 sm:text-[17px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            {page.tracks.join('  •  ')}
          </motion.p>
          <motion.p
            className="mx-auto mt-3 max-w-[520px] text-[15.5px] leading-[25px] text-muted lg:mx-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
          >
            {page.text}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            <Button arrow className="h-12 px-6 text-[15px]" onClick={() => openDemo({ curriculum: page.curriculum })}>
              {page.primaryCta}
            </Button>
            <Button variant="outline" className="h-12 px-6 text-[15px]" onClick={toSubjects}>
              {page.secondaryCta}
            </Button>
          </motion.div>
          <motion.dl
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            {page.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dd className={`order-1 text-[26px] font-extrabold tracking-[-0.03em] ${a.text}`}>
                  {s.text ?? <Counter value={s.value} suffix={s.suffix} />}
                </dd>
                <dt className="order-2 text-[12.5px] text-subtle">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>
        <ClockCard page={page} a={a} />
      </div>
    </section>
  )
}

function Support({ page, a }) {
  return (
    <section id="curriculum" aria-labelledby="curriculum-title" className="container-site scroll-mt-24 pt-16 lg:pt-20">
      <SectionHeading id="curriculum-title" title={page.support.title} subtitle={page.support.text} subClassName="max-w-[560px]" />
      <RevealGroup as="ul" className="mt-10 grid gap-5 md:grid-cols-2" stagger={0.08}>
        {page.support.items.map((it) => {
          const Icon = ICONS[it.icon]
          return (
            <RevealItem
              as="li"
              key={it.title}
              className="group relative flex gap-4 overflow-hidden rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-[0_22px_44px_-24px_rgb(56_79_233_/_0.4)]"
            >
              <span className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${a.bar}`} aria-hidden="true" />
              <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${a.soft} ${a.text} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                <Icon className="size-[22px]" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[18px] font-bold text-ink">{it.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-[22px] text-muted">{it.text}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${it.title} topics`}>
                  {it.tags.map((t) => (
                    <li key={t} className="rounded-full bg-panel px-3 py-1 text-[12px] font-semibold text-ink-700 ring-1 ring-line">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}

function Schedule({ page, a }) {
  if (!page.schedule) return null
  return (
    <section aria-labelledby="schedule-title" className="mt-20 bg-[linear-gradient(180deg,#f5f6fd,#ffffff)] py-16 lg:py-20">
      <div className="container-site">
        <SectionHeading id="schedule-title" title={page.schedule.title} subtitle={page.schedule.text} />
        <RevealGroup as="ul" className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" stagger={0.08}>
          {page.schedule.rows.map((r) => (
            <RevealItem
              as="li"
              key={r.zone}
              className="rounded-2xl bg-white p-5 text-center shadow-[0_14px_36px_-24px_rgb(20_26_60_/_0.45)] ring-1 ring-line/70 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className={`mx-auto grid size-10 place-items-center rounded-full ${a.soft} ${a.text}`}>
                <Clock className="size-[18px]" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-[15.5px] font-bold text-ink">{r.zone}</h3>
              <dl className="mt-2 space-y-1 text-[13px] text-muted">
                <div className="flex justify-between gap-2 rounded-lg bg-panel px-2.5 py-1.5">
                  <dt>Mon–Fri</dt>
                  <dd className="font-semibold text-ink">{r.weekdays}</dd>
                </div>
                <div className="flex justify-between gap-2 rounded-lg bg-panel px-2.5 py-1.5">
                  <dt>Sat–Sun</dt>
                  <dd className="font-semibold text-ink">{r.weekends}</dd>
                </div>
              </dl>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

function Why({ page, a }) {
  return (
    <section aria-labelledby="why-title" className={`container-site ${page.schedule ? 'pt-4' : 'pt-20 lg:pt-24'}`}>
      <SectionHeading id="why-title" title={page.why.title} />
      <RevealGroup as="ul" className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.1}>
        {page.why.items.map((w) => {
          const Icon = ICONS[w.icon]
          return (
            <RevealItem as="li" key={w.title} className="group flex flex-col items-center px-4 text-center">
              <span className={`grid size-16 place-items-center rounded-full ${a.soft} ${a.text} ring-8 ring-white shadow-float transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[18px] font-bold text-ink">{w.title}</h3>
              <p className="mt-2 max-w-[300px] text-[14.5px] leading-[22px] text-muted">{w.text}</p>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}

/** Links to the other two country pages. */
function OtherCountries({ page }) {
  const others = COUNTRY_ORDER.filter((s) => s !== page.slug).map((s) => COUNTRY_PAGES[s])
  return (
    <Reveal className="container-site pt-16">
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-panel px-6 py-5 sm:flex-row">
        <p className="text-[14.5px] font-semibold text-ink">Tutoring in another country?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              to={`/tutoring/${o.slug}`}
              className="group inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-[14px] font-semibold text-brand ring-1 ring-line transition-all hover:-translate-y-0.5 hover:ring-brand/40"
            >
              {o.name} Tutoring <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export function CountryPage({ slug }) {
  const page = COUNTRY_PAGES[slug]
  const a = ACCENTS[page.accent]
  usePageTitle(`${page.name} Tutoring — PrepCheck`)
  return (
    <>
      <Hero page={page} a={a} />
      <Support page={page} a={a} />
      <Schedule page={page} a={a} />
      <Why page={page} a={a} />
      <OtherCountries page={page} />
      <CtaSection eyebrow={page.cta.eyebrow} title={page.cta.title} description={page.cta.text} uppercase={false} />
    </>
  )
}
