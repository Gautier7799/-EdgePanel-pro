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
  Info
} from 'lucide-react';
import { PanelSettings, AppItem, ContactItem, ClipboardItem } from './types';
import { INITIAL_APPS, INITIAL_CONTACTS, INITIAL_CLIPBOARD, DEFAULT_SETTINGS } from './data/initialData';
import { PhoneFrame } from './components/PhoneFrame';
import { AndroidCodeModal } from './components/AndroidCodeModal';

export default function App() {
  // Persistence with localStorage
  const [settings, setSettings] = useState<PanelSettings>(() => {
    try {
      const saved = localStorage.getItem('edgepanel_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [apps, setApps] = useState<AppItem[]>(() => {
    try {
      const saved = localStorage.getItem('edgepanel_apps');
      return saved ? JSON.parse(saved) : INITIAL_APPS;
    } catch {
      return INITIAL_APPS;
    }
  });

  const [contacts, setContacts] = useState<ContactItem[]>(() => {
    try {
      const saved = localStorage.getItem('edgepanel_contacts');
      return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
    } catch {
      return INITIAL_CONTACTS;
    }
  });

  const [clipboardItems, setClipboardItems] = useState<ClipboardItem[]>(() => {
    try {
      const saved = localStorage.getItem('edgepanel_clipboard');
      return saved ? JSON.parse(saved) : INITIAL_CLIPBOARD;
    } catch {
      return INITIAL_CLIPBOARD;
    }
  });

  // UI state
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('edgepanel_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('edgepanel_apps', JSON.stringify(apps));
  }, [apps]);

  useEffect(() => {
    localStorage.setItem('edgepanel_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('edgepanel_clipboard', JSON.stringify(clipboardItems));
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
      triggerToast(`تم تشغيل تطبيق "${app.nameAr}" في وضع الشاشة المنقسمة (Split-Screen)`);
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
    triggerToast(`تمت إضافة تطبيق "${nameAr}" إلى لوحة الحافة`);
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
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                EdgePanel
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                أندرويد & سامسونج
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              المحاكي التفاعلي للوحة الحافة الذكية مع أكواد Kotlin و Jetpack Compose الجاهزة
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Kotlin Code Button */}
          <button
            id="view-android-code-btn"
            onClick={() => setShowCodeModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
          >
            <Code2 className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span className="hidden sm:inline">كود أندرويد (Kotlin & Compose)</span>
            <span className="sm:hidden">الكود</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Studio Body */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-2 sm:p-4 gap-4 max-w-7xl mx-auto w-full">
        {/* Left Side (Desktop): Technical Insights & Quick Customizer */}
        <aside className="w-full lg:w-80 flex flex-col gap-3 order-2 lg:order-1">
          {/* Quick Info Box */}
          <div className="p-4 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400">
              <BatteryCharging className="w-4 h-4" />
              <h3 className="text-xs font-bold text-white">ترشيد فائق للبطارية 100%</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              تمت برمجة لوحة الحافة وفق معايير الشركات الكبرى:
              عندما تكون اللوحة مغلقة، يتم إلغاء تسجيل جميع الحساسات (Sensors) فوراً، ولا يتم سحب أي طاقة في الخلفية إطلاقاً.
            </p>
          </div>

          {/* Key Features Pill List */}
          <div className="p-4 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-300">اللوحات المتضمنة:</h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span><strong>Apps Edge:</strong> فتح سريع وميزة تقسيم الشاشة (Split-Screen)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span><strong>Quick Tools:</strong> بوصلة، ميزان ماء، مسطرة، كشاف ومسبحة</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span><strong>People Edge:</strong> جهات الاتصال وطلب الاتصال السريع</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span><strong>Clipboard:</strong> سجل النصوص ومسودة سريعة ذاتية الحفظ</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span><strong>Media:</strong> مشغل الموسيقى والتحكم بالصوت والسطوع</span>
              </div>
            </div>
          </div>

          {/* Quick Shortcut to Open Android Code */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/20 text-center space-y-2">
            <span className="text-xs font-bold text-cyan-200 block">هل أنت جاهز لتجربة الكود في Android Studio؟</span>
            <p className="text-[10px] text-slate-400">
              انقر لنسخ خدمة <code className="text-cyan-300">EdgePanelService.kt</code> والأذونات كاملة.
            </p>
            <button
              onClick={() => setShowCodeModal(true)}
              className="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold rounded-xl border border-cyan-500/30 transition-colors"
            >
              عرض وتحميل الأكواد
            </button>
          </div>
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
      </main>

      {/* Android Kotlin & Compose Source Code Modal */}
      <AndroidCodeModal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
      />
    </div>
  );
}
