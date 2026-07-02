import { useCV } from '../../context/CVContext';
import { TemplateSelector } from './TemplateSelector';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';
import { SidebarTemplate } from '../templates/SidebarTemplate';
import { DoubleColumnTemplate } from '../templates/DoubleColumnTemplate';

const fontMap: Record<string, string> = {
  sans: "'Inter', system-ui, sans-serif",
  serif: "'Georgia', serif",
  modern: "'Courier New', monospace",
  classic: "'Times New Roman', serif",
};

export function PreviewPanel() {
  const { cv, template, sectionOrder } = useCV();

  const TemplateComponent = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    sidebar: SidebarTemplate,
    double: DoubleColumnTemplate,
  }[template.templateId];

  return (
    <div className="space-y-4 max-w-full">
      <TemplateSelector />
      <div
        id="cv-preview"
        style={{
          fontFamily: fontMap[template.font] || fontMap.sans,
        } as React.CSSProperties}
        className="w-[210mm] min-h-[297mm] bg-white shadow-2xl overflow-hidden"
      >
        <TemplateComponent cv={cv} template={template} sectionOrder={sectionOrder} />
      </div>
    </div>
  );
}
