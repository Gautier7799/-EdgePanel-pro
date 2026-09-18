import React, { useRef, useState } from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Search, 
  Calendar, 
  Clock, 
  Phone, 
  MessageSquare, 
  Camera, 
  Globe, 
  Sparkles,
  Maximize2,
  Minimize2,
  Sliders,
  SplitSquareVertical,
  Sun,
  Mic,
  ChevronDown,
  Layers,
  CheckCircle2,
  Smartphone
} from 'lucide-react';
import { PanelSettings, AppItem, ContactItem, ClipboardItem } from '../types';
import { EdgeHandle } from './EdgeHandle';
import { EdgePanelContainer } from './EdgePanelContainer';
import { FloatingAppsPill } from './panels/FloatingAppsPill';

interface PhoneFrameProps {
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
  isPanelOpen: boolean;
  onTogglePanel: () => void;
  onClosePanel: () => void;
  settings: PanelSettings;
  onUpdateSettings: (newSettings: Partial<PanelSettings>) => void;
  apps: AppItem[];
  contacts: ContactItem[];
  clipboardItems: ClipboardItem[];
  onLaunchApp: (app: AppItem, isSplit?: boolean) => void;
  onTogglePinApp: (appId: string) => void;
  onAddCustomApp: (name: string, nameAr: string) => void;
  onContactAction: (contact: ContactItem, action: 'call' | 'sms' | 'whatsapp' | 'email') => void;
  onAddContact: (contact: Partial<ContactItem>) => void;
  onCopyClipboard: (text: string) => void;
  onTogglePinClipboard: (id: string) => void;
  onDeleteClipboard: (id: string) => void;
  onAddClipboard: (text: string) => void;
  activeToast: string | null;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  isFullScreen,
  onToggleFullScreen,
  isPanelOpen,
  onTogglePanel,
  onClosePanel,
  settings,
  onUpdateSettings,
  apps,
  contacts,
  clipboardItems,
  onLaunchApp,
  onTogglePinApp,
  onAddCustomApp,
  onContactAction,
  onAddContact,
  onCopyClipboard,
  onTogglePinClipboard,
  onDeleteClipboard,
  onAddClipboard,
  activeToast,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showQuickSettingsShade, setShowQuickSettingsShade] = useState(false);

  // Pixel 8 Wallpaper Palettes (Monet / Material You)
  const getWallpaperClasses = () => {
    if (settings.deviceModel === 'galaxy-s24') {
      return 'from-slate-950 via-slate-900 to-indigo-950/90';
    }
    switch (settings.monetPalette) {
      case 'bay-blue':
        return 'from-slate-950 via-sky-950/70 to-blue-900/40';
      case 'hazel-green':
        return 'from-stone-950 via-emerald-950/60 to-teal-900/40';
      case 'rose-gold':
        return 'from-zinc-950 via-rose-950/60 to-pink-900/40';
      case 'sage-mint':
        return 'from-slate-950 via-teal-950/60 to-emerald-900/40';
      case 'obsidian-dark':
      default:
        return 'from-zinc-950 via-stone-900 to-slate-950';
    }
  };

  const isPixel = settings.deviceModel === 'pixel-8';

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center relative p-1 sm:p-3 select-none">
      {/* Top Device Banner */}
      <div className="mb-2 flex items-center justify-between w-full max-w-[390px] px-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-white font-bold">{isPixel ? 'Google Pixel 8' : 'Samsung Galaxy S24'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-cyan-500/20 text-cyan-300 font-mono">
            {settings.androidVersion === 'android-17' ? 'Android 17' : 'One UI 6'}
          </span>
        </div>

        <button
          onClick={() => setShowQuickSettingsShade(!showQuickSettingsShade)}
          className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded-lg border border-white/10 transition-colors"
          title="سحب لوحة الإعدادات السريعة لنظام Android 17"
        >
          <span>الإعدادات السريعة</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Phone Body Container */}
      <div
        ref={containerRef}
        className={`relative transition-all duration-300 overflow-hidden shadow-2xl ${
          isFullScreen
            ? 'w-full h-[88vh] rounded-3xl border border-slate-700/80 bg-slate-950'
            : isPixel
            ? 'w-full max-w-[380px] h-[780px] max-h-[92vh] rounded-[44px] border-[9px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] ring-1 ring-slate-700/60 bg-slate-950'
            : 'w-full max-w-[390px] h-[780px] max-h-[92vh] rounded-[48px] border-[10px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] ring-1 ring-slate-700/60 bg-slate-950'
        }`}
      >
        {/* Pixel 8 / Galaxy Front Camera Punch Hole */}
        {!isFullScreen && (
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full border border-slate-800 shadow-inner z-50 pointer-events-none flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-900/60" />
          </div>
        )}

        {/* Wallpaper Background */}
        <div className={`absolute inset-0 bg-gradient-to-b ${getWallpaperClasses()} pointer-events-none transition-colors duration-500`} />
        {/* Dynamic ambient highlights for Pixel 8 */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        {/* Android 17 Status Bar */}
        <div 
          onClick={() => setShowQuickSettingsShade(!showQuickSettingsShade)}
          className="relative z-20 px-6 pt-3 pb-1 flex items-center justify-between text-xs text-slate-300 font-sans cursor-pointer hover:bg-white/5 transition-colors"
          title="انقر لفتح ستارة الإعدادات السريعة لـ Android 17"
        >
          <span className="font-semibold tracking-tight text-white font-mono text-[13px]">10:42</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-cyan-400 font-mono">5G+</span>
            <Signal className="w-3.5 h-3.5 text-slate-300" />
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <div className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded-full border border-white/10">
              <span className="text-[9px] font-mono text-emerald-300 font-bold">96%</span>
              <Battery className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            </div>
          </div>
        </div>

        {/* Quick Settings Shade (Android 17 TileService Simulator) */}
        {showQuickSettingsShade && (
          <div className="absolute inset-x-0 top-0 z-50 bg-slate-950/95 backdrop-blur-2xl border-b border-cyan-500/30 p-4 pt-10 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-white">إعدادات سريعة - Android 17</span>
                <p className="text-[10px] text-slate-400">تحكم بـ Pixel Quick Settings Tile</p>
              </div>
              <button
                onClick={() => setShowQuickSettingsShade(false)}
                className="text-xs text-cyan-400 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10"
              >
                إغلاق الستارة
              </button>
            </div>

            {/* Android 17 Material 3 Large Quick Settings Tiles */}
            <div className="grid grid-cols-2 gap-2.5 pt-3">
              {/* Active Edge Panel Tile */}
              <div
                onClick={() => {
                  onTogglePanel();
                  setShowQuickSettingsShade(false);
                }}
                className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                  isPanelOpen
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30'
                    : 'bg-white/10 hover:bg-white/15 text-white border-white/10'
                }`}
              >
                <div className={`p-2 rounded-xl ${isPanelOpen ? 'bg-slate-950/20' : 'bg-white/10'}`}>
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">لوحة الحافة</div>
                  <div className={`text-[10px] ${isPanelOpen ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                    {isPanelOpen ? 'مفتوحة الآن' : 'مفعلة (TileService)'}
                  </div>
                </div>
              </div>

              {/* Internet Tile */}
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 text-white flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10">
                  <Wifi className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-bold">الإنترنت</div>
                  <div className="text-[10px] text-emerald-400">Wi-Fi 7 متصل</div>
                </div>
              </div>

              {/* 120Hz Smooth Display (Pixel 8) */}
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 text-white flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold">Pixel Smooth</div>
                  <div className="text-[10px] text-amber-300">120Hz فائق السلاسة</div>
                </div>
              </div>

              {/* Split Screen Pair Tile */}
              <div 
                onClick={() => {
                  const pairApp1 = apps.find((a) => a.id === 'chrome') || apps[0];
                  onLaunchApp(pairApp1, true);
                  setShowQuickSettingsShade(false);
                }}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white flex items-center gap-3 cursor-pointer"
              >
                <div className="p-2 rounded-xl bg-white/10">
                  <SplitSquareVertical className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs font-bold">تقسيم الشاشة</div>
                  <div className="text-[10px] text-cyan-300">إطلاق زوج التطبيقات</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pixel 8 Home Screen Workspace */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-5 pt-3 pb-6 text-white h-[calc(100%-38px)]">
          {/* Top: Google Pixel "At a Glance" Widget */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs text-cyan-300/90 font-medium">
              <div className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">الجمعة، 18 سبتمبر</span>
                <span>•</span>
                <span className="text-white font-bold">29°C</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-cyan-200">
                At a Glance
              </span>
            </div>

            {/* Smart Space Event Card */}
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <div>
                  <div className="text-xs font-bold text-white">مراجعة أداء أندرويد 17 (Tensor G3)</div>
                  <div className="text-[10px] text-slate-300">اليوم الساعة 4:00 عصراً مع فريق التطوير</div>
                </div>
              </div>
              <Clock className="w-4 h-4 text-cyan-300" />
            </div>
          </div>

          {/* Center Hint */}
          <div className="mx-auto max-w-[290px] p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center space-y-1 my-auto">
            <div className="flex items-center justify-center gap-1 text-xs font-bold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>لوحة سامسونج على هاتف Google Pixel 8</span>
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              اسحب المقبض من {settings.side === 'right' ? 'اليمين إلى اليسار' : 'اليسار إلى اليمين'} لترى مؤثر السحب الدائري وانبثاق الشريط الكبسولي العائم كما في الفيديو تماماً!
            </p>
          </div>

          {/* Pixel 8 Home Screen App Grid */}
          <div className="grid grid-cols-4 gap-3 py-1">
            {apps.slice(0, 8).map((app) => (
              <div
                key={app.id}
                onClick={() => onLaunchApp(app)}
                className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform"
                title={`تشغيل ${app.nameAr}`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${app.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-all ring-1 ring-white/15`}>
                  <span className="text-white text-xs font-bold">{app.nameAr[0]}</span>
                </div>
                <span className="text-[10px] text-slate-200 mt-1 truncate w-full text-center font-medium">
                  {app.nameAr}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Dock: Google Pixel Search Bar */}
          <div className="space-y-2">
            {/* Signature Google Pixel Search Pill */}
            <div className="w-full py-2 px-3 rounded-full bg-white/15 backdrop-blur-xl border border-white/15 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2">
                {/* Google Colorful 'G' */}
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-amber-500">
                    G
                  </span>
                </div>
                <span className="text-[11px] text-slate-300">البحث في التطبيقات أو الويب...</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-cyan-300" />
                <button
                  onClick={() => {
                    const geminiApp = apps.find(a => a.id === 'gemini') || apps[4];
                    onLaunchApp(geminiApp);
                  }}
                  className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-[10px] text-white shadow-sm"
                  title="مساعد Google Gemini الذكي"
                >
                  <Sparkles className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Bottom Pinned Apps */}
            <div className="p-2 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-around shadow-xl">
              <div
                onClick={() => onLaunchApp(apps.find(a => a.id === 'phone') || apps[0])}
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-md cursor-pointer active:scale-90 transition-transform"
                title="الهاتف"
              >
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div
                onClick={() => onLaunchApp(apps.find(a => a.id === 'messages') || apps[1])}
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-md cursor-pointer active:scale-90 transition-transform"
                title="الرسائل"
              >
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div
                onClick={() => onLaunchApp(apps.find(a => a.id === 'chrome') || apps[3])}
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-red-500 to-emerald-500 flex items-center justify-center shadow-md cursor-pointer active:scale-90 transition-transform"
                title="المتصفح"
              >
                <Globe className="w-4 h-4 text-white" />
              </div>
              <div
                onClick={() => onLaunchApp(apps.find(a => a.id === 'camera') || apps[2])}
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center shadow-md cursor-pointer active:scale-90 transition-transform"
                title="الكاميرا"
              >
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Android Navigation Gesture Pill */}
            <div className="w-28 h-1 bg-white/60 rounded-full mx-auto" />
          </div>
        </div>

        {/* Live Action Notification Toast */}
        {activeToast && (
          <div className="absolute top-12 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 border border-cyan-500/50 shadow-2xl text-xs text-white flex items-center gap-2.5 animate-in fade-in slide-in-from-top duration-200">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="flex-1 font-medium">{activeToast}</span>
          </div>
        )}

        {/* The Edge Handle (with video-exact drag expansion indicator) */}
        <EdgeHandle
          settings={settings}
          isOpen={isPanelOpen}
          onToggle={onTogglePanel}
          onUpdatePosition={(newPercent) => onUpdateSettings({ handlePositionPercent: newPercent })}
          containerRef={containerRef}
        />

        {/* 
          1. FLOATING CAPSULE MODE (Matching frames 00:02 - 00:03 of Samsung Video):
          A sleek, floating rounded vertical pill card
        */}
        {settings.panelLayoutMode === 'floating-capsule' && (
          <FloatingAppsPill
            apps={apps}
            settings={settings}
            isOpen={isPanelOpen}
            onClose={onClosePanel}
            onLaunchApp={onLaunchApp}
            onOpenFullDrawer={() => onUpdateSettings({ panelLayoutMode: 'full-drawer' })}
            onOpenSettings={() => {
              onUpdateSettings({ panelLayoutMode: 'full-drawer', activePanel: 'settings' });
            }}
          />
        )}

        {/* 
          2. FULL DRAWER MODE (Includes multi-panel tabs: Tools, Contacts, Clipboard, Media, Settings)
        */}
        {settings.panelLayoutMode === 'full-drawer' && (
          <EdgePanelContainer
            isOpen={isPanelOpen}
            settings={settings}
            onClose={onClosePanel}
            onSwitchPanel={(panel) => onUpdateSettings({ activePanel: panel })}
            onUpdateSettings={onUpdateSettings}
            apps={apps}
            contacts={contacts}
            clipboardItems={clipboardItems}
            onLaunchApp={onLaunchApp}
            onTogglePinApp={onTogglePinApp}
            onAddCustomApp={onAddCustomApp}
            onContactAction={onContactAction}
            onAddContact={onAddContact}
            onCopyClipboard={onCopyClipboard}
            onTogglePinClipboard={onTogglePinClipboard}
            onDeleteClipboard={onDeleteClipboard}
            onAddClipboard={onAddClipboard}
          />
        )}
      </div>

      {/* Screen & Layout Controls Below the Phone */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {/* Toggle between Floating Capsule (Video Exact) and Full Multi-Panel Drawer */}
        <button
          onClick={() =>
            onUpdateSettings({
              panelLayoutMode:
                settings.panelLayoutMode === 'floating-capsule'
                  ? 'full-drawer'
                  : 'floating-capsule',
            })
          }
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 text-xs font-bold flex items-center gap-1.5 shadow transition-all active:scale-95"
          title="التبديل بين الشريط الكبسولي العائم كما في الفيديو أو اللوحة الجانبية الكاملة"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            {settings.panelLayoutMode === 'floating-capsule'
              ? 'النمط: شريط كبسولي عائم (الفيديو)'
              : 'النمط: لوحة جانبية كاملة'}
          </span>
        </button>

        {/* Fullscreen Overlay Toggle */}
        <button
          onClick={onToggleFullScreen}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-all"
        >
          {isFullScreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>إطار الهاتف</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>معاينة الشاشة الكاملة</span>
            </>
          )}
        </button>

        {/* Open / Close Panel Button */}
        <button
          onClick={onTogglePanel}
          className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow transition-all active:scale-95"
        >
          <span>{isPanelOpen ? 'إغلاق اللوحة' : 'فتح لوحة الحافة'}</span>
        </button>
      </div>
    </div>
  );
};
