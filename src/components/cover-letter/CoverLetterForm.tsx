import { useCV } from '../../context/CVContext';
import { COVER_LETTER_TONES } from '../../data/coverLetterTones';

export function CoverLetterForm() {
  const { coverLetter, setCoverLetter } = useCV();

  const update = (field: string, value: string) => {
    setCoverLetter({ ...coverLetter, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-slate-800">求職信</h3>
      <p className="text-xs text-slate-400">信頭自動取自基本資料中的姓名、Email、電話</p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">公司名稱</label>
          <input value={coverLetter.companyName} onChange={(e) => update('companyName', e.target.value)}
            placeholder="e.g. Google" spellCheck
            className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">應徵職位</label>
          <input value={coverLetter.jobTitle} onChange={(e) => update('jobTitle', e.target.value)}
            placeholder="e.g. Software Engineer" spellCheck
            className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">語氣</label>
        <select value={coverLetter.tone} onChange={(e) => update('tone', e.target.value)}
          className="border border-slate-200 rounded px-2 py-1.5 text-sm">
          {COVER_LETTER_TONES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">開頭段落</label>
        <textarea value={coverLetter.opening} onChange={(e) => update('opening', e.target.value)}
          placeholder="Dear Hiring Manager, I am writing to express my interest..."
          spellCheck rows={3}
          className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">正文段落</label>
        <textarea value={coverLetter.body} onChange={(e) => update('body', e.target.value)}
          placeholder="With my background in..."
          spellCheck rows={5}
          className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">結尾段落</label>
        <textarea value={coverLetter.closing} onChange={(e) => update('closing', e.target.value)}
          placeholder="Thank you for considering my application..."
          spellCheck rows={3}
          className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      </div>
    </div>
  );
}
