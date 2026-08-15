"use client";

import { useState } from "react";

const ROLES = [
  "Senior Next.js Engineer",
  "Product Designer",
  "Growth Marketer",
  "Finance Analyst",
  "AI Engineer",
  "Other / open application",
];

const inputClass =
  "w-full rounded-xl border border-black/[0.08] bg-surface px-4 py-3 text-sm text-ink shadow-card outline-none transition-colors duration-300 placeholder:text-ink/30 focus:border-accent";

export default function ApplyForm({ initialRole }: { initialRole?: string }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-3xl border border-black/[0.06] bg-surface p-10 text-center shadow-card">
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
          Application received.
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-body">
          Thanks for applying — we read every application ourselves and reply
          within a week, whichever way it goes.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
            Full name
          </span>
          <input required name="name" placeholder="Your name" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
            Email
          </span>
          <input
            required
            type="email"
            name="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
            Role
          </span>
          <select
            name="role"
            defaultValue={ROLES.includes(initialRole ?? "") ? initialRole : ROLES[5]}
            className={inputClass}
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
            Portfolio / LinkedIn / GitHub
          </span>
          <input
            type="url"
            name="portfolio"
            placeholder="https://…"
            className={inputClass}
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
          Why you? (short and honest beats long and polished)
        </span>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Tell us about the best thing you've shipped…"
          className={`${inputClass} resize-y`}
        />
      </label>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center self-start rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-accent-strong"
      >
        Submit application
      </button>
    </form>
  );
}
