import { CVData, TemplateSettings } from '../../types/cv';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmt(d: string): string {
  if (!d) return '';
  const [y, m] = d.split('-');
  return months[parseInt(m)-1] + ' ' + y;
}

interface Props { cv: CVData; template: TemplateSettings; }

export function MinimalTemplate({ cv, template }: Props) {
  const { personal, summary, experiences, education, skills, languages, certifications, projects, customSections } = cv;
  const accentColor = template.accentColor;

  return (
    <div className="h-full min-h-[297mm] p-10 text-[10pt] text-slate-700">
      <h1 className="text-[18pt] font-light tracking-widest text-slate-800 mb-1">{personal.fullName}</h1>
      <div className="text-[8.5pt] text-slate-400 mb-6">
        {personal.email} {personal.phone && '| ' + personal.phone} {personal.location && '| ' + personal.location}
      </div>
      {summary && (
        <div className="mb-8">
          <p className="text-[9.5pt] text-slate-600">{summary}</p>
        </div>
      )}
      {experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Experience</h2>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-slate-800">{exp.title}</span>
                <span className="text-[8pt] text-slate-400">{fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate||'')}</span>
              </div>
              <div className="text-[9pt] text-slate-500 mb-1">{exp.company}</div>
              {exp.description && (
                <ul className="space-y-0.5 list-disc list-inside text-[9pt] text-slate-600">
                  {exp.description.split('\n').filter(Boolean).map((line, j) => <li key={j}>{line}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Education</h2>
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
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Skills</h2>
          {skills.map((s, i) => (
            <div key={i} className="inline mr-4 text-[9pt] text-slate-600"><span className="font-semibold">{s.category}:</span> {s.items}</div>
          ))}
        </div>
      )}
      {languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Languages</h2>
          {languages.map((l, i) => <span key={i} className="mr-4 text-[9pt] text-slate-600">{l.language} – {l.proficiency}</span>)}
        </div>
      )}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Certifications</h2>
          {certifications.map((c, i) => <div key={i} className="text-[9pt] text-slate-600 mb-1">{c.name} – {c.issuer} ({fmt(c.date)})</div>)}
        </div>
      )}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="mb-1 text-[9pt] text-slate-600"><span className="font-semibold">{p.name}</span> – {p.description}</div>
          ))}
        </div>
      )}
      {customSections.map((section, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-[9pt] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">{section.title}</h2>
          {section.items.map((item, j) => (
            <div key={j} className="mb-1 text-[9pt] text-slate-600"><span className="font-semibold">{item.heading}</span> – {item.detail}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
