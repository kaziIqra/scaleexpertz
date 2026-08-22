"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { EASE_IN_OUT } from "@/lib/animations";

const ITEMS = [
  {
    q: "1. What makes ScaleXpertz different from a typical agency?",
    a: "Most agencies deliver individual services. We partner with businesses to bring strategy, branding, marketing, technology, AI, and execution together under one direction. Our goal isn't to become another vendor you manage—it's to become the team that helps your business grow.",
  },
  {
    q: "2. Do I have to use all your services?",
    a: "No. Every business has different priorities. Some founders come to us for a single challenge. Others choose a long-term growth partnership. We'll recommend what your business actually needs—not everything we offer.",
  },
  {
    q: "3. What happens during the Founder Growth Diagnosis?",
    a: "We spend time understanding your business, identifying growth bottlenecks, reviewing your current systems, and discussing opportunities for improvement. It's a strategy conversation—not a sales presentation.",
  },
  {
    q: "4. How do you decide what my business needs?",
    a: "We don't start with a predefined package. We start by understanding your goals, challenges, and current stage of growth. Only then do we recommend the right approach.",
  },
  {
    q: "5. Do you work with startups or established businesses?",
    a: "Both. Whether you're building from the ground up or scaling an established company, our approach stays the same: Understand first. Execute second.",
  },
  {
    q: "6. What if I already have an internal team?",
    a: "That's completely fine. We often work alongside founders, internal teams, or existing specialists to strengthen strategy, improve execution, and fill growth gaps where needed.",
  },
  {
    q: "7. How soon can I expect results?",
    a: "Every business is different. Some improvements happen quickly. Others take time. We focus on building sustainable growth rather than chasing short-term wins that disappear a month later.",
  },
  {
    q: "8. Why don't you list fixed prices on your website?",
    a: "Because no two businesses have the same goals, challenges, or growth priorities. We'd rather recommend the right partnership than ask you to fit into a predefined package.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-10 md:px-12 md:py-14">
      <div className="grid gap-10 md:grid-cols-5 md:gap-8">
        <div className="md:col-span-2 text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-ink dark:text-white sm:text-4xl md:text-5xl">
            07 — Frequently Asked Questions
          </h2>
          <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-accent dark:text-amber sm:text-2xl md:text-3xl">
            Questions Founders Usually Ask.
          </h3>
          <p className="mt-3 mx-auto max-w-sm text-sm sm:text-base text-body md:mx-0 font-medium">
            If you&apos;re wondering the same thing, you&apos;re probably not the first.
          </p>

          <div className="group relative overflow-hidden mt-8 hidden md:block rounded-2xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 shadow-card transition-all duration-500 hover:border-slate-800/40 dark:hover:border-accent/40">
            {/* Scroll Shimmer Light Sweep */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              whileInView={{ x: ["-100%", "120%"], opacity: [0, 0.7, 0] }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
              className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-amber-400/35 via-amber-500/25 dark:via-accent/35 dark:via-amber/20 to-transparent -skew-x-12"
              aria-hidden
            />
            {/* Scroll & Hover Ambient Gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-gradient-to-br from-amber-500/18 via-amber-400/12 to-transparent dark:from-accent/20 dark:via-amber/12 transition-opacity duration-500 group-hover:!opacity-100 pointer-events-none"
              aria-hidden
            />
            <h3 className="font-display text-base font-bold text-ink dark:text-white relative z-10">Still have questions?</h3>
            <p className="mt-2 text-xs sm:text-sm text-body dark:text-slate-300 leading-relaxed font-medium relative z-10">
              Let&apos;s talk. Sometimes a 30-minute conversation brings more clarity than hours of research.
            </p>
            <div className="mt-5 relative z-10">
              <a
                href="/diagnosis"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-strong px-5 py-2.5 text-xs font-bold text-ink shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/40 active:scale-95"
              >
                <span>Book Your Founder Growth Diagnosis</span>
                <svg className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="group relative border-b border-black/[0.07] dark:border-white/10 first:border-t transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-400/15 hover:via-yellow-200/10 hover:to-transparent px-3 rounded-lg overflow-hidden"
              >
                {/* Mobile View Scroll Ambient Gold Gradient Overlay (sm:hidden: Mobile Only for both Light & Dark Theme) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.35 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.8 }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/15 via-amber-400/10 to-transparent dark:from-accent/20 dark:via-amber/12 rounded-lg sm:hidden"
                  aria-hidden
                />
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-base font-medium tracking-tight text-ink dark:text-white md:text-lg group-hover:text-amber-800 dark:group-hover:text-amber transition-colors duration-300">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`relative h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${isOpen ? "rotate-45 text-accent" : "text-ink/60"
                      }`}
                  >
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE_IN_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-base leading-relaxed text-body font-medium">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* mobile closing box */}
          <div className="mt-10 border-t border-black/[0.07] pt-8 text-center md:hidden">
            <h3 className="font-display text-lg font-bold text-ink">Still have questions?</h3>
            <p className="mt-2 text-sm text-body leading-relaxed font-medium">
              Let&apos;s talk. Sometimes a 30-minute conversation brings more clarity than hours of research.
            </p>
            <div className="mt-4 flex justify-center">
              <a
                href="/diagnosis"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-strong px-6 py-3.5 text-xs font-bold text-ink shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/40 active:scale-95"
              >
                <span>Book Your Founder Growth Diagnosis</span>
                <svg className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
