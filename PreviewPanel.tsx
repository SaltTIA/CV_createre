import { useCV } from '../../context/CVContext';
import { TemplateSelector } from './TemplateSelector';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';
import { SidebarTemplate } from '../templates/SidebarTemplate';
import { DoubleColumnTemplate } from '../templates/DoubleColumnTemplate';
import { TimelineTemplate } from '../templates/TimelineTemplate';
import { CompactTemplate } from '../templates/CompactTemplate';
import { ExecutiveTemplate } from '../templates/ExecutiveTemplate';
import { CoverLetterPreview } from '../cover-letter/CoverLetterPreview';

const fontMap: Record<string, string> = {
  sans: "'Inter', system-ui, sans-serif",
  serif: "'Georgia', serif",
  modern: "'Courier New', monospace",
  classic: "'Times New Roman', serif",
  helvetica: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  garamond: "Garamond, 'Times New Roman', serif",
  verdana: "Verdana, Geneva, sans-serif",
  trebuchet: "'Trebuchet MS', 'Lucida Sans', sans-serif",
};

export function PreviewPanel() {
  const { cv, template, sectionOrder, coverLetter, activeSection } = useCV();
  const isCoverLetter = activeSection === 'cover-letter';
  const fontFamily = fontMap[template.font] || fontMap.sans;

  const renderTemplate = () => {
    const t = template.templateId;
    if (t === 'classic') return <ClassicTemplate cv={cv} template={template} sectionOrder={sectionOrder} />;
    if (t === 'modern') return <ModernTemplate cv={cv} template={template} sectionOrder={sectionOrder} />;
    if (t === 'minimal') return <MinimalTemplate cv={cv} template={template} sectionOrder={sectionOrder} />;
    if (t === 'sidebar') return <SidebarTemplate cv={cv} template={template} sectionOrder={sectionOrder} />;
    if (t === 'double') return <DoubleColumnTemplate cv={cv} template={template} sectionOrder={sectionOrder} />;
    if (t === 'timeline') return <TimelineTemplate cv={cv} template={template} sectionOrder={sectionOrder} />;
    if (t === 'compact') return <CompactTemplate cv={cv} template={template} sectionOrder={sectionOrder} />;
    if (t === 'executive') return <ExecutiveTemplate cv={cv} template={template} sectionOrder={sectionOrder} />;
    return <ClassicTemplate cv={cv} template={template} sectionOrder={sectionOrder} />;
  };

  return (
    <div className="space-y-4 max-w-full">
      {!isCoverLetter && <TemplateSelector />}
      <div id="cv-preview" style={{ fontFamily, fontSize: template.fontSize + 'pt' } as React.CSSProperties}
        className="w-full max-w-[210mm] min-h-[297mm] md:w-[210mm] bg-white shadow-xl shadow-slate-300/50 ring-1 ring-slate-900/5 overflow-hidden">
        {isCoverLetter ? (
          <CoverLetterPreview coverLetter={coverLetter} fullName={cv.personal.fullName} email={cv.personal.email} phone={cv.personal.phone} location={cv.personal.location} linkedIn={cv.personal.linkedIn} accentColor={template.accentColor} fontFamily={fontFamily} />
        ) : renderTemplate()}
      </div>
    </div>
  );
}


