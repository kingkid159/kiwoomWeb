"use client";

import { useEffect } from "react";
import useBottomSheet from "./useBottomSheet";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: string; // ex: "80vh", "60vh"
}

export default function BottomSheet({ open, onClose, children, height = "85vh" }: BottomSheetProps) {
  const { sheetRef, scrollRef, onTouchStart, onTouchMove, onTouchEnd } = useBottomSheet(onClose);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

      <div
        ref={sheetRef}
        className="relative bg-white rounded-t-3xl shadow-xl w-full max-w-md mx-auto transition-transform"
        style={{ height }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Handle */}
        <div className="w-full flex justify-center py-3">
          <div className="w-14 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} className="h-[calc(100%-50px)] overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
