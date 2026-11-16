import { SUBJECTS } from '../../data/content'
import { useDemo } from '../DemoContext'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function SubjectsSection() {
  const { openDemo } = useDemo()
  return (
    <section id="courses" aria-labelledby="subjects-title" className="container-site pt-24 lg:pt-[137px]">
      <SectionHeading
        id="subjects-title"
        title="Get Help with All Your School Subjects"
        subtitle="Expert tutors for every core subject, from foundational concepts to board-exam preparation."
      />
      <RevealGroup as="ul" className="mt-10 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-5 md:grid-cols-4" stagger={0.06}>
        {SUBJECTS.map((s) => (
          <RevealItem as="li" key={s.name}>
            <button
              type="button"
              onClick={() => openDemo({ subject: s.name })}
              className="group block w-full rounded-2xl text-left"
              aria-label={`${s.name}: ${s.text} Book a ${s.name} demo`}
            >
              <span className="block overflow-hidden rounded-2xl">
                <img
                  src={s.src}
                  alt=""
                  width={257}
                  height={193}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[257/193] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </span>
              <span className="mt-3 block text-[15px] font-bold sm:text-[16px] text-ink transition-colors group-hover:text-brand">{s.name}</span>
              <span className="mt-1 block text-[13px] leading-[19px] text-muted sm:text-[14px] sm:leading-[21px]">{s.text}</span>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
