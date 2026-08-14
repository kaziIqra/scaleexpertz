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
    <div className="relative flex flex-col items-center justify-center rounded-3xl border border-black/[0.08] bg-surface p-8 shadow-card overflow-hidden w-full max-w-lg">
      {/* Top Level: Disconnected Inputs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {STACK_NODES.map((node, i) => (
          <motion.div
            key={node.label}
            animate={{
              scale: activeStep === 0 ? 1.05 : 1,
              borderColor: activeStep === 0 ? "rgba(245, 158, 11, 0.6)" : "rgba(10, 10, 10, 0.08)",
            }}
            className="flex items-center gap-2 rounded-xl border bg-white px-3.5 py-2 shadow-sm"
          >
            <span className="text-sm">{node.icon}</span>
            <span className="font-display text-xs font-semibold text-ink">{node.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Animated Downward Flow Lines */}
      <div className="my-4 flex items-center justify-center h-12 w-full">
        <svg className="h-full w-48" viewBox="0 0 200 48" fill="none">
          <path d="M20 0 L100 44 M70 0 L100 44 M130 0 L100 44 M180 0 L100 44" stroke="rgba(10,10,10,0.12)" strokeWidth="1.5" strokeDasharray="3 3" />
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
          boxShadow: activeStep === 1 ? "0 10px 30px rgba(79, 70, 229, 0.25)" : "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
        className="z-10 flex items-center gap-3 rounded-2xl border border-accent bg-accent px-6 py-3.5 text-white shadow-card"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-amber font-semibold">One Team</span>
        <span className="font-display text-lg font-bold">ScaleXpertz</span>
      </motion.div>

      {/* Downward Output Arrow */}
      <div className="my-3 flex items-center justify-center h-10 w-full">
        <svg className="h-full w-8" viewBox="0 0 32 40" fill="none">
          <line x1="16" y1="0" x2="16" y2="30" stroke="rgba(10,10,10,0.15)" strokeWidth="2" />
          <polygon points="10,28 16,38 22,28" fill="rgba(10,10,10,0.2)" />
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
          borderColor: activeStep === 2 ? "#f59e0b" : "rgba(10,10,10,0.1)",
        }}
        className="flex items-center gap-3 rounded-2xl border-2 bg-white px-7 py-3.5 shadow-md"
      >
        <span className="text-xl">🚀</span>
        <div>
          <p className="font-display text-sm font-bold text-ink">Your Business</p>
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
    <section id="about" className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
      <Eyebrow index="02" label="The Problem" />

      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Text Content */}
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-ink md:text-5xl leading-[1.08]">
            Five Experts.<br />
            Five Priorities.<br />
            One Business.<br />
            <span className="text-accent">Congratulations. You&apos;re now managing six teams.</span>
          </h2>

          <div className="mt-8 space-y-4 max-w-2xl text-base md:text-lg leading-relaxed text-body font-medium">
            <p>
              Every partner is optimizing their own work. Very few are optimizing your business.
            </p>
            <p>
              ScaleXpertz brings strategy, branding, websites, marketing, AI and execution under one strategy, so every decision moves your business in the same direction.
            </p>
          </div>

          <div className="mt-8 border-l-2 border-amber pl-4 py-1">
            <p className="font-display text-xl font-bold tracking-tight text-ink">
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
