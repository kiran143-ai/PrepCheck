/**
 * Home link handler: on the homepage, scroll smoothly to the top instead of
 * reloading. On any other page the normal link navigation happens.
 */
export function goHome(e) {
  if (window.location.pathname !== '/') return
  e.preventDefault()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  if (window.location.hash) history.replaceState(null, '', '/')
}
