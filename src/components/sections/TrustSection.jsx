import { BadgeCheck, ShieldCheck, SlidersHorizontal, UserSearch } from 'lucide-react'
import { TRUST_REASONS } from '../../data/content'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const ICONS = { BadgeCheck, UserSearch, SlidersHorizontal, ShieldCheck }

export function TrustSection() {
  return (
    <section id="about" aria-labelledby="trust-title" className="container-site pt-16 sm:pt-[62px]">
      <SectionHeading
        id="trust-title"
        title="Reasons to Trust Our Tutors"
        subtitle="Every tutor is verified, carefully selected and matched to your child, so learning feels personal from the very first session."
      />
      <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_REASONS.map((r) => {
          const Icon = ICONS[r.icon]
          return (
            <RevealItem
              as="li"
              key={r.title}
              className="group rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_20px_40px_-20px_rgb(56_79_233_/_0.35)]"
            >
              <span className="grid size-11 place-items-center rounded-[10px] bg-brand-50 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <Icon className="size-[18px]" strokeWidth={2} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[17px] font-bold  text-ink">{r.title}</h3>
              <p className="mt-2 text-[14px] leading-[21px] text-muted">{r.text}</p>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}
