import { useCV } from '../../context/CVContext';
import { Undo2, Redo2, Download, Loader } from 'lucide-react';
import { useCallback, useState } from 'react';

interface ToolbarProps {
  saved: boolean;
}

function fixOklchColors(clonedDoc: Document) {
  // Walk all elements and replace oklch() in inline styles
  const all = clonedDoc.querySelectorAll('*');
  all.forEach((el) => {
    const el2 = el as HTMLElement;
    const style = el2.getAttribute('style');
    if (style && style.includes('oklch')) {
      // Replace oklch values with black as fallback, then let computed style resolve
      el2.setAttribute('style', style.replace(/oklch\([^)]+\)/g, 'transparent'));
    }
  });

  // Replace oklch in stylesheets
  const sheets = clonedDoc.styleSheets;
  for (let i = 0; i < sheets.length; i++) {
    try {
      const sheet = sheets[i] as CSSStyleSheet;
      const rules = sheet.cssRules || sheet.rules;
      if (!rules) continue;
      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];
        if (rule instanceof CSSStyleRule && rule.style) {
          const s = rule.style as CSSStyleDeclaration;
          for (let k = 0; k < s.length; k++) {
            const prop = s[k];
            const val = s.getPropertyValue(prop);
            if (val.includes('oklch(')) {
              // Force the element to use resolved/computed color
              // by setting the property to empty - the browser will resolve it
              s.setProperty(prop, '', '');
            }
          }
        }
      }
    } catch (_) { /* cross-origin stylesheet */ }
  }

  // Now force each element to use its computed style
  all.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const computed = clonedDoc.defaultView?.getComputedStyle(htmlEl);
    if (!computed) return;

    const props = ['color', 'background-color', 'border-color', 'outline-color', 'text-decoration-color'];
    for (const prop of props) {
      const val = computed.getPropertyValue(prop);
      if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent') {
        htmlEl.style.setProperty(prop, val, 'important');
      }
    }
  });
}

export function Toolbar({ saved }: ToolbarProps) {
  const { undo, redo, canUndo, canRedo, versionName, versions, loadVersion, setVersionName } = useCV();
  const [exporting, setExporting] = useState(false);

  const handleExport = useCallback(async () => {
    const element = document.getElementById('cv-preview');
    if (!element || exporting) return;

    setExporting(true);
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const opt = {
        margin: [0, 0, 0, 0],
        filename: 'cv.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          onclone: fixOklchColors,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF export error:', err);
      alert('匯出失敗：' + (err instanceof Error ? err.message : '請稍後再試'));
    } finally {
      setExporting(false);
    }
  }, [exporting]);

  return (
    <>
      {exporting && (
        <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl px-8 py-6 flex items-center gap-3">
            <Loader size={24} className="animate-spin text-blue-600" />
            <span className="text-slate-700 font-medium">正在匯出 PDF…</span>
          </div>
        </div>
      )}

      <div className="h-12 bg-white border-b border-slate-200 flex items-center px-4 gap-2 shrink-0">
        <button onClick={undo} disabled={!canUndo} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30" title="復原 Ctrl+Z">
          <Undo2 size={18} />
        </button>
        <button onClick={redo} disabled={!canRedo} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30" title="重做 Ctrl+Y">
          <Redo2 size={18} />
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1" />

        <select
          value={versionName}
          onChange={(e) => { setVersionName(e.target.value); loadVersion(e.target.value); }}
          className="text-sm border border-slate-200 rounded px-2 py-1 bg-white"
        >
          <option value="default">預設版本</option>
          {versions.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <div className="flex-1" />

        <span className="text-xs text-slate-400">{saved ? '已儲存' : '儲存中…'}</span>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          <Download size={16} />
          {exporting ? '匯出中…' : '匯出 PDF'}
        </button>
      </div>
    </>
  );
}
