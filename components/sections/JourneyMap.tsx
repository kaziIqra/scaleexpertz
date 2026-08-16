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

/* ---------- graph / growth backdrop (no nature scene) ---------- */

function ChartGrid({ w, h }: { w: number; h: number }) {
  const xs = Array.from({ length: Math.floor(w / 48) + 1 }, (_, i) => i * 48);
  const ys = Array.from({ length: Math.floor(h / 48) + 1 }, (_, i) => i * 48);
  return (
    <g className="text-ink/8 dark:text-white/[0.06]" aria-hidden>
      {xs.map((x) => (
        <line key={`vx-${x}`} x1={x} y1={0} x2={x} y2={h} stroke="currentColor" strokeWidth={1} />
      ))}
      {ys.map((y) => (
        <line key={`hy-${y}`} x1={0} y1={y} x2={w} y2={y} stroke="currentColor" strokeWidth={1} />
      ))}
    </g>
  );
}

function Sparkline({
  x,
  y,
  points,
  w = 140,
  h = 36,
}: {
  x: number;
  y: number;
  points: number[];
  w?: number;
  h?: number;
}) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points
    .map((p, i) => {
      const px = i * step;
      const py = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`;
    })
    .join(" ");
  const area = `${coords} L${w} ${h} L0 ${h} Z`;
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden>
      <path d={area} className="fill-accent/10 dark:fill-accent/15" />
      <path
        d={coords}
        fill="none"
        className="stroke-accent/55 dark:stroke-accent/70"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function GrowthBars({ x, y, heights }: { x: number; y: number; heights: number[] }) {
  const barW = 10;
  const gap = 8;
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden>
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * (barW + gap)}
          y={-h}
          width={barW}
          height={h}
          rx={2}
          className={
            i === heights.length - 1
              ? "fill-accent/70 dark:fill-accent/80"
              : "fill-ink/12 dark:fill-white/15"
          }
        />
      ))}
    </g>
  );
}

function KpiChip({ x, y, label, value }: { x: number; y: number; label: string; value: string }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden>
      <rect
        width={88}
        height={36}
        rx={8}
        className="fill-surface/70 dark:fill-white/[0.04] stroke-ink/10 dark:stroke-white/10"
        strokeWidth={1}
      />
      <text x={10} y={14} fontSize={8} className="fill-ink/40 dark:fill-white/40 font-mono uppercase tracking-wider">
        {label}
      </text>
      <text x={10} y={28} fontSize={12} className="fill-ink/70 dark:fill-white/75 font-display font-semibold">
        {value}
      </text>
    </g>
  );
}

/** Subtle dashboard / growth scenery behind the route. */
function MapDoodles({ variant }: { variant: Variant }) {
  if (variant === "desktop") {
    return (
      <g aria-hidden>
        <ChartGrid w={1200} h={640} />

        {/* baseline trend */}
        <path
          d="M40 560 C 220 540 320 500 480 470 C 680 430 820 380 980 300 C 1080 250 1140 200 1180 150"
          fill="none"
          className="stroke-accent/20 dark:stroke-accent/25"
          strokeWidth={1.5}
          strokeDasharray="4 10"
          strokeLinecap="round"
        />

        <Sparkline
          x={140}
          y={70}
          points={[12, 18, 15, 22, 28, 24, 35, 42, 38, 48, 55]}
          w={160}
          h={42}
        />
        <Sparkline
          x={720}
          y={480}
          points={[40, 36, 44, 42, 50, 58, 55, 62, 70]}
          w={150}
          h={40}
        />

        <GrowthBars x={980} y={560} heights={[18, 28, 24, 40, 36, 52, 64]} />
        <GrowthBars x={60} y={280} heights={[22, 18, 32, 28, 44]} />

        <KpiChip x={430} y={80} label="Pipeline" value="+38%" />
        <KpiChip x={980} y={40} label="ROAS" value="4.2x" />
        <KpiChip x={200} y={340} label="Leads" value="↑ 2.1k" />

        {/* faint donut / share ring */}
        <g transform="translate(1100 280)" className="text-ink/12 dark:text-white/15">
          <circle r={34} fill="none" stroke="currentColor" strokeWidth={8} />
          <circle
            r={34}
            fill="none"
            className="stroke-accent/50"
            strokeWidth={8}
            strokeDasharray="70 144"
            strokeLinecap="round"
            transform="rotate(-90)"
          />
        </g>
      </g>
    );
  }

  return (
    <g aria-hidden>
      <ChartGrid w={390} h={1500} />

      <path
        d="M40 80 C 120 200 280 280 200 400 C 100 540 280 680 200 820 C 110 980 280 1120 200 1280 C 140 1380 180 1440 200 1480"
        fill="none"
        className="stroke-accent/18 dark:stroke-accent/22"
        strokeWidth={1.4}
        strokeDasharray="4 10"
        strokeLinecap="round"
      />

      <Sparkline x={40} y={180} points={[10, 16, 14, 22, 30, 28, 36]} w={120} h={34} />
      <Sparkline x={220} y={720} points={[20, 18, 26, 32, 30, 40, 48]} w={120} h={34} />
      <Sparkline x={40} y={1100} points={[30, 34, 32, 42, 50, 48, 58]} w={120} h={34} />

      <GrowthBars x={280} y={420} heights={[16, 24, 20, 34, 42]} />
      <GrowthBars x={40} y={900} heights={[20, 18, 28, 36, 48]} />

      <KpiChip x={40} y={40} label="Pipeline" value="+38%" />
      <KpiChip x={250} y={560} label="ROAS" value="4.2x" />
      <KpiChip x={40} y={1320} label="Leads" value="↑ 2.1k" />
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
        duration: Math.min(1.1, 0.35 + Math.abs(target - from) * 0.9),
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

  // Sample path geometry once; traveler only moves via travelToStage on click.
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

    return () => {
      travelTweenRef.current?.kill();
    };
  }, [applyProgress, isDesktop]);

  const pct = (v: number, total: number) => (v / total) * 100;

  return (
    <div
      className={
        isDesktop
          ? "relative mx-auto w-full max-w-[1440px] px-12 pb-24 pt-24"
          : "px-6 pb-20 pt-24"
      }
    >
      {/* header */}
      <div>
        <Eyebrow index="02" label="The Proprietary SCALE Framework™" />
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">
          From Strategy to Evolve.
        </h2>
      </div>

      {/* map */}
      <div className={isDesktop ? "mt-12 flex items-center justify-center" : "mt-10"}>
        <div
          className="relative w-full"
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
            </defs>
            <g clipPath={`url(#journey-clip-${variant})`}>
              {/* premium paper / night panel */}
              <rect
                width={route.w}
                height={route.h}
                rx={28}
                className="fill-paper dark:fill-[#101014]"
              />
              <rect
                width={route.w}
                height={route.h}
                rx={28}
                className="fill-accent/[0.04] dark:fill-accent/[0.06]"
              />
              <rect
                x={0.75}
                y={0.75}
                width={route.w - 1.5}
                height={route.h - 1.5}
                rx={28}
                fill="none"
                className="stroke-ink/10 dark:stroke-white/10"
                strokeWidth={1.5}
              />

              <MapDoodles variant={variant} />

              {/* muted route + gold traveled portion */}
              <path
                ref={pathRef}
                d={route.d}
                className="text-ink/20 dark:text-white/20"
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="0.5 9"
              />
              <path
                ref={progressRef}
                d={route.d}
                className="text-accent"
                stroke="currentColor"
                fill="none"
                strokeWidth={2.5}
                strokeLinecap="round"
              />

              {points && (
                <>
                  <Flag at={points.start} label="Strategy" tone="text-ink/45 dark:text-white/45" />
                  <Flag at={points.end} label="Evolve" tone="text-accent" />
                  {points.nodes.map((n, i) => {
                    const reached = i <= active;
                    return (
                      <g key={STAGES[i].letter} transform={`translate(${n.x} ${n.y})`}>
                        <circle
                          r={26}
                          className={`fill-accent/15 origin-center transition-transform duration-500 [transform-box:fill-box] ${
                            i === active ? "scale-100" : "scale-0"
                          }`}
                        />
                        <circle
                          r={14}
                          className={`transition-colors duration-500 ${
                            reached
                              ? "fill-accent stroke-accent"
                              : "fill-surface stroke-ink/20 dark:fill-[#141419] dark:stroke-white/20"
                          }`}
                          strokeWidth={1.5}
                        />
                        <text
                          y={4}
                          textAnchor="middle"
                          fontSize={11}
                          className={`font-mono font-bold transition-colors duration-500 ${
                            reached ? "fill-ink dark:fill-[#0a0a0a]" : "fill-ink/50 dark:fill-white/50"
                          }`}
                        >
                          {STAGES[i].letter}
                        </text>
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
                <circle r={17} className="fill-ink dark:fill-white" />
                <circle
                  r={21}
                  fill="none"
                  className="stroke-ink/15 dark:stroke-white/20"
                />
                <path
                  d="M -6 5.5 L 9 0 L -6 -5.5 L -2.5 0 Z"
                  className="fill-surface dark:fill-[#0c0c0e]"
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

/** SCALE journey map: click S–C–A–L–E nodes to move the traveler and open a stage popover. */
export default function JourneyMap() {
  return (
    <section id="framework" className="scroll-mt-24">
      <div className="hidden md:block">
        <JourneyScene variant="desktop" />
      </div>
      <div className="md:hidden">
        <JourneyScene variant="mobile" />
      </div>
    </section>
  );
}
