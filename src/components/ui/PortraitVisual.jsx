import { motion, useReducedMotion } from 'framer-motion'
import { img } from '../../data/images'

const EASE = [0.22, 1, 0.36, 1]

function FloatBadge({ icon: Icon, label, cls, delay, bob, dur, reduce }) {
  return (
    <motion.div
      className={`absolute z-20 ${cls}`}
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -bob, 0] }}
        transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.6 }}
        className="flex w-[104px] flex-col items-center gap-2 rounded-2xl bg-white px-3 py-3.5 text-center shadow-float transition-transform duration-300 hover:-translate-y-1 sm:w-[118px]"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-brand">
          <Icon className="size-[18px]" aria-hidden="true" />
        </span>
        <span className="text-[12px] leading-tight font-bold text-ink">{label}</span>
      </motion.div>
    </motion.div>
  )
}

/**
 * Hero visual shared by inner pages: a portrait photo on a softly morphing blob,
 * with floating feature badges. `badges` = [{ icon, label, cls, delay, bob, dur }].
 */
export function PortraitVisual({ badges, src = img['hero-center'], alt = 'Smiling student with headphones studying on a laptop' }) {
  const reduce = useReducedMotion()
  return (
      <div className="relative mx-auto w-full max-w-[460px]">
        <motion.div
          aria-hidden="true"
          className="absolute inset-[-2%_-4%_-4%_-2%] bg-[linear-gradient(135deg,#d6dbff,#e6dcff_60%,#f1ecff)]"
          initial={{ opacity: 0, scale: 0.8, borderRadius: '42% 58% 55% 45% / 48% 42% 58% 52%' }}
          animate={
            reduce
              ? { opacity: 1, scale: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  borderRadius: [
                    '42% 58% 55% 45% / 48% 42% 58% 52%',
                    '55% 45% 42% 58% / 40% 55% 45% 60%',
                    '42% 58% 55% 45% / 48% 42% 58% 52%',
                  ],
                }
          }
          transition={{ opacity: { duration: 0.8 }, scale: { duration: 0.8, ease: EASE }, borderRadius: { duration: 10, repeat: Infinity, ease: 'easeInOut' } }}
        />
        <svg aria-hidden="true" viewBox="0 0 50 40" className="absolute -top-2 right-[6%] h-10 w-12 text-brand/70">
          <path d="M25 6 3 16l22 10 22-10Z M11 20v9c8 6 20 6 28 0v-9 M45 17v11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <svg aria-hidden="true" viewBox="0 0 80 60" className="absolute -right-2 -bottom-6 h-14 w-20 text-brand/50">
          <path d="M4 50c22 6 52-2 66-30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="m64 18 7 1 1-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <motion.div
          className="relative mx-auto w-[78%] overflow-hidden rounded-[32px] shadow-[0_30px_60px_-28px_rgb(20_30_80_/_0.5)]"
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          <img
            src={src}
            alt={alt}
            width={340}
            height={365}
            fetchPriority="high"
            className="aspect-[340/380] w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          />
        </motion.div>

        {badges.map((b) => (
          <FloatBadge key={b.label} {...b} reduce={reduce} />
        ))}
      </div>
  )
}
