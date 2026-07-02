import { useCV } from '../../context/CVContext';
import { Camera, X } from 'lucide-react';

export function PersonalForm() {
  const { cv, dispatch } = useCV();
  const { personal } = cv;

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_PERSONAL', payload: { [field]: value } });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      update('photo', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => update('photo', '');

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-slate-800">基本資料</h3>

      {/* Photo upload */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
          {personal.photo ? (
            <>
              <img src={personal.photo} alt="" className="w-full h-full object-cover" />
              <button onClick={removePhoto} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5">
                <X size={12} />
              </button>
            </>
          ) : (
            <label className="cursor-pointer flex flex-col items-center text-slate-400">
              <Camera size={20} />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          )}
        </div>
        <span className="text-xs text-slate-400">點擊上傳個人照片（選填）</span>
      </div>

      <Field label="姓名" value={personal.fullName} onChange={(v) => update('fullName', v)} placeholder="e.g. Alex Chen" />
      <Field label="Email" value={personal.email} onChange={(v) => update('email', v)} placeholder="e.g. alex@email.com" type="email" />
      <Field label="電話" value={personal.phone} onChange={(v) => update('phone', v)} placeholder="e.g. +852 1234 5678" />
      <Field label="地點" value={personal.location} onChange={(v) => update('location', v)} placeholder="e.g. Hong Kong" />
      <Field label="LinkedIn（選填）" value={personal.linkedIn || ''} onChange={(v) => update('linkedIn', v)} placeholder="e.g. linkedin.com/in/alex" />
      <Field label="作品集網站（選填）" value={personal.portfolio || ''} onChange={(v) => update('portfolio', v)} placeholder="e.g. alexchen.dev" />
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck
        className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
