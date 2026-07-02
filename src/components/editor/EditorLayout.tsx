import { useCV, DEFAULT_SECTION_ORDER } from '../../context/CVContext';
import { SectionNav } from './SectionNav';
import { FormPanel } from '../forms/FormPanel';
import { PreviewPanel } from '../preview/PreviewPanel';
import { Toolbar } from './Toolbar';
import { SectionKey } from '../../types/cv';
import { useState, useEffect } from 'react';

export function EditorLayout() {
  const { activeSection, setActiveSection, sectionOrder, setSectionOrder } = useCV();
  const [saved, setSaved] = useState(true);

  // brief "saved" indicator
  useEffect(() => {
    setSaved(false);
    const t = setTimeout(() => setSaved(true), 300);
    return () => clearTimeout(t);
  }, [activeSection]);

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* Toolbar */}
      <Toolbar saved={saved} />

      {/* Main content: left editor + right preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Section nav + form */}
        <div className="w-[400px] min-w-[360px] flex flex-col border-r border-slate-200 bg-white">
          <SectionNav
            sections={sectionOrder}
            active={activeSection}
            onSelect={setActiveSection}
            onReorder={setSectionOrder}
          />
          <div className="flex-1 overflow-y-auto p-6">
            <FormPanel section={activeSection} />
          </div>
        </div>

        {/* Right: Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-200 flex justify-center">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}

