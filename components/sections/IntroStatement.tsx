"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Eyebrow from "../ui/Eyebrow";

const STACK_NODES = [
  { label: "Website", icon: "🌐" },
  { label: "Ads & Marketing", icon: "📈" },
  { label: "Branding", icon: "🎨" },
  { label: "Technology & AI", icon: "⚙️" },
];

function FlowAnimation() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center rounded-3xl border border-black/[0.08] dark:border-white/15 bg-surface dark:bg-[#141419] p-8 shadow-card overflow-hidden w-full max-w-lg">
      {/* Top Level: Disconnected Inputs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {STACK_NODES.map((node, i) => (
          <motion.div
            key={node.label}
            animate={{
              scale: activeStep === 0 ? 1.05 : 1,
              borderColor: activeStep === 0 ? "rgba(245, 158, 11, 0.8)" : "rgba(255, 255, 255, 0.12)",
            }}
            className="flex items-center gap-2 rounded-xl border border-black/[0.08] dark:border-white/15 bg-white dark:bg-[#1c1c24] px-3.5 py-2 shadow-sm"
          >
            <span className="text-sm">{node.icon}</span>
            <span className="font-display text-xs font-semibold text-ink dark:text-white">{node.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Animated Downward Flow Lines */}
      <div className="my-4 flex items-center justify-center h-12 w-full">
        <svg className="h-full w-48" viewBox="0 0 200 48" fill="none">
          <path d="M20 0 L100 44 M70 0 L100 44 M130 0 L100 44 M180 0 L100 44" stroke="rgba(128,128,128,0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
          <motion.path
            d="M20 0 L100 44 M70 0 L100 44 M130 0 L100 44 M180 0 L100 44"
            stroke="#4f46e5"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: activeStep >= 1 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        </svg>
      </div>

      {/* Central ScaleXpertz Hub Node */}
      <motion.div
        animate={{
          scale: activeStep === 1 ? 1.08 : 1,
          boxShadow: activeStep === 1 ? "0 10px 30px rgba(79, 70, 229, 0.35)" : "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
        className="z-10 flex items-center gap-3 rounded-2xl border border-accent bg-accent px-6 py-3.5 text-white shadow-card"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-amber font-semibold">One Team</span>
        <span className="font-display text-lg font-bold">ScaleXpertz</span>
      </motion.div>

      {/* Downward Output Arrow */}
      <div className="my-3 flex items-center justify-center h-10 w-full">
        <svg className="h-full w-8" viewBox="0 0 32 40" fill="none">
          <line x1="16" y1="0" x2="16" y2="30" stroke="rgba(128,128,128,0.3)" strokeWidth="2" />
          <polygon points="10,28 16,38 22,28" fill="rgba(128,128,128,0.4)" />
          <motion.line
            x1="16"
            y1="0"
            x2="16"
            y2="30"
            stroke="#f59e0b"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: activeStep === 2 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
        </svg>
      </div>

      {/* Bottom Level: Your Business */}
      <motion.div
        animate={{
          scale: activeStep === 2 ? 1.05 : 1,
          borderColor: activeStep === 2 ? "#f59e0b" : "rgba(255,255,255,0.15)",
        }}
        className="flex items-center gap-3 rounded-2xl border-2 border-black/[0.08] dark:border-white/15 bg-white dark:bg-[#1c1c24] px-7 py-3.5 shadow-md"
      >
        <span className="text-xl">🚀</span>
        <div>
          <p className="font-display text-sm font-bold text-ink dark:text-white">Your Business</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber font-semibold">One Direction</p>
        </div>
      </motion.div>

      <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-widest text-ink/50">
        Everything flows through one team before reaching your business.
      </p>
    </div>
  );
}

export default function IntroStatement() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      <Eyebrow index="02" label="The Problem" />

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-center">
        {/* Text Content */}
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl md:text-4xl leading-[1.12]">
            Five Experts.<br />
            Five Priorities.<br />
            One Business.<br />
            <span className="text-accent">Congratulations. You&apos;re now managing six teams.</span>
          </h2>

          <div className="mt-6 space-y-3 max-w-2xl text-sm sm:text-base leading-relaxed text-body font-medium">
            <p>
              Every partner is optimizing their own work. Very few are optimizing your business.
            </p>
            <p>
              ScaleXpertz brings strategy, branding, websites, marketing, AI and execution under one strategy, so every decision moves your business in the same direction.
            </p>
          </div>

          <div className="mt-6 border-l-2 border-amber pl-4 py-1">
            <p className="font-display text-base font-bold tracking-tight text-ink sm:text-lg">
              One strategy. One team. One direction.
            </p>
          </div>
        </div>

        {/* Visual Animation */}
        <div className="lg:col-span-5 flex justify-center">
          <FlowAnimation />
        </div>
      </div>
    </section>
  );
}
