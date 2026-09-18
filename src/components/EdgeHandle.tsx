import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
import { PanelSettings } from '../types';

interface EdgeHandleProps {
  settings: PanelSettings;
  isOpen: boolean;
  onToggle: () => void;
  onUpdatePosition: (newPercent: number) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const EdgeHandle: React.FC<EdgeHandleProps> = ({
  settings,
  isOpen,
  onToggle,
  onUpdatePosition,
  containerRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const startPercent = useRef(settings.handlePositionPercent);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    startPercent.current = settings.handlePositionPercent;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    if (settings.hapticEnabled && 'vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch {
        // Safe catch if not allowed
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = containerRef?.current || document.body;
    const rect = container.getBoundingClientRect();
    const currentY = e.clientY - rect.top;
    const newPercent = Math.min(88, Math.max(12, (currentY / rect.height) * 100));
    onUpdatePosition(Math.round(newPercent));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    // If movement was minimal, treat as a toggle click
    const diff = Math.abs(e.clientY - dragStartY.current);
    if (diff < 6) {
      onToggle();
    }
  };

  const isRight = settings.side === 'right';

  return (
    <div
      id="edge-panel-handle-container"
      style={{
        top: `${settings.handlePositionPercent}%`,
        transform: 'translateY(-50%)',
      }}
      className={`absolute ${isRight ? 'right-0' : 'left-0'} z-50 select-none touch-none transition-transform duration-75`}
    >
      <div
        id="edge-panel-handle"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          height: `${settings.handleHeight}px`,
          backgroundColor: settings.handleColor,
          opacity: isDragging ? 1 : settings.handleOpacity,
          width: isDragging ? `${settings.handleWidth + 8}px` : `${settings.handleWidth}px`,
        }}
        className={`group relative flex items-center justify-center cursor-pointer transition-all duration-200 shadow-lg hover:shadow-cyan-500/20 active:scale-95 ${
          isRight ? 'rounded-l-full' : 'rounded-r-full'
        } ${isDragging ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900' : ''}`}
        title="اسحب لفتح لوحة الحافة أو حرك لأعلى وأسفل"
      >
        {/* Subtle grab bar indicator */}
        <div
          className={`absolute flex flex-col items-center justify-center pointer-events-none transition-opacity duration-200 ${
            isRight ? 'right-1 text-slate-900/80' : 'left-1 text-slate-900/80'
          } opacity-0 group-hover:opacity-100`}
        >
          <GripVertical className="w-3.5 h-3.5" />
        </div>

        {/* Small arrow tooltip badge on hover */}
        <div
          className={`absolute pointer-events-none whitespace-nowrap bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-2 py-1 rounded-md shadow-xl border border-slate-700/50 transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            isRight ? 'right-full mr-2.5' : 'left-full ml-2.5'
          } ${isDragging ? '!opacity-100 scale-105' : ''}`}
        >
          {isDragging ? `${settings.handlePositionPercent}%` : isOpen ? 'إغلاق اللوحة' : 'فتح لوحة الحافة'}
        </div>
      </div>
    </div>
  );
};
