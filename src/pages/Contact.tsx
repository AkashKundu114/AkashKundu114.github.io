import { useEffect, useState, useCallback, useId } from 'react';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type FormFieldKey = keyof ContactFormData;

type FormErrors = Partial<Record<FormFieldKey, string>>;
type FormTouched = Partial<Record<FormFieldKey, boolean>>;

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error' | 'no-endpoint';

const API_ENDPOINT =
  import.meta.env.VITE_CONTACT_API ||
  (import.meta.env.VITE_FORMSPREE_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
    : null);

const CONTACT_CHANNELS = [
  { label: 'Email', value: 'akashkundu7487@gmail.com', href: 'mailto:akashkundu7487@gmail.com' },
  { label: 'Phone', value: '+91 9064349004', href: 'tel:+919064349004' },
  { label: 'Location', value: 'Kolkata, West Bengal, India' },
  { label: 'Open to', value: 'Internships · Data Analytics · ML projects' },
];

const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 3000 },
} as const;

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const NAME_REGEX = /^[\p{L}\p{M}\s.'-]+$/u;

/**
 * Validates form boundary conditions: lengths, regex patterns, and prohibited characters.
 */
function validateContactForm(values: ContactFormData): FormErrors {
  const errors: FormErrors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  // Name validation
  if (!trimmedName) {
    errors.name = 'Please provide your full name.';
  } else if (trimmedName.length < LIMITS.name.min) {
    errors.name = `Name must be at least ${LIMITS.name.min} characters.`;
  } else if (trimmedName.length > LIMITS.name.max) {
    errors.name = `Name cannot exceed ${LIMITS.name.max} characters.`;
  } else if (!NAME_REGEX.test(trimmedName)) {
    errors.name = 'Name contains unsupported characters.';
  }

  // Email validation
  if (!trimmedEmail) {
    errors.email = 'Please provide your email address.';
  } else if (trimmedEmail.length > LIMITS.email.max) {
    errors.email = `Email cannot exceed ${LIMITS.email.max} characters.`;
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address.';
  }

  // Message validation
  if (!trimmedMessage) {
    errors.message = 'Please provide a brief message.';
  } else if (trimmedMessage.length < LIMITS.message.min) {
    errors.message = `Message must be at least ${LIMITS.message.min} characters.`;
  } else if (trimmedMessage.length > LIMITS.message.max) {
    errors.message = `Message cannot exceed ${LIMITS.message.max} characters.`;
  }

  return errors;
}

interface FormNoticeProps {
  borderColor: string;
  backgroundColor: string;
  textColor: string;
  children: React.ReactNode;
}

function FormNotice({ borderColor, backgroundColor, textColor, children }: FormNoticeProps) {
  return (
    <div
      role="status"
      style={{
        padding: '12px 16px',
        border: `1px solid ${borderColor}`,
        background: backgroundColor,
        color: textColor,
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
}

export default function Contact() {
  useDocumentTitle(
    'Contact — Akash Kundu',
    'Get in touch for AI engineering, full-stack development, and research collaborations.'
  );

  const containerRef = useRevealChildren();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<FormTouched>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      const fieldKey = name as FormFieldKey;

      setFormData((prev) => {
        const next = { ...prev, [fieldKey]: value };
        if (touchedFields[fieldKey]) {
          const errors = validateContactForm(next);
          setFieldErrors(errors);
        }
        return next;
      });
    },
    [touchedFields]
  );

  const handleInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const fieldKey = event.target.name as FormFieldKey;
      setTouchedFields((prev) => ({ ...prev, [fieldKey]: true }));
      setFieldErrors(validateContactForm(formData));
    },
    [formData]
  );

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const allTouched: FormTouched = { name: true, email: true, message: true };
    setTouchedFields(allTouched);

    const validationErrors = validateContactForm(formData);
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!API_ENDPOINT) {
      setSubmissionStatus('no-endpoint');
      return;
    }

    setSubmissionStatus('sending');

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTouchedFields({});
        setFieldErrors({});
      } else {
        setSubmissionStatus('error');
      }
    } catch {
      setSubmissionStatus('error');
    }
  };

  const messageCharacterCount = formData.message.length;

  return (
    <PageTransition>
      <section className="section" ref={containerRef}>
        <div className="container">
          <div className="label reveal">contact</div>
          <h1 className="reveal heading-lg" style={{ marginBottom: '0.85rem', maxWidth: '32ch' }}>
            Let&apos;s work together.
          </h1>
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
            {/* Contact Channels Column */}
            <div className="reveal">
              <div className="status-line" style={{ marginBottom: '1.75rem' }}>
                <span className="status-dot" />
                open to opportunities
              </div>
              <div className="card card-hover">
                {CONTACT_CHANNELS.map(({ label, value, href }) => (
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

            {/* Interactive Contact Form Column */}
            <div className="reveal">
              {submissionStatus === 'success' && (
                <FormNotice
                  borderColor="var(--accent)"
                  backgroundColor="var(--accent-soft)"
                  textColor="var(--ink)"
                >
                  Message sent successfully — I will get back to you shortly.
                </FormNotice>
              )}
              {submissionStatus === 'error' && (
                <FormNotice
                  borderColor="var(--danger)"
                  backgroundColor="var(--danger-soft)"
                  textColor="var(--danger)"
                >
                  Something went wrong delivering the message. Reach out directly at{' '}
                  <strong>akashkundu7487@gmail.com</strong>
                </FormNotice>
              )}
              {submissionStatus === 'no-endpoint' && (
                <FormNotice
                  borderColor="var(--border)"
                  backgroundColor="var(--surface-2)"
                  textColor="var(--muted)"
                >
                  No contact endpoint configured — please set <code>VITE_CONTACT_API</code> or{' '}
                  <code>VITE_FORMSPREE_ID</code> in <code>.env</code>.
                </FormNotice>
              )}

              <form
                onSubmit={handleFormSubmit}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {/* Full Name Field */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label
                    htmlFor={nameId}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--muted-2)',
                    }}
                  >
                    Name *
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Riya Sharma"
                    maxLength={LIMITS.name.max}
                    className="form-input"
                    style={
                      fieldErrors.name && touchedFields.name ? { borderColor: 'var(--danger)' } : {}
                    }
                  />
                  {fieldErrors.name && touchedFields.name && (
                    <span
                      role="alert"
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--danger)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {fieldErrors.name}
                    </span>
                  )}
                </div>

                {/* Email Address Field */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label
                    htmlFor={emailId}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--muted-2)',
                    }}
                  >
                    Email *
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="riya@example.com"
                    maxLength={LIMITS.email.max}
                    className="form-input"
                    style={
                      fieldErrors.email && touchedFields.email
                        ? { borderColor: 'var(--danger)' }
                        : {}
                    }
                  />
                  {fieldErrors.email && touchedFields.email && (
                    <span
                      role="alert"
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--danger)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {fieldErrors.email}
                    </span>
                  )}
                </div>

                {/* Message Textarea Field */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label
                      htmlFor={messageId}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--muted-2)',
                      }}
                    >
                      Message *
                    </label>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color:
                          messageCharacterCount > LIMITS.message.max - 100
                            ? 'var(--danger)'
                            : 'var(--muted-2)',
                      }}
                    >
                      {messageCharacterCount}/{LIMITS.message.max}
                    </span>
                  </div>
                  <textarea
                    id={messageId}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Tell me about the engineering opportunity or collaboration..."
                    maxLength={LIMITS.message.max}
                    className="form-textarea"
                    rows={5}
                    style={
                      fieldErrors.message && touchedFields.message
                        ? { borderColor: 'var(--danger)' }
                        : {}
                    }
                  />
                  {fieldErrors.message && touchedFields.message && (
                    <span
                      role="alert"
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--danger)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {fieldErrors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submissionStatus === 'sending'}
                  style={{ alignSelf: 'flex-start', opacity: submissionStatus === 'sending' ? 0.7 : 1 }}
                >
                  {submissionStatus === 'sending' ? 'Sending…' : 'Send message →'}
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
