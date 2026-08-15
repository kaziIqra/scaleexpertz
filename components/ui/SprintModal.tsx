"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import { EASE_OUT_EXPO } from "@/lib/animations";

export interface SprintData {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  tagline: string;
  builtFor: string[];
  whyBuilt: string;
  pillars: { title: string; desc: string }[];
  advantages: string[];
  deliverables: string[];
  milestones: { percent: string; stage: string; desc: string }[];
  commitment: string;
}

interface SprintModalProps {
  sprint: SprintData | null;
  onClose: () => void;
}

export default function SprintModal({ sprint, onClose }: SprintModalProps) {
  const lenis = useLenis();

  // Scroll Lock & Lenis Pause handling when modal opens
  useEffect(() => {
    if (sprint) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [sprint, lenis]);

  if (!sprint) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-[150] overflow-y-auto p-4 sm:p-6 md:p-10"
      >
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Centered Scrollable Container */}
        <div className="relative flex min-h-full items-center justify-center py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="relative z-10 my-auto w-full max-w-4xl rounded-3xl border border-black/10 dark:border-white/15 bg-surface dark:bg-[#141419] p-6 sm:p-10 shadow-2xl text-ink dark:text-white"
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 bg-paper dark:bg-[#1f1f28] text-ink dark:text-white transition-colors duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              ✕
            </button>

            {/* Header Badges & Title */}
            <div className="flex flex-wrap items-center gap-3 pr-12">
              <span className="rounded-full bg-accent/10 dark:bg-accent/20 px-3.5 py-1 font-mono text-xs font-semibold text-accent dark:text-indigo-400">
                {sprint.duration} Engagement
              </span>
              <span className="rounded-full bg-amber/10 px-3.5 py-1 font-mono text-xs font-semibold text-amber">
                Starting From {sprint.price}
              </span>
            </div>

            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl">
              {sprint.title}
            </h2>
            <p className="mt-2 font-display text-base font-semibold text-accent dark:text-indigo-400 italic sm:text-lg">
              &ldquo;{sprint.tagline}&rdquo;
            </p>

            {/* Built For Section */}
            <div className="mt-8 rounded-2xl border border-black/[0.08] dark:border-white/10 bg-paper dark:bg-white/[0.03] p-5 sm:p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-amber font-semibold">
                Built For Businesses Ready to Scale:
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {sprint.builtFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-black/[0.06] dark:border-white/10 bg-surface dark:bg-[#1f1f28] px-3 py-1.5 text-xs font-medium text-ink dark:text-white"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Why We Built This */}
            <div className="mt-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent dark:text-indigo-400 font-semibold">
                Why We Built This Growth Sprint™
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body dark:text-slate-300 font-medium">
                {sprint.whyBuilt}
              </p>
            </div>

            {/* 6 Strategic Infrastructure Pillars */}
            <div className="mt-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-amber font-semibold">
                6 Core Infrastructure Pillars Included:
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sprint.pillars.map((p, i) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-[#1c1c24] p-4"
                  >
                    <span className="font-mono text-[10px] text-amber font-bold">0{i + 1}</span>
                    <h4 className="mt-1 font-display text-base font-semibold text-ink dark:text-white">
                      {p.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-body dark:text-slate-400">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ScaleXpertz Advantages */}
            <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 dark:bg-accent/10 p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent dark:text-indigo-400 font-bold">
                Exclusive ScaleXpertz Advantages™ Included:
              </h3>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {sprint.advantages.map((adv) => (
                  <div key={adv} className="flex items-center gap-2 text-xs font-semibold text-ink dark:text-white">
                    <span className="text-amber">✦</span>
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestone Payment Structure */}
            <div className="mt-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-amber font-semibold">
                Transparent Milestone Investment Terms:
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {sprint.milestones.map((m) => (
                  <div
                    key={m.percent}
                    className="rounded-2xl border border-black/[0.08] dark:border-white/10 bg-paper dark:bg-white/[0.03] p-4 text-center"
                  >
                    <span className="font-display text-3xl font-extrabold text-accent dark:text-indigo-400">
                      {m.percent}
                    </span>
                    <h4 className="mt-1 font-display text-sm font-bold text-ink dark:text-white">
                      {m.stage}
                    </h4>
                    <p className="mt-1 font-mono text-[10px] text-body dark:text-slate-400">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Commitment Guarantee */}
            <div className="mt-8 rounded-2xl border border-amber/40 bg-amber/10 p-5 text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-amber font-bold block mb-1">
                🛡️ ScaleXpertz Execution Commitment™
              </span>
              <p className="text-xs sm:text-sm text-ink dark:text-slate-200 font-medium leading-relaxed">
                {sprint.commitment}
              </p>
            </div>

            {/* Footer CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] dark:border-white/10 pt-6">
              <a
                href="#diagnosis"
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.querySelector("#diagnosis")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent via-indigo-600 to-accent px-8 py-3.5 font-display text-sm font-bold text-white shadow-xl shadow-accent/25 transition-all duration-300 hover:scale-105"
              >
                Book Founder Diagnosis →
              </a>

              <button
                onClick={onClose}
                className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/60 dark:text-slate-400 hover:text-ink dark:hover:text-white"
              >
                Close Blueprint
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
