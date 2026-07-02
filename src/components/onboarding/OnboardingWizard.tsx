import { ArrowRight, Pencil, FileText } from 'lucide-react';

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

const steps = [
  { title: '基本資料', key: 'personal' },
  { title: '個人簡介', key: 'summary' },
  { title: '工作經歷', key: 'experiences' },
  { title: '學歷', key: 'education' },
  { title: '技能', key: 'skills' },
  { title: '語言能力', key: 'languages' },
  { title: '證照', key: 'certifications' },
  { title: '風格選擇', key: 'template' },
];

export function OnboardingWizard({ onComplete, onSkip }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center space-y-8">
        <div className="space-y-3">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
            <FileText size={32} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">歡迎使用 CV 編輯器</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            快速建立一份專業的英文履歷。填寫簡單問卷，我們自動為你生成完整的 CV。
            你也可以直接跳過，手動編輯或撰寫求職信。
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onComplete}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            快速開始（問卷引導）
            <ArrowRight size={18} />
          </button>
          <p className="text-xs text-slate-400">{steps.length} 個步驟，約 3-5 分鐘</p>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-3">
          <button
            onClick={onSkip}
            className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors"
          >
            <Pencil size={18} />
            跳過，手動編輯
          </button>
          <button
            onClick={onSkip}
            className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors"
          >
            <FileText size={18} />
            直接撰寫求職信
          </button>
        </div>
      </div>
    </div>
  );
}
