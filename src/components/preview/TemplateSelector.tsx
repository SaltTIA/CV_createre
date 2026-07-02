import { useCV } from '../../context/CVContext';
import { TemplateId } from '../../types/cv';
import { Palette, Columns, AlignLeft, Layout, Grid } from 'lucide-react';

const TEMPLATES = [
  { id: 'classic' as const, name: '傳統簡潔', icon: AlignLeft, desc: '側欄 + 主內容' },
  { id: 'modern' as const, name: '現代緊湊', icon: Layout, desc: '全寬線條' },
  { id: 'minimal' as const, name: '極簡黑白', icon: Grid, desc: '無裝飾' },
  { id: 'sidebar' as const, name: '側邊色塊', icon: Columns, desc: '深色側欄' },
  { id: 'double' as const, name: '雙欄緊湊', icon: Columns, desc: '橫幅雙欄' },
  { id: 'timeline' as const, name: '時間軸', icon: AlignLeft, desc: '左側時間線' },
  { id: 'compact' as const, name: '超緊湊', icon: Grid, desc: '高密度節省空間' },
  { id: 'executive' as const, name: '高管風格', icon: Layout, desc: 'Serif橫線分隔' },
];

export function TemplateSelector() {
  const { template, setTemplate } = useCV();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Palette size={16} /> <span className="font-medium">模板</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {TEMPLATES.map(({ id, name, icon: Icon, desc }) => (
          <button key={id} onClick={() => setTemplate({ ...template, templateId: id })}
            className={`p-2.5 rounded-xl border-2 text-xs transition-all ${
              template.templateId === id
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
            }`}>
            <Icon size={16} className={`mx-auto mb-1 ${template.templateId === id ? 'text-blue-600' : 'text-slate-400'}`} />
            <div className="font-semibold text-slate-700 leading-tight">{name}</div>
            <div className="text-slate-400 mt-0.5">{desc}</div>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4 text-sm">
        <label className="flex items-center gap-2"><span className="text-slate-500">主題色</span>
          <input type="color" value={template.accentColor} onChange={(e) => setTemplate({ ...template, accentColor: e.target.value })}
            className="w-7 h-7 rounded-lg cursor-pointer border-0" /></label>
        <label className="flex items-center gap-2"><span className="text-slate-500">字體</span>
          <select value={template.font} onChange={(e) => setTemplate({ ...template, font: e.target.value as typeof template.font })}
            className="border border-slate-200 rounded-lg px-2 py-1 text-sm bg-white">
            <option value="sans">Sans-Serif</option><option value="serif">Serif</option>
            <option value="modern">Modern</option><option value="classic">Classic</option>
          </select></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={template.autoLayout}
          onChange={(e) => setTemplate({ ...template, autoLayout: e.target.checked })} className="rounded" />
          <span className="text-slate-500">自動排版</span></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={template.showPhoto}
          onChange={(e) => setTemplate({ ...template, showPhoto: e.target.checked })} className="rounded" />
          <span className="text-slate-500">顯示照片</span></label>
      </div>
    </div>
  );
}


