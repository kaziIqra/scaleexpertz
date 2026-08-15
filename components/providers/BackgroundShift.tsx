"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LIGHT_STOPS = [
  { sel: "#top", color: "#fafaf7" },
  { sel: "#services", color: "#f5f4ee" },
  { sel: "#process", color: "#fafaf7" },
  { sel: "#work", color: "#f6f4ec" },
  { sel: "#faq", color: "#fafaf7" },
];

const DARK_STOPS = [
  { sel: "#top", color: "#0c0c0e" },
  { sel: "#services", color: "#111116" },
  { sel: "#process", color: "#0c0c0e" },
  { sel: "#work", color: "#111116" },
  { sel: "#faq", color: "#0c0c0e" },
];

export default function BackgroundShift() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isDark = document.documentElement.classList.contains("dark");
    const stops = isDark ? DARK_STOPS : LIGHT_STOPS;

    const validStops = stops
      .map(({ sel, color }) => ({
        el: document.querySelector(sel),
        color,
      }))
      .filter((stop): stop is { el: Element; color: string } => stop.el !== null);

    const triggers = validStops.map(({ el, color }) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => {
          const currentIsDark = document.documentElement.classList.contains("dark");
          const targetColor = currentIsDark
            ? DARK_STOPS.find((s) => s.sel === `#${el.id}`)?.color || "#0c0c0e"
            : LIGHT_STOPS.find((s) => s.sel === `#${el.id}`)?.color || "#fafaf7";
          gsap.to("body", { backgroundColor: targetColor, duration: 0.8, overwrite: "auto" });
        },
        onEnterBack: () => {
          const currentIsDark = document.documentElement.classList.contains("dark");
          const targetColor = currentIsDark
            ? DARK_STOPS.find((s) => s.sel === `#${el.id}`)?.color || "#0c0c0e"
            : LIGHT_STOPS.find((s) => s.sel === `#${el.id}`)?.color || "#fafaf7";
          gsap.to("body", { backgroundColor: targetColor, duration: 0.8, overwrite: "auto" });
        },
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}
