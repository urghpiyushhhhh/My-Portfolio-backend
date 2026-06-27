import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Experience from './models/Experience.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

const projects = [
  {
    title: 'Full-Stack ERP Management System',
    category: 'MERN Stack',
    role: 'Lead Full-Stack Developer',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    description: [
      'Built a complete enterprise resource planning (ERP) system with 3 distinct user roles and JWT-based secure authentication.',
      'Designed and developed 20+ robust REST APIs using Node.js and Express to manage resource operations.',
      'Implemented complex role-based authorization rules and secure client-side and server-side protected routes.'
    ],
    githubLink: 'https://github.com',
    liveLink: ''
  },
  {
    title: 'WorkFlow — Global HRMS Platform',
    category: 'Next.js & TypeScript',
    role: 'Solo Full-Stack Developer',
    tags: ['Next.js', 'TypeScript', 'React.js', 'Tailwind CSS', 'shadcn/ui', 'AI Integration'],
    description: [
      'Architected and solo-developed a mobile-first, role-aware HRMS spanning 15 modules, including onboarding, attendance, leave, payroll, expenses, performance, recruitment, and analytics.',
      'Implemented role-based access control (RBAC) for 4 distinct user roles (Employee, Manager, HR, Admin), dynamically adapting navigation, dashboards, and approval workflows per role.',
      'Built an integrated AI HR Copilot via a dedicated API route to provide contextual, in-app assistance to users.',
      'Structured the codebase into 13 feature-based modules with a mock data layer designed for direct hand-off to a production backend and auth provider.'
    ],
    githubLink: 'https://github.com',
    liveLink: ''
  }
];

const experiences = [
  {
    company: 'Xebia — University Industry Program',
    role: 'Full Stack Developer Intern (Virtual)',
    duration: 'June 2026 – July 2026',
    location: 'Remote',
    points: [
      'Architected and co-developed a MERN-based University Dashboard featuring 23 distinct functional modules.',
      'Led an engineering sub-team of four developers for the Course Management Module, coordinating code integration.',
      'Designed high-performance REST APIs, MongoDB schemas, and pixel-perfect, responsive React user interfaces.',
      'Adhered strictly to professional Git workflows, peer code reviews, continuous debugging, and Agile methodologies.'
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Seed: Connected to MongoDB.');

    // Clear existing data
    await Project.deleteMany({});
    console.log('Seed: Cleared Projects collection.');

    await Experience.deleteMany({});
    console.log('Seed: Cleared Experience collection.');

    // Insert new data
    await Project.insertMany(projects);
    console.log('Seed: Successfully seeded Projects data.');

    await Experience.insertMany(experiences);
    console.log('Seed: Successfully seeded Experience data.');

    console.log('Seed: Database seeding completed successfully.');
    await mongoose.disconnect();
    console.log('Seed: Disconnected from database.');
  } catch (error) {
    console.error('Seed: Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
