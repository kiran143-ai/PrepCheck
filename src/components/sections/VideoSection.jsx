import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { SESSION_VIDEO_URL } from '../../data/content'
import { img } from '../../data/images'
import { useDemo } from '../DemoContext'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { Reveal } from '../ui/Reveal'

export function VideoSection() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const { openDemo } = useDemo()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-1.5%', '1.5%'])

  return (
    <section aria-labelledby="video-title" className="container-site pt-24 lg:pt-[131px]">
      <Reveal>
        <div ref={ref} className="relative isolate h-[420px] overflow-hidden rounded-3xl sm:h-[520px] lg:h-[612px]">
          <motion.img
            src={img.video}
            alt="Children running and laughing across a school playground at sunset"
            style={{ y, scale: 1.04 }}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 size-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0_/_0)_45%,rgb(0_0_0_/_0.55)_100%)]" />

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Play session preview video"
            className="group absolute top-1/2 left-1/2 grid size-[84px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
          >
            {!reduce && (
              <span className="absolute inset-0 animate-ping rounded-full bg-white/25 [animation-duration:2.4s]" aria-hidden="true" />
            )}
            <span className="absolute inset-0 rounded-full bg-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <span className="relative grid size-14 place-items-center rounded-full bg-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 size-5 fill-brand text-brand" aria-hidden="true" />
            </span>
          </button>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:px-10 sm:pb-[50px]">
            <h2 id="video-title" className="heading-lg max-w-[460px] text-[clamp(1.875rem,4vw,2.625rem)] leading-[1.13] text-white">
              See What Our Sessions Look Like
            </h2>
            <p className="mt-4 text-[14px] text-white/90">
              Interactive, engaging, and results-driven learning experiences.
            </p>
          </div>
        </div>
      </Reveal>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Inside a PrepCheck Session"
        description="A quick look at how our tutors run live, one-on-one lessons."
        size="max-w-3xl"
      >
        {SESSION_VIDEO_URL ? (
          <video src={SESSION_VIDEO_URL} controls autoPlay className="aspect-video w-full rounded-2xl bg-black" />
        ) : (
          <div className="relative overflow-hidden rounded-2xl">
            <img src={img['session-1']} alt="Student in a live online lesson" className="aspect-video w-full object-cover" />
            <div className="absolute inset-0 grid place-items-center bg-ink/55 p-6 text-center text-white">
              <div>
                <p className="text-lg font-bold">The full session walkthrough is coming soon.</p>
                <p className="mt-2 text-sm text-white/80">See it live instead — book a free demo lesson for your child.</p>
                <Button
                  variant="white"
                  arrow
                  className="mt-5 h-11 px-6 text-[15px]"
                  onClick={() => {
                    setOpen(false)
                    openDemo()
                  }}
                >
                  Book a Free Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
