import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import DiagnosisForm from "./DiagnosisForm";

export const metadata: Metadata = {
  title: "Founder Growth Diagnosis — ScaleXpertz",
  description:
    "Book a free 45-minute Founder Growth Diagnosis. Uncover bottlenecks, review your systems, and leave with a 90-day growth roadmap.",
};

const INCLUDED_CARDS = [
  {
    title: "Growth Bottleneck Analysis",
    desc: "Identify the friction points holding back revenue and momentum.",
  },
  {
    title: "Business Systems Review",
    desc: "Evaluate strategy, branding, marketing, tech, and AI alignment.",
  },
  {
    title: "90-Day Growth Roadmap",
    desc: "A step-by-step action plan tailored specifically for your business.",
  },
  {
    title: "Founder Action Plan",
    desc: "Actionable recommendations you can execute immediately.",
  },
];

const WHO_ITS_FOR = [
  "Want sustainable, long-term business growth.",
  "Are managing multiple agencies, freelancers, or internal teams.",
  "Need clarity before investing more time or money.",
  "Believe great execution starts with great strategy.",
  "Want a partner who thinks beyond marketing.",
];

const WHAT_YOU_WONT_GET = [
  "A generic marketing audit.",
  "A strategy call that's actually just a sales pitch.",
  "Template recommendations.",
  "Advice that isn't specific to your business.",
];

export default function DiagnosisPage() {
  return (
    <div className="min-h-dvh bg-paper text-body dark:bg-[#0c0c0e] dark:text-slate-300 transition-colors duration-300">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 pb-20 pt-28 md:pt-36">
        {/* Page Centered Hero Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow index="06" label="Founder Growth Diagnosis" />
          <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-ink dark:text-white sm:text-4xl md:text-5xl leading-[1.1]">
            Every business has blind spots.{" "}
            <span className="text-accent dark:text-amber block mt-1">Let&apos;s find yours.</span>
          </h1>
          <p className="mt-4 mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-body dark:text-slate-300 font-medium">
            A free 45-minute strategy session to uncover bottlenecks, review how
            your branding, marketing, tech, and operations work together, and
            leave with a practical 90-day growth roadmap—whether we work
            together or not.
          </p>

          {/* Quick Info Badges Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-black/[0.08] dark:border-white/12 bg-surface/80 dark:bg-white/[0.04] px-5 py-2 text-xs font-mono text-ink dark:text-slate-300 shadow-sm backdrop-blur-sm">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              45 Minutes
            </span>
            <span className="text-black/20 dark:text-white/20">•</span>
            <span>Online Meeting</span>
            <span className="text-black/20 dark:text-white/20">•</span>
            <span className="font-bold text-accent dark:text-amber">₹0 Investment</span>
          </div>
        </div>

        {/* Main 2-Column Content & Form Layout */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Left Column: What's Included, Designed for Founders, What You Won't Get */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* What's Included */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent dark:text-amber font-bold">
                What&apos;s included in your session
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {INCLUDED_CARDS.map((item) => (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-black/[0.08] dark:border-white/12 bg-surface dark:bg-[#141419] p-5 shadow-card transition-all duration-300 hover:border-accent/50 dark:hover:border-amber/50 hover:-translate-y-0.5"
                  >
                    <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-wider text-accent dark:text-amber">
                      ✦ Included
                    </span>
                    <h3 className="mt-1 font-display text-sm font-bold text-ink dark:text-white group-hover:text-accent dark:group-hover:text-amber transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-body dark:text-slate-400 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Designed for Founders Who & What You Won't Get Section */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Designed for Founders Who */}
              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/10 p-5 shadow-card transition-all duration-300 hover:border-emerald-500/40">
                <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold mb-3.5 flex items-center gap-1.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">✓</span>
                  This diagnosis is designed for founders who:
                </h3>
                <ul className="space-y-2.5">
                  {WHO_ITS_FOR.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-ink dark:text-slate-200">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px]">
                        ✓
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What You Won't Get */}
              <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 dark:bg-rose-500/10 p-5 shadow-card transition-all duration-300 hover:border-rose-500/40">
                <h3 className="font-mono text-xs uppercase tracking-widest text-rose-600 dark:text-rose-400 font-bold mb-3.5 flex items-center gap-1.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold text-xs">✕</span>
                  What You Won&apos;t Get:
                </h3>
                <ul className="space-y-2.5">
                  {WHAT_YOU_WONT_GET.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-ink dark:text-slate-200">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold text-[11px]">
                        ✕
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 text-left">
            <div className="mb-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-pink-500 dark:text-pink-300 font-bold">
                Recommended Action
              </span>
              <h2 className="mt-0.5 font-display text-xl sm:text-2xl font-bold tracking-tight text-ink dark:text-white">
                Book Your 45-Min Session
              </h2>
            </div>
            <DiagnosisForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
