import { useCV } from '../../context/CVContext';
import { SectionNav } from './SectionNav';
import { FormPanel } from '../forms/FormPanel';
import { PreviewPanel } from '../preview/PreviewPanel';
import { Toolbar } from './Toolbar';
import { useState, useEffect } from 'react';
import { Eye, Pencil } from 'lucide-react';

export function EditorLayout() {
  const { activeSection, setActiveSection, sectionOrder, setSectionOrder } = useCV();
  const [saved, setSaved] = useState(true);
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');

  useEffect(() => { setSaved(false); const t = setTimeout(() => setSaved(true), 300); return () => clearTimeout(t); }, [activeSection]);

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <Toolbar saved={saved} />

      {/* Mobile toggle */}
      <div className="md:hidden flex border-b border-slate-200 bg-white">
        <button onClick={() => setMobileView('form')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            mobileView === 'form' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'
          }`}>
          <Pencil size={16} /> 編輯
        </button>
        <button onClick={() => setMobileView('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            mobileView === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'
          }`}>
          <Eye size={16} /> 預覽
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - hidden on mobile when previewing */}
        <div className={`md:w-[420px] md:min-w-[380px] w-full flex flex-col border-r border-slate-200/80 bg-white shadow-sm z-10 ${
          mobileView !== 'form' ? 'hidden md:flex' : 'flex'
        }`}>
          <SectionNav sections={sectionOrder} active={activeSection} onSelect={setActiveSection} onReorder={setSectionOrder} />
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <FormPanel section={activeSection} />
          </div>
        </div>

        {/* Right panel - hidden on mobile when editing */}
        <div className={`flex-1 overflow-y-auto p-3 md:p-6 bg-slate-100 flex justify-center items-start ${
          mobileView !== 'preview' ? 'hidden md:flex' : 'flex'
        }`}>
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
