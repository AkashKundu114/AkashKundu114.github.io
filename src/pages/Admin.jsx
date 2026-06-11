

import { useState, useEffect } from 'react'
import { useData } from '../context/DataContext'
import { categoryColors } from '../data/certificates'
import PageTransition from '../components/PageTransition'

const ADMIN_PW = import.meta.env.VITE_ADMIN_PASSWORD || 'admin2024'

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

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
      background: 'var(--bg)', paddingTop: '5rem',
    }}>
      <div style={{
        width: '100%', maxWidth: 380, padding: '2.5rem',
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6,
        animation: shake ? 'shake 0.4s ease' : 'none',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--accent-dim)', border: '1px solid rgba(79,163,255,.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem', margin: '0 auto 1.2rem',
          }}>🔐</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.3rem' }}>Admin Access</h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Enter your admin password to continue</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(false) }}
            onKeyDown={e => e.key === 'Enter' && attempt()}
            placeholder="Password"
            className="form-input"
            style={{ borderColor: err ? 'var(--red)' : undefined, textAlign: 'center', letterSpacing: '0.2em' }}
            autoFocus
          />
          {err && (
            <p style={{ fontSize: '0.72rem', color: 'var(--red)', textAlign: 'center' }}>
              Incorrect password. Try again.
            </p>
          )}
          <button onClick={attempt} className="btn btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
            Unlock Dashboard →
          </button>
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '0.62rem', color: 'var(--muted)', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em' }}>
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
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
        zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 620, maxHeight: '90vh', overflowY: 'auto',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 6, padding: '2rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', color: 'var(--ink)' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '1.2rem' }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        {label}
      </label>
      {children}
      {hint && <span style={{ fontSize: '0.65rem', color: 'var(--muted)', opacity: 0.7 }}>{hint}</span>}
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

      <Field label="Short Description">
        <input className="form-input" value={form.shortDesc} onChange={set('shortDesc')} placeholder="One sentence shown on the project card" />
      </Field>

      <Field label="Full Description">
        <textarea className="form-textarea" value={form.description} onChange={set('description')} rows={3} placeholder="Detailed description shown on the detail page" />
      </Field>

      <Field label="Technologies" hint="Comma-separated: Python, TensorFlow, OpenCV">
        <input className="form-input" value={techVal} onChange={set('technologies')} placeholder="Python, React, Tailwind CSS" />
      </Field>

      <Field label="Key Features" hint="One feature per line">
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
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save Project →</button>
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
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save Certificate →</button>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, accent }) {
  return (
    <div style={{
      background: 'var(--surface)', border: `1px solid ${accent ? 'rgba(79,163,255,.3)' : 'var(--border)'}`,
      borderRadius: 4, padding: '1.5rem',
      background: accent ? 'var(--accent-dim)' : 'var(--surface)',
    }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>{icon}</div>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, color: accent ? 'var(--accent)' : 'var(--ink)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.4rem' }}>{label}</div>
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
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: 'var(--ink)' }}>
            Admin<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.2rem' }}>
            Portfolio CMS
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', padding: '0 0.75rem' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.7rem',
                padding: '0.65rem 0.8rem', borderRadius: 4, border: 'none', cursor: 'pointer',
                background: tab === t.id ? 'var(--accent-dim)' : 'transparent',
                color: tab === t.id ? 'var(--accent)' : 'var(--muted)',
                fontFamily: 'Figtree, sans-serif', fontSize: '0.82rem', fontWeight: 500,
                textAlign: 'left', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (tab !== t.id) e.currentTarget.style.background = 'var(--surface2)' }}
              onMouseLeave={e => { if (tab !== t.id) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: '0.9rem' }}>{t.icon}</span>
              {t.label}
              {t.id === 'projects'     && <span style={{ marginLeft: 'auto', fontSize: '0.6rem', background: 'var(--surface3)', borderRadius: '100px', padding: '0.1rem 0.5rem', color: 'var(--muted)' }}>{projects.length}</span>}
              {t.id === 'certificates' && <span style={{ marginLeft: 'auto', fontSize: '0.6rem', background: 'var(--surface3)', borderRadius: '100px', padding: '0.1rem 0.5rem', color: 'var(--muted)' }}>{certificates.length}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: '0 0.75rem', marginTop: 'auto', position: 'absolute', bottom: '1.5rem', left: 0, right: 0 }}>
          <button
            onClick={onLogout}
            className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.72rem' }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: SW, padding: '2.5rem', minHeight: '100vh' }}>

        {tab === 'overview' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div className="label" style={{ marginBottom: '0.5rem' }}>Dashboard</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', color: 'var(--ink)' }}>
                Welcome back<span style={{ color: 'var(--accent)' }}>.</span>
              </h2>
              <p style={{ marginTop: '0.4rem' }}>Manage your portfolio content from here. Changes are saved instantly to the browser.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              <StatCard icon="◎" label="Projects"     value={projects.length}     accent />
              <StatCard icon="◐" label="Certificates" value={certificates.length} />
              <StatCard icon="◈" label="Skills"       value="16+" />
              <StatCard icon="◉" label="Storage"      value="Local" />
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', color: 'var(--ink)', marginBottom: '1rem' }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <button className="btn btn-primary btn-sm" onClick={() => { setTab('projects'); openAdd('project') }}>+ Add Project</button>
                <button className="btn btn-outline btn-sm" onClick={() => { setTab('certificates'); openAdd('cert') }}>+ Add Certificate</button>
                <a href="/" className="btn btn-outline btn-sm">View Site ↗</a>
              </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.2rem 1.5rem', background: 'rgba(79,163,255,.06)', border: '1px solid rgba(79,163,255,.2)', borderRadius: 4 }}>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--accent)', lineHeight: 1.8 }}>
                💡 <strong>Backend tip:</strong> Data currently lives in localStorage.
                To sync across devices, connect a Spring Boot or FastAPI backend and update
                DataContext.jsx to use fetch() calls. See <code>backend/contact_api.py</code> for a starter.
              </p>
            </div>
          </div>
        )}

        {tab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="label" style={{ marginBottom: '0.5rem' }}>Content</div>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', color: 'var(--ink)' }}>Projects</h2>
              </div>
              <button className="btn btn-primary" onClick={() => openAdd('project')}>+ Add Project</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {projects.map(p => (
                <div key={p.id} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4,
                  padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,163,255,.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.shortDesc}</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', flexShrink: 0, maxWidth: 200 }}>
                    {(Array.isArray(p.technologies) ? p.technologies : []).slice(0, 3).map(t => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--muted)', flexShrink: 0 }}>{p.year}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button className="btn btn-outline btn-sm" onClick={() => openEdit('project', p)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => confirmDelete('project', p.id, p.title)}>Del</button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', border: '2px dashed var(--border)', borderRadius: 4, color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                  No projects yet. Click "+ Add Project" to get started.
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
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', color: 'var(--ink)' }}>Certificates</h2>
              </div>
              <button className="btn btn-primary" onClick={() => openAdd('cert')}>+ Add Certificate</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {certificates.map(c => (
                <div key={c.id} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4,
                  padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,163,255,.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.1em', fontWeight: 700,
                    background: categoryColors[c.category] || '#94a3b8', color: '#05080f',
                    padding: '0.2rem 0.6rem', borderRadius: '100px', flexShrink: 0,
                  }}>{c.category}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{c.issuer}</div>
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--muted)', flexShrink: 0 }}>{c.date}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button className="btn btn-outline btn-sm" onClick={() => openEdit('cert', c)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => confirmDelete('cert', c.id, c.title)}>Del</button>
                  </div>
                </div>
              ))}
              {certificates.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', border: '2px dashed var(--border)', borderRadius: 4, color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                  No certificates yet. Click "+ Add Certificate" to get started.
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div style={{ maxWidth: 560 }}>
            <div style={{ marginBottom: '2rem' }}>
              <div className="label" style={{ marginBottom: '0.5rem' }}>Configuration</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', color: 'var(--ink)' }}>Settings</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Reset to Defaults</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--muted)', marginBottom: '1.2rem' }}>Discard all custom edits and restore the original bundled data. This cannot be undone.</p>
                <button className="btn btn-danger" onClick={() => { if (confirm('Reset ALL data to defaults? This cannot be undone.')) resetToDefaults() }}>
                  ⚠ Reset to Defaults
                </button>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Environment Variables</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--muted)', marginBottom: '1rem' }}>Add these to your <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', background: 'var(--surface2)', padding: '0.1rem 0.4rem', borderRadius: 2 }}>.env</code> file in the project root:</p>
                <pre style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 4, padding: '1rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--accent)', overflowX: 'auto', lineHeight: 1.8 }}>
{`VITE_ADMIN_PASSWORD=your_secret_here
VITE_CONTACT_API=http://localhost:8000/api/contact`}
                </pre>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Export Data</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--muted)', marginBottom: '1.2rem' }}>Download current data as JSON for backup or backend seeding.</p>
                <button className="btn btn-outline btn-sm" onClick={() => {
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
        <Modal title={modal.item ? 'Edit Project' : 'New Project'} onClose={closeModal}>
          <ProjectForm initial={modal.item ? { ...modal.item, technologies: (modal.item.technologies || []).join(', '), features: (modal.item.features || []).join('\n') } : undefined} onSave={handleSaveProject} onClose={closeModal} />
        </Modal>
      )}
      {modal?.type === 'cert' && (
        <Modal title={modal.item ? 'Edit Certificate' : 'New Certificate'} onClose={closeModal}>
          <CertForm initial={modal.item ? { ...modal.item, skills: (modal.item.skills || []).join(', ') } : undefined} onSave={handleSaveCert} onClose={closeModal} />
        </Modal>
      )}

      {deleteConf && (
        <Modal title="Confirm Delete" onClose={() => setDeleteConf(null)}>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
            Are you sure you want to delete <strong style={{ color: 'var(--ink)' }}>"{deleteConf.title}"</strong>? This cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline" onClick={() => setDeleteConf(null)}>Cancel</button>
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
