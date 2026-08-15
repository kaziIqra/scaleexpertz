"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import Magnetic from "@/components/ui/Magnetic";
import { EASE_OUT_EXPO } from "@/lib/animations";

const INCLUDED_ITEMS = [
  {
    icon: "🧠",
    title: "Growth Bottleneck Analysis",
    description: "Identify the biggest obstacle preventing your business from growing faster.",
  },
  {
    icon: "📊",
    title: "Business Systems Review",
    description:
      "Evaluate how your branding, marketing, website, technology, AI, and operations work together—and where they're creating friction.",
  },
  {
    icon: "📈",
    title: "90-Day Growth Roadmap",
    description:
      "Discover the highest-impact opportunities to accelerate your business over the next 90 days.",
  },
  {
    icon: "✅",
    title: "Founder Action Plan",
    description:
      "Leave with practical, actionable recommendations you can implement immediately—whether we work together or not.",
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

export default function FounderDiagnosis() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="diagnosis" className="relative scroll-mt-24 bg-night py-16 md:py-24 text-white overflow-hidden">
      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-[10%] h-[500px] w-[500px] rounded-full bg-accent/[0.12] blur-[120px]" />
        <div className="absolute right-[15%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-amber/[0.1] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Side - Copy & Offer Breakdown */}
          <div className="lg:col-span-7">
            <Eyebrow index="06" label="Founder Growth Diagnosis" />
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl md:text-4xl leading-[1.1]">
              <TextReveal text="Every Business Has Blind Spots." as="span" className="block" />
              <TextReveal text="Let's Find Yours." as="span" className="block text-amber" delay={0.12} />
            </h2>

            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed font-medium max-w-2xl">
              Your next breakthrough might not require a bigger budget. It might require a clearer perspective. Every business has opportunities that are easy to miss from the inside.
            </p>
            <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed max-w-2xl">
              Our Founder Growth Diagnosis helps uncover the bottlenecks, hidden opportunities, and strategic gaps that could be limiting your next stage of growth. Because the right decisions start with the right understanding.
            </p>

            {/* What's Included */}
            <div className="mt-12">
              <h3 className="font-mono text-xs uppercase tracking-widest text-amber font-semibold">
                What&apos;s Included in Your 45-Min Session:
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {INCLUDED_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <h4 className="font-display text-base font-semibold text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-white/70 font-medium">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who It's For & What You Won't Get */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold mb-4">
                  This diagnosis is designed for founders who:
                </h4>
                <ul className="space-y-2.5 text-xs text-white/80">
                  {WHO_ITS_FOR.map((text) => (
                    <li key={text} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
                <h4 className="font-mono text-xs uppercase tracking-widest text-rose-400 font-bold mb-4">
                  What You Won&apos;t Get:
                </h4>
                <ul className="space-y-2.5 text-xs text-white/80">
                  {WHAT_YOU_WONT_GET.map((text) => (
                    <li key={text} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Closing statement */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="font-display text-xl font-semibold text-white">
                We don&apos;t start with solutions. We start with understanding.
              </p>
              <p className="mt-1 text-xs text-white/50 font-mono">
                No &ldquo;Only 2 spots left!&rdquo; countdown timer. We dislike those too.
              </p>
            </div>
          </div>

          {/* Right Side - Embedded Booking Experience */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              className="rounded-3xl border border-white/15 bg-white/[0.05] p-8 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-amber font-semibold">
                    Find My Growth Bottleneck
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white">
                    Book Founder Diagnosis
                  </h3>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent font-bold">
                  📅
                </span>
              </div>

              {/* Session Meta badges */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs font-mono text-white/80">
                <span>⏱️ 45 Minutes</span>
                <span>💻 Online Meeting</span>
                <span className="text-amber font-bold">🆓 ₹0 Investment</span>
              </div>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
                  <span className="text-4xl">🎉</span>
                  <h4 className="mt-4 font-display text-xl font-bold text-white">
                    Diagnosis Requested!
                  </h4>
                  <p className="mt-2 text-sm text-white/80">
                    We&apos;ve received your booking details. Our strategy team will contact you within 24 hours to confirm your 45-minute calendar slot.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                      Company / Website
                    </label>
                    <input
                      type="text"
                      placeholder="https://company.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                      Primary Growth Bottleneck
                    </label>
                    <textarea
                      rows={3}
                      placeholder="What is the biggest challenge holding back your growth right now?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none focus:border-accent resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Magnetic strength={10}>
                      <button
                        type="submit"
                        className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-accent via-indigo-600 to-accent bg-[length:200%_auto] px-6 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-accent/30 transition-all duration-500 hover:bg-[position:right_center] hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/50 active:scale-98"
                      >
                        <span className="tracking-tight">Book Your Founder Growth Diagnosis</span>
                        <svg className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </Magnetic>
                  </div>

                  <p className="text-center font-mono text-[10px] text-white/40 pt-2">
                    No sales pitch guaranteed. 100% confidential.
                  </p>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
