import { CVData, TemplateSettings, SectionKey } from '../../types/cv';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmt(d: string): string { if (!d) return ''; const [y,m]=d.split('-'); return months[parseInt(m)-1]+' '+y; }

interface Props { cv: CVData; template: TemplateSettings; sectionOrder: SectionKey[]; }

export function CompactTemplate({ cv, template, sectionOrder }: Props) {
  const { personal, summary, experiences, education, skills, languages, certifications, projects, customSections } = cv;
  const accentColor = template.accentColor;
  const mainKeys = sectionOrder.filter(k => k !== 'personal');
  const mid = Math.ceil(mainKeys.length / 2);

  const renderBlock = (key: SectionKey) => {
    switch (key) {
      case 'summary': return summary ? <div key="s"><h2 className="text-[8pt] font-bold uppercase tracking-wider mb-1" style={{color:accentColor}}>Summary</h2><p className="text-[7.5pt] text-slate-600">{summary}</p></div> : null;
      case 'experiences': return experiences.length>0 ? <div key="e"><h2 className="text-[8pt] font-bold uppercase tracking-wider mb-1" style={{color:accentColor}}>Experience</h2>{experiences.map((exp,i)=><div key={i} className="mb-2"><div className="flex justify-between"><span className="font-semibold text-slate-800 text-[8pt]">{exp.title}</span><span className="text-[7pt] text-slate-400">{fmt(exp.startDate)}-{exp.current?'Present':fmt(exp.endDate||'')}</span></div><div className="text-[7.5pt] text-slate-500">{exp.company}</div>{exp.description&&<ul className="mt-0.5 space-y-0 list-disc list-inside text-[7.5pt] text-slate-600">{exp.description.split('\n').filter(Boolean).map((l,j)=><li key={j}>{l}</li>)}</ul>}</div>)}</div> : null;
      case 'education': return education.length>0 ? <div key="ed"><h2 className="text-[8pt] font-bold uppercase tracking-wider mb-1" style={{color:accentColor}}>Education</h2>{education.map((edu,i)=><div key={i} className="mb-1"><div className="flex justify-between"><span className="font-semibold text-slate-800 text-[8pt]">{edu.school}</span><span className="text-[7pt] text-slate-400">{fmt(edu.startDate)}-{edu.endDate?fmt(edu.endDate):'Present'}</span></div><div className="text-[7.5pt] text-slate-500">{edu.degree} in {edu.field}</div></div>)}</div> : null;
      case 'skills': return skills.length>0 ? <div key="sk"><h2 className="text-[8pt] font-bold uppercase tracking-wider mb-1" style={{color:accentColor}}>Skills</h2>{skills.map((s,i)=><span key={i} className="mr-2 text-[7.5pt] text-slate-600"><b>{s.category}:</b> {s.items}</span>)}</div> : null;
      case 'languages': return languages.length>0 ? <div key="la"><h2 className="text-[8pt] font-bold uppercase tracking-wider mb-1" style={{color:accentColor}}>Languages</h2>{languages.map((l,i)=><span key={i} className="mr-2 text-[7.5pt] text-slate-600">{l.language} ({l.proficiency})</span>)}</div> : null;
      case 'certifications': return certifications.length>0 ? <div key="ce"><h2 className="text-[8pt] font-bold uppercase tracking-wider mb-1" style={{color:accentColor}}>Certifications</h2>{certifications.map((c,i)=><div key={i} className="text-[7.5pt] text-slate-600">{c.name} – {c.issuer}</div>)}</div> : null;
      case 'projects': return projects.length>0 ? <div key="pr"><h2 className="text-[8pt] font-bold uppercase tracking-wider mb-1" style={{color:accentColor}}>Projects</h2>{projects.map((p,i)=><div key={i} className="text-[7.5pt] text-slate-600"><b>{p.name}</b> – {p.description}</div>)}</div> : null;
      case 'custom': return customSections.map((s,i)=><div key={'c'+i}><h2 className="text-[8pt] font-bold uppercase tracking-wider mb-1" style={{color:accentColor}}>{s.title}</h2>{s.items.map((it,j)=><div key={j} className="text-[7.5pt] text-slate-600"><b>{it.heading}</b> – {it.detail}</div>)}</div>);
      default: return null;
    }
  };

  return (
    <div className="h-full min-h-[297mm] text-[8pt] text-slate-700 p-4">
      <div className="flex justify-between items-end mb-3 pb-2 border-b-2" style={{borderColor:accentColor}}>
        <div>
          <h1 className="text-[14pt] font-bold text-slate-800 leading-tight">{personal.fullName}</h1>
          <div className="text-[7pt] text-slate-500">{personal.email} | {personal.phone} | {personal.location}</div>
        </div>
        {personal.linkedIn && <div className="text-[7pt] text-slate-400">{personal.linkedIn}</div>}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <div className="space-y-2">{mainKeys.slice(0, mid).map(renderBlock)}</div>
        <div className="space-y-2">{mainKeys.slice(mid).map(renderBlock)}</div>
      </div>
    </div>
  );
}
