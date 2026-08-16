"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-sm text-ink shadow-card outline-none transition-colors duration-300 placeholder:text-ink/30 focus:border-accent";

export default function DiagnosisForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-3xl border border-black/[0.06] bg-white p-10 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
            <path
              d="m5 12.5 4.5 4.5L19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
          Diagnosis requested.
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-body">
          We&apos;ve received your details. Our strategy team will contact you
          within 24 hours to confirm your 45-minute calendar slot.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-card sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
            Full name *
          </span>
          <input required name="name" placeholder="Your name" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
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
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
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
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
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
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
          Goals / growth bottleneck
        </span>
        <textarea
          name="message"
          rows={5}
          placeholder="What is the biggest challenge holding back your growth right now?"
          className={`${inputClass} resize-y`}
        />
      </label>

      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-strong px-8 py-3.5 text-sm font-bold text-ink shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/40 active:scale-95 sm:w-auto sm:self-start"
      >
        Book Your Founder Growth Diagnosis
      </button>

      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
        No sales pitch. 100% confidential. 45 minutes · ₹0
      </p>
    </form>
  );
}
