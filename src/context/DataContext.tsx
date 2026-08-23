import { createContext, useContext, useState, useEffect } from 'react';
import { projects as staticProjects } from '../data/projects';
import { certificates as staticCertificates } from '../data/certificates';

const DataContext = createContext<any>(null);

function readStore(key: string, fallback: any) {
  try {
    const raw = localStorage.getItem(key);
    // TEMPORARILY disable localStorage return to force hardcoded metrics
    // return raw ? JSON.parse(raw) : fallback;
    return fallback;
  } catch {
    return fallback;
  }
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState(() => readStore('portfolio_projects', staticProjects));
  const [certificates, setCertificates] = useState(() =>
    readStore('portfolio_certificates', staticCertificates)
  );

  // Force sync whenever static data changes
  useEffect(() => {
    setProjects(staticProjects);
    setCertificates(staticCertificates);
    localStorage.setItem('portfolio_projects', JSON.stringify(staticProjects));
    localStorage.setItem('portfolio_certificates', JSON.stringify(staticCertificates));
  }, []);

  const persist = (key: string, setter: any) => (data: any) => {
    setter(data);
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('LocalStorage error', e);
    }
  };
  const saveProjects = persist('portfolio_projects', setProjects);
  const saveCertificates = persist('portfolio_certificates', setCertificates);

  const addProject = (p: any) =>
    saveProjects([...projects, { ...p, id: `proj-${Date.now()}`, screenshots: [] }]);

  const updateProject = (id: string, updates: any) =>
    saveProjects(projects.map((p: any) => (p.id === id ? { ...p, ...updates } : p)));

  const deleteProject = (id: string) => saveProjects(projects.filter((p: any) => p.id !== id));

  const addCertificate = (c: any) =>
    saveCertificates([...certificates, { ...c, id: `cert-${Date.now()}`, skills: c.skills ?? [] }]);

  const updateCertificate = (id: string, updates: any) =>
    saveCertificates(certificates.map((c: any) => (c.id === id ? { ...c, ...updates } : c)));

  const deleteCertificate = (id: string) => saveCertificates(certificates.filter((c: any) => c.id !== id));

  const resetToDefaults = () => {
    saveProjects(staticProjects);
    saveCertificates(staticCertificates);
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        certificates,
        addProject,
        updateProject,
        deleteProject,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside <DataProvider>');
  return ctx;
};
