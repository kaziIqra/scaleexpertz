"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { preloader } from "@/lib/preloader";
import { useLenis } from "@/components/providers/SmoothScroll";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "@/lib/animations";

const COUNT_DURATION = 850;

export default function Preloader() {
  const [phase, setPhase] = useState<"count" | "exit" | "done">("count");
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useEffect(() => {
    // Inline script in layout sets this flag pre-paint for returning visitors.
    if (document.documentElement.dataset.preloaded === "1") {
      preloader.finish();
      setPhase("done");
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_DURATION, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem("sx-preloaded", "1");
        } catch {}
        // Hand off now so the hero starts revealing while the curtain lifts.
        setPhase("exit");
        preloader.finish();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!lenis || phase === "done") return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [lenis, phase]);

  if (phase === "done") return null;

  const exiting = phase === "exit";
  const curtain = (delay: number) =>
    reduced
      ? { animate: exiting ? { opacity: 0 } : {}, transition: { duration: 0.4, delay } }
      : {
          animate: exiting ? { y: "-100%" } : {},
          transition: { duration: 0.6, ease: EASE_IN_OUT, delay },
        };

  return (
    <div className="sx-preloader fixed inset-0 z-[200]" aria-hidden>
      {/* curtain panels */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-paper shadow-[0_8px_24px_rgb(0_0_0/0.08)]"
        {...curtain(0.05)}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-paper shadow-[0_8px_24px_rgb(0_0_0/0.08)]"
        {...curtain(0.13)}
        onAnimationComplete={() => {
          if (exiting) setPhase("done");
        }}
      />

      {/* wordmark + counter */}
      <motion.div
        className="absolute inset-0"
        animate={exiting ? { opacity: 0 } : {}}
        transition={{ duration: 0.25 }}
      >
        <div className="flex h-full items-center justify-center">
          <motion.span
            className="font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          >
            ScaleXpertz<span className="text-accent">.</span>
          </motion.span>
        </div>

        <span className="absolute bottom-8 right-8 font-mono text-sm tabular-nums text-ink/50">
          {String(progress).padStart(3, "0")} / 100
        </span>

        {/* progress hairline */}
        <span className="absolute inset-x-0 bottom-0 h-px bg-black/[0.06]">
          <span
            className="block h-full origin-left bg-accent transition-transform duration-100 ease-linear"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </span>
      </motion.div>
    </div>
  );
}
