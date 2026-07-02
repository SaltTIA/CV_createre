import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

export function ProjectsForm() {
  const { cv, dispatch } = useCV();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">作品集（選填）</h3>
        <button onClick={() => dispatch({ type: 'ADD_PROJECT' })} className="flex items-center gap-1 text-sm text-blue-600">
          <Plus size={16} /> 新增作品
        </button>
      </div>
      {cv.projects.map((proj, i) => (
        <div key={i} className="border border-slate-200 rounded-lg p-4 space-y-3 relative">
          <button onClick={() => dispatch({ type: 'REMOVE_PROJECT', index: i })} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
            <Trash2 size={16} />
          </button>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">作品名稱</label>
            <input value={proj.name} onChange={(e) => dispatch({ type: 'UPDATE_PROJECT', index: i, payload: { name: e.target.value } })}
              placeholder="e.g. OpenCV Editor" spellCheck
              className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">連結（選填）</label>
            <input value={proj.url || ''} onChange={(e) => dispatch({ type: 'UPDATE_PROJECT', index: i, payload: { url: e.target.value } })}
              placeholder="e.g. github.com/..." spellCheck
              className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">描述</label>
            <textarea value={proj.description} onChange={(e) => dispatch({ type: 'UPDATE_PROJECT', index: i, payload: { description: e.target.value } })}
              placeholder="Brief description of the project" spellCheck rows={3}
              className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
