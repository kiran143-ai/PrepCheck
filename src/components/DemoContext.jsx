import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export const DEMO_SECTION_ID = 'get-started'

const DemoCtx = createContext({ openDemo: () => {}, request: { prefill: {}, version: 0 } })

/**
 * Every "Book a Demo"-style CTA calls openDemo(prefill?). There is no modal:
 * it scrolls to the inline booking form in the final CTA card, pre-fills any
 * given fields (subject / curriculum) and moves focus into the form.
 */
export function DemoProvider({ children }) {
  const [request, setRequest] = useState({ prefill: {}, version: 0 })

  const openDemo = useCallback((prefill = {}) => {
    setRequest((r) => ({ prefill, version: r.version + 1 }))
    const section = document.getElementById(DEMO_SECTION_ID)
    if (!section) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
      history.replaceState(null, '', `#${DEMO_SECTION_ID}`)
    })
  }, [])

  const value = useMemo(() => ({ openDemo, request }), [openDemo, request])
  return <DemoCtx.Provider value={value}>{children}</DemoCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDemo = () => useContext(DemoCtx)
