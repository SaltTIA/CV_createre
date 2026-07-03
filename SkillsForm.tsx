import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

export function SkillsForm() {
  const { cv, dispatch } = useCV();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">技能</h3>
        <button onClick={() => dispatch({ type: 'ADD_SKILL' })} className="flex items-center gap-1 text-sm text-blue-600">
          <Plus size={16} /> 新增技能類別
        </button>
      </div>
      {cv.skills.map((s, i) => (
        <div key={i} className="border border-slate-200 rounded-lg p-4 space-y-3 relative">
          <button onClick={() => dispatch({ type: 'REMOVE_SKILL', index: i })} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
            <Trash2 size={16} />
          </button>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">類別</label>
            <input value={s.category} onChange={(e) => dispatch({ type: 'UPDATE_SKILL', index: i, payload: { category: e.target.value } })}
              placeholder="e.g. Programming" spellCheck
              className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">技能內容（逗號分隔）</label>
            <input value={s.items} onChange={(e) => dispatch({ type: 'UPDATE_SKILL', index: i, payload: { items: e.target.value } })}
              placeholder="e.g. TypeScript, Python, SQL" spellCheck
              className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      ))}
    </div>
  );
}

