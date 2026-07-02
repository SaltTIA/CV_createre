import { useCV } from '../../context/CVContext';
import { Undo2, Redo2, Download, Home } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ToolbarProps { saved: boolean; }

export function Toolbar({ saved }: ToolbarProps) {
  const { undo, redo, canUndo, canRedo, versionName, versions, loadVersion, setVersionName } = useCV();
  const navigate = useNavigate();

  const handleExport = useCallback(() => { window.print(); }, []);
  const goHome = useCallback(() => { navigate('/'); }, [navigate]);

  return (
    <div className="h-12 bg-white/80 backdrop-blur-sm border-b border-slate-200/80 flex items-center px-4 gap-1.5 shrink-0">
      <button onClick={goHome} className="p-2 rounded-lg hover:bg-slate-100 transition-colors" title="返回首頁">
        <Home size={17} className="text-slate-500" />
      </button>
      <div className="w-px h-5 bg-slate-200 mx-1" />
      <button onClick={undo} disabled={!canUndo} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-25 transition-colors" title="復原">
        <Undo2 size={17} className="text-slate-500" />
      </button>
      <button onClick={redo} disabled={!canRedo} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-25 transition-colors" title="重做">
        <Redo2 size={17} className="text-slate-500" />
      </button>
      <div className="w-px h-5 bg-slate-200 mx-1" />
      <select value={versionName} onChange={(e) => { setVersionName(e.target.value); loadVersion(e.target.value); }}
        className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
        <option value="default">預設版本</option>
        {versions.map((v) => <option key={v} value={v}>{v}</option>)}
      </select>
      <div className="flex-1" />
      <span className="text-xs text-slate-400">{saved ? '✓ 已儲存' : '儲存中…'}</span>
      <button onClick={handleExport}
        className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-200 transition-all font-medium cursor-pointer">
        <Download size={15} /> 匯出 PDF
      </button>
    </div>
  );
}
