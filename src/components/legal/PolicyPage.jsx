import {
  Archive,
  Baby,
  BadgeCheck,
  BookOpen,
  CalendarCheck,
  ClipboardCheck,
  Clock,
  Cookie,
  CreditCard,
  Database,
  FileClock,
  GraduationCap,
  Info,
  Lock,
  MessageSquare,
  Repeat,
  Scale,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react'
import { LEGAL_PAGES } from '../../data/legal'
import { Reveal } from '../ui/Reveal'
import { Blocks, ContactCard, LegalLayout, Rich } from './LegalLayout'

const ICONS = {
  Archive, Baby, BadgeCheck, BookOpen, CalendarCheck, ClipboardCheck, Clock, Cookie, CreditCard, Database, FileClock,
  GraduationCap, Info, Lock, MessageSquare, Repeat, Scale, Settings, Share2, ShieldCheck, Sparkles, UserCheck,
}

/** Text-based policy (refund, privacy, terms): numbered section cards. */
export function PolicyPage({ slug }) {
  const page = LEGAL_PAGES[slug]
  const toc = page.sections.map((s) => ({ id: s.id, title: s.title }))
  return (
    <LegalLayout
      slug={slug}
      toc={toc}
      contact={page.postal ? <ContactCard title="Questions About Our Privacy Practices?" text="If you have any questions or concerns about how we handle your personal information, please don’t hesitate to reach out. We are committed to addressing your concerns promptly and transparently." postal={page.postal} /> : undefined}
    >
      {page.intro && (
        <Reveal className="mb-6 space-y-3 rounded-2xl bg-white p-6 shadow-[0_14px_40px_-30px_rgb(20_26_60_/_0.5)] ring-1 ring-line/70 sm:p-7">
          {page.intro.map((p) => (
            <p key={p} className="text-[15px] leading-[26px] text-muted"><Rich text={p} /></p>
          ))}
        </Reveal>
      )}
      <div className="space-y-5">
        {page.sections.map((s, i) => {
          const Icon = ICONS[s.icon] ?? Info
          return (
            <Reveal
              as="section"
              key={s.id}
              aria-labelledby={`${s.id}-h`}
              className="group scroll-mt-24 rounded-2xl bg-white p-6 shadow-[0_14px_40px_-30px_rgb(20_26_60_/_0.5)] ring-1 ring-line/70 transition-shadow duration-300 hover:shadow-[0_20px_48px_-30px_rgb(56_79_233_/_0.45)] sm:p-7"
              id={s.id}
              amount={0.05}
            >
              <h2 id={`${s.id}-h`} className="flex items-center gap-3 text-[19px] font-bold text-ink sm:text-[20px]">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span>
                  <span className="mr-1.5 text-brand">{i + 1}.</span>
                  {s.title}
                </span>
              </h2>
              <div className="mt-4 space-y-4">
                <Blocks blocks={s.blocks} />
              </div>
            </Reveal>
          )
        })}
      </div>
      {page.closing && (
        <p className="mt-8 border-t border-line pt-6 text-center text-[14.5px] leading-[24px] text-muted">
          <Rich text={page.closing} />
        </p>
      )}
    </LegalLayout>
  )
}
