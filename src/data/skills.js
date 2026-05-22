export const skills = [
  { id:1,  name:'Java',          category:'Programming Languages' },
  { id:2,  name:'Python',        category:'Programming Languages' },
  { id:3,  name:'JavaScript',    category:'Programming Languages' },
  { id:4,  name:'TypeScript',    category:'Programming Languages' },
  { id:5,  name:'C / C++',       category:'Programming Languages' },
  { id:6,  name:'SQL',           category:'Programming Languages' },
  { id:7,  name:'HTML5',         category:'Web Development' },
  { id:8,  name:'CSS3',          category:'Web Development' },
  { id:9,  name:'React',         category:'Web Development' },
  { id:10, name:'Next.js',       category:'Web Development' },
  { id:11, name:'Tailwind CSS',  category:'Web Development' },
  { id:12, name:'Spring Boot',   category:'Web Development' },
  { id:13, name:'Git / GitHub',  category:'Tools & Technologies' },
  { id:14, name:'Docker',        category:'Tools & Technologies' },
  { id:15, name:'CI/CD',         category:'Tools & Technologies' },
  { id:16, name:'Tableau',       category:'Tools & Technologies' },
  { id:17, name:'Excel',         category:'Tools & Technologies' },
  { id:18, name:'AI / ML',       category:'Tools & Technologies' },
]
export function getGroupedSkills() {
  return skills.reduce((acc,sk) => { (acc[sk.category]??=[]).push(sk); return acc }, {})
}
