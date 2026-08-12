export interface Skill {
  id: number;
  name: string;
  category: string;
}

export const skills: Skill[] = [
  { id:1,  name:'Python',          category:'Languages' },
  { id:2,  name:'Java',            category:'Languages' },
  { id:3,  name:'JavaScript',      category:'Languages' },
  { id:4,  name:'TypeScript',      category:'Languages' },
  { id:5,  name:'SQL',             category:'Languages' },
  { id:6,  name:'React.js',        category:'Web & APIs' },
  { id:7,  name:'Next.js',         category:'Web & APIs' },
  { id:8,  name:'FastAPI',         category:'Web & APIs' },
  { id:9,  name:'Node.js',         category:'Web & APIs' },
  { id:10, name:'Tailwind CSS',    category:'Web & APIs' },
  { id:11, name:'REST APIs',       category:'Web & APIs' },
  { id:12, name:'PyTorch',         category:'AI & Data' },
  { id:13, name:'Scikit-learn',    category:'AI & Data' },
  { id:14, name:'Ollama (LLMs)',   category:'AI & Data' },
  { id:15, name:'Computer Vision', category:'AI & Data' },
  { id:16, name:'Pandas',          category:'AI & Data' },
  { id:17, name:'CatBoost',        category:'AI & Data' },
  { id:18, name:'PostgreSQL',      category:'AI & Data' },
  { id:19, name:'Git / GitHub',    category:'Tools' },
  { id:20, name:'Docker',          category:'Tools' },
  { id:21, name:'CI/CD',           category:'Tools' },
  { id:22, name:'Azure',           category:'Tools' },
]

export function getGroupedSkills(): Record<string, Skill[]> {
  return skills.reduce((acc: Record<string, Skill[]>, sk: Skill) => {
    if (!acc[sk.category]) acc[sk.category] = [];
    acc[sk.category].push(sk);
    return acc;
  }, {});
}
