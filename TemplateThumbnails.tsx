interface ThumbProps { id: string; }

export const THUMBNAILS: Record<string, { name: string; desc: string; thumb: React.FC }> = {
  classic: {
    name: '傳統簡潔', desc: '側欄資訊 + 主內容',
    thumb: () => <div className="flex h-full rounded overflow-hidden"><div className="w-[30%] bg-slate-400/50" /><div className="flex-1 p-1.5 space-y-1"><div className="h-1.5 bg-slate-300 rounded w-3/4" /><div className="h-1 bg-slate-200 rounded" /><div className="h-1 bg-slate-200 rounded w-1/2" /></div></div>,
  },
  modern: {
    name: '現代緊湊', desc: '全寬，線條分隔',
    thumb: () => <div className="flex flex-col h-full p-1.5 space-y-1"><div className="h-1.5 bg-slate-400 w-1/2 rounded mx-auto" /><div className="h-px bg-slate-300" /><div className="space-y-0.5"><div className="h-1 bg-slate-200 rounded" /><div className="h-1 bg-slate-200 rounded w-3/4" /></div><div className="h-px bg-slate-300" /><div className="space-y-0.5"><div className="h-1 bg-slate-200 rounded" /><div className="h-1 bg-slate-200 rounded w-2/3" /></div></div>,
  },
  minimal: {
    name: '極簡黑白', desc: '無裝飾，純層次',
    thumb: () => <div className="flex flex-col h-full p-1.5 space-y-1.5"><div className="h-1.5 bg-slate-500 w-1/3 rounded" /><div className="h-px bg-slate-300" /><div className="space-y-0.5"><div className="h-1 bg-slate-300 rounded" /><div className="h-1 bg-slate-300 rounded w-5/6" /><div className="h-1 bg-slate-300 rounded w-4/6" /></div></div>,
  },
  sidebar: {
    name: '側邊色塊', desc: '深色側欄設計',
    thumb: () => <div className="flex h-full rounded overflow-hidden"><div className="w-[30%] bg-slate-700" /><div className="flex-1 p-1.5 space-y-1 bg-white"><div className="h-1.5 bg-slate-300 rounded w-3/4" /><div className="h-1 bg-slate-200 rounded" /><div className="h-1 bg-slate-200 rounded w-1/2" /></div></div>,
  },
  double: {
    name: '雙欄緊湊', desc: '橫幅 + 雙欄',
    thumb: () => <div className="flex flex-col h-full"><div className="h-[20%] bg-slate-200 p-1"><div className="h-1.5 bg-slate-400 w-1/3 mx-auto rounded" /></div><div className="flex flex-1"><div className="flex-1 p-1 space-y-0.5 border-r border-slate-200"><div className="h-1 bg-slate-300 rounded" /><div className="h-1 bg-slate-200 rounded w-2/3" /></div><div className="flex-1 p-1 space-y-0.5"><div className="h-1 bg-slate-300 rounded" /><div className="h-1 bg-slate-200 rounded w-2/3" /></div></div></div>,
  },
  timeline: {
    name: '時間軸', desc: '左側時間線設計',
    thumb: () => <div className="flex h-full p-1.5"><div className="w-1 bg-slate-400/30 rounded-full mr-2" /><div className="flex-1 space-y-1"><div className="h-1.5 bg-slate-400 rounded w-1/2 mb-1.5" /><div className="flex gap-1"><div className="w-[25%]"><div className="h-1 bg-slate-300 rounded" /></div><div className="flex-1 space-y-0.5"><div className="h-1 bg-slate-200 rounded" /><div className="h-1 bg-slate-200 rounded w-3/4" /></div></div><div className="flex gap-1"><div className="w-[25%]"><div className="h-1 bg-slate-300 rounded" /></div><div className="flex-1 space-y-0.5"><div className="h-1 bg-slate-200 rounded" /><div className="h-1 bg-slate-200 rounded w-2/3" /></div></div></div></div>,
  },
  compact: {
    name: '超緊湊', desc: '高密度，節省空間',
    thumb: () => <div className="flex flex-col h-full p-1"><div className="flex justify-between mb-1"><div className="h-1.5 bg-slate-400 w-1/3 rounded" /><div className="flex gap-0.5"><div className="h-1 bg-slate-300 w-4 rounded" /><div className="h-1 bg-slate-300 w-4 rounded" /></div></div><div className="grid grid-cols-2 gap-0.5 flex-1"><div className="space-y-0.5"><div className="h-1 bg-slate-300 rounded" /><div className="h-1 bg-slate-200 rounded" /><div className="h-1 bg-slate-200 rounded w-2/3" /></div><div className="space-y-0.5"><div className="h-1 bg-slate-300 rounded" /><div className="h-1 bg-slate-200 rounded" /><div className="h-1 bg-slate-200 rounded w-2/3" /></div></div></div>,
  },
  executive: {
    name: '高管風格', desc: 'Serif 字體，橫線分隔',
    thumb: () => <div className="flex flex-col h-full p-1.5 items-center"><div className="h-2 bg-slate-500 w-1/2 rounded mb-1.5" /><div className="h-px bg-slate-400 w-full mb-1" /><div className="space-y-0.5 w-full"><div className="h-1 bg-slate-300 rounded" /><div className="h-1 bg-slate-200 rounded w-5/6" /></div><div className="h-px bg-slate-400 w-full my-1" /><div className="space-y-0.5 w-full"><div className="h-1 bg-slate-300 rounded" /><div className="h-1 bg-slate-200 rounded w-3/4" /></div></div>,
  },
};
