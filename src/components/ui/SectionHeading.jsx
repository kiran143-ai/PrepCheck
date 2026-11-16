import { Reveal } from './Reveal'

export function SectionHeading({ id, title, subtitle, className = '', subClassName = 'max-w-[690px]' }) {
  return (
    <div className={`text-center ${className}`}>
      <Reveal as="h2" id={id} className="heading-lg text-[clamp(1.75rem,3.8vw,2.375rem)] text-ink">
        {title}
      </Reveal>
      {subtitle && (
        <Reveal as="p" delay={0.08} className={`mx-auto mt-2 text-[15px] leading-6 text-muted sm:text-[16px] ${subClassName}`}>
          {subtitle}
        </Reveal>
      )}
    </div>
  )
}
