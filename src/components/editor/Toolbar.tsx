import { useCV } from '../../context/CVContext';
import { Undo2, Redo2, Download, Home, Trash2, Pencil } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ToolbarProps { saved: boolean; }

export function Toolbar({ saved }: ToolbarProps) {
  const ctx = useCV();
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

  const handleNewVersion = () => { const name = prompt('輸入新版本名稱'); if (name && name.trim()) { ctx.saveVersion(name.trim()); ctx.setVersionName(name.trim()); } };

  const handleRenameVersion = () => {
    const currentName = ctx.versionName === 'default' ? '' : ctx.versionName;
    const newName = prompt('修改版本名稱：', currentName);
    if (newName && newName.trim()) {
      const finalName = ctx.versionName === 'default' ? newName.trim() + '(預設版本)' : newName.trim();
      ctx.renameVersion(ctx.versionName, finalName);
      ctx.setVersionName(finalName);
    }
  };

  const handleDeleteVersion = () => {
    if (confirm('確定刪除版本「' + ctx.versionName + '」？')) {
      ctx.deleteVersion(ctx.versionName);
      ctx.setVersionName('default');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/80 flex items-center px-3 lg:px-4 gap-1 shrink-0" style={{minHeight:'44px'}}>
      <button onClick={goHome} className="p-2 rounded-lg hover:bg-slate-100 transition-colors shrink-0" title="首頁"><Home size={16} className="text-slate-500" /></button>
      <div className="w-px h-5 bg-slate-200 hidden sm:block" />
      <button onClick={ctx.undo} disabled={!ctx.canUndo} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-25 shrink-0" title="復原"><Undo2 size={16} className="text-slate-500" /></button>
      <button onClick={ctx.redo} disabled={!ctx.canRedo} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-25 shrink-0" title="重做"><Redo2 size={16} className="text-slate-500" /></button>
      <div className="w-px h-5 bg-slate-200 hidden sm:block" />
      <select value={ctx.versionName} onChange={(e) => { ctx.setVersionName(e.target.value); ctx.loadVersion(e.target.value); }}
        className="text-[11px] border border-slate-200 rounded-lg px-1.5 py-1.5 bg-white text-slate-600 max-w-[90px] sm:max-w-[120px] truncate focus:outline-none shrink-0">
        <option value="default">預設版本</option>
        {ctx.versions.map((v) => <option key={v} value={v}>{v}</option>)}
      </select>
      <button onClick={handleNewVersion} className="text-[11px] px-1.5 py-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 font-medium shrink-0 hidden sm:block">+ 新增</button>
      <button onClick={handleRenameVersion} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 shrink-0 hidden sm:block" title="修改名稱"><Pencil size={12} /></button>
      <button onClick={handleDeleteVersion} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 shrink-0 hidden sm:block" title="刪除"><Trash2 size={12} /></button>
      <div className="flex-1" />
      <button onClick={handleExport} className="flex items-center gap-1 text-xs sm:text-sm bg-blue-600 text-white px-2.5 sm:px-4 py-1.5 rounded-lg hover:bg-blue-700 shadow-sm font-medium shrink-0"><Download size={14} /><span className="hidden sm:inline">匯出 PDF</span></button>
    </div>
  );
}
