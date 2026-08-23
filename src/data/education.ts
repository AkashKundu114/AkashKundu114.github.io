export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  grade: string;
  current: boolean;
  description?: string;
}

export const education: Education[] = [
  {
    id: 1,
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Techno India University',
    location: 'Kolkata, West Bengal',
    startYear: '2023',
    endYear: '2027',
    grade: 'CGPA 7.5 / 10',
    current: true,
    description:
      'Advanced in computer science fundamentals as measured by a 7.5 CGPA, by completing rigorous coursework in algorithms, data structures, and system design.',
  },
  {
    id: 2,
    degree: 'Higher Secondary Education (Science - AISSCE)',
    institution: 'Arambagh Vivekananda Academy',
    location: 'Arambagh, West Bengal',
    startYear: '2021',
    endYear: '2023',
    grade: '71.6%',
    current: false,
    description:
      'Achieved proficiency in applied sciences as measured by a 71.6% board score, by excelling in mathematics, physics, and chemistry.',
  },
  {
    id: 3,
    degree: 'Secondary Education (AISSE)',
    institution: 'Arambagh Vivekananda Academy',
    location: 'Arambagh, West Bengal',
    startYear: '2010',
    endYear: '2021',
    grade: '95.4%',
    current: false,
    description:
      'Demonstrated academic excellence as measured by a 95.4% final grade, by consistently ranking in the top percentile across all foundational subjects.',
  },
];
