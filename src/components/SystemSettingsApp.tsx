import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Layers, 
  Power, 
  Sliders, 
  Eye, 
  SplitSquareVertical, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Play,
  RotateCcw,
  Palette,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { PanelSettings } from '../types';

interface SystemSettingsAppProps {
  settings: PanelSettings;
  onUpdateSettings: (newSettings: Partial<PanelSettings>) => void;
  onOpenPanelPreview: () => void;
  onOpenCodeModal: () => void;
}

export const SystemSettingsApp: React.FC<SystemSettingsAppProps> = ({
  settings,
  onUpdateSettings,
  onOpenPanelPreview,
  onOpenCodeModal
}) => {
  // حالة الأذونات الافتراضية كما في أندرويد 17
  const [overlayGranted, setOverlayGranted] = useState(true);
  const [accessibilityGranted, setAccessibilityGranted] = useState(true);
  const [batteryOptimizationDisabled, setBatteryOptimizationDisabled] = useState(true);
  const [serviceRunning, setServiceRunning] = useState(true);
  const [activeTab, setActiveTab] = useState<'main' | 'appearance' | 'permissions'>('main');

  return (
    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl font-['Cairo',sans-serif] text-slate-100">
      {/* شريط عنوان التطبيق (System App Header) */}
      <div className="bg-slate-950/80 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">إعدادات لوحة الحافة (Edge Panel)</h2>
            <p className="text-xs text-slate-400">إدارة الخدمة وصلاحيات النظام • Google Pixel 8 (Android 17)</p>
          </div>
        </div>

        {/* زر تشغيل / إيقاف الخدمة الرئيسي */}
        <button
          onClick={() => setServiceRunning(!serviceRunning)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            serviceRunning
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{serviceRunning ? 'الخدمة نشطة' : 'الخدمة متوقفة'}</span>
        </button>
      </div>

      {/* تبويبات الإعدادات */}
      <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-2">
        <button
          onClick={() => setActiveTab('main')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'main'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>الإعدادات العامة</span>
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'permissions'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>أذونات وصلاحيات النظام</span>
        </button>
        <button
          onClick={() => setActiveTab('appearance')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'appearance'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>المظهر والكبسولة</span>
        </button>
      </div>

      {/* محتوى الإعدادات */}
      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        {/* التبويب 1: الإعدادات العامة */}
        {activeTab === 'main' && (
          <div className="space-y-4">
            {/* بطاقة حالة الخدمة */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${serviceRunning ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                <div>
                  <div className="text-sm font-bold text-white">حالة الخدمة الأمامية (Foreground Service)</div>
                  <div className="text-xs text-slate-400">
                    {serviceRunning 
                      ? 'مقبض الحافة يطفو على الشاشة وجاهز للاستخدام في جميع التطبيقات' 
                      : 'الخدمة متوقفة حالياً. اضغط لتشغيلها'}
                  </div>
                </div>
              </div>
              <button
                onClick={onOpenPanelPreview}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-all flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>معاينة اللوحة</span>
              </button>
            </div>

            {/* موضع المقبض واليد المستخدمة */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300">موضع مقبض اللوحة:</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onUpdateSettings({ side: 'right' })}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    settings.side === 'right'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <span>الجانب الأيمن (الافتراضي)</span>
                </button>
                <button
                  onClick={() => onUpdateSettings({ side: 'left' })}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    settings.side === 'left'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <span>الجانب الأيسر</span>
                </button>
              </div>
            </div>

            {/* شفافية وحجم المقبض */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">شفافية المقبض على الشاشة:</span>
                  <span className="text-cyan-400 font-mono font-bold">{Math.round(settings.handleOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={settings.handleOpacity}
                  onChange={(e) => onUpdateSettings({ handleOpacity: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">طول المقبض:</span>
                  <span className="text-cyan-400 font-mono font-bold">{settings.handleHeight}px</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  step="5"
                  value={settings.handleHeight}
                  onChange={(e) => onUpdateSettings({ handleHeight: parseInt(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* التبويب 2: أذونات وصلاحيات النظام */}
        {activeTab === 'permissions' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-200 leading-relaxed">
                لكي تعمل لوحة الحافة فوق جميع التطبيقات ونظام أندرويد على هاتفك <strong>Google Pixel 8</strong>، يتطلب النظام منح الأذونات التالية لمرة واحدة فقط.
              </div>
            </div>

            {/* إذن الظهور فوق التطبيقات */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">الظهور فوق التطبيقات (SYSTEM_ALERT_WINDOW)</span>
                  {overlayGranted && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">ممنوح ✓</span>}
                </div>
                <p className="text-xs text-slate-400">ضروري لإنشاء مقبض السحب والكبسولة العائمة فوق شاشة القفل والتطبيقات</p>
              </div>
              <button
                onClick={() => setOverlayGranted(!overlayGranted)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  overlayGranted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-cyan-500 text-slate-950'
                }`}
              >
                {overlayGranted ? 'مفعل' : 'تفعيل'}
              </button>
            </div>

            {/* إذن إمكانية الوصول لتقسيم الشاشة */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">إمكانية الوصول (Accessibility Service)</span>
                  {accessibilityGranted && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">ممنوح ✓</span>}
                </div>
                <p className="text-xs text-slate-400">يتيح ميزة تشغيل زوج التطبيقات وتقسيم الشاشة (Split-Screen) فوراً بنقرة واحدة</p>
              </div>
              <button
                onClick={() => setAccessibilityGranted(!accessibilityGranted)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  accessibilityGranted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-cyan-500 text-slate-950'
                }`}
              >
                {accessibilityGranted ? 'مفعل' : 'تفعيل'}
              </button>
            </div>

            {/* إذن ترشيد البطارية */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">استثناء من تحسين البطارية (Battery Ignore)</span>
                  {batteryOptimizationDisabled && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">مستثنى ✓</span>}
                </div>
                <p className="text-xs text-slate-400">يمنع نظام Android 17 من إغلاق مقبض الحافة أثناء وضع توفير الطاقة الفائق</p>
              </div>
              <button
                onClick={() => setBatteryOptimizationDisabled(!batteryOptimizationDisabled)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  batteryOptimizationDisabled
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-cyan-500 text-slate-950'
                }`}
              >
                {batteryOptimizationDisabled ? 'مستثنى' : 'استثناء'}
              </button>
            </div>
          </div>
        )}

        {/* التبويب 3: المظهر والكبسولة */}
        {activeTab === 'appearance' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300">نمط الكبسولة (مطابق للصورة والفيديو):</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onUpdateSettings({ capsuleColumns: 2, panelLayoutMode: 'floating-capsule' })}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    settings.capsuleColumns === 2
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <span>عمودين (تطبيقات حديثة + مفضلة)</span>
                </button>
                <button
                  onClick={() => onUpdateSettings({ capsuleColumns: 1, panelLayoutMode: 'floating-capsule' })}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    settings.capsuleColumns === 1
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <span>عمود واحد (شريط كبسولي نحيف)</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300">لون الزجاج المصنفر للكبسولة:</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onUpdateSettings({ capsuleStyle: 'frosted-light' })}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    settings.capsuleStyle === 'frosted-light'
                      ? 'bg-white text-slate-950 border-white shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <span>أبيض ناصع مصنفر (مثل صورة سامسونج)</span>
                </button>
                <button
                  onClick={() => onUpdateSettings({ capsuleStyle: 'frosted-dark' })}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    settings.capsuleStyle === 'frosted-dark'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <span>زجاج داكن عالي التباين (Dark Glass)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* تذييل التطبيق */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-cyan-400" />
          <span>تطبيق رسمي متوافق مع معمارية أندرويد و Material 3</span>
        </div>
        <button
          onClick={onOpenCodeModal}
          className="text-cyan-400 hover:text-cyan-300 font-bold underline"
        >
          عرض كود النظام وملف الـ APK
        </button>
      </div>
    </div>
  );
};
