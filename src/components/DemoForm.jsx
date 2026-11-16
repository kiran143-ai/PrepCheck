import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle, RotateCcw } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { SUBJECTS } from '../data/content'
import { fakeSubmit, validateEmail } from '../hooks/useEmailForm'
import { useDemo } from './DemoContext'
import { Button } from './ui/Button'
import { LogoMark } from './ui/Logo'

const GRADES = ['Grade 1–3', 'Grade 4–6', 'Grade 7–8', 'Grade 9–10', 'Grade 11–12']
const SUBJECT_OPTIONS = [...SUBJECTS.map((s) => s.name), 'SAT Preparation']
const CURRICULA = ['Common Core (USA)', 'NAPLAN (Australia)', 'IGCSE / GCSE (UK)', 'SAT (College Board)', 'Other']
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/
const EMPTY = { name: '', email: '', phone: '', grade: '', subject: '', curriculum: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  const em = validateEmail(v.email)
  if (em) e.email = em
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.'
  if (!v.grade) e.grade = 'Please choose a grade.'
  if (!v.subject) e.subject = 'Please choose a subject.'
  return e
}

function Field({ id, label, error, optional, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label} {optional && <span className="font-normal text-subtle">(optional)</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 overflow-hidden pt-1.5 text-[12.5px] text-red-600"
          >
            <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = (err, highlight) =>
  `h-11 w-full rounded-xl border bg-white px-3.5 text-[14.5px] text-ink placeholder:text-subtle/80 outline-none transition-all duration-300 focus:border-brand focus:ring-4 focus:ring-brand/15 ${
    err ? 'border-red-400' : highlight ? 'border-brand ring-4 ring-brand/15' : 'border-line hover:border-ink/25'
  }`

function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select {...props} className={`${className} cursor-pointer appearance-none pr-9`}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
    </div>
  )
}

/** Inline "book a free demo" form. Lives inside the final CTA card — no modal. */
export function DemoForm() {
  const uid = useId()
  const { request } = useDemo()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const [highlight, setHighlight] = useState([])
  const nameRef = useRef(null)

  // A CTA elsewhere on the page asked for the form: apply its prefill (during render)…
  const [appliedVersion, setAppliedVersion] = useState(0)
  if (request.version !== appliedVersion) {
    setAppliedVersion(request.version)
    const { subject, curriculum } = request.prefill
    setStatus('idle')
    setValues((v) => ({ ...v, ...(subject && { subject }), ...(curriculum && { curriculum }) }))
    setHighlight(Object.keys(request.prefill))
  }

  // …then move focus into the form once the scroll has started.
  useEffect(() => {
    if (!request.version) return
    const t1 = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 450)
    const t2 = setTimeout(() => setHighlight([]), 1800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [request.version])

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    const firstKey = Object.keys(errs)[0]
    if (firstKey) {
      document.getElementById(`${uid}-${firstKey}`)?.focus()
      return
    }
    setStatus('submitting')
    await fakeSubmit(1100)
    setStatus('success')
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
    setTimeout(() => nameRef.current?.focus(), 50)
  }

  const a11y = (k) => ({
    id: `${uid}-${k}`,
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `${uid}-${k}-error` : undefined,
  })

  return (
    <div className="relative rounded-[20px] bg-white p-5 text-left text-ink shadow-[0_30px_60px_-24px_rgb(10_18_80_/_0.55)] sm:p-7">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center py-6 text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-full bg-brand-50 text-brand"
            >
              <CircleCheck className="size-8" aria-hidden="true" />
            </motion.span>
            <h3 className="heading-lg mt-5 text-[24px]">You’re all set!</h3>
            <p className="mt-2 max-w-[340px] text-[14.5px] leading-6 text-muted">
              Thanks, {values.name.trim().split(' ')[0]}! We’ve sent a confirmation to{' '}
              <strong className="text-ink">{values.email}</strong>. A PrepCheck counselor will call you within one working day to
              schedule your child’s free {values.subject} demo.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] font-semibold text-brand transition-colors hover:bg-brand-50"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" /> Book for another child
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-labelledby={`${uid}-title`}
          >
            <div className="flex items-start justify-between gap-3">
              <LogoMark className="h-11 w-auto shrink-0" />
              <div className="flex-1">
                <h3 id={`${uid}-title`} className="text-[20px] font-bold text-ink">
                  Book a Free Demo Class
                </h3>
                <p className="mt-1 text-[13.5px] text-muted">Takes less than a minute. No payment needed.</p>
              </div>
              <span className="hidden shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-700 sm:inline-block">
                100% Free
              </span>
            </div>

            <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
              <Field id={`${uid}-name`} label="Parent’s full name" error={errors.name} className="sm:col-span-2">
                <input ref={nameRef} {...a11y('name')} autoComplete="name" className={inputCls(errors.name)} value={values.name} onChange={set('name')} placeholder="Jane Doe" />
              </Field>
              <Field id={`${uid}-email`} label="Email" error={errors.email}>
                <input {...a11y('email')} type="email" autoComplete="email" className={inputCls(errors.email)} value={values.email} onChange={set('email')} placeholder="name@example.com" />
              </Field>
              <Field id={`${uid}-phone`} label="Phone" optional error={errors.phone}>
                <input {...a11y('phone')} type="tel" autoComplete="tel" className={inputCls(errors.phone)} value={values.phone} onChange={set('phone')} placeholder="+91 98765 43210" />
              </Field>
              <Field id={`${uid}-grade`} label="Child’s grade" error={errors.grade}>
                <Select {...a11y('grade')} className={inputCls(errors.grade)} value={values.grade} onChange={set('grade')}>
                  <option value="">Select grade</option>
                  {GRADES.map((g) => <option key={g}>{g}</option>)}
                </Select>
              </Field>
              <Field id={`${uid}-subject`} label="Subject" error={errors.subject}>
                <Select {...a11y('subject')} className={inputCls(errors.subject, highlight.includes('subject'))} value={values.subject} onChange={set('subject')}>
                  <option value="">Select subject</option>
                  {SUBJECT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </Select>
              </Field>
              <Field id={`${uid}-curriculum`} label="Curriculum" optional className="sm:col-span-2">
                <Select {...a11y('curriculum')} className={inputCls(false, highlight.includes('curriculum'))} value={values.curriculum} onChange={set('curriculum')}>
                  <option value="">Select curriculum</option>
                  {CURRICULA.map((c) => <option key={c}>{c}</option>)}
                </Select>
              </Field>
            </div>

            <Button type="submit" className="mt-5 h-12 w-full text-[15px]" disabled={status === 'submitting'} arrow={status !== 'submitting'}>
              {status === 'submitting' ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Booking your demo…
                </>
              ) : (
                'Get Started Today'
              )}
            </Button>
            <p className="mt-3 text-center text-[12px] text-subtle">We’ll never share your details. Unsubscribe any time.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
