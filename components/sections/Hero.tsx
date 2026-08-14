"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Magnetic from "@/components/ui/Magnetic";
import Marquee from "@/components/ui/Marquee";
import TextReveal from "@/components/ui/TextReveal";
import { usePreloaderDone } from "@/lib/preloader";
import { EASE_OUT_EXPO } from "@/lib/animations";

const SERVICES = [
  "Web Development",
  "App Development",
  "Digital Marketing",
  "Finance & Accounting",
  "Branding & Design",
  "AI Solutions",
];

const DISCIPLINES = [
  { name: "Website", x: -140, y: -90, icon: "🌐" },
  { name: "Marketing", x: 120, y: -100, icon: "📈" },
  { name: "Branding", x: -160, y: 10, icon: "🎨" },
  { name: "AI", x: 150, y: 10, icon: "🤖" },
  { name: "Finance", x: -110, y: 110, icon: "💰" },
  { name: "Technology", x: 110, y: 110, icon: "⚙️" },
];

function FadeUp({
  children,
  delay,
  play,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  play: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={play ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Visual diagram showing floating disciplines merging into ScaleXpertz */
function SystemMergeVisual() {
  return (
    <div className="relative flex h-[480px] w-full max-w-[540px] items-center justify-center">
      {/* Background ambient glow */}
      <div className="absolute h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute h-56 w-56 rounded-full bg-amber/15 blur-3xl" />

      {/* Outer converging dashed circle */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 540 480">
        <circle
          cx="270"
          cy="240"
          r="180"
          fill="none"
          stroke="rgba(10,10,10,0.08)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        {/* Connecting lines towards central ScaleXpertz node */}
        {DISCIPLINES.map((d, i) => (
          <motion.line
            key={d.name}
            x1={270 + d.x * 0.95}
            y1={240 + d.y * 0.95}
            x2="270"
            y2="240"
            stroke="rgba(79, 70, 229, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.8 + i * 0.1, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Central ScaleXpertz hub node */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.6, ease: EASE_OUT_EXPO }}
        className="z-10 flex flex-col items-center justify-center rounded-3xl border border-accent/30 bg-white/90 px-7 py-5 shadow-2xl backdrop-blur-xl"
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
          One Connected System
        </span>
        <span className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
          ScaleXpertz<span className="text-amber">.</span>
        </span>
      </motion.div>

      {/* Floating separate discipline nodes */}
      {DISCIPLINES.map((d, i) => (
        <motion.div
          key={d.name}
          initial={{ opacity: 0, x: d.x * 1.3, y: d.y * 1.3 }}
          animate={{
            opacity: 1,
            x: d.x,
            y: d.y,
          }}
          transition={{
            duration: 1,
            delay: 0.3 + i * 0.1,
            ease: EASE_OUT_EXPO,
          }}
          className="absolute z-10"
        >
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="flex items-center gap-2 rounded-2xl border border-black/[0.08] bg-white/80 px-4 py-2.5 shadow-card backdrop-blur-md transition-all hover:scale-105 hover:border-accent hover:shadow-card-hover"
          >
            <span className="text-base">{d.icon}</span>
            <span className="font-display text-xs font-semibold tracking-tight text-ink">
              {d.name}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const done = usePreloaderDone();

  return (
    <section id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* background gradient graphics */}
      <div className="absolute inset-y-0 right-0 w-full md:right-[-4%] md:w-[54%]" aria-hidden>
        <div className="absolute right-[8%] top-[18%] h-[45vmin] w-[45vmin] rounded-full bg-accent/12 blur-3xl max-md:right-[-12%] max-md:top-[55%]" />
        <div className="absolute right-[28%] top-[48%] h-[28vmin] w-[28vmin] rounded-full bg-amber/12 blur-3xl max-md:left-[-8%] max-md:top-[72%]" />

        {/* Desktop System Merge Visual */}
        <div className="absolute inset-0 hidden items-center justify-center md:flex">
          <SystemMergeVisual />
        </div>
      </div>

      {/* main hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 pb-28 pt-24 md:px-12 md:pb-40 md:pt-32">
        <FadeUp delay={0.15} play={done}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/60">
            <span className="mr-3 text-amber">✦</span>
            The all-in-one growth partner
          </p>
        </FadeUp>

        {/* Line by line animated headline */}
        <h1 className="mt-5 font-display text-[clamp(2.5rem,7.5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-ink md:mt-8">
          <TextReveal as="span" className="block" text="Your Next Hire" play={done} delay={0.2} />
          <TextReveal as="span" className="block text-ink/80" text="Should Be" play={done} delay={0.5} />
          <TextReveal as="span" className="block text-accent" text="Your Last Agency." play={done} delay={0.8} />
        </h1>

        {/* Subheadline appears after 1s pause following headline reveal */}
        <FadeUp delay={1.8} play={done}>
          <div className="mt-6 max-w-xl md:mt-8">
            <p className="font-display text-base font-semibold text-ink md:text-lg">
              Every new agency solves one problem. And creates another to manage.
            </p>
            <p className="mt-2 text-base leading-relaxed text-body md:text-lg">
              ScaleXpertz brings strategy, branding, websites, marketing, AI and execution under one team—so you can focus on growing your business instead of coordinating it.
            </p>
          </div>
        </FadeUp>

        {/* Primary and Secondary CTAs */}
        <FadeUp delay={2.1} play={done} className="mt-8 md:mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex flex-col items-start gap-1">
              <Magnetic>
                <a
                  href="#diagnosis"
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent via-indigo-600 to-accent bg-[length:200%_auto] px-8 py-4 text-base font-bold text-white shadow-xl shadow-accent/25 transition-all duration-500 hover:bg-[position:right_center] hover:scale-105 hover:shadow-2xl hover:shadow-accent/40 active:scale-95 group"
                >
                  Book a Strategy Call
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Magnetic>
              <span className="pl-3 font-mono text-[11px] text-ink/50">
                Usually replies within one business day.
              </span>
            </div>

            <a
              href="#services"
              className="group inline-flex items-center gap-3 font-medium text-ink self-start sm:self-center py-2"
            >
              <span className="relative text-base font-semibold">
                See How We Work
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </span>
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-ink/15 transition-colors duration-300 group-hover:border-ink/40">
                <svg
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-[3px]"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 8h11M9 3.5 13.5 8 9 12.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>

          {/* Trust line below CTA */}
          <div className="mt-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-amber">
            <span className="h-2 w-2 rounded-full bg-amber" />
            One Team. Every Growth Solution.
          </div>
        </FadeUp>

        {/* Mobile Visual */}
        <FadeUp delay={1.2} play={done} className="mt-12 md:hidden">
          <div aria-hidden className="relative mx-auto flex w-full max-w-sm flex-wrap items-center justify-center gap-2.5 rounded-2xl border border-black/[0.08] bg-surface/80 p-5 shadow-card backdrop-blur-md">
            <p className="w-full text-center font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
              Everything merges into ScaleXpertz:
            </p>
            {DISCIPLINES.map((d) => (
              <span
                key={d.name}
                className="flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm"
              >
                <span>{d.icon}</span>
                <span>{d.name}</span>
              </span>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="pointer-events-none absolute bottom-24 left-6 z-10 hidden flex-col items-center gap-3 md:left-12 md:flex"
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.3 }}
        aria-hidden
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-ink/10">
          <span className="animate-scroll-line absolute inset-0 bg-ink" />
        </span>
      </motion.div>

      {/* services marquee */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 border-t border-black/[0.05] bg-white/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <Marquee speed={70} className="py-4">
          {SERVICES.map((s) => (
            <span key={s} className="flex items-center">
              <span className="mx-6 font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
                {s}
              </span>
              <span className="text-xs text-amber" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
