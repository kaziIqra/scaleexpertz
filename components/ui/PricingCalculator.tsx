"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export interface PricingAddon {
  id: string;
  label: string;
  price: number;
  unit?: string;
}

export interface SprintData {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  basePrice: number;
  duration: string;
  tagline: string;
  builtFor: string[];
  whyBuilt: string;
  pillars: { title: string; desc: string }[];
  advantages: string[];
  deliverables: string[];
  features: string[];
  addons: PricingAddon[];
  milestones: { percent: string; stage: string; desc: string }[];
  commitment: string;
}

interface PricingCalculatorProps {
  sprints: SprintData[];
  activeSprint: SprintData;
  onSelectSprint: (sprint: SprintData) => void;
}

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatAddonPrice(addon: PricingAddon) {
  const prefix = `+${formatINR(addon.price)}`;
  return addon.unit ? `${prefix}${addon.unit}` : prefix;
}

export default function PricingCalculator({
  sprints,
  activeSprint,
  onSelectSprint,
}: PricingCalculatorProps) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  useEffect(() => {
    setSelectedAddons([]);
  }, [activeSprint.id]);

  const total = useMemo(() => {
    const addonsTotal = activeSprint.addons
      .filter((a) => selectedAddons.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return activeSprint.basePrice + addonsTotal;
  }, [activeSprint, selectedAddons]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-card dark:border-white/10 dark:bg-[#141419]">
      {/* Category tabs */}
      <div className="border-b border-black/[0.06] bg-paper/80 px-3 pt-3 dark:border-white/10 dark:bg-[#1a1a22]/80 sm:px-5">
        <div className="flex items-center gap-1 overflow-x-auto pb-3 scrollbar-none">
          {sprints.map((s) => {
            const active = s.id === activeSprint.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSprint(s)}
                className={`shrink-0 rounded-full px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-300 sm:px-5 sm:text-xs ${
                  active
                    ? "bg-white text-ink shadow-card dark:bg-[#23232e] dark:text-white"
                    : "text-ink/50 hover:text-ink dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {s.title.replace("™", "")}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
        {/* Left: options */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <h3
              id="pricing-calculator-title"
              className="font-display text-xl font-bold uppercase tracking-tight text-ink dark:text-white sm:text-2xl"
            >
              {activeSprint.title.replace("™", "")}
            </h3>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.04] px-3 py-1 font-mono text-[11px] font-semibold text-ink/70 dark:bg-white/10 dark:text-slate-300">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {activeSprint.duration}
            </span>
          </div>

          <p className="mt-2 max-w-xl text-sm text-body dark:text-slate-300">
            {activeSprint.subtitle}
          </p>

          <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45 dark:text-slate-500">
            Optional add-ons
          </p>
          <div className="mt-3 rounded-3xl border border-white/10 bg-ink p-3 dark:bg-black sm:p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {activeSprint.addons.map((addon) => {
                const selected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex min-h-[3.5rem] items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${
                      selected
                        ? "border-accent bg-accent/15 shadow-sm"
                        : "border-accent/30 bg-white/[0.06] hover:border-accent/50 hover:bg-white/[0.1]"
                    }`}
                  >
                    <span className="min-w-0 font-display text-sm font-semibold leading-snug text-white">
                      {addon.label}
                    </span>
                    <span
                      className={`shrink-0 font-mono text-[11px] font-bold ${
                        selected ? "text-amber" : "text-accent"
                      }`}
                    >
                      {formatAddonPrice(addon)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="mt-8 space-y-2.5">
            {activeSprint.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm font-medium text-ink dark:text-slate-200"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent dark:bg-accent/20 dark:text-amber">
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path
                      d="M2.5 6.2 4.8 8.5 9.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: live total + CTAs */}
        <div className="lg:col-span-5">
          <div className="rounded-[24px] border border-accent/35 bg-gradient-to-br from-accent/25 via-amber/10 to-accent/5 p-6 shadow-[0_0_0_1px_rgba(212,175,55,0.08)] dark:border-accent/40 dark:from-[#1c1810] dark:via-[#16140f] dark:to-[#12110e] dark:shadow-[0_12px_40px_rgba(212,175,55,0.12)] sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent/80 dark:text-amber/75">
                ScaleXpertz
              </p>
              <span className="font-display text-lg font-black text-accent dark:text-amber">
                SX
              </span>
            </div>
            <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent/70 dark:text-amber/60">
              Design + Development
            </p>
            <p className="mt-2 font-display text-4xl font-black tracking-tight text-ink dark:text-amber sm:text-5xl sm:leading-none">
              {formatINR(total)}
            </p>
            <p className="mt-2 text-xs text-ink/55 dark:text-amber/45">
              Base {formatINR(activeSprint.basePrice)}
              {selectedAddons.length > 0
                ? ` + ${selectedAddons.length} add-on${selectedAddons.length > 1 ? "s" : ""}`
                : " · starting estimate"}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <a
              href="mailto:scalexpertz@gmail.com"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-accent hover:text-ink dark:bg-white dark:text-black dark:hover:bg-amber"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M2 8.5 13.5 3l-3.2 10.2L8 9.5 2 8.5Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              Send a Message
            </a>
            <Link
              href="/diagnosis"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-black/[0.12] bg-white px-6 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:border-accent hover:text-accent dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:border-accent dark:hover:text-amber"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                <rect x="2.5" y="4" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              Book a Call
            </Link>
          </div>

          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-wider text-ink/40 dark:text-slate-500">
            Final scope confirmed after diagnosis
          </p>
        </div>
      </div>
    </div>
  );
}
