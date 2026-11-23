import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HEADER_LINKS } from '../../data/content'
import { goHome } from '../../lib/nav'
import { useDemo } from '../DemoContext'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

export function Navbar() {
  const { openDemo } = useDemo()
  const { pathname } = useLocation()
  // Pages whose hero is a dark band: keep the navbar solid so links stay readable.
  const solid = /^\/(refund-policy|privacy-policy|terms-of-service|cookie-policy)$/.test(pathname)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12))

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open || solid ? 'bg-white/85 shadow-[0_1px_0_rgb(12_13_22_/_0.06)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <motion.nav
        aria-label="Primary"
        className="container-site relative flex h-[70px] items-center justify-between"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo className="ml-1" />

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
          {HEADER_LINKS.map((l) => {
            const isActive = l.href === pathname
            return (
              <li key={l.label} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_rgb(20_26_60_/_0.08)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {l.href ? (
                  <Link
                    to={l.href}
                    onClick={l.href === '/' ? goHome : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative block rounded-full px-[18px] py-2 text-[15px] font-medium transition-colors duration-200 ${
                      isActive ? 'text-ink' : 'text-ink-700/80 hover:text-brand'
                    }`}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <span className="relative block cursor-default px-[18px] py-2 text-[15px] font-medium text-ink-700/80">
                    {l.label}
                  </span>
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex">
            <Button variant="plain" className="h-10 px-5 text-[15px]" onClick={() => openDemo()}>
              Book a Demo
            </Button>
          </span>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-brand-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-line bg-white lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container-site flex flex-col gap-1 py-4">
              {HEADER_LINKS.map((l, i) => {
                const isActive = l.href === pathname
                return (
                  <motion.li key={l.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                    {l.href ? (
                      <Link
                        to={l.href}
                        onClick={(e) => {
                          setOpen(false)
                          if (l.href === '/') goHome(e)
                        }}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          isActive ? 'bg-brand-50 text-brand' : 'text-ink hover:bg-panel'
                        }`}
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <span className="block px-4 py-3 text-base font-medium text-ink">{l.label}</span>
                    )}
                  </motion.li>
                )
              })}
              <li className="mt-2 sm:hidden">
                <Button
                  variant="plain"
                  className="h-12 w-full text-[15px]"
                  onClick={() => {
                    setOpen(false)
                    openDemo()
                  }}
                >
                  Book a Demo
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
