"use client";

import { useState } from "react";

const CALENDLY_URL = "https://calendly.com/anshnbdc18/founder-growth-diagnosis";

const inputClass =
  "w-full rounded-xl border border-black/[0.08] dark:border-white/12 bg-white dark:bg-[#181820] px-4 py-3 text-sm text-ink dark:text-white shadow-card outline-none transition-colors duration-300 placeholder:text-ink/30 dark:placeholder:text-slate-500 focus:border-accent dark:focus:border-amber";

export default function DiagnosisForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.open(CALENDLY_URL, "_blank");
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#141419] p-8 sm:p-10 text-center shadow-card text-ink dark:text-white">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent dark:text-amber">
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
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-extrabold text-ink shadow-lg shadow-accent/25 transition-transform hover:scale-105 dark:bg-amber dark:text-black"
          >
            Open Calendly Calendar &rarr;
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5 rounded-3xl border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#141419] p-6 shadow-card sm:p-8"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 dark:text-slate-400 font-bold">
            Full name *
          </span>
          <input required name="name" placeholder="Your name" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 dark:text-slate-400 font-bold">
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

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 dark:text-slate-400 font-bold">
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
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 dark:text-slate-400 font-bold">
            Company (optional)
          </span>
          <input
            name="company"
            placeholder="Company or website"
            className={inputClass}
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 dark:text-slate-400 font-bold">
          Goals / growth bottleneck
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="What is the biggest challenge holding back your growth right now?"
          className={`${inputClass} resize-y`}
        />
      </label>

      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-strong dark:from-amber dark:to-accent px-8 py-4 text-sm font-extrabold text-ink shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/40 active:scale-95 sm:w-auto sm:self-start"
      >
        <span>Book Your Founder Growth Diagnosis</span>
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/50 dark:text-slate-400 font-medium">
        No sales pitch. 100% confidential. 45 minutes · ₹0
      </p>
    </form>
  );
}
