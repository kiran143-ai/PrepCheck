import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const DEMO_SECTION_ID = 'get-started'

const DemoCtx = createContext({ openDemo: () => {}, request: { prefill: {}, version: 0 } })

/**
 * Every "Book a Demo"-style CTA calls openDemo(prefill?). There is no modal:
 * it scrolls to the page's inline form (the element with id="get-started"),
 * pre-fills any given fields (subject / curriculum) and moves focus into it.
 * Pages without a form send the visitor to the homepage form instead.
 */
export function DemoProvider({ children }) {
  const [request, setRequest] = useState({ prefill: {}, version: 0 })
  const navigate = useNavigate()

  const openDemo = useCallback((prefill = {}) => {
    setRequest((r) => ({ prefill, version: r.version + 1 }))
    const section = document.getElementById(DEMO_SECTION_ID)
    if (!section) {
      navigate(`/#${DEMO_SECTION_ID}`)
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
      history.replaceState(null, '', `#${DEMO_SECTION_ID}`)
    })
  }, [navigate])

  const value = useMemo(() => ({ openDemo, request }), [openDemo, request])
  return <DemoCtx.Provider value={value}>{children}</DemoCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDemo = () => useContext(DemoCtx)
