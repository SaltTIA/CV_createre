import { useCV } from '../../context/CVContext';
import { Undo2, Redo2, Download, Home, Trash2, Pencil, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ToolbarProps { saved: boolean; }

export function Toolbar({ saved }: ToolbarProps) {
  const ctx = useCV();
  const navigate = useNavigate();
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMode, setNewMode] = useState<'blank' | 'duplicate' | 'copy'>('duplicate');
  const [copySource, setCopySource] = useState('');

  const handleExport = useCallback(() => {
    const preview = document.getElementById('cv-preview');
    if (!preview) return;
    const parent = preview.parentElement;
    const body = document.body;
    const originalStyles = preview.getAttribute('style') || '';
    preview.setAttribute('style', originalStyles + ';position:fixed!important;left:0!important;top:0!important;width:210mm!important;min-height:297mm!important;z-index:99999!important;background:white!important;box-shadow:none!important;margin:0!important;padding:0!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;');
    const allEls = preview.querySelectorAll('*');
    allEls.forEach(el => { const e = el as HTMLElement; e.style.setProperty('-webkit-print-color-adjust', 'exact', 'important'); e.style.setProperty('print-color-adjust', 'exact', 'important'); });
    body.appendChild(preview); window.print();
    setTimeout(() => { if (parent) { parent.appendChild(preview); preview.setAttribute('style', originalStyles); } }, 100);
  }, []);

  const goHome = useCallback(() => { navigate('/'); }, [navigate]);

  const handleCreateVersion = () => {
    const name = newName.trim();
    if (!name) return;

    if (newMode === 'blank') {
      const emptyCV = { personal:{fullName:'',email:'',phone:'',location:''}, summary:'', experiences:[], education:[], skills:[], languages:[], certifications:[], projects:[], customSections:[] };
      localStorage.setItem('cv-version-' + name, JSON.stringify(emptyCV));
      ctx.refreshVersions();
      ctx.setVersionName(name);
      ctx.dispatch({ type: 'LOAD_CV', payload: emptyCV });
    } else if (newMode === 'duplicate') {
      ctx.saveVersion(name);
      ctx.setVersionName(name);
    } else if (newMode === 'copy') {
      const src = localStorage.getItem('cv-version-' + copySource);
      if (src) {
        localStorage.setItem('cv-version-' + name, src);
        ctx.refreshVersions();
        ctx.setVersionName(name);
        ctx.dispatch({ type: 'LOAD_CV', payload: JSON.parse(src) });
      }
    }
    setShowNewDialog(false);
    setNewName('');
  };

  const openNewDialog = () => {
    const now = new Date();
    const defaultName = 'CV ' + now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
    setNewName(defaultName);
    setNewMode('duplicate');
    setCopySource(ctx.versions.length > 0 ? ctx.versions[0] : '');
    setShowNewDialog(true);
  };

  const handleRenameVersion = () => {
    const newN = prompt('修改版本名稱：', ctx.versionName === 'default' ? '' : ctx.versionName);
    if (newN && newN.trim()) {
      const final = ctx.versionName === 'default' ? newN.trim() + '(預設版本)' : newN.trim();
      ctx.renameVersion(ctx.versionName, final);
      ctx.setVersionName(final);
    }
  };

  const handleDeleteVersion = () => {
    if (confirm('確定刪除版本「' + ctx.versionName + '」？')) {
      ctx.deleteVersion(ctx.versionName);
      ctx.setVersionName('default');
    }
  };

  const otherVersions = ctx.versions.filter(v => v && v !== ctx.versionName);

  return (
    <>
      {/* New Version Dialog */}
      {showNewDialog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-semibold text-slate-800">新增 CV 版本</h3>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">版本名稱</label>
              <input value={newName} onChange={(e) => setNewName(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="mode" checked={newMode === 'blank'} onChange={() => setNewMode('blank')} />
                <span className="text-sm text-slate-700">建立空白 CV</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="mode" checked={newMode === 'duplicate'} onChange={() => setNewMode('duplicate')} />
                <span className="text-sm text-slate-700">複製當前版本（{ctx.versionName}）</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="mode" checked={newMode === 'copy'} onChange={() => setNewMode('copy')} />
                <span className="text-sm text-slate-700">從其他版本複製</span>
              </label>
              {newMode === 'copy' && otherVersions.length > 0 && (
                <select value={copySource} onChange={(e) => setCopySource(e.target.value)}
                  className="ml-6 border border-slate-200 rounded-lg px-2 py-1 text-sm">
                  {otherVersions.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              )}
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowNewDialog(false)}
                className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">取消</button>
              <button onClick={handleCreateVersion} disabled={!newName.trim()}
                className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40">建立</button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/80 flex items-center px-3 lg:px-4 gap-1 shrink-0" style={{minHeight:'44px'}}>
        <button onClick={goHome} className="p-2 rounded-lg hover:bg-slate-100 transition-colors shrink-0" title="首頁"><Home size={16} className="text-slate-500" /></button>
        <div className="w-px h-5 bg-slate-200 hidden sm:block" />
        <button onClick={ctx.undo} disabled={!ctx.canUndo} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-25 shrink-0" title="復原"><Undo2 size={16} className="text-slate-500" /></button>
        <button onClick={ctx.redo} disabled={!ctx.canRedo} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-25 shrink-0" title="重做"><Redo2 size={16} className="text-slate-500" /></button>
        <div className="w-px h-5 bg-slate-200 hidden sm:block" />
        <select value={ctx.versionName} onChange={(e) => { ctx.setVersionName(e.target.value); ctx.loadVersion(e.target.value); }}
          className="text-[11px] border border-slate-200 rounded-lg px-1.5 py-1.5 bg-white text-slate-600 max-w-[90px] sm:max-w-[120px] truncate focus:outline-none shrink-0">
          <option value="default">預設版本</option>
          {ctx.versions.filter(v=>v).map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        <button onClick={openNewDialog} className="text-[11px] px-1.5 py-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 font-medium shrink-0 hidden sm:block"><Plus size={12} className="inline mr-0.5" />新增</button>
        <button onClick={handleRenameVersion} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 shrink-0 hidden sm:block" title="修改名稱"><Pencil size={12} /></button>
        <button onClick={handleDeleteVersion} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 shrink-0 hidden sm:block" title="刪除"><Trash2 size={12} /></button>
        <div className="flex-1" />
        <button onClick={handleExport} className="flex items-center gap-1 text-xs sm:text-sm bg-blue-600 text-white px-2.5 sm:px-4 py-1.5 rounded-lg hover:bg-blue-700 shadow-sm font-medium shrink-0"><Download size={14} /><span className="hidden sm:inline">匯出 PDF</span></button>
      </div>
    </>
  );
}
