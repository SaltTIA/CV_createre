import { useCV } from '../../context/CVContext';
import { Proficiency } from '../../types/cv';
import { Plus, Trash2 } from 'lucide-react';

const LEVELS: { value: Proficiency; label: string }[] = [
  { value: 'Native', label: '母語' },
  { value: 'Fluent', label: '流利' },
  { value: 'Advanced', label: '進階' },
  { value: 'Intermediate', label: '中級' },
  { value: 'Basic', label: '基礎' },
];

export function LanguagesForm() {
  const { cv, dispatch } = useCV();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">語言能力</h3>
        <button onClick={() => dispatch({ type: 'ADD_LANGUAGE' })} className="flex items-center gap-1 text-sm text-blue-600">
          <Plus size={16} /> 新增語言
        </button>
      </div>
      {cv.languages.map((lang, i) => (
        <div key={i} className="flex items-center gap-3 border border-slate-200 rounded-lg p-3 relative">
          <button onClick={() => dispatch({ type: 'REMOVE_LANGUAGE', index: i })} className="absolute top-1 right-1 text-red-400 hover:text-red-600">
            <Trash2 size={14} />
          </button>
          <input value={lang.language} onChange={(e) => dispatch({ type: 'UPDATE_LANGUAGE', index: i, payload: { language: e.target.value } })}
            placeholder="e.g. English" spellCheck
            className="flex-1 border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <select value={lang.proficiency} onChange={(e) => dispatch({ type: 'UPDATE_LANGUAGE', index: i, payload: { proficiency: e.target.value as Proficiency } })}
            className="border border-slate-200 rounded px-2 py-1.5 text-sm">
            {LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}
