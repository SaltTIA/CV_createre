import { CVData, TemplateSettings, SectionKey } from '../../types/cv';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmt(d: string): string { if (!d) return ''; const [y,m]=d.split('-'); return months[parseInt(m)-1]+' '+y; }

interface Props { cv: CVData; template: TemplateSettings; sectionOrder: SectionKey[]; }

function renderSection(key: SectionKey, cv: CVData, accentColor: string) {
  const { personal, summary, experiences, education, skills, languages, certifications, projects, customSections } = cv;
  switch (key) {
    case 'personal': return <div key="p" className="text-center mb-6"><h1 className="text-[2em] font-serif font-bold text-slate-800 tracking-wide">{personal.fullName}</h1><div className="text-[0.9em] text-slate-500 mt-2 tracking-wider">{personal.email} &middot; {personal.phone} &middot; {personal.location}{personal.linkedIn&&' &middot; '+personal.linkedIn}</div></div>;
    case 'summary': return summary ? <div key="s" className="mb-5"><div className="h-px bg-slate-200 mb-4" /><p className="text-[0.95em] text-slate-600 text-center italic">{summary}</p><div className="h-px bg-slate-200 mt-4" /></div> : null;
    case 'experiences': return experiences.length>0 ? <div key="e" className="mb-5"><h2 className="text-[1em] font-serif font-bold uppercase tracking-[0.15em] mb-3 text-center" style={{color:accentColor}}>Experience</h2>{experiences.map((exp,i)=><div key={i} className="mb-4 text-center"><div className="font-serif font-semibold text-slate-800 text-[1em]">{exp.title}</div><div className="text-[0.85em] text-slate-500">{exp.company} &middot; {fmt(exp.startDate)} – {exp.current?'Present':fmt(exp.endDate||'')}</div>{exp.description&&<ul className="mt-1 space-y-0 list-disc list-inside text-[0.85em] text-slate-600 mx-auto max-w-md">{exp.description.split('\n').filter(Boolean).map((l,j)=><li key={j}>{l}</li>)}</ul>}</div>)}</div> : null;
    case 'education': return education.length>0 ? <div key="ed" className="mb-5"><h2 className="text-[1em] font-serif font-bold uppercase tracking-[0.15em] mb-3 text-center" style={{color:accentColor}}>Education</h2>{education.map((edu,i)=><div key={i} className="mb-2 text-center"><div className="font-serif font-semibold text-slate-800">{edu.school}</div><div className="text-[0.85em] text-slate-500">{edu.degree} in {edu.field} &middot; {fmt(edu.startDate)} – {edu.endDate?fmt(edu.endDate):'Present'}</div></div>)}</div> : null;
    case 'skills': return skills.length>0 ? <div key="sk" className="mb-5"><h2 className="text-[1em] font-serif font-bold uppercase tracking-[0.15em] mb-2 text-center" style={{color:accentColor}}>Skills</h2><div className="text-center text-[0.9em] text-slate-600">{skills.map((s,i)=><span key={i} className="mx-3"><span className="font-semibold">{s.category}:</span> {s.items}</span>)}</div></div> : null;
    case 'languages': return languages.length>0 ? <div key="la" className="mb-5"><h2 className="text-[1em] font-serif font-bold uppercase tracking-[0.15em] mb-2 text-center" style={{color:accentColor}}>Languages</h2><div className="text-center text-[0.9em] text-slate-600">{languages.map((l,i)=><span key={i} className="mx-3">{l.language} – {l.proficiency}</span>)}</div></div> : null;
    case 'certifications': return certifications.length>0 ? <div key="ce" className="mb-5"><h2 className="text-[1em] font-serif font-bold uppercase tracking-[0.15em] mb-2 text-center" style={{color:accentColor}}>Certifications</h2>{certifications.map((c,i)=><div key={i} className="text-center text-[0.85em] text-slate-600 mb-1">{c.name} – {c.issuer} ({fmt(c.date)})</div>)}</div> : null;
    case 'projects': return projects.length>0 ? <div key="pr" className="mb-5"><h2 className="text-[1em] font-serif font-bold uppercase tracking-[0.15em] mb-2 text-center" style={{color:accentColor}}>Projects</h2>{projects.map((p,i)=><div key={i} className="text-center mb-1"><span className="font-semibold text-slate-800">{p.name}</span>{p.description&&<p className="text-[0.85em] text-slate-600">{p.description}</p>}</div>)}</div> : null;
    case 'custom': return customSections.map((s,i)=><div key={'c'+i} className="mb-5"><h2 className="text-[1em] font-serif font-bold uppercase tracking-[0.15em] mb-2 text-center" style={{color:accentColor}}>{s.title}</h2>{s.items.map((it,j)=><div key={j} className="text-center text-[0.85em] text-slate-600"><span className="font-semibold">{it.heading}</span> – {it.detail}</div>)}</div>);
    default: return null;
  }
}

export function ExecutiveTemplate({ cv, template, sectionOrder }: Props) {
  const accentColor = template.accentColor;
  return <div className="h-full min-h-[297mm] p-10 text-[1em] text-slate-700">{sectionOrder.map(k => { const c = renderSection(k, cv, accentColor); const fz = template.sectionFontSizes?.[k] ?? template.fontSize; return c ? <div key={k} style={{ fontSize: fz + 'pt' }}>{c}</div> : null; })}</div>;
}
