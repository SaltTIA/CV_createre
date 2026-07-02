import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import type { Proficiency, SectionKey } from '../../types/cv';

const PROFICIENCY_LEVELS: { value: Proficiency; label: string }[] = [
  { value: 'Native', label: 'Native' },
  { value: 'Fluent', label: 'Fluent' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Basic', label: 'Basic' },
];

const TEMPLATES = ['classic', 'modern', 'minimal', 'sidebar', 'double'] as const;

interface Props {
  onComplete: () => void;
}

export function OnboardingWizard({ onComplete }: Props) {
  const { dispatch, setActiveSection, setTemplate, template } = useCV();
  const [step, setStep] = useState(-1); // -1 = landing, 0-7 = steps

  // Form state for each step
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [summary, setSummary] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [field, setField] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [language, setLanguage] = useState('');
  const [proficiency, setProficiency] = useState<Proficiency>('Fluent');
  const [certName, setCertName] = useState('');

  const totalSteps = 8;
  const currentStep = step + 1; // 1-indexed for display

  const finish = () => {
    setActiveSection('personal');
    // Save all data via dispatch
    dispatch({ type: 'SET_PERSONAL', payload: { fullName, email, phone, location, linkedIn: linkedIn || undefined } });
    if (summary) dispatch({ type: 'SET_SUMMARY', payload: summary });
    if (company && title) {
      dispatch({ type: 'ADD_EXPERIENCE' });
      dispatch({ type: 'UPDATE_EXPERIENCE', index: 0, payload: { company, title, startDate: '', endDate: '', current: false, description: '' } });
    }
    if (school && degree) {
      dispatch({ type: 'ADD_EDUCATION' });
      dispatch({ type: 'UPDATE_EDUCATION', index: 0, payload: { school, degree, field, startDate: '', endDate: '' } });
    }
    if (skillInput) dispatch({ type: 'ADD_SKILL' });
    if (skillInput) dispatch({ type: 'UPDATE_SKILL', index: 0, payload: { category: 'Skills', items: skillInput } });
    if (language) dispatch({ type: 'ADD_LANGUAGE' });
    if (language) dispatch({ type: 'UPDATE_LANGUAGE', index: 0, payload: { language, proficiency } });
    if (certName) dispatch({ type: 'ADD_CERTIFICATION' });
    if (certName) dispatch({ type: 'UPDATE_CERTIFICATION', index: 0, payload: { name: certName, issuer: '', date: '' } });

    onComplete();
  };

  const skip = () => {
    // Skip wizard, go to manual editor
    onComplete();
  };

  const goToCoverLetter = () => {
    localStorage.setItem('cv-onboarded', 'true');
    setActiveSection('cover-letter');
    onComplete();
  };

  // Landing page
  if (step === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center space-y-8">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">建立你的英文 CV</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              回答幾個簡單問題，我們幫你生成一份完整的英文履歷。
              也可以跳過問卷，手動編輯。
            </p>
          </div>

          <div className="space-y-3">
            <button onClick={() => setStep(0)} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700">
              開始問卷 <ArrowRight size={18} />
            </button>
            <p className="text-xs text-slate-400">{totalSteps} 個步驟，約 3 分鐘</p>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-3">
            <button onClick={skip} className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-50">
              跳過，手動編輯
            </button>
            <button onClick={goToCoverLetter} className="w-full flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-6 py-3 rounded-xl font-medium hover:bg-amber-100">
              ✉ 直接撰寫求職信
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step content
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">基本資料</h2>
          <Input label="姓名" value={fullName} onChange={setFullName} placeholder="e.g. Alex Chen" />
          <Input label="Email" value={email} onChange={setEmail} placeholder="e.g. alex@email.com" type="email" />
          <Input label="電話" value={phone} onChange={setPhone} placeholder="e.g. +852 1234 5678" />
          <Input label="地點" value={location} onChange={setLocation} placeholder="e.g. Hong Kong" />
          <Input label="LinkedIn（選填）" value={linkedIn} onChange={setLinkedIn} placeholder="e.g. linkedin.com/in/alex" />
        </div>
      );
      case 1: return (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">個人簡介</h2>
          <p className="text-sm text-slate-500">用一兩句話介紹自己的專業背景和目標</p>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)}
            placeholder="e.g. Results-driven software engineer with 5+ years of experience..."
            rows={4} spellCheck
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
      );
      case 2: return (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">最近的工作經歷</h2>
          <Input label="公司" value={company} onChange={setCompany} placeholder="e.g. TechCorp Ltd" />
          <Input label="職位" value={title} onChange={setTitle} placeholder="e.g. Senior Frontend Engineer" />
        </div>
      );
      case 3: return (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">學歷</h2>
          <Input label="學校" value={school} onChange={setSchool} placeholder="e.g. University of Hong Kong" />
          <Input label="學位" value={degree} onChange={setDegree} placeholder="e.g. Bachelor's" />
          <Input label="科系" value={field} onChange={setField} placeholder="e.g. Computer Science" />
        </div>
      );
      case 4: return (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">技能</h2>
          <p className="text-sm text-slate-500">列出你的核心技能，用逗號分隔</p>
          <textarea value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g. TypeScript, Python, React, AWS"
            rows={3} spellCheck
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
      );
      case 5: return (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">語言能力</h2>
          <Input label="語言" value={language} onChange={setLanguage} placeholder="e.g. English" />
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">程度</label>
            <div className="flex flex-wrap gap-2">
              {PROFICIENCY_LEVELS.map(({ value, label }) => (
                <button key={value}
                  onClick={() => setProficiency(value)}
                  className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                    proficiency === value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >{label}</button>
              ))}
            </div>
          </div>
        </div>
      );
      case 6: return (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">證照（選填）</h2>
          <Input label="證照名稱" value={certName} onChange={setCertName} placeholder="e.g. AWS Solutions Architect" />
          <p className="text-xs text-slate-400">可留空，之後也可以在編輯器新增</p>
        </div>
      );
      case 7: return (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">選擇模板風格</h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'classic' as const, name: '傳統簡潔', desc: '左側資訊欄 + 右側主內容' },
              { id: 'modern' as const, name: '現代緊湊', desc: '全寬單欄，線條分隔' },
              { id: 'minimal' as const, name: '極簡黑白', desc: '無裝飾線，純字重層次' },
              { id: 'sidebar' as const, name: '側邊色塊', desc: '左側深色底，右側淺色' },
              { id: 'double' as const, name: '雙欄緊湊', desc: '上方橫幅，下方雙欄' },
            ].map(({ id, name, desc }) => (
              <button key={id} onClick={() => setTemplate({ ...template, templateId: id })}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  template.templateId === id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-semibold text-slate-800">{name}</div>
                <div className="text-xs text-slate-500 mt-1">{desc}</div>
              </button>
            ))}
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>步驟 {currentStep} / {totalSteps}</span>
            <button onClick={skip} className="hover:text-slate-600">跳過</button>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full">
            <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
          </div>
        </div>

        {/* Step content */}
        <div className="mb-8 min-h-[200px]">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-slate-600 hover:text-slate-800 disabled:opacity-30"
          >
            <ArrowLeft size={16} /> 上一步
          </button>

          {step < totalSteps - 1 ? (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-1.5 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700">
              下一步 <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={finish} className="flex items-center gap-1.5 bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-green-700">
              <Check size={16} /> 完成，進入編輯
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} spellCheck
        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );
}

