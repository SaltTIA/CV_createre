export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  portfolio?: string;
  photo?: string;
  photoPosition?: { x: number; y: number };
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
}

export interface Skill {
  category: string;
  items: string;
}

export type Proficiency = 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';

export interface Language {
  language: string;
  proficiency: Proficiency;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  name: string;
  url?: string;
  description: string;
}

export interface CustomSection {
  title: string;
  items: { heading: string; detail: string }[];
}

export interface CoverLetter {
  companyName: string;
  jobTitle: string;
  tone: 'professional' | 'enthusiastic' | 'concise' | 'academic';
  opening: string;
  body: string;
  closing: string;
}

export type TemplateId = 'classic' | 'modern' | 'minimal' | 'sidebar' | 'double';
export type FontId = 'sans' | 'serif' | 'modern' | 'classic';

export interface TemplateSettings {
  templateId: TemplateId;
  accentColor: string;
  font: FontId;
  autoLayout: boolean;
  showPhoto: boolean;
}

export interface CVData {
  personal: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  projects: Project[];
  customSections: CustomSection[];
}

export type SectionKey =
  | 'personal'
  | 'summary'
  | 'experiences'
  | 'education'
  | 'skills'
  | 'languages'
  | 'certifications'
  | 'projects'
  | 'custom'
  | 'cover-letter';

export interface SectionConfig {
  key: SectionKey;
  label: string;
}

export type CVAction =
  | { type: 'SET_PERSONAL'; payload: Partial<PersonalInfo> }
  | { type: 'SET_SUMMARY'; payload: string }
  | { type: 'ADD_EXPERIENCE' }
  | { type: 'UPDATE_EXPERIENCE'; index: number; payload: Partial<Experience> }
  | { type: 'REMOVE_EXPERIENCE'; index: number }
  | { type: 'ADD_EDUCATION' }
  | { type: 'UPDATE_EDUCATION'; index: number; payload: Partial<Education> }
  | { type: 'REMOVE_EDUCATION'; index: number }
  | { type: 'ADD_SKILL' }
  | { type: 'UPDATE_SKILL'; index: number; payload: Partial<Skill> }
  | { type: 'REMOVE_SKILL'; index: number }
  | { type: 'ADD_LANGUAGE' }
  | { type: 'UPDATE_LANGUAGE'; index: number; payload: Partial<Language> }
  | { type: 'REMOVE_LANGUAGE'; index: number }
  | { type: 'ADD_CERTIFICATION' }
  | { type: 'UPDATE_CERTIFICATION'; index: number; payload: Partial<Certification> }
  | { type: 'REMOVE_CERTIFICATION'; index: number }
  | { type: 'ADD_PROJECT' }
  | { type: 'UPDATE_PROJECT'; index: number; payload: Partial<Project> }
  | { type: 'REMOVE_PROJECT'; index: number }
  | { type: 'ADD_CUSTOM_SECTION' }
  | { type: 'UPDATE_CUSTOM_SECTION'; index: number; payload: Partial<CustomSection> }
  | { type: 'REMOVE_CUSTOM_SECTION'; index: number }
  | { type: 'ADD_CUSTOM_ITEM'; sectionIndex: number }
  | { type: 'UPDATE_CUSTOM_ITEM'; sectionIndex: number; itemIndex: number; payload: { heading?: string; detail?: string } }
  | { type: 'REMOVE_CUSTOM_ITEM'; sectionIndex: number; itemIndex: number }
  | { type: 'LOAD_CV'; payload: CVData }
  | { type: 'RESET_CV' };

