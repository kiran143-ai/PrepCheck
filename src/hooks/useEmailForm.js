import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(value) {
  const v = value.trim()
  if (!v) return 'Please enter your email address.'
  if (!EMAIL_RE.test(v)) return 'Please enter a valid email address, like name@example.com.'
  return ''
}

/** Simulated network submit — replace with a real API call. */
export const fakeSubmit = (ms = 900) => new Promise((resolve) => setTimeout(resolve, ms))

/** Single-field email form: validation, submitting state and success message. */
export function useEmailForm(successMessage) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success

  const onChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
    if (status === 'success') setStatus('idle')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const err = validateEmail(email)
    if (err) {
      setError(err)
      return
    }
    setStatus('submitting')
    await fakeSubmit()
    setStatus('success')
    setEmail('')
  }

  return { email, error, status, onChange, onSubmit, message: status === 'success' ? successMessage : '' }
}
