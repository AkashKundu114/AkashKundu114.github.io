export interface Skill {
  id: number;
  name: string;
  category: string;
}

export const skills: Skill[] = [
  { id: 1, name: 'Python', category: 'Languages' },
  { id: 2, name: 'TypeScript', category: 'Languages' },
  { id: 3, name: 'C++', category: 'Languages' },
  { id: 4, name: 'SQL', category: 'Languages' },

  { id: 5, name: 'PyTorch', category: 'AI & ML' },
  { id: 6, name: 'LangGraph / Agents', category: 'AI & ML' },
  { id: 7, name: 'Local LLMs (Ollama)', category: 'AI & ML' },
  { id: 8, name: 'OpenCV', category: 'AI & ML' },

  { id: 9, name: 'FastAPI', category: 'Backend & DB' },
  { id: 10, name: 'PostgreSQL', category: 'Backend & DB' },
  { id: 11, name: 'Vector DBs (ChromaDB)', category: 'Backend & DB' },
  { id: 12, name: 'React.js / Electron', category: 'Backend & DB' },

  { id: 13, name: 'Docker', category: 'DevOps & Tools' },
  { id: 14, name: 'Git / GitHub', category: 'DevOps & Tools' },
  { id: 15, name: 'Linux CLI', category: 'DevOps & Tools' },
  { id: 16, name: 'Azure', category: 'DevOps & Tools' },
];

export function getGroupedSkills(): Record<string, Skill[]> {
  return skills.reduce((acc: Record<string, Skill[]>, sk) => {
    if (!acc[sk.category]) acc[sk.category] = [];
    acc[sk.category].push(sk);
    return acc;
  }, {});
}
