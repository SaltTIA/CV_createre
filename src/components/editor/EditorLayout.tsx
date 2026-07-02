import { useCV } from '../../context/CVContext';
import { SectionNav } from './SectionNav';
import { FormPanel } from '../forms/FormPanel';
import { PreviewPanel } from '../preview/PreviewPanel';
import { Toolbar } from './Toolbar';
import { useState, useEffect } from 'react';

export function EditorLayout() {
  const { activeSection, setActiveSection, sectionOrder, setSectionOrder } = useCV();
  const [saved, setSaved] = useState(true);

  useEffect(() => { setSaved(false); const t = setTimeout(() => setSaved(true), 300); return () => clearTimeout(t); }, [activeSection]);

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <Toolbar saved={saved} />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[420px] min-w-[380px] flex flex-col border-r border-slate-200/80 bg-white shadow-sm z-10">
          <SectionNav sections={sectionOrder} active={activeSection} onSelect={setActiveSection} onReorder={setSectionOrder} />
          <div className="flex-1 overflow-y-auto p-6">
            <FormPanel section={activeSection} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100 flex justify-center items-start">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}

