import { ChartColumn, CircleCheck, CircleX, Cookie, Settings, ShieldCheck, Target, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BROWSER_STEPS, COOKIE_TYPES } from '../../data/legal'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { ContactCard, LegalLayout } from './LegalLayout'

const ICONS = { ChartColumn, Settings, ShieldCheck, Target }
const TONES = {
  green: { bar: 'bg-emerald-500', icon: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  violet: { bar: 'bg-[#7c5cf0]', icon: 'bg-[#7c5cf0]', badge: 'bg-violet-50 text-violet-700 ring-violet-200' },
  blue: { bar: 'bg-brand', icon: 'bg-brand', badge: 'bg-brand-50 text-brand ring-brand/20' },
  orange: { bar: 'bg-orange-500', icon: 'bg-orange-500', badge: 'bg-orange-50 text-orange-700 ring-orange-200' },
}

const TOC = [
  { id: 'what-are-cookies', title: 'What Are Cookies?' },
  { id: 'types', title: 'Types of Cookies We Use' },
  { id: 'manage', title: 'How to Manage Cookies' },
]

const card = 'scroll-mt-24 rounded-2xl bg-white p-6 shadow-[0_14px_40px_-30px_rgb(20_26_60_/_0.5)] ring-1 ring-line/70 sm:p-7'

export function CookiePolicyPage() {
  return (
    <LegalLayout
      slug="cookie-policy"
      toc={TOC}
      contact={
        <ContactCard
          title="Questions About Our Cookie Usage?"
          text="We’re transparent about our data practices. If you have any questions about how we use cookies, please reach out to us."
        />
      }
    >
      <Reveal as="section" id="what-are-cookies" aria-labelledby="wac-h" className={card}>
        <h2 id="wac-h" className="flex items-center gap-3 text-[20px] font-bold text-ink">
          <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand">
            <Cookie className="size-5" aria-hidden="true" />
          </span>
          What Are Cookies?
        </h2>
        <p className="mt-4 text-[15px] leading-[26px] text-muted">
          Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a
          better experience by remembering your preferences, keeping you logged in, and understanding how you use our platform.
        </p>
        <p className="mt-3 text-[15px] leading-[26px] text-muted">
          This Cookie Policy explains what cookies are, how we use them, what types of cookies we use, and how you can control your
          cookie preferences. By using PrepCheck, you consent to the use of cookies as described in this policy. See also our{' '}
          <Link to="/privacy-policy" className="font-semibold text-brand hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </Reveal>

      <section id="types" aria-labelledby="types-h" className="mt-10 scroll-mt-24">
        <h2 id="types-h" className="heading-lg text-center text-[clamp(1.5rem,3vw,1.875rem)] text-ink">
          Types of Cookies We Use
        </h2>
        <RevealGroup as="ul" className="mt-6 grid gap-5 md:grid-cols-2" stagger={0.08}>
          {COOKIE_TYPES.map((c) => {
            const Icon = ICONS[c.icon]
            const t = TONES[c.tone]
            const required = c.status === 'Required'
            return (
              <RevealItem
                as="li"
                key={c.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-[0_14px_40px_-30px_rgb(20_26_60_/_0.5)] ring-1 ring-line/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_-28px_rgb(56_79_233_/_0.45)]"
              >
                <span className={`absolute inset-x-0 top-0 h-1 ${t.bar}`} aria-hidden="true" />
                <div className="flex items-start justify-between">
                  <span className={`grid size-11 place-items-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110 ${t.icon}`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11.5px] font-bold ring-1 ${t.badge}`}>{c.status}</span>
                </div>
                <h3 className="mt-4 text-[17px] font-bold text-ink">{c.title}</h3>
                <p className="mt-1 text-[14px] leading-[21px] text-muted">{c.text}</p>
                <p className="mt-4 text-[12.5px] font-bold tracking-[0.04em] text-ink uppercase">Examples</p>
                <ul className="mt-2 mb-5 space-y-1.5">
                  {c.examples.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-[13.5px] leading-5 text-muted">
                      <CircleCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-500" aria-hidden="true" /> {e}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto flex items-center gap-2 border-t border-line pt-3 text-[13px] text-subtle">
                  {required ? <CircleX className="size-3.5" aria-hidden="true" /> : <Settings className="size-3.5 text-brand" aria-hidden="true" />}
                  {c.control}
                </p>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </section>

      <Reveal as="section" id="manage" aria-labelledby="manage-h" className={`${card} mt-10`}>
        <h2 id="manage-h" className="flex items-center gap-3 text-[20px] font-bold text-ink">
          <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand">
            <Settings className="size-5" aria-hidden="true" />
          </span>
          How to Manage Cookies
        </h2>
        <p className="mt-4 text-[15px] leading-[26px] text-muted">
          You have the right to decide whether to accept or reject cookies. Most web browsers automatically accept cookies, but you
          can usually modify your browser settings to decline cookies if you prefer.
        </p>
        <div className="mt-5 rounded-xl bg-panel p-5">
          <h3 className="text-[14.5px] font-bold text-ink">Browser-specific instructions</h3>
          <ol className="mt-3 space-y-3">
            {BROWSER_STEPS.map((b, i) => (
              <li key={b.browser} className="flex items-start gap-3 text-[14px] leading-[22px] text-muted">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-[12px] font-bold text-brand ring-1 ring-line">{i + 1}</span>
                <span>
                  <strong className="font-semibold text-ink">{b.browser}:</strong>{' '}
                  {b.path.map((p, j) => (
                    <span key={p}>
                      {j > 0 && <span className="mx-1 text-brand" aria-hidden="true">→</span>}
                      {j > 0 && <span className="sr-only">, then </span>}
                      {p}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div role="note" className="mt-5 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="text-[14px] leading-[22px] text-amber-900">
            <strong className="font-semibold">Important note:</strong> disabling cookies may affect the functionality of our platform.
            Some features may not work properly if essential cookies are blocked.
          </p>
        </div>
      </Reveal>
    </LegalLayout>
  )
}
