import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Camera, 
  Image as ImageIcon, 
  Calculator, 
  FileText, 
  MessageCircle, 
  MapPin, 
  Music, 
  Globe, 
  Settings as SettingsIcon, 
  Clock, 
  Plus, 
  Search, 
  Pin, 
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';
import { AppItem } from '../../types';

interface AppsEdgeProps {
  apps: AppItem[];
  onLaunchApp: (app: AppItem, isSplit?: boolean) => void;
  onTogglePin: (appId: string) => void;
  onAddCustomApp: (name: string, nameAr: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Phone: <Phone className="w-5 h-5 text-white" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-white" />,
  Camera: <Camera className="w-5 h-5 text-white" />,
  Image: <ImageIcon className="w-5 h-5 text-white" />,
  Calculator: <Calculator className="w-5 h-5 text-white" />,
  FileText: <FileText className="w-5 h-5 text-white" />,
  MessageCircle: <MessageCircle className="w-5 h-5 text-white" />,
  MapPin: <MapPin className="w-5 h-5 text-white" />,
  Music: <Music className="w-5 h-5 text-white" />,
  Globe: <Globe className="w-5 h-5 text-white" />,
  Settings: <SettingsIcon className="w-5 h-5 text-white" />,
  Clock: <Clock className="w-5 h-5 text-white" />,
};

export const AppsEdge: React.FC<AppsEdgeProps> = ({
  apps,
  onLaunchApp,
  onTogglePin,
  onAddCustomApp,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppName, setNewAppName] = useState('');

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.nameAr.includes(searchQuery)
  );

  const pinnedApps = filteredApps.filter((a) => a.isPinned);
  const otherApps = filteredApps.filter((a) => !a.isPinned);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName.trim()) return;
    onAddCustomApp(newAppName.trim(), newAppName.trim());
    setNewAppName('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col h-full text-slate-100 select-none">
      {/* Search Header */}
      <div className="px-3 pt-2 pb-2">
        <div className="relative flex items-center">
          <Search className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            id="edge-apps-search-input"
            type="text"
            placeholder="بحث في التطبيقات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-9 py-1.5 text-xs rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:bg-white/15 transition-all"
          />
        </div>
      </div>

      {/* App Pairs Fast Action (Samsung feature: Multi-window pair) */}
      <div className="px-3 py-1 mb-2">
        <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1 space-x-reverse">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-[10px] shadow">
                <Calculator className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="w-6 h-6 rounded-lg bg-orange-600 flex items-center justify-center text-[10px] shadow">
                <FileText className="w-3.5 h-3.5 text-white" />
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-semibold text-cyan-200">زوج تطبيقات سريع</span>
              <span className="text-[9px] text-slate-400">حاسبة + ملاحظات (شاشة منقسمة)</span>
            </div>
          </div>
          <button
            id="launch-app-pair-btn"
            onClick={() => {
              const calc = apps.find(a => a.id === 'calculator') || apps[0];
              onLaunchApp(calc, true);
            }}
            className="px-2 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-medium rounded-lg transition-colors flex items-center gap-1"
            title="تشغيل في شاشة منقسمة"
          >
            <Layers className="w-3 h-3" />
            فتح
          </button>
        </div>
      </div>

      {/* Apps Content Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 space-y-4 custom-scrollbar">
        {/* Pinned Apps */}
        {pinnedApps.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                <Pin className="w-3 h-3 text-cyan-400" />
                المثبتة ({pinnedApps.length})
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {pinnedApps.map((app) => (
                <div
                  key={app.id}
                  id={`app-item-${app.id}`}
                  onClick={() => onLaunchApp(app)}
                  className="group relative flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer text-center active:scale-95"
                >
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${app.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform mb-1.5`}>
                    {ICON_MAP[app.iconName] || <Sparkles className="w-5 h-5 text-white" />}
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 truncate w-full group-hover:text-white">
                    {app.nameAr}
                  </span>
                  
                  {/* Pin toggle button on hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePin(app.id);
                    }}
                    className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 p-1 rounded-full bg-black/50 hover:bg-black text-cyan-400 transition-opacity"
                    title="إلغاء التثبيت"
                  >
                    <Pin className="w-2.5 h-2.5 fill-cyan-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other / Recent Apps */}
        {otherApps.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400">
                التطبيقات الأخرى ({otherApps.length})
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {otherApps.map((app) => (
                <div
                  key={app.id}
                  id={`app-item-${app.id}`}
                  onClick={() => onLaunchApp(app)}
                  className="group relative flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all cursor-pointer text-center active:scale-95"
                >
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${app.color} flex items-center justify-center shadow group-hover:scale-105 transition-transform mb-1.5 opacity-90 group-hover:opacity-100`}>
                    {ICON_MAP[app.iconName] || <Sparkles className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-[10px] text-slate-300 truncate w-full group-hover:text-white">
                    {app.nameAr}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePin(app.id);
                    }}
                    className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 p-1 rounded-full bg-black/50 hover:bg-black text-slate-300 hover:text-cyan-400 transition-opacity"
                    title="تثبيت في المقدمة"
                  >
                    <Pin className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add custom app shortcut */}
        <div className="pt-1">
          <button
            id="add-custom-app-btn"
            onClick={() => setShowAddModal(true)}
            className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-cyan-400/50 bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            إضافة اختصار تطبيق
          </button>
        </div>
      </div>

      {/* Add App Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-30 bg-slate-950/85 backdrop-blur-md p-4 flex flex-col justify-center">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 shadow-2xl">
            <h4 className="text-sm font-bold text-white mb-2">إضافة تطبيق جديد</h4>
            <p className="text-[11px] text-slate-400 mb-3">أدخل اسم التطبيق الذي تود إضافته إلى لوحة الحافة:</p>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <input
                id="new-app-name-input"
                type="text"
                autoFocus
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
                placeholder="مثال: تيليجرام أو تويتر"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors"
                >
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
