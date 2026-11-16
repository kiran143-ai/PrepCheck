import { useCallback, useEffect, useState } from 'react'

/**
 * Infinite carousel state: rotates the item list by `offset` so the first
 * `visible` items are on screen. Works even when every item already fits.
 */
export function useRotation(items) {
  const [offset, setOffset] = useState(0)
  const [direction, setDirection] = useState(1)
  const n = items.length
  const next = useCallback(() => {
    setDirection(1)
    setOffset((o) => (o + 1) % n)
  }, [n])
  const prev = useCallback(() => {
    setDirection(-1)
    setOffset((o) => (o - 1 + n) % n)
  }, [n])
  const rotated = items.map((_, i) => items[(i + offset) % n])
  return { rotated, offset, direction, next, prev }
}

/** Number of carousel items that fit, by breakpoint. */
export function useVisibleCount({ base = 1, sm, md, lg }) {
  const get = () => {
    if (typeof window === 'undefined') return lg ?? md ?? sm ?? base
    const w = window.innerWidth
    if (lg && w >= 1024) return lg
    if (md && w >= 768) return md
    if (sm && w >= 640) return sm
    return base
  }
  const [count, setCount] = useState(get)
  useEffect(() => {
    const onResize = () => setCount(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, sm, md, lg])
  return count
}
