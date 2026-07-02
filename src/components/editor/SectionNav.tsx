import { useCV } from '../../context/CVContext';
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
  const move = (idx: number, dir: -1 | 1) => {
    const next = [...sections];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onReorder(next);
  };

  return (
    <div className="flex flex-wrap gap-1 p-3 border-b border-slate-200 bg-slate-50">
      {sections.map((key, i) => (
        <div key={key} className="flex items-center gap-0.5">
          <button
            onClick={() => onSelect(key)}
            className={`text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              active === key
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {sectionLabels[key] || key}
          </button>
          {/* Reorder arrows */}
          <div className="flex flex-col">
            <button onClick={() => move(i, -1)} disabled={i === 0} className="p-0 disabled:opacity-20">
              <ChevronUp size={10} />
            </button>
            <button onClick={() => move(i, 1)} disabled={i === sections.length - 1} className="p-0 disabled:opacity-20">
              <ChevronDown size={10} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
