import React, { useRef, useState } from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Search, 
  Calendar, 
  Clock, 
  Phone, 
  MessageSquare, 
  Camera, 
  Globe, 
  Sparkles,
  Maximize2,
  Minimize2,
  Play
} from 'lucide-react';
import { PanelSettings, AppItem, ContactItem, ClipboardItem } from '../types';
import { EdgeHandle } from './EdgeHandle';
import { EdgePanelContainer } from './EdgePanelContainer';

interface PhoneFrameProps {
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
  isPanelOpen: boolean;
  onTogglePanel: () => void;
  onClosePanel: () => void;
  settings: PanelSettings;
  onUpdateSettings: (newSettings: Partial<PanelSettings>) => void;
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
  activeToast: string | null;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  isFullScreen,
  onToggleFullScreen,
  isPanelOpen,
  onTogglePanel,
  onClosePanel,
  settings,
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
  activeToast,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center relative p-2 sm:p-4 select-none">
      {/* Phone Body Container */}
      <div
        ref={containerRef}
        className={`relative transition-all duration-300 overflow-hidden shadow-2xl ${
          isFullScreen
            ? 'w-full h-[88vh] rounded-3xl border border-slate-700/80 bg-slate-950'
            : 'w-full max-w-[390px] h-[780px] max-h-[92vh] rounded-[48px] border-[10px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-slate-700/60 bg-slate-950'
        }`}
      >
        {/* Phone Speaker & Front Camera Hole */}
        {!isFullScreen && (
          <>
            {/* Top speaker grill */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-800 rounded-full z-50 pointer-events-none" />
            {/* Camera punch hole */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full border border-slate-800 shadow-inner z-50 pointer-events-none flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-950/60" />
            </div>
          </>
        )}

        {/* Realistic Android Wallpaper Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/80 pointer-events-none" />
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        {/* Android Status Bar */}
        <div className="relative z-20 px-6 pt-3 pb-2 flex items-center justify-between text-xs text-slate-300 font-sans pointer-events-none">
          <span className="font-semibold tracking-tight text-white font-mono">10:42</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-cyan-400">5G</span>
            <Signal className="w-3.5 h-3.5 text-slate-300" />
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono">94%</span>
              <Battery className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            </div>
          </div>
        </div>

        {/* Simulated Android Home Screen Workspace */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-5 pt-4 pb-8 text-white h-[calc(100%-40px)]">
          {/* Top Clock & Weather Widget */}
          <div className="space-y-1 text-center pt-4">
            <div className="text-5xl font-extrabold tracking-tight font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
              10:42
            </div>
            <div className="text-xs text-cyan-300 font-medium flex items-center justify-center gap-1.5">
              <span>الجمعة، 18 سبتمبر</span>
              <span>•</span>
              <span>الرياض 29°C</span>
            </div>
          </div>

          {/* Home Screen Search Pill */}
          <div className="w-full my-4 py-2 px-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Search className="w-4 h-4 text-cyan-400" />
              <span>البحث في الهاتف أو الويب...</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[10px] text-cyan-300 font-mono font-bold">One UI 6</span>
            </div>
          </div>

          {/* Instruction hint for user */}
          <div className="mx-auto max-w-[280px] p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center space-y-1">
            <div className="flex items-center justify-center gap-1 text-xs font-bold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>اسحب المقبض لتجربة لوحة الحافة</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              المقبض على {settings.side === 'right' ? 'الحافة اليمنى' : 'الحافة اليسرى'}. انقر عليه أو اسحبه لفتح لوحة التطبيقات والأدوات!
            </p>
          </div>

          {/* Simulated Home Screen Apps Grid */}
          <div className="grid grid-cols-4 gap-3 py-2">
            {apps.slice(0, 8).map((app) => (
              <div
                key={app.id}
                onClick={() => onLaunchApp(app)}
                className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${app.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                  <span className="text-white text-xs font-bold">{app.nameAr[0]}</span>
                </div>
                <span className="text-[10px] text-slate-300 mt-1 truncate w-full text-center">
                  {app.nameAr}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Dock Apps */}
          <div className="p-2.5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-around shadow-2xl">
            <div
              onClick={() => onLaunchApp(apps.find(a => a.id === 'phone') || apps[0])}
              className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center shadow-md cursor-pointer active:scale-90 transition-transform"
            >
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div
              onClick={() => onLaunchApp(apps.find(a => a.id === 'messages') || apps[1])}
              className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-md cursor-pointer active:scale-90 transition-transform"
            >
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div
              onClick={() => onLaunchApp(apps.find(a => a.id === 'chrome') || apps[2])}
              className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-md cursor-pointer active:scale-90 transition-transform"
            >
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div
              onClick={() => onLaunchApp(apps.find(a => a.id === 'camera') || apps[3])}
              className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center shadow-md cursor-pointer active:scale-90 transition-transform"
            >
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Android Navigation Gesture Bar */}
          <div className="w-24 h-1 bg-slate-500/70 rounded-full mx-auto -mb-4" />
        </div>

        {/* Live Notification Toast */}
        {activeToast && (
          <div className="absolute top-12 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl text-xs text-white flex items-center gap-2.5 animate-in fade-in slide-in-from-top duration-200">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="flex-1 font-medium">{activeToast}</span>
          </div>
        )}

        {/* The Edge Handle (Mounted on the container edge) */}
        <EdgeHandle
          settings={settings}
          isOpen={isPanelOpen}
          onToggle={onTogglePanel}
          onUpdatePosition={(newPercent) => onUpdateSettings({ handlePositionPercent: newPercent })}
          containerRef={containerRef}
        />

        {/* The Slide-out Edge Panel Container */}
        <EdgePanelContainer
          isOpen={isPanelOpen}
          settings={settings}
          onClose={onClosePanel}
          onSwitchPanel={(panel) => onUpdateSettings({ activePanel: panel })}
          onUpdateSettings={onUpdateSettings}
          apps={apps}
          contacts={contacts}
          clipboardItems={clipboardItems}
          onLaunchApp={onLaunchApp}
          onTogglePinApp={onTogglePinApp}
          onAddCustomApp={onAddCustomApp}
          onContactAction={onContactAction}
          onAddContact={onAddContact}
          onCopyClipboard={onCopyClipboard}
          onTogglePinClipboard={onTogglePinClipboard}
          onDeleteClipboard={onDeleteClipboard}
          onAddClipboard={onAddClipboard}
        />
      </div>

      {/* Screen Mode Toggle Button below */}
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={onToggleFullScreen}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-all"
        >
          {isFullScreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>العودة لإطار الهاتف</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>معاينة ملء الشاشة (Full Overlay)</span>
            </>
          )}
        </button>

        <button
          onClick={onTogglePanel}
          className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow transition-all active:scale-95"
        >
          <span>{isPanelOpen ? 'إغلاق اللوحة' : 'فتح لوحة الحافة'}</span>
        </button>
      </div>
    </div>
  );
};
