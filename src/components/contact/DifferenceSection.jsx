import { Award, CircleCheck, ShieldCheck, Target, TrendingUp } from 'lucide-react'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const ITEMS = [
  { icon: Award, title: 'Certified Teachers', text: '10+ years of experience', tone: 'from-[#5b73fb] to-brand' },
  { icon: Target, title: 'Personalized Learning', text: 'Tailored for every child', tone: 'from-[#2dd4bf] to-[#0d9488]' },
  { icon: CircleCheck, title: 'Small Class Sizes', text: 'Individual attention', tone: 'from-[#4ade80] to-[#16a34a]' },
  { icon: TrendingUp, title: 'Progress Tracking', text: 'Regular updates and reports', tone: 'from-[#fdba74] to-[#f97316]' },
  { icon: ShieldCheck, title: 'Safe Environment', text: 'Secure and inclusive learning', tone: 'from-[#3b5bfd] to-[#1e2a78]' },
]

export function DifferenceSection() {
  return (
    <section aria-labelledby="difference-title" className="container-site pt-20 lg:pt-24">
      <div className="text-center">
        <span className="inline-flex h-7 items-center rounded-full bg-brand-50 px-3.5 text-[12.5px] font-semibold text-brand">
          Why Choose PrepCheck?
        </span>
      </div>
      <SectionHeading
        id="difference-title"
        className="mt-4"
        title="Experience the PrepCheck Difference"
        subtitle="We’re committed to providing the highest quality education experience that transforms your child’s academic journey."
        subClassName="max-w-[560px]"
      />
      <RevealGroup as="ul" className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5" stagger={0.07}>
        {ITEMS.map(({ icon: Icon, title, text, tone }, i) => (
          <RevealItem
            as="li"
            key={title}
            className={`group flex flex-col items-center rounded-2xl bg-white px-4 py-6 text-center shadow-[0_14px_40px_-26px_rgb(20_26_60_/_0.45)] ring-1 ring-line/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgb(56_79_233_/_0.4)] ${
              i === ITEMS.length - 1 ? 'col-span-2 md:col-span-1' : ''
            }`}
          >
            <span className={`grid size-14 place-items-center rounded-full bg-gradient-to-br text-white shadow-[0_10px_22px_-10px_rgb(20_26_60_/_0.45)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${tone}`}>
              <Icon className="size-6" strokeWidth={1.9} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[16px] leading-tight font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-[13.5px] leading-5 text-muted">{text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
