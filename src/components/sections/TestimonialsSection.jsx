import { Quote, Star } from 'lucide-react'
import { TESTIMONIALS, TESTIMONIAL_STATS } from '../../data/content'
import { img } from '../../data/images'
import { useRotation, useVisibleCount } from '../../hooks/useRotation'
import { CarouselArrows } from '../ui/CarouselArrows'
import { Counter } from '../ui/Counter'
import { Reveal } from '../ui/Reveal'
import { RotatingList } from '../ui/RotatingList'

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

function Avatar({ t, className = 'size-9' }) {
  return t.avatar ? (
    <img src={t.avatar} alt="" width={36} height={36} loading="lazy" className={`${className} shrink-0 rounded-full object-cover`} />
  ) : (
    <span aria-hidden="true" className={`${className} grid shrink-0 place-items-center rounded-full bg-brand text-[12px] font-bold text-white`}>
      {initials(t.name)}
    </span>
  )
}

function Stars() {
  return (
    <span className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-4 fill-[#fbbf24] text-[#fbbf24]" aria-hidden="true" />
      ))}
    </span>
  )
}

export function TestimonialsSection() {
  const { rotated, direction, next, prev } = useRotation(TESTIMONIALS)
  const visible = useVisibleCount({ base: 1, md: 2, lg: 3 })

  return (
    <section aria-labelledby="testimonials-title" className="container-site pt-16 lg:pt-[88px]">
      <Reveal className="relative overflow-hidden rounded-3xl bg-navy px-5 pt-14 pb-10 sm:px-10 sm:pt-16 sm:pb-[66px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_0%,#22308f_0%,rgb(30_42_130_/_0.55)_40%,transparent_75%)]"
        />
        <div className="relative text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] font-medium text-white">
            <Star className="size-3.5 fill-[#fbbf24] text-[#fbbf24]" aria-hidden="true" /> Testimonials
          </span>
          <h2 id="testimonials-title" className="heading-lg mx-auto mt-4 max-w-[520px] text-[clamp(1.75rem,3.8vw,2.375rem)] leading-[1.06] text-white">
            Parents’ Feedback About Our Tutors
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] text-[14px] leading-5 text-white/70 sm:text-[15px]">
            Hear from parents who have witnessed remarkable transformations in their children’s academic journey.
          </p>
          <div className="mt-6 flex items-center justify-center">
            {[img['avatar-1'], img['avatar-2'], img['avatar-3'], img['avatar-2']].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                width={36}
                height={36}
                loading="lazy"
                className="-ml-2 size-9 rounded-full object-cover ring-2 ring-navy transition-transform duration-300 first:ml-0 hover:z-10 hover:-translate-y-1"
              />
            ))}
            <span className="-ml-2 grid size-9 place-items-center rounded-full bg-brand text-[11px] font-bold text-white ring-2 ring-navy">
              500+
            </span>
          </div>
        </div>

        <RotatingList
          label="Parent testimonials"
          items={rotated}
          visible={visible}
          direction={direction}
          getKey={(t) => t.name}
          className="relative mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          itemClassName="flex"
          renderItem={(t) => (
            <figure className="flex w-full flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.09]">
              <div className="flex items-center justify-between">
                <Stars />
                <Quote className="size-5 text-white/35" aria-hidden="true" />
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-[23px] text-white/90">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <Avatar t={t} />
                <span>
                  <span className="block text-[15px] font-bold text-white">{t.name}</span>
                  <span className="block text-[12px] text-white/60">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          )}
        />

        <div className="relative mt-7 flex flex-wrap items-center justify-between gap-6">
          <dl className="flex gap-6">
            {TESTIMONIAL_STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dd className="order-1 text-[18px] font-bold text-white">
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </dd>
                <dt className="order-2 text-[11px] text-white/65">{s.label}</dt>
              </div>
            ))}
          </dl>
          <CarouselArrows onPrev={prev} onNext={next} label="testimonial" tone="dark" />
        </div>
      </Reveal>
    </section>
  )
}
