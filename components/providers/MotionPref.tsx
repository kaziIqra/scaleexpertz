"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";

/**
 * Site-wide motion preference (WCAG 2.2.2 Pause, Stop, Hide).
 *
 * - `reducedMotion="user"` makes framer-motion honor the OS reduce-motion
 *   setting for every transform/layout animation automatically.
 * - The user-facing pause toggle switches it to "always" (all decorative
 *   framer loops stop), adds `motion-paused` on <html> so decorative CSS
 *   keyframes freeze (see globals.css), and is read by GSAP-driven pieces
 *   (Marquee) via the usePausedMotion hook. Persisted in localStorage.
 */

const Ctx = createContext<{ paused: boolean; toggle: () => void }>({
  paused: false,
  toggle: () => {},
});

export const usePausedMotion = () => useContext(Ctx);

export function MotionPrefProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);

  // hydrate the stored choice after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      if (localStorage.getItem("sx-motion") === "paused") setPaused(true);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused", paused);
    try {
      localStorage.setItem("sx-motion", paused ? "paused" : "on");
    } catch {}
  }, [paused]);

  return (
    <Ctx.Provider value={{ paused, toggle: () => setPaused((p) => !p) }}>
      <MotionConfig reducedMotion={paused ? "always" : "user"}>
        {children}
      </MotionConfig>
    </Ctx.Provider>
  );
}

/** Small persistent pause/resume control for all ambient animation. */
export function MotionToggle() {
  const { paused, toggle } = usePausedMotion();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? "Resume animations" : "Pause animations"}
      title={paused ? "Resume animations" : "Pause animations"}
      className="fixed bottom-5 left-5 z-[150] flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.1] dark:border-white/15 bg-surface/80 text-ink/60 shadow-card backdrop-blur-md transition-colors duration-300 hover:text-ink"
    >
      {paused ? (
        <svg className="ml-0.5 h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <path d="M4 2.5v11l9-5.5-9-5.5Z" />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <rect x="3.5" y="2.5" width="3" height="11" rx="0.8" />
          <rect x="9.5" y="2.5" width="3" height="11" rx="0.8" />
        </svg>
      )}
    </button>
  );
}
