export type PanelType = 'apps' | 'tools' | 'contacts' | 'clipboard' | 'media' | 'settings';

export interface AppItem {
  id: string;
  name: string;
  nameAr: string;
  iconName: string;
  color: string;
  category: string;
  isPinned: boolean;
  isRecent?: boolean;
}

export interface ContactItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarBg: string;
  avatarInitial: string;
  relationship: string;
  isFavorite: boolean;
}

export interface ClipboardItem {
  id: string;
  text: string;
  timestamp: string;
  isPinned: boolean;
  type?: 'text' | 'link' | 'code';
}

export interface ToolItem {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  description: string;
}

export interface PanelSettings {
  side: 'right' | 'left';
  handlePositionPercent: number; // 15% to 85%
  handleHeight: number; // 40px to 140px
  handleWidth: number; // 3px to 12px
  handleColor: string;
  handleOpacity: number; // 0.2 to 1.0
  hapticEnabled: boolean;
  theme: 'oneui-dark' | 'frosted-blur' | 'oled' | 'light';
  enabledPanels: PanelType[];
  activePanel: PanelType;
  blurStrength: number; // 0 to 24px
  autoHideSeconds: number; // 0 for off
}

export type ViewMode = 'phone' | 'full' | 'code';
