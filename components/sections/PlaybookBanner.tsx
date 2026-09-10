"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

export default function PlaybookBanner() {
  const [modalOpen, setModalOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [email, setEmail] = useState("");

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "/ScaleXpertz_Growth_Playbook.pdf";
    link.download = "ScaleXpertz_Growth_Playbook.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
    triggerDownload();
  };

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-3xl border border-black/10 dark:border-accent/30 bg-surface dark:bg-gradient-to-br dark:from-[#181828] dark:via-[#141419] dark:to-[#1a1810] p-8 md:p-12 shadow-card transition-all duration-300 hover:border-slate-800/40 dark:hover:border-accent/60 hover:shadow-2xl hover:-translate-y-1 transform-gpu"
      >
        {/* Scroll Shimmer Light Sweep */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          whileInView={{ x: ["-100%", "120%"], opacity: [0, 0.7, 0] }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 0.1 }}
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-amber-400/30 via-amber-500/20 dark:via-accent/30 dark:via-amber/20 to-transparent -skew-x-12 will-change-transform transform-gpu"
          aria-hidden
        />

        {/* Background glow Orbs */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-slate-900/10 dark:bg-accent/20 blur-3xl transition-transform duration-500 will-change-transform transform-gpu group-hover:scale-125 dark:group-hover:bg-accent/30" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-slate-800/10 dark:bg-amber/20 blur-3xl transition-transform duration-500 will-change-transform transform-gpu group-hover:scale-125 dark:group-hover:bg-amber/30" />

        <div className="relative z-10 mx-auto max-w-3xl text-center flex flex-col items-center justify-center space-y-6">
          {/* 1. Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-amber/35 bg-black/5 dark:bg-amber/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-ink dark:text-amber shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent dark:bg-amber animate-pulse" />
            The ScaleXpertz Growth Playbook™
          </div>

          {/* 2. Heading */}
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-ink dark:text-white leading-tight">
            The Operating System Behind{" "}
            <span className="text-accent dark:text-amber">Sustainable Growth.</span>
          </h3>

          {/* 3. Description paragraph */}
          <p className="text-sm sm:text-base leading-relaxed text-body dark:text-slate-300 font-medium max-w-2xl">
            Want to see our full methodology, 90-Day Growth Sprint™ breakdown, and execution framework before making a decision? Download the ScaleXpertz Growth Playbook™.
          </p>

          {/* 4. Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-ink dark:text-white">
            <span className="group/pill inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/12 bg-surface/80 dark:bg-white/[0.04] px-4 py-2 text-xs font-semibold text-ink dark:text-white transition-all duration-300 hover:border-slate-800/40 dark:hover:border-amber/50 hover:bg-slate-900/10 dark:hover:bg-amber/15 hover:scale-105 shadow-sm">
              <span className="text-accent dark:text-amber font-extrabold transition-transform duration-300 group-hover/pill:scale-125">✓</span> Growth Strategy Guide
            </span>
            <span className="group/pill inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/12 bg-surface/80 dark:bg-white/[0.04] px-4 py-2 text-xs font-semibold text-ink dark:text-white transition-all duration-300 hover:border-slate-800/40 dark:hover:border-amber/50 hover:bg-slate-900/10 dark:hover:bg-amber/15 hover:scale-105 shadow-sm">
              <span className="text-accent dark:text-amber font-extrabold transition-transform duration-300 group-hover/pill:scale-125">✓</span> Coordination Chaos™ Fix
            </span>
            <span className="group/pill inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/12 bg-surface/80 dark:bg-white/[0.04] px-4 py-2 text-xs font-semibold text-ink dark:text-white transition-all duration-300 hover:border-slate-800/40 dark:hover:border-amber/50 hover:bg-slate-900/10 dark:hover:bg-amber/15 hover:scale-105 shadow-sm">
              <span className="text-accent dark:text-amber font-extrabold transition-transform duration-300 group-hover/pill:scale-125">✓</span> 90-Day Sprint Roadmap
            </span>
          </div>

          {/* 5. Button directly below */}
          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-accent via-amber to-accent bg-[length:200%_auto] px-8 py-4 font-display text-sm font-extrabold text-ink shadow-xl shadow-accent/25 transition-all duration-300 hover:bg-[position:right_center] hover:scale-105 hover:shadow-2xl hover:shadow-accent/40 active:scale-95 group/btn cursor-pointer transform-gpu"
            >
              <span className="transition-transform duration-300 group-hover/btn:-rotate-12 group-hover/btn:scale-110">📖</span>
              <span>Download Growth Playbook™</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Playbook Download Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm transform-gpu"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
              className="relative z-10 w-full max-w-lg rounded-3xl border border-black/10 dark:border-white/15 bg-surface dark:bg-[#141419] p-6 sm:p-8 shadow-2xl text-ink dark:text-white transform-gpu"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/15 bg-paper dark:bg-[#1f1f28] text-xs hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber">
                ScaleXpertz Growth Playbook™
              </span>

              <h3 className="mt-2 font-display text-2xl font-bold">
                Get Instant Access To The Playbook
              </h3>

              {!downloaded ? (
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                >
                  <label className="block text-xs font-mono text-ink/60 dark:text-slate-400 uppercase tracking-wider">
                    Work Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-paper dark:bg-[#1c1c24] px-4 py-3 text-sm text-ink dark:text-white outline-none focus:border-accent transition-colors"
                  />

                  <button
                    type="submit"
                    className="w-full rounded-full bg-accent py-3.5 font-display text-sm font-bold text-ink shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    Download Playbook PDF →
                  </button>
                </form>
              ) : (
                <div className="mt-6 text-center py-4 space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-xl">
                    ✓
                  </div>
                  <h4 className="font-display text-lg font-bold">Download Started!</h4>
                  <p className="text-xs text-body dark:text-slate-300">
                    Your official copy of The ScaleXpertz Growth Playbook™ should begin downloading automatically.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={triggerDownload}
                      className="flex-1 rounded-full bg-amber py-3 font-display text-xs sm:text-sm font-bold text-black shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
                    >
                      Download Again 📥
                    </button>
                    <a
                      href="/ScaleXpertz_Growth_Playbook.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-full border border-black/15 dark:border-white/20 bg-paper dark:bg-[#1f1f28] py-3 font-display text-xs sm:text-sm font-bold text-ink dark:text-white shadow-md hover:bg-black/5 dark:hover:bg-white/5 transition-all text-center inline-flex items-center justify-center"
                    >
                      Open in New Tab ↗
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
