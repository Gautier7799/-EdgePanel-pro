import React from 'react';
import { 
  Palette, 
  Sliders, 
  Vibrate, 
  MoveHorizontal, 
  Check, 
  Layers, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { PanelSettings, PanelType } from '../../types';

interface SettingsEdgeProps {
  settings: PanelSettings;
  onUpdateSettings: (newSettings: Partial<PanelSettings>) => void;
}

const COLOR_PRESETS = [
  { name: 'سماوي سامسونج', hex: '#38bdf8' },
  { name: 'أرجواني جالاكسي', hex: '#a855f7' },
  { name: 'زمردي نيون', hex: '#10b981' },
  { name: 'برتقالي شمسي', hex: '#f97316' },
  { name: 'أبيض لؤلؤي', hex: '#f8fafc' },
  { name: 'أحمر قرمزي', hex: '#ef4444' },
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
      if (current.length <= 1) return; // keep at least one
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
    <div className="flex flex-col h-full text-slate-100 select-none overflow-y-auto px-3 py-2 space-y-4 custom-scrollbar">
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
            الجهة اليمنى (الافتراضي)
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

      {/* Handle Sliders (Vertical position, height, width, transparency) */}
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

      {/* Handle Color Presets */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-cyan-400" />
          لون مقبض الحافة
        </span>
        <div className="grid grid-cols-6 gap-2 pt-1">
          {COLOR_PRESETS.map((c) => (
            <button
              key={c.hex}
              onClick={() => onUpdateSettings({ handleColor: c.hex })}
              style={{ backgroundColor: c.hex }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-md ${
                settings.handleColor === c.hex ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-105' : ''
              }`}
              title={c.name}
            >
              {settings.handleColor === c.hex && (
                <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enabled Panels Picker */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-cyan-400" />
          اللوحات المفعلة في الشريط
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
