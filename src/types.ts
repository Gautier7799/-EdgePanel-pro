export type PanelType = 'apps' | 'tools' | 'contacts' | 'clipboard' | 'media' | 'settings';

export type DeviceModel = 'pixel-8' | 'galaxy-s24';
export type AndroidVersion = 'android-17' | 'oneui-6';
export type PanelLayoutMode = 'floating-capsule' | 'full-drawer';
export type MonetPalette = 'bay-blue' | 'hazel-green' | 'obsidian-dark' | 'rose-gold' | 'sage-mint';
export type CapsuleStyle = 'frosted-light' | 'frosted-dark' | 'monet';

export interface AppPairItem {
  id: string;
  name: string;
  nameAr: string;
  app1Id: string;
  app2Id: string;
  app1Name: string;
  app2Name: string;
  app1Color: string;
  app2Color: string;
}

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
  handleWidth: number; // 3px to 14px
  handleColor: string;
  handleOpacity: number; // 0.2 to 1.0
  hapticEnabled: boolean;
  theme: 'oneui-dark' | 'frosted-blur' | 'oled' | 'light' | 'material-you';
  enabledPanels: PanelType[];
  activePanel: PanelType;
  blurStrength: number; // 0 to 24px
  autoHideSeconds: number; // 0 for off
  
  // Pixel 8 & Android 17 specific configurations
  deviceModel: DeviceModel;
  androidVersion: AndroidVersion;
  panelLayoutMode: PanelLayoutMode;
  monetPalette: MonetPalette;
  enableTileService: boolean;
  enableAccessibilitySplitScreen: boolean;

  // Exact UI Options from User Screenshot
  capsuleColumns: 1 | 2; // 2 columns like screenshot or 1 column like video
  capsuleStyle: CapsuleStyle; // 'frosted-light' (white like screenshot), 'frosted-dark', or 'monet'
  showRecentApps: boolean;
  appPairs: AppPairItem[];
}

export type ViewMode = 'phone' | 'full' | 'code';
