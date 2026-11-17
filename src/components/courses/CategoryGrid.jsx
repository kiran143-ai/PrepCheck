import { Atom, BookOpen, Check, FlaskConical, Laptop, Layers, Star } from 'lucide-react'
import { COURSES, COURSE_CATEGORIES } from '../../data/courses'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const ICONS = { Atom, FlaskConical, Laptop, BookOpen, Layers, Star }
const countFor = (id) => COURSES.filter((c) => c.category === id).length

/** Six gradient category tiles. Selecting one filters the catalog below. */
export function CategoryGrid({ selected, onSelect }) {
  return (
    <section aria-labelledby="categories-title" className="container-site pt-6 lg:pt-10">
      <SectionHeading
        id="categories-title"
        title="Course Categories"
        subtitle="Explore our comprehensive range of courses across key academic areas."
      />
      <RevealGroup as="ul" className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" stagger={0.07}>
        {COURSE_CATEGORIES.map((c) => {
          const Icon = ICONS[c.icon]
          const active = selected === c.id
          const n = countFor(c.id)
          return (
            <RevealItem as="li" key={c.id}>
              <button
                type="button"
                onClick={() => onSelect(c.id)}
                aria-pressed={active}
                aria-label={`${c.title}: ${c.text}. Show ${n} course${n === 1 ? '' : 's'}`}
                className={`group relative flex h-full min-h-[124px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br px-3 pt-8 pb-5 sm:min-h-[138px] sm:px-5 sm:py-6 text-center text-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_44px_-18px_rgb(56_79_233_/_0.65)] ${c.gradient} ${
                  active ? 'ring-4 ring-brand/30 ring-offset-2 ring-offset-white' : 'shadow-[0_14px_30px_-18px_rgb(56_79_233_/_0.55)]'
                }`}
              >
                {/* decorative rings */}
                <span aria-hidden="true" className="absolute -top-10 -right-10 size-32 rounded-full border border-white/15 transition-transform duration-500 group-hover:scale-125" />
                <span aria-hidden="true" className="absolute -bottom-14 -left-8 size-36 rounded-full border border-white/10 transition-transform duration-500 group-hover:scale-110" />
                <span className="relative grid size-10 place-items-center sm:size-12 rounded-full bg-white/15 ring-1 ring-white/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="size-[22px]" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="relative mt-3 text-[14.5px] leading-tight font-bold sm:text-[17px]">{c.title}</span>
                <span className="relative mt-1 hidden text-[13px] text-white/80 sm:block">{c.text}</span>
                <span
                  className={`absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] sm:top-3 sm:right-3 sm:text-[11px] font-semibold transition-colors ${
                    active ? 'bg-white text-brand' : 'bg-white/15 text-white'
                  }`}
                >
                  {active && <Check className="size-3" strokeWidth={3} aria-hidden="true" />}
                  {n} {n === 1 ? 'course' : 'courses'}
                </span>
              </button>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}
