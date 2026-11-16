import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const format = (n, decimals) => n.toFixed(decimals)

/** Counts up to `value` the first time it scrolls into view. Screen readers get the final value. */
export function Counter({ value, decimals = 0, suffix = '', prefix = '', duration = 1.6, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const final = `${prefix}${format(value, decimals)}${suffix}`

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (reduce) {
      node.textContent = final
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${prefix}${format(v, decimals)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value, decimals, suffix, prefix, duration, final])

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {reduce ? final : `${prefix}${format(0, decimals)}${suffix}`}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  )
}
