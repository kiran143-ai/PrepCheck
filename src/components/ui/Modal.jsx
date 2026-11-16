import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])'

/** Accessible dialog: focus trap, Escape to close, scroll lock, focus restore. */
export function Modal({ open, onClose, title, description, size = 'max-w-lg', dark = false, children }) {
  const panelRef = useRef(null)
  const returnFocus = useRef(null)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => panelRef.current?.querySelector(FOCUSABLE)?.focus(), 50)

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panelRef.current) return
      const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)]
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      returnFocus.current?.focus?.()
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            className={`relative max-h-[92vh] w-full ${size} overflow-y-auto rounded-t-3xl p-6 shadow-2xl sm:rounded-3xl sm:p-8 ${
              dark ? 'bg-night text-white' : 'bg-white text-ink'
            }`}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97, transition: { duration: 0.2, ease: 'easeIn' } }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className={`absolute top-4 right-4 grid size-9 place-items-center rounded-full transition-colors ${
                dark ? 'bg-white/10 hover:bg-white/20' : 'bg-panel hover:bg-brand-50 hover:text-brand'
              }`}
            >
              <X className="size-4" aria-hidden="true" />
            </button>
            <h2 id={titleId} className="heading-lg pr-10 text-[26px]">
              {title}
            </h2>
            {description && (
              <p id={descId} className={`mt-2 text-[15px] leading-6 ${dark ? 'text-white/70' : 'text-muted'}`}>
                {description}
              </p>
            )}
            <div className="mt-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
