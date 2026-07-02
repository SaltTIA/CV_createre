import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

export function ExperienceForm() {
  const { cv, dispatch } = useCV();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">工作經歷</h3>
        <button
          onClick={() => dispatch({ type: 'ADD_EXPERIENCE' })}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <Plus size={16} /> 新增經歷
        </button>
      </div>

      {cv.experiences.map((exp, i) => (
        <div key={i} className="border border-slate-200 rounded-lg p-4 space-y-3 relative">
          <button
            onClick={() => dispatch({ type: 'REMOVE_EXPERIENCE', index: i })}
            className="absolute top-2 right-2 text-red-400 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">公司</label>
              <input value={exp.company} onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', index: i, payload: { company: e.target.value } })}
                placeholder="e.g. TechCorp Ltd" spellCheck
                className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">職位</label>
              <input value={exp.title} onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', index: i, payload: { title: e.target.value } })}
                placeholder="e.g. Senior Frontend Engineer" spellCheck
                className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">開始日期</label>
              <input type="month" value={exp.startDate} onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', index: i, payload: { startDate: e.target.value } })}
                className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">結束日期</label>
              <input type="month" value={exp.endDate || ''} onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', index: i, payload: { endDate: e.target.value } })}
                disabled={exp.current}
                className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={exp.current} onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', index: i, payload: { current: e.target.checked } })}
              className="rounded" />
            現任職位
          </label>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">工作描述（每行一個要點）</label>
            <textarea value={exp.description} onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', index: i, payload: { description: e.target.value } })}
              placeholder={"e.g. Led migration to React/TypeScript\nReduced bundle size by 40%"}
              spellCheck rows={3}
              className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
        </div>
      ))}
    </div>
  );
}

