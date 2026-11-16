import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const jitter = (min, max) => min + Math.random() * (max - min)

/** Small keyboard hint that floats above the caret ("Esc" / "Tab"). */
function KeyHint({ k, label }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="pointer-events-none absolute bottom-[calc(100%+0.1em)] left-0 z-10 hidden items-center sm:inline-flex gap-1.5 rounded-full border border-line bg-white py-1 pr-2.5 pl-1 text-[12px] font-medium tracking-normal whitespace-nowrap text-muted shadow-[0_6px_16px_-6px_rgb(20_26_60_/_0.25)]"
    >
      <kbd className="rounded-md border border-line bg-panel px-1.5 py-px font-sans text-[11px] font-bold text-ink shadow-[inset_0_-1px_0_rgb(0_0_0_/_0.08)]">
        {k}
      </kbd>
      {label}
    </motion.span>
  )
}

/**
 * GhostType — a headline that writes itself with AI-style ghost completions.
 *
 * Timeline: types up to `rejectAt`, floats a faded suggestion (`rejectText`) that is
 * dismissed, keeps typing to `suggestAt`, then offers the rest of the headline as a
 * ghost completion which is "accepted" with an ink sweep.
 *
 * The final text is always laid out (untyped glyphs are transparent), so the
 * animation never reflows the page. Screen readers get the plain text.
 */
export function GhostType({
  lines,
  rejectAt,
  rejectText,
  suggestAt,
  startDelay = 350,
  typeSpeed = [38, 72],
  className = '',
}) {
  const reduce = useReducedMotion()

  // Flatten lines → words → chars, giving every glyph (and every space) a global index.
  const { model, total, fullText } = useMemo(() => {
    let i = 0
    const model = lines.map((line, li) => {
      const words = line.split(' ').map((word, wi, arr) => {
        const chars = [...word].map((ch) => ({ ch, i: i++ }))
        const space = wi < arr.length - 1 ? { ch: ' ', i: i++ } : null
        return { chars, space }
      })
      const lineBreak = li < lines.length - 1 ? { ch: ' ', i: i++ } : null
      return { words, lineBreak }
    })
    return { model, total: i, fullText: lines.join(' ') }
  }, [lines])

  const [typed, setTyped] = useState(reduce ? total : 0)
  const [ghostEnd, setGhostEnd] = useState(0)
  const [reject, setReject] = useState(null) // { text, leaving }
  const [hint, setHint] = useState(null) // 'esc' | 'tab'
  const [accepting, setAccepting] = useState(false)
  const [caret, setCaret] = useState(!reduce)

  useEffect(() => {
    if (reduce) return
    let cancelled = false
    const run = async () => {
      const typeTo = async (end) => {
        for (let n = typed; n < end; n++) {
          if (cancelled) return
          setTyped(n + 1)
          await sleep(jitter(...typeSpeed))
        }
      }
      await sleep(startDelay)
      // 1. type the opening, 2. a suggestion appears and is dismissed
      await typeTo(rejectAt)
      if (cancelled) return
      await sleep(180)
      setReject({ text: rejectText, leaving: false })
      setHint('esc')
      await sleep(1050)
      if (cancelled) return
      setReject({ text: rejectText, leaving: true })
      setHint(null)
      await sleep(380)
      setReject(null)
      // 3. keep typing, 4. offer the rest of the headline as a ghost completion
      for (let n = rejectAt; n < suggestAt; n++) {
        if (cancelled) return
        setTyped(n + 1)
        await sleep(jitter(...typeSpeed))
      }
      await sleep(160)
      setGhostEnd(total)
      setHint('tab')
      await sleep(1150)
      if (cancelled) return
      // 5. accept: ink sweeps across the ghost text
      setHint(null)
      setAccepting(true)
      setTyped(total)
      await sleep((total - suggestAt) * 14 + 1800)
      if (!cancelled) setCaret(false)
    }
    run()
    return () => {
      cancelled = true
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const charClass = (i) => {
    if (i < typed) return 'text-ink'
    if (i < ghostEnd) return 'text-ink/22 animate-[ghost-pulse_1.6s_ease-in-out_infinite]'
    return 'text-transparent'
  }
  const charStyle = (i) => (accepting && i >= suggestAt ? { transitionDelay: `${(i - suggestAt) * 14}ms` } : undefined)

  const Caret = () => (
    <span className="relative inline-block h-[0.82em] w-0 align-[-0.04em]" aria-hidden="true">
      <AnimatePresence>
        {caret && (
          <motion.span
            key="bar"
            className="absolute top-0 left-[0.02em] h-full w-[3px] rounded-full bg-brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 1, 0, 0] }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {reject && (
          <motion.span
            key="reject"
            className="absolute top-[-0.18em] left-[0.08em] whitespace-nowrap text-ink/22"
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={reject.leaving ? { opacity: 0, filter: 'blur(8px)', x: 12 } : { opacity: 1, filter: 'blur(0px)', x: 0 }}
            transition={{ duration: 0.35 }}
          >
            {reject.text}
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {hint === 'esc' && <KeyHint key="esc" k="Esc" label="dismiss" />}
        {hint === 'tab' && <KeyHint key="tab" k="Tab ⇥" label="accept" />}
      </AnimatePresence>
    </span>
  )

  const renderChar = ({ ch, i }) => (
    <span key={i}>
      {caret && typed === i && <Caret />}
      <span className={`transition-colors duration-300 ${charClass(i)}`} style={charStyle(i)}>
        {ch}
      </span>
    </span>
  )

  return (
    <span className={className}>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true">
        {model.map((line, li) => (
          <span key={li} className="sm:block">
            {line.words.map((w, wi) => (
              <span key={wi}>
                <span className="inline-block whitespace-nowrap">{w.chars.map(renderChar)}</span>
                {w.space && renderChar(w.space)}
              </span>
            ))}
            {line.lineBreak && renderChar(line.lineBreak)}
          </span>
        ))}
        {caret && typed >= total && <Caret />}
      </span>
    </span>
  )
}
