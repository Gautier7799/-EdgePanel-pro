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
  Maximize2, 
  Layers,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  SplitSquareVertical
} from 'lucide-react';
import { AppItem, PanelSettings } from '../../types';

interface FloatingAppsPillProps {
  apps: AppItem[];
  settings: PanelSettings;
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp: (app: AppItem, isSplit?: boolean) => void;
  onOpenFullDrawer: () => void;
  onOpenSettings: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Phone: <Phone className="w-5 h-5 text-white" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-white" />,
  Camera: <Camera className="w-5 h-5 text-white" />,
  Image: <ImageIcon className="w-5 h-5 text-white" />,
  Calculator: <Calculator className="w-5 h-5 text-white" />,
  FileText: <FileText className="w-5 h-5 text-white" />,
  Globe: <Globe className="w-5 h-5 text-white" />,
  Settings: <SettingsIcon className="w-5 h-5 text-white" />,
  Clock: <Clock className="w-5 h-5 text-white" />,
  Sparkles: <Sparkles className="w-5 h-5 text-white" />,
};

export const FloatingAppsPill: React.FC<FloatingAppsPillProps> = ({
  apps,
  settings,
  isOpen,
  onClose,
  onLaunchApp,
  onOpenFullDrawer,
  onOpenSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'pinned' | 'recent'>('pinned');
  const isRight = settings.side === 'right';

  // Apps to display in the slim floating capsule
  const displayedApps = apps.filter((a) => (activeTab === 'pinned' ? a.isPinned : a.isRecent || a.isPinned)).slice(0, 7);

  const getThemeBackground = () => {
    switch (settings.monetPalette) {
      case 'bay-blue':
        return 'bg-slate-950/80 border-sky-500/25 shadow-sky-950/50';
      case 'hazel-green':
        return 'bg-stone-950/80 border-emerald-500/25 shadow-emerald-950/50';
      case 'rose-gold':
        return 'bg-zinc-950/80 border-rose-500/25 shadow-rose-950/50';
      case 'sage-mint':
        return 'bg-slate-950/80 border-teal-500/25 shadow-teal-950/50';
      default:
        return 'bg-slate-950/85 border-slate-700/50 shadow-black/70';
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/35 backdrop-blur-[1px] transition-opacity duration-300 z-30 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Floating Capsule (Matches Video Frames 00:02 - 00:03) */}
      <aside
        id="edge-panel-floating-capsule"
        style={{
          top: `${Math.max(12, Math.min(settings.handlePositionPercent, 42))}%`,
          transform: isOpen
            ? 'translate(0, 0)'
            : isRight
            ? 'translate(120%, 0)'
            : 'translate(-120%, 0)',
        }}
        className={`absolute z-40 w-20 sm:w-24 ${
          isRight ? 'right-2 sm:right-3' : 'left-2 sm:left-3'
        } rounded-[32px] border backdrop-blur-2xl ${getThemeBackground()} flex flex-col items-center py-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 ease-out select-none`}
      >
        {/* Top Header: App Pairs & Quick Launch indicator */}
        <div className="flex flex-col items-center gap-1.5 pb-2 border-b border-white/10 w-full px-2">
          {/* Pair Shortcut Button */}
          <button
            onClick={() => {
              const pairApp1 = apps.find((a) => a.id === 'chrome') || apps[0];
              const pairApp2 = apps.find((a) => a.id === 'calculator') || apps[1];
              onLaunchApp(pairApp1, true);
            }}
            title="تشغيل تطبيقين معاً في وضع تقسيم الشاشة (Split-Screen Pair)"
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-cyan-400 shadow-sm transition-transform active:scale-90"
          >
            <SplitSquareVertical className="w-5 h-5 text-cyan-400" />
          </button>
          <span className="text-[9px] text-cyan-300 font-semibold tracking-tight">زوج التطبيقات</span>
        </div>

        {/* Vertical List of App Icons */}
        <div className="flex flex-col items-center gap-3 py-2 w-full px-1.5 overflow-y-auto max-h-[440px] custom-scrollbar">
          {displayedApps.map((app) => (
            <div
              key={app.id}
              onClick={() => onLaunchApp(app)}
              className="group flex flex-col items-center cursor-pointer active:scale-90 transition-transform relative"
              title={`${app.nameAr} - انقر للتشغيل`}
            >
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr ${app.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-all ring-1 ring-white/15`}
              >
                {ICON_MAP[app.iconName] || <Sparkles className="w-5 h-5 text-white" />}
              </div>
              <span className="text-[9px] text-slate-300 font-medium mt-1 truncate max-w-[64px] text-center">
                {app.nameAr}
              </span>
            </div>
          ))}
        </div>

        {/* Divider Line */}
        <div className="w-10 h-0.5 bg-white/15 my-1.5 rounded-full" />

        {/* Bottom Actions: All Apps Drawer + Multi-Panel Switcher */}
        <div className="flex flex-col items-center gap-1.5 pt-1 w-full px-2">
          {/* All Apps / Drawer Button */}
          <button
            onClick={onOpenFullDrawer}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white shadow transition-all active:scale-90"
            title="عرض جميع اللوحات والتطبيقات (All Apps & Tools)"
          >
            <Grid className="w-5 h-5 text-slate-200" />
          </button>
          <span className="text-[9px] text-slate-400 font-medium">الكل</span>

          {/* Quick Settings Gear */}
          <button
            onClick={onOpenSettings}
            className="w-7 h-7 mt-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
            title="تخصيص لوحة الحافة"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
};
