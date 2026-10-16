import { useState, useEffect, useCallback, useId } from 'react';
import { useData } from '../context/DataContext';
import { categoryColors, Certificate } from '../data/certificates';
import { Project } from '../data/projects';
import PageTransition from '../components/PageTransition';

const EMPTY_PROJECT: Omit<Project, 'id'> = {
  title: '',
  status: 'In Development',
  shortDesc: '',
  description: '',
  problem: '',
  aiArchitecture: {
    heading: '',
    body: '',
    points: [],
    stack: [],
  },
  uiDeployment: {
    heading: '',
    body: '',
    points: [],
    deployed: '',
    stack: [],
  },
  technologies: [],
  year: new Date().getFullYear().toString(),
  github: '',
  liveLink: '',
  features: [],
  screenshots: [],
};

const EMPTY_CERTIFICATE: Omit<Certificate, 'id'> = {
  title: '',
  issuer: '',
  date: '',
  credentialId: '',
  category: 'General',
  skills: [],
  image: '',
  file: '',
  verifyUrl: '',
  description: '',
};

const CERTIFICATE_CATEGORIES = [
  'Data Science',
  'Programming',
  'Cloud',
  'AI/ML',
  'Security',
  'Web Dev',
  'General',
] as const;

function LockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <rect x="4" y="11" width="16" height="9" rx="0" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

interface LoginScreenProps {
  onSuccess: () => void;
}

function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [passwordInput, setPasswordInput] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputId = useId();

  const handleAttempt = () => {
    if (!passwordInput.trim()) {
      setHasError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    onSuccess();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '88px',
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: 360,
          padding: '2.5rem',
          animation: isShaking ? 'shake 0.4s ease' : 'fadeSlideUp 0.4s var(--ease)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: 'var(--accent-soft)',
              border: '1px solid var(--border-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              margin: '0 auto 1.2rem',
              borderRadius: 0,
            }}
          >
            <LockIcon />
          </div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.3rem' }}>Admin Access</h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted-2)' }}>
            Enter your administrative password to proceed
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label htmlFor={inputId} className="sr-only">
            Admin Password
          </label>
          <input
            id={inputId}
            type="password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
              setHasError(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleAttempt()}
            placeholder="Password"
            className="form-input"
            style={{
              borderColor: hasError ? 'var(--danger)' : undefined,
              textAlign: 'center',
              letterSpacing: '0.2em',
            }}
            autoFocus
          />

          {hasError && (
            <p
              role="alert"
              style={{
                fontSize: '0.7rem',
                color: 'var(--danger)',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Incorrect password.
            </p>
          )}

          <button
            onClick={handleAttempt}
            className="btn btn-primary"
            style={{ justifyContent: 'center', marginTop: '0.25rem' }}
          >
            Unlock Dashboard →
          </button>
        </div>

        <p
          style={{
            marginTop: '1.4rem',
            fontSize: '0.6rem',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.06em',
            color: 'var(--muted-2)',
          }}
        >
          Configured via VITE_ADMIN_PASSWORD_HASH in .env
        </p>
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}`}</style>
    </div>
  );
}

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(7, 11, 28, 0.72)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{
          width: '100%',
          maxWidth: 620,
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          animation: 'fadeSlideUp 0.25s var(--ease)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <h3 style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted-2)',
              fontSize: '1.2rem',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

function FormField({ label, hint, children }: FormFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
        }}
      >
        {label}
      </label>
      {children}
      {hint && (
        <span
          style={{ fontSize: '0.62rem', color: 'var(--muted-2)', fontFamily: 'var(--font-mono)' }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}

interface ProjectFormProps {
  initial?: Partial<Project>;
  onSave: (data: Partial<Project>) => void;
  onClose: () => void;
}

function ProjectForm({ initial, onSave, onClose }: ProjectFormProps) {
  const [formState, setFormState] = useState({
    title: initial?.title ?? EMPTY_PROJECT.title,
    year: initial?.year ?? EMPTY_PROJECT.year,
    shortDesc: initial?.shortDesc ?? EMPTY_PROJECT.shortDesc,
    description: initial?.description ?? EMPTY_PROJECT.description,
    technologies: Array.isArray(initial?.technologies) ? initial.technologies.join(', ') : '',
    features: Array.isArray(initial?.features) ? initial.features.join('\n') : '',
    github: initial?.github ?? '',
    liveLink: initial?.liveLink ?? '',
  });

  const [validationError, setValidationError] = useState('');

  const updateField =
    (fieldKey: keyof typeof formState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [fieldKey]: event.target.value }));
      setValidationError('');
    };

  const handleSave = () => {
    const trimmedTitle = formState.title.trim();
    if (!trimmedTitle) {
      setValidationError('Project title is required.');
      return;
    }

    const parsedTechnologies = formState.technologies
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const parsedFeatures = formState.features
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    onSave({
      ...initial,
      title: trimmedTitle,
      year: formState.year.trim() || new Date().getFullYear().toString(),
      shortDesc: formState.shortDesc.trim(),
      description: formState.description.trim(),
      technologies: parsedTechnologies,
      features: parsedFeatures,
      github: formState.github.trim() || null,
      liveLink: formState.liveLink.trim() || null,
    });

    onClose();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {validationError && (
        <div
          role="alert"
          style={{
            padding: '8px 12px',
            background: 'var(--danger-soft)',
            border: '1px solid var(--danger)',
            color: 'var(--danger)',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {validationError}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <FormField label="Title *">
          <input
            className="form-input"
            value={formState.title}
            onChange={updateField('title')}
            placeholder="Copper - AI Assistant"
            maxLength={120}
          />
        </FormField>
        <FormField label="Year">
          <input
            className="form-input"
            value={formState.year}
            onChange={updateField('year')}
            placeholder="2026"
            maxLength={10}
          />
        </FormField>
      </div>

      <FormField label="Short description">
        <input
          className="form-input"
          value={formState.shortDesc}
          onChange={updateField('shortDesc')}
          placeholder="Brief one-line summary for project cards"
          maxLength={240}
        />
      </FormField>

      <FormField label="Full description">
        <textarea
          className="form-textarea"
          value={formState.description}
          onChange={updateField('description')}
          rows={3}
          maxLength={3000}
        />
      </FormField>

      <FormField label="Technologies" hint="Comma-separated list (e.g. PyTorch, FastAPI, React)">
        <input
          className="form-input"
          value={formState.technologies}
          onChange={updateField('technologies')}
          placeholder="Python, React, FastAPI"
        />
      </FormField>

      <FormField label="Key features" hint="One deliverable per line">
        <textarea
          className="form-textarea"
          value={formState.features}
          onChange={updateField('features')}
          rows={4}
        />
      </FormField>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <FormField label="GitHub URL">
          <input
            className="form-input"
            value={formState.github}
            onChange={updateField('github')}
            placeholder="https://github.com/..."
          />
        </FormField>
        <FormField label="Live Demo URL">
          <input
            className="form-input"
            value={formState.liveLink}
            onChange={updateField('liveLink')}
            placeholder="https://..."
          />
        </FormField>
      </div>

      <div
        style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}
      >
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Project →
        </button>
      </div>
    </div>
  );
}

interface CertFormProps {
  initial?: Partial<Certificate>;
  onSave: (data: Partial<Certificate>) => void;
  onClose: () => void;
}

function CertForm({ initial, onSave, onClose }: CertFormProps) {
  const [formState, setFormState] = useState({
    title: initial?.title ?? EMPTY_CERTIFICATE.title,
    date: initial?.date ?? EMPTY_CERTIFICATE.date,
    issuer: initial?.issuer ?? EMPTY_CERTIFICATE.issuer,
    category: initial?.category ?? EMPTY_CERTIFICATE.category,
    credentialId: initial?.credentialId ?? EMPTY_CERTIFICATE.credentialId,
    skills: Array.isArray(initial?.skills) ? initial.skills.join(', ') : '',
    description: initial?.description ?? EMPTY_CERTIFICATE.description,
    image: initial?.image ?? EMPTY_CERTIFICATE.image,
    file: initial?.file ?? EMPTY_CERTIFICATE.file,
    verifyUrl: initial?.verifyUrl ?? '',
  });

  const [validationError, setValidationError] = useState('');

  const updateField =
    (fieldKey: keyof typeof formState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormState((prev) => ({ ...prev, [fieldKey]: event.target.value }));
      setValidationError('');
    };

  const handleSave = () => {
    const trimmedTitle = formState.title.trim();
    if (!trimmedTitle) {
      setValidationError('Certificate title is required.');
      return;
    }

    const parsedSkills = formState.skills
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    onSave({
      ...initial,
      title: trimmedTitle,
      date: formState.date.trim(),
      issuer: formState.issuer.trim(),
      category: formState.category.trim() || 'General',
      credentialId: formState.credentialId.trim(),
      skills: parsedSkills,
      description: formState.description.trim(),
      image: formState.image.trim(),
      file: formState.file.trim(),
      verifyUrl: formState.verifyUrl.trim() || null,
    });

    onClose();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {validationError && (
        <div
          role="alert"
          style={{
            padding: '8px 12px',
            background: 'var(--danger-soft)',
            border: '1px solid var(--danger)',
            color: 'var(--danger)',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {validationError}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <FormField label="Title *">
          <input
            className="form-input"
            value={formState.title}
            onChange={updateField('title')}
            placeholder="Agentic AI Certified Associate"
            maxLength={120}
          />
        </FormField>
        <FormField label="Date">
          <input
            className="form-input"
            value={formState.date}
            onChange={updateField('date')}
            placeholder="June 2026"
            maxLength={30}
          />
        </FormField>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <FormField label="Issuer">
          <input
            className="form-input"
            value={formState.issuer}
            onChange={updateField('issuer')}
            placeholder="Microsoft / DeepLearning.AI"
            maxLength={80}
          />
        </FormField>
        <FormField label="Category">
          <select
            className="form-input"
            value={formState.category}
            onChange={updateField('category')}
          >
            {CERTIFICATE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Credential ID">
        <input
          className="form-input"
          value={formState.credentialId}
          onChange={updateField('credentialId')}
          maxLength={100}
        />
      </FormField>

      <FormField label="Skills" hint="Comma-separated">
        <input
          className="form-input"
          value={formState.skills}
          onChange={updateField('skills')}
          placeholder="Python, Deep Learning, TensorFlow"
        />
      </FormField>

      <FormField label="Description">
        <textarea
          className="form-textarea"
          value={formState.description}
          onChange={updateField('description')}
          rows={3}
          maxLength={2000}
        />
      </FormField>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <FormField label="Image path" hint="/certificates/ml.png">
          <input className="form-input" value={formState.image} onChange={updateField('image')} />
        </FormField>
        <FormField label="PDF path" hint="/certificates/ml.pdf">
          <input className="form-input" value={formState.file} onChange={updateField('file')} />
        </FormField>
      </div>

      <FormField label="Verification URL">
        <input
          className="form-input"
          value={formState.verifyUrl}
          onChange={updateField('verifyUrl')}
          placeholder="https://..."
        />
      </FormField>

      <div
        style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}
      >
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Certificate →
        </button>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  accent?: boolean;
}

function StatCard({ icon, label, value, accent = false }: StatCardProps) {
  return (
    <div
      className="card card-hover"
      style={{
        padding: '1.5rem',
        borderTop: accent ? '2px solid var(--accent)' : '1px solid var(--border)',
      }}
    >
      <div
        style={{
          fontSize: '1.3rem',
          marginBottom: '0.6rem',
          color: accent ? 'var(--accent)' : 'var(--muted-2)',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.9rem',
          fontWeight: 800,
          color: 'var(--ink)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--muted-2)',
          marginTop: '5px',
        }}
      >
        {label}
      </div>
    </div>
  );
}

interface DashboardProps {
  onLogout: () => void;
}

type DashboardTab = 'overview' | 'projects' | 'certificates' | 'settings';

interface ModalState {
  type: 'project' | 'cert';
  item?: Project | Certificate | null;
}

interface DeleteState {
  type: 'project' | 'cert';
  id: string;
  title: string;
}

function Dashboard({ onLogout }: DashboardProps) {
  const {
    projects = [],
    certificates = [],
    addProject,
    updateProject,
    deleteProject,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    resetToDefaults,
  } = useData();

  const [currentTab, setCurrentTab] = useState<DashboardTab>('overview');
  const [activeModal, setActiveModal] = useState<ModalState | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteState | null>(null);

  const openAddModal = (type: 'project' | 'cert') => setActiveModal({ type, item: null });
  const openEditModal = (type: 'project' | 'cert', item: Project | Certificate) =>
    setActiveModal({ type, item });
  const closeModal = () => setActiveModal(null);

  const handleSaveProject = (projectData: Partial<Project>) => {
    const title = projectData.title ?? 'Untitled Project';
    if (activeModal?.item?.id) {
      updateProject(activeModal.item.id, projectData);
    } else {
      addProject({ ...projectData, title });
    }
  };

  const handleSaveCertificate = (certData: Partial<Certificate>) => {
    const title = certData.title ?? 'Untitled Certificate';
    if (activeModal?.item?.id) {
      updateCertificate(activeModal.item.id, certData);
    } else {
      addCertificate({ ...certData, title });
    }
  };

  const confirmDelete = (type: 'project' | 'cert', id: string, title: string) => {
    setDeleteConfirmation({ type, id, title });
  };

  const executeDelete = () => {
    if (!deleteConfirmation) return;
    if (deleteConfirmation.type === 'project') {
      deleteProject(deleteConfirmation.id);
    } else {
      deleteCertificate(deleteConfirmation.id);
    }
    setDeleteConfirmation(null);
  };

  const navigationTabs = [
    { id: 'overview' as const, label: 'Overview', icon: '◈' },
    { id: 'projects' as const, label: 'Projects', icon: '◎' },
    { id: 'certificates' as const, label: 'Certificates', icon: '◐' },
    { id: 'settings' as const, label: 'Settings', icon: '◉' },
  ];

  const SIDEBAR_WIDTH = 220;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '88px' }}>
      <aside
        style={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          padding: '1.5rem 0',
          position: 'fixed',
          top: '4.5rem',
          bottom: 0,
          zIndex: 10,
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            padding: '0 1.2rem 1.4rem',
            borderBottom: '1px solid var(--border)',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              fontSize: '0.9rem',
              fontWeight: 800,
              color: 'var(--ink)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Admin<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--muted-2)',
              marginTop: '4px',
            }}
          >
            Portfolio CMS
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 0.75rem' }}>
          {navigationTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`nav-link${isActive ? ' active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive ? 'var(--surface-2)' : 'transparent',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    color: isActive ? 'var(--accent)' : 'var(--muted-2)',
                  }}
                >
                  {tab.icon}
                </span>
                {tab.label}
                {tab.id === 'projects' && (
                  <span
                    className="tag"
                    style={{ marginLeft: 'auto', fontSize: '9px', padding: '1px 7px' }}
                  >
                    {projects.length}
                  </span>
                )}
                {tab.id === 'certificates' && (
                  <span
                    className="tag"
                    style={{ marginLeft: 'auto', fontSize: '9px', padding: '1px 7px' }}
                  >
                    {certificates.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div
          style={{
            padding: '0 0.75rem',
            position: 'absolute',
            bottom: '1.5rem',
            left: 0,
            right: 0,
          }}
        >
          <button
            onClick={onLogout}
            className="btn"
            style={{ width: '100%', justifyContent: 'center', fontSize: '10px' }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: SIDEBAR_WIDTH, padding: '2.5rem', minHeight: '100vh' }}>
        {currentTab === 'overview' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div className="label" style={{ marginBottom: '0.5rem' }}>
                Dashboard
              </div>
              <h2 style={{ fontSize: '2rem' }}>Welcome Back.</h2>
              <p style={{ marginTop: '0.4rem', color: 'var(--ink-2)' }}>
                Manage your portfolio systems and credentials. Changes persist locally in your
                browser.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '8px',
                marginBottom: '2rem',
              }}
            >
              <StatCard icon="◎" label="Projects" value={projects.length} accent />
              <StatCard icon="◐" label="Certificates" value={certificates.length} />
              <StatCard icon="◈" label="Skills" value="16+" />
              <StatCard icon="◉" label="Storage" value="Local" />
            </div>

            <div className="card card-hover" style={{ padding: '1.4rem', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--ink)' }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setCurrentTab('projects');
                    openAddModal('project');
                  }}
                >
                  + Add Project
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    setCurrentTab('certificates');
                    openAddModal('cert');
                  }}
                >
                  + Add Certificate
                </button>
                <a href="/" className="btn btn-sm">
                  View Site ↗
                </a>
              </div>
            </div>

            <div
              className="card"
              style={{
                padding: '1.1rem 1.4rem',
                background: 'var(--surface-2)',
                borderLeft: '2px solid var(--accent)',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: 'var(--accent)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    marginTop: '3px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  LOCAL-FIRST
                </span>
                <p
                  style={{
                    fontSize: '0.78rem',
                    lineHeight: 1.8,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--ink-2)',
                  }}
                >
                  Data is managed client-side within browser storage. Export JSON snapshots in the
                  Settings tab to backup or integrate with remote database backends.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'projects' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div className="label" style={{ marginBottom: '0.5rem' }}>
                  Content
                </div>
                <h2 style={{ fontSize: '1.8rem' }}>Projects</h2>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => openAddModal('project')}>
                + Add Project
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="card card-hover"
                  style={{
                    padding: '1.1rem 1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--ink)',
                        marginBottom: '0.15rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {project.title}
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--muted)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {project.shortDesc}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '3px',
                      flexShrink: 0,
                      maxWidth: 200,
                    }}
                  >
                    {(Array.isArray(project.technologies) ? project.technologies : [])
                      .slice(0, 3)
                      .map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--muted-2)',
                      flexShrink: 0,
                    }}
                  >
                    {project.year}
                  </span>

                  <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                    <button
                      className="btn btn-sm"
                      onClick={() => openEditModal('project', project)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => confirmDelete('project', project.id, project.title)}
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <div
                  className="card"
                  style={{
                    textAlign: 'center',
                    padding: '4rem',
                    borderStyle: 'dashed',
                    color: 'var(--muted-2)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                  }}
                >
                  No projects configured yet. Click &quot;+ Add Project&quot; to begin.
                </div>
              )}
            </div>
          </div>
        )}

        {currentTab === 'certificates' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div className="label" style={{ marginBottom: '0.5rem' }}>
                  Content
                </div>
                <h2 style={{ fontSize: '1.8rem' }}>Certificates</h2>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => openAddModal('cert')}>
                + Add Certificate
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {certificates.map((cert) => {
                const color = categoryColors[cert.category] || '#5C6A99';
                return (
                  <div
                    key={cert.id}
                    className="card card-hover"
                    style={{
                      padding: '1.1rem 1.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.2rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '8px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        background: `${color}16`,
                        color,
                        border: `1px solid ${color}35`,
                        padding: '2px 8px',
                        flexShrink: 0,
                        borderRadius: 0,
                      }}
                    >
                      {cert.category}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: 'var(--ink)',
                          marginBottom: '0.15rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {cert.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                        {cert.issuer}
                      </div>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: 'var(--muted-2)',
                        flexShrink: 0,
                      }}
                    >
                      {cert.date}
                    </span>

                    <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                      <button className="btn btn-sm" onClick={() => openEditModal('cert', cert)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => confirmDelete('cert', cert.id, cert.title)}
                      >
                        Del
                      </button>
                    </div>
                  </div>
                );
              })}

              {certificates.length === 0 && (
                <div
                  className="card"
                  style={{
                    textAlign: 'center',
                    padding: '4rem',
                    borderStyle: 'dashed',
                    color: 'var(--muted-2)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                  }}
                >
                  No certificates configured yet. Click &quot;+ Add Certificate&quot; to begin.
                </div>
              )}
            </div>
          </div>
        )}

        {currentTab === 'settings' && (
          <div style={{ maxWidth: 540 }}>
            <div style={{ marginBottom: '2rem' }}>
              <div className="label" style={{ marginBottom: '0.5rem' }}>
                Configuration
              </div>
              <h2 style={{ fontSize: '1.8rem' }}>Settings</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="card card-hover" style={{ padding: '1.4rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--ink)' }}>Reset to Defaults</h3>
                <p style={{ fontSize: '0.82rem', marginBottom: '1.1rem', color: 'var(--ink-2)' }}>
                  Discard local custom modifications and restore original packaged dataset.
                </p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (
                      window.confirm('Reset ALL data to bundled defaults? This cannot be undone.')
                    ) {
                      resetToDefaults();
                    }
                  }}
                >
                  Reset to Defaults
                </button>
              </div>

              <div className="card card-hover" style={{ padding: '1.4rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--ink)' }}>
                  Environment Variables
                </h3>
                <p style={{ fontSize: '0.82rem', marginBottom: '1rem', color: 'var(--ink-2)' }}>
                  Configure secrets and endpoints within <code>.env</code>:
                </p>
                <pre
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    padding: '1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--muted)',
                    overflowX: 'auto',
                    lineHeight: 1.8,
                  }}
                >
                  {'VITE_ADMIN_PASSWORD_HASH=your_sha256_hash_here\nVITE_CONTACT_API=https:' +
                    '//api.akashkundu.me/api/contact'}
                </pre>
              </div>

              <div className="card card-hover" style={{ padding: '1.4rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--ink)' }}>Export Snapshot</h3>
                <p style={{ fontSize: '0.82rem', marginBottom: '1.1rem', color: 'var(--ink-2)' }}>
                  Export all active projects and credentials as a JSON file.
                </p>
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    const serializedData = JSON.stringify({ projects, certificates }, null, 2);
                    const blob = new Blob([serializedData], { type: 'application/json' });
                    const downloadUrl = URL.createObjectURL(blob);
                    const anchorElement = document.createElement('a');
                    anchorElement.href = downloadUrl;
                    anchorElement.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
                    anchorElement.click();
                    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
                  }}
                >
                  ↓ Export portfolio-data.json
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {activeModal?.type === 'project' && (
        <Modal title={activeModal.item ? 'Edit Project' : 'New Project'} onClose={closeModal}>
          <ProjectForm
            initial={activeModal.item ?? undefined}
            onSave={handleSaveProject}
            onClose={closeModal}
          />
        </Modal>
      )}

      {activeModal?.type === 'cert' && (
        <Modal
          title={activeModal.item ? 'Edit Certificate' : 'New Certificate'}
          onClose={closeModal}
        >
          <CertForm
            initial={activeModal.item ?? undefined}
            onSave={handleSaveCertificate}
            onClose={closeModal}
          />
        </Modal>
      )}

      {deleteConfirmation && (
        <Modal title="Confirm Permanent Deletion" onClose={() => setDeleteConfirmation(null)}>
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--ink-2)',
            }}
          >
            Are you sure you want to delete{' '}
            <strong style={{ color: 'var(--ink)' }}>&quot;{deleteConfirmation.title}&quot;</strong>?
            This action cannot be reverted.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button className="btn" onClick={() => setDeleteConfirmation(null)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={executeDelete}>
              Delete Permanently
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('_adminAuthed') === '1';
    } catch {
      return false;
    }
  });

  const handleLoginSuccess = useCallback(() => {
    try {
      sessionStorage.setItem('_adminAuthed', '1');
    } catch (e) {
      void e;
    }
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    try {
      sessionStorage.removeItem('_adminAuthed');
    } catch (e) {
      void e;
    }
    setIsAuthenticated(false);
  }, []);

  return (
    <PageTransition>
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginScreen onSuccess={handleLoginSuccess} />
      )}
    </PageTransition>
  );
}
