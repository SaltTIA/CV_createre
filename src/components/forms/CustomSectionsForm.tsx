import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

export function CustomSectionsForm() {
  const { cv, dispatch } = useCV();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">自訂區塊</h3>
        <button onClick={() => dispatch({ type: 'ADD_CUSTOM_SECTION' })} className="flex items-center gap-1 text-sm text-blue-600">
          <Plus size={16} /> 新增自訂區塊
        </button>
      </div>
      {cv.customSections.map((section, si) => (
        <div key={si} className="border border-slate-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <input value={section.title} onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_SECTION', index: si, payload: { title: e.target.value } })}
              placeholder="區塊標題（e.g. Awards, Volunteer）" spellCheck
              className="font-semibold text-sm border-b border-slate-200 py-1 focus:outline-none focus:border-blue-500 w-full" />
            <button onClick={() => dispatch({ type: 'REMOVE_CUSTOM_SECTION', index: si })} className="text-red-400 hover:text-red-600 ml-2">
              <Trash2 size={16} />
            </button>
          </div>
          {section.items.map((item, ii) => (
            <div key={ii} className="flex gap-2 items-start">
              <div className="flex-1 space-y-2">
                <input value={item.heading} onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_ITEM', sectionIndex: si, itemIndex: ii, payload: { heading: e.target.value } })}
                  placeholder="標題（e.g. Best Paper Award）" spellCheck
                  className="w-full border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input value={item.detail} onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_ITEM', sectionIndex: si, itemIndex: ii, payload: { detail: e.target.value } })}
                  placeholder="說明（e.g. ICSE 2024）" spellCheck
                  className="w-full border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button onClick={() => dispatch({ type: 'REMOVE_CUSTOM_ITEM', sectionIndex: si, itemIndex: ii })} className="text-red-400 hover:text-red-600 mt-1">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button onClick={() => dispatch({ type: 'ADD_CUSTOM_ITEM', sectionIndex: si })} className="flex items-center gap-1 text-xs text-blue-600">
            <Plus size={12} /> 新增條目
          </button>
        </div>
      ))}
    </div>
  );
}
