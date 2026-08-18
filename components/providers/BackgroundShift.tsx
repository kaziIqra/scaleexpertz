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
  return null;
}
