import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Camera, 
  Image as ImageIcon, 
  Calculator, 
  FileText, 
  Globe, 
  Settings as SettingsIcon, 
  Clock, 
  Sparkles, 
  Grid, 
  Sliders, 
  SplitSquareVertical,
  Edit3,
  Search,
  Plus,
  Trash2,
  Check,
  X,
  Play,
  Video,
  Layers,
  Palette,
  Sun,
  Moon
} from 'lucide-react';
import { AppItem, PanelSettings, AppPairItem } from '../../types';

interface FloatingAppsPillProps {
  apps: AppItem[];
  settings: PanelSettings;
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp: (app: AppItem, isSplit?: boolean) => void;
  onOpenFullDrawer: () => void;
  onOpenSettings: () => void;
  onUpdateSettings?: (newSettings: Partial<PanelSettings>) => void;
  onTogglePinApp?: (appId: string) => void;
  onAddCustomApp?: (name: string, nameAr: string) => void;
}

export const FloatingAppsPill: React.FC<FloatingAppsPillProps> = ({
  apps,
  settings,
  isOpen,
  onClose,
  onLaunchApp,
  onOpenFullDrawer,
  onOpenSettings,
  onUpdateSettings,
  onTogglePinApp,
  onAddCustomApp,
}) => {
  const [showAllAppsDrawer, setShowAllAppsDrawer] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAppName, setNewAppName] = useState('');

  const isRight = settings.side === 'right';
  const is2Col = settings.capsuleColumns === 2;
  const isLight = settings.capsuleStyle === 'frosted-light';

  // Recent apps (top section in Screenshot_20260918-115836.png)
  const recentApps = apps.filter((a) => a.isRecent).slice(0, is2Col ? 4 : 2);

  // Pinned/Favorite apps (main section)
  const pinnedApps = apps.filter((a) => a.isPinned && !a.isRecent);

  // App pairs
  const appPairs = settings.appPairs || [];

  // Theme styling for the floating capsule
  const getCapsuleThemeClasses = () => {
    switch (settings.capsuleStyle) {
      case 'frosted-light':
        return 'bg-white/92 text-slate-900 border-white/60 shadow-[0_25px_60px_rgba(0,0,0,0.45)] ring-1 ring-slate-900/5';
      case 'monet':
        return 'bg-slate-950/85 text-white border-sky-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.7)] ring-1 ring-sky-500/20';
      case 'frosted-dark':
      default:
        return 'bg-slate-900/90 text-white border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)] ring-1 ring-white/10';
    }
  };

  // Helper to render customized Samsung/Pixel styled app icons
  const renderAppIcon = (app: AppItem) => {
    if (app.id === 'gallery') {
      // Samsung / Pixel Gallery with flower blossom
      return (
        <div className="w-11 h-11 rounded-[15px] bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center shadow-md ring-1 ring-white/20">
          <div className="relative flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white opacity-90" />
            <div className="absolute -top-2 w-2 h-2 rounded-full bg-white" />
            <div className="absolute -bottom-2 w-2 h-2 rounded-full bg-white" />
            <div className="absolute -left-2 w-2 h-2 rounded-full bg-white" />
            <div className="absolute -right-2 w-2 h-2 rounded-full bg-white" />
          </div>
        </div>
      );
    }

    if (app.id === 'camera') {
      return (
        <div className="w-11 h-11 rounded-[15px] bg-gradient-to-tr from-rose-600 via-red-600 to-pink-700 flex items-center justify-center shadow-md ring-1 ring-white/20">
          <Camera className="w-5 h-5 text-white" />
        </div>
      );
    }

    if (app.id === 'google') {
      return (
        <div className="w-11 h-11 rounded-[15px] bg-white flex items-center justify-center shadow-md ring-1 ring-slate-200">
          <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-amber-500">
            G
          </span>
        </div>
      );
    }

    if (app.id === 'ytstudio') {
      return (
        <div className="w-11 h-11 rounded-[15px] bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center shadow-md ring-1 ring-white/20">
          <div className="w-5 h-5 rounded-full border border-white/70 flex items-center justify-center">
            <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
          </div>
        </div>
      );
    }

    if (app.id === 'youtube') {
      return (
        <div className="w-11 h-11 rounded-[15px] bg-red-600 flex items-center justify-center shadow-md ring-1 ring-white/20">
          <div className="w-6 h-4 rounded-md bg-white flex items-center justify-center">
            <Play className="w-2.5 h-2.5 text-red-600 fill-red-600 ml-0.5" />
          </div>
        </div>
      );
    }

    if (app.id === 'chrome') {
      return (
        <div className="w-11 h-11 rounded-[15px] bg-slate-100 flex items-center justify-center shadow-md ring-1 ring-slate-200 overflow-hidden relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-red-500 to-emerald-500 flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 ring-2 ring-white" />
          </div>
        </div>
      );
    }

    if (app.id === 'meet') {
      return (
        <div className="w-11 h-11 rounded-[15px] bg-white flex items-center justify-center shadow-md ring-1 ring-slate-200">
          <Video className="w-5 h-5 text-emerald-600" />
        </div>
      );
    }

    if (app.id === 'calculator') {
      return (
        <div className="w-11 h-11 rounded-[15px] bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-md ring-1 ring-white/20">
          <Calculator className="w-5 h-5 text-white" />
        </div>
      );
    }

    // Default icon
    return (
      <div className={`w-11 h-11 rounded-[15px] bg-gradient-to-tr ${app.color} flex items-center justify-center shadow-md ring-1 ring-white/20`}>
        <Sparkles className="w-5 h-5 text-white" />
      </div>
    );
  };

  // Filter apps for All Apps Drawer
  const filteredApps = apps.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.nameAr.includes(searchQuery)
  );

  return (
    <>
      {/* Dim Backdrop when capsule or modal is open */}
      <div
        onClick={() => {
          setShowAllAppsDrawer(false);
          setShowEditModal(false);
          onClose();
        }}
        className={`absolute inset-0 bg-black/40 backdrop-blur-[1.5px] transition-opacity duration-300 z-30 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 
        ========================================================================
        THE AUTHENTIC SAMSUNG APPS EDGE PANEL (From Screenshot_20260918-115836.png)
        ========================================================================
      */}
      <aside
        id="edge-panel-floating-capsule"
        style={{
          top: `${Math.max(10, Math.min(settings.handlePositionPercent - 10, 32))}%`,
          transform: isOpen
            ? 'translate(0, 0)'
            : isRight
            ? 'translate(130%, 0)'
            : 'translate(-130%, 0)',
        }}
        className={`absolute z-40 ${
          is2Col ? 'w-[154px] sm:w-[162px]' : 'w-20 sm:w-22'
        } ${
          isRight ? 'right-2 sm:right-3' : 'left-2 sm:left-3'
        } rounded-[32px] border backdrop-blur-2xl ${getCapsuleThemeClasses()} flex flex-col items-center py-3.5 transition-all duration-300 ease-out select-none max-h-[82vh]`}
      >
        {/* Quick Style Switcher (2 Columns vs 1 Column & Light vs Dark) */}
        <div className="w-full px-2.5 mb-2 flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-1.5 text-[10px]">
          <button
            onClick={() => onUpdateSettings?.({ capsuleColumns: is2Col ? 1 : 2 })}
            className={`px-1.5 py-0.5 rounded-lg font-bold transition-colors ${
              isLight ? 'bg-slate-200/80 text-slate-800' : 'bg-white/15 text-cyan-300'
            }`}
            title="التبديل بين عمودين (مثل لقطة الشاشة) أو عمود واحد"
          >
            {is2Col ? 'عمودين (الصورة)' : 'عمود واحد'}
          </button>

          <button
            onClick={() =>
              onUpdateSettings?.({
                capsuleStyle: isLight ? 'frosted-dark' : 'frosted-light',
              })
            }
            className={`p-1 rounded-lg transition-colors ${
              isLight ? 'text-amber-600 hover:bg-slate-200' : 'text-cyan-300 hover:bg-white/15'
            }`}
            title="التبديل بين المظهر الفاتح (مثل لقطة الشاشة) أو الداكن"
          >
            {isLight ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Scrollable Apps Container */}
        <div className="flex-1 w-full overflow-y-auto px-2 space-y-3 custom-scrollbar">
          {/* 
            SECTION 1: RECENT APPS (Top 4 apps in 2x2 grid from Screenshot_20260918-115836.png) 
          */}
          {settings.showRecentApps && recentApps.length > 0 && (
            <div className="space-y-1.5">
              <div className={`grid ${is2Col ? 'grid-cols-2 gap-2.5' : 'grid-cols-1 gap-2.5'} justify-items-center`}>
                {recentApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => onLaunchApp(app)}
                    className="flex flex-col items-center cursor-pointer group active:scale-90 transition-transform"
                    title={`${app.nameAr} - استخدام حديث`}
                  >
                    <div className="group-hover:scale-105 transition-transform">
                      {renderAppIcon(app)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dashed / Dotted Horizontal Divider (Exact match to Screenshot) */}
              <div className="pt-2">
                <div className={`w-full border-b border-dashed ${isLight ? 'border-slate-300' : 'border-white/20'}`} />
              </div>
            </div>
          )}

          {/* 
            SECTION 2: APP PAIR (Split Screen Shortcuts)
          */}
          {appPairs.length > 0 && (
            <div className={`grid ${is2Col ? 'grid-cols-2 gap-2.5' : 'grid-cols-1 gap-2.5'} justify-items-center`}>
              {appPairs.map((pair) => (
                <div
                  key={pair.id}
                  onClick={() => {
                    const app1 = apps.find((a) => a.id === pair.app1Id) || apps[0];
                    onLaunchApp(app1, true);
                  }}
                  className="flex flex-col items-center cursor-pointer group active:scale-90 transition-transform"
                  title={`تشغيل ${pair.nameAr} معاً في وضع تقسيم الشاشة`}
                >
                  <div className={`w-11 h-11 rounded-[15px] ${isLight ? 'bg-slate-200/90' : 'bg-white/10'} p-1 flex items-center justify-center gap-0.5 shadow-md ring-1 ring-black/5 group-hover:scale-105 transition-transform overflow-hidden relative`}>
                    <div className="w-4 h-8 rounded-sm bg-gradient-to-b from-red-500 to-rose-600 flex items-center justify-center text-[7px] text-white font-bold">
                      <Play className="w-2 h-2 text-white fill-white" />
                    </div>
                    <div className="w-4 h-8 rounded-sm bg-gradient-to-b from-amber-500 to-emerald-500 flex items-center justify-center text-[7px] text-white font-bold">
                      <Globe className="w-2 h-2 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 
            SECTION 3: FAVORITE APPS (Main Grid)
          */}
          <div className={`grid ${is2Col ? 'grid-cols-2 gap-2.5' : 'grid-cols-1 gap-2.5'} justify-items-center`}>
            {pinnedApps.slice(0, is2Col ? 8 : 5).map((app) => (
              <div
                key={app.id}
                onClick={() => onLaunchApp(app)}
                className="flex flex-col items-center cursor-pointer group active:scale-90 transition-transform"
                title={`${app.nameAr} - انقر للتشغيل`}
              >
                <div className="group-hover:scale-105 transition-transform">
                  {renderAppIcon(app)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 
          BOTTOM FOOTER: 9-Dot Grid Icon (Left) & Pencil Edit Icon (Right)
          (Matching Screenshot_20260918-115836.png bottom toolbar!)
        */}
        <div className={`w-full pt-2.5 px-4 mt-1 border-t ${isLight ? 'border-slate-200 text-slate-600' : 'border-white/15 text-slate-300'} flex items-center justify-between`}>
          {/* 9-Dot App Grid (All Apps Drawer) */}
          <button
            onClick={() => setShowAllAppsDrawer(true)}
            className={`p-2 rounded-xl transition-all active:scale-90 ${
              isLight ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-white'
            }`}
            title="عرض جميع تطبيقات الهاتف (All Apps)"
          >
            <div className="grid grid-cols-3 gap-0.5">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full ${isLight ? 'bg-slate-700' : 'bg-white'}`}
                />
              ))}
            </div>
          </button>

          {/* Pencil Edit Icon (Edit Edge Panel Apps) */}
          <button
            onClick={() => setShowEditModal(true)}
            className={`p-2 rounded-xl transition-all active:scale-90 ${
              isLight ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-white'
            }`}
            title="تعديل تطبيقات لوحة الحافة (Edit Apps)"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 
        ========================================================================
        MODAL 1: ALL APPS DRAWER (Opens from 9-Dot Grid)
        ========================================================================
      */}
      {showAllAppsDrawer && (
        <div className="absolute inset-x-3 inset-y-8 z-50 rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-white/20 p-4 shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 text-white">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                <Grid className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold">جميع تطبيقات الهاتف</span>
            </div>
            <button
              onClick={() => setShowAllAppsDrawer(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative my-3">
            <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="البحث عن تطبيق..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-2 rounded-xl bg-white/10 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Grid of All Apps */}
          <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-3 p-1 custom-scrollbar">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                onClick={() => {
                  onLaunchApp(app);
                  setShowAllAppsDrawer(false);
                }}
                className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform"
              >
                <div className="group-hover:scale-105 transition-transform">
                  {renderAppIcon(app)}
                </div>
                <span className="text-[10px] text-slate-200 mt-1 truncate w-full text-center">
                  {app.nameAr}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        MODAL 2: EDIT EDGE PANEL APPS (Opens from Pencil Icon)
        ========================================================================
      */}
      {showEditModal && (
        <div className="absolute inset-x-3 inset-y-6 z-50 rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/40 p-4 shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 text-white">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold block">تعديل تطبيقات لوحة الحافة</span>
                <span className="text-[10px] text-slate-400">انقر على التطبيق لإضافته أو إزالته من اللوحة</span>
              </div>
            </div>
            <button
              onClick={() => setShowEditModal(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Options: Show Recent Apps Toggle */}
          <div className="py-2.5 flex items-center justify-between border-b border-white/10">
            <div>
              <span className="text-xs font-semibold block">عرض التطبيقات الأخيرة بالأعلى</span>
              <span className="text-[10px] text-slate-400">الصفان العلويان فوق الخط المنقط</span>
            </div>
            <button
              onClick={() => onUpdateSettings?.({ showRecentApps: !settings.showRecentApps })}
              className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.showRecentApps ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.showRecentApps ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Apps Selection List */}
          <div className="flex-1 overflow-y-auto py-2 space-y-1.5 custom-scrollbar">
            {apps.map((app) => (
              <div
                key={app.id}
                onClick={() => onTogglePinApp?.(app.id)}
                className={`p-2 rounded-xl flex items-center justify-between cursor-pointer border transition-all ${
                  app.isPinned
                    ? 'bg-cyan-950/40 border-cyan-500/40 text-white'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7">{renderAppIcon(app)}</div>
                  <span className="text-xs font-medium">{app.nameAr}</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    app.isPinned ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Done Button */}
          <button
            onClick={() => setShowEditModal(false)}
            className="w-full py-2.5 mt-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            حفظ التغييرات
          </button>
        </div>
      )}
    </>
  );
};
