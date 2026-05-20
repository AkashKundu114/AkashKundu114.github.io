import { useEffect, useState } from 'react'
import { useRevealChildren } from '../hooks/useScrollReveal'

/*
  SETUP: Replace the FORM_ENDPOINT below with your own Formspree URL.
  1. Go to https://formspree.io and sign up (free tier = 50 submissions/month).
  2. Create a new form → copy the endpoint URL.
  3. Paste it below, e.g. 'https://formspree.io/f/xyzabcde'
*/
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const contactInfo = [
  { label: 'Email',    value: 'akashkundu7487@gmail.com', href: 'mailto:akashkundu7487@gmail.com' },
  { label: 'Phone',    value: '+91 9064349004',            href: 'tel:+919064349004' },
  { label: 'Location', value: 'Kolkata, West Bengal, India' },
  { label: 'Open To',  value: 'Internships · Data Analytics · ML Projects' },
]

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()

  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle') // idle | sending | success | error
  const [touched, setTouched] = useState({})

  const validate = (f) => {
    const e = {}
    if (!f.name.trim() || f.name.trim().length < 2)   e.name    = 'Enter your name (min 2 chars)'
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email address'
    if (!f.message.trim() || f.message.trim().length < 10)               e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (touched[name]) setErrors(validate({ ...form, [name]: value }))
  }

  const handleBlur = (e) => {
    setTouched(t => ({ ...t, [e.target.name]: true }))
    setErrors(validate(form))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setTouched({})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section" style={{ paddingTop: '9rem' }} ref={ref}>
      <span className="section-num">06</span>
      <div className="container">

        <div className="label reveal">Get in Touch</div>
        <h2 className="reveal" style={{ marginBottom: '1rem' }}>
          Let's<br />
          <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>work together.</em>
        </h2>
        <p className="reveal" style={{ marginBottom: '4rem', maxWidth: '50ch' }}>
          Open to internship opportunities, data analytics roles, and interesting
          AI/ML projects. Drop a message and I'll get back to you within 24 hours.
        </p>

        <div
          className="contact-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem', alignItems: 'start' }}
        >
          {/* Left – contact info */}
          <div>
            <div className="availability-badge reveal">
              <span className="avail-dot">●</span>
              Open to opportunities
            </div>

            <div className="reveal flex flex-col gap-7" style={{ marginBottom: '3rem' }}>
              {contactInfo.map(({ label, value, href }) => (
                <div key={label}>
                  <span
                    className="font-mono uppercase block"
                    style={{ fontSize: '0.58rem', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '0.3rem' }}
                  >
                    {label}
                  </span>
                  {href
                    ? <a href={href} style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--ink)' }}>{value}</a>
                    : <span style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--ink)' }}>{value}</span>
                  }
                </div>
              ))}
            </div>

            <div
              className="reveal"
              style={{
                padding: '1.5rem', background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 4,
              }}
            >
              <div className="font-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '0.6rem' }}>
                Response Time
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>Typically within 24 hours</div>
            </div>
          </div>

          {/* Right – form */}
          <div className="reveal">
            {status === 'success' && (
              <div
                style={{
                  padding: '0.85rem 1.2rem', borderRadius: 4, marginBottom: '1.5rem',
                  background: 'rgba(0,200,100,.07)', border: '1px solid rgba(0,200,100,.25)',
                  color: 'var(--green)', fontSize: '0.84rem',
                }}
              >
                ✓ Message sent! I'll get back to you within 24 hours.
              </div>
            )}

            {status === 'error' && (
              <div
                style={{
                  padding: '0.85rem 1.2rem', borderRadius: 4, marginBottom: '1.5rem',
                  background: 'rgba(255,70,70,.07)', border: '1px solid rgba(255,70,70,.25)',
                  color: 'var(--red)', fontSize: '0.84rem',
                }}
              >
                ✕ Something went wrong. Please email me directly at akashkundu7487@gmail.com
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label className="font-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--muted)' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  className="form-input"
                  style={errors.name && touched.name ? { borderColor: 'var(--red)' } : {}}
                />
                {errors.name && touched.name && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--red)' }}>{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label className="font-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--muted)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="john@example.com"
                  className="form-input"
                  style={errors.email && touched.email ? { borderColor: 'var(--red)' } : {}}
                />
                {errors.email && touched.email && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--red)' }}>{errors.email}</span>
                )}
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label className="font-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--muted)' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell me about the opportunity or project..."
                  className="form-textarea"
                  rows={5}
                  style={errors.message && touched.message ? { borderColor: 'var(--red)' } : {}}
                />
                {errors.message && touched.message && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--red)' }}>{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'sending'}
                style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.7 : 1 }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
