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
    image: "/works/toy ecommerce.jpeg",
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
    image: "/works/jwellrey ecommerce.jpeg",
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
    image: "/works/astrology ecommerce.jpeg",
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
    image: "/works/from_zero_history.jpeg",
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
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24"
    >
      {/* Header section */}
      <div>
        <Eyebrow index="05" label="Proof Over Promises" />
        <h2 className="mt-4 max-w-4xl font-display text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl md:text-4xl leading-[1.1]">
          <TextReveal as="span" className="block" text="Proof Over Promises." />
          <TextReveal as="span" className="block text-accent" text="Results are easy to claim. Proof is harder to fake." delay={0.1} />
        </h2>
        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-body font-medium">
          Every business comes with a different challenge. Different industries. Different customers. Different goals. That&apos;s why we don&apos;t believe in one-size-fits-all strategies. We understand the business first, build the right system second, and let the numbers speak for themselves.
        </p>
      </div>

      {/* 5 Visually Minimal Case Study Cards Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CASE_STUDIES.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
            className="group cursor-pointer flex flex-col justify-between rounded-3xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-white/[0.03] p-5 sm:p-6 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-accent hover:shadow-card-hover"
            onClick={() => setSelectedCase(p)}
          >
            <div>
              {/* Image thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-paper">
                <Image
                  src={p.image}
                  alt={p.client}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={i < 2}
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] uppercase font-semibold text-white backdrop-blur-md">
                  {p.client}
                </span>
              </div>

              {/* Bold headline & outcome */}
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors duration-300">
                {p.headline}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body font-medium">
                {p.outcome}
              </p>
            </div>

            {/* Action CTA */}
            <div className="mt-6 border-t border-black/[0.06] pt-4 flex items-center justify-between text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              <span>See How We Did It</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing Statement & Primary CTA */}
      <div className="mt-20 rounded-3xl border border-black/[0.06] bg-surface p-8 md:p-12 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-amber font-semibold">Our Philosophy</span>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Different businesses. Different challenges. One philosophy.
          </h3>
          <p className="mt-3 text-base leading-relaxed text-body font-medium">
            We don&apos;t copy strategies from one client to another. We study the business, understand the customer, build the right system, and execute with complete ownership. That&apos;s how growth becomes repeatable—not accidental.
          </p>
        </div>

        <div className="shrink-0">
          <Magnetic strength={12}>
            <a
              href="/ScaleXpertz_Case_Studies_Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent via-indigo-600 to-accent bg-[length:200%_auto] px-8 py-4 text-base font-bold text-white shadow-xl shadow-accent/25 transition-all duration-500 hover:bg-[position:right_center] hover:scale-105 hover:shadow-2xl hover:shadow-accent/40 active:scale-95 group"
            >
              Explore Our Growth Research &rarr;
            </a>
          </Magnetic>
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

              <span className="rounded-full bg-accent/10 dark:bg-accent/20 px-3 py-1 font-mono text-xs font-semibold text-accent dark:text-indigo-400">
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
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-accent dark:text-indigo-400">
                    The System We Built
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/90 dark:text-slate-200">
                    {selectedCase.solution}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] dark:border-white/10 pt-6">
                <a
                  href="/ScaleXpertz_Case_Studies_Report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink dark:bg-accent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-card transition-colors duration-300 hover:bg-accent dark:hover:bg-indigo-600"
                >
                  Download Report PDF →
                </a>

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
