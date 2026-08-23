export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  category: string;
  skills: string[];
  image: string;
  file: string;
  verifyUrl: string | null;
  description: string;
}

export const certificates: Certificate[] = [
  {
    id: 'purposive-ai-internship',
    title: 'AI Research & Social Innovation Internship',
    issuer: 'Purposive AI',
    date: 'August 2026',
    credentialId: 'Internship Certificate',
    category: 'AI/ML',
    skills: ['AI Research', 'Social Innovation', 'Field Study', 'Human-Centered AI', 'Voice AI'],
    image: '/certificates/purposive_internship.png',
    file: '/certificates/purposive_internship.pdf',
    verifyUrl: 'https://purposiveai.com',
    description:
      'Completed an internship developing AI-SATHI, a voice-first Bengali AI-assistant for rural SHG women. Conducted a formative field study across 8 SHGs in West Bengal to assess practical relevance.',
  },

  {
    id: 'microsoft-azure-ai-developer',
    title: 'Azure AI Apps and Agents Developer Associate',
    issuer: 'Microsoft',
    date: 'June 2026',
    credentialId: '1E752ACA4DE83BA0',
    category: 'AI/ML',
    skills: [
      'Azure AI Studio',
      'AI Agents',
      'Azure OpenAI',
      'Prompt Engineering',
      'Responsible AI',
      'Azure',
    ],
    image: '/certificates/microsoft_azure_ai_developer.png',
    file: '/certificates/microsoft_azure_ai_developer.pdf',
    verifyUrl:
      'https://learn.microsoft.com/en-us/users/akashkundu-6432/credentials/1e752aca4de83ba0',
    description:
      'Demonstrated mastery of AI integration on Azure as measured by passing the Microsoft Certified Associate exam (1BA7D6-38M756), by developing and deploying enterprise-grade AI agents and OpenAI applications.',
  },
  {
    id: 'oracle-agentic-ai-foundations',
    title: 'Agentic AI Certified Foundations Associate',
    issuer: 'Oracle University',
    date: 'June 2026',
    credentialId: '329122175AAI26OFA',
    category: 'AI/ML',
    skills: ['Agentic AI', 'AI Agents', 'Oracle Cloud', 'AI Foundations', 'Multi-Agent Systems'],
    image: '/certificates/oracle_agentic_ai.png',
    file: '/certificates/oracle_agentic_ai.pdf',
    verifyUrl:
      'https://catalog-education.oracle.com/ords/certview/sharebadge?id=ADFFFC4D49A07C356C19C8AED66AFB44C084BB14F26A196AE1E848C9F1392841',
    description:
      "Achieved foundational certification in Agentic AI as measured by Oracle University's associate exam, by demonstrating core competencies in designing and evaluating multi-agent systems.",
  },
  {
    id: 'microsoft-ml-operations-engineer',
    title: 'Machine Learning Operations Engineer Associate',
    issuer: 'Microsoft',
    date: 'August 2026',
    credentialId: '1BA8E6E632A47E48',
    category: 'AI/ML',
    skills: ['MLOps', 'Azure Machine Learning', 'Model Deployment', 'CI/CD', 'Machine Learning'],
    image: '/certificates/microsoft_mlops_engineer.png',
    file: '/certificates/microsoft_mlops_engineer.pdf',
    verifyUrl:
      'https://learn.microsoft.com/en-us/users/akashkundu-6432/credentials/1ba8e6e632a47e48',
    description:
      'Demonstrated mastery of machine learning operations on Azure as measured by passing the Microsoft Certified Associate exam (6485B9-9R34A8), by deploying, managing, and monitoring scalable ML models.',
  },
  {
    id: 'oracle-ai-database-foundations',
    title: 'AI Database Certified Foundations Associate',
    issuer: 'Oracle University',
    date: 'July 2026',
    credentialId: '329122175OCI26DCFA',
    category: 'AI/ML',
    skills: ['Oracle Cloud', 'AI Databases', 'Data Engineering', 'Machine Learning'],
    image: '/certificates/oracle_ai_database.png',
    file: '/certificates/oracle_ai_database.pdf',
    verifyUrl: null,
    description:
      "Achieved foundational certification in AI Databases as measured by Oracle University's associate exam, by demonstrating core competencies in AI-driven database management and Oracle Cloud Infrastructure.",
  },
  {
    id: 'aicte-aiml-internship',
    title: 'AI-ML Virtual Internship',
    issuer: 'AICTE EduSkills — Google for Developers',
    date: 'December 2025',
    credentialId: '859956dff8ef63ed7ad2d7792d6ae3ec',
    category: 'AI/ML',
    skills: ['Machine Learning', 'Artificial Intelligence', 'Deep Learning', 'Python'],
    image: '/certificates/aicte_aiml_internship.png',
    file: '/certificates/aicte_aiml_internship.pdf',
    verifyUrl: null,
    description:
      'Completed a 10-week AI-ML Virtual Internship as measured by achieving an Outstanding Grade (90–100), by developing real-world machine learning models under the Google for Developers India Edu Program.',
  },
  {
    id: 'deloitte-data-analytics',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte Australia — Forage',
    date: 'May 2026',
    credentialId: 'CAYjKLqidoNwFmh3y',
    category: 'Data Science',
    skills: ['Data Analysis', 'Forensic Technology', 'Business Intelligence', 'Analytics'],
    image: '/certificates/deloitte_data_analytics.png',
    file: '/certificates/deloitte_data_analytics.pdf',
    verifyUrl: null,
    description:
      'Executed data analysis and forensic technology tasks as measured by the successful completion of the Deloitte Australia simulation, by deriving business intelligence insights from raw enterprise datasets.',
  },
  {
    id: 'deloitte-cyber',
    title: 'Cyber Security Job Simulation',
    issuer: 'Deloitte Australia — Forage',
    date: 'July 2025',
    credentialId: 'fb5o2xehahXK4Qmga',
    category: 'General',
    skills: ['Cyber Security', 'Risk Assessment', 'Security Analysis', 'Threat Detection'],
    image: '/certificates/deloitte_cyber.png',
    file: '/certificates/deloitte_cyber.pdf',
    verifyUrl: null,
    description:
      "Conducted risk assessments and threat detection as measured by the completion of Deloitte Australia's Cyber Job Simulation, by analyzing and mitigating simulated enterprise security breaches.",
  },
  {
    id: 'ibm-enterprise-ai',
    title: 'Getting Started with Enterprise-grade AI',
    issuer: 'IBM SkillsBuild',
    date: 'August 2024',
    credentialId: 'c7c52a49-bc57-4eeb-ac99-7ec573e74ccc',
    category: 'AI/ML',
    skills: ['Enterprise AI', 'IBM Watson', 'AI Strategy', 'Machine Learning'],
    image: '/certificates/ibm_enterprise_ai.png',
    file: '/certificates/ibm_enterprise_ai.pdf',
    verifyUrl: 'https://www.credly.com/badges/c7c52a49-bc57-4eeb-ac99-7ec573e74ccc',
    description:
      'Gained proficiency in enterprise AI implementation as measured by the IBM SkillsBuild credential, by utilizing IBM Watson to formulate enterprise-scale machine learning strategies.',
  },
  {
    id: 'udemy-python-bootcamp',
    title: '2024 Complete Python Bootcamp: Zero to Hero',
    issuer: 'Udemy',
    date: 'April 2024',
    credentialId: 'UC-77e0fe74-cab5-44f6-97f2-039a1a3c90a7',
    category: 'Programming',
    skills: ['Python', 'Data Structures', 'OOP', 'Scripting', 'Problem Solving'],
    image: '/certificates/udemy_python_bootcamp.png',
    file: '/certificates/udemy_python_bootcamp.pdf',
    verifyUrl: 'https://ude.my/UC-77e0fe74-cab5-44f6-97f2-039a1a3c90a7',
    description:
      'Mastered Python programming fundamentals as measured by 11.5 hours of completed coursework and a final certification, by developing scripts, object-oriented systems, and data structures.',
  },
  {
    id: 'udemy-webdev-bootcamp',
    title: 'The Complete 2023 Web Development Bootcamp',
    issuer: 'Udemy',
    date: 'September 2023',
    credentialId: 'UC-78906b7b-6124-4686-b794-cb689b4578a5',
    category: 'Web Dev',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'React', 'SQL'],
    image: '/certificates/udemy_webdev_bootcamp.png',
    file: '/certificates/udemy_webdev_bootcamp.pdf',
    verifyUrl: 'https://ude.my/UC-78906b7b-6124-4686-b794-cb689b4578a5',
    description:
      'Attained full-stack web development capabilities as measured by completing 63 hours of intensive training, by building and deploying applications using HTML, CSS, JavaScript, React, Node.js, and SQL.',
  },
  {
    id: 'udemy-red-teaming',
    title: 'Red Teaming | Exploit Development with Assembly and C',
    issuer: 'Udemy',
    date: 'April 2024',
    credentialId: 'UC-0ff91b49-8f3b-4428-808f-ce187b62d910',
    category: 'General',
    skills: ['Red Teaming', 'Exploit Development', 'Assembly', 'C', 'Ethical Hacking'],
    image: '/certificates/udemy_red_teaming.png',
    file: '/certificates/udemy_red_teaming.pdf',
    verifyUrl: 'https://ude.my/UC-0ff91b49-8f3b-4428-808f-ce187b62d910',
    description:
      'Mastered offensive security and exploit development as measured by completing a 17.5-hour Udemy certification, by developing custom exploits using Assembly and C.',
  },
  {
    id: 'udemy-javascript-20-projects',
    title: 'JavaScript 20 Projects In 20 Days',
    issuer: 'Udemy',
    date: 'April 2024',
    credentialId: 'UC-2f1c768f-d6e2-40e5-9755-d0a5386437ae',
    category: 'Web Dev',
    skills: ['JavaScript', 'HTML5', 'CSS3', 'Front-End Development', 'DOM Manipulation'],
    image: '/certificates/udemy_js_20_projects.png',
    file: '/certificates/udemy_js_20_projects.pdf',
    verifyUrl: 'https://ude.my/UC-2f1c768f-d6e2-40e5-9755-d0a5386437ae',
    description:
      'Solidified front-end development skills as measured by completing a rigorous 8.5-hour coding challenge, by rapidly building and deploying 20 interactive projects using HTML, CSS, and JavaScript.',
  },
];

export const categoryColors: Record<string, string> = {
  'Data Science': '#4fa3ff',
  Programming: '#38bdf8',
  Cloud: '#60a5fa',
  'AI/ML': '#818cf8',
  'Web Dev': '#34d399',
  General: '#94a3b8',
};
