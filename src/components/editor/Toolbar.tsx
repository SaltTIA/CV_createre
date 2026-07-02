import { useCV } from '../../context/CVContext';
import { Undo2, Redo2, Download, Home, Trash2, Pencil } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ToolbarProps { saved: boolean; }

export function Toolbar({ saved }: ToolbarProps) {
  const { undo, redo, canUndo, canRedo, versionName, versions, loadVersion, saveVersion, deleteVersion, renameVersion, setVersionName } = useCV();
  const navigate = useNavigate();

  const handleExport = useCallback(() => {
    const preview = document.getElementById('cv-preview');
    if (!preview) return;
    const parent = preview.parentElement;
    const body = document.body;
    const originalStyles = preview.getAttribute('style') || '';
    preview.setAttribute('style', originalStyles + ';position:fixed!important;left:0!important;top:0!important;width:210mm!important;min-height:297mm!important;z-index:99999!important;background:white!important;box-shadow:none!important;margin:0!important;padding:0!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;');
    const allEls = preview.querySelectorAll('*');
    allEls.forEach(el => { const e = el as HTMLElement; e.style.setProperty('-webkit-print-color-adjust', 'exact', 'important'); e.style.setProperty('print-color-adjust', 'exact', 'important'); });
    body.appendChild(preview);
    window.print();
    setTimeout(() => { if (parent) { parent.appendChild(preview); preview.setAttribute('style', originalStyles); } }, 100);
  }, []);

  const goHome = useCallback(() => { navigate('/'); }, [navigate]);

  const handleNewVersion = () => {
    const name = prompt('輸入新版本名稱');
    if (name && name.trim()) {
      saveVersion(name.trim());
      setVersionName(name.trim());
    }
  };

  const handleDeleteVersion = () => {
    if (versionName === 'default') return;
    if (confirm('確定刪除版本「' + versionName + '」？此操作無法復原。')) {
      deleteVersion(versionName);
      setVersionName('default');
      loadVersion('default');
    }
  };

  const handleRenameVersion = () => {
    if (versionName === 'default') return;
    const newName = prompt('修改版本名稱：', versionName);
    if (newName && newName.trim() && newName.trim() !== versionName) {
      renameVersion(versionName, newName.trim());
      setVersionName(newName.trim());
    }
  };

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
        {versions.length === 0 && <option value="default">預設版本</option>}
        {versions.map((v) => <option key={v} value={v}>{v}</option>)}
      </select>
      <button onClick={handleNewVersion}
        className="text-xs px-2 py-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors font-medium shrink-0">
        + 新增
      </button>
      {versionName !== 'default' && (
        <>
          <button onClick={handleRenameVersion}
            className="text-xs px-2 py-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors font-medium shrink-0" title="修改名稱">
            <Pencil size={13} />
          </button>
          <button onClick={handleDeleteVersion}
            className="text-xs px-2 py-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium shrink-0" title="刪除當前版本">
            <Trash2 size={13} />
          </button>
        </>
      )}

      <div className="flex-1" />
      <span className="text-xs text-slate-400 hidden sm:inline">{saved ? '已儲存' : '儲存中…'}</span>
      <button onClick={handleExport}
        className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-200 transition-all font-medium cursor-pointer shrink-0">
        <Download size={15} /> 匯出 PDF
      </button>
    </div>
  );
}
