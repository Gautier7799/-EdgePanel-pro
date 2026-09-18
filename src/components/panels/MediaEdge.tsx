import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Sun, 
  Wifi, 
  Bluetooth, 
  BellOff, 
  RotateCcw,
  Smartphone,
  Music2
} from 'lucide-react';

export const MediaEdge: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(42);
  const [volume, setVolume] = useState(70);
  const [brightness, setBrightness] = useState(85);
  
  // Toggles
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="flex flex-col h-full text-slate-100 select-none p-3 space-y-4">
      {/* Mini Music Player Card */}
      <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900/80 border border-indigo-500/20 shadow-xl flex flex-col space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shrink-0">
            <Music2 className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white truncate">
              هدوء البادية (لوفي استرخاء)
            </h4>
            <p className="text-[10px] text-indigo-200/80 truncate">
              Spotify • مكتبة الموسيقى
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-cyan-400 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 font-mono">
            <span>01:45</span>
            <span>03:20</span>
          </div>
        </div>

        {/* Player controls */}
        <div className="flex items-center justify-center gap-4 pt-1">
          <button
            onClick={() => setProgress(Math.max(0, progress - 15))}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
          </button>
          <button
            onClick={() => setProgress(Math.min(100, progress + 15))}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* System Sliders: Volume & Brightness */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        {/* Volume */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              {volume === 0 ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              مستوى الصوت
            </span>
            <span className="font-mono text-[11px] text-slate-400">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Brightness */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-400" />
              سطوع الشاشة
            </span>
            <span className="font-mono text-[11px] text-slate-400">{brightness}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>
      </div>

      {/* Quick Toggles Grid */}
      <div>
        <span className="text-[11px] font-semibold text-slate-400 mb-2 block">
          مفاتيح النظام السريعة
        </span>
        <div className="grid grid-cols-2 gap-2">
          {/* Wi-Fi */}
          <button
            onClick={() => setWifi(!wifi)}
            className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
              wifi
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <div className="text-right">
              <div className="text-xs font-semibold">Wi-Fi</div>
              <div className="text-[9px] text-slate-400">{wifi ? 'متصل (Home_5G)' : 'مغلق'}</div>
            </div>
          </button>

          {/* Bluetooth */}
          <button
            onClick={() => setBluetooth(!bluetooth)}
            className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
              bluetooth
                ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <Bluetooth className="w-4 h-4" />
            <div className="text-right">
              <div className="text-xs font-semibold">بلوتوث</div>
              <div className="text-[9px] text-slate-400">{bluetooth ? 'Galaxy Buds' : 'مغلق'}</div>
            </div>
          </button>

          {/* Do Not Disturb */}
          <button
            onClick={() => setDnd(!dnd)}
            className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
              dnd
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <BellOff className="w-4 h-4" />
            <div className="text-right">
              <div className="text-xs font-semibold">عدم الإزعاج</div>
              <div className="text-[9px] text-slate-400">{dnd ? 'مفعّل' : 'معطل'}</div>
            </div>
          </button>

          {/* Auto Rotate */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
              autoRotate
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <div className="text-right">
              <div className="text-xs font-semibold">تدوير الشاشة</div>
              <div className="text-[9px] text-slate-400">{autoRotate ? 'تلقائي' : 'عمودي'}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
