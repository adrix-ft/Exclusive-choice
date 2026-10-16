import { useRef, useState, useEffect, useCallback } from 'react';

interface UseSwipeScrollOptions {
  itemWidth?: number; // Estimated card width + gap for step snapping
  totalItems?: number;
  snapOnRelease?: boolean;
}

export function useSwipeScroll({
  itemWidth = 260,
  totalItems = 0,
  snapOnRelease = true,
}: UseSwipeScrollOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isSwipingRef = useRef(false);

  // Internal pointer/drag tracking
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    startTime: 0,
    lastX: 0,
    hasMoved: false,
  });

  // Calculate and update active index on scroll
  const updateActiveIndex = useCallback(() => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = itemWidth || 260;
    const newIndex = Math.round(scrollLeft / width);
    const clamped = Math.max(0, Math.min(newIndex, Math.max(0, totalItems - 1)));
    setActiveIndex(clamped);
  }, [itemWidth, totalItems]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!containerRef.current) return;
      const width = itemWidth || 260;
      const targetLeft = index * width;
      containerRef.current.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    },
    [itemWidth]
  );

  const scrollPrev = useCallback(() => {
    scrollToIndex(Math.max(0, activeIndex - 1));
  }, [activeIndex, scrollToIndex]);

  const scrollNext = useCallback(() => {
    scrollToIndex(Math.min(Math.max(0, totalItems - 1), activeIndex + 1));
  }, [activeIndex, totalItems, scrollToIndex]);

  // Pointer Down (touch or mouse down)
  const onPointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    // Don't capture right click
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    dragInfo.current = {
      isDown: true,
      startX: e.clientX,
      startY: e.clientY,
      startScrollLeft: containerRef.current.scrollLeft,
      startTime: Date.now(),
      lastX: e.clientX,
      hasMoved: false,
    };
    isSwipingRef.current = false;
    setIsDragging(true);
  };

  // Pointer Move (touch move or mouse drag)
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragInfo.current.isDown || !containerRef.current) return;

    const deltaX = e.clientX - dragInfo.current.startX;
    const deltaY = e.clientY - dragInfo.current.startY;

    // Check if intentional horizontal swipe
    if (!dragInfo.current.hasMoved && Math.abs(deltaX) > 6) {
      // If moving more horizontally than vertically, lock horizontal scroll
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        dragInfo.current.hasMoved = true;
        isSwipingRef.current = true;
      }
    }

    if (dragInfo.current.hasMoved) {
      // Apply direct drag-to-scroll
      containerRef.current.scrollLeft = dragInfo.current.startScrollLeft - deltaX;
      dragInfo.current.lastX = e.clientX;
    }
  };

  // Pointer Up / Cancel
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragInfo.current.isDown || !containerRef.current) {
      dragInfo.current.isDown = false;
      setIsDragging(false);
      return;
    }

    const { startX, hasMoved, startTime } = dragInfo.current;
    const deltaX = e.clientX - startX;
    const duration = Date.now() - startTime;
    const velocity = Math.abs(deltaX) / Math.max(1, duration);

    dragInfo.current.isDown = false;
    setIsDragging(false);

    if (hasMoved && snapOnRelease) {
      const width = itemWidth || 260;
      const currentScroll = containerRef.current.scrollLeft;

      let targetIndex = Math.round(currentScroll / width);

      // Fast flick detection (velocity > 0.3 px/ms)
      if (velocity > 0.25 || Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          // Swiped left -> advance forward
          targetIndex = Math.ceil(currentScroll / width);
        } else {
          // Swiped right -> go backward
          targetIndex = Math.floor(currentScroll / width);
        }
      }

      const clampedIndex = Math.max(0, Math.min(targetIndex, Math.max(0, totalItems - 1)));
      scrollToIndex(clampedIndex);
    }

    // Keep isSwiping flag true for a brief tick to prevent click event bubbling
    setTimeout(() => {
      isSwipingRef.current = false;
    }, 80);
  };

  // Check if click was preceded by a drag/swipe
  const wasSwiping = () => isSwipingRef.current;

  // Add scroll listener for natural trackpad or momentum touch scrolling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timeoutId: number;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateActiveIndex, 60);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [updateActiveIndex]);

  return {
    containerRef,
    activeIndex,
    isDragging,
    wasSwiping,
    scrollPrev,
    scrollNext,
    scrollToIndex,
    swipeProps: {
      ref: containerRef,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      style: {
        touchAction: 'pan-x pan-y',
        WebkitOverflowScrolling: 'touch',
        cursor: isDragging ? 'grabbing' : 'grab',
      } as React.CSSProperties,
    },
  };
}
