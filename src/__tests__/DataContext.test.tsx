import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { DataProvider, useData } from '../context/DataContext';
import { projects as staticProjects } from '../data/projects';
import { certificates as staticCertificates } from '../data/certificates';

describe('DataContext and useData Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <DataProvider>{children}</DataProvider>
  );

  it('throws an error when useData is used outside of DataProvider', () => {
    expect(() => renderHook(() => useData())).toThrow(
      'useData must be used inside <DataProvider>'
    );
  });

  it('provides initial projects and certificates from static data when localStorage is empty', () => {
    const { result } = renderHook(() => useData(), { wrapper });

    expect(result.current.projects).toEqual(staticProjects);
    expect(result.current.certificates).toEqual(staticCertificates);
  });

  it('loads existing data from localStorage when available', () => {
    const customProject = [
      {
        ...staticProjects[0],
        id: 'custom-proj-1',
        title: 'Custom Pre-existing Project',
      },
    ];
    localStorage.setItem('portfolio_projects', JSON.stringify(customProject));

    const { result } = renderHook(() => useData(), { wrapper });
    expect(result.current.projects).toEqual(customProject);
  });

  it('safely falls back to static data when localStorage contains malformed JSON or empty array', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    localStorage.setItem('portfolio_projects', 'invalid json {{{');
    localStorage.setItem('portfolio_certificates', '[]');

    const { result } = renderHook(() => useData(), { wrapper });

    expect(result.current.projects).toEqual(staticProjects);
    expect(result.current.certificates).toEqual(staticCertificates);
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  describe('Project operations', () => {
    it('adds a new project with generated id and persists to state & localStorage', () => {
      const { result } = renderHook(() => useData(), { wrapper });
      const initialCount = result.current.projects.length;

      const newProjData = {
        title: 'New Autonomous Agent',
        status: 'In Progress',
        shortDesc: 'Test description',
        description: 'Detailed description',
        problem: 'Test problem',
        technologies: ['TypeScript', 'FastAPI'],
        year: '2026',
        features: ['Feature 1'],
      };

      act(() => {
        result.current.addProject(newProjData);
      });

      expect(result.current.projects.length).toBe(initialCount + 1);
      const added = result.current.projects[result.current.projects.length - 1];
      expect(added.title).toBe(newProjData.title);
      expect(added.id).toMatch(/^proj-\d+$/);
      expect(added.screenshots).toEqual([]);

      const stored = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
      expect(stored.length).toBe(initialCount + 1);
      expect(stored[stored.length - 1].id).toBe(added.id);
    });

    it('updates an existing project by ID while preserving others', () => {
      const { result } = renderHook(() => useData(), { wrapper });
      const targetId = result.current.projects[0].id;
      const originalTitle = result.current.projects[0].title;
      const updatedTitle = 'Modified Autonomous Agent V2';

      act(() => {
        result.current.updateProject(targetId, { title: updatedTitle });
      });

      const updatedProj = result.current.projects.find((p) => p.id === targetId);
      expect(updatedProj?.title).toBe(updatedTitle);
      expect(updatedProj?.title).not.toBe(originalTitle);

      // Other projects should remain untouched
      expect(result.current.projects[1].title).toBe(staticProjects[1].title);

      const stored = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
      expect(stored[0].title).toBe(updatedTitle);
    });

    it('handles updating with empty or non-existent project ID gracefully', () => {
      const { result } = renderHook(() => useData(), { wrapper });
      const initialProjects = [...result.current.projects];

      act(() => {
        result.current.updateProject('', { title: 'No-op update' });
        result.current.updateProject('ghost-id-999', { title: 'No-op update' });
      });

      expect(result.current.projects).toEqual(initialProjects);
    });

    it('deletes a project by ID and updates localStorage', () => {
      const { result } = renderHook(() => useData(), { wrapper });
      const targetId = result.current.projects[0].id;
      const initialCount = result.current.projects.length;

      act(() => {
        result.current.deleteProject(targetId);
      });

      expect(result.current.projects.length).toBe(initialCount - 1);
      expect(result.current.projects.some((p) => p.id === targetId)).toBe(false);

      const stored = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
      expect(stored.length).toBe(initialCount - 1);
    });

    it('handles deleting with empty or non-existent project ID gracefully', () => {
      const { result } = renderHook(() => useData(), { wrapper });
      const initialCount = result.current.projects.length;

      act(() => {
        result.current.deleteProject('');
        result.current.deleteProject('non-existent-id');
      });

      expect(result.current.projects.length).toBe(initialCount);
    });
  });

  describe('Certificate operations', () => {
    it('adds a new certificate with generated id and defaults skills to empty array if omitted', () => {
      const { result } = renderHook(() => useData(), { wrapper });
      const initialCount = result.current.certificates.length;

      const newCertData = {
        title: 'Deep Learning Specialization',
        issuer: 'DeepLearning.AI',
        date: 'September 2026',
        credentialId: 'DL-999',
        category: 'AI/ML',
        image: '/certs/dl.png',
        file: '/certs/dl.pdf',
        verifyUrl: 'https://example.com/dl',
        description: 'Comprehensive deep learning mastery',
      };

      act(() => {
        result.current.addCertificate(newCertData);
      });

      expect(result.current.certificates.length).toBe(initialCount + 1);
      const added = result.current.certificates[result.current.certificates.length - 1];
      expect(added.title).toBe(newCertData.title);
      expect(added.id).toMatch(/^cert-\d+$/);
      expect(added.skills).toEqual([]);

      const stored = JSON.parse(localStorage.getItem('portfolio_certificates') || '[]');
      expect(stored.length).toBe(initialCount + 1);
    });

    it('updates an existing certificate by ID', () => {
      const { result } = renderHook(() => useData(), { wrapper });
      const targetId = result.current.certificates[0].id;

      act(() => {
        result.current.updateCertificate(targetId, { title: 'Updated Cert Title' });
      });

      const updated = result.current.certificates.find((c) => c.id === targetId);
      expect(updated?.title).toBe('Updated Cert Title');
    });

    it('handles updating with empty or non-existent certificate ID gracefully', () => {
      const { result } = renderHook(() => useData(), { wrapper });
      const initialCerts = [...result.current.certificates];

      act(() => {
        result.current.updateCertificate('', { title: 'No-op' });
        result.current.updateCertificate('ghost-cert-999', { title: 'No-op' });
      });

      expect(result.current.certificates).toEqual(initialCerts);
    });

    it('deletes a certificate by ID', () => {
      const { result } = renderHook(() => useData(), { wrapper });
      const targetId = result.current.certificates[0].id;
      const initialCount = result.current.certificates.length;

      act(() => {
        result.current.deleteCertificate(targetId);
      });

      expect(result.current.certificates.length).toBe(initialCount - 1);
      expect(result.current.certificates.some((c) => c.id === targetId)).toBe(false);
    });

    it('handles deleting with empty or non-existent certificate ID gracefully', () => {
      const { result } = renderHook(() => useData(), { wrapper });
      const initialCount = result.current.certificates.length;

      act(() => {
        result.current.deleteCertificate('');
        result.current.deleteCertificate('ghost-cert-id');
      });

      expect(result.current.certificates.length).toBe(initialCount);
    });
  });

  describe('Reset and error resilience', () => {
    it('resets state and storage back to default static data', () => {
      const { result } = renderHook(() => useData(), { wrapper });

      // Mutate state
      act(() => {
        result.current.deleteProject(result.current.projects[0].id);
        result.current.deleteCertificate(result.current.certificates[0].id);
      });

      expect(result.current.projects.length).toBe(staticProjects.length - 1);
      expect(result.current.certificates.length).toBe(staticCertificates.length - 1);

      // Trigger reset
      act(() => {
        result.current.resetToDefaults();
      });

      expect(result.current.projects).toEqual(staticProjects);
      expect(result.current.certificates).toEqual(staticCertificates);
    });

    it('catches and logs localStorage errors gracefully when storage quota is exceeded', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      const { result } = renderHook(() => useData(), { wrapper });

      expect(() => {
        act(() => {
          result.current.addProject({ title: 'Crash Test Project' });
        });
      }).not.toThrow();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[DataContext] Failed to write "portfolio_projects" to localStorage:',
        expect.any(Error)
      );
    });
  });
});
