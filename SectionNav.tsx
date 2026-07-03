import { useState, useCallback, useRef, useEffect } from 'react';
import { SectionKey } from '../../types/cv';
import { sectionLabels } from '../../data/labels';
import { useCV } from '../../context/CVContext';
import { ChevronUp, ChevronDown, FileText } from 'lucide-react';

interface SectionNavProps {
  sections: SectionKey[];
  active: SectionKey;
  onSelect: (s: SectionKey) => void;
  onReorder: (order: SectionKey[]) => void;
}

export function SectionNav({ sections, active, onSelect, onReorder }: SectionNavProps) {
  const { template, setTemplate } = useCV();
  const mainSections = sections.filter(k => k !== 'cover-letter');
  const tabRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const prevRects = useRef<Map<string, DOMRect>>(new Map());
  const [animating, setAnimating] = useState(false);

  // Save current positions before reorder
  const capturePositions = useCallback(() => {
    const rects = new Map<string, DOMRect>();
    tabRefs.current.forEach((el, key) => {
      rects.set(key, el.getBoundingClientRect());
    });
    return rects;
  }, []);

  // Apply FLIP animation
  const animateFLIP = useCallback((prevRectsMap: Map<string, DOMRect>) => {
    setAnimating(true);
    requestAnimationFrame(() => {
      tabRefs.current.forEach((el, key) => {
        const prev = prevRectsMap.get(key);
        const curr = el.getBoundingClientRect();
        if (!prev) return;
        const dx = prev.left - curr.left;
        const dy = prev.top - curr.top;
        if (dx !== 0 || dy !== 0) {
          // Invert: move element to old position
          el.style.transform = `translate(${dx}px, ${dy}px)`;
          el.style.transition = 'none';
          // Play: animate back to natural position
          requestAnimationFrame(() => {
            el.style.transition = 'transform 0.3s ease-out';
            el.style.transform = 'translate(0, 0)';
          });
        }
      });
      setTimeout(() => setAnimating(false), 350);
    });
  }, []);

  const moveUp = (idx: number) => {
    if (idx <= 0) return;
    const prevRectsMap = capturePositions();
    const next = [...mainSections];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onReorder([...next, 'cover-letter']);
    requestAnimationFrame(() => animateFLIP(prevRectsMap));
  };

  const moveDown = (idx: number) => {
    if (idx >= mainSections.length - 1) return;
    const prevRectsMap = capturePositions();
    const next = [...mainSections];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onReorder([...next, 'cover-letter']);
    requestAnimationFrame(() => animateFLIP(prevRectsMap));
  };

  return (
    <div className="border-b border-slate-100 bg-slate-50/80">
      <div className="flex flex-wrap items-center gap-1 p-2.5">
        {mainSections.map((key, i) => (
          <div key={key}
            ref={(el) => { if (el) tabRefs.current.set(key, el); }}
            className="flex items-center">
            <button onClick={() => onSelect(key)}
              className={`text-xs px-3 py-1.5 rounded-l-md whitespace-nowrap font-medium ${
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
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            active === 'cover-letter' ? 'bg-blue-600 text-white shadow-sm' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
          }`}>
        <FileText size={12} /> {sectionLabels['cover-letter']}
      </button>
    </div>

    <div className="flex items-center gap-3 px-3 py-2.5 border-t border-slate-100">
      <span className="text-[10.5px] font-medium text-slate-500 shrink-0">字型大小</span>
      <input type="range" min="6" max="14" step="0.5" value={template.fontSize}
        onChange={(e) => setTemplate({ ...template, fontSize: parseFloat(e.target.value) })}
        className="flex-1 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
      <span className="text-[10.5px] text-slate-400 w-8 text-right shrink-0 tabular-nums">{template.fontSize}pt</span>
    </div>
  </div>
  );
}
