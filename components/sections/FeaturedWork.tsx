"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import Magnetic from "@/components/ui/Magnetic";
import { useLenis } from "@/components/providers/SmoothScroll";
import { EASE_OUT_EXPO } from "@/lib/animations";

export interface Metric {
  label: string;
  value: string;
  sub?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  headline: string;
  outcome: string;
  problem: string;
  solution: string;
  metrics: Metric[];
  image: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "toy-ecommerce",
    client: "Toy eCommerce",
    category: "eCommerce",
    headline: "12X ROAS",
    outcome:
      "Turned ₹2.6L in ad spend into ₹31.2L in revenue by rebuilding the growth strategy—not just increasing the budget.",
    problem:
      "A toy eCommerce brand had a working product but a stalling ad account — spend was capped low because every attempt to scale further killed ROAS.",
    solution:
      "We rebuilt campaign structure around targeted Facebook ad sets, layer audience segmentation by parent demographics, and ran rapid creative testing.",
    metrics: [
      { label: "Duration", value: "5 Months" },
      { label: "Ad Spend", value: "₹2.6L" },
      { label: "Revenue", value: "₹31.2L" },
      { label: "ROAS", value: "12X" },
    ],
    image: "/works/toy-ecommerce.jpeg",
  },
  {
    id: "jewellery-ecommerce",
    client: "Jewellery eCommerce",
    category: "eCommerce",
    headline: "11,500+ Orders",
    outcome:
      "Built a scalable growth engine that generated ₹80L in revenue while handling high-volume order demand.",
    problem:
      "This jewellery brand needed order volume at scale without the ad account or fulfillment funnel breaking down.",
    solution:
      "We ran a full-funnel Meta Ads operation with multiple concurrent catalog & collection campaigns, reallocating budget to converting SKUs.",
    metrics: [
      { label: "Duration", value: "2.5 Months" },
      { label: "Ad Spend", value: "₹33.7L" },
      { label: "Revenue", value: "₹80.0L" },
      { label: "Orders", value: "11,500+" },
    ],
    image: "/works/jewellery-ecommerce.jpeg",
  },
  {
    id: "astrology-ecommerce",
    client: "Astrology & Spiritual eCommerce",
    category: "eCommerce",
    headline: "Trust Before Products",
    outcome:
      "When trust was the biggest barrier to purchase, we built campaigns that earned credibility before asking for the sale.",
    problem:
      "High-consideration spiritual products needed buyer trust before product sales. Generic ad creative was failing cold traffic.",
    solution:
      "We built creative around credibility signals and outcome-driven messaging paired with high-intent audience targeting.",
    metrics: [
      { label: "Duration", value: "2 Months" },
      { label: "Ad Spend", value: "₹3.35L" },
      { label: "Revenue", value: "₹22.6L" },
      { label: "ROAS", value: "6.7X" },
    ],
    image: "/works/astrology-ecommerce.jpeg",
  },
  {
    id: "ev-mobility",
    client: "EV & Mobility Brand",
    category: "EV & Mobility",
    headline: "150+ Qualified Leads Every Day",
    outcome:
      "Generated consistent, high-quality leads while reducing acquisition costs by 90% below the industry average.",
    problem:
      "Needed high-volume D2C leads across multiple regional markets simultaneously without cost-per-lead ballooning.",
    solution:
      "Built 48 segmented campaigns with WhatsApp lead funnels, reducing CPL to ₹5.40 compared to the ₹54 industry average.",
    metrics: [
      { label: "Campaigns", value: "48 Active" },
      { label: "Peak Leads", value: "150+/day" },
      { label: "Lowest CPL", value: "₹5.40" },
      { label: "CPL Reduction", value: "90% Lower" },
    ],
    image: "/works/150_leads.jpeg",
  },
  {
    id: "battery-swap",
    client: "Battery-Swap Mobility Startup",
    category: "Brand Launch",
    headline: "From Zero History",
    outcome:
      "Built a complete customer acquisition system from scratch and launched a brand with no historical campaign data.",
    problem:
      "Brand-new startup with zero ad account history needed both B2B and D2C lead streams on day one.",
    solution:
      "Architected dedicated B2B form streams, city-specific D2C campaigns, and awareness pushes running simultaneously.",
    metrics: [
      { label: "Opportunity Score", value: "100/100" },
      { label: "B2B Leads", value: "73" },
      { label: "B2B CPL", value: "₹14.73" },
      { label: "Awareness Reach", value: "86,779" },
    ],
    image: "/works/from-zero-history.jpeg",
  },
];

export default function FeaturedWork() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (selectedCase) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [selectedCase, lenis]);

  return (
    <section
      id="work"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-10 md:px-12 md:py-14"
    >
      {/* Header section */}
      <div className="mx-auto max-w-4xl text-center flex flex-col items-center justify-center">
        <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-ink dark:text-white sm:text-4xl md:text-5xl">
          05 — Proof Over Promises
        </h2>
        <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-accent dark:text-amber sm:text-2xl md:text-3xl">
          Results are easy to claim. Proof is harder to fake.
        </h3>
        <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-body dark:text-slate-300 font-medium">
          Every business comes with a different challenge. Different industries. Different customers. Different goals. That&apos;s why we don&apos;t believe in one-size-fits-all strategies. We understand the business first, build the right system second, and let the numbers speak for themselves.
        </p>
      </div>

      {/* 5 Visually Engaging Case Study Cards Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CASE_STUDIES.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
            className="group cursor-pointer relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-[#141419] p-6 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-accent/60 hover:shadow-2xl"
            onClick={() => setSelectedCase(p)}
          >
            {/* Scroll Shimmer Light Sweep */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              whileInView={{ x: ["-100%", "120%"], opacity: [0, 0.6, 0] }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.3, ease: "easeInOut", delay: (i % 3) * 0.12 }}
              className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-accent/35 via-amber-500/20 to-transparent -skew-x-12"
              aria-hidden
            />

            {/* Dynamic Card Scroll & Hover Gradient Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="absolute inset-0 bg-gradient-to-br from-accent/22 via-amber-500/15 via-35% to-transparent transition-opacity duration-500 group-hover:!opacity-100 pointer-events-none"
              aria-hidden
            />

            <div className="relative z-10">
              {/* Image thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink/5 ring-1 ring-black/[0.06] dark:bg-white/5 dark:ring-white/10 group-hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src={p.image}
                  alt={p.client}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-contain object-center"
                  priority={i < 2}
                />
                <span className="absolute left-3.5 top-3.5 rounded-full bg-black/80 px-3 py-1 font-mono text-[10px] uppercase font-bold text-amber border border-amber/30 backdrop-blur-md">
                  {p.client}
                </span>
                <span className="absolute right-3.5 top-3.5 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase font-extrabold text-ink shadow-md">
                  {p.category}
                </span>
              </div>

              {/* Bold headline & outcome */}
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-ink dark:text-white group-hover:text-accent dark:group-hover:text-amber transition-colors duration-300">
                {p.headline}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body dark:text-slate-300 font-medium">
                {p.outcome}
              </p>
            </div>

            {/* Action CTA */}
            <div className="relative z-10 mt-6 border-t border-black/[0.06] dark:border-white/10 pt-4 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-accent dark:text-amber">
              <span>See Full Case Study</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing Statement & Primary CTA — Premium Rearranged Layout */}
      <div className="mt-16 md:mt-24 relative overflow-hidden rounded-[32px] border border-black/10 dark:border-white/12 bg-gradient-to-br from-surface via-surface to-paper dark:from-[#14141a] dark:via-[#16161f] dark:to-[#0e0e12] p-8 sm:p-10 md:p-14 shadow-2xl transition-all duration-500 hover:border-accent/40">
        {/* Ambient Glows */}
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-amber/15 blur-3xl" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 dark:border-amber/35 bg-accent/10 dark:bg-amber/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-accent dark:text-amber shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Our Philosophy
          </span>

          <h3 className="mt-5 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-ink dark:text-white leading-tight">
            Different businesses. Different challenges.{" "}
            <span className="text-accent dark:text-amber block sm:inline">One philosophy.</span>
          </h3>

          <div className="mt-6 border-l-4 border-accent dark:border-amber pl-6 py-4 bg-accent/5 dark:bg-amber/5 rounded-r-2xl backdrop-blur-sm">
            <p className="text-base sm:text-lg leading-relaxed text-body dark:text-slate-200 font-medium italic">
              &ldquo;We don&apos;t copy strategies from one client to another. We study the business, understand the customer, build the right system, and execute with complete ownership. That&apos;s how growth becomes repeatable—not accidental.&rdquo;
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex justify-end sm:justify-start md:justify-end">
            <div className="shrink-0">
              <Magnetic strength={12}>
                <a
                  href="/ScaleXpertz_Case_Studies_Report.pdf"
                  download="ScaleXpertz_Growth_Research.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-accent via-amber to-accent bg-[length:200%_auto] px-7 py-4 text-base font-bold text-ink shadow-xl shadow-accent/25 transition-all duration-500 hover:bg-[position:right_center] hover:scale-105 hover:shadow-2xl hover:shadow-accent/40 active:scale-95 group leading-none text-center"
                >
                  <svg className="h-5 w-5 shrink-0 text-ink transition-transform duration-300 group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Explore Our Growth Research</span>
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div data-lenis-prevent className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <div className="relative flex min-h-full items-center justify-center py-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="relative z-10 my-auto w-full max-w-3xl rounded-3xl border border-black/10 dark:border-white/15 bg-surface dark:bg-[#16161d] p-6 shadow-2xl md:p-10 text-ink dark:text-white"
                role="dialog"
                aria-modal="true"
              >
              <button
                onClick={() => setSelectedCase(null)}
                aria-label="Close modal"
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 bg-surface dark:bg-[#1f1f28] text-ink dark:text-white transition-colors duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                ✕
              </button>

              <span className="rounded-full bg-accent/10 dark:bg-accent/20 px-3 py-1 font-mono text-xs font-semibold text-accent dark:text-amber">
                {selectedCase.category} • {selectedCase.client}
              </span>

              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink dark:text-white sm:text-3xl">
                {selectedCase.headline}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-body dark:text-slate-300 font-medium">
                {selectedCase.outcome}
              </p>

              {/* Metrics Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {selectedCase.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-[#1f1f28] p-4 text-center"
                  >
                    <p className="font-display text-xl font-bold tracking-tight text-ink dark:text-white md:text-2xl">
                      {m.value}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink/60 dark:text-slate-400">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Problem & Solution */}
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-amber/30 bg-amber/5 dark:bg-amber/10 p-5">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber">
                    The Challenge
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/90 dark:text-slate-200">
                    {selectedCase.problem}
                  </p>
                </div>

                <div className="rounded-2xl border border-accent/30 bg-accent/5 dark:bg-accent/10 p-5">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-accent dark:text-amber">
                    The System We Built
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/90 dark:text-slate-200">
                    {selectedCase.solution}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] dark:border-white/10 pt-6">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="/ScaleXpertz_Case_Studies_Report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-ink dark:bg-accent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white dark:text-ink shadow-card transition-colors duration-300 hover:bg-accent hover:text-ink dark:hover:bg-accent-strong"
                  >
                    Download Report PDF →
                  </a>

                  <a
                    href="/ScaleXpertz_Case_Studies_Report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 dark:border-accent/50 bg-transparent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink dark:text-accent transition-colors duration-300 hover:border-accent hover:bg-accent/10 dark:hover:border-accent dark:hover:bg-accent/15"
                  >
                    Read More →
                  </a>
                </div>

                <button
                  onClick={() => setSelectedCase(null)}
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/60 dark:text-slate-400 hover:text-ink dark:hover:text-white"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  </section>
  );
}
