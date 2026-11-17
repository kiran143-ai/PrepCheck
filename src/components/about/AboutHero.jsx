import { motion, useReducedMotion } from 'framer-motion'
import { Award, ChartColumnIncreasing, GraduationCap, HeartHandshake, Play, Star, Users } from 'lucide-react'
import { useState } from 'react'
import { STORY_VIDEO_URL } from '../../data/content'
import { ABOUT_STATS } from '../../data/about'
import { img } from '../../data/images'
import { Button } from '../ui/Button'
import { Counter } from '../ui/Counter'
import { PortraitVisual } from '../ui/PortraitVisual'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { VideoDialog } from '../ui/VideoDialog'

const EASE = [0.22, 1, 0.36, 1]
const STAT_ICONS = { Users, GraduationCap, Star, Award }

const BADGES = [
  { icon: GraduationCap, label: 'Personalized Learning', cls: 'top-[22%] -left-2 sm:left-[-6%]', delay: 0.7, bob: 7, dur: 4.6 },
  { icon: ChartColumnIncreasing, label: 'Measurable Progress', cls: 'top-[8%] -right-2 sm:right-[-4%]', delay: 0.85, bob: 8, dur: 5.2 },
  { icon: HeartHandshake, label: 'Expert Support', cls: 'bottom-[10%] right-0 sm:right-[-2%]', delay: 1, bob: 6, dur: 4.2 },
]

export function AboutHero() {
  const reduce = useReducedMotion()
  const [story, setStory] = useState(false)
  const toMission = () =>
    document.getElementById('approach')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })

  return (
    <section
      aria-labelledby="about-title"
      className="relative overflow-hidden rounded-b-[40px] bg-[linear-gradient(180deg,#f1f2fe_0%,#f4f4fe_70%,#f7f6ff_100%)] pt-[70px]"
    >
      <svg aria-hidden="true" viewBox="0 0 40 30" className="absolute top-[118px] left-[calc(50%-640px)] hidden h-9 w-11 min-[1360px]:block">
        <g stroke="#f5b82e" strokeWidth="2.8" strokeLinecap="round">
          <path d="M6 22 12 8" /><path d="M20 22V4" /><path d="M33 22 28 9" />
        </g>
      </svg>

      <div className="container-site relative grid items-center gap-12 pt-10 pb-12 lg:grid-cols-[1.25fr_1fr] lg:gap-6 lg:pt-12">
        <div className="text-center lg:text-left">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/80 px-3 py-1 text-[12.5px] font-semibold text-brand"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" /> About PrepCheck
          </motion.span>
          <motion.h1
            id="about-title"
            className="heading-xl mt-5 text-[clamp(2.25rem,4.6vw,3.4rem)] leading-[1.05] text-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          >
            <span className="text-brand">91%</span> of Our Students Improve Their Grades Within 3 Months
          </motion.h1>
          <motion.p
            className="mx-auto mt-5 max-w-[470px] text-[16px] leading-[26px] text-muted sm:text-[17px] lg:mx-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            We’re on a mission to make high-quality, personalized learning accessible to every student, everywhere.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            <Button arrow className="h-12 px-6 text-[15px]" onClick={toMission}>
              Our Mission
            </Button>
            <Button variant="outline" className="h-12 px-6 text-[15px]" onClick={() => setStory(true)}>
              <span className="grid size-6 place-items-center rounded-full bg-brand text-white">
                <Play className="ml-px size-3 fill-white" aria-hidden="true" />
              </span>
              Watch Our Story
            </Button>
          </motion.div>
        </div>

        <PortraitVisual badges={BADGES} />
      </div>

      {/* stats */}
      <div className="container-site relative pb-12 lg:pb-14">
        <RevealGroup as="dl" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" stagger={0.08}>
          {ABOUT_STATS.map((s) => {
            const Icon = STAT_ICONS[s.icon]
            return (
              <RevealItem
                key={s.label}
                className="group flex flex-col items-center rounded-2xl bg-white px-4 py-6 text-center shadow-[0_14px_36px_-22px_rgb(20_26_60_/_0.35)] ring-1 ring-line/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-22px_rgb(56_79_233_/_0.45)]"
              >
                <span className="grid size-11 place-items-center rounded-full bg-brand-50 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <dd className="order-1 mt-3 text-[28px] font-extrabold tracking-[-0.03em] text-ink sm:text-[32px]">
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </dd>
                <dt className="order-2 mt-1 max-w-[180px] text-[13px] leading-[19px] text-muted">{s.label}</dt>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>

      <VideoDialog
        open={story}
        onClose={() => setStory(false)}
        title="The PrepCheck Story"
        description="Why we started PrepCheck — and how we help every child learn with confidence."
        src={STORY_VIDEO_URL}
        poster={img['session-2']}
        posterAlt="Tutor guiding a young student through a lesson"
        comingSoon="Our story video is coming soon."
      />
    </section>
  )
}
