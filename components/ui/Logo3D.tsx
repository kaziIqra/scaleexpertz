"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * 3D extruded ScaleXpertz monogram, built with the layered-plane technique
 * used by godly.website-class heroes: stacked copies of the mark along
 * translateZ. Back copies are the gold variant darkened toward bronze so the
 * "sides" read as shadowed metal; the front copy is the full brand artwork
 * (black+gold in light theme, platinum+gold in dark — swapped via CSS var).
 *
 * Motion (transform-only, compositor-friendly):
 *  - outer wrapper: idle float (slow sine y-drift + micro-sway)
 *  - inner wrapper: spring-smoothed pointer tilt (disabled on touch/reduced-motion)
 * Everything is gated on viewport intersection so an off-screen logo costs
 * nothing: no float loop, no pointermove listener, no pinned GPU layers.
 */

const LAYERS = 7;
const STEP = 6; // px of depth per layer (7 x 6 = same 42px extrusion)

type Logo3DProps = {
  className?: string;
  /** base resting pose */
  baseRotateY?: number;
  baseRotateX?: number;
  /** max extra tilt from the pointer, degrees */
  maxTilt?: number;
  /** enable the slow idle float loop */
  float?: boolean;
  /** gold rim-glow layer behind the extrusion */
  glow?: boolean;
};

export default function Logo3D({
  className = "",
  baseRotateY = -16,
  baseRotateX = 9,
  maxTilt = 20,
  float = true,
  glow = true,
}: Logo3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();
  const [tiltEnabled, setTiltEnabled] = useState(false);

  const mx = useMotionValue(0); // normalized cursor -0.5..0.5
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 14 });
  const sy = useSpring(my, { stiffness: 120, damping: 14 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [baseRotateY - maxTilt, baseRotateY + maxTilt]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [baseRotateX + maxTilt * 0.7, baseRotateX - maxTilt * 0.7]);

  useEffect(() => {
    // pointer tilt only while visible, for fine pointers, when motion is allowed
    if (!inView || reducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      setTiltEnabled(false);
      mx.set(0); // settle back to the base pose
      my.set(0);
      return;
    }
    setTiltEnabled(true);
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [inView, reducedMotion, mx, my]);

  const idleFloat = float && !reducedMotion && inView;
  const animating = idleFloat || tiltEnabled;

  return (
    <div ref={ref} className={`pointer-events-none [perspective:1200px] ${className}`} aria-hidden>
      {/* outer: idle float */}
      <motion.div
        className={`h-full w-full [transform-style:preserve-3d] ${animating ? "will-change-transform" : ""}`}
        animate={idleFloat ? { y: [0, -10, 0], rotateZ: [0, 0.8, 0] } : { y: 0, rotateZ: 0 }}
        transition={
          idleFloat
            ? { duration: 9, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
      >
        {/* inner: pointer tilt (falls back to the static base pose) */}
        <motion.div
          className={`relative h-full w-full [transform-style:preserve-3d] ${animating ? "will-change-transform" : ""}`}
          style={
            tiltEnabled
              ? { rotateY, rotateX }
              : { rotateY: baseRotateY, rotateX: baseRotateX }
          }
        >
          {/* gold rim-glow bloom behind the metal (static, painted once) */}
          {glow && (
            <div
              className="logo3d-img logo3d-side opacity-35"
              style={{
                transform: "translateZ(-70px) scale(1.08)",
                filter: "blur(26px) brightness(1.15)",
              }}
            />
          )}

          {/* extrusion body: darkened bronze back layers */}
          {Array.from({ length: LAYERS }).map((_, i) => {
            const depth = (LAYERS - i) * STEP;
            const brightness = 0.26 + 0.42 * (i / (LAYERS - 1));
            return (
              <div
                key={i}
                className="logo3d-img logo3d-side"
                style={{
                  transform: `translateZ(${-depth}px)`,
                  filter: `brightness(${brightness})`,
                }}
              />
            );
          })}

          {/* front face: full brand artwork (theme-aware via CSS var) */}
          <div
            className="logo3d-img logo3d-front"
            style={{ filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.35))" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
