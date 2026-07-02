import { useCV } from '../../context/CVContext';

export function SummaryForm() {
  const { cv, dispatch } = useCV();

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-slate-800">個人簡介</h3>
      <label className="block text-sm font-medium text-slate-600">簡介內容</label>
      <textarea
        value={cv.summary}
        onChange={(e) => dispatch({ type: 'SET_SUMMARY', payload: e.target.value })}
        placeholder="e.g. Results-driven software engineer with 5+ years of experience..."
        spellCheck
        rows={6}
        className="w-full border border-slate-200 rounded-md px-3 py-2.5 md:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
    </div>
  );
}

