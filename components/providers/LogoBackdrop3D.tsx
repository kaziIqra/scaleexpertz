"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Site-wide ambient 3D logo watermark (Linear-style "depth with light").
 * Fixed behind all content at whisper opacity so copy stays fully readable;
 * sections with opaque backgrounds simply cover it. Hidden while the hero's
 * hero-sized Logo3D is on screen, then fades in as you scroll past it.
 *
 * At 5-8% opacity two side planes are indistinguishable from a full stack,
 * and the drift loop only runs once the watermark can actually be seen.
 */

const LAYERS = 2;
const STEP = 20;
const FADE_START = 420;

export default function LogoBackdrop3D() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // fade in once the hero's own centerpiece has scrolled away
  const opacity = useTransform(scrollY, [FADE_START, 980], [0, 1]);

  // don't pay for the drift loop while the watermark is at opacity 0
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > FADE_START));

  const drifting = visible && !reducedMotion;

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <div className="relative aspect-[912/700] w-[min(78vmin,720px)] opacity-[0.055] dark:opacity-[0.075] [perspective:1400px]">
        <motion.div
          className={`relative h-full w-full [transform-style:preserve-3d] ${drifting ? "will-change-transform" : ""}`}
          initial={{ rotateY: -14, rotateX: 10 }}
          animate={
            drifting
              ? { rotateY: [-14, 6, -14], rotateX: [10, 6, 10], y: [0, -14, 0] }
              : { rotateY: -14, rotateX: 10, y: 0 }
          }
          transition={
            drifting
              ? { duration: 26, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.4 }
          }
        >
          {Array.from({ length: LAYERS }).map((_, i) => {
            const depth = (LAYERS - i) * STEP;
            const brightness = 0.3 + 0.4 * (i / (LAYERS - 1));
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
          <div className="logo3d-img logo3d-front" />
        </motion.div>
      </div>
    </motion.div>
  );
}
