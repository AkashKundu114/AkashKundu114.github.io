import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { projects as staticProjects, type Project } from '../data/projects';
import { certificates as staticCertificates, type Certificate } from '../data/certificates';

export interface DataContextValue {
  projects: Project[];
  certificates: Certificate[];
  addProject: (project: Partial<Project> & { title: string }) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addCertificate: (certificate: Partial<Certificate> & { title: string }) => void;
  updateCertificate: (id: string, updates: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEYS = {
  PROJECTS: 'portfolio_projects',
  CERTIFICATES: 'portfolio_certificates',
} as const;

/**
 * Safely reads and parses JSON from localStorage with robust error handling
 * for privacy sandboxes (e.g., SecurityError) and malformed payloads.
 */
function safeReadStore<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null || parsed === undefined) return fallback;

    if (Array.isArray(fallback) && (!Array.isArray(parsed) || parsed.length === 0)) {
      return fallback;
    }

    return parsed as T;
  } catch (error) {
    console.warn(`[DataContext] Failed to read "${key}" from localStorage:`, error);
    return fallback;
  }
}

/**
 * Safely persists an item into localStorage, catching security or quota exceptions.
 */
function safeWriteStore<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[DataContext] Failed to write "${key}" to localStorage:`, error);
    return false;
  }
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() =>
    safeReadStore<Project[]>(STORAGE_KEYS.PROJECTS, staticProjects)
  );
  const [certificates, setCertificates] = useState<Certificate[]>(() =>
    safeReadStore<Certificate[]>(STORAGE_KEYS.CERTIFICATES, staticCertificates)
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
        safeWriteStore(STORAGE_KEYS.PROJECTS, staticProjects);
      }
      if (!window.localStorage.getItem(STORAGE_KEYS.CERTIFICATES)) {
        safeWriteStore(STORAGE_KEYS.CERTIFICATES, staticCertificates);
      }
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    safeWriteStore(STORAGE_KEYS.PROJECTS, newProjects);
  };

  const saveCertificates = (newCertificates: Certificate[]) => {
    setCertificates(newCertificates);
    safeWriteStore(STORAGE_KEYS.CERTIFICATES, newCertificates);
  };

  const addProject = (projectData: Partial<Project> & { title: string }) => {
    const newProject: Project = {
      id: projectData.id || `proj-${Date.now()}`,
      title: projectData.title || 'Untitled Project',
      status: projectData.status || 'In Progress',
      shortDesc: projectData.shortDesc || '',
      description: projectData.description || '',
      problem: projectData.problem || '',
      aiArchitecture: projectData.aiArchitecture || {
        heading: '',
        body: '',
        points: [],
        stack: [],
      },
      uiDeployment: projectData.uiDeployment || {
        heading: '',
        body: '',
        points: [],
        deployed: '',
        stack: [],
      },
      technologies: projectData.technologies || [],
      year: projectData.year || new Date().getFullYear().toString(),
      github: projectData.github || null,
      liveLink: projectData.liveLink || null,
      features: projectData.features || [],
      screenshots: projectData.screenshots || [],
      ...projectData,
    };
    saveProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    if (!id) return;
    saveProjects(
      projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      )
    );
  };

  const deleteProject = (id: string) => {
    if (!id) return;
    saveProjects(projects.filter((project) => project.id !== id));
  };

  const addCertificate = (certificateData: Partial<Certificate> & { title: string }) => {
    const newCertificate: Certificate = {
      id: certificateData.id || `cert-${Date.now()}`,
      title: certificateData.title || 'Untitled Certificate',
      issuer: certificateData.issuer || '',
      date: certificateData.date || '',
      credentialId: certificateData.credentialId || '',
      category: certificateData.category || 'General',
      skills: certificateData.skills || [],
      image: certificateData.image || '',
      file: certificateData.file || '',
      verifyUrl: certificateData.verifyUrl || null,
      description: certificateData.description || '',
      ...certificateData,
    };
    saveCertificates([...certificates, newCertificate]);
  };

  const updateCertificate = (id: string, updates: Partial<Certificate>) => {
    if (!id) return;
    saveCertificates(
      certificates.map((cert) =>
        cert.id === id ? { ...cert, ...updates } : cert
      )
    );
  };

  const deleteCertificate = (id: string) => {
    if (!id) return;
    saveCertificates(certificates.filter((cert) => cert.id !== id));
  };

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

export const useData = (): DataContextValue => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData must be used inside <DataProvider>');
  }
  return ctx;
};
