/**
 * CERTIFICATES DATA
 * ─────────────────
 * To add a certificate:
 *   1. Add an entry below.
 *   2. Place the certificate image (JPG/PNG) or PDF in /public/certificates/
 *   3. Set `image` to the path, e.g. '/certificates/nptel-python.jpg'
 *   4. Set `file` for a downloadable PDF, e.g. '/certificates/nptel-python.pdf'
 *
 * Categories: 'Data Science' | 'Programming' | 'Cloud' | 'AI/ML' | 'Web Dev' | 'General'
 */
export const certificates = [
  {
    id: 'nptel-python',
    title: 'Programming in Python',
    issuer: 'NPTEL — IIT Madras',
    date: 'October 2023',
    credentialId: 'NPTEL23CS####',          // replace with your actual ID
    category: 'Programming',
    skills: ['Python', 'Data Structures', 'OOP', 'File I/O'],
    image: '/certificates/nptel-python.jpg', // place your cert image here
    file:  '/certificates/nptel-python.pdf', // optional: downloadable PDF
    verifyUrl: null,                          // e.g. 'https://nptel.ac.in/noc/E_Certificate/...'
    description: 'An 8-week course covering Python fundamentals, data structures, object-oriented programming, and practical problem-solving.',
  },
  {
    id: 'coursera-ml',
    title: 'Machine Learning Specialization',
    issuer: 'Coursera — DeepLearning.AI',
    date: 'March 2024',
    credentialId: 'COURSERA-ML-####',
    category: 'AI/ML',
    skills: ['Supervised Learning', 'Neural Networks', 'Regression', 'Classification'],
    image: '/certificates/coursera-ml.jpg',
    file:  '/certificates/coursera-ml.pdf',
    verifyUrl: null,
    description: 'Three-course specialization covering supervised learning, unsupervised learning, and advanced ML strategies including neural networks.',
  },
  {
    id: 'hackerrank-sql',
    title: 'SQL (Advanced)',
    issuer: 'HackerRank',
    date: 'December 2023',
    credentialId: 'HR-SQL-ADV-####',
    category: 'Data Science',
    skills: ['SQL', 'Complex Queries', 'Window Functions', 'Optimization'],
    image: '/certificates/hackerrank-sql.jpg',
    file:  '/certificates/hackerrank-sql.pdf',
    verifyUrl: null,
    description: 'Certified proficiency in advanced SQL including complex joins, window functions, CTEs, and query optimization techniques.',
  },
  {
    id: 'google-data-analytics',
    title: 'Google Data Analytics Certificate',
    issuer: 'Google — Coursera',
    date: 'June 2024',
    credentialId: 'GOOGLE-DA-####',
    category: 'Data Science',
    skills: ['Data Analysis', 'R', 'Tableau', 'BigQuery', 'Spreadsheets'],
    image: '/certificates/google-data-analytics.jpg',
    file:  '/certificates/google-data-analytics.pdf',
    verifyUrl: null,
    description: 'Professional certificate covering the entire data analysis process — from asking the right questions to creating data-driven visualisations.',
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'August 2024',
    credentialId: 'AWS-CP-####',
    category: 'Cloud',
    skills: ['AWS', 'Cloud Computing', 'EC2', 'S3', 'IAM'],
    image: '/certificates/aws-cloud.jpg',
    file:  '/certificates/aws-cloud.pdf',
    verifyUrl: null,
    description: 'Foundational certification validating knowledge of AWS Cloud concepts, services, security, architecture, pricing, and support.',
  },
]

/** Category colour mapping */
export const categoryColors = {
  'Data Science': '#B8FF00',
  'Programming':  '#00C8FF',
  'Cloud':        '#FF9900',
  'AI/ML':        '#FF6B6B',
  'Web Dev':      '#A78BFA',
  'General':      '#9CA3AF',
}
