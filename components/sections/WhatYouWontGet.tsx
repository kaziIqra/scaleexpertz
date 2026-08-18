"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import Magnetic from "@/components/ui/Magnetic";
import { EASE_OUT_EXPO } from "@/lib/animations";

const POINTS = [
  {
    title: "Endless Meetings",
    tagline: "Your business needs decisions, not discussions.",
    text: "We keep communication clear, purposeful, and respectful of your time—so meetings happen when they create value, not because they're on the calendar.",
  },
  {
    title: "Finger Pointing",
    isFingerPointing: true,
  },
  {
    title: "Vanity Metrics",
    tagline: "A dashboard full of green arrows means very little if your business isn't growing.",
    text: "We focus on the numbers that actually matter—qualified leads, revenue, customer retention, and sustainable growth.",
  },
  {
    title: "Constant Follow-Ups",
    tagline: "You shouldn't have to chase the people you've hired. If you're managing us, we're not doing our job.",
    text: "Expect proactive communication, clear timelines, and complete ownership from our side.",
  },
  {
    title: "Random Execution",
    tagline: "Posting content. Running ads. Redesigning websites. Launching campaigns. None of it matters without a clear strategy behind it.",
    text: "Every action should move your business closer to a defined goal.",
  },
  {
    title: "Short-Term Thinking",
    tagline: "Quick wins feel good. Sustainable systems build businesses.",
    text: "We're here to create growth that continues long after the first campaign ends.",
  },
];

export default function WhatYouWontGet() {
  return (
    <section id="anti-agency" className="relative bg-[#0c0c0e] py-10 md:py-14 text-white overflow-hidden">
      {/* Background Soft Glow Gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.08] blur-[120px]" />
        <div className="absolute right-[10%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-accent/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Large Centered Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
            ✕ Anti-Agency Guarantee
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl md:text-4xl text-white">
            <TextReveal text="What You Won't Get From Us." as="span" className="block" />
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-medium">
            Choosing a growth partner should make running your business easier—not give you another team to manage. Here&apos;s what you should never have to deal with when you work with ScaleXpertz.
          </p>
        </div>

        {/* Responsive 2x3 Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.06 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#141419]/90 p-6 sm:p-7 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af37]/60 hover:shadow-[#d4af37]/15"
            >
              {/* Dynamic Hover Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/15 via-amber-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                aria-hidden
              />

              <div className="relative z-10">
                {/* Thin outlined red X icon in top-left corner */}
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-500/40 text-rose-400 text-xs font-semibold transition-transform duration-300 group-hover:scale-110">
                    ✕
                  </span>
                  <span className="font-mono text-xs text-[#d4af37]/80 font-semibold uppercase tracking-wider bg-[#d4af37]/10 px-2.5 py-0.5 rounded-full border border-[#d4af37]/20">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold tracking-tight sm:text-xl text-white/90 group-hover:text-white transition-colors duration-300">
                  {p.title}
                </h3>

                {p.isFingerPointing ? (
                  <div className="mt-3 text-xs sm:text-sm leading-relaxed text-white/70 group-hover:text-white transition-colors duration-300 space-y-1.5">
                    <p className="italic text-rose-300 font-medium">&ldquo;No, we&apos;re waiting on the designer.&rdquo;</p>
                    <p className="italic text-rose-300 font-medium">&ldquo;The developer hasn&apos;t finished.&rdquo;</p>
                    <p className="italic text-rose-300 font-medium">&ldquo;Marketing is still working on it.&rdquo;</p>
                    <p className="pt-1.5 font-semibold text-white/90">Somehow, everyone has an update. Nobody has an answer.</p>
                    <p className="font-bold text-[#d4af37]">Not here. One team. One owner. One outcome.</p>
                  </div>
                ) : i === 0 ? (
                  <div className="mt-3 space-y-1.5 text-xs sm:text-sm leading-relaxed text-white/70 group-hover:text-white transition-colors duration-300">
                    <p className="font-medium text-white/90">Your business needs <span className="text-[#d4af37] font-semibold">decisions, not discussions.</span></p>
                    <p>We keep communication clear, purposeful, and respectful of your time—so meetings happen when they create value, not because they&apos;re on the calendar.</p>
                  </div>
                ) : i === 2 ? (
                  <div className="mt-3 space-y-1.5 text-xs sm:text-sm leading-relaxed text-white/70 group-hover:text-white transition-colors duration-300">
                    <p className="font-medium text-white/90">A dashboard full of green arrows means very little if your business isn&apos;t growing.</p>
                    <p>We focus on the <span className="text-amber-400 font-semibold">numbers that actually matter</span>—qualified leads, revenue, retention, and <span className="text-emerald-400 font-semibold">sustainable growth.</span></p>
                  </div>
                ) : i === 3 ? (
                  <div className="mt-3 space-y-1.5 text-xs sm:text-sm leading-relaxed text-white/70 group-hover:text-white transition-colors duration-300">
                    <p className="font-medium text-white/90">You shouldn&apos;t have to chase the people you&apos;ve hired. If you&apos;re managing us, we&apos;re not doing our job.</p>
                    <p>Expect <span className="text-cyan-300 font-semibold">proactive communication</span>, clear timelines, and <span className="text-[#d4af37] font-bold">complete ownership</span> from our side.</p>
                  </div>
                ) : i === 4 ? (
                  <div className="mt-3 space-y-1.5 text-xs sm:text-sm leading-relaxed text-white/70 group-hover:text-white transition-colors duration-300">
                    <p className="font-medium text-white/90">Posting content. Running ads. Redesigning websites. Launching campaigns. None of it matters without a <span className="text-rose-300 font-semibold">clear strategy</span> behind it.</p>
                    <p>Every action should move your business closer to a defined goal.</p>
                  </div>
                ) : (
                  <div className="mt-3 space-y-1.5 text-xs sm:text-sm leading-relaxed text-white/70 group-hover:text-white transition-colors duration-300">
                    <p className="font-medium text-[#d4af37]">Quick wins feel good. <span className="text-amber-300 font-semibold">Sustainable systems build businesses.</span></p>
                    <p>We&apos;re here to create growth that continues long after the first campaign ends.</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Statement & CTA */}
        <div className="mt-12 flex flex-col items-center justify-center text-center border-t border-white/10 pt-10">
          <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
            The right partner doesn&apos;t add complexity. They remove it.
          </h3>
          <div className="mt-6">
            <Magnetic strength={12}>
              <a
                href="/diagnosis"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] bg-[length:200%_auto] px-8 py-4 text-sm sm:text-base font-extrabold text-black shadow-xl shadow-[#d4af37]/25 transition-all duration-500 hover:bg-[position:right_center] hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/50 active:scale-95 group"
              >
                Experience the Difference &rarr;
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
