import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

export function EducationForm() {
  const { cv, dispatch } = useCV();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">學歷</h3>
        <button onClick={() => dispatch({ type: 'ADD_EDUCATION' })} className="flex items-center gap-1 text-sm text-blue-600">
          <Plus size={16} /> 新增學歷
        </button>
      </div>
      {cv.education.map((edu, i) => (
        <div key={i} className="border border-slate-200 rounded-lg p-4 space-y-3 relative">
          <button onClick={() => dispatch({ type: 'REMOVE_EDUCATION', index: i })} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
            <Trash2 size={16} />
          </button>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">學校</label>
            <input value={edu.school} onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', index: i, payload: { school: e.target.value } })}
              placeholder="e.g. University of Hong Kong" spellCheck
              className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">學位</label>
              <input value={edu.degree} onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', index: i, payload: { degree: e.target.value } })}
                placeholder="e.g. Bachelor's" className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">科系</label>
              <input value={edu.field} onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', index: i, payload: { field: e.target.value } })}
                placeholder="e.g. Computer Science" className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">開始日期</label>
              <input type="month" value={edu.startDate} onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', index: i, payload: { startDate: e.target.value } })}
                className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">結束日期</label>
              <input type="month" value={edu.endDate || ''} onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', index: i, payload: { endDate: e.target.value } })}
                className="w-full border border-slate-200 rounded px-2 py-2.5 md:py-2 md:py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

