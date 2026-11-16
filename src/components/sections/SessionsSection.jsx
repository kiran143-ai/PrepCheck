import { SESSIONS } from '../../data/content'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function SessionsSection() {
  return (
    <section aria-labelledby="sessions-title" className="container-site pt-14 lg:pt-10">
      <SectionHeading
        id="sessions-title"
        title="Inside Our Learning Sessions"
        subtitle="Live interactive sessions, personalized attention and a weekly schedule built around your child."
      />
      <RevealGroup as="ul" className="mt-8 grid items-center gap-5 sm:grid-cols-3 sm:gap-3 lg:gap-[21px]" stagger={0.12}>
        {SESSIONS.map((s, i) => {
          const featured = i === 1
          return (
            <RevealItem
              as="li"
              key={s.label}
              className={`group relative overflow-hidden rounded-3xl ${featured ? 'aspect-[348/512] sm:z-10 sm:shadow-[0_24px_50px_-24px_rgb(20_26_60_/_0.45)]' : 'aspect-[349/466] sm:aspect-[349/466]'}`}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-ink shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                {s.label}
              </span>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}
