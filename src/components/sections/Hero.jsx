import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, Star, Users, Video } from 'lucide-react'
import { useRef } from 'react'
import { img } from '../../data/images'
import { useDemo } from '../DemoContext'
import { Button } from '../ui/Button'
import { Counter } from '../ui/Counter'
import { GhostType } from '../ui/GhostType'

const EASE = [0.22, 1, 0.36, 1]

/*
 * Collage geometry. `d` = desktop (lg+) measured from the design on a 1088×380 canvas,
 * `m` = compact layout below lg. l/w are % of width, t is % of canvas height.
 */
const PHOTOS = [
  { key: 'girl-small', src: img['hero-girl-small'], alt: 'Smiling primary school girl in uniform', ratio: '1 / 1', radius: 'rounded-[18px]',
    d: { l: 3.125, t: 6.32, w: 10.2 }, m: { l: 3, t: 10, w: 15 }, float: { y: 8, dur: 5.2, delay: 0.2 }, depth: 0.6, order: 1 },
  { key: 'boy-books', src: img['hero-boy-books'], alt: 'Schoolboy holding a stack of books', ratio: '192 / 207', radius: 'rounded-[22px]',
    d: { l: 9.65, t: 44.74, w: 17.65 }, m: { l: 5, t: 63.6, w: 20 }, float: { y: 10, dur: 6.4, delay: 0.8 }, depth: 0.35, order: 2 },
  { key: 'center', src: img['hero-center'], alt: 'Smiling student with headphones holding a laptop', ratio: '340 / 365', radius: 'rounded-t-[18px]',
    d: { l: 34.56, t: 3.95, w: 31.25 }, m: { l: 27, t: 20.3, w: 46 }, float: null, depth: 0, order: 0, priority: true },
  { key: 'boy-thumb', src: img['hero-boy-thumb'], alt: 'Student in a blazer giving a thumbs up', ratio: '191 / 207', radius: 'rounded-[22px]',
    d: { l: 71.14, t: 16.84, w: 17.56 }, m: { l: 76, t: 30, w: 20 }, float: { y: 9, dur: 5.8, delay: 0.4 }, depth: 0.45, order: 3 },
  { key: 'girl-pink', src: img['hero-girl-pink'], alt: 'Student holding colourful notebooks', ratio: '1 / 1', radius: 'rounded-[18px]',
    d: { l: 88.42, t: 0, w: 8.73 }, m: { l: 84, t: 0, w: 12 }, float: { y: 7, dur: 4.6, delay: 1.1 }, depth: 0.7, order: 4 },
]

const BADGES = [
  { key: 'live', icon: Video, title: '1-on-1', label: 'Live Sessions', d: { l: 23.9, t: 12.63 }, m: { l: 12, t: 28 }, float: { y: 6, dur: 4.4, delay: 0.3 } },
  { key: 'rating', icon: Star, count: { value: 5, decimals: 1 }, label: 'Parent Rating', d: { l: 20.96, t: 71.05 }, m: { l: 14, t: 80 }, float: { y: 7, dur: 5, delay: 1 } },
  { key: 'students', icon: Users, count: { value: 100, suffix: '+' }, label: 'Happy Students', d: { l: 60.39, t: 68.42 }, m: { l: 58, t: 66 }, float: { y: 6, dur: 4.8, delay: 0.6 } },
]

const pos = (p) => ({
  '--dl': `${p.d.l}%`, '--dt': `${p.d.t}%`, '--dw': p.d.w != null ? `${p.d.w}%` : undefined,
  '--ml': `${p.m.l}%`, '--mt': `${p.m.t}%`, '--mw': p.m.w != null ? `${p.m.w}%` : undefined,
})
const POS_CLS = 'absolute left-(--ml) top-(--mt) lg:left-(--dl) lg:top-(--dt)'

function Float({ float, reduce, children, className }) {
  if (!float || reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -float.y, 0] }}
      transition={{ duration: float.dur, delay: float.delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function useParallax(progress, depth, reduce) {
  return useTransform(progress, [0, 1], [0, reduce ? 0 : -110 * depth])
}

function Photo({ p, progress, reduce }) {
  const y = useParallax(progress, p.depth, reduce)
  return (
    <motion.div
      className={`${POS_CLS} w-(--mw) lg:w-(--dw) ${p.key === 'center' ? 'z-10' : 'z-0'}`}
      style={{ ...pos(p), y }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.55 + p.order * 0.1 }}
      >
      <Float float={p.float} reduce={reduce}>
        <div
          className={`group overflow-hidden ${p.radius} ${p.key === 'center' ? '' : 'shadow-[0_12px_30px_-14px_rgb(20_26_60_/_0.35)]'}`}
          style={{ aspectRatio: p.ratio }}
        >
          <img
            src={p.src}
            alt={p.alt}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            loading="eager"
            fetchPriority={p.priority ? 'high' : 'auto'}
            decoding="async"
            draggable="false"
          />
        </div>
      </Float>
      </motion.div>
    </motion.div>
  )
}

function Badge({ b, progress, reduce, index }) {
  const y = useParallax(progress, 0.25, reduce)
  const Icon = b.icon
  return (
    <motion.div className={`${POS_CLS} z-20`} style={{ ...pos(b), y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.05 + index * 0.15 }}
      >
      <Float float={b.float} reduce={reduce}>
        <div className="flex items-center gap-2 rounded-[12px] bg-white p-1.5 pr-3 shadow-float transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-10px_rgb(20_26_60_/_0.28)] sm:gap-2.5 sm:rounded-[14px] sm:p-2 sm:pr-4">
          <span className="grid size-7 place-items-center rounded-[9px] bg-brand text-white sm:size-9 sm:rounded-[10px]">
            <Icon className="size-3.5 sm:size-[18px]" strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="text-left leading-none">
            <span className="block text-[13px] font-extrabold text-ink sm:text-[17px]">
              {b.count ? <Counter {...b.count} duration={1.8} /> : b.title}
            </span>
            <span className="mt-1 block text-[10px] font-medium whitespace-nowrap text-ink-700 sm:text-[12px]">{b.label}</span>
          </span>
        </div>
      </Float>
      </motion.div>
    </motion.div>
  )
}

function Decorations({ reduce }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* yellow squiggle, left edge */}
      <motion.svg
        viewBox="0 0 30 40" className="absolute top-[110px] left-[calc(50%-664px)] hidden h-10 w-8 min-[1360px]:block"
        animate={reduce ? undefined : { rotate: [0, 10, 0], y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M6 34c10-6 14-14 12-24" fill="none" stroke="#f5b82e" strokeWidth="3.2" strokeLinecap="round" />
      </motion.svg>
      {/* sun rays, right edge */}
      <motion.svg
        viewBox="0 0 40 30" className="absolute top-[165px] left-[calc(50%+628px)] hidden h-8 w-10 origin-bottom min-[1360px]:block"
        animate={reduce ? undefined : { scale: [1, 1.18, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <g stroke="#f5b82e" strokeWidth="2.8" strokeLinecap="round">
          <path d="M6 10l5 13" /><path d="M20 3v20" /><path d="M34 10l-5 13" />
        </g>
      </motion.svg>
      {/* dashed purple wave */}
      <svg viewBox="0 0 160 70" className="absolute top-[386px] left-[calc(50%-562px)] hidden h-[66px] w-[154px] lg:block">
        <motion.path
          d="M3 64c14-24 30-30 52-22 24 9 44 12 64-6 10-9 22-22 37-32"
          fill="none" stroke="#a7a3ef" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, strokeDashoffset: [0, -44] }}
          transition={{ opacity: { duration: 1, delay: 0.6 }, strokeDashoffset: { duration: 3, repeat: Infinity, ease: 'linear' } }}
        />
      </svg>
    </div>
  )
}

// Headline indices: "Exceptional Tutors for " = 0–22, "Your" = 23–26, line break = 27.
const TITLE_LINES = ['Exceptional Tutors for Your', 'Child’s Journey to Excellence']

export function Hero() {
  const { openDemo } = useDemo()
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  return (
    <section id="home" ref={ref} className="relative overflow-hidden bg-[linear-gradient(180deg,#f1f2fe_0%,#f4f4fe_55%,#faf9ff_100%)] pt-[70px]">
      <Decorations reduce={reduce} />
      <div className="container-site relative text-center">
        <h1 className="heading-xl mx-auto pt-10 text-[clamp(2.25rem,6vw,3.8rem)] text-ink sm:pt-[63px]">
          <GhostType lines={TITLE_LINES} rejectAt={23} rejectText="Every Subject" suggestAt={27} startDelay={450} />
        </h1>
        <motion.p
          className="mx-auto mt-4 max-w-[580px] text-[16px] leading-[26px]  text-muted sm:text-[17px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
        >
          Connect your child with expert tutors who inspire learning and academic success. Personalized one-on-one
          sessions tailored to your child’s unique learning style and goals.
        </motion.p>
        <motion.div
          className="mt-7"
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
        >
          <Button arrow className="h-[44px] px-6 text-[15px]" onClick={() => openDemo()}>
            Start Your Journey
          </Button>
        </motion.div>

        {/* Collage */}
        <div className="relative mx-auto mt-10 aspect-[10/6.2] w-full max-w-[560px] sm:mt-12 lg:mt-[49px] lg:aspect-[1088/380] lg:max-w-none">
          {PHOTOS.map((p) => (
            <Photo key={p.key} p={p} progress={scrollYProgress} reduce={reduce} />
          ))}
          {BADGES.map((b, i) => (
            <Badge key={b.key} b={b} index={i} progress={scrollYProgress} reduce={reduce} />
          ))}
          {/* graduation-cap bubble on the centre photo's corner */}
          <motion.div
            aria-hidden="true"
            className="absolute top-[12%] left-[69%] z-20 lg:top-0 lg:left-[64.98%]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 1.5 }}
          >
            <motion.span
              className="grid size-9 place-items-center rounded-full bg-white text-brand shadow-float sm:size-11"
              animate={reduce ? undefined : { rotate: [0, -12, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
            >
              <GraduationCap className="size-4 sm:size-5" strokeWidth={2} />
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
