import { AppItem, ContactItem, ClipboardItem, PanelSettings } from '../types';

export const INITIAL_APPS: AppItem[] = [
  { id: 'phone', name: 'Phone', nameAr: 'الهاتف', iconName: 'Phone', color: 'from-emerald-500 to-green-600', category: 'System', isPinned: true },
  { id: 'messages', name: 'Messages', nameAr: 'الرسائل', iconName: 'MessageSquare', color: 'from-blue-500 to-indigo-600', category: 'Communication', isPinned: true },
  { id: 'camera', name: 'Camera', nameAr: 'الكاميرا', iconName: 'Camera', color: 'from-rose-500 to-red-600', category: 'Media', isPinned: true },
  { id: 'gallery', name: 'Gallery', nameAr: 'الاستوديو', iconName: 'Image', color: 'from-amber-500 to-orange-600', category: 'Media', isPinned: true },
  { id: 'calculator', name: 'Calculator', nameAr: 'الآلة الحاسبة', iconName: 'Calculator', color: 'from-emerald-600 to-teal-700', category: 'Tools', isPinned: true },
  { id: 'notes', name: 'Samsung Notes', nameAr: 'الملاحظات', iconName: 'FileText', color: 'from-orange-500 to-amber-600', category: 'Productivity', isPinned: true },
  { id: 'whatsapp', name: 'WhatsApp', nameAr: 'واتساب', iconName: 'MessageCircle', color: 'from-green-500 to-emerald-600', category: 'Social', isPinned: false, isRecent: true },
  { id: 'maps', name: 'Google Maps', nameAr: 'الخرائط', iconName: 'MapPin', color: 'from-sky-500 to-blue-600', category: 'Navigation', isPinned: false, isRecent: true },
  { id: 'spotify', name: 'Spotify', nameAr: 'الموسيقى', iconName: 'Music', color: 'from-green-600 to-emerald-700', category: 'Media', isPinned: false, isRecent: true },
  { id: 'chrome', name: 'Browser', nameAr: 'المتصفح', iconName: 'Globe', color: 'from-purple-500 to-indigo-600', category: 'Internet', isPinned: false, isRecent: true },
  { id: 'settings', name: 'Settings', nameAr: 'الضبط', iconName: 'Settings', color: 'from-slate-500 to-slate-700', category: 'System', isPinned: false },
  { id: 'clock', name: 'Clock', nameAr: 'الساعة والمؤقت', iconName: 'Clock', color: 'from-violet-500 to-purple-600', category: 'Tools', isPinned: false },
];

export const INITIAL_CONTACTS: ContactItem[] = [
  { id: 'c1', name: 'أمجد القايدي (أنت)', phone: '+966 50 123 4567', email: 'gaidiamjed1@gmail.com', avatarBg: 'bg-gradient-to-tr from-cyan-500 to-blue-600', avatarInitial: 'أ', relationship: 'أنا', isFavorite: true },
  { id: 'c2', name: 'المهندس عبد الرحمن', phone: '+966 55 987 6543', email: 'abdulrahman.eng@gmail.com', avatarBg: 'bg-gradient-to-tr from-emerald-500 to-teal-600', avatarInitial: 'ع', relationship: 'فريق العمل', isFavorite: true },
  { id: 'c3', name: 'سارة العتيبي', phone: '+966 54 222 3344', email: 'sara.otb@work.sa', avatarBg: 'bg-gradient-to-tr from-rose-500 to-pink-600', avatarInitial: 'س', relationship: 'التصميم UI/UX', isFavorite: true },
  { id: 'c4', name: 'د. خالد الحربي', phone: '+966 56 777 8899', email: 'khaled.doctor@med.sa', avatarBg: 'bg-gradient-to-tr from-purple-500 to-indigo-600', avatarInitial: 'خ', relationship: 'طبيب العائلة', isFavorite: false },
  { id: 'c5', name: 'مكتب الدعم الفني', phone: '920001234', email: 'support@cloud.sa', avatarBg: 'bg-gradient-to-tr from-amber-500 to-yellow-600', avatarInitial: 'د', relationship: 'خدمات', isFavorite: false },
];

export const INITIAL_CLIPBOARD: ClipboardItem[] = [
  { id: 'clip-1', text: 'git clone https://github.com/amjed/edgepanel-android.git', timestamp: 'منذ 5 دقائق', isPinned: true, type: 'code' },
  { id: 'clip-2', text: '0501234567 - رقم الآيبان SA0380000000608010167519', timestamp: 'منذ 20 دقيقة', isPinned: true, type: 'text' },
  { id: 'clip-3', text: 'https://developer.android.com/reference/android/view/WindowManager', timestamp: 'منذ ساعتين', isPinned: false, type: 'link' },
  { id: 'clip-4', text: 'موعد اجتماع فريق أندرويد يوم الخميس الساعة 4:00 عصراً لمراجعة أداء الـ Overlay', timestamp: 'أمس', isPinned: false, type: 'text' },
];

export const DEFAULT_SETTINGS: PanelSettings = {
  side: 'right',
  handlePositionPercent: 40,
  handleHeight: 88,
  handleWidth: 6,
  handleColor: '#38bdf8', // sky-400
  handleOpacity: 0.85,
  hapticEnabled: true,
  theme: 'oneui-dark',
  enabledPanels: ['apps', 'tools', 'contacts', 'clipboard', 'media', 'settings'],
  activePanel: 'apps',
  blurStrength: 16,
  autoHideSeconds: 0,
};
