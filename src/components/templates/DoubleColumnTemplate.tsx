import { CVData, TemplateSettings } from '../../types/cv';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmt(d: string): string {
  if (!d) return '';
  const [y, m] = d.split('-');
  return months[parseInt(m)-1] + ' ' + y;
}

interface Props { cv: CVData; template: TemplateSettings; }

export function DoubleColumnTemplate({ cv, template }: Props) {
  const { personal, summary, experiences, education, skills, languages, certifications, projects, customSections } = cv;
  const accentColor = template.accentColor;

  return (
    <div className="h-full min-h-[297mm] text-[10pt] text-slate-700">
      <div className="text-center p-6 pb-4 border-b-2" style={{borderColor: accentColor}}>
        <h1 className="text-[18pt] font-bold text-slate-800">{personal.fullName}</h1>
        <div className="text-[8.5pt] text-slate-500 mt-1">
          {personal.email} | {personal.phone} | {personal.location}
          {personal.linkedIn && ' | ' + personal.linkedIn}
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 p-5 space-y-5">
          {summary && (
            <div>
              <h2 className="text-[9pt] font-bold uppercase tracking-wider mb-2" style={{color: accentColor}}>Summary</h2>
              <p className="text-[8.5pt] text-slate-600">{summary}</p>
            </div>
          )}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-[9pt] font-bold uppercase tracking-wider mb-2" style={{color: accentColor}}>Experience</h2>
              {experiences.map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="font-semibold text-slate-800 text-[9pt]">{exp.title}</div>
                  <div className="text-[8pt] text-slate-500">{exp.company} | {fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate||'')}</div>
                  {exp.description && (
                    <ul className="mt-1 space-y-0.5 list-disc list-inside text-[8pt] text-slate-600">
                      {exp.description.split('\n').filter(Boolean).map((l, j) => <li key={j}>{l}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-1/2 p-5 space-y-5">
          {education.length > 0 && (
            <div>
              <h2 className="text-[9pt] font-bold uppercase tracking-wider mb-2" style={{color: accentColor}}>Education</h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <div className="font-semibold text-slate-800 text-[9pt]">{edu.school}</div>
                  <div className="text-[8pt] text-slate-500">{edu.degree} in {edu.field} | {fmt(edu.startDate)} – {edu.endDate ? fmt(edu.endDate) : 'Present'}</div>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[9pt] font-bold uppercase tracking-wider mb-2" style={{color: accentColor}}>Skills</h2>
              {skills.map((s, i) => (
                <div key={i} className="mb-1 text-[8.5pt] text-slate-600"><span className="font-semibold">{s.category}:</span> {s.items}</div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <h2 className="text-[9pt] font-bold uppercase tracking-wider mb-2" style={{color: accentColor}}>Languages</h2>
              {languages.map((l, i) => <div key={i} className="text-[8.5pt] text-slate-600">{l.language} – {l.proficiency}</div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
