import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, ChevronDown, FileText, Mail, Phone } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT } from '../../data/content'
import { LEGAL_ORDER, LEGAL_PAGES } from '../../data/legal'
import { usePageTitle } from '../../hooks/usePageTitle'
import { Reveal } from '../ui/Reveal'

const EASE = [0.22, 1, 0.36, 1]

/** Renders **bold** segments inside plain strings. */
export function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

export function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.p) return <p key={i} className="text-[15px] leading-[26px] text-muted"><Rich text={b.p} /></p>
    if (b.h3) return <h3 key={i} className="pt-2 text-[16px] font-bold text-ink">{b.h3}</h3>
    if (b.list)
      return (
        <ul key={i} className="space-y-2.5">
          {b.list.map((li) => (
            <li key={li} className="flex gap-3 text-[15px] leading-[24px] text-muted">
              <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              <span><Rich text={li} /></span>
            </li>
          ))}
        </ul>
      )
    if (b.callout)
      return (
        <div key={i} className="rounded-xl border border-brand/15 bg-brand-50/60 p-4 sm:p-5">
          <h3 className="text-[15.5px] font-bold text-ink">{b.callout.title}</h3>
          <p className="mt-1.5 text-[14.5px] leading-[24px] text-muted"><Rich text={b.callout.text} /></p>
        </div>
      )
    if (b.link)
      return (
        <Link key={i} to={b.link.to} className="group inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-brand hover:text-brand-700">
          {b.link.label} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )
    return null
  })
}

/** Tracks which section heading is currently near the top of the viewport. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-90px 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

function jump(e, id) {
  e.preventDefault()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

function Toc({ toc }) {
  const ids = toc.map((t) => t.id)
  const [idsMemo] = useState(ids)
  const active = useActiveSection(idsMemo)
  const link = (t, i) => (
    <a
      href={`#${t.id}`}
      onClick={(e) => jump(e, t.id)}
      aria-current={active === t.id ? 'location' : undefined}
      className={`flex gap-2.5 rounded-lg px-3 py-2 text-[13.5px] leading-5 transition-colors ${
        active === t.id ? 'bg-brand-50 font-semibold text-brand' : 'text-muted hover:bg-panel hover:text-ink'
      }`}
    >
      <span className="w-4 shrink-0 text-right tabular-nums opacity-70">{i + 1}.</span>
      {t.title}
    </a>
  )
  return (
    <>
      {/* desktop: sticky sidebar */}
      <nav aria-label="On this page" className="sticky top-24 hidden lg:block">
        <p className="px-3 text-[12px] font-bold tracking-[0.08em] text-subtle uppercase">On this page</p>
        <ol className="mt-3 space-y-0.5">{toc.map((t, i) => <li key={t.id}>{link(t, i)}</li>)}</ol>
      </nav>
      {/* mobile: collapsible */}
      <details className="group rounded-2xl bg-white ring-1 ring-line lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[14.5px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <ol className="space-y-0.5 px-2 pb-3">{toc.map((t, i) => <li key={t.id}>{link(t, i)}</li>)}</ol>
      </details>
    </>
  )
}

function Hero({ page }) {
  const reduce = useReducedMotion()
  return (
    <section aria-labelledby="legal-title" className="relative mt-[70px] overflow-hidden bg-[linear-gradient(120deg,#2f45e0_0%,#384fe9_45%,#5b4fe0_100%)] text-white">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full">
        {[90, 180, 270, 360, 450].map((r) => (
          <circle key={r} cx="85%" cy="110%" r={r} fill="none" stroke="rgb(255 255 255 / 0.1)" />
        ))}
      </svg>
      {!reduce &&
        [12, 28, 70, 88].map((l, i) => (
          <motion.span
            key={l}
            aria-hidden="true"
            className="absolute bottom-6 size-3 rounded-full bg-white/20"
            style={{ left: `${l}%` }}
            animate={{ y: [0, -40 - i * 10, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
          />
        ))}
      <div className="container-site relative py-14 text-center lg:py-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-[12.5px] font-semibold ring-1 ring-white/25 backdrop-blur"
        >
          <FileText className="size-3.5" aria-hidden="true" /> {page.badge}
        </motion.span>
        <motion.h1
          id="legal-title"
          className="heading-xl mt-5 text-[clamp(2.125rem,4.6vw,3.25rem)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        >
          {page.title}
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-[620px] text-[16px] leading-[26px] text-white/85"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
        >
          {page.subtitle}
        </motion.p>
        <p className="mt-4 text-[13px] text-white/70">
          Last updated: <time>{page.updated}</time>
        </p>
      </div>
    </section>
  )
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand to-[#6d5ef0]" />
}

export function ContactCard({ title = 'Questions About This Policy?', text, postal }) {
  return (
    <Reveal className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#f3f5ff,#ffffff)] p-6 text-center ring-1 ring-line sm:p-8">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand text-white shadow-brand">
        <Mail className="size-5" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-[20px] font-bold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-[460px] text-[14.5px] leading-[23px] text-muted">
        {text ?? 'We’re here to help. Reach out to PrepCheck Academy with any questions about this policy.'}
      </p>
      {postal && (
        <address className="mt-4 text-[14px] leading-[22px] text-ink-700 not-italic">
          {postal.map((l) => <span key={l} className="block">{l}</span>)}
        </address>
      )}
      <p className="mt-3 text-[13.5px] text-subtle">Support hours: Monday to Sunday, 24/7 (IST)</p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <a href={`mailto:${CONTACT.email}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-[14.5px] font-semibold text-white shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-600">
          <Mail className="size-4" aria-hidden="true" /> {CONTACT.email}
        </a>
        <a href={CONTACT.phoneHref} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[14.5px] font-semibold text-brand ring-1 ring-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-50">
          <Phone className="size-4" aria-hidden="true" /> Call {CONTACT.phone}
        </a>
      </div>
    </Reveal>
  )
}

function Related({ current }) {
  const others = LEGAL_ORDER.filter((s) => s !== current).map((s) => LEGAL_PAGES[s])
  return (
    <nav aria-label="Related policies" className="mt-10">
      <p className="text-[12px] font-bold tracking-[0.08em] text-subtle uppercase">Related policies</p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        {others.map((o) => (
          <li key={o.slug}>
            <Link
              to={`/${o.slug}`}
              className="group flex h-full items-center justify-between gap-2 rounded-xl bg-white px-4 py-3.5 text-[14px] font-semibold text-ink ring-1 ring-line transition-all hover:-translate-y-0.5 hover:text-brand hover:ring-brand/30"
            >
              {o.title}
              <ArrowRight className="size-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * Shared shell for legal pages. `toc` = [{ id, title }] for the sidebar;
 * `children` = the page body (section cards etc.).
 */
export function LegalLayout({ slug, toc, children, contact }) {
  const page = LEGAL_PAGES[slug]
  usePageTitle(`${page.title} — PrepCheck`)
  return (
    <>
      <ReadingProgress />
      <Hero page={page} />
      <div className="bg-[linear-gradient(180deg,#f7f8fd,#ffffff_40%)]">
        <div className="container-site grid gap-8 py-12 lg:grid-cols-[240px_1fr] lg:gap-12 lg:py-16">
          <aside>{toc?.length > 0 && <Toc toc={toc} />}</aside>
          <div className="min-w-0 max-w-[780px]">
            {page.draft && (
              <p role="note" className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-[13.5px] text-amber-900">
                <strong>Draft:</strong> these terms are a placeholder pending PrepCheck’s approved legal text.
              </p>
            )}
            {children}
            <div className="mt-10">{contact ?? <ContactCard />}</div>
            <Related current={slug} />
          </div>
        </div>
      </div>
    </>
  )
}
