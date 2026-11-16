import { motion, useReducedMotion } from 'framer-motion'
import { ClipboardCheck, MonitorSmartphone, Target, TrendingUp } from 'lucide-react'
import { img } from '../../data/images'
import { useDemo } from '../DemoContext'
import { Button } from '../ui/Button'
import { Counter } from '../ui/Counter'
import { Reveal } from '../ui/Reveal'

const EASE = [0.22, 1, 0.36, 1]
const SAT_PREFILL = { subject: 'SAT Preparation', curriculum: 'SAT (College Board)' }

const cardBase =
  'rounded-[18px] border border-white bg-white/95 shadow-[0_24px_60px_-20px_rgb(40_60_160_/_0.22)] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-20px_rgb(40_60_160_/_0.32)]'

/** Floating card wrapper: slides in from its side once, then bobs gently. */
function FloatCard({ from = 'left', delay = 0, bob = 8, dur = 5, className = '', children }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: from === 'left' ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -bob, 0] }}
        transition={{ duration: dur, delay: delay + 0.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function FeatureCard({ icon: Icon, title, text, cta, onClick }) {
  return (
    <div className={`${cardBase} px-6 py-7 text-center`}>
      <Icon className="mx-auto size-10 text-[#1e3a8a]" strokeWidth={1.4} aria-hidden="true" />
      <h3 className="mt-4 text-[20px] font-bold text-ink">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-[230px] text-[13.5px] leading-5 text-muted">{text}</p>
      <Button variant="plain" className="mt-5 h-9 px-5 text-[13.5px] font-semibold" onClick={onClick}>
        {cta}
      </Button>
    </div>
  )
}

function InfoCard({ icon: Icon, children }) {
  return (
    <div className={`${cardBase} flex items-center gap-4 px-5 py-5`}>
      <Icon className="size-11 shrink-0 text-[#1e3a8a]" strokeWidth={1.3} aria-hidden="true" />
      <div>{children}</div>
    </div>
  )
}

/** Hand-drawn looping arrow doodle that draws itself in. */
function Doodle({ d, head, className }) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 110 70" fill="none" aria-hidden="true" className={className}>
      <motion.path
        d={d}
        stroke="#1e3a8a"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.path
        d={head}
        stroke="#1e3a8a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: reduce ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8 }}
      />
    </svg>
  )
}

export function SatSection() {
  const { openDemo } = useDemo()
  const reduce = useReducedMotion()
  const sat = () => openDemo(SAT_PREFILL)

  const testsCard = (
    <FeatureCard
      icon={ClipboardCheck}
      title="Full-Length Mock Tests"
      text="Adaptive, Bluebook-style Digital SAT practice with a detailed score report."
      cta="Take a Free Test"
      onClick={sat}
    />
  )
  const scoreCard = (
    <InfoCard icon={TrendingUp}>
      <p className="text-[22px] leading-none font-bold text-ink">
        <Counter value={210} prefix="+" suffix=" pts" />
      </p>
      <p className="mt-1.5 text-[13px] text-muted">Average score improvement</p>
    </InfoCard>
  )
  const digitalCard = (
    <InfoCard icon={MonitorSmartphone}>
      <p className="text-[19px] leading-[1.3] font-semibold text-ink">
        Digital SAT
        <br />
        Ready Strategies
      </p>
    </InfoCard>
  )
  const planCard = (
    <FeatureCard
      icon={Target}
      title="Personal Study Plan"
      text="A week-by-week plan built from your diagnostic score and target colleges."
      cta="Get My Plan"
      onClick={sat}
    />
  )

  return (
    <section id="sat" aria-labelledby="sat-title" className="relative mt-16 overflow-hidden bg-[#f6f6f8] py-16 sm:mt-20 sm:py-20 lg:py-24">
      <div className="container-site">
        <div className="text-center">
          <Reveal as="h2" id="sat-title" className="heading-lg mx-auto max-w-[680px] text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.12] text-ink">
            Get Ready for the SAT with Expert Guidance
          </Reveal>
          <Reveal as="p" delay={0.08} className="mx-auto mt-5 max-w-[540px] text-[15.5px] leading-[26px] text-muted sm:text-[17px]">
            Score-boosting strategies, full-length practice tests and 1-on-1 coaching from tutors who scored in the top 1%
            — all built around your target score.
          </Reveal>
          <Reveal delay={0.16} className="mt-7">
            <Button arrow className="h-[46px] px-6 text-[15px]" onClick={sat}>
              Explore SAT Preparation
            </Button>
          </Reveal>
        </div>

        {/* Composition */}
        <div className="relative mx-auto mt-14 lg:mt-12 lg:h-[700px]">
          {/* concentric circles */}
          <div aria-hidden="true" className="pointer-events-none absolute top-[190px] left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-1/2">
            <motion.div
              className="size-[420px] rounded-full border border-[#dbe3fb] bg-[radial-gradient(circle,#e8eefc_0%,#eef2fd_55%,rgb(240_243_253_/_0.4)_100%)] sm:size-[520px] lg:size-[700px]"
              animate={reduce ? undefined : { scale: [1, 1.025, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/35 sm:size-[360px] lg:size-[456px]"
              animate={reduce ? undefined : { scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* centre photo card */}
          <motion.figure
            className="relative z-10 mx-auto w-[260px] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-25px_rgb(20_30_80_/_0.45)] sm:w-[300px] lg:absolute lg:top-[33px] lg:left-1/2 lg:w-[360px] lg:-translate-x-1/2"
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <img
              src={img['sat-coaching']}
              alt="Student in a live one-on-one online SAT coaching session"
              loading="lazy"
              decoding="async"
              className="aspect-[360/600] w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(40_60_120_/_0.75))] px-4 pt-16 pb-6 text-center">
              <span className="inline-flex items-center gap-2 text-[20px] font-semibold text-white sm:text-[24px]">
                <span className="relative flex size-2.5" aria-hidden="true">
                  {!reduce && <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />}
                  <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
                </span>
                Live SAT Coaching
              </span>
            </figcaption>
          </motion.figure>

          {/* desktop: floating cards around the photo */}
          <div className="hidden lg:block">
            <div className="absolute top-[166px] left-0 z-20 flex w-[286px] flex-col gap-6">
              <FloatCard from="left" delay={0.2} bob={7} dur={5.4}>{testsCard}</FloatCard>
              <FloatCard from="left" delay={0.35} bob={6} dur={4.6}>{scoreCard}</FloatCard>
            </div>
            <div className="absolute top-[94px] right-0 z-20 flex w-[286px] flex-col gap-4">
              <FloatCard from="right" delay={0.25} bob={6} dur={4.8}>{digitalCard}</FloatCard>
              <FloatCard from="right" delay={0.4} bob={8} dur={5.8}>{planCard}</FloatCard>
            </div>
            <Doodle
              className="absolute top-[14px] left-[calc(50%+255px)] h-[52px] w-[88px]"
              d="M100 8c-14 4-28 6-36 18-6 9 0 22 10 18 9-4 6-20-6-24-14-5-36 0-58 12"
              head="M18 22l-8 10 13 2"
            />
            <Doodle
              className="absolute top-[590px] left-[calc(50%-350px)] h-[70px] w-[110px]"
              d="M6 4c-4 26 10 46 34 52 14 3 30-8 22-20-7-10-20 2-12 16 10 16 36 16 56 4"
              head="M96 48l10 7-11 6"
            />
          </div>

          {/* mobile / tablet: cards in a grid under the photo */}
          <div className="relative z-20 mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
            <FloatCard from="left" bob={0}>{testsCard}</FloatCard>
            <FloatCard from="right" bob={0}>{planCard}</FloatCard>
            <FloatCard from="left" bob={0}>{scoreCard}</FloatCard>
            <FloatCard from="right" bob={0}>{digitalCard}</FloatCard>
          </div>
        </div>
      </div>
    </section>
  )
}
