import { CVData, TemplateSettings, SectionKey } from '../../types/cv';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmt(d: string): string { if (!d) return ''; const [y,m]=d.split('-'); return months[parseInt(m)-1]+' '+y; }

interface Props { cv: CVData; template: TemplateSettings; sectionOrder: SectionKey[]; }

export function DoubleColumnTemplate({ cv, template, sectionOrder }: Props) {
  const { personal, summary, experiences, education, skills, languages, certifications, projects, customSections } = cv;
  const accentColor = template.accentColor;
  const mainKeys = sectionOrder.filter(k => k !== 'personal');
  const mid = Math.ceil(mainKeys.length / 2);
  const leftKeys = mainKeys.slice(0, mid);
  const rightKeys = mainKeys.slice(mid);

  const renderBlock = (key: SectionKey) => {
    switch (key) {
      case 'summary': return summary ? (
        <div key="summary"><h2 className="text-[0.9em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Summary</h2><p className="text-[0.85em] text-slate-600">{summary}</p></div>) : null;
      case 'experiences': return experiences.length>0 ? (
        <div key="experiences"><h2 className="text-[0.9em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Experience</h2>{experiences.map((exp,i)=>(<div key={i} className="mb-3"><div className="font-semibold text-slate-800 text-[0.9em]">{exp.title}</div><div className="text-[0.8em] text-slate-500">{exp.company} | {fmt(exp.startDate)} – {exp.current?'Present':fmt(exp.endDate||'')}</div>{exp.description&&<ul className="mt-1 space-y-0.5 list-disc list-inside text-[0.8em] text-slate-600">{exp.description.split('\n').filter(Boolean).map((l,j)=><li key={j}>{l}</li>)}</ul>}</div>))}</div>) : null;
      case 'education': return education.length>0 ? (
        <div key="education"><h2 className="text-[0.9em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Education</h2>{education.map((edu,i)=>(<div key={i} className="mb-2"><div className="font-semibold text-slate-800 text-[0.9em]">{edu.school}</div><div className="text-[0.8em] text-slate-500">{edu.degree} in {edu.field} | {fmt(edu.startDate)} – {edu.endDate?fmt(edu.endDate):'Present'}</div></div>))}</div>) : null;
      case 'skills': return skills.length>0 ? (
        <div key="skills"><h2 className="text-[0.9em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Skills</h2>{skills.map((s,i)=><div key={i} className="mb-1 text-[0.85em] text-slate-600"><span className="font-semibold">{s.category}:</span> {s.items}</div>)}</div>) : null;
      case 'languages': return languages.length>0 ? (
        <div key="languages"><h2 className="text-[0.9em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Languages</h2>{languages.map((l,i)=><div key={i} className="text-[0.85em] text-slate-600">{l.language} – {l.proficiency}</div>)}</div>) : null;
      case 'certifications': return certifications.length>0 ? (
        <div key="certifications"><h2 className="text-[0.9em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Certifications</h2>{certifications.map((c,i)=><div key={i} className="text-[0.85em] text-slate-600 mb-1">{c.name} – {c.issuer} ({fmt(c.date)})</div>)}</div>) : null;
      case 'projects': return projects.length>0 ? (
        <div key="projects"><h2 className="text-[0.9em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Projects</h2>{projects.map((p,i)=>(<div key={i} className="mb-1"><span className="font-semibold text-[0.9em]">{p.name}</span>{p.description&&<p className="text-[0.8em] text-slate-600">{p.description}</p>}</div>))}</div>) : null;
      case 'custom': return customSections.map((s,i)=>(<div key={'custom-'+i}><h2 className="text-[0.9em] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>{s.title}</h2>{s.items.map((item,j)=><div key={j} className="mb-1 text-[0.85em] text-slate-600"><span className="font-semibold">{item.heading}</span> – {item.detail}</div>)}</div>));
      default: return null;
    }
  };

  return (
    <div className="h-full min-h-[297mm] text-[1em] text-slate-700">
      <div className="text-center p-6 pb-4 border-b-2" style={{borderColor:accentColor}}>
        <h1 className="text-[1.8em] font-bold text-slate-800">{personal.fullName}</h1>
        <div className="text-[0.85em] text-slate-500 mt-1">{personal.email} | {personal.phone} | {personal.location}{personal.linkedIn&&' | '+personal.linkedIn}</div>
      </div>
      <div className="flex">
        <div className="w-1/2 p-5 space-y-5">{leftKeys.map(k => { const c = renderBlock(k); const fz = template.sectionFontSizes?.[k] ?? template.fontSize; return c ? <div key={k} style={{ fontSize: fz + 'pt' }}>{c}</div> : null; })}</div>
        <div className="w-1/2 p-5 space-y-5">{rightKeys.map(k => { const c = renderBlock(k); const fz = template.sectionFontSizes?.[k] ?? template.fontSize; return c ? <div key={k} style={{ fontSize: fz + 'pt' }}>{c}</div> : null; })}</div>
      </div>
    </div>
  );
}
