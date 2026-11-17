import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarDays, Check, ChartColumnIncreasing, ChevronRight, Clock, Star, TrendingUp, Video } from 'lucide-react'
import { Fragment } from 'react'
import { STEPS } from '../../data/about'
import { useDemo } from '../DemoContext'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const TONES = {
  mint: { card: 'border-[#9fe3cc] bg-[linear-gradient(180deg,#eefcf6,#ffffff_70%)]', ink: 'text-emerald-600', soft: 'bg-emerald-100' },
  peach: { card: 'border-[#ffcfae] bg-[linear-gradient(180deg,#fff4ec,#ffffff_70%)]', ink: 'text-orange-500', soft: 'bg-orange-100' },
  sky: { card: 'border-[#bfcbff] bg-[linear-gradient(180deg,#eff2ff,#ffffff_70%)]', ink: 'text-brand', soft: 'bg-brand-100' },
}

/** Small icon-built illustrations so the cards stay crisp without images. */
function Illustration({ kind, tone }) {
  const reduce = useReducedMotion()
  const t = TONES[tone]
  const bob = (d) => (reduce ? undefined : { y: [0, -5, 0], transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: d } })
  return (
    <div className="relative mx-auto h-[92px] w-[132px]" aria-hidden="true">
      <span className={`absolute inset-x-3 bottom-0 h-10 rounded-full ${t.soft} blur-xl`} />
      {kind === 'calendar' && (
        <>
          <span className="absolute top-2 left-4 grid size-[72px] place-items-center rounded-2xl bg-white shadow-float">
            <CalendarDays className="size-9 text-brand" strokeWidth={1.6} />
          </span>
          <motion.span animate={bob(0.2)} className="absolute top-0 right-3 grid size-8 place-items-center rounded-full bg-emerald-500 text-white shadow-float">
            <Check className="size-4" strokeWidth={3} />
          </motion.span>
          <motion.span animate={bob(0.8)} className="absolute right-2 bottom-1 grid size-9 place-items-center rounded-xl bg-white text-amber-500 shadow-float">
            <Clock className="size-[18px]" />
          </motion.span>
        </>
      )}
      {kind === 'video' && (
        <>
          <span className="absolute top-2 left-3 flex h-[64px] w-[100px] items-center justify-center gap-1.5 rounded-xl border-4 border-ink-700 bg-[linear-gradient(135deg,#e7ecff,#fff3ea)]">
            <span className="grid size-7 place-items-center rounded-full bg-orange-300 text-[10px] font-bold text-white">T</span>
            <span className="grid size-7 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">S</span>
          </span>
          <span className="absolute top-[72px] left-0 h-2 w-[124px] rounded-full bg-ink-700" />
          <motion.span animate={bob(0.4)} className="absolute -top-1 right-1 grid size-8 place-items-center rounded-full bg-orange-500 text-white shadow-float">
            <Video className="size-4" />
          </motion.span>
        </>
      )}
      {kind === 'growth' && (
        <>
          <span className="absolute bottom-3 left-4 flex items-end gap-1.5">
            {[26, 38, 50, 64].map((h, i) => (
              <motion.span
                key={h}
                className={`w-4 rounded-t-md ${i === 3 ? 'bg-brand' : i === 2 ? 'bg-[#e8505b]' : 'bg-[#6f8cfb]'}`}
                initial={{ height: reduce ? h : 0 }}
                whileInView={{ height: h }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
              />
            ))}
          </span>
          <TrendingUp className="absolute top-1 left-3 size-12 text-amber-500" strokeWidth={2.2} />
          <motion.span animate={bob(0.6)} className="absolute top-0 right-3">
            <Star className="size-6 fill-amber-400 text-amber-400" />
          </motion.span>
          <ChartColumnIncreasing className="absolute right-2 bottom-2 size-5 text-brand/40" />
        </>
      )}
    </div>
  )
}

export function StepsSection() {
  const { openDemo } = useDemo()
  return (
    <section id="approach" aria-labelledby="steps-title" className="container-site pt-20 lg:pt-24">
      <div className="text-center">
        <span className="inline-flex h-7 items-center rounded-full bg-brand-50 px-3.5 text-[12.5px] font-semibold text-brand">Our Approach</span>
      </div>
      <SectionHeading
        id="steps-title"
        className="mt-4"
        title="Get Started in 3 Easy Steps"
        subtitle="A simple and effective process to begin your child’s learning journey with PrepCheck."
        subClassName="max-w-[520px]"
      />
      <RevealGroup as="ol" className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-3" stagger={0.15}>
        {STEPS.map((s, i) => {
          const t = TONES[s.tone]
          return (
            <Fragment key={s.title}>
              <RevealItem
                as="li"
                className={`group flex flex-col items-center rounded-3xl border-[1.5px] px-6 pt-8 pb-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-26px_rgb(20_26_60_/_0.4)] ${t.card}`}
              >
                <div className="transition-transform duration-500 group-hover:scale-105">
                  <Illustration kind={s.illustration} tone={s.tone} />
                </div>
                <h3 className="mt-6 text-[18px] font-bold text-ink">
                  <span className={t.ink}>{i + 1}.</span> {s.title}
                </h3>
                <p className="mt-2 max-w-[240px] text-[14px] leading-[21px] text-muted">{s.text}</p>
                {i === 0 && (
                  <button
                    type="button"
                    onClick={() => openDemo()}
                    className="mt-4 inline-flex items-center gap-1.5 rounded text-[13.5px] font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
                  >
                    Book my free trial <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                )}
              </RevealItem>
              {i < STEPS.length - 1 && (
                <li aria-hidden="true" className="hidden items-center lg:flex">
                  <span className="grid size-9 place-items-center rounded-full bg-white text-brand shadow-float ring-1 ring-line">
                    <ChevronRight className="size-4" strokeWidth={2.5} />
                  </span>
                </li>
              )}
            </Fragment>
          )
        })}
      </RevealGroup>
    </section>
  )
}
