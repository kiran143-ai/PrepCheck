import { STATS } from '../../data/content'
import { Counter } from '../ui/Counter'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { Rings } from '../ui/Rings'

export function StatsSection() {
  return (
    <section aria-labelledby="stats-title" className="container-site pt-16 sm:pt-20 lg:pt-24">
      <Reveal className="relative overflow-hidden rounded-3xl bg-night px-5 pt-14 pb-14 sm:px-10 sm:pt-[65px] sm:pb-[66px]">
        <Rings cy="58%" count={8} step={100} start={60} />
        <h2 id="stats-title" className="heading-lg relative mx-auto max-w-[640px] text-center text-[clamp(1.625rem,3.4vw,2.25rem)] leading-[1.25] text-white">
          Remarkable Transformations in Every Child’s Academic Journey
        </h2>
        <RevealGroup as="dl" className="relative mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((s) => (
            <RevealItem
              key={s.label}
              className="flex h-[112px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.09]"
            >
              <dd className="order-1 text-[30px] font-bold  text-white sm:text-[36px]">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </dd>
              <dt className="order-2 mt-1 text-[11px] font-semibold tracking-[0.06em] text-white/60 uppercase">{s.label}</dt>
            </RevealItem>
          ))}
        </RevealGroup>
      </Reveal>
    </section>
  )
}
