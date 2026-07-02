import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

export function CertificationsForm() {
  const { cv, dispatch } = useCV();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">證照</h3>
        <button onClick={() => dispatch({ type: 'ADD_CERTIFICATION' })} className="flex items-center gap-1 text-sm text-blue-600">
          <Plus size={16} /> 新增證照
        </button>
      </div>
      {cv.certifications.map((cert, i) => (
        <div key={i} className="border border-slate-200 rounded-lg p-4 space-y-3 relative">
          <button onClick={() => dispatch({ type: 'REMOVE_CERTIFICATION', index: i })} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
            <Trash2 size={16} />
          </button>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">證照名稱</label>
              <input value={cert.name} onChange={(e) => dispatch({ type: 'UPDATE_CERTIFICATION', index: i, payload: { name: e.target.value } })}
                placeholder="e.g. AWS Solutions Architect" spellCheck
                className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">頒發機構</label>
              <input value={cert.issuer} onChange={(e) => dispatch({ type: 'UPDATE_CERTIFICATION', index: i, payload: { issuer: e.target.value } })}
                placeholder="e.g. Amazon Web Services" spellCheck
                className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">取得日期</label>
            <input type="month" value={cert.date} onChange={(e) => dispatch({ type: 'UPDATE_CERTIFICATION', index: i, payload: { date: e.target.value } })}
              className="border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      ))}
    </div>
  );
}
