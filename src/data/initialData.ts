import { AppItem, ContactItem, ClipboardItem, PanelSettings, AppPairItem } from '../types';

export const INITIAL_APP_PAIRS: AppPairItem[] = [
  {
    id: 'pair-1',
    name: 'YouTube + Chrome',
    nameAr: 'يوتيوب + كروم',
    app1Id: 'youtube',
    app2Id: 'chrome',
    app1Name: 'YouTube',
    app2Name: 'Chrome',
    app1Color: 'from-red-500 to-rose-600',
    app2Color: 'from-amber-500 via-red-500 to-emerald-500',
  },
  {
    id: 'pair-2',
    name: 'Calculator + Notes',
    nameAr: 'الحاسبة + الملاحظات',
    app1Id: 'calculator',
    app2Id: 'notes',
    app1Name: 'الحاسبة',
    app2Name: 'الملاحظات',
    app1Color: 'from-emerald-500 to-teal-600',
    app2Color: 'from-amber-500 to-yellow-600',
  }
];

export const INITIAL_APPS: AppItem[] = [
  // Top Recent Apps (Matching Screenshot_20260918-115836.png top 4)
  { id: 'gallery', name: 'Gallery', nameAr: 'الاستوديو', iconName: 'Image', color: 'from-rose-500 to-pink-600', category: 'Media', isPinned: true, isRecent: true },
  { id: 'camera', name: 'Camera', nameAr: 'الكاميرا', iconName: 'Camera', color: 'from-rose-600 to-red-600', category: 'Media', isPinned: true, isRecent: true },
  { id: 'google', name: 'Google', nameAr: 'جوجل', iconName: 'Search', color: 'from-white to-slate-100 text-slate-800', category: 'System', isPinned: true, isRecent: true },
  { id: 'ytstudio', name: 'YT Studio', nameAr: 'استوديو يوتيوب', iconName: 'Video', color: 'from-red-600 to-rose-700', category: 'Media', isPinned: true, isRecent: true },

  // Favorite Apps (Matching Screenshot_20260918-115836.png rows below divider)
  { id: 'youtube', name: 'YouTube', nameAr: 'يوتيوب', iconName: 'Play', color: 'from-red-500 to-red-600', category: 'Media', isPinned: true },
  { id: 'chrome', name: 'Google Chrome', nameAr: 'كروم', iconName: 'Globe', color: 'from-amber-500 via-red-500 to-emerald-500', category: 'Internet', isPinned: true },
  { id: 'meet', name: 'Google Meet', nameAr: 'ميت', iconName: 'Video', color: 'from-emerald-500 via-teal-500 to-sky-600', category: 'Communication', isPinned: true },
  { id: 'calculator', name: 'Calculator', nameAr: 'الحاسبة', iconName: 'Calculator', color: 'from-emerald-500 to-teal-600', category: 'Tools', isPinned: true },
  { id: 'notes', name: 'Google Keep', nameAr: 'الملاحظات', iconName: 'FileText', color: 'from-amber-500 to-yellow-600', category: 'Productivity', isPinned: true },
  { id: 'gemini', name: 'Gemini AI', nameAr: 'جيميني', iconName: 'Sparkles', color: 'from-blue-600 via-indigo-600 to-purple-600', category: 'AI', isPinned: true },
  { id: 'phone', name: 'Phone', nameAr: 'الهاتف', iconName: 'Phone', color: 'from-emerald-500 to-teal-600', category: 'System', isPinned: true },
  { id: 'messages', name: 'Messages', nameAr: 'الرسائل', iconName: 'MessageSquare', color: 'from-blue-500 to-indigo-600', category: 'Communication', isPinned: true },
  { id: 'photos', name: 'Google Photos', nameAr: 'الصور', iconName: 'Image', color: 'from-amber-500 to-orange-600', category: 'Media', isPinned: false },
  { id: 'whatsapp', name: 'WhatsApp', nameAr: 'واتساب', iconName: 'MessageSquare', color: 'from-green-500 to-emerald-600', category: 'Social', isPinned: false },
  { id: 'maps', name: 'Google Maps', nameAr: 'الخرائط', iconName: 'Globe', color: 'from-sky-500 to-blue-600', category: 'Navigation', isPinned: false },
  { id: 'settings', name: 'Settings', nameAr: 'الضبط', iconName: 'Settings', color: 'from-slate-500 to-slate-700', category: 'System', isPinned: false },
  { id: 'clock', name: 'Clock', nameAr: 'الساعة', iconName: 'Clock', color: 'from-violet-500 to-purple-600', category: 'Tools', isPinned: false },
];

export const INITIAL_CONTACTS: ContactItem[] = [
  { id: 'c1', name: 'أمجد القايدي (أنت)', phone: '+966 50 123 4567', email: 'gaidiamjed1@gmail.com', avatarBg: 'bg-gradient-to-tr from-cyan-500 to-blue-600', avatarInitial: 'أ', relationship: 'أنا', isFavorite: true },
  { id: 'c2', name: 'المهندس عبد الرحمن', phone: '+966 55 987 6543', email: 'abdulrahman.eng@gmail.com', avatarBg: 'bg-gradient-to-tr from-emerald-500 to-teal-600', avatarInitial: 'ع', relationship: 'فريق العمل', isFavorite: true },
  { id: 'c3', name: 'سارة العتيبي', phone: '+966 54 222 3344', email: 'sara.otb@work.sa', avatarBg: 'bg-gradient-to-tr from-rose-500 to-pink-600', avatarInitial: 'س', relationship: 'التصميم UI/UX', isFavorite: true },
  { id: 'c4', name: 'د. خالد الحربي', phone: '+966 56 777 8899', email: 'khaled.doctor@med.sa', avatarBg: 'bg-gradient-to-tr from-purple-500 to-indigo-600', avatarInitial: 'خ', relationship: 'طبيب العائلة', isFavorite: false },
  { id: 'c5', name: 'مكتب الدعم الفني', phone: '920001234', email: 'support@cloud.sa', avatarBg: 'bg-gradient-to-tr from-amber-500 to-yellow-600', avatarInitial: 'د', relationship: 'خدمات', isFavorite: false },
];

export const INITIAL_CLIPBOARD: ClipboardItem[] = [
  { id: 'clip-1', text: 'adb shell cmd statusbar expand-settings', timestamp: 'منذ دقيقة', isPinned: true, type: 'code' },
  { id: 'clip-2', text: 'Pixel 8 Tensor G3 - 120Hz Smooth Display', timestamp: 'منذ 10 دقائق', isPinned: true, type: 'text' },
  { id: 'clip-3', text: 'https://source.android.com/devices/tech/display/adaptive-refresh-rate', timestamp: 'منذ ساعتين', isPinned: false, type: 'link' },
  { id: 'clip-4', text: 'mo_action_split_screen = AccessibilityService.GLOBAL_ACTION_TOGGLE_SPLIT_SCREEN', timestamp: 'أمس', isPinned: false, type: 'code' },
];

export const DEFAULT_SETTINGS: PanelSettings = {
  side: 'right',
  handlePositionPercent: 32,
  handleHeight: 96,
  handleWidth: 6,
  handleColor: '#38bdf8', // Bay Blue / Sky
  handleOpacity: 0.88,
  hapticEnabled: true,
  theme: 'material-you',
  enabledPanels: ['apps', 'tools', 'contacts', 'clipboard', 'media', 'settings'],
  activePanel: 'apps',
  blurStrength: 18,
  autoHideSeconds: 0,

  // Pixel 8 & Android 17 defaults
  deviceModel: 'pixel-8',
  androidVersion: 'android-17',
  panelLayoutMode: 'floating-capsule', // Matches the video & screenshot floating card!
  monetPalette: 'bay-blue',
  enableTileService: true,
  enableAccessibilitySplitScreen: true,

  // Screenshot_20260918-115836.png matching defaults:
  capsuleColumns: 2, // 2-Column layout matching the screenshot!
  capsuleStyle: 'frosted-light', // Light frosted glass matching the user's screenshot!
  showRecentApps: true,
  appPairs: INITIAL_APP_PAIRS,
};
