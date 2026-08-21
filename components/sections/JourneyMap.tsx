"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Eyebrow from "@/components/ui/Eyebrow";
import { EASE_OUT_EXPO } from "@/lib/animations";

const STAGES = [
  {
    letter: "S",
    week: "Phase 01",
    title: "Strategy",
    tagline: "Clarity Before Commitment.",
    paragraphs: [
      "Every successful Growth Sprint™ starts with understanding your business—not assumptions.",
      "We identify growth bottlenecks, define your market position, and create a roadmap tailored to your goals.",
    ],
    includes: [
      "Founder Growth Diagnosis™",
      "Business & Market Audit",
      "Competitor Analysis",
      "Brand Positioning Strategy",
      "Customer Research",
      "Growth Roadmap",
      "Sprint Planning",
      "Success Metrics & KPIs",
    ],
    outcome: "A clear strategic direction before execution begins.",
  },
  {
    letter: "C",
    week: "Phase 02",
    title: "Create",
    tagline: "Build What Growth Demands.",
    paragraphs: [
      "Strategy means nothing without execution.",
      "This phase builds the assets, systems, and digital infrastructure your business needs to grow with confidence.",
    ],
    includes: [
      "Brand Identity & Messaging",
      "Website / Landing Pages",
      "Content Strategy",
      "Creative Design System",
      "Social Media Assets",
      "Sales Funnels",
      "CRM & Digital Infrastructure",
      "Automation Foundations",
    ],
    outcome: "A business equipped with everything required to execute at scale.",
  },
  {
    letter: "A",
    week: "Phase 03",
    title: "Accelerate",
    tagline: "Execution With Momentum.",
    paragraphs: [
      "This is where your growth systems go live.",
      "Campaigns launch, automation begins, and every initiative is monitored, tested, and improved.",
    ],
    includes: [
      "Performance Marketing",
      "Meta & Google Advertising",
      "Lead Generation Systems",
      "Sales Optimisation",
      "AI Workflow Automation",
      "Conversion Optimisation",
      "Performance Tracking",
      "Weekly Growth Reviews",
    ],
    outcome: "Predictable momentum driven by measurable execution.",
  },
  {
    letter: "L",
    week: "Phase 04",
    title: "Lead",
    tagline: "Earn Trust. Own Your Category.",
    paragraphs: [
      "Growth is no longer about visibility alone.",
      "It's about becoming the business customers remember, trust, and choose.",
    ],
    includes: [
      "Founder Personal Branding",
      "Authority Building",
      "Community Growth",
      "Reputation Management",
      "Customer Experience Optimisation",
      "Strategic Partnerships",
      "Trust & Credibility Systems",
      "Brand Leadership Initiatives",
    ],
    outcome: "A stronger market position built on trust and authority.",
  },
  {
    letter: "E",
    week: "Phase 05",
    title: "Evolve",
    tagline: "Because Growth Never Stands Still.",
    paragraphs: [
      "The sprint doesn't end at launch.",
      "We analyse performance, optimise every system, and prepare your business for the next stage of growth.",
    ],
    includes: [
      "Performance Analysis",
      "Growth Optimisation",
      "AI Enhancements",
      "Process Improvements",
      "Documentation",
      "Future Growth Strategy",
      "Scale Recommendations",
      "Continuous Support & Refinement",
    ],
    outcome: "A business designed to improve, adapt, and scale continuously.",
  },
];

/** Where each stage node sits along the route, as a fraction of path length. */
const NODE_T = [0.04, 0.27, 0.5, 0.73, 0.96];

const ROUTES = {
  desktop: {
    w: 1200,
    h: 640,
    d: "M 70 520 C 210 420 260 610 430 520 C 560 450 520 300 650 250 C 760 210 830 330 950 320 C 1060 310 1110 220 1130 120",
  },
  mobile: {
    w: 390,
    h: 1500,
    d: "M 80 60 C 300 130 330 240 200 330 C 70 420 60 550 200 640 C 340 730 330 870 195 950 C 60 1030 60 1170 205 1255 C 330 1330 310 1420 190 1450",
  },
} as const;

type Variant = keyof typeof ROUTES;
type Pt = { x: number; y: number };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Flag({ at, label, tone }: { at: Pt; label: string; tone: string }) {
  return (
    <g transform={`translate(${at.x} ${at.y})`} className={tone}>
      <path d="M0 -6 V-30 M0 -30 h14 l-4 5 4 5 h-14" {...stroke} />
      <text
        y={16}
        textAnchor="middle"
        fontSize={9}
        className="fill-current font-mono uppercase tracking-[0.2em]"
      >
        {label}
      </text>
    </g>
  );
}

/* ---------- graph / growth backdrop (telemetry metrics & reticles) ---------- */

function TechGrid({ w, h }: { w: number; h: number }) {
  const xs = Array.from({ length: Math.floor(w / 56) + 1 }, (_, i) => i * 56);
  const ys = Array.from({ length: Math.floor(h / 56) + 1 }, (_, i) => i * 56);
  return (
    <g className="text-white/25 dark:text-slate-300/30" aria-hidden>
      {xs.map((x) => (
        <line key={`vx-${x}`} x1={x} y1={0} x2={x} y2={h} stroke="currentColor" strokeWidth={0.9} strokeDasharray="3 6" />
      ))}
      {ys.map((y) => (
        <line key={`hy-${y}`} x1={0} y1={y} x2={w} y2={y} stroke="currentColor" strokeWidth={0.9} strokeDasharray="3 6" />
      ))}
      {xs.filter((_, idx) => idx % 2 === 0).map((x) =>
        ys.filter((_, idy) => idy % 2 === 0).map((y) => (
          <g key={`cross-${x}-${y}`} transform={`translate(${x} ${y})`}>
            <line x1={-4} y1={0} x2={4} y2={0} stroke="currentColor" strokeWidth={1.2} />
            <line x1={0} y1={-4} x2={0} y2={4} stroke="currentColor" strokeWidth={1.2} />
          </g>
        ))
      )}
    </g>
  );
}

function TelemetryChip({ x, y, label, value, badge }: { x: number; y: number; label: string; value: string; badge?: string }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden>
      <rect
        width={108}
        height={44}
        rx={10}
        className="fill-slate-900/90 dark:fill-slate-900/95 stroke-amber/40 dark:stroke-amber/50 shadow-xl backdrop-blur-md"
        strokeWidth={1.2}
      />
      <circle cx={14} cy={17} r={3.5} className="fill-amber animate-pulse" />
      <text x={24} y={19} fontSize={8.5} className="fill-amber font-sans uppercase tracking-widest font-bold">
        {label}
      </text>
      <text x={14} y={35} fontSize={13.5} className="fill-white font-display font-extrabold tracking-tight">
        {value}
      </text>
      {badge && (
        <text x={96} y={34} textAnchor="end" fontSize={9} className="fill-amber font-mono font-bold">
          {badge}
        </text>
      )}
    </g>
  );
}

function TargetCrosshair({ x, y, code }: { x: number; y: number; code: string }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden className="text-amber/80">
      <circle r={18} fill="none" stroke="currentColor" strokeWidth={1.2} strokeDasharray="3 3" />
      <circle r={3.5} fill="currentColor" opacity={0.9} />
      <line x1={-24} y1={0} x2={24} y2={0} stroke="currentColor" strokeWidth={1.2} />
      <line x1={0} y1={-24} x2={0} y2={24} stroke="currentColor" strokeWidth={1.2} />
      <text x={24} y={-8} fontSize={8.5} className="fill-amber font-mono font-bold uppercase tracking-wider">
        {code}
      </text>
    </g>
  );
}

function PulseRings({ x, y, radius = 32 }: { x: number; y: number; radius?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden>
      <circle r={radius} fill="none" className="stroke-amber/40" strokeWidth={1.2} strokeDasharray="4 6" />
      <circle r={radius * 1.6} fill="none" className="stroke-amber/25" strokeWidth={1.2} strokeDasharray="2 8" />
    </g>
  );
}

/** Telemetry & metric backdrop behind the route graph. */
function MapDoodles({ variant }: { variant: Variant }) {
  if (variant === "desktop") {
    return (
      <g aria-hidden>
        <TechGrid w={1200} h={640} />

        {/* Curved telemetry wave background */}
        <path
          d="M 30 580 Q 250 520 450 490 T 850 280 T 1170 120"
          fill="none"
          className="stroke-amber/40"
          strokeWidth={1.8}
          strokeDasharray="4 8"
          strokeLinecap="round"
        />

        <PulseRings x={430} y={520} radius={36} />
        <PulseRings x={950} y={320} radius={44} />

        <TargetCrosshair x={240} y={110} code="STRAT-01" />
        <TargetCrosshair x={880} y={480} code="SCALE-90" />

        <TelemetryChip x={130} y={60} label="Conversion" value="+4.8%" badge="↑ 3x" />
        <TelemetryChip x={430} y={70} label="MRR Scale" value="$125k" badge="98%" />
        <TelemetryChip x={960} y={40} label="ROAS Peak" value="4.8x" badge="MAX" />
        <TelemetryChip x={710} y={490} label="CAC Drop" value="-52%" badge="⚡" />
        <TelemetryChip x={180} y={380} label="LTV : CAC" value="9.2x" badge="OPT" />
      </g>
    );
  }

  return (
    <g aria-hidden>
      <TechGrid w={390} h={1500} />

      <path
        d="M 40 80 Q 200 300 120 600 T 260 1000 T 180 1440"
        fill="none"
        className="stroke-amber/40"
        strokeWidth={1.8}
        strokeDasharray="4 8"
        strokeLinecap="round"
      />

      <PulseRings x={200} y={330} radius={28} />
      <PulseRings x={195} y={950} radius={34} />

      <TargetCrosshair x={80} y={220} code="T-01" />
      <TargetCrosshair x={310} y={780} code="T-02" />

      <TelemetryChip x={40} y={40} label="Conversion" value="+4.8%" badge="↑" />
      <TelemetryChip x={240} y={560} label="ROAS Peak" value="4.8x" badge="MAX" />
      <TelemetryChip x={40} y={1320} label="CAC Drop" value="-52%" badge="⚡" />
    </g>
  );
}

/** Inline stage popover — anchored to a graph node, not a fullscreen modal. */
function StagePopover({
  stage,
  side,
  left,
  top,
  onClose,
}: {
  stage: (typeof STAGES)[number];
  side: "above" | "below";
  left: string;
  top: string;
  onClose: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (cardRef.current?.contains(target)) return;
      if (target instanceof Element && target.closest("[data-stage-hit]")) return;
      onClose();
    };
    window.addEventListener("keydown", onKey);
    // Delay so the opening click does not immediately close.
    const t = window.setTimeout(() => {
      document.addEventListener("mousedown", onPointer);
      document.addEventListener("touchstart", onPointer);
    }, 0);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [onClose]);

  const caret =
    side === "below"
      ? "-top-[5px] left-1/2 -ml-[5px] border-t border-l"
      : "-bottom-[5px] left-1/2 -ml-[5px] border-b border-r";

  // Position via motion x/y so Framer does not overwrite CSS transform.
  const yRest = side === "above" ? "-100%" : 0;

  return (
    <motion.div
      ref={cardRef}
      role="dialog"
      aria-labelledby="scale-stage-title"
      initial={{ opacity: 0, scale: 0.92, x: "-50%", y: side === "above" ? "calc(-100% + 8px)" : -8 }}
      animate={{ opacity: 1, scale: 1, x: "-50%", y: yRest }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
      style={{ left, top, transformOrigin: side === "below" ? "top center" : "bottom center" }}
      className="pointer-events-auto absolute z-30 w-[min(520px,92vw)] overflow-hidden rounded-xl border border-white/12 bg-[#16161a] shadow-[0_16px_48px_rgba(0,0,0,0.5)] max-md:w-[min(360px,92vw)]"
    >
      <span
        aria-hidden
        className={`absolute h-[10px] w-[10px] rotate-45 border-white/12 bg-[#16161a] ${caret}`}
      />
      <div className="max-h-[min(560px,78vh)] overflow-y-auto p-6 max-md:max-h-[min(480px,68vh)] max-md:p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          {stage.week} · {stage.letter}
        </p>
        <h3
          id="scale-stage-title"
          className="mt-2 font-display text-2xl font-semibold tracking-tight text-white md:text-[1.75rem]"
        >
          {stage.title}
        </h3>
        <p className="mt-2 text-[15px] font-medium text-white/90">{stage.tagline}</p>
        <div className="mt-3 space-y-2.5">
          {stage.paragraphs.map((p) => (
            <p key={p} className="text-[15px] leading-relaxed text-white/65">
              {p}
            </p>
          ))}
        </div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          What&apos;s Included
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
          {stage.includes.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-snug text-white/70">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-white/10 pt-4 text-[15px] leading-relaxed text-white/80">
          <span className="font-medium text-accent">Outcome: </span>
          {stage.outcome}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * One journey scene (header + map). The route is a single SVG path; node
 * positions are sampled from it at runtime so markers always sit exactly on
 * the road. Clicking a SCALE letter moves the traveler to that node and opens
 * an inline popover anchored to the stage.
 */
function JourneyScene({ variant }: { variant: Variant }) {
  const route = ROUTES[variant];
  const isDesktop = variant === "desktop";

  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const travelerRef = useRef<SVGGElement>(null);
  const pathLenRef = useRef(0);
  const progressPRef = useRef(0);
  const travelTweenRef = useRef<gsap.core.Tween | null>(null);

  const [points, setPoints] = useState<{ nodes: Pt[]; start: Pt; end: Pt } | null>(null);
  const [active, setActive] = useState(-1);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const closePopover = useCallback(() => setSelectedStage(null), []);

  const applyProgress = useCallback((p: number) => {
    const path = pathRef.current;
    const progress = progressRef.current;
    const traveler = travelerRef.current;
    const L = pathLenRef.current;
    if (!path || !progress || !traveler || !L) return;

    const clamped = Math.max(0, Math.min(1, p));
    progressPRef.current = clamped;
    const len = clamped * L;
    gsap.set(progress, { strokeDashoffset: L - len });
    const pt = path.getPointAtLength(len);
    const ahead = path.getPointAtLength(Math.min(len + 2, L));
    const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
    gsap.set(traveler, { x: pt.x, y: pt.y, rotation: angle, transformOrigin: "center" });
  }, []);

  const travelToStage = useCallback(
    (i: number) => {
      const target = NODE_T[i];
      const from = progressPRef.current;
      travelTweenRef.current?.kill();

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced || Math.abs(target - from) < 0.001) {
        applyProgress(target);
        setActive(i);
        return;
      }

      const proxy = { p: from };
      travelTweenRef.current = gsap.to(proxy, {
        p: target,
        duration: Math.min(2.2, 0.7 + Math.abs(target - from) * 1.6),
        ease: "power2.inOut",
        onUpdate() {
          applyProgress(proxy.p);
        },
        onComplete() {
          setActive(i);
        },
      });
      // Highlight destination immediately so nodes light up during travel.
      setActive(i);
    },
    [applyProgress],
  );

  const onStageClick = useCallback(
    (i: number) => {
      travelToStage(i);
      setSelectedStage((prev) => (prev === i ? null : i));
    },
    [travelToStage],
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // Sample path geometry once and sync scroll progress on graph section scroll
  useEffect(() => {
    const path = pathRef.current;
    const progress = progressRef.current;
    const traveler = travelerRef.current;
    if (!path || !progress || !traveler) return;

    const L = path.getTotalLength();
    pathLenRef.current = L;
    const at = (f: number) => {
      const p = path.getPointAtLength(f * L);
      return { x: p.x, y: p.y };
    };
    setPoints({ nodes: NODE_T.map(at), start: at(0), end: at(1) });
    gsap.set(progress, { strokeDasharray: L, strokeDashoffset: L });
    applyProgress(0);

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // Progress stays STRICTLY 0 (Strategy) until user actually reaches the graph in the viewport
      const scrollStart = vh * 0.35;
      const scrollEnd = -rect.height + vh * 0.7;
      const totalDistance = scrollStart - scrollEnd;
      if (totalDistance <= 0) return;

      const scrolled = scrollStart - rect.top;
      const rawP = Math.max(0, Math.min(1, scrolled / totalDistance));
      // Smooth slow easing curve
      const progressP = Math.pow(rawP, 1.4);

      applyProgress(progressP);

      let currentActive = 0;
      for (let i = 0; i < NODE_T.length; i++) {
        if (progressP >= NODE_T[i] - 0.08) currentActive = i;
      }
      setActive(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      travelTweenRef.current?.kill();
    };
  }, [applyProgress, isDesktop]);

  const pct = (v: number, total: number) => (v / total) * 100;

  return (
    <div
      ref={containerRef}
      className={
        isDesktop
          ? "relative mx-auto w-full max-w-[1440px] px-12 py-10 md:py-14"
          : "px-6 py-10"
      }
    >
      {/* header */}
      <div className="mx-auto max-w-4xl text-center flex flex-col items-center justify-center">
        <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-ink dark:text-white sm:text-4xl md:text-5xl">
          02 — The Proprietary SCALE Framework™
        </h2>
        <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-accent dark:text-amber sm:text-2xl md:text-3xl">
          From Strategy to Evolve.
        </h3>
      </div>

      {/* map */}
      <div className={isDesktop ? "mt-12 flex items-center justify-center" : "mt-10"}>
        <div
          className="relative w-full rounded-[32px] border border-slate-700/50 dark:border-indigo-500/35 bg-[#141624] dark:bg-[#1a1c30] p-2 shadow-2xl transition-colors duration-300"
          style={{
            aspectRatio: `${route.w} / ${route.h}`,
            ...(isDesktop && {
              width: `min(100%, calc((100svh - 280px) * ${route.w / route.h}))`,
            }),
          }}
        >
          <svg
            viewBox={`0 0 ${route.w} ${route.h}`}
            className="h-full w-full"
            aria-hidden
          >
            <defs>
              <clipPath id={`journey-clip-${variant}`}>
                <rect width={route.w} height={route.h} rx={28} />
              </clipPath>
              <linearGradient id="scale-route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="25%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="75%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <g clipPath={`url(#journey-clip-${variant})`}>
              {/* high contrast dark navy command-center backdrop matching theme */}
              <rect
                width={route.w}
                height={route.h}
                rx={28}
                className="fill-[#141624] dark:fill-[#1a1c30]"
              />
              <rect
                width={route.w}
                height={route.h}
                rx={28}
                className="fill-amber/[0.05]"
              />
              <rect
                x={0.75}
                y={0.75}
                width={route.w - 1.5}
                height={route.h - 1.5}
                rx={28}
                fill="none"
                className="stroke-amber/30"
                strokeWidth={1.5}
              />

              <MapDoodles variant={variant} />

              {/* glowing route path + vibrant linear gradient traveled line */}
              <path
                ref={pathRef}
                d={route.d}
                stroke="rgba(255, 255, 255, 0.2)"
                fill="none"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray="4 8"
              />
              <path
                ref={progressRef}
                d={route.d}
                stroke="url(#scale-route-gradient)"
                fill="none"
                strokeWidth={4.5}
                strokeLinecap="round"
              />

              {points && (
                <>
                  <Flag at={points.start} label="Strategy" tone="text-amber" />
                  <Flag at={points.end} label="Evolve" tone="text-emerald-400" />
                  {points.nodes.map((n, i) => {
                    const reached = i <= active;
                    const stageLabels = [
                      "S · STRATEGY",
                      "C · CREATE",
                      "A · ACCELERATE",
                      "L · LEAD",
                      "E · EVOLVE",
                    ];
                    return (
                      <g key={STAGES[i].letter} transform={`translate(${n.x} ${n.y})`}>
                        <circle
                          r={32}
                          className={`fill-amber/20 origin-center transition-transform duration-500 [transform-box:fill-box] ${
                            i === active ? "scale-100 animate-pulse" : "scale-0"
                          }`}
                        />
                        <circle
                          r={16}
                          className={`transition-all duration-500 ${
                            reached
                              ? "fill-amber stroke-white stroke-2 shadow-lg"
                              : "fill-[#141520] stroke-white/40"
                          }`}
                          strokeWidth={2}
                        />
                        <text
                          y={5}
                          textAnchor="middle"
                          fontSize={12}
                          className={`font-display font-extrabold transition-colors duration-500 ${
                            reached ? "fill-slate-950 font-black" : "fill-white/80"
                          }`}
                        >
                          {STAGES[i].letter}
                        </text>
                        {/* SCALE Motto Milestone Chip */}
                        <g transform="translate(0 34)">
                          <rect
                            x={-48}
                            y={-10}
                            width={96}
                            height={20}
                            rx={6}
                            className={
                              reached
                                ? "fill-slate-900/95 stroke-amber/60 shadow-md"
                                : "fill-slate-900/70 stroke-white/20"
                            }
                            strokeWidth={1}
                          />
                          <text
                            y={4}
                            textAnchor="middle"
                            fontSize={8.5}
                            className={`font-mono font-bold uppercase tracking-wider ${
                              reached ? "fill-amber" : "fill-white/60"
                            }`}
                          >
                            {stageLabels[i]}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </>
              )}

              {/* traveler */}
              <g
                ref={travelerRef}
                style={{ visibility: points ? "visible" : "hidden" }}
              >
                <circle r={17} className="fill-white dark:fill-ink" />
                <circle
                  r={21}
                  fill="none"
                  className="stroke-white/30 dark:stroke-black/20"
                />
                <path
                  d="M -6 5.5 L 9 0 L -6 -5.5 L -2.5 0 Z"
                  className="fill-[#0c0c0e] dark:fill-surface"
                />
              </g>
            </g>
          </svg>

          {/* Node hit targets + click popover */}
          {points && (
            <div className="absolute inset-0">
              {points.nodes.map((n, i) => (
                <button
                  key={`hit-${STAGES[i].letter}`}
                  type="button"
                  data-stage-hit
                  aria-label={`${selectedStage === i ? "Close" : "Open"} ${STAGES[i].title} details`}
                  aria-expanded={selectedStage === i}
                  onClick={() => onStageClick(i)}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  style={{
                    left: `${pct(n.x, route.w)}%`,
                    top: `${pct(n.y, route.h)}%`,
                    width: isDesktop ? 44 : 48,
                    height: isDesktop ? 44 : 48,
                  }}
                />
              ))}

              {/* Click-selected contextual popover — below node (flip above if near bottom) */}
              <div className="pointer-events-none absolute inset-0 z-30">
                <AnimatePresence mode="wait">
                  {selectedStage !== null && (() => {
                    const n = points.nodes[selectedStage];
                    const x = pct(n.x, route.w);
                    const y = pct(n.y, route.h);
                    const side: "above" | "below" =
                      n.y > route.h * 0.62 ? "above" : "below";
                    return (
                      <StagePopover
                        key={STAGES[selectedStage].letter}
                        stage={STAGES[selectedStage]}
                        side={side}
                        left={`clamp(min(260px, 46vw), ${x}%, calc(100% - min(260px, 46vw)))`}
                        top={
                          side === "above"
                            ? `calc(${y}% - 28px)`
                            : `calc(${y}% + 28px)`
                        }
                        onClose={closePopover}
                      />
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StageCard({
  stage,
  index,
}: {
  stage: (typeof STAGES)[number];
  index: number;
}) {
  return (
    <motion.div
      id={`stage-${stage.letter.toLowerCase()}`}
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/10 dark:border-white/12 bg-surface dark:bg-[#141419]/90 p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-slate-800/40 dark:hover:border-accent/50 hover:shadow-2xl"
    >
      {/* Scroll-triggered Luminous Gradient Sweep */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        whileInView={{ x: ["-100%", "120%"], opacity: [0, 0.7, 0] }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.3, ease: "easeInOut", delay: (index % 3) * 0.12 }}
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-slate-800/20 via-slate-900/15 dark:via-accent/35 dark:via-amber/25 to-transparent -skew-x-12"
        aria-hidden
      />

      {/* Scroll & Hover Ambient Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.45 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: (index % 3) * 0.08 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/[0.06] via-indigo-950/[0.04] to-transparent dark:from-accent/30 dark:via-amber/18 via-40% transition-opacity duration-500 group-hover:!opacity-100"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Header row: Phase badge + Letter pill */}
          <div className="flex items-center justify-between gap-3 border-b border-black/10 dark:border-white/10 pb-4">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-amber">
              {stage.week}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/10 border border-slate-900/20 font-sans text-sm font-bold text-slate-950 dark:bg-accent/15 dark:border-accent/30 dark:text-accent shadow-sm transition-transform duration-300 group-hover:scale-110">
              {stage.letter}
            </span>
          </div>

          {/* Title & Tagline */}
          <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink dark:text-white group-hover:text-slate-950 dark:group-hover:text-amber transition-colors duration-300">
            {stage.title}
          </h3>
          <p className="mt-1 text-sm font-bold text-slate-900 dark:text-amber/90">
            {stage.tagline}
          </p>

          {/* Paragraphs */}
          <div className="mt-4 space-y-2 text-xs sm:text-sm leading-relaxed text-body dark:text-white/70 font-medium">
            {stage.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* What's Included */}
          <div className="mt-6 border-t border-black/10 dark:border-white/10 pt-4">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50 dark:text-white/50 mb-3">
              What&apos;s Included
            </p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {stage.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs font-medium text-body dark:text-white/80">
                  <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900 dark:bg-amber" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Outcome Box */}
        <div className="mt-6 rounded-2xl border border-slate-800/20 bg-slate-900/5 dark:border-accent/20 dark:bg-accent/10 p-3.5 text-xs font-medium text-ink dark:text-white/90">
          <span className="font-bold text-slate-950 dark:text-amber">Outcome: </span>
          {stage.outcome}
        </div>
      </div>
    </motion.div>
  );
}

function PhaseQuickJump() {
  const scrollToStage = (letter: string) => {
    const el = document.getElementById(`stage-${letter.toLowerCase()}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="inline-flex items-center justify-center gap-2 py-2 px-3 rounded-full border border-black/10 dark:border-white/15 bg-surface dark:bg-white/[0.04] backdrop-blur-md shadow-md">
      {STAGES.map((s) => (
        <button
          key={s.letter}
          type="button"
          onClick={() => scrollToStage(s.letter)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/20 bg-slate-900/10 font-sans text-xs font-bold text-slate-950 dark:border-accent/20 dark:bg-accent/10 dark:text-accent transition-all duration-300 hover:scale-110 hover:bg-slate-950 hover:text-white dark:hover:bg-amber dark:hover:text-ink active:scale-95 cursor-pointer"
          aria-label={`Jump to ${s.title} stage`}
        >
          {s.letter}
        </button>
      ))}
    </div>
  );
}

/** SCALE journey map: interactive route graph + scroll animated stage cards. */
export default function JourneyMap() {
  return (
    <section id="framework" className="relative scroll-mt-24 py-10 md:py-16 overflow-hidden">
      {/* Interactive SVG graph scene */}
      <div className="hidden md:block">
        <JourneyScene variant="desktop" />
      </div>
      <div className="md:hidden px-4">
        <JourneyScene variant="mobile" />
      </div>

      {/* Animated Stage Cards Grid on Scroll */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 mt-12 md:mt-20">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-slate-950 dark:text-amber">
            Framework Roadmap
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink dark:text-white sm:text-3xl md:text-4xl">
            Explore All 5 Growth Phases
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-body dark:text-white/70 font-medium max-w-xl">
            Tap any phase letter below or scroll through each card to inspect deliverables, scope, and strategic outcomes.
          </p>

          <div className="mt-5">
            <PhaseQuickJump />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage, i) => (
            <StageCard key={stage.letter} stage={stage} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
