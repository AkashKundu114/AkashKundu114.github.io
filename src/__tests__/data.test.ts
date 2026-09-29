import { describe, it, expect } from 'vitest';
import {
  projects,
  getProjectById,
  getProjectsByTechnology,
  searchProjects,
  getAllTechnologies,
  Project,
} from '../data/projects';
import {
  skills,
  getGroupedSkills,
  getSkillByName,
  getSkillsByCategory,
  searchSkills,
  Skill,
} from '../data/skills';
import {
  education,
  getEducationById,
  getCurrentEducation,
  getSortedEducation,
  Education,
} from '../data/education';
import {
  certificates,
  categoryColors,
  getCertificateById,
  getCertificatesByCategory,
  getCertificatesBySkill,
  searchCertificates,
  Certificate,
} from '../data/certificates';

describe('Data Module: projects.ts', () => {
  it('contains a valid non-empty list of projects', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('ensures each project has unique ID and required fields populated', () => {
    const ids = new Set<string>();

    projects.forEach((proj: Project) => {
      expect(proj.id).toBeDefined();
      expect(typeof proj.id).toBe('string');
      expect(proj.id.trim().length).toBeGreaterThan(0);

      // Unique ID check
      expect(ids.has(proj.id)).toBe(false);
      ids.add(proj.id);

      expect(typeof proj.title).toBe('string');
      expect(proj.title.trim().length).toBeGreaterThan(0);

      expect(typeof proj.status).toBe('string');
      expect(typeof proj.shortDesc).toBe('string');
      expect(proj.shortDesc.trim().length).toBeGreaterThan(0);

      expect(typeof proj.description).toBe('string');
      expect(typeof proj.problem).toBe('string');

      // AI Architecture checks
      expect(proj.aiArchitecture).toBeDefined();
      expect(typeof proj.aiArchitecture.heading).toBe('string');
      expect(typeof proj.aiArchitecture.body).toBe('string');
      expect(Array.isArray(proj.aiArchitecture.points)).toBe(true);
      expect(Array.isArray(proj.aiArchitecture.stack)).toBe(true);

      // UI Deployment checks
      expect(proj.uiDeployment).toBeDefined();
      expect(typeof proj.uiDeployment.heading).toBe('string');
      expect(typeof proj.uiDeployment.body).toBe('string');
      expect(Array.isArray(proj.uiDeployment.points)).toBe(true);
      expect(Array.isArray(proj.uiDeployment.stack)).toBe(true);
      expect(typeof proj.uiDeployment.deployed).toBe('string');

      // Technologies and features
      expect(Array.isArray(proj.technologies)).toBe(true);
      expect(proj.technologies.length).toBeGreaterThan(0);
      expect(Array.isArray(proj.features)).toBe(true);
      expect(proj.features.length).toBeGreaterThan(0);

      // Year and screenshots
      expect(typeof proj.year).toBe('string');
      expect(/^\d{4}$/.test(proj.year)).toBe(true);
      expect(Array.isArray(proj.screenshots)).toBe(true);
      proj.screenshots.forEach((s) => {
        expect(typeof s.src).toBe('string');
        expect(typeof s.caption).toBe('string');
      });
    });
  });

  describe('Project lookups and boundary checks', () => {
    it('finds project by ID accurately', () => {
      const target = projects[0];
      const found = projects.find((p) => p.id === target.id);
      expect(found).toBeDefined();
      expect(found?.title).toBe(target.title);
    });

    it('returns undefined for non-existent or invalid project ID', () => {
      const nonExistent = projects.find((p) => p.id === 'invalid-project-id-999');
      expect(nonExistent).toBeUndefined();

      const emptyId = projects.find((p) => p.id === '');
      expect(emptyId).toBeUndefined();
    });

    it('filters projects by technology accurately', () => {
      const pythonProjects = projects.filter((p) =>
        p.technologies.some((tech) => tech.toLowerCase() === 'python')
      );
      expect(pythonProjects.length).toBeGreaterThan(0);
      pythonProjects.forEach((p) => {
        const hasPython = p.technologies.some((t) => t.toLowerCase() === 'python');
        expect(hasPython).toBe(true);
      });

      // Boundary: non-existent technology
      const nonExistentTech = projects.filter((p) =>
        p.technologies.includes('CobolAncientLanguage99')
      );
      expect(nonExistentTech).toHaveLength(0);
    });

    it('searches projects by keyword in title or description', () => {
      const searchProjects = (query: string): Project[] => {
        if (!query || !query.trim()) return [];
        const q = query.trim().toLowerCase();
        return projects.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.shortDesc.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
      };

      expect(searchProjects('')).toHaveLength(0);
      expect(searchProjects('   ')).toHaveLength(0);

      const aiResults = searchProjects('AI');
      expect(aiResults.length).toBeGreaterThan(0);

      const unknownResults = searchProjects('xyzNonExistentQueryAbc123');
      expect(unknownResults).toHaveLength(0);
    });
  });
});

describe('Data Module: skills.ts', () => {
  it('contains a valid non-empty list of skills with positive IDs and strings', () => {
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);

    const ids = new Set<number>();
    skills.forEach((skill: Skill) => {
      expect(typeof skill.id).toBe('number');
      expect(skill.id).toBeGreaterThan(0);
      expect(ids.has(skill.id)).toBe(false);
      ids.add(skill.id);

      expect(typeof skill.name).toBe('string');
      expect(skill.name.trim().length).toBeGreaterThan(0);
      expect(typeof skill.category).toBe('string');
      expect(skill.category.trim().length).toBeGreaterThan(0);
    });
  });

  describe('getGroupedSkills()', () => {
    it('correctly groups skills by category without loss of entries', () => {
      const grouped = getGroupedSkills();
      expect(typeof grouped).toBe('object');
      expect(grouped).not.toBeNull();

      const expectedCategories = [
        'Languages',
        'AI & ML',
        'Backend & DB',
        'Full-Stack UI',
        'Cloud & DevOps',
      ];
      expectedCategories.forEach((cat) => {
        expect(grouped[cat]).toBeDefined();
        expect(Array.isArray(grouped[cat])).toBe(true);
        expect(grouped[cat].length).toBeGreaterThan(0);
      });

      // Total count across all categories must equal skills.length
      const totalGrouped = Object.values(grouped).reduce((sum, list) => sum + list.length, 0);
      expect(totalGrouped).toBe(skills.length);

      // Verify skills match the category key
      Object.entries(grouped).forEach(([cat, list]) => {
        list.forEach((item) => {
          expect(item.category).toBe(cat);
        });
      });
    });

    it('returns empty list for non-existent category lookups', () => {
      const grouped = getGroupedSkills();
      expect(grouped['NonExistentCategory']).toBeUndefined();
    });
  });

  describe('Skill lookups', () => {
    it('finds skill by exact or case-insensitive name', () => {
      const findSkill = (name: string): Skill | undefined =>
        skills.find((s) => s.name.toLowerCase() === name.trim().toLowerCase());

      expect(findSkill('TypeScript')).toBeDefined();
      expect(findSkill('typescript')).toBeDefined();
      expect(findSkill('  Python  ')).toBeDefined();
      expect(findSkill('')).toBeUndefined();
      expect(findSkill('NonExistentSkillXYZ')).toBeUndefined();
    });
  });
});

describe('Data Module: education.ts', () => {
  it('contains valid education entries with unique IDs', () => {
    expect(Array.isArray(education)).toBe(true);
    expect(education.length).toBeGreaterThan(0);

    const ids = new Set<number>();
    education.forEach((item: Education) => {
      expect(typeof item.id).toBe('number');
      expect(item.id).toBeGreaterThan(0);
      expect(ids.has(item.id)).toBe(false);
      ids.add(item.id);

      expect(typeof item.degree).toBe('string');
      expect(typeof item.institution).toBe('string');
      expect(typeof item.location).toBe('string');
      expect(typeof item.startYear).toBe('string');
      expect(typeof item.endYear).toBe('string');
      expect(typeof item.grade).toBe('string');
      expect(typeof item.current).toBe('boolean');
      if (item.description) {
        expect(typeof item.description).toBe('string');
      }
    });
  });

  it('has at least one ongoing or active degree', () => {
    const currentEdu = education.find((e) => e.current);
    expect(currentEdu).toBeDefined();
    expect(currentEdu?.degree).toContain('B.Tech');
  });

  it('handles lookups and boundary checks correctly', () => {
    const findEducationById = (id: number) => education.find((e) => e.id === id);

    expect(findEducationById(1)).toBeDefined();
    expect(findEducationById(-1)).toBeUndefined();
    expect(findEducationById(9999)).toBeUndefined();
  });
});

describe('Data Module: certificates.ts', () => {
  it('contains valid certificates with non-empty attributes and valid URLs/files', () => {
    expect(Array.isArray(certificates)).toBe(true);
    expect(certificates.length).toBeGreaterThan(0);

    const ids = new Set<string>();
    certificates.forEach((cert: Certificate) => {
      expect(typeof cert.id).toBe('string');
      expect(cert.id.trim().length).toBeGreaterThan(0);
      expect(ids.has(cert.id)).toBe(false);
      ids.add(cert.id);

      expect(typeof cert.title).toBe('string');
      expect(typeof cert.issuer).toBe('string');
      expect(typeof cert.date).toBe('string');
      expect(typeof cert.credentialId).toBe('string');
      expect(typeof cert.category).toBe('string');
      expect(Array.isArray(cert.skills)).toBe(true);
      expect(typeof cert.image).toBe('string');
      expect(typeof cert.file).toBe('string');
      expect(typeof cert.description).toBe('string');

      if (cert.verifyUrl !== null) {
        expect(typeof cert.verifyUrl).toBe('string');
        expect(cert.verifyUrl.startsWith('http')).toBe(true);
      }
    });
  });

  it('defines valid hex colors for all certificate categories', () => {
    expect(typeof categoryColors).toBe('object');

    // Every category used in certificates must be present in categoryColors
    const uniqueCategories = new Set(certificates.map((c) => c.category));
    uniqueCategories.forEach((cat) => {
      expect(categoryColors[cat]).toBeDefined();
      expect(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(categoryColors[cat])).toBe(true);
    });
  });

  describe('Certificate lookups and filtering', () => {
    it('finds certificate by ID or returns undefined for missing ID', () => {
      const firstCert = certificates[0];
      const found = certificates.find((c) => c.id === firstCert.id);
      expect(found).toEqual(firstCert);

      expect(certificates.find((c) => c.id === '')).toBeUndefined();
      expect(certificates.find((c) => c.id === 'ghost-certificate-id')).toBeUndefined();
    });

    it('filters certificates by category', () => {
      const aiCerts = certificates.filter((c) => c.category === 'AI/ML');
      expect(aiCerts.length).toBeGreaterThan(0);
      aiCerts.forEach((c) => expect(c.category).toBe('AI/ML'));

      const unknownCerts = certificates.filter((c) => c.category === 'Astronomy');
      expect(unknownCerts).toHaveLength(0);
    });

    it('filters certificates by skill tag', () => {
      const filterBySkill = (skillName: string): Certificate[] => {
        if (!skillName.trim()) return [];
        const target = skillName.trim().toLowerCase();
        return certificates.filter((c) =>
          c.skills.some((s) => s.toLowerCase() === target)
        );
      };

      const agenticCerts = filterBySkill('AI Agents');
      expect(agenticCerts.length).toBeGreaterThan(0);

      expect(filterBySkill('')).toHaveLength(0);
      expect(filterBySkill('NonExistentSkill123')).toHaveLength(0);
    });
  });

  describe('Exported Certificate Helpers with Boundary Checks', () => {
    it('getCertificateById handles existing, missing, and invalid IDs', () => {
      const first = certificates[0];
      expect(getCertificateById(first.id)?.title).toBe(first.title);
      expect(getCertificateById('')).toBeUndefined();
      expect(getCertificateById('   ')).toBeUndefined();
      expect(getCertificateById(null as unknown as string)).toBeUndefined();
      expect(getCertificateById('does-not-exist')).toBeUndefined();
    });

    it('getCertificatesByCategory filters correctly with boundary checks', () => {
      expect(getCertificatesByCategory('AI/ML').length).toBeGreaterThan(0);
      expect(getCertificatesByCategory('ai/ml').length).toBeGreaterThan(0);
      expect(getCertificatesByCategory('')).toHaveLength(0);
      expect(getCertificatesByCategory(null as unknown as string)).toHaveLength(0);
      expect(getCertificatesByCategory('NonExistentCategory')).toHaveLength(0);
    });

    it('getCertificatesBySkill filters by skill with boundary checks', () => {
      expect(getCertificatesBySkill('AI Agents').length).toBeGreaterThan(0);
      expect(getCertificatesBySkill('ai agents').length).toBeGreaterThan(0);
      expect(getCertificatesBySkill('')).toHaveLength(0);
      expect(getCertificatesBySkill(undefined as unknown as string)).toHaveLength(0);
    });

    it('searchCertificates matches terms across multiple fields', () => {
      expect(searchCertificates('Azure').length).toBeGreaterThan(0);
      expect(searchCertificates('azure').length).toBeGreaterThan(0);
      expect(searchCertificates('')).toHaveLength(0);
      expect(searchCertificates('   ')).toHaveLength(0);
      expect(searchCertificates('unlikelyQueryPattern12345')).toHaveLength(0);
    });
  });
});

describe('Exported Project Helpers with Boundary Checks', () => {
  it('getProjectById handles valid and invalid IDs', () => {
    const first = projects[0];
    expect(getProjectById(first.id)?.title).toBe(first.title);
    expect(getProjectById('')).toBeUndefined();
    expect(getProjectById('   ')).toBeUndefined();
    expect(getProjectById(undefined as unknown as string)).toBeUndefined();
  });

  it('getProjectsByTechnology filters accurately with case insensitivity', () => {
    expect(getProjectsByTechnology('Python').length).toBeGreaterThan(0);
    expect(getProjectsByTechnology('python').length).toBeGreaterThan(0);
    expect(getProjectsByTechnology('')).toHaveLength(0);
    expect(getProjectsByTechnology('CobolNotFound')).toHaveLength(0);
  });

  it('searchProjects matches fields and handles invalid input', () => {
    expect(searchProjects('FastAPI').length).toBeGreaterThan(0);
    expect(searchProjects('').length).toBe(0);
    expect(searchProjects('   ').length).toBe(0);
    expect(searchProjects('randomNonSenseStringXYZ').length).toBe(0);
  });

  it('getAllTechnologies returns a deduplicated, sorted list', () => {
    const techs = getAllTechnologies();
    expect(Array.isArray(techs)).toBe(true);
    expect(techs.length).toBeGreaterThan(0);
    const set = new Set(techs);
    expect(set.size).toBe(techs.length);
  });
});

describe('Exported Skill Helpers with Boundary Checks', () => {
  it('getSkillByName finds skills safely', () => {
    expect(getSkillByName('Python')?.category).toBe('Languages');
    expect(getSkillByName('python')?.category).toBe('Languages');
    expect(getSkillByName('')).toBeUndefined();
    expect(getSkillByName('   ')).toBeUndefined();
  });

  it('getSkillsByCategory filters safely', () => {
    expect(getSkillsByCategory('Languages').length).toBeGreaterThan(0);
    expect(getSkillsByCategory('languages').length).toBeGreaterThan(0);
    expect(getSkillsByCategory('')).toHaveLength(0);
    expect(getSkillsByCategory('UnknownCategory')).toHaveLength(0);
  });

  it('searchSkills handles queries and empty inputs', () => {
    expect(searchSkills('script').length).toBeGreaterThan(0);
    expect(searchSkills('').length).toBe(0);
    expect(searchSkills('   ').length).toBe(0);
  });
});

describe('Exported Education Helpers with Boundary Checks', () => {
  it('getEducationById retrieves entries safely', () => {
    expect(getEducationById(1)?.institution).toBe('Techno India University');
    expect(getEducationById(-1)).toBeUndefined();
    expect(getEducationById(0)).toBeUndefined();
    expect(getEducationById(NaN)).toBeUndefined();
  });

  it('getCurrentEducation returns active degree', () => {
    const current = getCurrentEducation();
    expect(current).toBeDefined();
    expect(current?.current).toBe(true);
  });

  it('getSortedEducation sorts chronologically', () => {
    const desc = getSortedEducation('desc');
    expect(parseInt(desc[0].startYear, 10)).toBeGreaterThanOrEqual(
      parseInt(desc[desc.length - 1].startYear, 10)
    );
    const asc = getSortedEducation('asc');
    expect(parseInt(asc[0].startYear, 10)).toBeLessThanOrEqual(
      parseInt(asc[asc.length - 1].startYear, 10)
    );
  });
});

