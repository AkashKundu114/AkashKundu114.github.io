export interface Skill {
  id: number;
  name: string;
  category: string;
}

export const skills: Skill[] = [
  // Languages
  { id: 1, name: 'Python', category: 'Languages' },
  { id: 2, name: 'TypeScript', category: 'Languages' },
  { id: 3, name: 'C++', category: 'Languages' },
  { id: 4, name: 'SQL', category: 'Languages' },
  { id: 5, name: 'JavaScript', category: 'Languages' },

  // AI & Machine Learning
  { id: 6, name: 'PyTorch', category: 'AI & ML' },
  { id: 7, name: 'LangGraph & Multi-Agent Swarms', category: 'AI & ML' },
  { id: 8, name: 'Local LLMs (Ollama / Qwen / DeepSeek)', category: 'AI & ML' },
  { id: 9, name: 'RAG & Vector Grounding', category: 'AI & ML' },
  { id: 10, name: 'Computer Vision (OpenCV / Grad-CAM)', category: 'AI & ML' },
  { id: 11, name: 'CatBoost & Classical ML', category: 'AI & ML' },
  { id: 12, name: 'Hugging Face & Model Quantization', category: 'AI & ML' },

  // Backend & Databases
  { id: 13, name: 'FastAPI & Async IO', category: 'Backend & DB' },
  { id: 14, name: 'PostgreSQL & pgvector', category: 'Backend & DB' },
  { id: 15, name: 'Vector DBs (ChromaDB / SQLite)', category: 'Backend & DB' },
  { id: 16, name: 'Redis & Caching', category: 'Backend & DB' },
  { id: 17, name: 'WebSockets & REST APIs', category: 'Backend & DB' },
  { id: 18, name: 'Node.js & Express', category: 'Backend & DB' },

  // Full-Stack & Desktop UI
  { id: 19, name: 'React 18 & Vite', category: 'Full-Stack UI' },
  { id: 20, name: 'Electron & Tauri Desktop', category: 'Full-Stack UI' },
  { id: 21, name: 'Tailwind CSS & Framer Motion', category: 'Full-Stack UI' },
  { id: 22, name: 'PWA & Service Workers', category: 'Full-Stack UI' },

  // Cloud & DevOps
  { id: 23, name: 'Docker & Containerization', category: 'Cloud & DevOps' },
  { id: 24, name: 'Microsoft Azure (Container Apps & Blob)', category: 'Cloud & DevOps' },
  { id: 25, name: 'Linux CLI & Bash', category: 'Cloud & DevOps' },
  { id: 26, name: 'Git & GitHub Actions CI/CD', category: 'Cloud & DevOps' },
  { id: 27, name: 'MLOps & Pytest Testing', category: 'Cloud & DevOps' },
];

export function getGroupedSkills(): Record<string, Skill[]> {
  return skills.reduce((acc: Record<string, Skill[]>, sk) => {
    if (!acc[sk.category]) acc[sk.category] = [];
    acc[sk.category].push(sk);
    return acc;
  }, {});
}
