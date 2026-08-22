"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo3D from "@/components/ui/Logo3D";
import LogoEntrance from "@/components/ui/LogoEntrance";
import Magnetic from "@/components/ui/Magnetic";
import Marquee from "@/components/ui/Marquee";
import TextReveal from "@/components/ui/TextReveal";
import { usePreloaderDone } from "@/lib/preloader";
import { EASE_OUT_EXPO } from "@/lib/animations";

const SERVICES = [
  "Web Architecture",
  "Growth Marketing",
  "Brand Strategy",
  "AI & Automation",
  "Financial Strategy",
  "Enterprise Infrastructure",
  "Conversion Systems",
];

const DISCIPLINES = [
  { index: "01", name: "Web Architecture", x: -185, y: -140 },
  { index: "02", name: "Growth Marketing", x: 185, y: -145 },
  { index: "03", name: "Brand Strategy", x: -180, y: 10 },
  { index: "04", name: "AI & Automation", x: 175, y: 10 },
  { index: "05", name: "Financial Strategy", x: -170, y: 155 },
  { index: "06", name: "Enterprise Tech", x: 170, y: 155 },
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

/** Desktop breakpoint (lg) — decides which single hero visual gets mounted. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null); // null = pre-hydration
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/** Visual diagram — Logo3D hub with black indexed service tags */
function SystemMergeVisual({ play }: { play: boolean }) {
  const [logoSettled, setLogoSettled] = useState(false);

  return (
    <div className="relative flex h-[480px] w-full max-w-[540px] items-center justify-center">
      {/* Background ambient glow */}
      <div className="absolute h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute h-56 w-56 rounded-full bg-amber/15 blur-3xl" />

      {/* Hairline connectors toward the hub */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 540 480">
        {DISCIPLINES.map((d, i) => (
          <motion.line
            key={d.name}
            x1={270 + d.x * 0.85}
            y1={240 + d.y * 0.85}
            x2="270"
            y2="240"
            stroke="rgba(212, 175, 55, 0.35)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={play ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 + i * 0.08, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Central 3D ScaleXpertz monogram hub — depth → flip → settle */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="absolute left-1/2 top-[60%] h-14 w-60 -translate-x-1/2 rounded-[50%] bg-black/25 blur-2xl dark:bg-black/55" />
        <LogoEntrance
          play={play}
          variant="hero"
          className="relative aspect-[912/700] w-[280px]"
          onComplete={() => setLogoSettled(true)}
        >
          <Logo3D className="h-full w-full" float={logoSettled} />
        </LogoEntrance>
        <motion.p
          className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent"
          initial={{ opacity: 0, y: 8 }}
          animate={play ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 2.4, ease: EASE_OUT_EXPO }}
        >
          One Connected System
        </motion.p>
      </div>

      {/* Indexed black plates — no emoji, no glass pills */}
      {DISCIPLINES.map((d, i) => (
        <motion.div
          key={d.name}
          style={{ left: "50%", top: "50%" }}
          initial={{ opacity: 0, x: `calc(-50% + ${d.x * 1.25}px)`, y: `calc(-50% + ${d.y * 1.25}px)` }}
          animate={play ? { opacity: 1, x: `calc(-50% + ${d.x}px)`, y: `calc(-50% + ${d.y}px)` } : {}}
          transition={{
            duration: 0.9,
            delay: 0.35 + i * 0.08,
            ease: EASE_OUT_EXPO,
          }}
          className="absolute z-10 whitespace-nowrap"
        >
          <div className="flex items-baseline gap-2.5 border border-accent/40 bg-night px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
            <span className="font-mono text-[10px] font-bold tracking-[0.15em] text-accent">
              {d.index}
            </span>
            <span className="font-display text-xs font-semibold tracking-tight text-white whitespace-nowrap">
              {d.name}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const done = usePreloaderDone();
  const isDesktop = useIsDesktop();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  return (
    <section id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* Mouse-following spotlight aura (Scalisite style effect) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700 opacity-60 dark:opacity-75"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,175,55,0.075), transparent 80%)`,
        }}
      />

      {/* perspective grid floor: premium depth cue, masked away before the text zone */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-x-[-15%] bottom-[-5%] h-[36%] origin-bottom opacity-[0.06] dark:opacity-[0.12] [transform:perspective(900px)_rotateX(62deg)]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(212,175,55,0.9) 0 1px, transparent 1px 56px), repeating-linear-gradient(0deg, rgba(212,175,55,0.9) 0 1px, transparent 1px 56px)",
            maskImage: "linear-gradient(to top, black 15%, transparent 75%)",
            WebkitMaskImage: "linear-gradient(to top, black 15%, transparent 75%)",
          }}
        />
      </div>

      {/* background gradient graphics */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:right-[-4%] md:w-[54%]" aria-hidden>
        <div className="absolute right-[8%] top-[18%] h-[45vmin] w-[45vmin] rounded-full bg-accent/12 blur-3xl max-md:right-[-12%] max-md:top-[55%]" />
        <div className="absolute right-[28%] top-[48%] h-[28vmin] w-[28vmin] rounded-full bg-amber/12 blur-3xl max-md:left-[-8%] max-md:top-[72%]" />
        <div className="absolute right-[18%] top-[30%] hidden h-[34vmin] w-[34vmin] rounded-full bg-gold/10 blur-3xl md:block" />

        {/* Desktop System Merge Visual — geometry is 1:1 with its viewBox only at lg+ */}
        <div className="absolute inset-0 hidden items-center justify-center lg:flex">
          {isDesktop !== false && <SystemMergeVisual play={done} />}
        </div>
      </div>

      {/* below lg: faint 3D monogram centered behind the headline on mobile */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[10%] -translate-x-1/2 w-[260px] max-w-[75vw] opacity-[0.18] dark:opacity-[0.22] lg:hidden flex justify-center items-center">
        {isDesktop !== true && (
          <LogoEntrance play={done} variant="hero" className="aspect-[912/700] w-full">
            <Logo3D className="h-full w-full" glow={false} />
          </LogoEntrance>
        )}
      </div>

      {/* readability scrim: text column stays high-contrast over the 3D visual */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-paper via-paper/50 to-transparent lg:block" />

      {/* main hero content — centered on mobile, left-aligned from lg for desktop split */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-6 pb-16 pt-24 text-center md:px-12 md:pb-24 md:pt-28 lg:items-start lg:text-left">
        <FadeUp delay={0.15} play={done}>
          <p className="font-[family-name:var(--font-playfair)] italic font-semibold text-lg sm:text-xl md:text-2xl tracking-wide text-accent dark:text-amber">
            <span className="mr-3 not-italic text-amber font-bold">✦</span>
            The all-in-one growth partner
          </p>
        </FadeUp>

        {/* Line by line animated headline */}
        <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink md:mt-6">
          <TextReveal as="span" className="block text-ink dark:text-white" text="Your Next Hire" play={done} delay={0.2} />
          <TextReveal as="span" className="block text-ink/85 dark:text-white/90" text="Should Be" play={done} delay={0.5} />
          <TextReveal as="span" className="mt-1 block text-accent dark:text-amber" text="Your Last Agency." play={done} delay={0.8} />
        </h1>

        {/* Subheadline appears after headline reveal */}
        <FadeUp delay={1.8} play={done}>
          <div className="mt-5 max-w-2xl md:mt-6 lg:max-w-3xl">
            <p className="font-display text-base font-bold text-ink dark:text-white sm:text-lg">
              Every new agency solves one problem. And creates another to manage.
            </p>
            <p className="mt-2.5 text-base leading-relaxed text-body dark:text-slate-300 sm:text-lg font-medium">
              ScaleXpertz brings strategy, branding, websites, marketing, AI and execution under one team—so you can focus on growing your business instead of coordinating it.
            </p>
          </div>
        </FadeUp>

        {/* Primary and Secondary CTAs */}
        <FadeUp delay={2.1} play={done} className="mt-8 md:mt-10 max-w-full">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6 lg:items-start">
            <a
              href="/diagnosis"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-accent via-amber to-accent bg-[length:200%_auto] px-8 py-4 text-base font-extrabold text-ink shadow-xl shadow-accent/25 transition-all duration-500 hover:bg-[position:right_center] hover:scale-[1.03] hover:shadow-2xl hover:shadow-accent/40 active:scale-95 group"
            >
              <span>Book a Strategy Call</span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="#services"
              className="group inline-flex items-center gap-3 font-medium text-ink dark:text-white self-center py-2 lg:self-center"
            >
              <span className="relative text-base font-semibold">
                See How We Work
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink dark:bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </span>
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-ink/15 dark:border-white/20 transition-colors duration-300 group-hover:border-ink/40 dark:group-hover:border-white/50">
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
          <div className="mt-6 flex items-center justify-center lg:justify-start">
            <span className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-accent/30 dark:border-amber/35 bg-accent/10 dark:bg-amber/10 px-4 py-1.5 font-[family-name:var(--font-jakarta)] text-xs sm:text-sm font-extrabold uppercase tracking-[0.15em] sm:tracking-[0.25em] text-accent dark:text-amber shadow-sm backdrop-blur-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-amber animate-pulse" />
              <span className="truncate">One Team. Every Growth Solution.</span>
            </span>
          </div>
        </FadeUp>

      </div>



      {/* services marquee */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 border-t border-black/[0.05] dark:border-white/10 bg-white/80 dark:bg-[#0c0c0e]/90 backdrop-blur-md"
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
