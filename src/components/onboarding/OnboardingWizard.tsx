import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { TemplateThumbnail } from '../preview/TemplateThumbnail';

import { ArrowRight, ArrowLeft, Check, FileText, Pencil, Sparkles, Plus, Trash2 } from 'lucide-react';
import type { Proficiency } from '../../types/cv';

const PROFICIENCY_LEVELS: { value: Proficiency; label: string }[] = [
  { value: 'Native', label: 'Native' },
  { value: 'Fluent', label: 'Fluent' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Basic', label: 'Basic' },
];

interface Props { onComplete: () => void; }

export function OnboardingWizard({ onComplete }: Props) {
  const { dispatch, setActiveSection, setTemplate, template, setVersionName, refreshVersions } = useCV();
  const [step, setStep] = useState(-1);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [photo, setPhoto] = useState('');
  const [summary, setSummary] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [certName, setCertName] = useState('');
  const [versionNameInput, setVersionNameInput] = useState('');

  // Multi-entry states
  const [experiences, setExperiences] = useState([{ company: '', title: '' }]);
  const [educations, setEducations] = useState([{ school: '', degree: '', field: '' }]);
  const [languages, setLanguages] = useState([{ language: '', proficiency: 'Fluent' as Proficiency }]);

  const totalSteps = 8;
  const currentStep = step + 1;

  const finish = () => {
    const now = new Date();
    const defaultName = 'CV ' + now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
    const versionLabel = versionNameInput.trim() || defaultName;
    const newCV = {
      personal: { fullName, email, phone, location, linkedIn: linkedIn || undefined, portfolio: portfolio || undefined, photo: photo || undefined },
      summary,
      experiences: experiences.filter(e => e.company || e.title).map(e => ({ company: e.company, title: e.title, startDate: '', endDate: '', current: false, description: '' })),
      education: educations.filter(e => e.school || e.degree).map(e => ({ school: e.school, degree: e.degree, field: e.field, startDate: '', endDate: '' })),
      skills: skillInput ? [{ category: 'Skills', items: skillInput }] : [],
      languages: languages.filter(l => l.language).map(l => ({ language: l.language, proficiency: l.proficiency })),
      certifications: certName ? [{ name: certName, issuer: '', date: '' }] : [],
      projects: [],
      customSections: [],
    };
    localStorage.setItem('cv-version-' + versionLabel, JSON.stringify(newCV));
    refreshVersions();
    dispatch({ type: 'LOAD_CV', payload: newCV });
    setActiveSection('personal');
    setVersionName(versionLabel);
    onComplete();
  };

  const skip = () => onComplete();
  const goToCoverLetter = () => { localStorage.setItem('cv-onboarded', 'true'); setActiveSection('cover-letter'); onComplete(); };

  // Landing page
  if (step === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg shadow-blue-100/50 border border-blue-100">
              <FileText size={36} className="text-blue-600" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">CV <span className="text-blue-600">Editor</span></h1>
              <p className="text-slate-500 leading-relaxed max-w-sm mx-auto">快速打造專業英文履歷，支援多種模板與即時預覽。零成本、無廣告、資料只在你的瀏覽器。</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 space-y-4">
            <button onClick={() => setStep(0)} className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50">
              <Sparkles size={20} /> 快速開始（問卷引導）<ArrowRight size={18} /></button>
            <p className="text-center text-xs text-slate-400">{totalSteps} 步 · 約 3 分鐘</p>
            <div className="h-px bg-slate-100" />
            <button onClick={skip} className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-100 transition-colors border border-slate-200">
              <Pencil size={18} /> 跳過，手動編輯</button>
            <button onClick={goToCoverLetter} className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-700 px-6 py-3 rounded-xl font-medium hover:bg-amber-100 transition-colors border border-amber-200">
              <FileText size={18} /> 直接撰寫求職信</button>
          </div>
          <p className="text-center text-xs text-slate-400">資料僅儲存在你的瀏覽器 · 無需登入</p>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">基本資料</h2>
          <p className="text-sm text-slate-500">讓雇主知道如何聯繫你</p>
          <WizInput label="姓名 *" value={fullName} onChange={setFullName} placeholder="e.g. Alex Chen" />
          <WizInput label="Email *" value={email} onChange={setEmail} placeholder="e.g. alex@email.com" type="email" />
          <div className="grid grid-cols-2 gap-3">
            <WizInput label="電話" value={phone} onChange={setPhone} placeholder="+852 1234 5678" />
            <WizInput label="地點" value={location} onChange={setLocation} placeholder="Hong Kong" />
          </div>
          <WizInput label="LinkedIn (選填)" value={linkedIn} onChange={setLinkedIn} placeholder="linkedin.com/in/alex" />
          <WizInput label="作品集網站 (選填)" value={portfolio} onChange={setPortfolio} placeholder="alexchen.dev" />
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">個人照片 (選填)</label>
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) { const r = new FileReader(); r.onload = () => setPhoto(r.result as string); r.readAsDataURL(file); }
            }} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            {photo && <img src={photo} alt="" className="mt-2 w-16 h-16 rounded-full object-cover border" />}
          </div>
        </div>
      );
      case 1: return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">個人簡介</h2>
          <p className="text-sm text-slate-500">一兩句話總結你的專業背景</p>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)}
            placeholder="e.g. Results-driven software engineer with 5+ years of experience..." rows={4} spellCheck
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-shadow" />
        </div>
      );
      case 2: return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div><h2 className="text-xl font-bold text-slate-800">工作經歷</h2><p className="text-sm text-slate-500">可新增多筆</p></div>
            <button onClick={() => setExperiences([...experiences, { company: '', title: '' }])}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"><Plus size={16} /> 新增</button>
          </div>
          {experiences.map((exp, i) => (
            <div key={i} className="p-4 border border-slate-200 rounded-xl space-y-3 relative">
              {experiences.length > 1 && (
                <button onClick={() => setExperiences(experiences.filter((_, j) => j !== i))}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              )}
              <WizInput label="公司" value={exp.company} onChange={(v) => {
                const next = [...experiences]; next[i] = { ...next[i], company: v }; setExperiences(next);
              }} placeholder="e.g. TechCorp Ltd" />
              <WizInput label="職位" value={exp.title} onChange={(v) => {
                const next = [...experiences]; next[i] = { ...next[i], title: v }; setExperiences(next);
              }} placeholder="e.g. Senior Frontend Engineer" />
            </div>
          ))}
        </div>
      );
      case 3: return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div><h2 className="text-xl font-bold text-slate-800">學歷</h2><p className="text-sm text-slate-500">可新增多筆</p></div>
            <button onClick={() => setEducations([...educations, { school: '', degree: '', field: '' }])}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"><Plus size={16} /> 新增</button>
          </div>
          {educations.map((edu, i) => (
            <div key={i} className="p-4 border border-slate-200 rounded-xl space-y-3 relative">
              {educations.length > 1 && (
                <button onClick={() => setEducations(educations.filter((_, j) => j !== i))}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              )}
              <WizInput label="學校" value={edu.school} onChange={(v) => {
                const next = [...educations]; next[i] = { ...next[i], school: v }; setEducations(next);
              }} placeholder="e.g. University of Hong Kong" />
              <div className="grid grid-cols-2 gap-3">
                <WizInput label="學位" value={edu.degree} onChange={(v) => {
                  const next = [...educations]; next[i] = { ...next[i], degree: v }; setEducations(next);
                }} placeholder="Bachelor's" />
                <WizInput label="科系" value={edu.field} onChange={(v) => {
                  const next = [...educations]; next[i] = { ...next[i], field: v }; setEducations(next);
                }} placeholder="Computer Science" />
              </div>
            </div>
          ))}
        </div>
      );
      case 4: return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">技能</h2>
          <p className="text-sm text-slate-500">列出核心技能，用逗號分隔</p>
          <textarea value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g. TypeScript, Python, React, AWS, Docker" rows={3} spellCheck
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-shadow" />
        </div>
      );
      case 5: return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div><h2 className="text-xl font-bold text-slate-800">語言能力</h2><p className="text-sm text-slate-500">可新增多種語言</p></div>
            <button onClick={() => setLanguages([...languages, { language: '', proficiency: 'Fluent' as Proficiency }])}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"><Plus size={16} /> 新增</button>
          </div>
          {languages.map((lang, i) => (
            <div key={i} className="p-4 border border-slate-200 rounded-xl space-y-3 relative">
              {languages.length > 1 && (
                <button onClick={() => setLanguages(languages.filter((_, j) => j !== i))}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              )}
              <WizInput label="語言" value={lang.language} onChange={(v) => {
                const next = [...languages]; next[i] = { ...next[i], language: v }; setLanguages(next);
              }} placeholder="e.g. English" />
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">程度</label>
                <div className="flex flex-wrap gap-2">
                  {PROFICIENCY_LEVELS.map(({ value, label }) => (
                    <button key={value} onClick={() => {
                      const next = [...languages]; next[i] = { ...next[i], proficiency: value }; setLanguages(next);
                    }} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      lang.proficiency === value ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                    }`}>{label}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
      case 6: return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">證照 (選填)</h2>
          <WizInput label="證照名稱" value={certName} onChange={setCertName} placeholder="e.g. AWS Solutions Architect" />
        </div>
      );
      case 7: return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">命名及選擇模板</h2>
          <p className="text-sm text-slate-500">為這份 CV 取個名字，方便日後辨識</p>
          <WizInput label="CV 名稱" value={versionNameInput} onChange={setVersionNameInput} placeholder="e.g. 申請Google用" />
          <div className="h-3" />
          <p className="text-sm text-slate-400">選擇模板風格：</p>
          <div className="grid grid-cols-2 gap-2">
            {([
              { id: 'classic' as const, name: '傳統簡潔', desc: '側欄資訊 + 主內容' },
              { id: 'modern' as const, name: '現代緊湊', desc: '全寬，線條分隔' },
              { id: 'minimal' as const, name: '極簡黑白', desc: '無裝飾，純層次' },
              { id: 'sidebar' as const, name: '側邊色塊', desc: '深色側欄設計' },
              { id: 'double' as const, name: '雙欄緊湊', desc: '橫幅 + 雙欄' },
              { id: 'timeline' as const, name: '時間軸', desc: '左側時間線設計' },
              { id: 'compact' as const, name: '超緊湊', desc: '高密度，節省空間' },
              { id: 'executive' as const, name: '高管風格', desc: 'Serif，橫線分隔' },
            ]).map(({ id, name, desc }) => (
              <button key={id} onClick={() => setTemplate({ ...template, templateId: id })}
                className={'p-3 rounded-xl border-2 text-left transition-all ' + (template.templateId === id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-100 hover:border-slate-300 hover:shadow-sm bg-white')}>
                <div className="font-semibold text-sm text-slate-800">{name}</div>
                <div className="w-full h-12 bg-slate-50 rounded mt-1.5 overflow-hidden"><TemplateThumbnail id={id} /></div>
                <div className="text-[11px] text-slate-500 mt-1">{desc}</div>
              </button>
            ))}
          </div>
        </div>
      );        default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm mb-3">
            <span className="font-medium text-slate-600">步驟 {currentStep} / {totalSteps}</span>
            <button onClick={skip} className="text-slate-400 hover:text-slate-600 transition-colors">跳過</button>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
          </div>
        </div>
        <div className="mb-8 min-h-[220px]">{renderStep()}</div>
        <div className="flex justify-between items-center">
          <button onClick={() => setStep(step - 1)} disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors">
            <ArrowLeft size={16} /> 上一步</button>
          {step < totalSteps - 1 ? (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-1.5 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-md shadow-blue-200 transition-all">
              下一步 <ArrowRight size={16} /></button>
          ) : (
            <button onClick={finish} className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 shadow-md shadow-emerald-200 transition-all">
              <Check size={16} /> 完成</button>
          )}
        </div>
      </div>
    </div>
  );
}

function WizInput({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} spellCheck
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow placeholder:text-slate-300" />
    </div>
  );
}









