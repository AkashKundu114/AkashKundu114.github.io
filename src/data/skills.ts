export interface Skill {
  id: number;
  name: string;
  category: string;
}

export const skills: Skill[] = [
  { id: 1, name: 'Python', category: 'Languages' },
  { id: 2, name: 'TypeScript', category: 'Languages' },
  { id: 3, name: 'JavaScript', category: 'Languages' },
  { id: 4, name: 'C#', category: 'Languages' },
  { id: 5, name: 'C++', category: 'Languages' },
  { id: 6, name: 'SQL', category: 'Languages' },

  { id: 7, name: 'PyTorch', category: 'AI & ML' },
  { id: 8, name: 'LangGraph', category: 'AI & ML' },
  { id: 9, name: 'LangChain', category: 'AI & ML' },
  { id: 10, name: 'Agentic AI', category: 'AI & ML' },
  { id: 11, name: 'RAG', category: 'AI & ML' },
  { id: 12, name: 'Ollama', category: 'AI & ML' },
  { id: 13, name: 'Model Context Protocol (MCP)', category: 'AI & ML' },
  { id: 14, name: 'OpenCV', category: 'AI & ML' },
  { id: 15, name: 'Hugging Face', category: 'AI & ML' },

  { id: 16, name: 'FastAPI', category: 'Backend & DB' },
  { id: 17, name: 'Node.js', category: 'Backend & DB' },
  { id: 18, name: 'Express', category: 'Backend & DB' },
  { id: 19, name: 'ASP.NET Core', category: 'Backend & DB' },
  { id: 20, name: 'MS SQL Server', category: 'Backend & DB' },
  { id: 21, name: 'PostgreSQL', category: 'Backend & DB' },
  { id: 22, name: 'pgvector', category: 'Backend & DB' },
  { id: 23, name: 'Redis', category: 'Backend & DB' },
  { id: 24, name: 'Elasticsearch', category: 'Backend & DB' },
  { id: 25, name: 'REST APIs', category: 'Backend & DB' },

  { id: 26, name: 'React', category: 'Full-Stack UI' },
  { id: 27, name: 'Vue.js', category: 'Full-Stack UI' },
  { id: 28, name: 'Three.js', category: 'Full-Stack UI' },
  { id: 29, name: 'WebGL', category: 'Full-Stack UI' },
  { id: 30, name: 'Vite', category: 'Full-Stack UI' },
  { id: 31, name: 'Tailwind CSS', category: 'Full-Stack UI' },
  { id: 32, name: 'Framer Motion', category: 'Full-Stack UI' },
  { id: 33, name: 'Electron', category: 'Full-Stack UI' },

  { id: 34, name: 'Microsoft Azure', category: 'Cloud & DevOps' },
  { id: 35, name: 'Docker', category: 'Cloud & DevOps' },
  { id: 36, name: 'Kubernetes', category: 'Cloud & DevOps' },
  { id: 37, name: 'Git', category: 'Cloud & DevOps' },
  { id: 38, name: 'GitHub Actions', category: 'Cloud & DevOps' },
  { id: 39, name: 'Pytest', category: 'Cloud & DevOps' },
  { id: 40, name: 'Vitest', category: 'Cloud & DevOps' },
  { id: 41, name: 'Linux', category: 'Cloud & DevOps' },
];

export function getGroupedSkills(): Record<string, Skill[]> {
  return skills.reduce<Record<string, Skill[]>>((acc, sk) => {
    if (!sk || !sk.category) return acc;
    if (!acc[sk.category]) acc[sk.category] = [];
    acc[sk.category].push(sk);
    return acc;
  }, {});
}

export function getSkillByName(name: string): Skill | undefined {
  if (!name || typeof name !== 'string' || !name.trim()) return undefined;
  const normalized = name.trim().toLowerCase();
  return skills.find((skill) => skill.name.toLowerCase() === normalized);
}

export function getSkillsByCategory(category: string): Skill[] {
  if (!category || typeof category !== 'string' || !category.trim()) return [];
  const normalized = category.trim().toLowerCase();
  return skills.filter((skill) => skill.category.toLowerCase() === normalized);
}

export function searchSkills(query: string): Skill[] {
  if (!query || typeof query !== 'string' || !query.trim()) return [];
  const normalized = query.trim().toLowerCase();
  return skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(normalized) ||
      skill.category.toLowerCase().includes(normalized)
  );
}
