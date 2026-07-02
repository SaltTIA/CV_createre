import { useCV } from '../../context/CVContext';
import { TemplateId } from '../../types/cv';
import { Palette } from 'lucide-react';

const TEMPLATES: { id: TemplateId; name: string; preview: string }[] = [
  { id: 'classic', name: '傳統簡潔', preview: '左側資訊欄 + 右側主內容' },
  { id: 'modern', name: '現代緊湊', preview: '全寬單欄，線條分隔' },
  { id: 'minimal', name: '極簡黑白', preview: '無裝飾線，純字重層次' },
  { id: 'sidebar', name: '側邊色塊', preview: '左側深色底，右側淺色' },
  { id: 'double', name: '雙欄緊湊', preview: '上方橫幅，下方雙欄' },
];

export function TemplateSelector() {
  const { template, setTemplate } = useCV();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Palette size={16} />
        <span>模板選擇</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {TEMPLATES.map(({ id, name, preview }) => (
          <button
            key={id}
            onClick={() => setTemplate({ ...template, templateId: id })}
            className={`p-2 rounded-lg border-2 text-xs transition-all ${
              template.templateId === id
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="font-semibold mb-1">{name}</div>
            <div className="text-slate-400 leading-tight">{preview}</div>
          </button>
        ))}
      </div>

      {/* Accent color + font */}
      <div className="flex items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-slate-600">主題色</span>
          <input type="color" value={template.accentColor}
            onChange={(e) => setTemplate({ ...template, accentColor: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer border-0" />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-slate-600">字體</span>
          <select value={template.font}
            onChange={(e) => setTemplate({ ...template, font: e.target.value as typeof template.font })}
            className="border border-slate-200 rounded px-2 py-1 text-sm">
            <option value="sans">Sans-Serif</option>
            <option value="serif">Serif</option>
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-slate-600">自動排版</span>
          <input type="checkbox" checked={template.autoLayout}
            onChange={(e) => setTemplate({ ...template, autoLayout: e.target.checked })}
            className="rounded" />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-slate-600">顯示照片</span>
          <input type="checkbox" checked={template.showPhoto}
            onChange={(e) => setTemplate({ ...template, showPhoto: e.target.checked })}
            className="rounded" />
        </label>
      </div>
    </div>
  );
}
