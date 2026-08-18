"use client";

import Image from "next/image";
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

function formatAddonPrice(_addon: PricingAddon) {
  return "Included (₹0)";
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
    return activeSprint.basePrice;
  }, [activeSprint]);

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
                    ? "bg-accent text-ink font-extrabold shadow-md dark:bg-amber dark:text-black"
                    : "text-ink/60 hover:text-ink dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {s.title.replace("™", "")}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
        {/* Right on desktop, TOP on mobile: live total + CTAs */}
        <div className="order-1 lg:order-2 lg:col-span-5">
          <div className="rounded-[24px] border border-accent/35 bg-gradient-to-br from-accent/25 via-amber/10 to-accent/5 p-6 shadow-[0_0_0_1px_rgba(212,175,55,0.08)] dark:border-accent/40 dark:from-[#1c1810] dark:via-[#16140f] dark:to-[#12110e] dark:shadow-[0_12px_40px_rgba(212,175,55,0.12)] sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent/80 dark:text-amber/75">
                ScaleXpertz
              </p>
              {/* Logo icon instead of SX text */}
              <Image
                src="/logo-mark.png"
                alt="ScaleXpertz Logo"
                width={36}
                height={28}
                priority
                className="h-7 w-auto object-contain"
              />
            </div>
            <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent/70 dark:text-amber/60">
              Total Growth Investment
            </p>
            <p className="mt-2 font-display text-4xl font-black tracking-tight text-ink dark:text-amber sm:text-5xl sm:leading-none">
              {formatINR(total)}
            </p>
            <p className="mt-2 text-xs text-ink/65 dark:text-amber/60 font-medium">
              Fixed Sprint Investment · All Add-ons Included at ₹0
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

          {/* Described & readable Diagnosis Scope callout box */}
          <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/5 p-4 text-center dark:border-amber/30 dark:bg-amber/5">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent dark:text-amber">
              ✦ Final Scope Confirmed After Diagnosis
            </p>
            <p className="mt-1 text-xs leading-relaxed text-body dark:text-slate-300 font-medium">
              Your exact sprint roadmap, team allocation, and deliverables are custom confirmed during your 45-minute Founder Growth Diagnosis session based on your business objectives.
            </p>
          </div>
        </div>

        {/* Left on desktop, BOTTOM on mobile: sprint details & add-ons */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <h3
              id="pricing-calculator-title"
              className="font-display text-xl font-bold uppercase tracking-tight text-ink dark:text-white sm:text-2xl"
            >
              {activeSprint.title.replace("™", "")}
            </h3>
            
            {/* Highlighted 90 Days badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent/25 to-amber/25 border border-accent/40 px-3.5 py-1 font-mono text-xs font-extrabold text-accent dark:text-amber shadow-sm">
              <svg className="h-3.5 w-3.5 text-amber" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              {activeSprint.duration}
            </span>
          </div>

          <p className="mt-2 max-w-xl text-sm text-body dark:text-slate-300 font-medium">
            {activeSprint.subtitle}
          </p>

          <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50 dark:text-slate-400">
            Optional add-ons (All Included at ₹0)
          </p>
          <div className="mt-3 rounded-3xl border border-black/10 dark:border-white/10 bg-ink p-3 dark:bg-black sm:p-4">
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
                        ? "border-accent bg-accent/20 shadow-sm"
                        : "border-accent/30 bg-white/[0.06] hover:border-accent/50 hover:bg-white/[0.1]"
                    }`}
                  >
                    <span className="min-w-0 font-display text-sm font-semibold leading-snug text-white">
                      {addon.label}
                    </span>
                    <span
                      className={`shrink-0 font-mono text-[11px] font-extrabold ${
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
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent dark:bg-accent/20 dark:text-amber font-bold">
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
