"use client";

import { useEffect, useRef, TouchEvent,useState, ReactElement } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children:React.ReactNode;
}

export default function BottomSheet({ open, onClose, children }: Props) {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const THRESHOLD = 120;
 const [translateY, setTranslateY] = useState(100); 

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setTranslateY(0));
    } else {
      document.body.style.overflow = "auto";
      setTranslateY(100);
    }
  }, [open]);

  if (!open) return null;

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
  
    startY.current = e.touches[0].clientY;
    currentY.current = 0;
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const y = e.touches[0].clientY;
    const delta = y - startY.current;

    if (delta > 0 && sheetRef.current) {
      currentY.current = delta;
      sheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const onTouchEnd = () => {
    if (!sheetRef.current) return;

    if (currentY.current > THRESHOLD) {
      sheetRef.current.style.transition = "transform 0.25s ease-out";
      sheetRef.current.style.transform = "translateY(100%)";
      setTimeout(() => onClose(), 200);
    } else {
      sheetRef.current.style.transition = "transform 0.25s ease-out";
      sheetRef.current.style.transform = "translateY(0px)";
    }

    setTimeout(() => {
      if (sheetRef.current) sheetRef.current.style.transition = "";
    }, 250);
  };


  return (
    <div className="fixed inset-0 z-40 flex items-end">
      <div className="absolute inset-0 bg-gray-400/20"></div>
      <div
        ref={sheetRef}
        className="relative w-full max-w-md mx-auto bg-white rounded-t-3xl shadow-xl pb-10 z-30 h-[90vh] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-full flex justify-center pt-4 pb-3">
          <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
        </div>
        {children}
      </div>
    </div>
  );
}
