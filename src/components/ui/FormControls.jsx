import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, CircleAlert } from 'lucide-react'

/** Label + control + animated inline error. Error id is `${id}-error`. */
export function Field({ id, label, error, optional, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label} {optional && <span className="font-normal text-subtle">(optional)</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 overflow-hidden pt-1.5 text-[12.5px] text-red-600"
          >
            <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}


/** Native select with a custom chevron. */
export function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select {...props} className={`${className} cursor-pointer appearance-none pr-9`}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
    </div>
  )
}
