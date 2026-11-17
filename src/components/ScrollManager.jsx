import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On page change: jump to the top, or — for links like "/#country-usa" —
 * scroll to that section once the new page has rendered.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    let tries = 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const find = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      else if (tries++ < 20) setTimeout(find, 50)
    }
    find()
  }, [pathname, hash])
  return null
}
