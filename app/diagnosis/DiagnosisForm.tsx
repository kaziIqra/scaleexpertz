"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LuCheck, LuLoader } from "react-icons/lu";

const CALENDLY_URL = "https://calendly.com/anshnbdc18/founder-growth-diagnosis";

const inputClass =
  "w-full rounded-xl border border-black/[0.08] dark:border-white/12 bg-white/80 dark:bg-[#181822]/90 px-4 py-3 text-sm text-ink dark:text-white shadow-sm outline-none transition-all duration-300 placeholder:text-ink/30 dark:placeholder:text-slate-500 focus:border-pink-500/60 dark:focus:border-pink-400/60 focus:ring-2 focus:ring-pink-500/20";

const REVENUE_OPTIONS = [
  { id: "pre", label: "Pre-revenue", sub: "Launch / early stage", value: "Pre-revenue / Launch" },
  { id: "tier1", label: "< ₹5 Lakhs", sub: "< $6K / month", value: "< ₹5 Lakhs / mo (< $6K)" },
  { id: "tier2", label: "₹5L – ₹15L", sub: "$6K – $18K / month", value: "₹5L – ₹15 Lakhs / mo ($6K–$18K)" },
  { id: "tier3", label: "₹15L – ₹50L", sub: "$18K – $60K / month", value: "₹15L – ₹50 Lakhs / mo ($18K–$60K)" },
  { id: "tier4", label: "₹50L – ₹1.5 Cr", sub: "$60K – $180K / month", value: "₹50L – ₹1.5 Crore / mo ($60K–$180K)" },
  { id: "tier5", label: "₹1.5 Crore+", sub: "$180K+ / month", value: "₹1.5 Crore+ / mo ($180K+)" },
];

const TEAM_SIZE_OPTIONS = [
  { label: "Solo (1)", value: "Solo Founder (1)" },
  { label: "2 – 5", value: "2 – 5 people" },
  { label: "6 – 15", value: "6 – 15 people" },
  { label: "16 – 50", value: "16 – 50 people" },
  { label: "50+", value: "50+ people" },
];

export default function DiagnosisForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    website: "",
    revenue: "",
    teamSize: "",
    challenge: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectRevenue = (value: string) => {
    setFormData((prev) => ({ ...prev, revenue: value }));
    setValidationError(null);
  };

  const handleSelectTeamSize = (value: string) => {
    setFormData((prev) => ({ ...prev, teamSize: value }));
    setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.revenue) {
      setValidationError("Please select your monthly revenue range.");
      return;
    }
    if (!formData.teamSize) {
      setValidationError("Please select your team size.");
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    try {
      // 1. Store lead data in Supabase database via API
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          work_email: formData.email,
          email: formData.email,
          company_name: formData.company,
          website: formData.website,
          monthly_revenue_range: formData.revenue,
          team_size: formData.teamSize,
          biggest_challenge: formData.challenge,
          whatsapp_number: formData.whatsapp,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.warn("Lead storage notice:", errorData.error || "DB insert response issue");
      }
    } catch (err) {
      console.error("Failed to submit lead to database:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);

      // 2. Open Calendly with prefilled applicant parameters
      const params = new URLSearchParams();
      if (formData.name) params.append("name", formData.name);
      if (formData.email) params.append("email", formData.email);
      if (formData.whatsapp) params.append("a1", formData.whatsapp);

      const redirectUrl = `${CALENDLY_URL}${params.toString() ? `?${params.toString()}` : ""}`;
      window.open(redirectUrl, "_blank");
    }
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
            Details Saved &amp; Calendly Opening!
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-body dark:text-slate-300 font-medium">
            Your assessment details have been securely recorded. We&apos;ve opened Calendly to select your 45-minute slot. If it didn&apos;t open automatically, click below:
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
        className="relative flex w-full flex-col gap-4 sm:gap-5 rounded-[22.5px] bg-white/95 dark:bg-gradient-to-b dark:from-[#1d1a24]/95 dark:via-[#16141e]/95 dark:to-[#121018]/95 p-5 sm:p-7 md:p-8 backdrop-blur-xl"
        onSubmit={handleSubmit}
      >
        {/* Soft Ambient Glows */}
        <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-pink-500/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />

        {/* Row 1: Name & Company Name */}
        <div className="relative z-10 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-pink-300/90 font-bold">
              Your Name *
            </span>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              className={inputClass}
            />
          </label>
          <label className="grid gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-pink-300/90 font-bold">
              Company Name *
            </span>
            <input
              required
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Acme Innovations"
              className={inputClass}
            />
          </label>
        </div>

        {/* Row 2: Website & Work Email */}
        <div className="relative z-10 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-pink-300/90 font-bold">
              Website (Optional)
            </span>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://company.com"
              className={inputClass}
            />
          </label>
          <label className="grid gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-pink-300/90 font-bold">
              Work Email *
            </span>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@company.com"
              className={inputClass}
            />
          </label>
        </div>

        {/* Row 3: WhatsApp Number */}
        <div className="relative z-10 grid gap-1.5">
          <label className="grid gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-pink-300/90 font-bold">
              WhatsApp Number *
            </span>
            <input
              required
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+91 98765 43210 (with country code)"
              className={inputClass}
            />
          </label>
        </div>

        {/* Row 4: Team Size (Clean Clickable Pill Badges) */}
        <div className="relative z-10 grid gap-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-pink-300/90 font-bold">
              Team Size *
            </span>
            {formData.teamSize && (
              <span className="text-[11px] font-semibold text-pink-600 dark:text-pink-300">
                Selected: {formData.teamSize}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {TEAM_SIZE_OPTIONS.map((item) => {
              const isSelected = formData.teamSize === item.value;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSelectTeamSize(item.value)}
                  className={`relative flex items-center justify-center rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-amber-500/20 text-pink-600 dark:text-pink-300 border-2 border-pink-500 shadow-sm shadow-pink-500/20 scale-[1.02]"
                      : "border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.03] text-ink/80 dark:text-slate-300 hover:border-pink-400/40 hover:bg-pink-500/5 hover:text-ink dark:hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <LuCheck className="absolute left-2 text-pink-500 hidden sm:inline-block" size={13} />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 5: Monthly Revenue Range (Rich Selection Cards) */}
        <div className="relative z-10 grid gap-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-pink-300/90 font-bold">
              Monthly Revenue Range *
            </span>
            {formData.revenue && (
              <span className="text-[11px] font-semibold text-pink-600 dark:text-pink-300">
                Selected
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {REVENUE_OPTIONS.map((item) => {
              const isSelected = formData.revenue === item.value;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectRevenue(item.value)}
                  className={`group/rev relative flex flex-col items-start justify-center rounded-xl p-3 text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-br from-pink-500/15 via-rose-500/10 to-amber-500/15 text-pink-700 dark:text-pink-200 border-2 border-pink-500 shadow-sm shadow-pink-500/20 scale-[1.02]"
                      : "border border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.03] text-ink/80 dark:text-slate-300 hover:border-pink-400/40 hover:bg-pink-500/5"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-xs font-bold text-ink dark:text-white">
                      {item.label}
                    </span>
                    {isSelected && (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white text-[10px]">
                        <LuCheck size={10} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5 text-[10px] text-ink/50 dark:text-slate-400 font-medium">
                    {item.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 6: Biggest Challenge Right Now */}
        <label className="relative z-10 grid gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 dark:text-pink-300/90 font-bold">
            Biggest Challenge Right Now *
          </span>
          <textarea
            required
            name="challenge"
            rows={3}
            value={formData.challenge}
            onChange={handleChange}
            placeholder="What is the single biggest bottleneck holding back your growth right now? (e.g. founder dependency in sales, marketing inconsistency, tech scaling bottlenecks...)"
            className={`${inputClass} resize-y`}
          />
        </label>

        {/* Validation Warning Alert if skipped */}
        {validationError && (
          <div className="relative z-10 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2 animate-shake">
            <span>⚠️</span>
            <span>{validationError}</span>
          </div>
        )}

        {/* Submit CTA */}
        <div className="relative z-10 mt-1 flex flex-col items-center justify-center gap-3 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-accent via-amber via-50% to-pink-500/90 bg-[length:200%_auto] px-8 py-4 text-sm font-extrabold text-ink shadow-lg shadow-accent/25 transition-all duration-500 hover:bg-[position:right_center] hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/40 active:scale-95 disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <LuLoader className="h-4 w-4 animate-spin text-ink" />
                <span>Recording Diagnosis &amp; Opening Calendar...</span>
              </>
            ) : (
              <>
                <span>Book Your Founder Growth Diagnosis</span>
                <svg className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>

          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/60 dark:text-slate-400 font-medium">
            No sales pitch. 100% confidential. 45 minutes · ₹0
          </p>
        </div>
      </form>
    </div>
  );
}
