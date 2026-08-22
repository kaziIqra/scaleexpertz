"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LuCalendar,
  LuClipboardCheck,
  LuClock,
  LuLayoutGrid,
  LuRoute,
  LuScanSearch,
  LuVideo,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import Magnetic from "@/components/ui/Magnetic";
import { EASE_OUT_EXPO } from "@/lib/animations";

function IconBadge({ icon: Icon, size = 20 }: { icon: IconType; size?: number }) {
  return (
    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
      <Icon size={size} strokeWidth={1.75} aria-hidden />
    </span>
  );
}

const INCLUDED_ITEMS = [
  {
    icon: LuScanSearch,
    title: "Growth Bottleneck Analysis",
    description: "Identify the biggest obstacle preventing your business from growing faster.",
  },
  {
    icon: LuLayoutGrid,
    title: "Business Systems Review",
    description:
      "Evaluate how your branding, marketing, website, technology, AI, and operations work together—and where they're creating friction.",
  },
  {
    icon: LuRoute,
    title: "90-Day Growth Roadmap",
    description:
      "Discover the highest-impact opportunities to accelerate your business over the next 90 days.",
  },
  {
    icon: LuClipboardCheck,
    title: "Founder Action Plan",
    description:
      "Leave with practical, actionable recommendations you can implement immediately—whether we work together or not.",
  },
];

export default function FounderDiagnosis() {
  return (
    <section id="diagnosis" className="relative scroll-mt-24 bg-night py-10 md:py-14 text-white overflow-hidden">
      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-[10%] h-[500px] w-[500px] rounded-full bg-accent/[0.12] blur-[120px]" />
        <div className="absolute right-[15%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-amber/[0.1] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12">
        {/* Section 06 Entire Box with Gradient Outline & Glowing Shadow Effect */}
        <div className="group/box relative rounded-[32px] sm:rounded-[40px] p-[1.5px] sm:p-[2px] bg-gradient-to-r from-accent/45 via-amber-400/50 via-50% to-amber-500/45 shadow-[0_0_35px_-10px_rgba(212,175,55,0.2),_0_0_25px_-5px_rgba(245,158,11,0.15)] transition-all duration-500 hover:shadow-[0_0_55px_-5px_rgba(212,175,55,0.35),_0_0_35px_0px_rgba(245,158,11,0.25)]">
          
          {/* Ambient Glowing Aura behind the Outline Gradient */}
          <div 
            aria-hidden 
            className="pointer-events-none absolute -inset-[1px] rounded-[33px] sm:rounded-[41px] bg-gradient-to-r from-amber-500/25 via-accent/30 via-50% to-amber-400/25 opacity-40 blur-md transition-opacity duration-500 group-hover/box:opacity-80" 
          />

          {/* Main Inner Glassmorphic Box */}
          <div className="relative rounded-[30.5px] sm:rounded-[38px] bg-[#121217]/95 p-6 sm:p-10 md:p-14 backdrop-blur-2xl overflow-hidden">
            {/* Soft Ambient Corner Glows */}
            <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

            {/* Full-width intro */}
            <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center justify-center relative z-10 px-2 sm:px-4">
              <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
                06 — Founder Growth Diagnosis
              </h2>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-amber sm:text-2xl md:text-3xl leading-snug">
                Every Business Has Blind Spots. Let&apos;s Find Yours.
              </h3>

              <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed font-medium max-w-4xl">
                Your next breakthrough might not require a bigger budget. It might require a clearer perspective. Every business has opportunities that are easy to miss from the inside.
              </p>
              <p className="mt-2 text-xs sm:text-sm text-white/65 leading-relaxed max-w-4xl font-normal">
                Our Founder Growth Diagnosis helps uncover the bottlenecks, hidden opportunities, and strategic gaps that could be limiting your next stage of growth. Because the right decisions start with the right understanding.
              </p>
            </div>

            {/* Included grid + booking card — aligned grid */}
            <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8 relative z-10">
              <div className="lg:col-span-7 flex flex-col">
                <h3 className="font-mono text-xs uppercase tracking-widest text-amber font-semibold text-center lg:text-left mb-4">
                  What&apos;s Included in Your 45-Min Session:
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 flex-1">
                  {INCLUDED_ITEMS.map((item) => (
                    <div
                      key={item.title}
                      className="group relative flex flex-col justify-start overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-slate-800/50 dark:hover:border-accent/50 hover:bg-white/[0.06] hover:shadow-xl"
                    >
                      <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        whileInView={{ x: ["-100%", "120%"], opacity: [0, 0.7, 0] }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-amber-400/35 via-amber-500/25 dark:via-accent/35 dark:via-amber/20 to-transparent -skew-x-12"
                        aria-hidden
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.4 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-gradient-to-br from-[#1c1810] via-[#141419] to-[#0c0c0e] opacity-0 transition-opacity duration-500 group-hover:!opacity-100 pointer-events-none"
                        aria-hidden
                      />
                      {/* Mobile View Scroll Ambient Gold Gradient Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.45 }}
                        viewport={{ once: false, amount: 0.25 }}
                        transition={{ duration: 0.8 }}
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/18 via-amber-400/12 to-amber-300/15 dark:from-accent/25 dark:via-amber/15 transition-opacity duration-500 sm:hidden"
                        aria-hidden
                      />
                      <div className="relative z-10 flex items-center gap-3">
                        <IconBadge icon={item.icon} size={20} />
                        <h4 className="font-display text-base font-bold text-white group-hover:text-amber transition-colors duration-300 group-hover:drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
                          {item.title}
                        </h4>
                      </div>
                      <p className="relative z-10 mt-3 text-xs leading-relaxed text-white/70 font-medium group-hover:text-slate-200 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                  className="group/card relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-b from-pink-400/35 via-rose-400/30 to-amber-400/25 shadow-[0_0_25px_rgba(244,114,182,0.15)] transition-all duration-500 hover:shadow-[0_0_35px_rgba(244,114,182,0.25)] hover:from-pink-400/50 hover:via-rose-400/45 hover:to-amber-400/40"
                >
                  {/* Subtle Light Sweep Overlay */}
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    whileInView={{ x: ["-100%", "120%"], opacity: [0, 0.5, 0] }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
                    className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-pink-400/20 via-rose-400/15 to-transparent -skew-x-12"
                    aria-hidden
                  />

                  {/* 1 Shade Lighter Soft Dark Interior Container */}
                  <div className="relative flex h-full w-full flex-col justify-between rounded-[22.5px] bg-gradient-to-b from-[#1d1a24]/90 via-[#16141e]/90 to-[#121018]/90 p-6 sm:p-7 backdrop-blur-xl">
                    {/* Soft Ambient Glows */}
                    <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-pink-500/10 blur-3xl" />
                    <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />

                    <div>
                      {/* Light Subtle Pink Badge Tag */}
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-pink-300/90 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse" />
                        Recommended Action
                      </div>

                      <div className="flex items-center justify-between border-b border-white/10 pb-5">
                        <div>
                          <span className="font-mono text-[11px] uppercase tracking-widest text-pink-300 font-bold">
                            Find My Growth Bottleneck
                          </span>
                          <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white">
                            Book Founder Diagnosis
                          </h3>
                        </div>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-pink-400/30 bg-pink-500/15 text-pink-300">
                          <LuCalendar size={22} strokeWidth={1.75} aria-hidden />
                        </span>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/40 p-2.5 text-center text-xs font-mono text-white/80">
                        <span className="inline-flex items-center justify-center gap-1.5 py-1">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-pink-400/20 bg-pink-400/10 text-pink-300 shrink-0">
                            <LuClock size={12} strokeWidth={1.75} aria-hidden />
                          </span>
                          <span className="truncate font-medium text-white/90">45 Mins</span>
                        </span>
                        <span className="inline-flex items-center justify-center gap-1.5 py-1">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-pink-400/20 bg-pink-400/10 text-pink-300 shrink-0">
                            <LuVideo size={12} strokeWidth={1.75} aria-hidden />
                          </span>
                          <span className="truncate font-medium text-white/90">Online</span>
                        </span>
                        <span className="inline-flex items-center justify-center gap-1.5 py-1 font-bold text-pink-300 rounded-lg bg-pink-500/10 border border-pink-400/30">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-pink-400/30 bg-pink-400/20 font-display text-[10px] font-bold leading-none text-pink-300 shrink-0">
                            ₹
                          </span>
                          <span className="truncate">₹0 Free</span>
                        </span>
                      </div>

                      <p className="mt-5 text-xs sm:text-sm leading-relaxed text-white/80 font-medium">
                        Tell us about your business and primary growth bottleneck. We&apos;ll
                        confirm a 45-minute slot within 24 hours.
                      </p>
                    </div>

                    <div className="mt-6 pt-2 flex flex-col items-center justify-center text-center">
                      <Link
                        href="/diagnosis"
                        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-accent via-amber via-50% to-pink-500/90 bg-[length:200%_auto] px-8 py-3.5 text-sm font-extrabold text-ink shadow-lg shadow-accent/25 transition-all duration-500 hover:bg-[position:right_center] hover:shadow-xl hover:shadow-pink-500/30 active:scale-98"
                      >
                        <span className="tracking-tight text-center">Book Your Founder Growth Diagnosis</span>
                        <svg className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>

                      <p className="text-center font-sans text-xs font-semibold text-white/60 tracking-wider pt-3.5 flex items-center justify-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-pink-400/80" />
                        No sales pitch guaranteed. 100% confidential.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
