"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LIGHT_STOPS = [
  { sel: "#top", color: "#faf8f0" },
  { sel: "#services", color: "#f7f1e0" },
  { sel: "#process", color: "#faf8f0" },
  { sel: "#work", color: "#f5edd8" },
  { sel: "#faq", color: "#faf8f0" },
];

const DARK_STOPS = [
  { sel: "#top", color: "#0c0c0e" },
  { sel: "#services", color: "#12110e" },
  { sel: "#process", color: "#0c0c0e" },
  { sel: "#work", color: "#14120c" },
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
            : LIGHT_STOPS.find((s) => s.sel === `#${el.id}`)?.color || "#faf8f0";
          gsap.to("body", { backgroundColor: targetColor, duration: 0.8, overwrite: "auto" });
        },
        onEnterBack: () => {
          const currentIsDark = document.documentElement.classList.contains("dark");
          const targetColor = currentIsDark
            ? DARK_STOPS.find((s) => s.sel === `#${el.id}`)?.color || "#0c0c0e"
            : LIGHT_STOPS.find((s) => s.sel === `#${el.id}`)?.color || "#faf8f0";
          gsap.to("body", { backgroundColor: targetColor, duration: 0.8, overwrite: "auto" });
        },
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}
