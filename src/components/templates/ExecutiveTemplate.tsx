import { CVData, TemplateSettings, SectionKey } from '../../types/cv';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmt(d: string): string { if (!d) return ''; const [y,m]=d.split('-'); return months[parseInt(m)-1]+' '+y; }

interface Props { cv: CVData; template: TemplateSettings; sectionOrder: SectionKey[]; }

export function ExecutiveTemplate({ cv, template, sectionOrder }: Props) {
  const { personal, summary, experiences, education, skills, languages } = cv;
  const accentColor = template.accentColor;
  return (
    <div className="h-full min-h-[297mm] p-10 text-[10pt] text-slate-700">
      <h1 className="text-[18pt] font-bold text-slate-800 mb-1">{personal.fullName}</h1>
      <div className="text-[8.5pt] text-slate-500 mb-6">{personal.email} {personal.phone && '| '+personal.phone} {personal.location && '| '+personal.location}</div>
      {summary && <p className="mb-5 text-[9pt] text-slate-600">{summary}</p>}
      {experiences.length>0 && <div className="mb-5"><h2 className="text-[10pt] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Experience</h2>{experiences.map((exp,i)=><div key={i} className="mb-3"><div className="flex justify-between"><span className="font-semibold text-slate-800">{exp.title} – {exp.company}</span><span className="text-[8pt] text-slate-400">{fmt(exp.startDate)} – {exp.current?'Present':fmt(exp.endDate||'')}</span></div>{exp.description&&<ul className="mt-1 space-y-0.5 list-disc list-inside text-[9pt] text-slate-600">{exp.description.split('\n').filter(Boolean).map((l,j)=><li key={j}>{l}</li>)}</ul>}</div>)}</div>}
      {education.length>0 && <div className="mb-5"><h2 className="text-[10pt] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Education</h2>{education.map((edu,i)=><div key={i} className="mb-2"><div className="flex justify-between"><span className="font-semibold text-slate-800">{edu.school}</span><span className="text-[8pt] text-slate-400">{fmt(edu.startDate)} – {edu.endDate?fmt(edu.endDate):'Present'}</span></div><div className="text-[9pt] text-slate-500">{edu.degree} in {edu.field}</div></div>)}</div>}
      {skills.length>0 && <div><h2 className="text-[10pt] font-bold uppercase tracking-wider mb-2" style={{color:accentColor}}>Skills</h2>{skills.map((s,i)=><span key={i} className="mr-3 text-[9pt] text-slate-600">{s.category}: {s.items}</span>)}</div>}
    </div>
  );
}
