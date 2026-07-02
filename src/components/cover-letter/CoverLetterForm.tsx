import { useCV } from '../../context/CVContext';
import { COVER_LETTER_TONES } from '../../data/coverLetterTones';

export function CoverLetterForm() {
  const { coverLetter, setCoverLetter } = useCV();

  const update = (field: string, value: string) => { setCoverLetter({ ...coverLetter, [field]: value }); };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold text-slate-800">求職信</h3>
        <p className="text-xs text-slate-400 mt-1">信頭自動取自基本資料中的姓名、Email、電話</p>
      </div>

      {/* Recipient section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-600 border-b pb-1">收件人</h4>
        <F label="收件人姓名 (選填)" value={coverLetter.recipientName} onChange={(v) => update('recipientName', v)} placeholder="e.g. Ms. Jane Smith" />
        <div className="grid grid-cols-2 gap-3">
          <F label="公司名稱" value={coverLetter.companyName} onChange={(v) => update('companyName', v)} placeholder="e.g. Google" />
          <F label="應徵職位" value={coverLetter.jobTitle} onChange={(v) => update('jobTitle', v)} placeholder="e.g. Software Engineer" />
        </div>
        <F label="公司地址 (選填)" value={coverLetter.companyAddress} onChange={(v) => update('companyAddress', v)} placeholder="e.g. 1600 Amphitheatre Parkway, Mountain View, CA" />
      </div>

      {/* Letter content */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-600 border-b pb-1">信件內容</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">語氣風格</label>
            <select value={coverLetter.tone} onChange={(e) => update('tone', e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full">
              {COVER_LETTER_TONES.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <F label="信件主旨 (選填)" value={coverLetter.subject} onChange={(v) => update('subject', v)} placeholder="e.g. Application for SWE Position" />
        </div>
        <F label="問候語" value={coverLetter.greeting} onChange={(v) => update('greeting', v)} placeholder="Dear Ms. Smith," />
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">開頭段落</label>
          <textarea value={coverLetter.opening} onChange={(e) => update('opening', e.target.value)}
            placeholder="I am writing to express my strong interest in the [Position] at [Company]..." spellCheck rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">正文段落</label>
          <textarea value={coverLetter.body} onChange={(e) => update('body', e.target.value)}
            placeholder="Throughout my career, I have developed expertise in..." spellCheck rows={5}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">結尾段落</label>
          <textarea value={coverLetter.closing} onChange={(e) => update('closing', e.target.value)}
            placeholder="I welcome the opportunity to discuss my qualifications further..." spellCheck rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
        </div>
      </div>
    </div>
  );
}

function F({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} spellCheck
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
    </div>
  );
}
