import { TUTORS } from '../../data/content'
import { useRotation, useVisibleCount } from '../../hooks/useRotation'
import { CarouselArrows } from '../ui/CarouselArrows'
import { Reveal } from '../ui/Reveal'
import { RotatingList } from '../ui/RotatingList'

export function TutorsSection() {
  const { rotated, direction, next, prev } = useRotation(TUTORS)
  const visible = useVisibleCount({ base: 1, sm: 2, md: 3, lg: 4 })

  return (
    <section aria-labelledby="tutors-title" className="container-site pt-24 lg:pt-[143px]">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[600px]">
          <Reveal as="h2" id="tutors-title" className="heading-lg max-w-[520px] text-[clamp(1.75rem,3.8vw,2.375rem)] leading-[1] text-ink">
            Our Tutors are Proficient and Reliable
          </Reveal>
          <Reveal as="p" delay={0.08} className="mt-3 text-[15px] leading-6 text-muted sm:text-[16px]">
            Excellent experience, top 5% selection and a verified grade boost — every tutor is proven to move results.
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <CarouselArrows onPrev={prev} onNext={next} label="tutor" />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <RotatingList
          label="Featured tutors"
          items={rotated}
          visible={visible}
          direction={direction}
          getKey={(t) => t.name}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          renderItem={(t) => (
            <article className="group">
              <div className="overflow-hidden rounded-2xl bg-panel">
                <img
                  src={t.src}
                  alt={`Portrait of ${t.name}`}
                  width={257}
                  height={322}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  className="aspect-[257/322] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 text-[16px] font-bold text-ink">{t.name}</h3>
              <p className="mt-0.5 text-[14px] text-muted">{t.role}</p>
            </article>
          )}
        />
      </Reveal>
    </section>
  )
}
