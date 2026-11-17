import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TEAM } from '../../data/about'
import { useRotation, useVisibleCount } from '../../hooks/useRotation'
import { Reveal } from '../ui/Reveal'
import { RotatingList } from '../ui/RotatingList'
import { SectionHeading } from '../ui/SectionHeading'

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

function Portrait({ member }) {
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt={`Portrait of ${member.name}`}
        loading="lazy"
        className="aspect-[4/4.4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    )
  }
  // Monogram placeholder until a real photo is supplied.
  return (
    <div
      className={`relative grid aspect-[4/4.4] w-full place-items-center overflow-hidden bg-gradient-to-br ${member.tone}`}
      role="img"
      aria-label={`${member.name} (photo coming soon)`}
    >
      <span aria-hidden="true" className="absolute -top-8 -right-8 size-28 rounded-full border border-white/60" />
      <span aria-hidden="true" className="absolute -bottom-10 -left-6 size-32 rounded-full border border-white/50" />
      <span
        aria-hidden="true"
        className="grid size-24 place-items-center rounded-full bg-white/70 text-[32px] font-extrabold tracking-[-0.03em] text-brand shadow-[0_12px_30px_-12px_rgb(56_79_233_/_0.45)] backdrop-blur transition-transform duration-500 group-hover:scale-110"
      >
        {initials(member.name)}
      </span>
    </div>
  )
}

const arrowCls =
  'grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink shadow-float ring-1 ring-line transition-all duration-300 hover:scale-105 hover:text-brand active:scale-95'

export function TeamSection() {
  const { rotated, direction, next, prev, goTo, offset } = useRotation(TEAM)
  const visible = useVisibleCount({ base: 1, sm: 2, md: 3, lg: 4 })

  return (
    <section aria-labelledby="team-title" className="mt-20 bg-[linear-gradient(180deg,#f5f6fd,#ffffff)] py-16 lg:mt-24 lg:py-20">
      <div className="container-site">
        <div className="text-center">
          <span className="inline-flex h-7 items-center rounded-full bg-brand-50 px-3.5 text-[12.5px] font-semibold text-brand">Our Team</span>
        </div>
        <SectionHeading
          id="team-title"
          className="mt-4"
          title="Meet Our Team"
          subtitle="A passionate team of educators, mentors, and learning experts committed to your child’s success."
          subClassName="max-w-[460px]"
        />

        <Reveal delay={0.1} className="mt-10 flex items-center gap-3 sm:gap-5">
          <button type="button" onClick={prev} aria-label="Previous team member" className={arrowCls}>
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <RotatingList
            label="PrepCheck team"
            items={rotated}
            visible={visible}
            direction={direction}
            getKey={(m) => m.name}
            className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5"
            renderItem={(m) => (
              <article className="group overflow-hidden rounded-2xl bg-white p-2.5 shadow-[0_14px_36px_-22px_rgb(20_26_60_/_0.4)] ring-1 ring-line/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgb(56_79_233_/_0.45)]">
                <div className="overflow-hidden rounded-xl">
                  <Portrait member={m} />
                </div>
                <div className="px-2 pt-3.5 pb-2 text-center">
                  <h3 className="text-[16px] font-bold text-ink">{m.name}</h3>
                  <p className="mt-0.5 text-[13px] text-muted">{m.role}</p>
                </div>
              </article>
            )}
          />
          <button type="button" onClick={next} aria-label="Next team member" className={arrowCls}>
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </Reveal>

        <div className="mt-8 flex justify-center gap-2" role="group" aria-label="Choose team member">
          {TEAM.map((m, i) => (
            <button
              key={m.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${m.name} first`}
              aria-current={offset === i ? 'true' : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${offset === i ? 'w-7 bg-brand' : 'w-2 bg-line hover:bg-brand/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
