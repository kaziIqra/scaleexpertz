"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Eyebrow from "../ui/Eyebrow";

const PLAYBACK_RATE = 0.75;

function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyRate = () => {
      video.playbackRate = PLAYBACK_RATE;
    };

    applyRate();
    video.addEventListener("loadedmetadata", applyRate);
    video.addEventListener("play", applyRate);

    return () => {
      video.removeEventListener("loadedmetadata", applyRate);
      video.removeEventListener("play", applyRate);
    };
  }, []);

  return (
    <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl border border-black/[0.08] bg-surface shadow-card dark:border-white/15 dark:bg-[#141419]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full scale-[1.18] object-cover"
        src="/services/introvideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="How ScaleXpertz unifies services into one team for your business"
      />
    </div>
  );
}

export default function IntroStatement() {
  const statementCards = [
    { text: "Five Experts.", highlight: "Independent agency silos" },
    { text: "Five Priorities.", highlight: "Conflicting goals & deadlines" },
    { text: "One Business.", highlight: "Your company caught in the middle" },
    {
      text: "Congratulations. You're now managing six teams.",
      highlight: "Coordination Chaos™",
      isItalic: true,
      featured: true,
    },
  ];

  const priorities = [
    { label: "Ads & Marketing", icon: "📈" },
    { label: "Branding & Creative", icon: "🎨" },
    { label: "Website & Tech", icon: "💻" },
    { label: "AI & Automation", icon: "⚡" },
    { label: "Finance & Strategy", icon: "📊" },
  ];

  return (
    <section id="about" className="relative isolate mx-auto max-w-[1440px] px-6 py-10 md:px-12 md:py-14 overflow-hidden">
      {/* Background Soft Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[20%] h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-[20%] h-80 w-80 rounded-full bg-amber/10 blur-3xl" />
      </div>

      {/* Heading (H2) and Sub-heading (H3) */}
      <div className="mx-auto max-w-4xl text-center flex flex-col items-center justify-center">
        <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-ink dark:text-white sm:text-4xl md:text-5xl">
          01 — The Problem
        </h2>
        <h3 className="mt-3 max-w-3xl font-display text-xl font-bold tracking-tight text-accent dark:text-amber sm:text-2xl md:text-3xl leading-snug">
          Five Experts. Five Priorities. One Business.
        </h3>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          <div className="grid gap-3.5 sm:grid-cols-2">
            {statementCards.map((card, i) => (
              <motion.div
                key={card.text}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${card.featured
                    ? "sm:col-span-2 border-accent/80 dark:border-amber/70 bg-gradient-to-br from-amber-400/30 via-yellow-200/22 to-amber-500/25 dark:from-accent/30 dark:via-amber/20 dark:to-accent/15 shadow-[0_8px_32px_rgba(212,175,55,0.25)] hover:border-amber-500 dark:hover:border-amber hover:shadow-[0_12px_44px_rgba(212,175,55,0.4)]"
                    : "border-amber-500/30 dark:border-amber/35 bg-gradient-to-br from-amber-500/12 via-amber-400/8 to-amber-300/10 dark:from-accent/20 dark:via-amber/12 dark:to-transparent hover:border-amber-500/60 dark:hover:border-amber/60 shadow-md hover:shadow-xl"
                  }`}
              >
                {/* Scroll Shimmer Light Sweep */}
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  whileInView={{ x: ["-100%", "120%"], opacity: [0, 0.8, 0] }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: i * 0.1 }}
                  className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-amber-400/40 via-amber-500/30 dark:via-amber/30 to-transparent -skew-x-12"
                  aria-hidden
                />

                {/* Ambient Gold Radial Glow & Tech Grid Backdrop */}
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
                  <div className="absolute right-2 top-2 h-28 w-28 rounded-full bg-accent/12 dark:bg-amber/15 blur-2xl transition-all duration-700 group-hover:scale-125" />
                  <svg className="absolute inset-0 h-full w-full opacity-15 dark:opacity-25" viewBox="0 0 360 180" aria-hidden>
                    <line x1="0" y1="36" x2="360" y2="36" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" className="text-amber/40" />
                    <line x1="280" y1="0" x2="280" y2="180" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" className="text-amber/40" />
                    <circle cx="280" cy="36" r="3" className="fill-amber/80" />
                  </svg>
                </div>

                {/* Scroll & Hover Ambient Warm Gold Gradient Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: i * 0.06 }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/22 via-amber-400/15 to-amber-300/18 dark:from-accent/35 dark:via-amber/22 transition-opacity duration-500 group-hover:!opacity-100 group-active:!opacity-100"
                  aria-hidden
                />

                <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                  <span className={`font-sans text-xs uppercase tracking-wider ${card.featured ? "text-amber-950 dark:text-amber bg-amber-400/35 dark:bg-amber/20 px-3 py-1 rounded-full border border-amber-500/50 dark:border-amber/60 font-extrabold shadow-sm" : "text-amber-900 dark:text-amber bg-amber-500/10 dark:bg-amber/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 dark:border-amber/30 font-bold"}`}>
                    0{i + 1} · {card.highlight}
                  </span>
                </div>

                <p
                  className={`mt-3 font-display font-bold tracking-tight relative z-10 transition-colors duration-300 ${card.featured
                      ? "italic text-amber-950 dark:text-amber text-2xl sm:text-3xl font-black drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]"
                      : "text-xl text-ink dark:text-white group-hover:text-amber-900 dark:group-hover:text-amber sm:text-2xl"
                    }`}
                >
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-sm sm:text-base leading-relaxed text-body dark:text-slate-300 font-medium">
            <p className="text-base sm:text-lg text-ink/90 dark:text-slate-100 font-semibold">
              Every partner is optimizing their own work. Very few are optimizing your business.
            </p>
            <p className="text-body dark:text-slate-400">
              ScaleXpertz brings strategy, branding, websites, marketing, AI and execution under one strategy, so every decision moves your business in the same direction.
            </p>
          </div>

          {/* Priority Pills Badge Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {priorities.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/15 bg-surface/80 dark:bg-white/[0.04] px-3.5 py-1.5 text-xs font-mono font-medium text-ink dark:text-slate-300 shadow-sm backdrop-blur-sm"
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </span>
            ))}
          </div>

          <div className="mt-4 border-l-3 border-amber pl-5 py-2 text-left bg-amber/5 rounded-r-2xl">
            <p className="font-display text-base font-bold tracking-tight text-ink dark:text-white sm:text-lg">
              One strategy. One team. One direction.
            </p>
            <p className="text-xs text-body dark:text-slate-400 mt-0.5 font-mono">
              Complete accountability for your growth outcome.
            </p>
          </div>
        </div>

        {/* Right Column: Intro Video */}
        <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-28">
          <div className="relative group w-full">
            <div className="absolute -inset-1.5 rounded-[32px] bg-gradient-to-r from-accent via-amber to-accent opacity-25 blur-xl transition duration-500 group-hover:opacity-60" />
            <IntroVideo />
          </div>
        </div>
      </div>
    </section>
  );
}
