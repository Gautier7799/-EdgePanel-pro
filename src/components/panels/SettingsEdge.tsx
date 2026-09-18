import React from 'react';
import { 
  Palette, 
  Sliders, 
  Vibrate, 
  MoveHorizontal, 
  Check, 
  Layers, 
  Sparkles,
  Smartphone,
  CheckCircle2,
  SplitSquareVertical
} from 'lucide-react';
import { PanelSettings, PanelType, DeviceModel, MonetPalette, PanelLayoutMode } from '../../types';

interface SettingsEdgeProps {
  settings: PanelSettings;
  onUpdateSettings: (newSettings: Partial<PanelSettings>) => void;
}

const MONET_PALETTES: { id: MonetPalette; nameAr: string; color: string }[] = [
  { id: 'bay-blue', nameAr: 'أزرق الخليج (Bay Blue)', color: '#38bdf8' },
  { id: 'hazel-green', nameAr: 'بندقي هادئ (Hazel)', color: '#10b981' },
  { id: 'obsidian-dark', nameAr: 'فحمي داكن (Obsidian)', color: '#64748b' },
  { id: 'rose-gold', nameAr: 'وردي ذهبي (Rose)', color: '#fb7185' },
  { id: 'sage-mint', nameAr: 'نعناعي (Sage Mint)', color: '#2dd4bf' },
];

const ALL_PANEL_OPTIONS: { id: PanelType; nameAr: string; icon: string }[] = [
  { id: 'apps', nameAr: 'التطبيقات (Apps Edge)', icon: 'Layers' },
  { id: 'tools', nameAr: 'الأدوات السريعة (Quick Tools)', icon: 'Wrench' },
  { id: 'contacts', nameAr: 'جهات الاتصال (People Edge)', icon: 'Users' },
  { id: 'clipboard', nameAr: 'الحافظة والمسودة (Clipboard)', icon: 'Clipboard' },
  { id: 'media', nameAr: 'التحكم بالوسائط (Media Controls)', icon: 'Music' },
];

export const SettingsEdge: React.FC<SettingsEdgeProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const togglePanel = (panelId: PanelType) => {
    const current = settings.enabledPanels;
    if (current.includes(panelId)) {
      if (current.length <= 1) return;
      onUpdateSettings({
        enabledPanels: current.filter((p) => p !== panelId),
      });
    } else {
      onUpdateSettings({
        enabledPanels: [...current, panelId],
      });
    }
  };

  return (
    <div className="flex flex-col h-full text-slate-100 select-none overflow-y-auto px-3 py-2 space-y-3.5 custom-scrollbar">
      {/* Device & OS Selection */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-cyan-400" />
          طراز الهاتف ونظام التشغيل
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() =>
              onUpdateSettings({
                deviceModel: 'pixel-8',
                androidVersion: 'android-17',
                theme: 'material-you',
              })
            }
            className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all border ${
              settings.deviceModel === 'pixel-8'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <span>Google Pixel 8</span>
            <span className={`text-[9px] ${settings.deviceModel === 'pixel-8' ? 'text-slate-900 font-semibold' : 'text-cyan-400'}`}>
              Android 17 (Vanilla)
            </span>
          </button>

          <button
            onClick={() =>
              onUpdateSettings({
                deviceModel: 'galaxy-s24',
                androidVersion: 'oneui-6',
                theme: 'oneui-dark',
              })
            }
            className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all border ${
              settings.deviceModel === 'galaxy-s24'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <span>Samsung Galaxy S24</span>
            <span className={`text-[9px] ${settings.deviceModel === 'galaxy-s24' ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
              One UI 6
            </span>
          </button>
        </div>
      </div>

      {/* Panel Layout Mode: Floating Capsule (Video) vs Full Drawer */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-cyan-400" />
          شكل وتصميم اللوحة
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onUpdateSettings({ panelLayoutMode: 'floating-capsule' })}
            className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center text-center gap-1 transition-all border ${
              settings.panelLayoutMode === 'floating-capsule'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <span>كبسولة عائمة</span>
            <span className={`text-[9px] ${settings.panelLayoutMode === 'floating-capsule' ? 'text-slate-900 font-semibold' : 'text-cyan-400'}`}>
              مثل فيديو سامسونج
            </span>
          </button>

          <button
            onClick={() => onUpdateSettings({ panelLayoutMode: 'full-drawer' })}
            className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center text-center gap-1 transition-all border ${
              settings.panelLayoutMode === 'full-drawer'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <span>لوحة جانبية موسعة</span>
            <span className={`text-[9px] ${settings.panelLayoutMode === 'full-drawer' ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
              متعددة التبويبات
            </span>
          </button>
        </div>
      </div>

      {/* Pixel 8 Material You (Monet) Color Palette */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-cyan-400" />
          ألوان Material You الديناميكية (Monet)
        </span>
        <div className="grid grid-cols-5 gap-2 pt-1">
          {MONET_PALETTES.map((palette) => (
            <button
              key={palette.id}
              onClick={() => onUpdateSettings({ monetPalette: palette.id, handleColor: palette.color })}
              style={{ backgroundColor: palette.color }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-md ${
                settings.monetPalette === palette.id ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-105' : ''
              }`}
              title={palette.nameAr}
            >
              {settings.monetPalette === palette.id && (
                <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Handle Side (Left vs Right) */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <MoveHorizontal className="w-4 h-4 text-cyan-400" />
          جهة مقبض الحافة على الشاشة
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onUpdateSettings({ side: 'right' })}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              settings.side === 'right'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            الجهة اليمنى (كما بالفيديو)
          </button>
          <button
            onClick={() => onUpdateSettings({ side: 'left' })}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              settings.side === 'left'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            الجهة اليسرى
          </button>
        </div>
      </div>

      {/* Handle Sliders (Vertical position, height, opacity) */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-cyan-400" />
          أبعاد وموضع المقبض
        </span>

        {/* Position Percent */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>الموضع العمودي</span>
            <span className="font-mono text-cyan-300">{settings.handlePositionPercent}%</span>
          </div>
          <input
            type="range"
            min="15"
            max="85"
            value={settings.handlePositionPercent}
            onChange={(e) => onUpdateSettings({ handlePositionPercent: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Handle Height */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>طول المقبض</span>
            <span className="font-mono text-cyan-300">{settings.handleHeight}px</span>
          </div>
          <input
            type="range"
            min="40"
            max="140"
            value={settings.handleHeight}
            onChange={(e) => onUpdateSettings({ handleHeight: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Handle Opacity */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>الشفافية</span>
            <span className="font-mono text-cyan-300">{Math.round(settings.handleOpacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            step="5"
            value={Math.round(settings.handleOpacity * 100)}
            onChange={(e) => onUpdateSettings({ handleOpacity: Number(e.target.value) / 100 })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>

      {/* Enabled Panels Picker */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-cyan-400" />
          اللوحات المتوفرة
        </span>
        <div className="space-y-1.5 pt-1">
          {ALL_PANEL_OPTIONS.map((panel) => {
            const isEnabled = settings.enabledPanels.includes(panel.id);
            return (
              <div
                key={panel.id}
                onClick={() => togglePanel(panel.id)}
                className={`p-2 rounded-xl flex items-center justify-between cursor-pointer border transition-all ${
                  isEnabled
                    ? 'bg-cyan-950/20 border-cyan-500/30 text-white'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="text-xs font-medium">{panel.nameAr}</span>
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                    isEnabled ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Haptics & Vibration */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Vibrate className="w-4 h-4 text-cyan-400" />
          <div>
            <span className="text-xs font-semibold text-white block">الاهتزاز اللمسي (Haptics)</span>
            <span className="text-[10px] text-slate-400">اهتزاز خفيف عند لمس المقبض أو سحبه</span>
          </div>
        </div>
        <button
          onClick={() => onUpdateSettings({ hapticEnabled: !settings.hapticEnabled })}
          className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
            settings.hapticEnabled ? 'bg-cyan-500' : 'bg-slate-700'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transition-transform ${
              settings.hapticEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
