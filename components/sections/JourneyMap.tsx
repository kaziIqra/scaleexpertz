"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Eyebrow from "@/components/ui/Eyebrow";
import { EASE_OUT_EXPO } from "@/lib/animations";

const STAGES = [
  {
    week: "Week 0–1",
    title: "Discovery & Kickoff",
    text: "Deep-dive workshops on your goals, customers, numbers, and existing stack. Everything lands in one shared brief, so every discipline plans from the same source of truth.",
  },
  {
    week: "Week 1–2",
    title: "Strategy & Roadmap",
    text: "Scope, milestones, and success metrics get locked into one roadmap. You see exactly what ships when, what it costs, and how we'll measure it — before any pixels move.",
  },
  {
    week: "Week 2–5",
    title: "Design & Prototype",
    text: "Brand, UX flows, and a clickable prototype come together in tight feedback loops. You react to something real every week, not a big reveal at the end.",
  },
  {
    week: "Week 5–9",
    title: "Build & Iterate",
    text: "Engineering ships in weekly increments with QA baked in. Every Friday you get a staging demo — progress you can click, not a status report.",
  },
  {
    week: "Week 10+",
    title: "Launch & Scale",
    text: "Go-live checklist, analytics wired, hypercare on standby. Then growth loops and performance tuning keep the numbers compounding long after launch.",
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

/* ---------- illustrated map scenery ---------- */

function Pine({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-2} y={-4} width={4} height={8} rx={1} fill="#8a6d4b" opacity={0.8} />
      <path
        d="M0 -34 L11 -12 L5 -12 L14 2 L-14 2 L-5 -12 L-11 -12 Z"
        fill="#4e9455"
        opacity={0.8}
      />
      <path d="M0 -34 L11 -12 L5 -12 L14 2 L0 2 Z" fill="#3d7a46" opacity={0.35} />
    </g>
  );
}

/** Snow-capped mountain: apex at (x, y-h), base width 2w at y. */
function Peak({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <path d={`M${x - w} ${y} L${x} ${y - h} L${x + w} ${y} Z`} fill="#c2cfb8" opacity={0.8} />
      <path d={`M${x} ${y - h} L${x + w} ${y} L${x} ${y} Z`} fill="#55624d" opacity={0.12} />
      <path
        d={`M${x - w * 0.22} ${y - h * 0.72} L${x} ${y - h} L${x + w * 0.22} ${y - h * 0.72} L${x + w * 0.1} ${y - h * 0.64} L${x - 0.02 * w} ${y - h * 0.72} L${x - w * 0.12} ${y - h * 0.62} Z`}
        fill="#ffffff"
        opacity={0.95}
      />
    </g>
  );
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#ffffff" opacity={0.9}>
      <circle cx={-20} cy={4} r={12} />
      <circle cx={0} cy={-2} r={16} />
      <circle cx={22} cy={5} r={11} />
      <rect x={-28} y={4} width={56} height={9} rx={4.5} />
    </g>
  );
}

function Sun({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r * 3} fill="#f7c94b" opacity={0.14} />
      <circle r={r * 1.9} fill="#f7c94b" opacity={0.14} />
      <circle r={r} fill="#f7c94b" opacity={0.95} />
      <g stroke="#f0b429" strokeWidth={2.5} strokeLinecap="round" opacity={0.8}>
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1={0}
            y1={-r - 7}
            x2={0}
            y2={-r - 15}
            transform={`rotate(${i * 45})`}
          />
        ))}
      </g>
    </g>
  );
}

function Birds({ x, y }: { x: number; y: number }) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      stroke="#64748b"
      strokeWidth={1.4}
      strokeLinecap="round"
      fill="none"
      opacity={0.5}
    >
      <path d="M0 0 q4 -5 8 0 q4 -5 8 0" />
      <path d="M22 -10 q3 -4 6 0 q3 -4 6 0" />
      <path d="M10 -20 q3 -4 6 0 q3 -4 6 0" />
    </g>
  );
}

function Compass({ at }: { at: string }) {
  return (
    <g transform={at} className="text-ink/35">
      <circle r={24} {...stroke} strokeWidth={1.2} />
      <circle r={17} {...stroke} strokeWidth={0.8} opacity={0.6} />
      <path
        d="M0 -14 L2.6 -2.6 L14 0 L2.6 2.6 L0 14 L-2.6 2.6 L-14 0 L-2.6 -2.6 Z"
        fill="currentColor"
        opacity={0.75}
      />
      <path
        d="M0 -14 L2.6 -2.6 L14 0 L2.6 2.6 L0 14 L-2.6 2.6 L-14 0 L-2.6 -2.6 Z"
        fill="currentColor"
        opacity={0.35}
        transform="rotate(45) scale(0.62)"
      />
      {(
        [
          ["N", 0, -33],
          ["E", 34, 3],
          ["S", 0, 39],
          ["W", -34, 3],
        ] as const
      ).map(([l, tx, ty]) => (
        <text
          key={l}
          x={tx}
          y={ty}
          textAnchor="middle"
          fontSize={9}
          className="fill-current font-mono"
        >
          {l}
        </text>
      ))}
    </g>
  );
}

/** Illustrated terrain — sun, clouds, peaks, river, green hills, pines. */
function MapDoodles({ variant }: { variant: Variant }) {
  if (variant === "desktop") {
    return (
      <g aria-hidden>
        <Sun x={955} y={82} r={24} />
        <Cloud x={300} y={78} />
        <Cloud x={706} y={116} s={0.75} />
        <Birds x={400} y={148} />
        <Birds x={862} y={102} />

        {/* mountain ranges */}
        <Peak x={360} y={505} w={55} h={95} />
        <Peak x={430} y={505} w={95} h={190} />
        <Peak x={520} y={505} w={70} h={130} />
        <Peak x={1105} y={585} w={85} h={150} />
        <Peak x={1170} y={585} w={60} h={100} />

        {/* river running down from the right range */}
        <path
          d="M1135 430 C 1120 445 1095 465 1108 495 C 1130 545 1070 585 1085 640"
          fill="none"
          stroke="#86c5d8"
          strokeWidth={7}
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* rolling hills along the bottom */}
        <path
          d="M0 640 L0 575 C 120 545 260 560 380 572 C 520 586 640 552 760 560 C 880 568 1000 540 1200 556 L1200 640 Z"
          fill="#b5d3a4"
          opacity={0.5}
        />
        <path
          d="M0 640 L0 606 C 150 580 300 600 450 608 C 620 617 760 592 900 600 C 1020 607 1120 596 1200 604 L1200 640 Z"
          fill="#93c07e"
          opacity={0.55}
        />

        {/* trees */}
        <Pine x={130} y={600} />
        <Pine x={170} y={612} s={0.8} />
        <Pine x={95} y={614} s={0.7} />
        <Pine x={300} y={588} s={0.7} />
        <Pine x={390} y={512} s={0.7} />
        <Pine x={560} y={512} s={0.8} />
        <Pine x={640} y={600} s={0.9} />
        <Pine x={690} y={612} s={0.7} />
        <Pine x={860} y={590} s={0.8} />
        <Pine x={990} y={608} s={0.9} />

        {/* signpost near the trailhead */}
        <g transform="translate(168 442)">
          <rect x={-1.5} y={-30} width={3} height={34} fill="#8a6d4b" opacity={0.75} />
          <rect x={-16} y={-30} width={32} height={8} rx={2} fill="#a58c68" opacity={0.7} />
          <rect x={-13} y={-19} width={26} height={7} rx={2} fill="#a58c68" opacity={0.5} />
        </g>

        <Compass at="translate(112 112)" />
      </g>
    );
  }
  return (
    <g aria-hidden>
      <Sun x={325} y={75} r={18} />
      <Cloud x={90} y={150} s={0.7} />
      <Cloud x={310} y={1050} s={0.65} />
      <Birds x={280} y={210} />
      <Birds x={80} y={660} />

      <Peak x={320} y={905} w={50} h={100} />
      <Peak x={272} y={905} w={36} h={68} />
      <Peak x={70} y={1420} w={50} h={100} />
      <Peak x={130} y={1420} w={38} h={70} />

      <path
        d="M0 1500 L0 1408 C 60 1390 130 1400 195 1408 C 270 1417 330 1398 390 1406 L390 1500 Z"
        fill="#b5d3a4"
        opacity={0.5}
      />
      <path
        d="M0 1500 L0 1444 C 80 1424 160 1440 240 1446 C 310 1451 350 1440 390 1446 L390 1500 Z"
        fill="#93c07e"
        opacity={0.55}
      />

      <Pine x={40} y={470} s={0.8} />
      <Pine x={350} y={380} s={0.7} />
      <Pine x={45} y={760} s={0.7} />
      <Pine x={345} y={1180} s={0.8} />
      <Pine x={90} y={1448} s={0.8} />
      <Pine x={300} y={1462} s={0.9} />
      <Pine x={150} y={1470} s={0.6} />

      <Compass at="translate(58 250)" />
    </g>
  );
}

/**
 * One journey scene (header + map). The route is a single SVG path; node
 * positions are sampled from it at runtime so markers always sit exactly on
 * the road. Scroll progress drives a traveler along the path, draws the
 * traveled portion in accent, and pops a detail card at the last node passed.
 */
function JourneyScene({ variant }: { variant: Variant }) {
  const route = ROUTES[variant];
  const isDesktop = variant === "desktop";

  const rootRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const travelerRef = useRef<SVGGElement>(null);

  const [points, setPoints] = useState<{ nodes: Pt[]; start: Pt; end: Pt } | null>(null);
  const [active, setActive] = useState(-1);
  const activeRef = useRef(-1);

  // useEffect (not layout effect) so this trigger is created after the ones
  // in sections above (Process pins); ScrollTrigger refreshes in creation
  // order, and creating out of document order yields stale start positions.
  useEffect(() => {
    const path = pathRef.current;
    const progress = progressRef.current;
    const traveler = travelerRef.current;
    if (!path || !progress || !traveler) return;

    const L = path.getTotalLength();
    const at = (f: number) => {
      const p = path.getPointAtLength(f * L);
      return { x: p.x, y: p.y };
    };
    setPoints({ nodes: NODE_T.map(at), start: at(0), end: at(1) });
    gsap.set(progress, { strokeDasharray: L, strokeDashoffset: L });

    const apply = (p: number) => {
      const len = p * L;
      gsap.set(progress, { strokeDashoffset: L - len });
      const pt = path.getPointAtLength(len);
      const ahead = path.getPointAtLength(Math.min(len + 2, L));
      const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
      gsap.set(traveler, { x: pt.x, y: pt.y, rotation: angle, transformOrigin: "center" });
      let idx = -1;
      NODE_T.forEach((t, i) => {
        if (p >= t - 0.01) idx = i;
      });
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
    };
    apply(0);

    const mm = gsap.matchMedia();
    const media = isDesktop ? "(min-width: 768px)" : "(max-width: 767.98px)";

    mm.add(`${media} and (prefers-reduced-motion: no-preference)`, () => {
      const tween = gsap.to({ p: 0 }, {
        p: 1,
        ease: "none",
        onUpdate() {
          apply(this.targets()[0].p);
        },
        // No pin — the desktop scene sits inside a tall wrapper with a
        // position:sticky viewport, so it can't collide with other pinned
        // sections (Process). The trigger just maps wrapper scroll to 0..1.
        scrollTrigger: isDesktop
          ? {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            }
          : {
              trigger: mapRef.current,
              start: "top 65%",
              end: "bottom 85%",
              scrub: 0.7,
            },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    // Reduced motion: show the completed journey, no scrubbing.
    mm.add(`${media} and (prefers-reduced-motion: reduce)`, () => {
      apply(1);
    });
    // Guard against any remaining creation-order drift between sections.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => mm.revert();
  }, [isDesktop]);

  const pct = (v: number, total: number) => (v / total) * 100;

  return (
    <div ref={rootRef} className={isDesktop ? "relative h-[350vh]" : "px-6 pb-20 pt-24"}>
      <div
        className={
          isDesktop ? "sticky top-0 flex h-svh flex-col overflow-hidden" : "contents"
        }
      >
      {/* header */}
      <div
        className={
          isDesktop
            ? "mx-auto flex w-full max-w-[1440px] items-end justify-between px-12 pt-20"
            : ""
        }
      >
        <div>
          <Eyebrow index="04" label="The journey" />
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">
            From first call to shipped product.
          </h2>
        </div>
        {isDesktop && (
          <p className="hidden font-mono text-xs uppercase tracking-[0.25em] text-ink/40 md:block">
            Scroll to travel ↓
          </p>
        )}
      </div>

      {/* map */}
      <div
        className={
          isDesktop ? "flex flex-1 items-center justify-center px-8 pb-8" : "mt-10"
        }
      >
        <div
          ref={mapRef}
          className="relative w-full"
          style={{
            aspectRatio: `${route.w} / ${route.h}`,
            ...(isDesktop && {
              width: `min(100%, calc((100svh - 240px) * ${route.w / route.h}))`,
            }),
          }}
        >
          <svg
            viewBox={`0 0 ${route.w} ${route.h}`}
            className="h-full w-full"
            aria-hidden
          >
            <defs>
              <pattern
                id={`journey-grid-${variant}`}
                width={36}
                height={36}
                patternUnits="userSpaceOnUse"
              >
                <circle cx={1.2} cy={1.2} r={1.2} fill="#0a0a0a" opacity={0.06} />
              </pattern>
              <linearGradient id={`journey-sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fdf9ec" />
                <stop offset="70%" stopColor="#faf3e2" />
                <stop offset="100%" stopColor="#f0eedd" />
              </linearGradient>
              <clipPath id={`journey-clip-${variant}`}>
                <rect width={route.w} height={route.h} rx={28} />
              </clipPath>
            </defs>
            <g clipPath={`url(#journey-clip-${variant})`}>
            {/* warm paper base */}
            <rect
              width={route.w}
              height={route.h}
              rx={28}
              fill={`url(#journey-sky-${variant})`}
            />
            <rect
              width={route.w}
              height={route.h}
              rx={28}
              fill={`url(#journey-grid-${variant})`}
            />
            <rect
              x={0.75}
              y={0.75}
              width={route.w - 1.5}
              height={route.h - 1.5}
              rx={28}
              fill="none"
              stroke="#0a0a0a"
              strokeOpacity={0.07}
              strokeWidth={1.5}
            />

            <MapDoodles variant={variant} />

            {/* dotted route + traveled portion */}
            <path
              ref={pathRef}
              d={route.d}
              className="text-ink/20"
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
                <Flag at={points.start} label="Start" tone="text-ink/45" />
                <Flag at={points.end} label="Shipped" tone="text-accent" />
                {points.nodes.map((n, i) => {
                  const reached = i <= active;
                  return (
                    <g key={i} transform={`translate(${n.x} ${n.y})`}>
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
                            : "fill-surface stroke-ink/20"
                        }`}
                        strokeWidth={1.5}
                      />
                      <text
                        y={4}
                        textAnchor="middle"
                        fontSize={11}
                        className={`font-mono transition-colors duration-500 ${
                          reached ? "fill-white" : "fill-ink/50"
                        }`}
                      >
                        {i + 1}
                      </text>
                    </g>
                  );
                })}
              </>
            )}

            {/* traveler */}
            <g ref={travelerRef} style={{ visibility: points ? "visible" : "hidden" }}>
              <circle r={17} fill="#0a0a0a" />
              <circle r={21} fill="none" stroke="#0a0a0a" strokeOpacity={0.15} />
              <path d="M -6 5.5 L 9 0 L -6 -5.5 L -2.5 0 Z" fill="#ffffff" />
            </g>
            </g>
          </svg>

          {/* popup cards — one anchor per node so exits animate in place */}
          {points && (
            <div className="pointer-events-none absolute inset-0" aria-live="polite">
              {points.nodes.map((n, i) => {
                const x = pct(n.x, route.w);
                const y = pct(n.y, route.h);
                const side = isDesktop
                  ? n.y < route.h / 2
                    ? "below"
                    : "above"
                  : n.x < route.w / 2
                    ? "right"
                    : "left";
                const anchor: React.CSSProperties =
                  side === "above" || side === "below"
                    ? {
                        left: `clamp(170px, ${x}%, calc(100% - 170px))`,
                        top: side === "above" ? `calc(${y}% - 26px)` : `calc(${y}% + 26px)`,
                        transform:
                          side === "above" ? "translate(-50%, -100%)" : "translate(-50%, 0)",
                      }
                    : {
                        top: `${y}%`,
                        transform: "translate(0, -50%)",
                        ...(side === "right"
                          ? { left: `calc(${x}% + 26px)` }
                          : { right: `calc(${100 - x}% + 26px)` }),
                      };
                const origin = { above: "bottom center", below: "top center", left: "right center", right: "left center" }[side];
                const caret = {
                  above: "-bottom-[5px] left-1/2 -ml-[5px] border-b border-r",
                  below: "-top-[5px] left-1/2 -ml-[5px] border-t border-l",
                  right: "-left-[5px] top-1/2 -mt-[5px] border-b border-l",
                  left: "-right-[5px] top-1/2 -mt-[5px] border-t border-r",
                }[side];
                return (
                  <div key={i} className="absolute" style={anchor}>
                    <AnimatePresence>
                      {active === i && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.82, y: side === "above" ? 8 : -8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                          style={{ transformOrigin: origin }}
                          className="relative w-[300px] max-w-[min(300px,52vw)] rounded-2xl border border-black/[0.08] bg-surface p-5 shadow-card max-md:w-[220px] max-md:max-w-[48vw] max-md:p-4"
                        >
                          <span
                            aria-hidden
                            className={`absolute h-[10px] w-[10px] rotate-45 border-black/[0.08] bg-surface ${caret}`}
                          />
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                            {STAGES[i].week}
                          </p>
                          <h3 className="mt-1.5 font-display text-base font-semibold tracking-tight text-ink md:text-lg">
                            {STAGES[i].title}
                          </h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-body md:text-sm">
                            {STAGES[i].text}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

/** Scroll-driven delivery-journey map: desktop gets a pinned landscape route,
 *  mobile gets a tall vertical one — same traveler / nodes / popup mechanics. */
export default function JourneyMap() {
  return (
    <section id="journey" className="scroll-mt-24">
      <div className="hidden md:block">
        <JourneyScene variant="desktop" />
      </div>
      <div className="md:hidden">
        <JourneyScene variant="mobile" />
      </div>
    </section>
  );
}
