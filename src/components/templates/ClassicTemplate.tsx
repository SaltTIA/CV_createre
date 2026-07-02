import { CVData, TemplateSettings, SectionKey } from '../../types/cv';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmt(d: string): string {
  if (!d) return '';
  const [y, m] = d.split('-');
  return months[parseInt(m)-1] + ' ' + y;
}

interface Props { cv: CVData; template: TemplateSettings; sectionOrder: SectionKey[]; }

const SIDEBAR_KEYS: SectionKey[] = ['personal', 'skills', 'languages'];
const MAIN_KEYS: SectionKey[] = ['summary', 'experiences', 'education', 'certifications', 'projects', 'custom'];

function getOrder(keys: SectionKey[], sectionOrder: SectionKey[]): SectionKey[] {
  return sectionOrder.filter(k => keys.includes(k));
}

export function ClassicTemplate({ cv, template, sectionOrder }: Props) {
  const { personal, summary, experiences, education, skills, languages, certifications, projects, customSections } = cv;
  const accentColor = template.accentColor;
  const sidebarOrder = getOrder(SIDEBAR_KEYS, sectionOrder);
  const mainOrder = getOrder(MAIN_KEYS, sectionOrder);

  const renderSidebarItem = (key: SectionKey) => {
    switch (key) {
      case 'personal': return null; // handled separately
      case 'skills': return skills.length > 0 ? (
        <div key="skills">
          <h2 className="text-[10pt] font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Skills</h2>
          {skills.map((s, i) => (
            <div key={i} className="mb-1.5 text-[9pt]">
              <span className="font-semibold text-slate-600">{s.category}: </span>
              <span className="text-slate-500">{s.items}</span>
            </div>
          ))}
        </div>
      ) : null;
      case 'languages': return languages.length > 0 ? (
        <div key="languages">
          <h2 className="text-[10pt] font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Languages</h2>
          {languages.map((l, i) => (
            <div key={i} className="text-[9pt] text-slate-400">{l.language} – {l.proficiency}</div>
          ))}
        </div>
      ) : null;
      default: return null;
    }
  };

  const renderMainItem = (key: SectionKey) => {
    switch (key) {
      case 'summary': return summary ? (
        <div key="summary">
          <h2 className="text-[10pt] font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Professional Summary</h2>
          <p className="text-[9.5pt] text-slate-600">{summary}</p>
        </div>
      ) : null;
      case 'experiences': return experiences.length > 0 ? (
        <div key="experiences">
          <h2 className="text-[10pt] font-semibold uppercase tracking-widest mb-3" style={{ color: accentColor }}>Experience</h2>
          <div className="space-y-3">
            {experiences.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-slate-700 text-[10pt]">{exp.title}</span>
                  <span className="text-[8pt] text-slate-400">{fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate||'')}</span>
                </div>
                <div className="text-[9pt] text-slate-400 italic">{exp.company}</div>
                {exp.description && (
                  <ul className="mt-1 space-y-0.5 list-disc list-inside text-[9pt] text-slate-600">
                    {exp.description.split('\n').filter(Boolean).map((line, j) => <li key={j}>{line}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null;
      case 'education': return education.length > 0 ? (
        <div key="education">
          <h2 className="text-[10pt] font-semibold uppercase tracking-widest mb-3" style={{ color: accentColor }}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700 text-[10pt]">{edu.school}</span>
                <span className="text-[8pt] text-slate-400">{fmt(edu.startDate)} – {edu.endDate ? fmt(edu.endDate) : 'Present'}</span>
              </div>
              <div className="text-[9pt] text-slate-400">{edu.degree} in {edu.field}</div>
            </div>
          ))}
        </div>
      ) : null;
      case 'certifications': return certifications.length > 0 ? (
        <div key="certifications">
          <h2 className="text-[10pt] font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Certifications</h2>
          {certifications.map((cert, i) => (
            <div key={i} className="text-[9pt] text-slate-600 mb-1">{cert.name}{cert.issuer ? ' – '+cert.issuer : ''}{cert.date ? ' ('+fmt(cert.date)+')' : ''}</div>
          ))}
        </div>
      ) : null;
      case 'projects': return projects.length > 0 ? (
        <div key="projects">
          <h2 className="text-[10pt] font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-1.5">
              <span className="font-semibold text-slate-700 text-[9.5pt]">{proj.name}</span>
              {proj.url && <span className="text-[8pt] text-slate-400 ml-2">({proj.url})</span>}
              {proj.description && <p className="text-[9pt] text-slate-600">{proj.description}</p>}
            </div>
          ))}
        </div>
      ) : null;
      case 'custom': return customSections.map((section, i) => (
        <div key={'custom-'+i}>
          <h2 className="text-[10pt] font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>{section.title}</h2>
          {section.items.map((item, j) => (
            <div key={j} className="mb-1">
              <span className="font-semibold text-slate-700 text-[9.5pt]">{item.heading}</span>
              {item.detail && <span className="text-[9pt] text-slate-600"> – {item.detail}</span>}
            </div>
          ))}
        </div>
      ));
      default: return null;
    }
  };

  return (
    <div className="flex h-full min-h-[297mm] text-[10pt] leading-relaxed text-slate-600">
      <div className="w-[32%] p-6 pr-4 flex flex-col gap-5" style={{ backgroundColor: accentColor + '0d' }}>
        {template.showPhoto && personal.photo && (
          <div className="flex justify-center">
            <img src={personal.photo} alt="" className="w-28 h-28 rounded-full object-cover border-2" style={{ borderColor: accentColor, objectPosition: `${personal.photoPosition?.x ?? 50}% ${personal.photoPosition?.y ?? 50}%` }} />
          </div>
        )}
        <div>
          <h1 className="text-[16pt] font-bold text-slate-700 mb-2">{personal.fullName}</h1>
          <div className="space-y-1 text-slate-400">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedIn && <div>{personal.linkedIn}</div>}
            {personal.portfolio && <div>{personal.portfolio}</div>}
          </div>
        </div>
        {sidebarOrder.map(renderSidebarItem)}
      </div>
      <div className="flex-1 p-6 pl-4 flex flex-col gap-5">
        {mainOrder.map(renderMainItem)}
      </div>
    </div>
  );
}

