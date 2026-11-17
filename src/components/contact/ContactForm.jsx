import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck, LoaderCircle, RotateCcw, Send } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { BOARDS, COURSES, COURSE_CATEGORIES } from '../../data/courses'
import { fakeSubmit, validateEmail } from '../../hooks/useEmailForm'
import { inputCls } from '../../lib/formStyles'
import { DEMO_SECTION_ID, useDemo } from '../DemoContext'
import { Button } from '../ui/Button'
import { Field, Select } from '../ui/FormControls'

const GRADES = ['Grade 1–3', 'Grade 4–6', 'Grade 7–8', 'Grade 9–10', 'Grade 11–12']
const BOARD_OPTIONS = [...BOARDS.map((b) => b.title), 'Other']
const PHONE_RE = /^\+\d[\d\s()-]{6,18}$/
const MAX_MSG = 600
const EMPTY = { parent: '', phone: '', email: '', child: '', grade: '', category: '', course: '', board: '', message: '', consent: false }

function validate(v) {
  const e = {}
  if (v.parent.trim().length < 2) e.parent = 'Please enter your full name.'
  if (!v.phone.trim()) e.phone = 'Please enter a contact number.'
  else if (!PHONE_RE.test(v.phone.trim())) e.phone = 'Include your country code, e.g. +91 98765 43210.'
  const em = validateEmail(v.email)
  if (em) e.email = em
  if (v.child.trim().length < 2) e.child = 'Please enter your child’s name.'
  if (!v.grade) e.grade = 'Please choose a grade.'
  if (!v.category) e.category = 'Please choose a course category.'
  else if (!v.course) e.course = 'Please choose a course.'
  if (!v.board) e.board = 'Please choose a board.'
  if (!v.consent) e.consent = 'Please accept to continue.'
  return e
}

/** Contact form — the page's inline "book a demo" target (id="get-started"). */
export function ContactForm() {
  const uid = useId()
  const { request } = useDemo()
  const [v, setV] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const firstRef = useRef(null)

  // "Book a Demo" CTAs elsewhere: pre-select the matching course, then focus.
  const [applied, setApplied] = useState(0)
  if (request.version !== applied) {
    setApplied(request.version)
    const match = COURSES.find((c) => c.formSubject === request.prefill.subject)
    setStatus('idle')
    if (match) setV((x) => ({ ...x, category: match.category, course: match.id }))
  }
  useEffect(() => {
    if (!request.version) return
    const t = setTimeout(() => firstRef.current?.focus({ preventScroll: true }), 450)
    return () => clearTimeout(t)
  }, [request.version])

  const set = (k) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setV((x) => ({ ...x, [k]: value, ...(k === 'category' && { course: '' }) }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }
  const courses = COURSES.filter((c) => c.category === v.category)

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(v)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus()
      return
    }
    setStatus('submitting')
    await fakeSubmit(1100)
    setStatus('success')
  }

  const reset = () => {
    setV(EMPTY)
    setErrors({})
    setStatus('idle')
    setTimeout(() => firstRef.current?.focus(), 50)
  }

  const a11y = (k) => ({
    id: `${uid}-${k}`,
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `${uid}-${k}-error` : undefined,
    'aria-required': 'true',
  })
  const courseName = COURSES.find((c) => c.id === v.course)?.title

  return (
    <div
      id={DEMO_SECTION_ID}
      className="relative scroll-mt-28 overflow-hidden rounded-3xl bg-white p-5 shadow-[0_24px_60px_-34px_rgb(20_26_60_/_0.5)] ring-1 ring-line/70 sm:p-8"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -top-20 -right-16 size-48 rounded-full bg-brand-50/70" />
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="ok"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex min-h-[520px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-full bg-brand-50 text-brand"
            >
              <CircleCheck className="size-8" aria-hidden="true" />
            </motion.span>
            <h2 className="heading-lg mt-5 text-[26px] text-ink">Message sent!</h2>
            <p className="mt-2 max-w-[400px] text-[15px] leading-6 text-muted">
              Thanks, {v.parent.trim().split(' ')[0]}. We’ve received your enquiry about{' '}
              <strong className="text-ink">{courseName}</strong> for {v.child.trim().split(' ')[0]} and will reply to{' '}
              <strong className="text-ink">{v.email}</strong> within 24 hours.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] font-semibold text-brand transition-colors hover:bg-brand-50"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" /> Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} aria-labelledby={`${uid}-title`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-brand">
                <Send className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 id={`${uid}-title`} className="text-[22px] font-bold text-ink">
                  Send Us a Message
                </h2>
                <p className="text-[14px] text-muted">We typically respond within 24 hours</p>
              </div>
            </div>
            <p className="mt-4 text-[12.5px] text-subtle">
              Fields marked <span className="text-red-600">*</span> are required.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id={`${uid}-parent`} label={<>Parent’s Full Name <span className="text-red-600">*</span></>} error={errors.parent} className="sm:col-span-2">
                <input ref={firstRef} {...a11y('parent')} autoComplete="name" className={inputCls(errors.parent)} value={v.parent} onChange={set('parent')} placeholder="Full name" />
              </Field>
              <Field id={`${uid}-phone`} label={<>Contact Number (with country code) <span className="text-red-600">*</span></>} error={errors.phone}>
                <input {...a11y('phone')} type="tel" autoComplete="tel" className={inputCls(errors.phone)} value={v.phone} onChange={set('phone')} placeholder="+91 98765 43210" />
              </Field>
              <Field id={`${uid}-email`} label={<>Parent’s Email Address <span className="text-red-600">*</span></>} error={errors.email}>
                <input {...a11y('email')} type="email" autoComplete="email" className={inputCls(errors.email)} value={v.email} onChange={set('email')} placeholder="parent@example.com" />
              </Field>
              <Field id={`${uid}-child`} label={<>Child’s Name <span className="text-red-600">*</span></>} error={errors.child}>
                <input {...a11y('child')} className={inputCls(errors.child)} value={v.child} onChange={set('child')} placeholder="Child’s full name" />
              </Field>
              <Field id={`${uid}-grade`} label={<>Child’s Grade <span className="text-red-600">*</span></>} error={errors.grade}>
                <Select {...a11y('grade')} className={inputCls(errors.grade)} value={v.grade} onChange={set('grade')}>
                  <option value="">Select grade</option>
                  {GRADES.map((g) => <option key={g}>{g}</option>)}
                </Select>
              </Field>
              <Field id={`${uid}-category`} label={<>Course Category <span className="text-red-600">*</span></>} error={errors.category}>
                <Select {...a11y('category')} className={inputCls(errors.category)} value={v.category} onChange={set('category')}>
                  <option value="">Select course category</option>
                  {COURSE_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </Select>
              </Field>
              <Field id={`${uid}-course`} label={<>Subject / Course <span className="text-red-600">*</span></>} error={errors.course}>
                <Select {...a11y('course')} className={`${inputCls(errors.course)} disabled:cursor-not-allowed disabled:bg-panel disabled:text-subtle`} value={v.course} onChange={set('course')} disabled={!v.category}>
                  <option value="">{v.category ? 'Select course' : 'Select category first'}</option>
                  {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </Select>
              </Field>
              <Field id={`${uid}-board`} label={<>Board <span className="text-red-600">*</span></>} error={errors.board} className="sm:col-span-2">
                <Select {...a11y('board')} className={inputCls(errors.board)} value={v.board} onChange={set('board')}>
                  <option value="">Select board</option>
                  {BOARD_OPTIONS.map((b) => <option key={b}>{b}</option>)}
                </Select>
              </Field>
              <Field id={`${uid}-message`} label="Message" optional className="sm:col-span-2">
                <textarea
                  id={`${uid}-message`}
                  rows={3}
                  maxLength={MAX_MSG}
                  value={v.message}
                  onChange={set('message')}
                  aria-describedby={`${uid}-count`}
                  placeholder="Tell us about your child’s goals or any questions you have"
                  className={`${inputCls()} h-auto resize-y py-3 leading-[21px]`}
                />
                <p id={`${uid}-count`} className="mt-1 text-right text-[12px] text-subtle">
                  {v.message.length}/{MAX_MSG}
                </p>
              </Field>
            </div>

            <div className="mt-3">
              <label className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-5 text-muted">
                <input
                  type="checkbox"
                  id={`${uid}-consent`}
                  checked={v.consent}
                  onChange={set('consent')}
                  aria-invalid={errors.consent ? 'true' : undefined}
                  aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
                  className="mt-0.5 size-4 shrink-0 cursor-pointer accent-brand"
                />
                <span>
                  I agree to the Terms of Service and Privacy Policy. I consent to be contacted about tutoring services.{' '}
                  <span className="text-red-600">*</span>
                </span>
              </label>
              {errors.consent && (
                <p id={`${uid}-consent-error`} className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-red-600">
                  <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" /> {errors.consent}
                </p>
              )}
            </div>

            <Button type="submit" className="mt-6 h-12 w-full text-[15px]" disabled={status === 'submitting'} arrow={status !== 'submitting'}>
              {status === 'submitting' ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden="true" /> Send Message
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
