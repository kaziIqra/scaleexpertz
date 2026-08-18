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
  "Want sustainable, long-term growth",
  "Are juggling agencies, freelancers, or internal teams",
  "Need clarity before investing more time or money",
  "Want a partner who thinks beyond marketing",
];

export default function DiagnosisPage() {
  return (
    <div className="min-h-dvh bg-paper text-body dark:bg-[#0c0c0e] dark:text-slate-300 transition-colors duration-300">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-6 pb-20 pt-28 md:px-12 md:pt-36">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading & Feature Cards */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <Eyebrow index="06" label="Founder Growth Diagnosis" />
            <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-ink dark:text-white sm:text-4xl md:text-5xl leading-[1.1]">
              Every business has blind spots.{" "}
              <span className="text-accent dark:text-amber block mt-1">Let&apos;s find yours.</span>
            </h1>
            <p className="mt-4 mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-body dark:text-slate-300 font-medium lg:mx-0">
              A free 45-minute strategy session to uncover bottlenecks, review how
              your branding, marketing, tech, and operations work together, and
              leave with a practical 90-day growth roadmap—whether we work
              together or not.
            </p>

            <div className="mt-10 space-y-8 text-left">
              {/* What's Included Card Section */}
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-accent dark:text-amber font-bold text-center lg:text-left">
                  What&apos;s included
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {INCLUDED_CARDS.map((item) => (
                    <div
                      key={item.title}
                      className="group rounded-2xl border border-black/[0.08] dark:border-white/12 bg-surface dark:bg-[#141419] p-4.5 shadow-card transition-all duration-300 hover:border-accent/50 dark:hover:border-amber/50 hover:-translate-y-0.5"
                    >
                      <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-wider text-accent dark:text-amber">
                        ✦ Included
                      </span>
                      <h3 className="mt-1 font-display text-sm font-bold text-ink dark:text-white group-hover:text-accent dark:group-hover:text-amber transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-body dark:text-slate-400 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Designed for Founders Who Card Section */}
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-emerald-500 dark:text-emerald-400 font-bold text-center lg:text-left">
                  Designed for founders who
                </h2>
                <div className="mt-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/10 p-5 shadow-card">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {WHO_ITS_FOR.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-ink dark:text-slate-200">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px]">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm text-body dark:text-slate-400 font-medium italic">
              We don&apos;t start with solutions. We start with understanding.
            </p>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-6">
            <h2 className="mb-4 text-center font-display text-xl font-bold tracking-tight text-ink dark:text-white lg:text-left">
              Book your session
            </h2>
            <DiagnosisForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
