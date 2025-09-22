import { FormEvent, useEffect, useState } from 'react'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

function validate(values: { name: string; email: string; message: string }): Errors {
  const errs: Errors = {}
  if (!values.name?.trim()) errs.name = 'Name is required.'
  const email = values.email?.toString().trim() || ''
  if (!email) errs.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email.'
  const msg = values.message?.toString().trim() || ''
  if (!msg) errs.message = 'Message is required.'
  else if (msg.length < 10) errs.message = 'Message should be at least 10 characters.'
  return errs
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      message: String(form.get('message') || ''),
    }
    const errs = validate(payload)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    setMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setMessage('Thanks! I will get back to you shortly.')
      e.currentTarget.reset()
    } catch (err) {
      setStatus('error')
      setMessage('Something went wrong. Please email me directly at kushwaha@uab.edu.')
    }
  }

  return (
    <section id="contact" data-section="contact" className="container-default scroll-mt-20 py-12 sm:py-16">
      <h2 className="section-title">Contact</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 text-lg font-semibold">Get in touch</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Email: <a className="link" href="mailto:kushwaha@uab.edu">kushwaha@uab.edu</a>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            LinkedIn: <a className="link" href="https://linkedin.com/in/aayushkushwaha" target="_blank" rel="noreferrer">linkedin.com/in/aayushkushwaha</a>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            GitHub: <a className="link" href="https://github.com/aayush-kushwaha" target="_blank" rel="noreferrer">github.com/aayush-kushwaha</a>
          </p>
        </div>
        <form className="card" onSubmit={onSubmit} noValidate>
          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="name">Name</label>
              <input id="name" name="name" required aria-invalid={!!errors.name} aria-describedby="name-error" className={`w-full rounded-md border bg-white px-3 py-2 dark:bg-gray-950 ${errors.name ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'}`} />
              {errors.name && <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required aria-invalid={!!errors.email} aria-describedby="email-error" className={`w-full rounded-md border bg-white px-3 py-2 dark:bg-gray-950 ${errors.email ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'}`} />
              {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={4} required aria-invalid={!!errors.message} aria-describedby="message-error" className={`w-full rounded-md border bg-white px-3 py-2 dark:bg-gray-950 ${errors.message ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'}`}></textarea>
              {errors.message && <p id="message-error" className="mt-1 text-xs text-red-600">{errors.message}</p>}
            </div>
            <div className="flex items-center gap-3">
              <button className="btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
              {message && (
                <p className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-gray-600 dark:text-gray-300'}`}>{message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
