import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Code2, 
  Sparkles, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  BatteryCharging, 
  Sliders, 
  Wrench, 
  Users, 
  ClipboardList, 
  Check, 
  ExternalLink,
  Info,
  CheckCircle2,
  SplitSquareVertical,
  Palette
} from 'lucide-react';
import { PanelSettings, AppItem, ContactItem, ClipboardItem, DeviceModel, MonetPalette, PanelLayoutMode } from './types';
import { INITIAL_APPS, INITIAL_CONTACTS, INITIAL_CLIPBOARD, DEFAULT_SETTINGS } from './data/initialData';
import { PhoneFrame } from './components/PhoneFrame';
import { AndroidCodeModal } from './components/AndroidCodeModal';
import { SystemSettingsApp } from './components/SystemSettingsApp';

export default function App() {
  // Persistence with localStorage
  const [settings, setSettings] = useState<PanelSettings>(() => {
    try {
      const saved = localStorage.getItem('pixel_edgepanel_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [apps, setApps] = useState<AppItem[]>(() => {
    try {
      const saved = localStorage.getItem('pixel_edgepanel_apps');
      return saved ? JSON.parse(saved) : INITIAL_APPS;
    } catch {
      return INITIAL_APPS;
    }
  });

  const [contacts, setContacts] = useState<ContactItem[]>(() => {
    try {
      const saved = localStorage.getItem('pixel_edgepanel_contacts');
      return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
    } catch {
      return INITIAL_CONTACTS;
    }
  });

  const [clipboardItems, setClipboardItems] = useState<ClipboardItem[]>(() => {
    try {
      const saved = localStorage.getItem('pixel_edgepanel_clipboard');
      return saved ? JSON.parse(saved) : INITIAL_CLIPBOARD;
    } catch {
      return INITIAL_CLIPBOARD;
    }
  });

  // UI state
  const [viewMode, setViewMode] = useState<'app' | 'simulator'>('app');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('pixel_edgepanel_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('pixel_edgepanel_apps', JSON.stringify(apps));
  }, [apps]);

  useEffect(() => {
    localStorage.setItem('pixel_edgepanel_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('pixel_edgepanel_clipboard', JSON.stringify(clipboardItems));
  }, [clipboardItems]);

  const triggerToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => {
      setActiveToast(null);
    }, 3200);
  };

  const handleUpdateSettings = (newSettings: Partial<PanelSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleLaunchApp = (app: AppItem, isSplit?: boolean) => {
    if (isSplit) {
      triggerToast(`تم تشغيل "${app.nameAr}" في وضع تقسيم الشاشة (Split-Screen Pair) على Pixel 8`);
    } else {
      triggerToast(`تم فتح تطبيق "${app.nameAr}" بنجاح`);
    }
    setIsPanelOpen(false);
  };

  const handleTogglePinApp = (appId: string) => {
    setApps((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, isPinned: !a.isPinned } : a))
    );
  };

  const handleAddCustomApp = (name: string, nameAr: string) => {
    const newApp: AppItem = {
      id: `app-${Date.now()}`,
      name,
      nameAr,
      iconName: 'Sparkles',
      color: 'from-cyan-500 to-blue-600',
      category: 'Custom',
      isPinned: true,
    };
    setApps((prev) => [newApp, ...prev]);
    triggerToast(`تمت إضافة تطبيق "${nameAr}" إلى شريط الحافة`);
  };

  const handleContactAction = (contact: ContactItem, action: 'call' | 'sms' | 'whatsapp' | 'email') => {
    const actionNames = {
      call: `جاري الاتصال بـ ${contact.name} (${contact.phone})...`,
      sms: `فتح تطبيق الرسائل إلى ${contact.name}...`,
      whatsapp: `فتح محادثة واتساب مع ${contact.name}...`,
      email: `إرسال بريد إلكتروني إلى ${contact.email}...`,
    };
    triggerToast(actionNames[action]);
  };

  const handleAddContact = (contact: Partial<ContactItem>) => {
    const newContact: ContactItem = {
      id: `c-${Date.now()}`,
      name: contact.name || 'جهة جديدة',
      phone: contact.phone || '',
      email: contact.email || '',
      avatarBg: contact.avatarBg || 'bg-gradient-to-tr from-cyan-500 to-blue-600',
      avatarInitial: contact.avatarInitial || 'ج',
      relationship: contact.relationship || 'صديق',
      isFavorite: true,
    };
    setContacts((prev) => [newContact, ...prev]);
    triggerToast(`تمت إضافة "${newContact.name}" إلى جهات الاتصال المفضلة`);
  };

  const handleCopyClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast('تم نسخ النص إلى حافظة النظام بنجاح');
  };

  const handleTogglePinClipboard = (id: string) => {
    setClipboardItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isPinned: !c.isPinned } : c))
    );
  };

  const handleDeleteClipboard = (id: string) => {
    setClipboardItems((prev) => prev.filter((c) => c.id !== id));
    triggerToast('تم حذف العنصر من سجل الحافظة');
  };

  const handleAddClipboard = (text: string) => {
    const newClip: ClipboardItem = {
      id: `clip-${Date.now()}`,
      text,
      timestamp: 'الآن',
      isPinned: false,
      type: text.startsWith('http') ? 'link' : 'text',
    };
    setClipboardItems((prev) => [newClip, ...prev]);
    triggerToast('تم حفظ العنصر في الحافظة');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-xl px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                Pixel EdgePanel
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                Google Pixel 8 • Android 17
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              لوحة حافة سامسونج الأصلية مخصصة لهاتف Pixel 8 ونظام Android 17 مع أكواد Kotlin و Jetpack Compose
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Switch View Mode: App vs Phone Simulator */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('app')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'app'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>تطبيق النظام (الإعدادات والصلوحية)</span>
            </button>
            <button
              onClick={() => setViewMode('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'simulator'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>محاكي هاتف Pixel 8</span>
            </button>
          </div>

          {/* Kotlin Code Button */}
          <button
            id="view-android-code-btn"
            onClick={() => setShowCodeModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
          >
            <Code2 className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span className="hidden sm:inline">أكواد Android 17 (Kotlin & Compose)</span>
            <span className="sm:hidden">أكواد أندرويد</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Studio Body */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 max-w-7xl mx-auto w-full">
        {viewMode === 'app' ? (
          /* تطبيق إعدادات النظام الأصلي مع تفعيل الأذونات والصلوحية */
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in duration-300">
            <SystemSettingsApp
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onOpenPanelPreview={() => {
                setViewMode('simulator');
                setIsPanelOpen(true);
              }}
              onOpenCodeModal={() => setShowCodeModal(true)}
            />
          </div>
        ) : (
          /* محاكي هاتف Pixel 8 للتحقق من طريقة ظهور اللوحة على النظام */
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 animate-in fade-in duration-300">
            {/* Left Side (Desktop): Technical Insights & Quick Customizer */}
            <aside className="w-full lg:w-80 flex flex-col gap-3 order-2 lg:order-1">
              {/* Pixel 8 & Android 17 Highlights */}
              <div className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Smartphone className="w-4 h-4" />
                  <h3 className="text-xs font-bold text-white">Google Pixel 8 & Android 17</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  هواتف Pixel لا تحتوي على ميزة Edge Panel المدمجة في أجهزة سامسونج. تم تصميم هذا التطبيق لسد هذه الفجوة بأفضل المعايير:
                </p>
                <div className="space-y-1 text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>شريط كبسولي عائم مطابق تماماً للفيديو</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>مؤشر سحب دائري باللون الأزرق &lt; أثناء الإيماءة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>سلاسة 120Hz لشاشة Pixel 8 ومعالج Tensor G3</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>ألوان ديناميكية متناغمة مع Material You (Monet)</span>
                  </div>
                </div>
              </div>

              {/* Device & Layout Quick Selector */}
              <div className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-300">التحكم السريع بالمظهر:</h4>
                
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">نوع الجهاز:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => handleUpdateSettings({ deviceModel: 'pixel-8', androidVersion: 'android-17' })}
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                          settings.deviceModel === 'pixel-8'
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                        }`}
                      >
                        Google Pixel 8
                      </button>
                      <button
                        onClick={() => handleUpdateSettings({ deviceModel: 'galaxy-s24', androidVersion: 'oneui-6' })}
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                          settings.deviceModel === 'galaxy-s24'
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                        }`}
                      >
                        Galaxy S24
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">تخطيط الكبسولة (لقطة الشاشة):</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => handleUpdateSettings({ capsuleColumns: 2, panelLayoutMode: 'floating-capsule' })}
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                          settings.capsuleColumns === 2 && settings.panelLayoutMode === 'floating-capsule'
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                        }`}
                      >
                        عمودين (مثل الصورة)
                      </button>
                      <button
                        onClick={() => handleUpdateSettings({ capsuleColumns: 1, panelLayoutMode: 'floating-capsule' })}
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                          settings.capsuleColumns === 1 && settings.panelLayoutMode === 'floating-capsule'
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                        }`}
                      >
                        عمود واحد (الفيديو)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">لون الزجاج المصنفر:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => handleUpdateSettings({ capsuleStyle: 'frosted-light' })}
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                          settings.capsuleStyle === 'frosted-light'
                            ? 'bg-white text-slate-950 border-white shadow-sm font-black'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                        }`}
                      >
                        أبيض مصنفر (الصورة)
                      </button>
                      <button
                        onClick={() => handleUpdateSettings({ capsuleStyle: 'frosted-dark' })}
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                          settings.capsuleStyle === 'frosted-dark'
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                        }`}
                      >
                        زجاج داكن (Dark)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back to App Settings Button */}
              <button
                onClick={() => setViewMode('app')}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-2xl border border-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>العودة لشاشة تطبيق إعدادات النظام</span>
              </button>
            </aside>

            {/* Center: The Phone Simulator with the Live Edge Panel */}
            <div className="flex-1 flex flex-col items-center justify-center order-1 lg:order-2 w-full">
              <PhoneFrame
                isFullScreen={isFullScreen}
                onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
                isPanelOpen={isPanelOpen}
                onTogglePanel={() => setIsPanelOpen(!isPanelOpen)}
                onClosePanel={() => setIsPanelOpen(false)}
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                apps={apps}
                contacts={contacts}
                clipboardItems={clipboardItems}
                onLaunchApp={handleLaunchApp}
                onTogglePinApp={handleTogglePinApp}
                onAddCustomApp={handleAddCustomApp}
                onContactAction={handleContactAction}
                onAddContact={handleAddContact}
                onCopyClipboard={handleCopyClipboard}
                onTogglePinClipboard={handleTogglePinClipboard}
                onDeleteClipboard={handleDeleteClipboard}
                onAddClipboard={handleAddClipboard}
                activeToast={activeToast}
              />
            </div>
          </div>
        )}
      </main>

      {/* Android Kotlin & Compose Source Code Modal */}
      <AndroidCodeModal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
      />
    </div>
  );
}
