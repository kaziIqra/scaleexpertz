"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Subtle body background tint shifts between sections so scrolling feels like
 * moving through spaces. Very low delta — texture, not a light show.
 */
const STOPS: { sel: string; color: string }[] = [
  { sel: "#top", color: "#fafaf7" },
  { sel: "#services", color: "#f5f4ee" },
  { sel: "#process", color: "#fafaf7" },
  { sel: "#work", color: "#f6f4ec" },
  { sel: "#faq", color: "#fafaf7" },
];

export default function BackgroundShift() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const validStops = STOPS.map(({ sel, color }) => ({
      el: document.querySelector(sel),
      color,
    })).filter((stop): stop is { el: Element; color: string } => stop.el !== null);

    const triggers = validStops.map(({ el, color }) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () =>
          gsap.to("body", { backgroundColor: color, duration: 0.8, overwrite: "auto" }),
        onEnterBack: () =>
          gsap.to("body", { backgroundColor: color, duration: 0.8, overwrite: "auto" }),
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}
