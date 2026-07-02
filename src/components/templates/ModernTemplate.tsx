import { CVData, TemplateSettings, SectionKey } from '../../types/cv';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmt(d: string): string { if (!d) return ''; const [y,m]=d.split('-'); return months[parseInt(m)-1]+' '+y; }

interface Props { cv: CVData; template: TemplateSettings; sectionOrder: SectionKey[]; }

function renderSection(key: SectionKey, cv: CVData, accentColor: string) {
  const { personal, summary, experiences, education, skills, languages, certifications, projects, customSections } = cv;
  switch (key) {
    case 'personal': return (
      <div key="personal" className="text-center mb-6">
        <h1 className="text-[18pt] font-bold text-slate-800">{personal.fullName}</h1>
        <div className="text-[9pt] text-slate-500 mt-1">{personal.email} | {personal.phone} | {personal.location}</div>
      </div>
    );
    case 'summary': return summary ? (
      <div key="summary" className="mb-5 border-b pb-3">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Professional Summary</h2>
        <p className="text-[9.5pt] text-slate-600">{summary}</p>
      </div>
    ) : null;
    case 'experiences': return experiences.length>0 ? (
      <div key="experiences" className="mb-5">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-3" style={{color:accentColor}}>Experience</h2>
        {experiences.map((exp,i)=>(
          <div key={i} className="mb-3 border-l-[3px] pl-3" style={{borderColor:accentColor+'60'}}>
            <div className="flex justify-between"><span className="font-semibold text-slate-800">{exp.title} <span className="font-normal text-slate-500">at {exp.company}</span></span><span className="text-[8pt] text-slate-400">{fmt(exp.startDate)} – {exp.current?'Present':fmt(exp.endDate||'')}</span></div>
            {exp.description&&<ul className="mt-1 space-y-0.5 list-disc list-inside text-[9pt] text-slate-600">{exp.description.split('\n').filter(Boolean).map((l,j)=><li key={j}>{l}</li>)}</ul>}
          </div>))}
      </div>
    ) : null;
    case 'education': return education.length>0 ? (
      <div key="education" className="mb-5">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-3" style={{color:accentColor}}>Education</h2>
        {education.map((edu,i)=>(
          <div key={i} className="mb-2"><div className="flex justify-between"><span className="font-semibold text-slate-800">{edu.school}</span><span className="text-[8pt] text-slate-400">{fmt(edu.startDate)} – {edu.endDate?fmt(edu.endDate):'Present'}</span></div><div className="text-[9pt] text-slate-500">{edu.degree} in {edu.field}</div></div>))}
      </div>
    ) : null;
    case 'skills': return skills.length>0 ? (
      <div key="skills" className="mb-5">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Skills</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[9pt] text-slate-600">{skills.map((s,i)=><div key={i}><span className="font-semibold">{s.category}: </span>{s.items}</div>)}</div>
      </div>
    ) : null;
    case 'languages': return languages.length>0 ? (
      <div key="languages" className="mb-5">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Languages</h2>
        <div className="flex gap-4 text-[9pt] text-slate-600">{languages.map((l,i)=><span key={i}>{l.language} – {l.proficiency}</span>)}</div>
      </div>
    ) : null;
    case 'certifications': return certifications.length>0 ? (
      <div key="certifications" className="mb-5">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Certifications</h2>
        {certifications.map((c,i)=><div key={i} className="text-[9pt] text-slate-600 mb-1">{c.name} – {c.issuer} ({fmt(c.date)})</div>)}
      </div>
    ) : null;
    case 'projects': return projects.length>0 ? (
      <div key="projects" className="mb-5">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Projects</h2>
        {projects.map((p,i)=>(<div key={i} className="mb-1"><span className="font-semibold text-slate-800 text-[9.5pt]">{p.name}</span>{p.url&&<span className="text-[8pt] text-slate-400 ml-2">({p.url})</span>}{p.description&&<p className="text-[9pt] text-slate-600">{p.description}</p>}</div>))}
      </div>
    ) : null;
    case 'custom': return customSections.map((s,i)=>(
      <div key={'custom-'+i} className="mb-5">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>{s.title}</h2>
        {s.items.map((item,j)=><div key={j} className="mb-1 text-[9pt] text-slate-600"><span className="font-semibold">{item.heading}</span> – {item.detail}</div>)}
      </div>));
    default: return null;
  }
}

export function ModernTemplate({ cv, template, sectionOrder }: Props) {
  const accentColor = template.accentColor;
  return (
    <div className="h-full min-h-[297mm] p-8 text-[10pt] text-slate-700">
      {sectionOrder.map(k => renderSection(k, cv, accentColor))}
    </div>
  );
}
