import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Activity, 
  Ruler, 
  Flashlight, 
  Hash, 
  RotateCcw, 
  Plus, 
  Minus,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

type ToolType = 'compass' | 'level' | 'ruler' | 'flashlight' | 'counter';

export const ToolsEdge: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('compass');

  // Compass state
  const [compassHeading, setCompassHeading] = useState<number>(342);
  const [isCalibrated, setIsCalibrated] = useState(true);

  // Level state
  const [pitch, setPitch] = useState<number>(0.4); // X tilt
  const [roll, setRoll] = useState<number>(-0.8); // Y tilt

  // Ruler state
  const [caliperPosition, setCaliperPosition] = useState<number>(85); // px from top

  // Flashlight state
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [flashlightLevel, setFlashlightLevel] = useState<number>(3);
  const [isSosMode, setIsSosMode] = useState(false);

  // Counter state
  const [counterValue, setCounterValue] = useState<number>(33);
  const [counterTarget, setCounterTarget] = useState<number>(100);

  // Auto sensor listener if available
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setCompassHeading(Math.round(e.alpha));
      }
      if (e.beta !== null && e.gamma !== null) {
        setPitch(parseFloat((e.beta / 9).toFixed(1)));
        setRoll(parseFloat((e.gamma / 9).toFixed(1)));
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  // Flashlight SOS effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSosMode && isFlashlightOn) {
      interval = setInterval(() => {
        setIsFlashlightOn((prev) => !prev);
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isSosMode, isFlashlightOn]);

  const getCardinal = (heading: number) => {
    const directions = ['شمال N', 'شمال شرق NE', 'شرق E', 'جنوب شرق SE', 'جنوب S', 'جنوب غرب SW', 'غرب W', 'شمال غرب NW'];
    const index = Math.round(((heading %= 360) < 0 ? heading + 360 : heading) / 45) % 8;
    return directions[index];
  };

  const isLevel = Math.abs(pitch) < 1.0 && Math.abs(roll) < 1.0;

  return (
    <div className="flex flex-col h-full text-slate-100 select-none">
      {/* Tool Selector Tabs */}
      <div className="px-2 pt-2 pb-2">
        <div className="grid grid-cols-5 gap-1 p-1 bg-white/5 rounded-2xl border border-white/10">
          <button
            id="tool-tab-compass"
            onClick={() => setActiveTool('compass')}
            className={`flex flex-col items-center py-2 rounded-xl transition-all ${
              activeTool === 'compass'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="بوصلة"
          >
            <Compass className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">بوصلة</span>
          </button>
          <button
            id="tool-tab-level"
            onClick={() => setActiveTool('level')}
            className={`flex flex-col items-center py-2 rounded-xl transition-all ${
              activeTool === 'level'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="ميزان ماء"
          >
            <Activity className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">ميزان</span>
          </button>
          <button
            id="tool-tab-ruler"
            onClick={() => setActiveTool('ruler')}
            className={`flex flex-col items-center py-2 rounded-xl transition-all ${
              activeTool === 'ruler'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="مسطرة"
          >
            <Ruler className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">مسطرة</span>
          </button>
          <button
            id="tool-tab-flashlight"
            onClick={() => setActiveTool('flashlight')}
            className={`flex flex-col items-center py-2 rounded-xl transition-all ${
              activeTool === 'flashlight'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="كشاف"
          >
            <Flashlight className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">كشاف</span>
          </button>
          <button
            id="tool-tab-counter"
            onClick={() => setActiveTool('counter')}
            className={`flex flex-col items-center py-2 rounded-xl transition-all ${
              activeTool === 'counter'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="عداد"
          >
            <Hash className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">عداد</span>
          </button>
        </div>
      </div>

      {/* Tool Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-3 relative overflow-hidden">
        {/* COMPASS */}
        {activeTool === 'compass' && (
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="text-center">
              <div className="text-3xl font-extrabold tracking-tight text-white font-mono">
                {compassHeading}°
              </div>
              <div className="text-xs text-cyan-400 font-semibold mt-0.5">
                {getCardinal(compassHeading)}
              </div>
            </div>

            {/* Compass Dial */}
            <div className="relative w-44 h-44 rounded-full border-2 border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 shadow-inner flex items-center justify-center p-2">
              {/* Rotating ring */}
              <div
                className="absolute inset-2 rounded-full border border-slate-800 transition-transform duration-200"
                style={{ transform: `rotate(-${compassHeading}deg)` }}
              >
                {/* North marker */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-rose-500">
                  N
                </div>
                {/* South */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-400">
                  S
                </div>
                {/* East */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                  E
                </div>
                {/* West */}
                <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                  W
                </div>
                {/* Degree ticks */}
                <div className="w-full h-full border border-dashed border-slate-700/60 rounded-full" />
              </div>

              {/* Compass Needle */}
              <div
                className="relative w-2 h-32 flex flex-col items-center justify-between transition-transform duration-150"
                style={{ transform: `rotate(${compassHeading}deg)` }}
              >
                {/* Red North arrow */}
                <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[36px] border-b-rose-500 drop-shadow-md" />
                {/* Pivot center */}
                <div className="w-4 h-4 rounded-full bg-slate-200 border-2 border-slate-800 shadow" />
                {/* Grey South arrow */}
                <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[36px] border-t-slate-400 drop-shadow-md" />
              </div>
            </div>

            {/* Slider to simulate/calibrate manually */}
            <div className="w-full px-4 flex flex-col space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>تدوير البوصلة يدوياً</span>
                <span>{compassHeading}°</span>
              </div>
              <input
                id="compass-manual-slider"
                type="range"
                min="0"
                max="360"
                value={compassHeading}
                onChange={(e) => setCompassHeading(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>المعايرة نشطة • خط العرض 24.71° N</span>
            </div>
          </div>
        )}

        {/* BUBBLE LEVEL */}
        {activeTool === 'level' && (
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="text-center">
              <div className={`text-2xl font-mono font-bold ${isLevel ? 'text-emerald-400' : 'text-white'}`}>
                {isLevel ? 'مستوٍ تماماً (0°)' : `ميل: ${Math.max(Math.abs(pitch), Math.abs(roll))}°`}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                X: {pitch > 0 ? `+${pitch}` : pitch}° | Y: {roll > 0 ? `+${roll}` : roll}°
              </div>
            </div>

            {/* Circular Bubble Target */}
            <div className={`relative w-40 h-40 rounded-full border-2 transition-colors duration-200 shadow-inner flex items-center justify-center ${
              isLevel ? 'border-emerald-500/80 bg-emerald-950/20' : 'border-slate-700 bg-slate-900/60'
            }`}>
              {/* Bullseye rings */}
              <div className="w-24 h-24 rounded-full border border-slate-700 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${
                  isLevel ? 'border-emerald-400/60 bg-emerald-500/10' : 'border-slate-600'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                </div>
              </div>

              {/* Crosshairs */}
              <div className="absolute w-full h-[1px] bg-slate-700/50" />
              <div className="absolute h-full w-[1px] bg-slate-700/50" />

              {/* The Bubble */}
              <div
                className={`absolute w-8 h-8 rounded-full transition-all duration-75 shadow-lg flex items-center justify-center ${
                  isLevel
                    ? 'bg-emerald-400 shadow-emerald-500/50 ring-4 ring-emerald-400/30'
                    : 'bg-cyan-400 shadow-cyan-500/30'
                }`}
                style={{
                  transform: `translate(${roll * 10}px, ${pitch * 10}px)`,
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white/70" />
              </div>
            </div>

            {/* Manual Controls for simulator */}
            <div className="w-full px-3 space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>محور X</span>
                <input
                  type="range"
                  min="-8"
                  max="8"
                  step="0.2"
                  value={pitch}
                  onChange={(e) => setPitch(Number(e.target.value))}
                  className="w-32 h-1 bg-slate-800 rounded appearance-none accent-cyan-400"
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>محور Y</span>
                <input
                  type="range"
                  min="-8"
                  max="8"
                  step="0.2"
                  value={roll}
                  onChange={(e) => setRoll(Number(e.target.value))}
                  className="w-32 h-1 bg-slate-800 rounded appearance-none accent-cyan-400"
                />
              </div>
              <button
                onClick={() => { setPitch(0); setRoll(0); }}
                className="w-full py-1 text-[10px] text-cyan-300 hover:text-white bg-cyan-950/30 rounded-lg border border-cyan-500/20"
              >
                إعادة ضبط للصفر (تسوية تامة)
              </button>
            </div>
          </div>
        )}

        {/* PRECISION RULER */}
        {activeTool === 'ruler' && (
          <div className="w-full h-full flex flex-row items-stretch justify-between relative py-2">
            {/* Measuring info card */}
            <div className="flex-1 flex flex-col justify-center px-4 space-y-3">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-[10px] text-slate-400 block mb-1">القياس الحالي:</span>
                <div className="text-2xl font-mono font-extrabold text-cyan-400">
                  {(caliperPosition / 25).toFixed(1)} <span className="text-xs text-white">سم (cm)</span>
                </div>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  {(caliperPosition / 63.5).toFixed(2)} <span className="text-[10px]">بوصة (inch)</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                حرك المؤشر البرتقالي على المسطرة لقياس أي جسم تضعه على الشاشة مباشرة.
              </p>
            </div>

            {/* Vertical Ruler Tape */}
            <div className="relative w-16 bg-slate-900/90 border-r border-slate-700 rounded-lg flex flex-col select-none overflow-hidden">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between h-4 px-1 border-b border-slate-800/40">
                  <span className="text-[8px] font-mono text-slate-500">{i % 5 === 0 ? i / 5 : ''}</span>
                  <div className={`h-[1px] bg-slate-500 ${i % 5 === 0 ? 'w-4 bg-cyan-400' : 'w-2'}`} />
                </div>
              ))}

              {/* Draggable caliper bar */}
              <div
                className="absolute left-0 right-0 h-1 bg-amber-400 shadow-md shadow-amber-500/50 cursor-ns-resize flex items-center justify-end"
                style={{ top: `${caliperPosition}px` }}
              >
                <div className="w-4 h-4 -mr-2 rounded-full bg-amber-400 shadow flex items-center justify-center text-[8px] font-bold text-slate-950">
                  ◀
                </div>
              </div>

              {/* Hidden range over ruler */}
              <input
                type="range"
                min="10"
                max="280"
                value={caliperPosition}
                onChange={(e) => setCaliperPosition(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ns-resize"
              />
            </div>
          </div>
        )}

        {/* FLASHLIGHT */}
        {activeTool === 'flashlight' && (
          <div className="w-full flex flex-col items-center justify-center space-y-5">
            {/* Light bulb visualization */}
            <div
              onClick={() => setIsFlashlightOn(!isFlashlightOn)}
              className={`w-28 h-28 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                isFlashlightOn
                  ? 'bg-amber-300 text-slate-950 shadow-2xl shadow-amber-300/60 ring-8 ring-amber-300/30 scale-105'
                  : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
              }`}
            >
              <Flashlight className={`w-12 h-12 transition-transform ${isFlashlightOn ? 'scale-110' : ''}`} />
            </div>

            <div className="text-center">
              <span className="text-sm font-bold text-white block">
                {isFlashlightOn ? 'الكشاف قيد التشغيل' : 'الكشاف مطفأ'}
              </span>
              <span className="text-[11px] text-slate-400">
                انقر على الزر لتشغيل أو إيقاف الإضاءة
              </span>
            </div>

            {/* Brightness levels (Samsung One UI 1 to 5 levels) */}
            <div className="w-full px-4 space-y-2">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>مستوى السطوع:</span>
                <span className="font-bold text-amber-400">مستوى {flashlightLevel}</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setFlashlightLevel(lvl);
                      setIsFlashlightOn(true);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      flashlightLevel === lvl && isFlashlightOn
                        ? 'bg-amber-400 text-slate-950 shadow-md'
                        : 'bg-white/10 text-slate-400 hover:bg-white/20'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* SOS Mode */}
            <button
              onClick={() => {
                setIsSosMode(!isSosMode);
                if (!isFlashlightOn) setIsFlashlightOn(true);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                isSosMode
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              {isSosMode ? 'إيقاف وميض الطوارئ (SOS)' : 'تفعيل وميض الطوارئ (SOS)'}
            </button>
          </div>
        )}

        {/* TALLY COUNTER / TASBIH */}
        {activeTool === 'counter' && (
          <div className="w-full flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <span className="text-xs text-slate-400">العداد الذكي / المسبحة</span>
              <div className="text-5xl font-mono font-extrabold text-white my-2">
                {counterValue}
              </div>
              <div className="text-[11px] text-cyan-400 font-semibold">
                الهدف: {counterTarget} ({Math.round((counterValue / counterTarget) * 100)}%)
              </div>
            </div>

            {/* Big Tap Area */}
            <button
              id="counter-increment-btn"
              onClick={() => {
                setCounterValue((prev) => prev + 1);
                if ('vibrate' in navigator) {
                  try { navigator.vibrate(20); } catch {}
                }
              }}
              className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-90 text-slate-950 shadow-xl shadow-cyan-500/25 flex flex-col items-center justify-center gap-1 transition-all"
            >
              <Plus className="w-10 h-10 text-slate-950 stroke-[3]" />
              <span className="text-xs font-black tracking-wide">تسجيل +1</span>
            </button>

            {/* Counter Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCounterValue((prev) => Math.max(0, prev - 1))}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                title="إنقاص"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCounterValue(0)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="تصفير"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                تصفير
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
