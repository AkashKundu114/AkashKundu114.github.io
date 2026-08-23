import { useEffect, useState } from 'react';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';

const API_ENDPOINT =
  import.meta.env.VITE_CONTACT_API ||
  (import.meta.env.VITE_FORMSPREE_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
    : null);

const contactInfo = [
  { label: 'Email', value: 'akashkundu7487@gmail.com', href: 'mailto:akashkundu7487@gmail.com' },
  { label: 'Phone', value: '+91 9064349004', href: 'tel:+919064349004' },
  { label: 'Location', value: 'Kolkata, West Bengal, India' },
  { label: 'Open to', value: 'Internships · Data Analytics · ML projects' },
];

const fields = [
  { name: 'name', type: 'text', label: 'Name', ph: 'Riya Sharma' },
  { name: 'email', type: 'email', label: 'Email', ph: 'riya@example.com' },
];

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const ref = useRevealChildren();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [touched, setTouched] = useState({});

  const validate = (f) => {
    const e = {};
    if (!f.name.trim() || f.name.trim().length < 2) e.name = 'Enter your name (min 2 chars)';
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
      e.email = 'Enter a valid email address';
    if (!f.message.trim() || f.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters';
    return e;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) setErrors(validate({ ...form, [name]: value }));
  };
  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(form));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (!API_ENDPOINT) {
      setStatus('no-endpoint');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTouched({});
      } else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const Notice = ({ border, bg, color, children }) => (
    <div
      style={{
        padding: '12px 16px',
        border: `1px solid ${border}`,
        background: bg,
        color,
        fontSize: '0.84rem',
        fontFamily: 'var(--font-mono)',
        lineHeight: 1.7,
        marginBottom: '1.2rem',
        borderRadius: 0,
      }}
    >
      {children}
    </div>
  );

  return (
    <PageTransition>
      <section className="section" ref={ref}>
        <div className="container">
          <div className="label reveal">contact</div>
          <h2 className="reveal" style={{ marginBottom: '0.85rem', maxWidth: '32ch' }}>
            Let's work together.
          </h2>
          <p
            className="reveal"
            style={{ fontSize: '0.95rem', maxWidth: '56ch', lineHeight: 1.8, marginBottom: '3rem' }}
          >
            Open to internships, data analytics roles, and ML projects. Usually reply within a day.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              gap: '3.5rem',
              alignItems: 'start',
            }}
            id="contact-grid"
          >
            <div className="reveal">
              <div className="status-line" style={{ marginBottom: '1.75rem' }}>
                <span className="status-dot" />
                open to opportunities
              </div>
              <div className="card card-hover">
                {contactInfo.map(({ label, value, href }) => (
                  <div
                    key={label}
                    style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)' }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        marginBottom: '4px',
                      }}
                    >
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal">
              {status === 'success' && (
                <Notice border="var(--accent)" bg="var(--accent-soft)" color="var(--ink)">
                  Message sent - I'll get back to you soon.
                </Notice>
              )}
              {status === 'error' && (
                <Notice border="var(--danger)" bg="var(--danger-soft)" color="var(--danger)">
                  Something went wrong. Email me directly at akashkundu7487@gmail.com
                </Notice>
              )}
              {status === 'no-endpoint' && (
                <Notice border="var(--border)" bg="var(--surface-2)" color="var(--muted)">
                  No endpoint configured - set <code>VITE_CONTACT_API</code> or{' '}
                  <code>VITE_FORMSPREE_ID</code> in .env
                </Notice>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {fields.map(({ name, type, label, ph }) => (
                  <div
                    key={name}
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
                  >
                    <label
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--muted-2)',
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={ph}
                      className="form-input"
                      style={errors[name] && touched[name] ? { borderColor: 'var(--danger)' } : {}}
                    />
                    {errors[name] && touched[name] && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--danger)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {errors[name]}
                      </span>
                    )}
                  </div>
                ))}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--muted-2)',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell me about the opportunity or project…"
                    className="form-textarea"
                    rows={5}
                    style={
                      errors.message && touched.message ? { borderColor: 'var(--danger)' } : {}
                    }
                  />
                  {errors.message && touched.message && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--danger)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'sending'}
                  style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:880px){#contact-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </PageTransition>
  );
}
