"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 8px dot + 36px trailing ring. The ring lerps behind the pointer, scales up
 * over interactive elements and turns into a labelled pill over anything
 * carrying a data-cursor attribute ("View", "Drag", "Open"…).
 * Not rendered at all for touch/coarse pointers.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("sx-cursor");

    let tx = -100;
    let ty = -100;
    let dx = tx;
    let dy = ty;
    let rx = tx;
    let ry = ty;
    let seen = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        dx = rx = tx;
        dy = ry = ty;
        setVisible(true);
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        "[data-cursor], a, button"
      );
      if (!el) {
        setActive(false);
        setLabel(null);
        return;
      }
      setActive(true);
      setLabel(el.getAttribute("data-cursor"));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    let raf = 0;
    const loop = () => {
      dx += (tx - dx) * 0.6;
      dy += (ty - dy) * 0.6;
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      document.documentElement.classList.remove("sx-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[300] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div ref={dotRef} className="absolute left-0 top-0 will-change-transform">
        <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </div>
      <div ref={ringRef} className="absolute left-0 top-0 will-change-transform">
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 ease-out ${
            label
              ? "h-[90px] w-[90px] border-black/[0.06] dark:border-white/20 bg-surface/90 dark:bg-[#141419]/90 shadow-card backdrop-blur-sm"
              : active
                ? "h-14 w-14 border-accent/40"
                : "h-9 w-9 border-accent/25"
          }`}
        >
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink dark:text-white font-bold">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
  