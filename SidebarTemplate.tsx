import { CVData, TemplateSettings, SectionKey } from '../../types/cv';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmt(d: string): string { if (!d) return ''; const [y,m]=d.split('-'); return months[parseInt(m)-1]+' '+y; }

interface Props { cv: CVData; template: TemplateSettings; sectionOrder: SectionKey[]; }

const SIDEBAR_KEYS: SectionKey[] = ['personal','skills','languages'];
const MAIN_KEYS: SectionKey[] = ['summary','experiences','education','certifications','projects','custom'];

export function SidebarTemplate({ cv, template, sectionOrder }: Props) {
  const { personal, summary, experiences, education, skills, languages, certifications, projects, customSections } = cv;
  const accentColor = template.accentColor;
  const sidebarOrder = sectionOrder.filter(k => SIDEBAR_KEYS.includes(k));
  const mainOrder = sectionOrder.filter(k => MAIN_KEYS.includes(k));

  const renderSidebar = (key: SectionKey) => {
    switch (key) {
      case 'personal': return null;
      case 'skills': return skills.length>0 ? (
        <div key="skills"><h2 className="text-[0.9em] font-bold uppercase tracking-wider mb-2 opacity-80">Skills</h2>{skills.map((s,i)=><div key={i} className="mb-1 text-[0.85em] opacity-80"><span className="font-semibold">{s.category}: </span>{s.items}</div>)}</div>) : null;
      case 'languages': return languages.length>0 ? (
        <div key="languages"><h2 className="text-[0.9em] font-bold uppercase tracking-wider mb-2 opacity-80">Languages</h2>{languages.map((l,i)=><div key={i} className="text-[0.85em] opacity-80">{l.language} – {l.proficiency}</div>)}</div>) : null;
      default: return null;
    }
  };

  const renderMain = (key: SectionKey) => {
    switch (key) {
      case 'summary': return summary ? (
        <div key="summary"><h2 className="text-[1em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Summary</h2><p className="text-[0.9em] text-slate-600">{summary}</p></div>) : null;
      case 'experiences': return experiences.length>0 ? (
        <div key="experiences"><h2 className="text-[1em] font-bold uppercase tracking-wider mb-3" style={{color:accentColor}}>Experience</h2>{experiences.map((exp,i)=>(<div key={i} className="mb-3"><div className="flex justify-between"><span className="font-semibold text-slate-800">{exp.title} – {exp.company}</span><span className="text-[0.8em] text-slate-400">{fmt(exp.startDate)} – {exp.current?'Present':fmt(exp.endDate||'')}</span></div>{exp.description&&<ul className="mt-1 space-y-0.5 list-disc list-inside text-[0.9em] text-slate-600">{exp.description.split('\n').filter(Boolean).map((l,j)=><li key={j}>{l}</li>)}</ul>}</div>))}</div>) : null;
      case 'education': return education.length>0 ? (
        <div key="education"><h2 className="text-[1em] font-bold uppercase tracking-wider mb-3" style={{color:accentColor}}>Education</h2>{education.map((edu,i)=>(<div key={i} className="mb-2"><div className="flex justify-between"><span className="font-semibold text-slate-800">{edu.school}</span><span className="text-[0.8em] text-slate-400">{fmt(edu.startDate)} – {edu.endDate?fmt(edu.endDate):'Present'}</span></div><div className="text-[0.9em] text-slate-500">{edu.degree} in {edu.field}</div></div>))}</div>) : null;
      case 'certifications': return certifications.length>0 ? (
        <div key="certifications"><h2 className="text-[1em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Certifications</h2>{certifications.map((c,i)=><div key={i} className="text-[0.9em] text-slate-600 mb-1">{c.name} – {c.issuer} ({fmt(c.date)})</div>)}</div>) : null;
      case 'projects': return projects.length>0 ? (
        <div key="projects"><h2 className="text-[1em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Projects</h2>{projects.map((p,i)=>(<div key={i} className="mb-1"><span className="font-semibold text-slate-800 text-[0.95em]">{p.name}</span>{p.url&&<span className="text-[0.8em] text-slate-400 ml-2">({p.url})</span>}{p.description&&<p className="text-[0.9em] text-slate-600">{p.description}</p>}</div>))}</div>) : null;
      case 'custom': return customSections.map((s,i)=>(<div key={'custom-'+i}><h2 className="text-[1em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>{s.title}</h2>{s.items.map((item,j)=><div key={j} className="mb-1 text-[0.9em] text-slate-600"><span className="font-semibold">{item.heading}</span> – {item.detail}</div>)}</div>));
      default: return null;
    }
  };

  return (
    <div className="flex h-full min-h-[297mm] text-[1em]">
      <div className="w-[35%] p-6 text-white flex flex-col gap-5" style={{backgroundColor:accentColor}}>
        {template.showPhoto && personal.photo && (
          <img src={personal.photo} className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-white/40" alt="" style={{ objectPosition: `${personal.photoPosition?.x ?? 50}% ${personal.photoPosition?.y ?? 50}%` }} />
        )}
        <div>
          <h1 className="text-[1.5em] font-bold mb-2">{personal.fullName}</h1>
          <div className="space-y-1 text-[0.9em] opacity-80">
            {personal.email&&<div>{personal.email}</div>}{personal.phone&&<div>{personal.phone}</div>}{personal.location&&<div>{personal.location}</div>}{personal.linkedIn&&<div>{personal.linkedIn}</div>}
          </div>
        </div>
        {sidebarOrder.map(k => { const c = renderSidebar(k); const fz = template.sectionFontSizes?.[k] ?? template.fontSize; return c ? <div key={k} style={{ fontSize: fz + 'pt' }}>{c}</div> : null; })}
      </div>
      <div className="flex-1 p-6 text-slate-700 flex flex-col gap-5">
        {mainOrder.map(k => { const c = renderMain(k); const fz = template.sectionFontSizes?.[k] ?? template.fontSize; return c ? <div key={k} style={{ fontSize: fz + 'pt' }}>{c}</div> : null; })}
      </div>
    </div>
  );
}
