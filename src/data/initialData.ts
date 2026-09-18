import { AppItem, ContactItem, ClipboardItem, PanelSettings } from '../types';

export const INITIAL_APPS: AppItem[] = [
  { id: 'phone', name: 'Google Phone', nameAr: 'الهاتف', iconName: 'Phone', color: 'from-emerald-500 to-teal-600', category: 'System', isPinned: true },
  { id: 'messages', name: 'Google Messages', nameAr: 'الرسائل', iconName: 'MessageSquare', color: 'from-blue-500 to-indigo-600', category: 'Communication', isPinned: true },
  { id: 'camera', name: 'Pixel Camera', nameAr: 'كاميرا Pixel', iconName: 'Camera', color: 'from-rose-500 to-red-600', category: 'Media', isPinned: true },
  { id: 'chrome', name: 'Google Chrome', nameAr: 'كروم', iconName: 'Globe', color: 'from-amber-500 via-red-500 to-emerald-500', category: 'Internet', isPinned: true },
  { id: 'gemini', name: 'Gemini AI Assistant', nameAr: 'جيميني الذكي', iconName: 'Sparkles', color: 'from-blue-600 via-indigo-600 to-purple-600', category: 'AI', isPinned: true },
  { id: 'calculator', name: 'Calculator', nameAr: 'الآلة الحاسبة', iconName: 'Calculator', color: 'from-cyan-600 to-blue-700', category: 'Tools', isPinned: true },
  { id: 'photos', name: 'Google Photos', nameAr: 'الصور', iconName: 'Image', color: 'from-amber-500 to-orange-600', category: 'Media', isPinned: true },
  { id: 'notes', name: 'Google Keep', nameAr: 'ملاحظات Keep', iconName: 'FileText', color: 'from-amber-500 to-yellow-600', category: 'Productivity', isPinned: true },
  { id: 'whatsapp', name: 'WhatsApp', nameAr: 'واتساب', iconName: 'MessageCircle', color: 'from-green-500 to-emerald-600', category: 'Social', isPinned: false, isRecent: true },
  { id: 'maps', name: 'Google Maps', nameAr: 'خرائط جوجل', iconName: 'MapPin', color: 'from-sky-500 to-blue-600', category: 'Navigation', isPinned: false, isRecent: true },
  { id: 'spotify', name: 'Spotify', nameAr: 'الموسيقى', iconName: 'Music', color: 'from-green-600 to-emerald-700', category: 'Media', isPinned: false, isRecent: true },
  { id: 'settings', name: 'Pixel Settings', nameAr: 'إعدادات النظام', iconName: 'Settings', color: 'from-slate-500 to-slate-700', category: 'System', isPinned: false },
  { id: 'clock', name: 'Clock & Timer', nameAr: 'الساعة والمنبه', iconName: 'Clock', color: 'from-violet-500 to-purple-600', category: 'Tools', isPinned: false },
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
  panelLayoutMode: 'floating-capsule', // Matches the video's floating pill!
  monetPalette: 'bay-blue',
  enableTileService: true,
  enableAccessibilitySplitScreen: true,
};
