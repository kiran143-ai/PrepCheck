import { ArrowUpRight } from 'lucide-react'
import { COUNTRIES } from '../../data/content'
import { Link } from 'react-router-dom'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function CountrySection() {
  return (
    <section aria-labelledby="country-title" className="container-site pt-20 lg:pt-[92px]">
      <SectionHeading
        id="country-title"
        title="Tutoring by Country"
        subtitle="Curriculum-aligned support for families across the USA, Australia and the UK."
      />
      <RevealGroup as="ul" className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:gap-6" stagger={0.1}>
        {COUNTRIES.map((c) => (
          <RevealItem as="li" key={c.id} id={`country-${c.id}`} className="group scroll-mt-28">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={c.src}
                alt={c.alt}
                width={346}
                height={216}
                loading="lazy"
                decoding="async"
                className="aspect-[346/216] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[12px] font-medium text-ink shadow-sm">{c.tag}</span>
            </div>
            <h3 className="mt-[18px] text-[18px] font-bold  text-ink">{c.title}</h3>
            <p className="mt-1.5 text-[14px] leading-[22px] text-muted">{c.text}</p>
            <Link
              to={`/tutoring/${c.id}`}
              className="mt-2.5 inline-flex items-center gap-1 rounded text-[14px] font-semibold text-brand transition-colors hover:text-brand-700"
              aria-label={`Explore the ${c.title} program`}
            >
              Explore program
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
