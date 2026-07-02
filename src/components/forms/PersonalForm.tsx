import { useState, useRef, useCallback } from 'react';
import { useCV } from '../../context/CVContext';
import { Camera, X, Move, Check } from 'lucide-react';

export function PersonalForm() {
  const { cv, dispatch } = useCV();
  const { personal } = cv;
  const [showEditor, setShowEditor] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 50, posY: 50 });

  const update = (field: string, value: unknown) => {
    dispatch({ type: 'SET_PERSONAL', payload: { [field]: value } });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      update('photo', dataUrl);
      setDragPos(personal.photoPosition || { x: 50, y: 50 });
      setShowEditor(true);
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, posX: dragPos.x, posY: dragPos.y };
  }, [dragPos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = ((e.clientX - dragStart.current.x) / 300) * 100;
    const dy = ((e.clientY - dragStart.current.y) / 300) * 100;
    setDragPos({
      x: Math.min(100, Math.max(0, dragStart.current.posX + dx)),
      y: Math.min(100, Math.max(0, dragStart.current.posY + dy)),
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const savePosition = () => {
    update('photoPosition', dragPos);
    setShowEditor(false);
  };

  const removePhoto = () => {
    update('photo', '');
    update('photoPosition', undefined);
  };

  const openEditor = () => {
    setDragPos(personal.photoPosition || { x: 50, y: 50 });
    setShowEditor(true);
  };

  const pos = personal.photoPosition || { x: 50, y: 50 };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-slate-800">基本資料</h3>

      {/* Photo upload */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
          {personal.photo ? (
            <>
              <img
                src={personal.photo}
                alt=""
                className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: `${pos.x}% ${pos.y}%` }}
              />
              <button onClick={removePhoto} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 z-10">
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
        <div className="space-y-1">
          <span className="text-xs text-slate-400">點擊上傳個人照片（選填）</span>
          {personal.photo && (
            <button onClick={openEditor} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
              <Move size={12} /> 調整位置
            </button>
          )}
        </div>
      </div>

      {/* Photo editor modal */}
      {showEditor && personal.photo && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-800">調整照片位置</h4>
              <button onClick={() => setShowEditor(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-slate-500">拖動照片，將臉部對準圓形框內</p>

            <div
              className="relative w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-blue-500 mx-auto cursor-move select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={personal.photo}
                alt=""
                className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: `${dragPos.x}% ${dragPos.y}%` }}
                draggable={false}
              />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/40" />
              </div>
            </div>

            <button onClick={savePosition} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700">
              <Check size={18} /> 確認位置
            </button>
          </div>
        </div>
      )}

      <Field label="姓名" value={personal.fullName} onChange={(v) => update('fullName', v)} placeholder="e.g. Alex Chen" />
      <Field label="Email" value={personal.email} onChange={(v) => update('email', v)} placeholder="e.g. alex@email.com" type="email" />
      <Field label="電話" value={personal.phone} onChange={(v) => update('phone', v)} placeholder="e.g. +852 1234 5678" />
      <Field label="地址" value={personal.location} onChange={(v) => update('location', v)} placeholder="e.g. 123 Main St, Kowloon, Hong Kong" />
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
        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow placeholder:text-slate-300"
      />
    </div>
  );
}




