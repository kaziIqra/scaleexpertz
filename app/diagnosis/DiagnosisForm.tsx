"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/anshnbdc18/founder-growth-diagnosis";

const inputClass =
  "w-full rounded-xl border border-black/[0.08] dark:border-white/12 bg-white/80 dark:bg-[#181822]/90 px-4 py-3 text-sm text-ink dark:text-white shadow-sm outline-none transition-all duration-300 placeholder:text-ink/30 dark:placeholder:text-slate-500 focus:border-pink-500/60 dark:focus:border-pink-400/60 focus:ring-1 focus:ring-pink-500/30";

export default function DiagnosisForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.open(CALENDLY_URL, "_blank");
  };

  if (submitted) {
    return (
      <div className="group/card relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-b from-pink-400/35 via-rose-400/30 to-amber-400/25 shadow-[0_0_25px_rgba(244,114,182,0.15)] transition-all duration-500 hover:shadow-[0_0_35px_rgba(244,114,182,0.25)]">
        <div className="relative rounded-[22.5px] bg-white/95 dark:bg-gradient-to-b dark:from-[#1d1a24]/95 dark:via-[#16141e]/95 dark:to-[#121018]/95 p-8 sm:p-10 text-center backdrop-blur-xl text-ink dark:text-white">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-500/15 text-pink-400">
            <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
              <path
                d="m5 12.5 4.5 4.5L19 7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className="mt-6 font-display text-2xl font-bold tracking-tight">
            Opening Calendar & Diagnosis requested!
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-body dark:text-slate-300 font-medium">
            We&apos;ve opened Calendly to select your slot. If the page didn&apos;t open automatically, click the button below:
          </p>
          <div className="mt-6">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent via-amber via-50% to-pink-500/90 bg-[length:200%_auto] px-8 py-3.5 text-sm font-extrabold text-ink shadow-lg shadow-accent/25 transition-all duration-500 hover:bg-[position:right_center] hover:scale-105 hover:shadow-xl hover:shadow-pink-500/40 active:scale-95"
            >
              Open Calendly Calendar &rarr;
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group/card relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-b from-pink-400/35 via-rose-400/30 to-amber-400/25 shadow-[0_0_25px_rgba(244,114,182,0.15)] transition-all duration-500 hover:shadow-[0_0_35px_rgba(244,114,182,0.25)] hover:from-pink-400/50 hover:via-rose-400/45 hover:to-amber-400/40">
      {/* Light Sweep Overlay */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        whileInView={{ x: ["-100%", "120%"], opacity: [0, 0.5, 0] }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-pink-400/20 via-rose-400/15 to-transparent -skew-x-12"
        aria-hidden
      />

      {/* Interior Container */}
      <form
        className="relative flex w-full flex-col gap-5 rounded-[22.5px] bg-white/95 dark:bg-gradient-to-b dark:from-[#1d1a24]/95 dark:via-[#16141e]/95 dark:to-[#121018]/95 p-6 sm:p-8 backdrop-blur-xl"
        onSubmit={handleSubmit}
      >
        {/* Soft Ambient Glows */}
        <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-pink-500/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 dark:text-pink-300/80 font-bold">
              Full name *
            </span>
            <input required name="name" placeholder="Your name" className={inputClass} />
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 dark:text-pink-300/80 font-bold">
              Work email *
            </span>
            <input
              required
              type="email"
              name="email"
              placeholder="you@company.com"
              className={inputClass}
            />
          </label>
        </div>

        <div className="relative z-10 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 dark:text-pink-300/80 font-bold">
              Phone *
            </span>
            <input
              required
              type="tel"
              name="phone"
              placeholder="+91 …"
              className={inputClass}
            />
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 dark:text-pink-300/80 font-bold">
              Company (optional)
            </span>
            <input
              name="company"
              placeholder="Company or website"
              className={inputClass}
            />
          </label>
        </div>

        <label className="relative z-10 grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 dark:text-pink-300/80 font-bold">
            Goals / growth bottleneck
          </span>
          <textarea
            name="message"
            rows={4}
            placeholder="What is the biggest challenge holding back your growth right now?"
            className={`${inputClass} resize-y`}
          />
        </label>

        <div className="relative z-10 mt-2 flex flex-col items-center justify-center gap-3 text-center">
          <button
            type="submit"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-accent via-amber via-50% to-pink-500/90 bg-[length:200%_auto] px-8 py-4 text-sm font-extrabold text-ink shadow-lg shadow-accent/25 transition-all duration-500 hover:bg-[position:right_center] hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/40 active:scale-95 cursor-pointer"
          >
            <span>Book Your Founder Growth Diagnosis</span>
            <svg className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/60 dark:text-slate-400 font-medium">
            No sales pitch. 100% confidential. 45 minutes · ₹0
          </p>
        </div>
      </form>
    </div>
  );
}
