"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import { EASE_OUT_EXPO } from "@/lib/animations";

const STEPS = [
  {
    letter: "S",
    title: "Strategy",
    subtitle: "Build the right direction before increasing speed.",
    desc: "Growth without strategy creates expensive mistakes. We begin by understanding your business, market, competitors, customers, and growth objectives before a single campaign is launched. The fastest way in the wrong direction is still the wrong direction.",
    deliverables: ["Founder Growth Diagnosis™", "Business Growth Audit", "Competitor & Market Analysis", "KPIs & 90-Day Roadmap"],
  },
  {
    letter: "C",
    title: "Create",
    subtitle: "Build assets that create trust before they generate attention.",
    desc: "Brands aren't remembered because they publish more; they're remembered because they communicate with clarity and consistency. From branding and content to conversion websites and creative systems, everything strengthens credibility before asking for attention.",
    deliverables: ["Brand Identity Assets", "High-Converting Creatives", "Websites & Landing Pages", "Content Ecosystem"],
  },
  {
    letter: "A",
    title: "Accelerate",
    subtitle: "Turn strategy into measurable business momentum.",
    desc: "This is where execution begins — performance marketing, sales systems, AI automation, lead generation, and acquisition campaigns. Every action is aligned to one objective: move the business forward, not just increase activity.",
    deliverables: ["Performance Marketing", "Sales Systems & CRM", "AI & Workflow Automation", "Customer Acquisition Engines"],
  },
  {
    letter: "L",
    title: "Lead",
    subtitle: "Build authority that compounds over time.",
    desc: "Businesses grow faster when people trust the people behind them. We help founders build long-term authority through positioning, communication, visibility, and strategic content that earns attention. Leadership creates trust; trust creates demand.",
    deliverables: ["Executive Positioning", "Personal Brand Strategy", "Founder Content Academy™", "Growth Spotlight™ Storytelling"],
  },
  {
    letter: "E",
    title: "Evolve",
    subtitle: "Growth is never finished. It is continuously improved.",
    desc: "Markets, customers, and technology change. Winning businesses don't react to change — they evolve with it. Every Growth Sprint™ ends with insights, optimization, documentation, and the next strategic move, so momentum never stops.",
    deliverables: ["Weekly Strategy Reviews™", "Campaign Optimisation", "Growth Documentation™", "Next Sprint Scaling Plan"],
  },
];

export default function ScaleFramework() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="framework" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24">
      <Eyebrow index="02" label="The Proprietary SCALE Framework™" className="text-center md:text-left" />

      {/* Header */}
      <div className="mt-6 mx-auto max-w-4xl text-center md:mx-0 md:text-left">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink dark:text-white sm:text-3xl md:text-4xl leading-[1.1]">
          <TextReveal as="span" className="block" text="One Operating System." />
          <TextReveal as="span" className="block text-amber" text="Zero Coordination Chaos™." delay={0.12} />
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-body dark:text-slate-300 font-medium">
          The SCALE Framework™ doesn&apos;t optimize one isolated department — it aligns strategy, creative production, performance marketing, AI automation, and founder authority into one coordinated execution system.
        </p>
      </div>

      {/* Interactive Tabs Header */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-b border-black/[0.08] dark:border-white/10 pb-4 md:justify-between">
        {STEPS.map((step, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={step.letter}
              onClick={() => setActiveTab(idx)}
              className={`group flex items-center gap-3 rounded-2xl px-5 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-accent text-ink shadow-lg shadow-accent/25"
                  : "bg-surface dark:bg-[#141419] border border-black/[0.08] dark:border-white/10 text-ink dark:text-white hover:border-accent"
              }`}
            >
              <span
                className={`font-display text-lg font-black ${
                  isActive ? "text-amber" : "text-accent dark:text-amber"
                }`}
              >
                {step.letter}
              </span>
              <span className="font-display text-sm font-bold tracking-wide">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Card Content */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="rounded-3xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-[#141419] p-6 sm:p-10 shadow-card"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Letter & Subtitle */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber/15 font-display text-4xl font-black text-amber">
                    {STEPS[activeTab].letter}
                  </span>
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent dark:text-amber">
                      Phase 0{activeTab + 1}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-ink dark:text-white sm:text-3xl">
                      {STEPS[activeTab].title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 font-display text-base font-semibold text-ink dark:text-white leading-snug">
                  {STEPS[activeTab].subtitle}
                </p>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-body dark:text-slate-300 font-medium">
                  {STEPS[activeTab].desc}
                </p>
              </div>

              {/* Right Column: Deliverables Grid */}
              <div className="lg:col-span-7 rounded-2xl border border-black/[0.06] dark:border-white/10 bg-paper dark:bg-white/[0.03] p-6">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber mb-4">
                  Key Execution Deliverables in this Phase:
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {STEPS[activeTab].deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-black/[0.06] dark:border-white/10 bg-surface dark:bg-[#1c1c24] p-3.5 shadow-sm"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 dark:bg-accent/20 font-mono text-xs font-bold text-accent dark:text-amber">
                        ✓
                      </span>
                      <span className="font-display text-xs font-semibold text-ink dark:text-white">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
