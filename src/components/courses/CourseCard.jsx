import { AnimatePresence, motion } from 'framer-motion'
import {
  Atom,
  Award,
  BookOpen,
  Brain,
  Calculator,
  Check,
  Clock,
  Code,
  FileText,
  FlaskConical,
  Globe,
  GraduationCap,
  Leaf,
  Monitor,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { COURSE_CATEGORIES } from '../../data/courses'
import { useDemo } from '../DemoContext'

const ICONS = { Atom, Award, BookOpen, Brain, Calculator, Clock, Code, FileText, FlaskConical, Globe, Leaf, Users }
const CATEGORY_TITLE = Object.fromEntries(COURSE_CATEGORIES.map((c) => [c.id, c.title]))

const BADGE_STYLE = {
  Popular: 'bg-[#6d5ef0] text-white',
  New: 'bg-emerald-500 text-white',
}

const btn =
  'inline-flex h-10 flex-1 items-center justify-center rounded-full text-[13.5px] font-semibold transition-all duration-300 active:scale-[0.97]'

/** Course tile. "View Details" slides an in-card panel up over the card — no modal. */
export function CourseCard({ course }) {
  const { openDemo } = useDemo()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const closeRef = useRef(null)
  const detailsRef = useRef(null)
  const Icon = ICONS[course.icon] ?? BookOpen
  const enroll = () => openDemo({ subject: course.formSubject })

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => detailsRef.current?.focus())
  }

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgb(16_24_40_/_0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-[0_22px_44px_-22px_rgb(56_79_233_/_0.45)]"
      onKeyDown={(e) => open && e.key === 'Escape' && close()}
    >
      <div className="relative overflow-hidden">
        <img
          src={course.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[16/8.5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(12_13_22_/_0.25))]" />
      </div>

      <div className="relative flex flex-1 flex-col px-5 pt-8 pb-5">
        <span className="absolute -top-6 left-5 grid size-12 place-items-center rounded-full bg-white text-brand shadow-[0_8px_20px_-8px_rgb(56_79_233_/_0.55)] ring-4 ring-white transition-transform duration-300 group-hover:-rotate-6">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        {course.badge && (
          <span className={`absolute -top-3 left-[78px] rounded-full px-2.5 py-0.5 text-[10.5px] font-bold tracking-[0.06em] uppercase ${BADGE_STYLE[course.badge]}`}>
            {course.badge}
          </span>
        )}
        <p className="text-[11.5px] font-semibold tracking-[0.04em] text-brand uppercase">{CATEGORY_TITLE[course.category]}</p>
        <h3 className="mt-1 text-[17px] font-bold text-ink">{course.title}</h3>
        <ul className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] whitespace-nowrap text-subtle">
          <li className="flex items-center gap-1">
            <GraduationCap className="size-3.5" aria-hidden="true" /> {course.grades}
          </li>
          <li className="flex items-center gap-1 border-l border-line pl-2.5">
            <Monitor className="size-3.5" aria-hidden="true" /> Online
          </li>
          <li className="flex items-center gap-1 border-l border-line pl-2.5">
            <BookOpen className="size-3.5" aria-hidden="true" /> {course.lessons} Lessons
          </li>
        </ul>
        <div className="mt-auto flex gap-2.5 pt-5">
          <button
            ref={detailsRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls={panelId}
            className={`${btn} border-[1.5px] border-brand/80 text-brand hover:bg-brand-50`}
          >
            View Details
          </button>
          <button type="button" onClick={enroll} className={`${btn} bg-brand text-white shadow-brand hover:bg-brand-600`}>
            Enroll Now
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${course.title} details`}
            className="absolute inset-0 z-10 flex flex-col bg-white/97 p-5 backdrop-blur-sm"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11.5px] font-semibold tracking-[0.04em] text-brand uppercase">{CATEGORY_TITLE[course.category]}</p>
                <h3 className="mt-1 text-[17px] font-bold text-ink">{course.title}</h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close details"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-panel text-ink transition-colors hover:bg-brand-50 hover:text-brand"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-3 text-[13.5px] leading-[21px] text-muted">{course.text}</p>
            <ul className="mt-3 space-y-2">
              {course.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-[13.5px] text-ink">
                  <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Check className="size-2.5" strokeWidth={3.5} aria-hidden="true" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12.5px] text-subtle">
              {course.grades} · Live online · {course.lessons} lessons
            </p>
            <button type="button" onClick={enroll} className={`${btn} mt-auto w-full flex-none bg-brand text-white shadow-brand hover:bg-brand-600`}>
              Enroll Now — Free Demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
