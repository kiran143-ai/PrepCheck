import { CircleAlert, CircleCheck, LoaderCircle, Mail, MapPin, Phone } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT, FOOTER_COUNTRY_LINKS, NAV_LINKS } from '../../data/content'
import { useEmailForm } from '../../hooks/useEmailForm'
import { goHome } from '../../lib/nav'
import { useDemo } from '../DemoContext'
import { Modal } from '../ui/Modal'
import { LogoStacked } from '../ui/Logo'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons'
import { Reveal } from '../ui/Reveal'

const SOCIALS = [
  { label: 'PrepCheck on Facebook', href: 'https://facebook.com', Icon: FacebookIcon },
  { label: 'PrepCheck on Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
  { label: 'PrepCheck on LinkedIn', href: 'https://linkedin.com', Icon: LinkedinIcon },
]

const POLICIES = {
  'Refund/Cancellation Policy':
    'You can cancel or reschedule any session up to 24 hours in advance for a full credit. Unused prepaid sessions are refundable within 30 days of purchase.',
  'Privacy Policy':
    'We only collect the information needed to match and support your child. We never sell personal data, and all sessions run on an encrypted platform.',
  'Terms of Service':
    'By booking with PrepCheck you agree to our session, payment and conduct guidelines. Full terms are shared with every enrolment confirmation.',
}

const YEAR = new Date().getFullYear()

// Keep the final "City - PIN" part of the address on one line.
const ADDRESS_SPLIT = CONTACT.address.lastIndexOf(', ')
const ADDRESS_STREET = CONTACT.address.slice(0, ADDRESS_SPLIT)
const ADDRESS_CITY = CONTACT.address.slice(ADDRESS_SPLIT + 2)

const linkCls = 'text-[13.5px] leading-5 text-ink-700/85 transition-colors duration-200 hover:text-brand'

function Subscribe() {
  const id = useId()
  const f = useEmailForm('You’re subscribed — welcome to PrepCheck updates!')
  return (
    <form noValidate onSubmit={f.onSubmit} className="mt-5">
      <label htmlFor={id} className="sr-only">
        Email address for newsletter
      </label>
      <div
        className={`flex h-[46px] items-center rounded-full border bg-white pr-1 pl-4 transition-shadow focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15 ${
          f.error ? 'border-red-400' : 'border-line'
        }`}
      >
        <input
          id={id}
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={f.email}
          onChange={f.onChange}
          aria-invalid={f.error ? 'true' : undefined}
          aria-describedby={`${id}-msg`}
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-subtle"
        />
        <button
          type="submit"
          disabled={f.status === 'submitting'}
          className="inline-flex h-[34px] items-center gap-1.5 rounded-full bg-brand px-4 text-[14px] font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-70"
        >
          {f.status === 'submitting' && <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />}
          Subscribe
        </button>
      </div>
      <p id={`${id}-msg`} aria-live="polite" className="text-[13px]">
        {f.error && (
          <span className="mt-2 flex items-center gap-1.5 text-red-600">
            <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" /> {f.error}
          </span>
        )}
        {f.message && (
          <span className="mt-2 flex items-center gap-1.5 text-emerald-700">
            <CircleCheck className="size-3.5 shrink-0" aria-hidden="true" /> {f.message}
          </span>
        )}
      </p>
    </form>
  )
}

export function Footer() {
  const [policy, setPolicy] = useState(null)
  const { openDemo } = useDemo()
  return (
    <footer id="contact" className="mt-20 border-t border-line lg:mt-20">
      <Reveal className="container-site grid gap-10 pt-14 pb-12 sm:grid-cols-2 lg:grid-cols-[348px_216px_238px_1fr] lg:gap-0">
        <div className="lg:pr-10">
          <LogoStacked className="-ml-1 h-[104px] w-auto" />
          <p className="mt-5 max-w-[300px] text-[14px] leading-[21px] text-muted">
            Connecting students with exceptional tutors for personalized learning experiences that drive academic success.
          </p>
          <ul className="mt-6 flex gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full bg-brand-50 text-brand transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-quick">
          <h2 id="footer-quick" className="text-[15px] font-bold text-ink">Quick Links</h2>
          <ul className="mt-5 space-y-[14px]">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                {l.href ? (
                  <Link to={l.href} onClick={l.href === '/' ? goHome : undefined} className={linkCls}>
                    {l.label}
                  </Link>
                ) : (
                  <span className="text-[13.5px] leading-5 text-ink-700/85">{l.label}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-country">
          <h2 id="footer-country" className="text-[15px] font-bold text-ink">Tutoring by Country</h2>
          <ul className="mt-5 space-y-[14px]">
            {FOOTER_COUNTRY_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.href} className={linkCls}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[15px] font-bold text-ink">Contact Us</h2>
          <address className="mt-4 space-y-3 not-italic">
            <p className="flex max-w-[280px] items-start gap-2.5 text-[13.5px] leading-5 text-ink-700/85">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              <span>
                {ADDRESS_STREET}, <span className="whitespace-nowrap">{ADDRESS_CITY}</span>
              </span>
            </p>
            <a href={CONTACT.phoneHref} className={`flex items-center gap-2.5 ${linkCls}`}>
              <Phone className="size-4 shrink-0 text-brand" aria-hidden="true" /> {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className={`flex items-center gap-2.5 break-all ${linkCls}`}>
              <Mail className="size-4 shrink-0 text-brand" aria-hidden="true" /> {CONTACT.email}
            </a>
          </address>
          <Subscribe />
        </div>
      </Reveal>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-5 text-[13px] text-ink-700/85 sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} PrepCheck. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {Object.keys(POLICIES).map((p) => (
              <li key={p}>
                <button type="button" onClick={() => setPolicy(p)} className="transition-colors hover:text-brand">
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal open={!!policy} onClose={() => setPolicy(null)} title={policy ?? ''}>
        <p className="text-[15px] leading-6 text-muted">{policy && POLICIES[policy]}</p>
        <p className="mt-4 text-[14px] text-muted">
          Questions? Email{' '}
          <a className="font-semibold text-brand hover:underline" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>{' '}
          or{' '}
          <button
            type="button"
            className="font-semibold text-brand hover:underline"
            onClick={() => {
              setPolicy(null)
              openDemo()
            }}
          >
            book a call
          </button>
          .
        </p>
      </Modal>
    </footer>
  )
}
