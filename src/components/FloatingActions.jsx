import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { CONTACT } from '../data/content'

const WA_TEXT = 'Hi PrepCheck! I’d like to know more about tutoring for my child.'
const WA_URL = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(WA_TEXT)}`

function WhatsAppGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.03-1.32A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.99.78.8-2.91-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  )
}

/** Bottom-right floating actions: WhatsApp chat + back to top with scroll-progress ring. */
export function FloatingActions() {
  const reduce = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32 })
  const [showTop, setShowTop] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShowTop(y > 480))

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    // move keyboard focus back to the top of the page
    document.querySelector('header a')?.focus({ preventScroll: true })
  }

  return (
    <div
      className="fixed right-4 bottom-4 z-40 flex flex-col items-center gap-3 print:hidden sm:right-6 sm:bottom-6"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', paddingRight: 'env(safe-area-inset-right)' }}
    >
      {/* WhatsApp */}
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with PrepCheck on WhatsApp (opens in a new tab)"
        className="group relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_28px_-8px_rgb(37_211_102_/_0.65)] ring-[3px] ring-white outline-offset-4 transition-colors hover:bg-[#1fbe5b]"
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.2 }}
        whileHover={reduce ? undefined : { scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {!reduce && (
          <>
            <span aria-hidden="true" className="absolute -inset-3 -z-10 animate-ping rounded-full bg-[#25d366]/20 [animation-duration:2.6s]" />
            <span aria-hidden="true" className="absolute -inset-4 -z-10 rounded-full bg-[#25d366]/10" />
          </>
        )}
        <WhatsAppGlyph className="size-7" />
        <span
          role="tooltip"
          className="pointer-events-none absolute top-1/2 right-[calc(100%+14px)] hidden -translate-y-1/2 translate-x-1 rounded-xl bg-ink px-3 py-2 text-[13px] font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block"
        >
          Chat with us on WhatsApp
          <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rotate-45 bg-ink" aria-hidden="true" />
        </span>
      </motion.a>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="group relative grid size-14 place-items-center rounded-full bg-brand text-white shadow-brand transition-colors hover:bg-brand-600"
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            whileHover={reduce ? undefined : { y: -3 }}
            whileTap={{ scale: 0.94 }}
          >
            {/* scroll-progress ring */}
            <svg viewBox="0 0 56 56" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
              <circle cx="28" cy="28" r="25.5" fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="2.5" />
              <motion.circle cx="28" cy="28" r="25.5" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: progress }} />
            </svg>
            <ChevronUp className="size-6 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2.5} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
