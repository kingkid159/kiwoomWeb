import { useRef, useState, TouchEvent } from "react";

export default function useBottomSheet(onClose: () => void) {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const startY = useRef(0);
  const currentY = useRef(0);
  const THRESHOLD = 120;

  const [isDragging, setIsDragging] = useState(false);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
    currentY.current = 0;
    setIsDragging(true);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!sheetRef.current || !scrollRef.current) return;

    const scrollEl = scrollRef.current;
    const delta = e.touches[0].clientY - startY.current;

    const canScroll = scrollEl.scrollHeight > scrollEl.clientHeight;
    const atTop = scrollEl.scrollTop <= 0;

    // 내부 콘텐츠 스크롤 중이면 bottomsheet 제스처 방지
    if (canScroll && !atTop && delta > 0) return;

    // 아래 방향 드래그 시 bottomsheet 움직이기
    if (delta > 0) {
      currentY.current = delta;
      sheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const onTouchEnd = () => {
    if (!sheetRef.current) return;
    setIsDragging(false);

    if (currentY.current > THRESHOLD) {
      sheetRef.current.style.transition = "transform 0.25s ease-out";
      sheetRef.current.style.transform = "translateY(100%)";
      setTimeout(onClose, 200);
    } else {
      sheetRef.current.style.transition = "transform 0.25s ease-out";
      sheetRef.current.style.transform = "translateY(0px)";
    }

    setTimeout(() => {
      sheetRef.current!.style.transition = "";
    }, 250);
  };

  return {
    sheetRef,
    scrollRef,
    isDragging,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
