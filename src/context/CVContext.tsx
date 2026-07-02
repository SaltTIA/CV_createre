import React, { createContext, useContext, useReducer, useCallback, useEffect, useMemo } from 'react';
import { CVData, CVAction, TemplateSettings, CoverLetter, SectionKey, SectionConfig } from '../types/cv';
import { sampleCV } from '../data/sampleCV';

const EMPTY_CV: CVData = {
  personal: { fullName: '', email: '', phone: '', location: '', linkedIn: '', portfolio: '', photo: '' },
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  customSections: [],
};

function cvReducer(state: CVData, action: CVAction): CVData {
  switch (action.type) {
    case 'SET_PERSONAL':
      return { ...state, personal: { ...state.personal, ...action.payload } };
    case 'SET_SUMMARY':
      return { ...state, summary: action.payload };
    case 'ADD_EXPERIENCE':
      return { ...state, experiences: [...state.experiences, { company: '', title: '', startDate: '', endDate: '', current: false, description: '' }] };
    case 'UPDATE_EXPERIENCE':
      return { ...state, experiences: state.experiences.map((e, i) => i === action.index ? { ...e, ...action.payload } : e) };
    case 'REMOVE_EXPERIENCE':
      return { ...state, experiences: state.experiences.filter((_, i) => i !== action.index) };
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, { school: '', degree: '', field: '', startDate: '', endDate: '' }] };
    case 'UPDATE_EDUCATION':
      return { ...state, education: state.education.map((e, i) => i === action.index ? { ...e, ...action.payload } : e) };
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((_, i) => i !== action.index) };
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, { category: '', items: '' }] };
    case 'UPDATE_SKILL':
      return { ...state, skills: state.skills.map((s, i) => i === action.index ? { ...s, ...action.payload } : s) };
    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter((_, i) => i !== action.index) };
    case 'ADD_LANGUAGE':
      return { ...state, languages: [...state.languages, { language: '', proficiency: 'Intermediate' }] };
    case 'UPDATE_LANGUAGE':
      return { ...state, languages: state.languages.map((l, i) => i === action.index ? { ...l, ...action.payload } : l) };
    case 'REMOVE_LANGUAGE':
      return { ...state, languages: state.languages.filter((_, i) => i !== action.index) };
    case 'ADD_CERTIFICATION':
      return { ...state, certifications: [...state.certifications, { name: '', issuer: '', date: '' }] };
    case 'UPDATE_CERTIFICATION':
      return { ...state, certifications: state.certifications.map((c, i) => i === action.index ? { ...c, ...action.payload } : c) };
    case 'REMOVE_CERTIFICATION':
      return { ...state, certifications: state.certifications.filter((_, i) => i !== action.index) };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, { name: '', url: '', description: '' }] };
    case 'UPDATE_PROJECT':
      return { ...state, projects: state.projects.map((p, i) => i === action.index ? { ...p, ...action.payload } : p) };
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter((_, i) => i !== action.index) };
    case 'ADD_CUSTOM_SECTION':
      return { ...state, customSections: [...state.customSections, { title: '', items: [] }] };
    case 'UPDATE_CUSTOM_SECTION':
      return { ...state, customSections: state.customSections.map((s, i) => i === action.index ? { ...s, ...action.payload } : s) };
    case 'REMOVE_CUSTOM_SECTION':
      return { ...state, customSections: state.customSections.filter((_, i) => i !== action.index) };
    case 'ADD_CUSTOM_ITEM':
      return { ...state, customSections: state.customSections.map((s, i) => i === action.sectionIndex ? { ...s, items: [...s.items, { heading: '', detail: '' }] } : s) };
    case 'UPDATE_CUSTOM_ITEM':
      return { ...state, customSections: state.customSections.map((s, i) => i === action.sectionIndex ? { ...s, items: s.items.map((item, j) => j === action.itemIndex ? { ...item, ...action.payload } : item) } : s) };
    case 'REMOVE_CUSTOM_ITEM':
      return { ...state, customSections: state.customSections.map((s, i) => i === action.sectionIndex ? { ...s, items: s.items.filter((_, j) => j !== action.itemIndex) } : s) };
    case 'LOAD_CV':
      return action.payload;
    case 'RESET_CV':
      return { ...EMPTY_CV };
    default:
      return state;
  }
}

interface CVContextValue {
  cv: CVData;
  dispatch: React.Dispatch<CVAction>;
  template: TemplateSettings;
  setTemplate: (s: TemplateSettings) => void;
  coverLetter: CoverLetter;
  setCoverLetter: (c: CoverLetter) => void;
  activeSection: SectionKey;
  setActiveSection: (s: SectionKey) => void;
  sectionOrder: SectionKey[];
  setSectionOrder: (order: SectionKey[]) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  versionName: string;
  setVersionName: (n: string) => void;
  versions: string[];
  loadVersion: (name: string) => void;
  saveVersion: (name: string) => void;
  deleteVersion: (name: string) => void;
  renameVersion: (oldName: string, newName: string) => void;
  refreshVersions: () => void;
  sectionConfigs: SectionConfig[];
}

const CVContext = createContext<CVContextValue | null>(null);

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  'personal', 'summary', 'experiences', 'education', 'skills',
  'languages', 'certifications', 'projects', 'custom',
];

const SECTION_CONFIGS: SectionConfig[] = [
  { key: 'personal', label: '基本資料' },
  { key: 'summary', label: '個人簡介' },
  { key: 'experiences', label: '工作經歷' },
  { key: 'education', label: '學歷' },
  { key: 'skills', label: '技能' },
  { key: 'languages', label: '語言能力' },
  { key: 'certifications', label: '證照' },
  { key: 'projects', label: '作品集' },
  { key: 'custom', label: '自訂區塊' },
  { key: 'cover-letter', label: '求職信' },
];

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cv, dispatch] = useReducer(cvReducer, null, () =>
    loadStorage('cv-data', sampleCV)
  );
  const [history, setHistory] = React.useState<CVData[]>([loadStorage('cv-data', sampleCV)]);
  const [historyIndex, setHistoryIndex] = React.useState(0);
  const skipHistoryRef = React.useRef(false);

  // Track history on every user edit
  React.useEffect(() => {
    if (skipHistoryRef.current) {
      skipHistoryRef.current = false;
      return;
    }
    setHistory(prev => {
      const next = [...prev, cv];
      return next.length > 50 ? next.slice(-50) : next;
    });
    setHistoryIndex(prev => prev + 1);
  }, [cv]);
  const [template, setTemplate] = React.useState<TemplateSettings>(() =>
    loadStorage('cv-template', {
      templateId: 'classic' as const,
      accentColor: '#2563eb',
      font: 'sans' as const,
      autoLayout: true,
      showPhoto: true,
    })
  );
  const [coverLetter, setCoverL] = React.useState<CoverLetter>(() =>
    loadStorage('cv-cover-letter', {
      companyName: '', jobTitle: '', recipientName: '', companyAddress: '', subject: '', tone: 'professional' as const, greeting: '',
      opening: '', body: '', closing: '',
    })
  );
  const [activeSection, setActiveSection] = React.useState<SectionKey>('personal');
  const [sectionOrder, setSectionOrder] = React.useState<SectionKey[]>(() =>
    loadStorage('cv-section-order', DEFAULT_SECTION_ORDER)
  );
  const [versionName, setVersionName] = React.useState('default');

    useEffect(() => {
    if (versionName === 'default') {
      localStorage.setItem('cv-data', JSON.stringify(cv));
    } else {
      localStorage.setItem('cv-version-' + versionName, JSON.stringify(cv));
    }
  }, [cv, versionName]);
  useEffect(() => { localStorage.setItem('cv-template', JSON.stringify(template)); }, [template]);
  useEffect(() => { localStorage.setItem(getCLKey(versionName), JSON.stringify(coverLetter)); }, [coverLetter, versionName]);
  useEffect(() => { localStorage.setItem('cv-section-order', JSON.stringify(sectionOrder)); }, [sectionOrder]);

  const [versionRefresh, setVersionRefresh] = React.useState(0);
  const versions = useMemo(() => {
    try { return Object.keys(localStorage).filter(k => k.startsWith('cv-version-')).map(k => k.replace('cv-version-', '')); }
    catch { return []; }
  }, [versionRefresh]);

    const loadVersion = useCallback((name: string) => {
    const data = name === 'default' 
      ? loadStorage('cv-data', sampleCV)
      : loadStorage('cv-version-' + name, null);
    if (data) dispatch({ type: 'LOAD_CV', payload: data as CVData });
    setVersionName(name);
  }, []);

  const saveVersion = useCallback((name: string) => {
    localStorage.setItem('cv-version-' + name, JSON.stringify(cv)); setVersionRefresh(v => v + 1);
  }, [cv]);

  const deleteVersion = useCallback((name: string) => {
    localStorage.removeItem('cv-version-' + name); setVersionRefresh(v => v + 1);
  }, []);

  const renameVersion = useCallback((oldName: string, newName: string) => {
    let data: string | null;
    let oldKey: string;
    if (oldName === 'default') {
      data = localStorage.getItem('cv-data');
      oldKey = 'cv-data';
    } else {
      data = localStorage.getItem('cv-version-' + oldName);
      oldKey = 'cv-version-' + oldName;
    }
    if (data) {
      localStorage.setItem('cv-version-' + newName, data);
      localStorage.removeItem(oldKey);
      setVersionRefresh(v => v + 1);
    }
  }, []);

  const refreshVersions = useCallback(() => {
    setVersionRefresh(v => v + 1);
  }, []);

  const undo = useCallback(() => {
    skipHistoryRef.current = true;
    if (historyIndex > 0) {
      const idx = historyIndex - 1;
      setHistoryIndex(idx);
      dispatch({ type: 'LOAD_CV', payload: history[idx] });
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    skipHistoryRef.current = true;
    if (historyIndex < history.length - 1) {
      const idx = historyIndex + 1;
      setHistoryIndex(idx);
      dispatch({ type: 'LOAD_CV', payload: history[idx] });
    }
  }, [history, historyIndex]);

  return (
    <CVContext.Provider value={{
      cv, dispatch, template, setTemplate, coverLetter, setCoverLetter: setCoverL,
      activeSection, setActiveSection, sectionOrder, setSectionOrder,
      undo, redo, canUndo: historyIndex > 0, canRedo: historyIndex < history.length - 1,
      versionName, setVersionName, versions, loadVersion, saveVersion, deleteVersion, renameVersion, refreshVersions,
      sectionConfigs: SECTION_CONFIGS,
    }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error('useCV must be used within CVProvider');
  return ctx;
}













