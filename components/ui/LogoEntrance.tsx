"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

type LogoEntranceProps = {
  children: React.ReactNode;
  /** When false, stays at the initial pose until true (e.g. preloader handoff). */
  play?: boolean;
  className?: string;
  /** Hero hub is longer / deeper; nav mark is a quicker flip. */
  variant?: "nav" | "hero";
  /** Fires once the entrance reaches its resting pose (skipped under reduced motion after fade). */
  onComplete?: () => void;
};

/**
 * One-shot logo entrance: comes from depth (small + blurred), flips on Y,
 * then settles. Honors prefers-reduced-motion with a simple fade.
 */
export default function LogoEntrance({
  children,
  play = true,
  className = "",
  variant = "nav",
  onComplete,
}: LogoEntranceProps) {
  const reduced = useReducedMotion();
  const isHero = variant === "hero";
  const delay = isHero ? 0.55 : 0.4;
  // ~1.7× prior timings — depth → flip → settle reads slower without dragging.
  const duration = isHero ? 2.35 : 1.9;

  if (reduced) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.45, delay: isHero ? 0.35 : 0.2 }}
        onAnimationComplete={() => {
          if (play) onComplete?.();
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`[perspective:1100px] ${className}`}>
      <motion.div
        className="h-full w-full [transform-style:preserve-3d] will-change-transform"
        initial={{
          opacity: 0,
          scale: isHero ? 0.38 : 0.5,
          rotateY: 180,
          filter: "blur(12px)",
        }}
        animate={
          play
            ? {
                opacity: [0, 1, 1],
                scale: [isHero ? 0.38 : 0.5, 0.94, 1],
                rotateY: [180, -10, 0],
                filter: ["blur(12px)", "blur(2px)", "blur(0px)"],
              }
            : {
                opacity: 0,
                scale: isHero ? 0.38 : 0.5,
                rotateY: 180,
                filter: "blur(12px)",
              }
        }
        transition={{
          duration,
          delay,
          ease: EASE_OUT_EXPO,
          times: [0, 0.58, 1],
        }}
        onAnimationComplete={() => {
          if (play) onComplete?.();
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
