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
  const [dragOffsetDistance, setDragOffsetDistance] = useState(0); // Horizontal swipe distance
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const startPercent = useRef(settings.handlePositionPercent);
  const isHorizontalGesture = useRef(false);

  const isRight = settings.side === 'right';

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragOffsetDistance(0);
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    startPercent.current = settings.handlePositionPercent;
    isHorizontalGesture.current = false;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    if (settings.hapticEnabled && 'vibrate' in navigator) {
      try {
        navigator.vibrate(20);
      } catch {
        // Safe catch
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartX.current;
    const deltaY = e.clientY - dragStartY.current;

    // Detect inward swipe (from right to left, or left to right)
    const inwardDistance = isRight ? -deltaX : deltaX;

    if (Math.abs(inwardDistance) > 8 && Math.abs(inwardDistance) > Math.abs(deltaY)) {
      isHorizontalGesture.current = true;
      // Inward swipe drag distance (capped at 140px)
      setDragOffsetDistance(Math.max(0, Math.min(140, inwardDistance)));
    } else if (!isHorizontalGesture.current && Math.abs(deltaY) > 6) {
      // Vertical handle repositioning
      const container = containerRef?.current || document.body;
      const rect = container.getBoundingClientRect();
      const currentY = e.clientY - rect.top;
      const newPercent = Math.min(85, Math.max(15, (currentY / rect.height) * 100));
      onUpdatePosition(Math.round(newPercent));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const currentDistance = dragOffsetDistance;
    setDragOffsetDistance(0);

    // If inward swipe was beyond 30px, open panel!
    if (isHorizontalGesture.current && currentDistance > 28) {
      if (!isOpen) onToggle();
      return;
    }

    // If movement was minimal (< 8px), treat as toggle tap
    const diffX = Math.abs(e.clientX - dragStartX.current);
    const diffY = Math.abs(e.clientY - dragStartY.current);
    if (diffX < 8 && diffY < 8) {
      onToggle();
    }
  };

  // Color mapping based on Monet or preset
  const getHandleColor = () => {
    if (settings.theme === 'material-you') {
      switch (settings.monetPalette) {
        case 'bay-blue':
          return '#38bdf8';
        case 'hazel-green':
          return '#10b981';
        case 'rose-gold':
          return '#fb7185';
        case 'sage-mint':
          return '#2dd4bf';
        default:
          return '#38bdf8';
      }
    }
    return settings.handleColor;
  };

  const handleBg = getHandleColor();

  return (
    <div
      id="edge-panel-handle-container"
      style={{
        top: `${settings.handlePositionPercent}%`,
        transform: 'translateY(-50%)',
      }}
      className={`absolute ${isRight ? 'right-0' : 'left-0'} z-50 select-none touch-none transition-transform duration-75`}
    >
      {/* 
        SAMSUNG DRAG EXPANSION INDICATOR (Frame 00:01 in User Video):
        When the user pulls inward, a blue rounded capsule/bubble with `<` expands towards screen center!
      */}
      {isDragging && dragOffsetDistance > 4 && (
        <div
          id="edge-swipe-expansion-bubble"
          style={{
            transform: isRight
              ? `translateX(-${dragOffsetDistance}px)`
              : `translateX(${dragOffsetDistance}px)`,
            width: `${Math.min(68, 36 + dragOffsetDistance * 0.4)}px`,
            height: `${Math.min(68, 36 + dragOffsetDistance * 0.4)}px`,
            backgroundColor: handleBg,
          }}
          className={`absolute top-1/2 -translate-y-1/2 ${
            isRight ? 'right-1' : 'left-1'
          } rounded-full flex items-center justify-center text-white shadow-[0_4px_25px_rgba(56,189,248,0.6)] pointer-events-none transition-all duration-75 z-40`}
        >
          {isRight ? (
            <ChevronLeft className="w-6 h-6 text-white stroke-[3] animate-pulse" />
          ) : (
            <ChevronRight className="w-6 h-6 text-white stroke-[3] animate-pulse" />
          )}
        </div>
      )}

      {/* Main Handle Bar on the screen edge */}
      <div
        id="edge-panel-handle"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          height: `${settings.handleHeight}px`,
          backgroundColor: handleBg,
          opacity: isDragging ? 1 : settings.handleOpacity,
          width: isDragging ? `${settings.handleWidth + 6}px` : `${settings.handleWidth}px`,
        }}
        className={`group relative flex items-center justify-center cursor-pointer transition-all duration-200 shadow-lg active:scale-95 ${
          isRight ? 'rounded-l-full' : 'rounded-r-full'
        } ${isDragging ? 'ring-2 ring-white/60' : ''}`}
        title="اسحب لفتح لوحة الحافة الذكية (Samsung Edge Panel on Pixel 8)"
      >
        {/* Subtle grab indicator */}
        <div
          className={`absolute flex flex-col items-center justify-center pointer-events-none transition-opacity duration-200 ${
            isRight ? 'right-0.5 text-slate-950/80' : 'left-0.5 text-slate-950/80'
          } opacity-0 group-hover:opacity-100`}
        >
          <GripVertical className="w-3.5 h-3.5" />
        </div>

        {/* Small tooltip pill on hover */}
        <div
          className={`absolute pointer-events-none whitespace-nowrap bg-slate-900/95 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-xl border border-slate-700/60 transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            isRight ? 'right-full mr-2' : 'left-full ml-2'
          } ${isDragging ? '!opacity-100 scale-105' : ''}`}
        >
          {isDragging
            ? dragOffsetDistance > 25
              ? 'أفلت لفتح اللوحة'
              : `${settings.handlePositionPercent}%`
            : isOpen
            ? 'إغلاق اللوحة'
            : 'اسحب لفتح لوحة الحافة'}
        </div>
      </div>
    </div>
  );
};
