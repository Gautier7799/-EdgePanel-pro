import React, { useRef } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Grid, 
  Wrench, 
  Users, 
  ClipboardList, 
  Sliders, 
  Music,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { PanelSettings, PanelType, AppItem, ContactItem, ClipboardItem } from '../types';
import { AppsEdge } from './panels/AppsEdge';
import { ToolsEdge } from './panels/ToolsEdge';
import { ContactsEdge } from './panels/ContactsEdge';
import { ClipboardEdge } from './panels/ClipboardEdge';
import { MediaEdge } from './panels/MediaEdge';
import { SettingsEdge } from './panels/SettingsEdge';

interface EdgePanelContainerProps {
  isOpen: boolean;
  settings: PanelSettings;
  onClose: () => void;
  onSwitchPanel: (panel: PanelType) => void;
  onUpdateSettings: (newSettings: Partial<PanelSettings>) => void;
  
  // Data props
  apps: AppItem[];
  contacts: ContactItem[];
  clipboardItems: ClipboardItem[];
  onLaunchApp: (app: AppItem, isSplit?: boolean) => void;
  onTogglePinApp: (appId: string) => void;
  onAddCustomApp: (name: string, nameAr: string) => void;
  onContactAction: (contact: ContactItem, action: 'call' | 'sms' | 'whatsapp' | 'email') => void;
  onAddContact: (contact: Partial<ContactItem>) => void;
  onCopyClipboard: (text: string) => void;
  onTogglePinClipboard: (id: string) => void;
  onDeleteClipboard: (id: string) => void;
  onAddClipboard: (text: string) => void;
}

const PANEL_METADATA: Record<PanelType, { title: string; icon: React.ReactNode }> = {
  apps: { title: 'لوحة التطبيقات', icon: <Grid className="w-3.5 h-3.5" /> },
  tools: { title: 'الأدوات السريعة', icon: <Wrench className="w-3.5 h-3.5" /> },
  contacts: { title: 'جهات الاتصال', icon: <Users className="w-3.5 h-3.5" /> },
  clipboard: { title: 'الحافظة والمسودة', icon: <ClipboardList className="w-3.5 h-3.5" /> },
  media: { title: 'الوسائط والتحكم', icon: <Music className="w-3.5 h-3.5" /> },
  settings: { title: 'تخصيص اللوحة', icon: <Sliders className="w-3.5 h-3.5" /> },
};

export const EdgePanelContainer: React.FC<EdgePanelContainerProps> = ({
  isOpen,
  settings,
  onClose,
  onSwitchPanel,
  onUpdateSettings,
  apps,
  contacts,
  clipboardItems,
  onLaunchApp,
  onTogglePinApp,
  onAddCustomApp,
  onContactAction,
  onAddContact,
  onCopyClipboard,
  onTogglePinClipboard,
  onDeleteClipboard,
  onAddClipboard,
}) => {
  const isRight = settings.side === 'right';
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    
    // If swiped towards screen edge, close panel
    if (isRight && diff > 50) {
      onClose();
    } else if (!isRight && diff < -50) {
      onClose();
    }
    touchStartX.current = null;
  };

  // Next / Prev panel navigation
  const currentIndex = settings.enabledPanels.indexOf(settings.activePanel);
  const handleNextPanel = () => {
    const nextIdx = (currentIndex + 1) % settings.enabledPanels.length;
    onSwitchPanel(settings.enabledPanels[nextIdx]);
  };
  const handlePrevPanel = () => {
    const prevIdx = (currentIndex - 1 + settings.enabledPanels.length) % settings.enabledPanels.length;
    onSwitchPanel(settings.enabledPanels[prevIdx]);
  };

  return (
    <>
      {/* Backdrop overlay for focus */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 z-30 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-out Drawer */}
      <aside
        id="edge-panel-drawer"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`absolute top-0 bottom-0 z-40 w-72 sm:w-80 max-w-[85%] bg-slate-950/85 backdrop-blur-2xl border-white/10 flex flex-col shadow-2xl transition-transform duration-300 ease-out select-none ${
          isRight
            ? 'right-0 border-l rounded-l-3xl'
            : 'left-0 border-r rounded-r-3xl'
        } ${
          isOpen
            ? 'translate-x-0'
            : isRight
            ? 'translate-x-full'
            : '-translate-x-full'
        }`}
      >
        {/* Panel Header */}
        <div className="px-4 pt-4 pb-2 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              {PANEL_METADATA[settings.activePanel]?.icon}
            </span>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                {PANEL_METADATA[settings.activePanel]?.title || 'Edge Panel'}
              </h3>
              <span className="text-[10px] text-slate-400">
                {currentIndex + 1} من {settings.enabledPanels.length} لوحات
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onSwitchPanel('settings')}
              className={`p-1.5 rounded-lg transition-colors ${
                settings.activePanel === 'settings'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title="الضبط والتخصيص"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="إغلاق اللوحة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Panel Tabs Navigation Pill */}
        <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
          <button
            onClick={handlePrevPanel}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="اللوحة السابقة"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots / Mini pills indicator */}
          <div className="flex items-center gap-1.5">
            {settings.enabledPanels.map((p) => (
              <button
                key={p}
                onClick={() => onSwitchPanel(p)}
                className={`h-2 rounded-full transition-all ${
                  settings.activePanel === p
                    ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400/50'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={PANEL_METADATA[p]?.title}
              />
            ))}
          </div>

          <button
            onClick={handleNextPanel}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="اللوحة التالية"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Panel Body Content */}
        <div className="flex-1 overflow-hidden relative">
          {settings.activePanel === 'apps' && (
            <AppsEdge
              apps={apps}
              onLaunchApp={onLaunchApp}
              onTogglePin={onTogglePinApp}
              onAddCustomApp={onAddCustomApp}
            />
          )}

          {settings.activePanel === 'tools' && <ToolsEdge />}

          {settings.activePanel === 'contacts' && (
            <ContactsEdge
              contacts={contacts}
              onAction={onContactAction}
              onAddContact={onAddContact}
            />
          )}

          {settings.activePanel === 'clipboard' && (
            <ClipboardEdge
              items={clipboardItems}
              onCopyItem={onCopyClipboard}
              onTogglePin={onTogglePinClipboard}
              onDeleteItem={onDeleteClipboard}
              onAddNewClip={onAddClipboard}
            />
          )}

          {settings.activePanel === 'media' && <MediaEdge />}

          {settings.activePanel === 'settings' && (
            <SettingsEdge
              settings={settings}
              onUpdateSettings={onUpdateSettings}
            />
          )}
        </div>

        {/* Footer Swipe Handle Indicator */}
        <div className="p-2 border-t border-white/5 flex items-center justify-center text-[10px] text-slate-500 gap-1">
          <div className="w-12 h-1 bg-slate-700/60 rounded-full" />
        </div>
      </aside>
    </>
  );
};
