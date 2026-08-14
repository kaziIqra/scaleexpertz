"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Magnetic wrapper — the child is attracted to the cursor within `radius` px
 * of its edge (max offset `strength` px) and springs back on exit.
 * Inert on touch devices and under prefers-reduced-motion.
 */
export default function Magnetic({
  children,
  strength = 12,
  radius = 80,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clamp = (v: number) => Math.max(-strength, Math.min(strength, v));
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dxp = e.clientX - cx;
      const dyp = e.clientY - cy;
      const range = Math.max(r.width, r.height) / 2 + radius;
      const dist = Math.hypot(dxp, dyp);
      if (dist < range) {
        const pull = 1 - dist / range;
        x.set(clamp(dxp * pull * 0.4));
        y.set(clamp(dyp * pull * 0.4));
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [radius, strength, x, y]);

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={className || "inline-block"}>
      {children}
    </motion.div>
  );
}
