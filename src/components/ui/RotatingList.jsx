import { AnimatePresence, motion } from 'framer-motion'

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.96 }),
}

/** Renders the first `visible` items of a rotated list, animating items in/out and sliding the rest. */
export function RotatingList({ items, visible, direction, getKey, renderItem, className, itemClassName = '', label }) {
  const shown = items.slice(0, visible)
  return (
    <ul className={className} aria-live="polite" aria-label={label}>
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        {shown.map((item, i) => (
          <motion.li
            key={getKey(item)}
            layout
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 260, damping: 30, opacity: { duration: 0.25 } }}
            className={itemClassName}
          >
            {renderItem(item, i)}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
