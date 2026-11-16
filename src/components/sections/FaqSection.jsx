import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle, Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { FAQS } from '../../data/content'
import { useEmailForm } from '../../hooks/useEmailForm'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

function FaqItem({ item, open, onToggle, id }) {
  return (
    <div
      className={`rounded-[14px] border bg-white transition-all duration-300 ${
        open ? 'border-[#c9cdf8] shadow-[0_12px_32px_-14px_rgb(56_79_233_/_0.35)]' : 'border-line hover:border-brand/30'
      }`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex min-h-[62px] w-full items-center justify-between gap-4 rounded-[14px] px-5 py-3 text-left text-[15px] font-semibold text-ink sm:text-[16px]"
        >
          {item.q}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className={`grid size-7 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
              open ? 'bg-brand text-white' : 'bg-brand-50 text-brand'
            }`}
            aria-hidden="true"
          >
            <Plus className="size-3.5" strokeWidth={2.4} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[14px] leading-[21px] text-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function QuestionForm() {
  const id = useId()
  const f = useEmailForm('Thanks! Our support team will email you within one working day.')
  return (
    <div className="rounded-2xl bg-panel p-6">
      <h3 className="text-[19px] font-bold  text-ink">Still have a question?</h3>
      <p className="mt-2 text-[14px] leading-[21px] text-muted">
        Can’t find the answer you’re looking for? Send us your email and our support team will get back to you.
      </p>
      <form noValidate onSubmit={f.onSubmit} className="mt-4">
        <label htmlFor={id} className="sr-only">
          Your email address
        </label>
        <div
          className={`flex h-12 items-center rounded-full bg-white pr-1.5 pl-4 ring-1 transition-shadow focus-within:ring-2 focus-within:ring-brand ${
            f.error ? 'ring-red-400' : 'ring-transparent'
          }`}
        >
          <input
            id={id}
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={f.email}
            onChange={f.onChange}
            aria-invalid={f.error ? 'true' : undefined}
            aria-describedby={`${id}-msg`}
            className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-subtle"
          />
          <button
            type="submit"
            disabled={f.status === 'submitting'}
            aria-label="Send question request"
            className="group grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white transition-all hover:scale-105 hover:bg-brand-600 active:scale-95 disabled:opacity-70"
          >
            {f.status === 'submitting' ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            )}
          </button>
        </div>
        <p id={`${id}-msg`} aria-live="polite" className="min-h-0 text-[13px]">
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
    </div>
  )
}

export function FaqSection() {
  const [open, setOpen] = useState(3)
  const baseId = useId()
  return (
    <section id="faqs" aria-labelledby="faq-title" className="container-site pt-20 lg:pt-[109px]">
      <div className="grid gap-10 lg:grid-cols-[413px_1fr] lg:gap-14">
        <div className="flex flex-col justify-between gap-10">
          <Reveal>
            <span className="inline-flex h-6 items-center rounded-full bg-brand-50 px-3 text-[12px] font-semibold text-brand">FAQs</span>
            <h2 id="faq-title" className="heading-lg mt-4 text-[clamp(1.75rem,3.8vw,2.375rem)] leading-[1.12] text-ink">
              Frequently Asked
              <br />
              Questions?
            </h2>
            <p className="mt-4 max-w-[360px] text-[15px] leading-[22px] text-muted">
              Find answers to common questions about our tutoring platform.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="hidden lg:block">
            <QuestionForm />
          </Reveal>
        </div>
        <RevealGroup className="flex flex-col gap-3" stagger={0.05}>
          {FAQS.map((item, i) => (
            <RevealItem key={item.q}>
              <FaqItem item={item} id={`${baseId}-${i}`} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="lg:hidden">
          <QuestionForm />
        </Reveal>
      </div>
    </section>
  )
}
