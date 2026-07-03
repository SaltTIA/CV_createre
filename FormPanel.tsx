import { SectionKey } from '../../types/cv';
import { useCV } from '../../context/CVContext';
import { sectionLabels } from '../../data/labels';
import { PersonalForm } from './PersonalForm';
import { SummaryForm } from './SummaryForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { LanguagesForm } from './LanguagesForm';
import { CertificationsForm } from './CertificationsForm';
import { ProjectsForm } from './ProjectsForm';
import { CustomSectionsForm } from './CustomSectionsForm';
import { CoverLetterForm } from '../cover-letter/CoverLetterForm';

function SectionFontSlider({ section }: { section: SectionKey }) {
  const { template, setTemplate } = useCV();
  const sectionFontSize = template.sectionFontSizes?.[section];
  const isCustom = sectionFontSize !== undefined;
  const effectiveSize = sectionFontSize ?? template.fontSize;
  const sectionName = sectionLabels[section] ?? section;

  return (
    <div className="mb-5 px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
      <div className="flex items-center gap-2">
        <span className={`text-[11px] font-medium shrink-0 ${isCustom ? "text-blue-600" : "text-slate-400"}`}>
          {isCustom ? '獨立 · ' + sectionName : '跟隨全域'}
        </span>
        <input type="range" min="6" max="14" step="0.5"
          value={effectiveSize}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setTemplate({ ...template, sectionFontSizes: { ...template.sectionFontSizes, [section]: v } });
          }}
          className="flex-1 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
        />
        <span className="text-[11px] text-slate-400 w-8 text-right shrink-0 tabular-nums">{effectiveSize}pt</span>
        {isCustom && (
          <button
            onClick={() => {
              const next = { ...template.sectionFontSizes };
              delete next[section];
              setTemplate({ ...template, sectionFontSizes: next });
            }}
            className="text-[10px] text-slate-400 hover:text-blue-500 underline shrink-0"
          >
            {'重設'}
          </button>
        )}
      </div>
      <div className="text-[10px] text-slate-400 leading-tight">
        {isCustom
          ? '獨立設定的字型大小，不受全域設定影響'
          : '未設定時自動跟隨全域字型大小（目前 ' + template.fontSize + 'pt）'}
      </div>
    </div>
  );
}

export function FormPanel({ section }: { section: SectionKey }) {
  const isCoverLetter = section === "cover-letter";

  let formContent: React.ReactNode;
  switch (section) {
    case 'personal': formContent = <PersonalForm />; break;
    case 'summary': formContent = <SummaryForm />; break;
    case 'experiences': formContent = <ExperienceForm />; break;
    case 'education': formContent = <EducationForm />; break;
    case 'skills': formContent = <SkillsForm />; break;
    case 'languages': formContent = <LanguagesForm />; break;
    case 'certifications': formContent = <CertificationsForm />; break;
    case 'projects': formContent = <ProjectsForm />; break;
    case 'custom': formContent = <CustomSectionsForm />; break;
    case 'cover-letter': formContent = <CoverLetterForm />; break;
    default: formContent = <PersonalForm />; break;
  }

  return (
    <>
      {!isCoverLetter && <SectionFontSlider section={section} />}
      {formContent}
    </>
  );
}