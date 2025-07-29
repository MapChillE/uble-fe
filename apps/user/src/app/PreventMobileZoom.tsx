"use client";

import { useEffect } from "react";

export default function PreventMobileZoom() {
  useEffect(() => {
    const preventGesture = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventGestureStart = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("touchstart", preventGesture, { passive: false });
    document.addEventListener("gesturestart", preventGestureStart, { passive: false });
    document.addEventListener("gesturechange", preventGestureStart, { passive: false });
    document.addEventListener("gestureend", preventGestureStart, { passive: false });

    return () => {
      document.removeEventListener("touchstart", preventGesture);
      document.removeEventListener("gesturestart", preventGestureStart);
      document.removeEventListener("gesturechange", preventGestureStart);
      document.removeEventListener("gestureend", preventGestureStart);
    };
  }, []);

  return null;
}
