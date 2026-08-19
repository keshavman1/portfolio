export const site = {
  name: 'Keshav Mantry',
  role: 'Software Engineer',
  company: '',
  location: '',
  email: 'keshavmantry01@gmail.com',
  linkedin: 'https://www.linkedin.com/in/keshav-mantry-613768229/',
  github: 'https://github.com/keshavman1',
  headline: 'Build. Ship. Scale.',
  intro:
    'Software engineer focused on Java, Spring Boot, microservices and full-stack product engineering — with a bias toward systems that actually ship.',
  stack: [
    'Java', 'Spring Boot', 'Microservices', 'REST APIs', 'SQL', 'PostgreSQL',
    'Kafka', 'AWS', 'React', 'Node.js', 'TypeScript', 'MongoDB',
  ],
}

export const experience = [
  {
    period: '2024 — Present',
    company: 'Infosys Limited',
    role: 'Digital Specialist Engineer',
    type: 'Enterprise backend engineering',
    summary:
      'Building and supporting enterprise applications with Java, Spring Boot, microservices, SQL and REST APIs, while working through production configuration, data flows and legacy-system constraints.',
    bullets: [
      'Java + Spring Boot backend services and REST APIs.',
      'SQL-backed workflows, production troubleshooting and system investigation.',
      'Exposure to cloud-hosted enterprise environments and evolving configuration.',
    ],
  },
  {
    period: 'Earlier',
    company: 'Zycus Infotech',
    role: 'Software Engineering Experience',
    type: 'Product / full-stack engineering',
    summary:
      'Worked across application development and software delivery with a focus on practical product engineering.',
    bullets: [
      'Contributed across frontend and backend workflows.',
      'Worked with modern JavaScript-based application development.',
    ],
  },
]

export const projects = [
  {
    number: '01',
    title: 'Splitwise',
    kicker: 'Expense sharing platform',
    description:
      'A Spring Boot backend designed to model groups, expenses, balances and settlement flows using relational data and clear domain boundaries.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'REST'],
    accent: 'architecture',
    href: 'https://github.com/keshavman1',
  },
  {
    number: '02',
    title: 'CogniScript',
    kicker: 'AI-assisted assessment platform',
    description:
      'A MERN application for university assessments with automated evaluation, designed for concurrent student usage and measurable grading efficiency.',
    tags: ['Node.js', 'React', 'MongoDB', 'OpenAI API'],
    accent: 'ai',
    href: 'https://github.com/keshavman1/CogniScript',
  },
]

export const process = [
  ['01', 'Think', 'Start with the user, the constraint and the system boundary.'],
  ['02', 'Build', 'Design APIs, data models and components around explicit responsibilities.'],
  ['03', 'Prove', 'Test the risky paths, watch the failure modes and measure what changed.'],
  ['04', 'Ship', 'Deploy, observe and iterate instead of treating “done” as the finish line.'],
]
