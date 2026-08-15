"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Eyebrow from "@/components/ui/Eyebrow";
import { EASE_OUT_EXPO } from "@/lib/animations";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const STEPS = [
  {
    number: "01",
    title: "Discover",
    text: "We map your business, customers, and numbers before anything gets designed. Strategy first — every service starts from the same brief.",
    hex: "#d4af37",
    tags: ["Workshops", "Audit", "One brief"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 md:h-14 md:w-14" aria-hidden>
        <circle cx="10.5" cy="10.5" r="6.5" {...stroke} />
        <path d="M15.3 15.3 20 20" {...stroke} />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design",
    text: "Brand, product, and campaign design happen together, so what your customers see is one coherent story across every touchpoint.",
    hex: "#f59e0b",
    tags: ["Brand", "UX flows", "Prototype"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 md:h-14 md:w-14" aria-hidden>
        <path d="M4 20 4.7 16.2 15.5 5.4a1.8 1.8 0 0 1 2.5 0l1.6 1.6a1.8 1.8 0 0 1 0 2.5L8.8 20.3 4 20Z" {...stroke} />
        <path d="M13.8 7.1 17.9 11.2" {...stroke} />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Build",
    text: "Websites, apps, automations, and reporting pipelines — engineered by one team on one timeline, shipping in weekly increments.",
    hex: "#0891b2",
    tags: ["Weekly ships", "QA", "Automation"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 md:h-14 md:w-14" aria-hidden>
        <path
          d="M14.7 9.3a3 3 0 0 1-3.9 3.9L5 19l-2-2 5.8-5.8a3 3 0 0 1 3.9-3.9l-2.2 2.2 1.2 1.2 2.2-2.2Z"
          {...stroke}
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Scale",
    text: "Launch is the starting line. We run growth loops, tune performance, and keep the books clean while you compound.",
    hex: "#db2777",
    tags: ["Growth loops", "Analytics", "Clean books"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 md:h-14 md:w-14" aria-hidden>
        <path d="M4 18v-4l5-2 3 3 5-7 3 2" {...stroke} />
        <path d="M17 8h3v3" {...stroke} />
      </svg>
    ),
  },
];

/**
 * Desktop: pinned section — vertical scroll scrubs horizontal movement through
 * four oversized panels with a progress line. Mobile / reduced motion:
 * vertical stacked cards with standard reveals.
 */
export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const track = trackRef.current!;
        const getDist = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -getDist(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + getDist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current)
                progressRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section id="process" className="scroll-mt-24">
      <div ref={sectionRef} className="relative overflow-hidden md:h-svh">
        {/* header + progress line (stays put while pinned) */}
        <div className="mx-auto flex max-w-[1440px] items-end justify-between px-6 pt-24 md:px-12">
          <div>
            <Eyebrow index="03" label="How we work" />
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">
              From brief to compounding growth.
            </h2>
          </div>
          <p className="hidden font-mono text-xs uppercase tracking-[0.25em] text-ink/40 md:block">
            Scroll →
          </p>
        </div>
        <div className="mx-auto mt-8 hidden max-w-[1440px] px-6 md:block md:px-12">
          <span className="block h-px w-full bg-black/[0.08]">
            <span
              ref={progressRef}
              className="block h-full origin-left scale-x-0 bg-accent"
            />
          </span>
        </div>

        {/* panels */}
        <div
          ref={trackRef}
          className="mt-12 flex flex-col gap-6 px-6 pb-24 md:mt-16 md:h-[60vh] md:w-max md:flex-row md:gap-0 md:px-0 md:pb-0"
        >
          {STEPS.map((s, i) => (
            <motion.article
              key={s.number}
              className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/[0.06] bg-surface p-8 shadow-card md:mx-6 md:h-full md:w-[62vw] md:max-w-[820px] md:flex-row md:items-end md:p-14 lg:first:ml-[max(3rem,calc((100vw-1440px)/2+3rem))]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: (i % 2) * 0.05 }}
            >
              {/* per-step color washes */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(55% 60% at 100% 0%, ${s.hex}21 0%, transparent 70%), radial-gradient(45% 50% at 0% 100%, ${s.hex}12 0%, transparent 70%)`,
                }}
              />
              {/* dotted texture */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(rgb(10 10 10 / 0.05) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              {/* soft blob behind the icon corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full"
                style={{ background: `${s.hex}14` }}
              />

              {/* step counter */}
              <span className="absolute right-8 top-8 font-mono text-xs tracking-[0.2em] text-ink/40 md:right-10 md:top-10">
                {s.number} / 0{STEPS.length}
              </span>

              <div className="relative">
                <span
                  aria-hidden
                  className="block font-display text-[6rem] font-bold leading-none md:text-[11rem]"
                  style={{ WebkitTextStroke: `1.5px ${s.hex}59`, color: "transparent" }}
                >
                  {s.number}
                </span>
                <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-body">{s.text}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em]"
                      style={{
                        borderColor: `${s.hex}40`,
                        color: s.hex,
                        background: `${s.hex}0d`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* icon shape */}
              <div
                aria-hidden
                className="relative mt-10 flex h-24 w-24 shrink-0 items-center justify-center md:mt-0 md:h-36 md:w-36"
                style={{
                  borderRadius: i % 2 ? "50% 50% 50% 12%" : "12% 50% 50% 50%",
                  background: `linear-gradient(135deg, ${s.hex}2e 0%, ${s.hex}0f 100%)`,
                  color: s.hex,
                }}
              >
                {s.icon}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
