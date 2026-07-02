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
  // Separate cover-letter from reorderable sections
  const mainSections = sections.filter(k => k !== 'cover-letter');

  const moveUp = (idx: number) => {
    if (idx <= 0) return;
    const next = [...mainSections];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    // Keep cover-letter at the end
    onReorder([...next, 'cover-letter']);
  };

  const moveDown = (idx: number) => {
    if (idx >= mainSections.length - 1) return;
    const next = [...mainSections];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onReorder([...next, 'cover-letter']);
  };

  return (
    <div className="border-b border-slate-200 bg-slate-50">
      <div className="flex flex-wrap items-center gap-1 p-3">
        {/* Reorderable section tabs */}
        {mainSections.map((key, i) => (
          <div key={key} className="flex items-center">
            <button
              onClick={() => onSelect(key)}
              className={`text-xs px-2.5 py-1.5 rounded-l-md whitespace-nowrap transition-colors`}
              style={{
                backgroundColor: active === key ? '#2563eb' : '#fff',
                color: active === key ? '#fff' : '#475569',
                border: active === key ? '1px solid #2563eb' : '1px solid #e2e8f0',
                borderRight: 'none',
              }}
            >
              {sectionLabels[key] || key}
            </button>
            <div className="flex flex-col rounded-r-md overflow-hidden" style={{
              backgroundColor: active === key ? '#1d4ed8' : '#fff',
              border: active === key ? '1px solid #2563eb' : '1px solid #e2e8f0',
              borderLeft: 'none',
            }}>
              <button
                onClick={(e) => { e.stopPropagation(); moveUp(i); }}
                disabled={i === 0}
                className="px-1 py-0.5 hover:bg-slate-100 disabled:opacity-20 disabled:cursor-default cursor-pointer"
              >
                <ChevronUp size={14} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); moveDown(i); }}
                disabled={i === mainSections.length - 1}
                className="px-1 py-0.5 hover:bg-slate-100 disabled:opacity-20 disabled:cursor-default cursor-pointer"
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        ))}

        {/* Separator */}
        <div className="w-px h-6 bg-slate-300 mx-2" />

        {/* Cover letter - standalone, not reorderable */}
        <button
          onClick={() => onSelect('cover-letter')}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md whitespace-nowrap transition-colors`}
          style={{
            backgroundColor: active === 'cover-letter' ? '#2563eb' : '#fffbeb',
            color: active === 'cover-letter' ? '#fff' : '#92400e',
            border: active === 'cover-letter' ? '1px solid #2563eb' : '1px solid #fcd34d',
          }}
        >
          <FileText size={13} />
          {sectionLabels['cover-letter']}
        </button>
      </div>
    </div>
  );
}
