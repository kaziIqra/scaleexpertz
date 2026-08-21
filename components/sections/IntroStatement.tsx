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
                className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${card.featured
                    ? "sm:col-span-2 border-black/15 bg-gradient-to-r from-slate-900/[0.05] via-slate-800/[0.03] to-transparent dark:border-amber/40 dark:from-accent/15 dark:via-amber/10 hover:border-slate-800/40 dark:hover:border-amber/60 hover:shadow-slate-900/10"
                    : "border-black/[0.08] dark:border-white/12 bg-surface dark:bg-[#141419] hover:border-slate-800/40 dark:hover:border-amber/50"
                  }`}
              >
                {/* Scroll Shimmer Light Sweep */}
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  whileInView={{ x: ["-100%", "120%"], opacity: [0, 0.6, 0] }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: i * 0.1 }}
                  className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-slate-800/15 via-slate-900/10 dark:via-amber/20 to-transparent -skew-x-12"
                  aria-hidden
                />

                {/* Scroll & Hover Ambient Gradient */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.5 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, delay: i * 0.06 }}
                  className="absolute inset-0 bg-gradient-to-br from-slate-900/[0.06] via-indigo-950/[0.04] to-transparent dark:from-accent/20 dark:via-amber/12 transition-opacity duration-500 group-hover:!opacity-100 pointer-events-none"
                  aria-hidden
                />

                <span className="font-sans text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-amber relative z-10">
                  0{i + 1} · {card.highlight}
                </span>
                <p
                  className={`mt-2 font-display text-xl font-bold tracking-tight text-ink dark:text-white group-hover:text-slate-950 dark:group-hover:text-amber transition-colors relative z-10 ${card.isItalic ? "italic text-slate-950 dark:text-amber text-2xl sm:text-3xl" : "sm:text-2xl"
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
