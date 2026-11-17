import { ArrowRight, BookOpen, FileText, Globe, GraduationCap, Landmark, ShieldCheck } from 'lucide-react'
import { BOARDS } from '../../data/courses'
import { useDemo } from '../DemoContext'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const ICONS = { BookOpen, FileText, GraduationCap, Globe, ShieldCheck, Landmark }

export function BoardsSection() {
  const { openDemo } = useDemo()
  return (
    <section aria-labelledby="boards-title" className="container-site pt-20 lg:pt-24">
      <SectionHeading
        id="boards-title"
        title="Educational Boards We Support"
        subtitle="We provide curriculum-aligned courses for major educational boards, ensuring students get the right preparation and guidance."
        subClassName="max-w-[600px]"
      />
      <RevealGroup as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {BOARDS.map((b) => {
          const Icon = ICONS[b.icon]
          return (
            <RevealItem
              as="li"
              key={b.title}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-line bg-[linear-gradient(180deg,#f7f8ff,#ffffff_45%)] px-6 pt-8 pb-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_22px_44px_-22px_rgb(56_79_233_/_0.4)]"
            >
              <span className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-[#5b73fb] to-brand text-white shadow-brand transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[18px] font-bold text-ink">{b.title}</h3>
              <p className="mt-2 max-w-[260px] text-[14px] leading-[21px] text-muted">{b.text}</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-1.5" aria-label={`${b.title} coverage`}>
                {b.tags.map((t) => (
                  <li key={t} className="rounded-full bg-brand-50 px-3 py-1 text-[12px] font-semibold text-brand ring-1 ring-brand/15">
                    {t}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openDemo({ curriculum: b.curriculum })}
                className="mt-5 inline-flex items-center gap-1.5 rounded text-[13.5px] font-semibold text-brand transition-colors hover:text-brand-700"
                aria-label={`Get a ${b.title} aligned study plan`}
              >
                Get a board-aligned plan
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}
