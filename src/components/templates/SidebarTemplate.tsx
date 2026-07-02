import { CVData, TemplateSettings } from '../../types/cv';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmt(d: string): string {
  if (!d) return '';
  const [y, m] = d.split('-');
  return months[parseInt(m)-1] + ' ' + y;
}

interface Props { cv: CVData; template: TemplateSettings; }

export function SidebarTemplate({ cv, template }: Props) {
  const { personal, summary, experiences, education, skills, languages, certifications, projects, customSections } = cv;
  const accentColor = template.accentColor;

  return (
    <div className="flex h-full min-h-[297mm] text-[10pt]">
      <div className="w-[35%] p-6 text-white flex flex-col gap-5" style={{backgroundColor: accentColor}}>
        {template.showPhoto && personal.photo && (
          <img src={personal.photo} className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-white/40" alt="" />
        )}
        <div>
          <h1 className="text-[15pt] font-bold mb-2">{personal.fullName}</h1>
          <div className="space-y-1 text-[9pt] opacity-80">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedIn && <div>{personal.linkedIn}</div>}
          </div>
        </div>
        {skills.length > 0 && (
          <div>
            <h2 className="text-[9pt] font-bold uppercase tracking-wider mb-2 opacity-80">Skills</h2>
            {skills.map((s, i) => <div key={i} className="mb-1 text-[8.5pt] opacity-80"><span className="font-semibold">{s.category}: </span>{s.items}</div>)}
          </div>
        )}
        {languages.length > 0 && (
          <div>
            <h2 className="text-[9pt] font-bold uppercase tracking-wider mb-2 opacity-80">Languages</h2>
            {languages.map((l, i) => <div key={i} className="text-[8.5pt] opacity-80">{l.language} – {l.proficiency}</div>)}
          </div>
        )}
      </div>
      <div className="flex-1 p-6 text-slate-700 flex flex-col gap-5">
        {summary && (
          <div>
            <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-2" style={{color: accentColor}}>Professional Summary</h2>
            <p className="text-[9pt] text-slate-600">{summary}</p>
          </div>
        )}
        {experiences.length > 0 && (
          <div>
            <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-3" style={{color: accentColor}}>Experience</h2>
            {experiences.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800">{exp.title} – {exp.company}</span>
                  <span className="text-[8pt] text-slate-400">{fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate||'')}</span>
                </div>
                {exp.description && (
                  <ul className="mt-1 space-y-0.5 list-disc list-inside text-[9pt] text-slate-600">
                    {exp.description.split('\n').filter(Boolean).map((l, j) => <li key={j}>{l}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        {education.length > 0 && (
          <div>
            <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-3" style={{color: accentColor}}>Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800">{edu.school}</span>
                  <span className="text-[8pt] text-slate-400">{fmt(edu.startDate)} – {edu.endDate ? fmt(edu.endDate) : 'Present'}</span>
                </div>
                <div className="text-[9pt] text-slate-500">{edu.degree} in {edu.field}</div>
              </div>
            ))}
          </div>
        )}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-[10pt] font-bold uppercase tracking-wider mb-2" style={{color: accentColor}}>Certifications</h2>
            {certifications.map((c, i) => <div key={i} className="text-[9pt] text-slate-600 mb-1">{c.name} – {c.issuer} ({fmt(c.date)})</div>)}
          </div>
        )}
      </div>
    </div>
  );
}
