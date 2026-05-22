/**
 * DataContext — replaces static data file imports across the app.
 *
 * Data priority:  localStorage (admin edits)  >  bundled static files
 * Admin can add/edit/delete projects & certificates; changes persist in the
 * browser and are picked up by every page on next render.
 *
 * To wire up a real backend later, replace the localStorage calls in
 * saveProjects / saveCertificates with fetch() calls to your API.
 */
import { createContext, useContext, useState } from 'react'
import { projects  as staticProjects  } from '../data/projects'
import { certificates as staticCertificates } from '../data/certificates'

const DataContext = createContext(null)

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(() =>
    readStore('portfolio_projects', staticProjects)
  )
  const [certificates, setCertificates] = useState(() =>
    readStore('portfolio_certificates', staticCertificates)
  )

  /* ── internal persist helpers ── */
  const persist = (key, setter) => (data) => {
    setter(data)
    try { localStorage.setItem(key, JSON.stringify(data)) } catch { /* quota */ }
  }
  const saveProjects     = persist('portfolio_projects', setProjects)
  const saveCertificates = persist('portfolio_certificates', setCertificates)

  /* ── projects CRUD ── */
  const addProject = (p) =>
    saveProjects([...projects, { ...p, id: `proj-${Date.now()}`, screenshots: [] }])

  const updateProject = (id, updates) =>
    saveProjects(projects.map(p => (p.id === id ? { ...p, ...updates } : p)))

  const deleteProject = (id) =>
    saveProjects(projects.filter(p => p.id !== id))

  /* ── certificates CRUD ── */
  const addCertificate = (c) =>
    saveCertificates([...certificates, { ...c, id: `cert-${Date.now()}`, skills: c.skills ?? [] }])

  const updateCertificate = (id, updates) =>
    saveCertificates(certificates.map(c => (c.id === id ? { ...c, ...updates } : c)))

  const deleteCertificate = (id) =>
    saveCertificates(certificates.filter(c => c.id !== id))

  /* ── hard reset ── */
  const resetToDefaults = () => {
    saveProjects(staticProjects)
    saveCertificates(staticCertificates)
  }

  return (
    <DataContext.Provider value={{
      projects, certificates,
      addProject, updateProject, deleteProject,
      addCertificate, updateCertificate, deleteCertificate,
      resetToDefaults,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used inside <DataProvider>')
  return ctx
}
