"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import { EASE_OUT_EXPO } from "@/lib/animations";

export default function PlaybookBanner() {
  const [modalOpen, setModalOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-surface to-amber/10 dark:from-[#181828] dark:via-[#141419] dark:to-[#1a1810] p-8 md:p-12 shadow-card">
        {/* Background glow Orbs */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-amber/20 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8 text-center lg:text-left">
            <Eyebrow index="06" label="The ScaleXpertz Growth Playbook™" />
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink dark:text-white sm:text-3xl md:text-4xl leading-tight">
              The Operating System Behind <span className="text-amber">Sustainable Growth.</span>
            </h2>
            <p className="mt-3 mx-auto text-sm sm:text-base leading-relaxed text-body dark:text-slate-300 font-medium max-w-2xl lg:mx-0">
              Want to see our full methodology, 90-Day Growth Sprint™ breakdown, and execution framework before making a decision? Download the 15-page ScaleXpertz Growth Playbook™.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-ink dark:text-white lg:justify-start">
              <span className="flex items-center gap-1.5"><span className="text-amber">✓</span> 15-Page Strategy Guide</span>
              <span className="flex items-center gap-1.5"><span className="text-amber">✓</span> Coordination Chaos™ Fix</span>
              <span className="flex items-center gap-1.5"><span className="text-amber">✓</span> 90-Day Sprint Roadmap</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center lg:items-end lg:text-right">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-display text-sm font-bold text-ink shadow-xl shadow-accent/25 transition-all duration-300 hover:scale-105 hover:bg-accent-strong"
            >
              📖 Download Growth Playbook™
            </button>
            <span className="mt-2 text-xs text-ink/50 dark:text-slate-400 font-mono">
              Free PDF download • Instant access
            </span>
          </div>
        </div>
      </div>

      {/* Playbook Download Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="relative z-10 w-full max-w-lg rounded-3xl border border-black/10 dark:border-white/15 bg-surface dark:bg-[#141419] p-6 sm:p-8 shadow-2xl text-ink dark:text-white"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/15 bg-paper dark:bg-[#1f1f28] text-xs"
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDownloaded(true);
                  }}
                  className="mt-6 space-y-4"
                >
                  <label className="block text-xs font-mono text-ink/60 dark:text-slate-400 uppercase tracking-wider">
                    Work Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-paper dark:bg-[#1c1c24] px-4 py-3 text-sm text-ink dark:text-white outline-none focus:border-accent"
                  />

                  <button
                    type="submit"
                    className="w-full rounded-full bg-accent py-3.5 font-display text-sm font-bold text-ink shadow-lg transition-transform hover:scale-105"
                  >
                    Download Playbook PDF →
                  </button>
                </form>
              ) : (
                <div className="mt-6 text-center py-4 space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-xl">
                    ✓
                  </div>
                  <h4 className="font-display text-lg font-bold">Playbook Ready!</h4>
                  <p className="text-xs text-body dark:text-slate-300">
                    Click below to open or download your official copy of The ScaleXpertz Growth Playbook™.
                  </p>
                  <a
                    href="/ScaleXpertz_Growth_Playbook.pdf"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full rounded-full bg-amber py-3.5 font-display text-sm font-bold text-black shadow-lg hover:scale-105 transition-transform"
                  >
                    Open Official Playbook PDF →
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
