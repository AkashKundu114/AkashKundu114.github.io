import { useState, useEffect } from 'react'
import { useData } from '../context/DataContext'
import { categoryColors } from '../data/certificates'
import PageTransition from '../components/PageTransition'

const ADMIN_PW = import.meta.env.VITE_ADMIN_PASSWORD || 'admin2024'

const emptyProject = {
  title: '', shortDesc: '', description: '',
  technologies: '', year: new Date().getFullYear().toString(),
  github: '', liveLink: '', features: '', screenshots: [],
}

const emptyCert = {
  title: '', issuer: '', date: '', credentialId: '',
  category: 'General', skills: '', image: '', file: '',
  verifyUrl: '', description: '',
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function LoginScreen({ onSuccess }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const [shake, setShake] = useState(false)

  const attempt = () => {
    if (pw === ADMIN_PW) { onSuccess() }
    else {
      setErr(true); setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingTop: '5rem',
    }}>
      <div className="card" style={{
        width: '100%', maxWidth: 380, padding: '2.5rem',
        animation: shake ? 'shake 0.4s ease' : 'none',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 'var(--radius-control)',
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink)', margin: '0 auto 1.2rem',
          }}>
            <LockIcon />
          </div>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>Admin access</h2>
          <p style={{ fontSize: '0.78rem' }}>Enter your admin password to continue</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(false) }}
            onKeyDown={e => e.key === 'Enter' && attempt()}
            placeholder="Password"
            className="form-input"
            style={{ borderColor: err ? '#dc2626' : undefined, textAlign: 'center', letterSpacing: '0.2em' }}
            autoFocus
          />
          {err && (
            <p style={{ fontSize: '0.72rem', color: '#dc2626', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
              Incorrect password. Try again.
            </p>
          )}
          <button onClick={attempt} className="btn btn-primary btn-pill" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
            Unlock dashboard →
          </button>
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '0.62rem', textAlign: 'center', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', color: 'var(--muted-2)' }}>
          Set VITE_ADMIN_PASSWORD in .env
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{ transform:translateX(0) }
          20%{ transform:translateX(-8px) }
          40%{ transform:translateX(8px) }
          60%{ transform:translateX(-5px) }
          80%{ transform:translateX(5px) }
        }
      `}</style>
    </div>
  )
}

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="card"
        style={{
          width: '100%', maxWidth: 620, maxHeight: '90vh', overflowY: 'auto',
          padding: '2rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem' }}>{title}</h3>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '1.2rem', lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{
        fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600,
        letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)',
      }}>
        {label}
      </label>
      {children}
      {hint && <span style={{ fontSize: '0.65rem', color: 'var(--muted-2)' }}>{hint}</span>}
    </div>
  )
}

function ProjectForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial ?? emptyProject)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSave = () => {
    if (!form.title.trim()) return alert('Title is required')
    const techs    = form.technologies.split(',').map(t => t.trim()).filter(Boolean)
    const features = typeof form.features === 'string'
      ? form.features.split('\n').map(f => f.trim()).filter(Boolean)
      : form.features
    onSave({ ...form, technologies: techs, features })
    onClose()
  }

  const techVal = Array.isArray(form.technologies) ? form.technologies.join(', ') : form.technologies
  const featVal = Array.isArray(form.features)     ? form.features.join('\n')     : form.features

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Field label="Title *">
          <input className="form-input" value={form.title} onChange={set('title')} placeholder='"Copper" — Personal AI Assistant' />
        </Field>
        <Field label="Year">
          <input className="form-input" value={form.year} onChange={set('year')} placeholder="2024" />
        </Field>
      </div>

      <Field label="Short description">
        <input className="form-input" value={form.shortDesc} onChange={set('shortDesc')} placeholder="One sentence shown on the project card" />
      </Field>

      <Field label="Full description">
        <textarea className="form-textarea" value={form.description} onChange={set('description')} rows={3} placeholder="Detailed description shown on the detail page" />
      </Field>

      <Field label="Technologies" hint="Comma-separated: Python, TensorFlow, OpenCV">
        <input className="form-input" value={techVal} onChange={set('technologies')} placeholder="Python, React, Tailwind CSS" />
      </Field>

      <Field label="Key features" hint="One feature per line">
        <textarea className="form-textarea" value={featVal} onChange={set('features')} rows={4} placeholder={"Feature one\nFeature two\nFeature three"} />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Field label="GitHub URL">
          <input className="form-input" value={form.github || ''} onChange={set('github')} placeholder="https://github.com/..." />
        </Field>
        <Field label="Live URL">
          <input className="form-input" value={form.liveLink || ''} onChange={set('liveLink')} placeholder="https://..." />
        </Field>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save project →</button>
      </div>
    </div>
  )
}

const CATEGORIES = ['Data Science', 'Programming', 'Cloud', 'AI/ML', 'Web Dev', 'General']

function CertForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial ?? emptyCert)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSave = () => {
    if (!form.title.trim()) return alert('Title is required')
    const skills = typeof form.skills === 'string'
      ? form.skills.split(',').map(s => s.trim()).filter(Boolean)
      : form.skills
    onSave({ ...form, skills })
    onClose()
  }

  const skillsVal = Array.isArray(form.skills) ? form.skills.join(', ') : form.skills

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Field label="Title *">
          <input className="form-input" value={form.title} onChange={set('title')} placeholder="Machine Learning Specialization" />
        </Field>
        <Field label="Date">
          <input className="form-input" value={form.date} onChange={set('date')} placeholder="March 2024" />
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Field label="Issuer">
          <input className="form-input" value={form.issuer} onChange={set('issuer')} placeholder="Coursera — DeepLearning.AI" />
        </Field>
        <Field label="Category">
          <select className="form-input" value={form.category} onChange={set('category')}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Credential ID">
        <input className="form-input" value={form.credentialId || ''} onChange={set('credentialId')} placeholder="COURSERA-ML-1234" />
      </Field>

      <Field label="Skills" hint="Comma-separated: Python, Neural Networks, Regression">
        <input className="form-input" value={skillsVal} onChange={set('skills')} placeholder="Python, Deep Learning, TensorFlow" />
      </Field>

      <Field label="Description">
        <textarea className="form-textarea" value={form.description} onChange={set('description')} rows={3} />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Field label="Image path" hint="e.g. /certificates/ml.jpg">
          <input className="form-input" value={form.image || ''} onChange={set('image')} />
        </Field>
        <Field label="PDF path" hint="e.g. /certificates/ml.pdf">
          <input className="form-input" value={form.file || ''} onChange={set('file')} />
        </Field>
      </div>

      <Field label="Verify URL">
        <input className="form-input" value={form.verifyUrl || ''} onChange={set('verifyUrl')} placeholder="https://..." />
      </Field>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save certificate →</button>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, accent }) {
  return (
    <div
      className="card"
      style={{
        padding: '1.5rem',
        background: accent ? 'var(--accent-soft)' : 'var(--surface)',
        borderColor: accent ? 'var(--border-2)' : 'var(--border)',
      }}
    >
      <div style={{ fontSize: '1.4rem', marginBottom: '0.6rem', color: accent ? 'var(--ink)' : 'var(--muted)' }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginTop: '0.4rem' }}>{label}</div>
    </div>
  )
}

function Dashboard({ onLogout }) {
  const { projects, certificates, addProject, updateProject, deleteProject, addCertificate, updateCertificate, deleteCertificate, resetToDefaults } = useData()

  const [tab,       setTab]       = useState('overview')
  const [modal,     setModal]     = useState(null)
  const [deleteConf,setDeleteConf]= useState(null)

  const openAdd  = (type)       => setModal({ type, item: null })
  const openEdit = (type, item) => setModal({ type, item })
  const closeModal = ()         => setModal(null)

  const handleSaveProject = (data) => {
    if (modal.item) updateProject(modal.item.id, data)
    else             addProject(data)
  }
  const handleSaveCert = (data) => {
    if (modal.item) updateCertificate(modal.item.id, data)
    else             addCertificate(data)
  }
  const confirmDelete = (type, id, title) => setDeleteConf({ type, id, title })
  const execDelete    = () => {
    if (!deleteConf) return
    if (deleteConf.type === 'project') deleteProject(deleteConf.id)
    else                               deleteCertificate(deleteConf.id)
    setDeleteConf(null)
  }

  const tabs = [
    { id: 'overview',      label: 'Overview',      icon: '◈' },
    { id: 'projects',      label: 'Projects',       icon: '◎' },
    { id: 'certificates',  label: 'Certificates',   icon: '◐' },
    { id: 'settings',      label: 'Settings',       icon: '◉' },
  ]

  const SW = 220

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '4.5rem' }}>

      <aside style={{
        width: SW, flexShrink: 0,
        background: 'var(--surface)', borderRight: '1px solid var(--border)',
        padding: '1.5rem 0', position: 'fixed', top: '4.5rem', bottom: 0, zIndex: 10,
        overflowY: 'auto',
      }}>
        <div style={{ padding: '0 1.2rem 1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
            Admin<span style={{ color: 'var(--muted-2)' }}>.</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginTop: '0.3rem' }}>
            Portfolio CMS
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 0.75rem' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`nav-link${tab === t.id ? ' active' : ''}`}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', border: 'none', cursor: 'pointer',
                background: tab === t.id ? 'var(--surface-2)' : 'transparent',
                textAlign: 'left', width: '100%',
              }}
            >
              <span style={{ fontSize: '13px' }}>{t.icon}</span>
              {t.label}
              {t.id === 'projects'     && <span className="tag" style={{ marginLeft: 'auto', fontSize: '10px', padding: '1px 8px' }}>{projects.length}</span>}
              {t.id === 'certificates' && <span className="tag" style={{ marginLeft: 'auto', fontSize: '10px', padding: '1px 8px' }}>{certificates.length}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: '0 0.75rem', position: 'absolute', bottom: '1.5rem', left: 0, right: 0 }}>
          <button onClick={onLogout} className="btn btn-pill" style={{ width: '100%', justifyContent: 'center', fontSize: '11px' }}>
            Sign out
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: SW, padding: '2.5rem', minHeight: '100vh' }}>

        {tab === 'overview' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div className="label" style={{ marginBottom: '0.5rem' }}>Dashboard</div>
              <h2 style={{ fontSize: '2rem' }}>
                Welcome back.
              </h2>
              <p style={{ marginTop: '0.4rem' }}>Manage your portfolio content from here. Changes are saved instantly to the browser.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              <StatCard icon="◎" label="Projects"     value={projects.length}     accent />
              <StatCard icon="◐" label="Certificates" value={certificates.length} />
              <StatCard icon="◈" label="Skills"       value="16+" />
              <StatCard icon="◉" label="Storage"      value="Local" />
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Quick actions</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <button className="btn btn-primary btn-sm btn-pill" onClick={() => { setTab('projects'); openAdd('project') }}>+ Add project</button>
                <button className="btn btn-sm btn-pill" onClick={() => { setTab('certificates'); openAdd('cert') }}>+ Add certificate</button>
                <a href="/" className="btn btn-sm btn-pill">View site ↗</a>
              </div>
            </div>

            <div className="card" style={{ marginTop: '1.5rem', padding: '1.2rem 1.5rem', background: 'var(--surface-2)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted-2)', fontWeight: 600, letterSpacing: '0.06em', marginTop: '3px', whiteSpace: 'nowrap' }}>NOTE//</span>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.8, fontFamily: 'var(--font-mono)' }}>
                  Data currently lives in <code style={{ background: 'var(--surface-3)', padding: '1px 6px', borderRadius: '4px' }}>localStorage</code>. To
                  sync across devices, connect a FastAPI backend and update <code style={{ background: 'var(--surface-3)', padding: '1px 6px', borderRadius: '4px' }}>DataContext.jsx</code> to
                  use <code style={{ background: 'var(--surface-3)', padding: '1px 6px', borderRadius: '4px' }}>fetch()</code> calls.
                  See <code style={{ background: 'var(--surface-3)', padding: '1px 6px', borderRadius: '4px' }}>backend/contact_api.py</code> for a starter.
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="label" style={{ marginBottom: '0.5rem' }}>Content</div>
                <h2 style={{ fontSize: '1.8rem' }}>Projects</h2>
              </div>
              <button className="btn btn-primary btn-pill" onClick={() => openAdd('project')}>+ Add project</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {projects.map(p => (
                <div key={p.id} className="card card-hover" style={{
                  padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.shortDesc}</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', flexShrink: 0, maxWidth: 200 }}>
                    {(Array.isArray(p.technologies) ? p.technologies : []).slice(0, 3).map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted-2)', flexShrink: 0 }}>{p.year}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button className="btn btn-sm" onClick={() => openEdit('project', p)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => confirmDelete('project', p.id, p.title)}>Del</button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="card" style={{ textAlign: 'center', padding: '4rem', borderStyle: 'dashed', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  No projects yet. Click "+ Add project" to get started.
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'certificates' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="label" style={{ marginBottom: '0.5rem' }}>Content</div>
                <h2 style={{ fontSize: '1.8rem' }}>Certificates</h2>
              </div>
              <button className="btn btn-primary btn-pill" onClick={() => openAdd('cert')}>+ Add certificate</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {certificates.map(c => (
                <div key={c.id} className="card card-hover" style={{
                  padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', fontWeight: 700,
                    background: categoryColors[c.category] || '#94a3b8', color: '#0a0a0d',
                    padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-pill)', flexShrink: 0,
                  }}>{c.category}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{c.issuer}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted-2)', flexShrink: 0 }}>{c.date}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button className="btn btn-sm" onClick={() => openEdit('cert', c)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => confirmDelete('cert', c.id, c.title)}>Del</button>
                  </div>
                </div>
              ))}
              {certificates.length === 0 && (
                <div className="card" style={{ textAlign: 'center', padding: '4rem', borderStyle: 'dashed', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  No certificates yet. Click "+ Add certificate" to get started.
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div style={{ maxWidth: 560 }}>
            <div style={{ marginBottom: '2rem' }}>
              <div className="label" style={{ marginBottom: '0.5rem' }}>Configuration</div>
              <h2 style={{ fontSize: '1.8rem' }}>Settings</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Reset to defaults</h3>
                <p style={{ fontSize: '0.83rem', marginBottom: '1.2rem' }}>Discard all custom edits and restore the original bundled data. This cannot be undone.</p>
                <button className="btn btn-danger btn-sm" onClick={() => { if (confirm('Reset ALL data to defaults? This cannot be undone.')) resetToDefaults() }}>
                  Reset to defaults
                </button>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Environment variables</h3>
                <p style={{ fontSize: '0.83rem', marginBottom: '1rem' }}>Add these to your <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'var(--surface-2)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>.env</code> file in the project root:</p>
                <pre style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink)', overflowX: 'auto', lineHeight: 1.8 }}>
{`VITE_ADMIN_PASSWORD=your_secret_here
VITE_CONTACT_API=http://localhost:8000/api/contact`}
                </pre>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Export data</h3>
                <p style={{ fontSize: '0.83rem', marginBottom: '1.2rem' }}>Download current data as JSON for backup or backend seeding.</p>
                <button className="btn btn-sm" onClick={() => {
                  const blob = new Blob([JSON.stringify({ projects, certificates }, null, 2)], { type: 'application/json' })
                  const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
                  a.download = 'portfolio-data.json'; a.click()
                }}>↓ Export portfolio-data.json</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {modal?.type === 'project' && (
        <Modal title={modal.item ? 'Edit project' : 'New project'} onClose={closeModal}>
          <ProjectForm initial={modal.item ? { ...modal.item, technologies: (modal.item.technologies || []).join(', '), features: (modal.item.features || []).join('\n') } : undefined} onSave={handleSaveProject} onClose={closeModal} />
        </Modal>
      )}
      {modal?.type === 'cert' && (
        <Modal title={modal.item ? 'Edit certificate' : 'New certificate'} onClose={closeModal}>
          <CertForm initial={modal.item ? { ...modal.item, skills: (modal.item.skills || []).join(', ') } : undefined} onSave={handleSaveCert} onClose={closeModal} />
        </Modal>
      )}

      {deleteConf && (
        <Modal title="Confirm delete" onClose={() => setDeleteConf(null)}>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
            Are you sure you want to delete <strong style={{ color: 'var(--ink)' }}>"{deleteConf.title}"</strong>? This cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button className="btn" onClick={() => setDeleteConf(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={execDelete}>Delete permanently</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('_adminAuthed') === '1')

  const handleLogin  = () => { sessionStorage.setItem('_adminAuthed', '1'); setAuthed(true) }
  const handleLogout = () => { sessionStorage.removeItem('_adminAuthed'); setAuthed(false) }

  return (
    <PageTransition>
      {authed
        ? <Dashboard onLogout={handleLogout} />
        : <LoginScreen onSuccess={handleLogin} />
      }
    </PageTransition>
  )
}
