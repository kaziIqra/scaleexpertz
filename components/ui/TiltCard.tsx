"use client";

import { useRef, type ReactNode } from "react";

const MAX_DEG = 6;

/**
 * 3D-tilt hover card (max 6°) with a glare highlight tracking the cursor.
 * Pure transform/opacity; inert on touch and under reduced motion.
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const canTilt = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent) => {
    if (!canTilt()) return;
    const el = ref.current;
    const glare = glareRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 0.1s linear";
    el.style.transform = `perspective(900px) rotateX(${-py * MAX_DEG}deg) rotateY(${px * MAX_DEG}deg) translateY(-4px)`;
    if (glare) {
      glare.style.opacity = "1";
      glare.style.background = `radial-gradient(320px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgb(255 255 255 / 0.45), transparent 65%)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    const glare = glareRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    if (glare) glare.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      <div
        ref={glareRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}
