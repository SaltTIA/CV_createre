import { SectionKey } from '../../types/cv';
import { sectionLabels } from '../../data/labels';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SectionNavProps {
  sections: SectionKey[];
  active: SectionKey;
  onSelect: (s: SectionKey) => void;
  onReorder: (order: SectionKey[]) => void;
}

export function SectionNav({ sections, active, onSelect, onReorder }: SectionNavProps) {
  const moveUp = (idx: number) => {
    if (idx <= 0) return;
    const next = [...sections];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onReorder(next);
  };

  const moveDown = (idx: number) => {
    if (idx >= sections.length - 1) return;
    const next = [...sections];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onReorder(next);
  };

  return (
    <div className="border-b border-slate-200 bg-slate-50">
      {/* Scrollable tab bar */}
      <div className="flex overflow-x-auto p-3 gap-1.5" style={{ scrollbarWidth: 'thin' }}>
        {sections.map((key, i) => (
          <div key={key} className="flex items-center shrink-0">
            <button
              onClick={() => onSelect(key)}
              className={`text-xs px-2.5 py-1.5 rounded-l-md whitespace-nowrap transition-colors ${
                active === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-r-0 border-slate-200'
              }`}
            >
              {sectionLabels[key] || key}
            </button>
            <div className={`flex flex-col border-l-0 rounded-r-md overflow-hidden ${
              active === key ? 'bg-blue-700' : 'bg-white border border-l-0 border-slate-200'
            }`}>
              <button
                onClick={(e) => { e.stopPropagation(); moveUp(i); }}
                disabled={i === 0}
                className="px-1 py-0.5 hover:bg-slate-100 disabled:opacity-20 disabled:cursor-default cursor-pointer"
              >
                <ChevronUp size={14} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); moveDown(i); }}
                disabled={i === sections.length - 1}
                className="px-1 py-0.5 hover:bg-slate-100 disabled:opacity-20 disabled:cursor-default cursor-pointer"
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        ))}

        {/* Quick link to cover letter if not visible */}
        {active !== 'cover-letter' && (
          <button
            onClick={() => onSelect('cover-letter')}
            className="text-xs px-3 py-1.5 rounded-md whitespace-nowrap bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 shrink-0 ml-auto"
          >
            ✉ 求職信
          </button>
        )}
      </div>
    </div>
  );
}
