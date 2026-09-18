import React, { useState } from 'react';
import { Copy, Pin, Trash2, Check, FileText, Plus, ExternalLink, Code } from 'lucide-react';
import { ClipboardItem } from '../../types';

interface ClipboardEdgeProps {
  items: ClipboardItem[];
  onCopyItem: (text: string) => void;
  onTogglePin: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onAddNewClip: (text: string) => void;
}

export const ClipboardEdge: React.FC<ClipboardEdgeProps> = ({
  items,
  onCopyItem,
  onTogglePin,
  onDeleteItem,
  onAddNewClip,
}) => {
  const [activeTab, setActiveTab] = useState<'clips' | 'scratchpad'>('clips');
  const [scratchpadText, setScratchpadText] = useState(
    'أفكار مشروع EdgePanel:\n1. تقليل استهلاك الطاقة إلى الحد الأدنى عبر فك تسجيل الـ Sensors عند إغلاق اللوحة.\n2. دعم اللمسات السريعة والإيماءات.\n3. توافق تام مع أندرويد 14 و 15 مع إذن SYSTEM_ALERT_WINDOW.'
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newClipInput, setNewClipInput] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);

  const handleCopy = (id: string, text: string) => {
    onCopyItem(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleAddClip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClipInput.trim()) return;
    onAddNewClip(newClipInput.trim());
    setNewClipInput('');
    setShowAddInput(false);
  };

  return (
    <div className="flex flex-col h-full text-slate-100 select-none">
      {/* Sub Tabs */}
      <div className="px-3 pt-2 pb-2">
        <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('clips')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'clips'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            سجل الحافظة ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('scratchpad')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'scratchpad'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            مسودة سريعة
          </button>
        </div>
      </div>

      {activeTab === 'clips' ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Add clip button */}
          <div className="px-3 pb-2">
            {!showAddInput ? (
              <button
                onClick={() => setShowAddInput(true)}
                className="w-full py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 text-xs font-medium flex items-center justify-center gap-1.5 border border-white/5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                إضافة نص للحافظة
              </button>
            ) : (
              <form onSubmit={handleAddClip} className="space-y-1.5 bg-slate-900/90 p-2 rounded-xl border border-cyan-500/30">
                <textarea
                  rows={2}
                  autoFocus
                  value={newClipInput}
                  onChange={(e) => setNewClipInput(e.target.value)}
                  placeholder="اكتب أو الصق النص هنا..."
                  className="w-full p-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
                />
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowAddInput(false)}
                    className="px-2 py-1 text-[10px] text-slate-400 hover:text-white"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-1 text-[10px] bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-md"
                  >
                    حفظ
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Clips List */}
          <div className="flex-1 overflow-y-auto px-3 space-y-2 custom-scrollbar pb-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-2.5 rounded-xl border transition-all ${
                  item.isPinned
                    ? 'bg-cyan-950/20 border-cyan-500/30'
                    : 'bg-white/5 hover:bg-white/10 border-white/5'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    {item.type === 'link' ? <ExternalLink className="w-3 h-3 text-sky-400" /> : null}
                    {item.type === 'code' ? <Code className="w-3 h-3 text-amber-400" /> : null}
                    {item.timestamp}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onTogglePin(item.id)}
                      className={`p-1 rounded-md transition-colors ${
                        item.isPinned ? 'text-cyan-400 hover:text-cyan-300' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={item.isPinned ? 'إلغاء التثبيت' : 'تثبيت النص'}
                    >
                      <Pin className={`w-3 h-3 ${item.isPinned ? 'fill-cyan-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1 rounded-md text-slate-500 hover:text-rose-400 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed font-sans select-text break-words">
                  {item.text}
                </p>

                <div className="mt-2 pt-1.5 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => handleCopy(item.id, item.text)}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold flex items-center gap-1 transition-all"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        نسخ للنظام
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Instant Scratchpad */
        <div className="flex-1 flex flex-col px-3 pb-3">
          <div className="flex-1 flex flex-col bg-white/5 rounded-2xl border border-white/10 p-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                مسودة الحافة المحفوظة تلقائياً
              </span>
              <span>{scratchpadText.length} حرف</span>
            </div>
            <textarea
              value={scratchpadText}
              onChange={(e) => setScratchpadText(e.target.value)}
              placeholder="اكتب ملاحظاتك السريعة هنا دون الحاجة لمغادرة شاشتك الحالية..."
              className="flex-1 w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none resize-none pt-2 leading-relaxed"
            />
            <div className="pt-2 border-t border-white/5 flex justify-between items-center">
              <span className="text-[9px] text-emerald-400">✓ محفوظة محلياً</span>
              <button
                onClick={() => {
                  onCopyItem(scratchpadText);
                  alert('تم نسخ الملاحظة إلى الحافظة!');
                }}
                className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] rounded-md flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                نسخ الكل
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
