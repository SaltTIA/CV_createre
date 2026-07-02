import { CVData } from '../types/cv';

export const sampleCV: CVData = {
  personal: {
    fullName: 'Alex Chen',
    email: 'alex.chen@email.com',
    phone: '+852 1234 5678',
    location: 'Hong Kong',
    linkedIn: 'linkedin.com/in/alexchen',
    portfolio: 'alexchen.dev',
    photo: '',
  },
  summary: 'Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about clean architecture, developer experience, and open source.',
  experiences: [
    {
      company: 'TechCorp Ltd',
      title: 'Senior Frontend Engineer',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: 'Led migration from legacy jQuery codebase to React/TypeScript\nReduced bundle size by 40% through code splitting and tree shaking\nMentored 3 junior developers on modern frontend practices',
    },
    {
      company: 'StartupX',
      title: 'Full Stack Developer',
      startDate: '2020-01',
      endDate: '2022-02',
      current: false,
      description: 'Built RESTful APIs serving 100K+ daily active users\nDesigned PostgreSQL schema for multi-tenant SaaS platform\nImplemented CI/CD pipeline reducing deployment time by 60%',
    },
  ],
  education: [
    {
      school: 'University of Hong Kong',
      degree: "Bachelor's",
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2020-06',
    },
  ],
  skills: [
    { category: 'Programming', items: 'TypeScript, JavaScript, Python, SQL' },
    { category: 'Frontend', items: 'React, Next.js, Tailwind CSS, Redux' },
    { category: 'Tools', items: 'Git, Docker, AWS, CI/CD' },
  ],
  languages: [
    { language: 'English', proficiency: 'Fluent' },
    { language: 'Cantonese', proficiency: 'Native' },
    { language: 'Mandarin', proficiency: 'Fluent' },
  ],
  certifications: [
    { name: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', date: '2023-06' },
  ],
  projects: [
    { name: 'OpenCV Editor', url: 'github.com/alexchen/cv-editor', description: 'A privacy-first CV builder with real-time preview and PDF export' },
  ],
  customSections: [],
};
