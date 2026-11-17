import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BookOpen, ChartColumnIncreasing, GraduationCap, Target, Trophy } from 'lucide-react'
import { useRef } from 'react'
import { ROADMAP } from '../../data/about'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const ICONS = { Target, BookOpen, ChartColumnIncreasing, Trophy, GraduationCap }
const COLORS = {
  blue: { node: 'bg-brand', tile: 'bg-brand', ring: 'ring-brand/20' },
  violet: { node: 'bg-[#7c5cf0]', tile: 'bg-[#7c5cf0]', ring: 'ring-[#7c5cf0]/20' },
  green: { node: 'bg-emerald-500', tile: 'bg-emerald-500', ring: 'ring-emerald-500/20' },
  amber: { node: 'bg-amber-500', tile: 'bg-amber-500', ring: 'ring-amber-500/20' },
  navy: { node: 'bg-[#1e2a78]', tile: 'bg-[#1e2a78]', ring: 'ring-[#1e2a78]/20' },
}

/** Vertical timeline whose connecting line fills in as you scroll through it. */
export function RoadmapSection() {
  const listRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1])

  return (
    <section aria-labelledby="roadmap-title" className="container-site pt-20 lg:pt-24">
      <div className="text-center">
        <span className="inline-flex h-7 items-center rounded-full bg-brand-50 px-3.5 text-[12.5px] font-semibold text-brand">Our Journey</span>
      </div>
      <SectionHeading
        id="roadmap-title"
        className="mt-4"
        title={
          <>
            Our Proven Roadmap to Unlock <br className="hidden sm:block" />
            Your Child’s Academic Potential
          </>
        }
        subtitle="A structured, step-by-step approach designed for measurable academic success."
        subClassName="max-w-[460px]"
      />

      <div ref={listRef} className="relative mx-auto mt-12 max-w-[920px]">
        {/* track + animated fill */}
        <span aria-hidden="true" className="absolute top-6 bottom-6 left-[19px] w-0 border-l-2 border-dashed border-line sm:left-[23px]" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="absolute top-6 bottom-6 left-[18px] w-[4px] origin-top rounded-full bg-[linear-gradient(180deg,#384fe9,#7c5cf0,#10b981,#f59e0b,#1e2a78)] sm:left-[22px]"
        />
        <RevealGroup as="ol" className="relative space-y-5" stagger={0.12}>
          {ROADMAP.map((r, i) => {
            const Icon = ICONS[r.icon]
            const c = COLORS[r.color]
            return (
              <RevealItem as="li" key={r.title} className="group flex items-center gap-4 sm:gap-8">
                <span
                  className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full text-[15px] font-bold text-white ring-[6px] ring-white sm:size-12 ${c.node} transition-transform duration-300 group-hover:scale-110`}
                >
                  {i + 1}
                </span>
                <div className="flex flex-1 items-center gap-4 rounded-2xl border border-line bg-white px-4 py-4 shadow-[0_10px_30px_-24px_rgb(20_26_60_/_0.45)] transition-all duration-300 group-hover:translate-x-1.5 group-hover:border-brand/25 group-hover:shadow-[0_20px_40px_-24px_rgb(56_79_233_/_0.45)] sm:gap-5 sm:px-6 sm:py-5">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-white ring-4 sm:size-12 ${c.tile} ${c.ring}`}>
                    <Icon className="size-5 sm:size-[22px]" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-bold text-ink sm:text-[17px]">{r.title}</h3>
                    <p className="mt-1 text-[13.5px] leading-[20px] text-muted sm:text-[14px]">{r.text}</p>
                  </div>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
