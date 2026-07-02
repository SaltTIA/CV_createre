import { useCV } from '../../context/CVContext';
import { TemplateSelector } from './TemplateSelector';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';
import { SidebarTemplate } from '../templates/SidebarTemplate';
import { DoubleColumnTemplate } from '../templates/DoubleColumnTemplate';
import { CoverLetterPreview } from '../cover-letter/CoverLetterPreview';

const fontMap: Record<string, string> = {
  sans: "'Inter', system-ui, sans-serif",
  serif: "'Georgia', serif",
  modern: "'Courier New', monospace",
  classic: "'Times New Roman', serif",
};

export function PreviewPanel() {
  const { cv, template, sectionOrder, coverLetter, activeSection } = useCV();

  const isCoverLetter = activeSection === 'cover-letter';
  const fontFamily = fontMap[template.font] || fontMap.sans;

  return (
    <div className="space-y-4 max-w-full">
      {!isCoverLetter && <TemplateSelector />}
      <div
        id="cv-preview"
        style={{ fontFamily } as React.CSSProperties}
        className="w-[210mm] min-h-[297mm] bg-white shadow-xl shadow-slate-300/50 ring-1 ring-slate-900/5 overflow-hidden"
      >
        {isCoverLetter ? (
          <CoverLetterPreview
            coverLetter={coverLetter}
            fullName={cv.personal.fullName}
            email={cv.personal.email}
            phone={cv.personal.phone}
            location={cv.personal.location}
            linkedIn={cv.personal.linkedIn}
            accentColor={template.accentColor}
            fontFamily={fontFamily}
          />
        ) : (
          <>
            {template.templateId === 'classic' && <ClassicTemplate cv={cv} template={template} sectionOrder={sectionOrder} />}
            {template.templateId === 'modern' && <ModernTemplate cv={cv} template={template} sectionOrder={sectionOrder} />}
            {template.templateId === 'minimal' && <MinimalTemplate cv={cv} template={template} sectionOrder={sectionOrder} />}
            {template.templateId === 'sidebar' && <SidebarTemplate cv={cv} template={template} sectionOrder={sectionOrder} />}
            {template.templateId === 'double' && <DoubleColumnTemplate cv={cv} template={template} sectionOrder={sectionOrder} />}
          </>
        )}
      </div>
    </div>
  );
}

