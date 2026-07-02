import { useState, useCallback } from 'react';
import { SectionKey } from '../../types/cv';
import { sectionLabels } from '../../data/labels';
import { ChevronUp, ChevronDown, FileText } from 'lucide-react';

interface SectionNavProps {
  sections: SectionKey[];
  active: SectionKey;
  onSelect: (s: SectionKey) => void;
  onReorder: (order: SectionKey[]) => void;
}

export function SectionNav({ sections, active, onSelect, onReorder }: SectionNavProps) {
  const mainSections = sections.filter(k => k !== 'cover-letter');
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const animate = useCallback((idx: number, callback: () => void) => {
    setAnimatingIndex(idx);
    callback();
    setTimeout(() => setAnimatingIndex(null), 250);
  }, []);

  const moveUp = (idx: number) => {
    if (idx <= 0) return;
    animate(idx - 1, () => {
      const next = [...mainSections];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      onReorder([...next, 'cover-letter']);
    });
  };

  const moveDown = (idx: number) => {
    if (idx >= mainSections.length - 1) return;
    animate(idx + 1, () => {
      const next = [...mainSections];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      onReorder([...next, 'cover-letter']);
    });
  };

  return (
    <div className="border-b border-slate-100 bg-slate-50/80">
      <style>{`
        @keyframes tabPulse {
          0% { transform: scale(1); }
          30% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .tab-animate {
          animation: tabPulse 0.25s ease-out;
        }
      `}</style>
      <div className="flex flex-wrap items-center gap-1 p-2.5">
        {mainSections.map((key, i) => (
          <div key={key} className={`flex items-center ${animatingIndex === i ? 'tab-animate' : ''}`}>
            <button onClick={() => onSelect(key)}
              className={`text-xs px-3 py-1.5 rounded-l-md whitespace-nowrap font-medium transition-all ${
                active === key ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:text-slate-700 border border-r-0 border-slate-200 hover:bg-slate-50'
              }`}>
              {sectionLabels[key] || key}
            </button>
            <div className="flex flex-col rounded-r-md overflow-hidden bg-white border border-l-0 border-slate-200">
              <button onClick={(e) => { e.stopPropagation(); moveUp(i); }} disabled={i === 0}
                className="px-1.5 py-0.5 hover:bg-slate-100 disabled:opacity-15 cursor-pointer transition-colors">
                <ChevronUp size={13} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); moveDown(i); }} disabled={i === mainSections.length - 1}
                className="px-1.5 py-0.5 hover:bg-slate-100 disabled:opacity-15 cursor-pointer transition-colors">
                <ChevronDown size={13} />
              </button>
            </div>
          </div>
        ))}
        <div className="w-px h-5 bg-slate-200 mx-1.5" />
        <button onClick={() => onSelect('cover-letter')}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md whitespace-nowrap font-medium transition-all ${
            active === 'cover-letter' ? 'bg-blue-600 text-white shadow-sm' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
          }`}>
          <FileText size={12} /> {sectionLabels['cover-letter']}
        </button>
      </div>
    </div>
  );
}
