import { motion, useReducedMotion } from 'framer-motion'
import { ChartColumn, CirclePlay, GraduationCap, Headphones } from 'lucide-react'
import { useDemo } from '../DemoContext'
import { Button } from '../ui/Button'
import { PortraitVisual } from '../ui/PortraitVisual'

const EASE = [0.22, 1, 0.36, 1]

const BADGES = [
  { icon: CirclePlay, label: 'Live Classes', cls: 'top-[30%] -left-2 sm:left-[-6%]', delay: 0.7, bob: 7, dur: 4.6 },
  { icon: GraduationCap, label: 'Expert Instructors', cls: 'top-[12%] -right-2 sm:right-[-4%]', delay: 0.85, bob: 8, dur: 5.2 },
  { icon: ChartColumn, label: 'Structured Learning', cls: 'bottom-[10%] right-0 sm:right-[-2%]', delay: 1, bob: 6, dur: 4.2 },
]

const STATS = [
  { value: '12+', label: 'Courses' },
  { value: '6', label: 'Boards' },
  { value: '1-on-1', label: 'Live tutoring' },
]

export function CoursesHero() {
  const { openDemo } = useDemo()
  const reduce = useReducedMotion()
  const browse = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section
      aria-labelledby="courses-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f1f2fe_0%,#f4f4fe_60%,#ffffff_100%)] pt-[70px]"
    >
      {/* doodles */}
      <svg aria-hidden="true" viewBox="0 0 40 30" className="absolute top-[110px] left-[calc(50%-640px)] hidden h-9 w-11 min-[1360px]:block">
        <g stroke="#f5b82e" strokeWidth="2.8" strokeLinecap="round">
          <path d="M6 22 12 8" /><path d="M20 22V4" /><path d="M33 22 28 9" />
        </g>
      </svg>

      <div className="container-site relative grid items-center gap-12 pt-10 pb-16 lg:grid-cols-[1.25fr_1fr] lg:gap-6 lg:pt-12 lg:pb-20">
        <div className="text-center lg:text-left">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/80 px-3 py-1 text-[12.5px] font-semibold text-brand"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" /> PrepCheck Courses
          </motion.span>
          <motion.h1
            id="courses-title"
            className="heading-xl mt-5 text-[clamp(2.375rem,5vw,3.5rem)] lg:whitespace-nowrap text-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          >
            Explore Our Courses
          </motion.h1>
          <motion.p
            className="mx-auto mt-5 max-w-[470px] text-[16px] leading-[26px] text-muted sm:text-[17px] lg:mx-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            Discover a wide range of expert-led courses designed for academic excellence — from core subjects and board
            exams to the SAT, reasoning and life skills.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            <Button arrow className="h-12 px-6 text-[15px]" onClick={browse}>
              Browse Courses
            </Button>
            <Button variant="outline" className="h-12 px-6 text-[15px]" onClick={() => openDemo()}>
              <Headphones className="size-4" aria-hidden="true" /> Talk to an Expert
            </Button>
          </motion.div>
          <motion.dl
            className="mt-10 flex items-center justify-center gap-6 sm:gap-8 lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {STATS.map((s, i) => (
              <div key={s.label} className={`flex flex-col ${i ? 'border-l border-line pl-6 sm:pl-8' : ''}`}>
                <dd className="order-1 text-[22px] font-extrabold tracking-[-0.03em] text-ink">{s.value}</dd>
                <dt className="order-2 text-[12.5px] text-subtle">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        <PortraitVisual badges={BADGES} />
      </div>
    </section>
  )
}
