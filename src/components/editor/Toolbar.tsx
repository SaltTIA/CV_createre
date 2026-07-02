import { useCV } from '../../context/CVContext';
import { Undo2, Redo2, Download, Save, RotateCcw } from 'lucide-react';

interface ToolbarProps {
  saved: boolean;
}

export function Toolbar({ saved }: ToolbarProps) {
  const { undo, redo, canUndo, canRedo, versionName, versions, loadVersion, saveVersion, setVersionName } = useCV();

  return (
    <div className="h-12 bg-white border-b border-slate-200 flex items-center px-4 gap-2 shrink-0">
      {/* Undo / Redo */}
      <button onClick={undo} disabled={!canUndo} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30" title="復原 Ctrl+Z">
        <Undo2 size={18} />
      </button>
      <button onClick={redo} disabled={!canRedo} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30" title="重做 Ctrl+Y">
        <Redo2 size={18} />
      </button>

      <div className="w-px h-5 bg-slate-200 mx-1" />

      {/* Version selector */}
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

      {/* Save status */}
      <span className="text-xs text-slate-400">{saved ? '已儲存' : '儲存中…'}</span>

      {/* Export */}
      <button className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700">
        <Download size={16} />
        匯出 PDF
      </button>
    </div>
  );
}

