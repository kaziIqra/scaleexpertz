import Image from "next/image";
import Link from "next/link";
import type { CaseStudy, Chart, ChartBar, Metric, Score } from "@/lib/caseStudies";

export const CARD =
  "rounded-2xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-[#141419] shadow-card";

const LABEL =
  "font-mono text-xs font-bold uppercase tracking-wider text-accent dark:text-amber";

const BAR_TONE: Record<NonNullable<ChartBar["tone"]>, string> = {
  gold: "bg-accent",
  soft: "bg-accent/55",
  muted: "bg-ink/25 dark:bg-white/30",
};

export function caseNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function MetricTiles({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className={`${CARD} p-5 text-center`}>
          <p className="font-display text-xl font-bold tracking-tight text-accent dark:text-amber sm:text-2xl">
            {m.value}
          </p>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/60 dark:text-slate-400">
            {m.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function BarChart({ chart }: { chart: Chart }) {
  const max = Math.max(...chart.bars.map((b) => b.value));

  return (
    <div className={`${CARD} p-5 sm:p-6`}>
      <h4 className="font-display text-sm font-bold tracking-tight text-ink dark:text-white sm:text-base">
        {chart.title}
      </h4>
      <div className="mt-5 space-y-4">
        {chart.bars.map((b) => (
          <div key={b.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs text-body dark:text-slate-300 sm:text-sm">{b.label}</span>
              <span className="font-display text-sm font-bold text-ink dark:text-white">
                {b.display}
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink/[0.06] dark:bg-white/[0.07]">
              <div
                className={`h-full rounded-full ${BAR_TONE[b.tone ?? "gold"]}`}
                style={{ width: `${Math.max((b.value / max) * 100, 2)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {chart.unit && (
        <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-ink/50 dark:text-slate-500">
          {chart.unit}
        </p>
      )}
    </div>
  );
}

function ScoreRing({ score }: { score: Score }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const filled = (score.value / score.max) * circumference;

  return (
    <div className={`${CARD} flex flex-col items-center p-5 sm:p-6`}>
      <h4 className="self-start font-display text-sm font-bold tracking-tight text-ink dark:text-white sm:text-base">
        {score.title}
      </h4>
      <div className="relative mt-5 h-40 w-40">
        <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden>
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            strokeWidth="14"
            className="stroke-ink/[0.08] dark:stroke-white/10"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            strokeWidth="14"
            strokeDasharray={`${filled} ${circumference}`}
            className="stroke-accent"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-extrabold text-ink dark:text-white">
            {score.value}
          </span>
          <span className="font-mono text-xs text-ink/50 dark:text-slate-400">/{score.max}</span>
        </div>
      </div>
    </div>
  );
}

/** One case study, laid out like its page in the PDF report. */
export default function CaseReport({ study, index }: { study: CaseStudy; index: number }) {
  const { report } = study;
  const visuals = report.charts.length + (report.score ? 1 : 0);

  return (
    <article>
      <div className="flex items-start gap-4 sm:gap-5">
        <span className="font-display text-4xl font-extrabold leading-none tracking-tight text-accent dark:text-amber sm:text-5xl md:text-6xl">
          {caseNumber(index)}
        </span>
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink dark:text-white sm:text-3xl md:text-4xl">
            {study.client}
          </h1>
          <p className="mt-1.5 text-sm italic text-body dark:text-slate-400">{report.meta}</p>
        </div>
      </div>

      <p className="mt-6 max-w-4xl font-display text-lg font-bold italic leading-snug text-accent dark:text-amber sm:text-xl md:text-2xl">
        &ldquo;{report.quote}&rdquo;
      </p>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border-l-4 border-accent bg-accent/5 py-4 pl-5 pr-5 dark:border-amber dark:bg-amber/5 sm:flex-row sm:items-center sm:gap-6 [&>span]:sm:self-center sm:pl-6">
        <span className="shrink-0 self-start rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-extrabold uppercase tracking-wider text-ink">
          {study.category}
        </span>
        <p className="text-sm leading-relaxed text-ink/90 dark:text-slate-200 sm:text-base">
          <strong className="font-display font-bold text-ink dark:text-white">{study.headline}.</strong>{" "}
          {study.outcome}
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-night ring-1 ring-black/[0.06] dark:ring-white/10 lg:col-span-7">
          <Image
            src={study.image}
            alt={`${study.client} — ${study.headline}`}
            fill
            sizes="(min-width: 1024px) 56vw, 92vw"
            className="object-contain object-center"
            priority
          />
        </div>

        <div className="space-y-8 lg:col-span-5">
          <div>
            <h2 className={LABEL}>The Problem</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/90 dark:text-slate-200 sm:text-base">
              {report.problem}
            </p>
          </div>
          <div>
            <h2 className={LABEL}>How We Solved It</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/90 dark:text-slate-200 sm:text-base">
              {report.solution}
            </p>
          </div>
          <div>
            <h2 className={LABEL}>What Made It Work</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {report.pillars.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-ink dark:border-amber/35 dark:bg-amber/10 dark:text-amber"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className={LABEL}>Key Results</h2>
        <div className="mt-4">
          <MetricTiles metrics={report.metrics} />
        </div>
        <div className={`mt-4 grid gap-4 ${report.highlights.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {report.highlights.map((h) => (
            <div key={h.label} className={`${CARD} flex items-center gap-4 p-5`}>
              <p className="shrink-0 font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white">
                {h.value}
              </p>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent dark:text-amber">
                  {h.label}
                </p>
                {h.sub && <p className="mt-0.5 text-xs text-body dark:text-slate-400">{h.sub}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <figure className="mt-6">
        <div className={`grid gap-4 ${visuals > 1 ? "md:grid-cols-2" : ""}`}>
          {report.score && <ScoreRing score={report.score} />}
          {report.charts.map((chart) => (
            <BarChart key={chart.title} chart={chart} />
          ))}
        </div>
        <figcaption className="mt-3 text-center text-xs italic text-body dark:text-slate-400">
          {report.caption}
        </figcaption>
      </figure>

      <p className="mt-10 text-center font-mono text-xs font-bold uppercase tracking-[0.35em] text-ink/70 dark:text-slate-300 sm:text-sm">
        {report.tagline}
      </p>

      <Link
        href="/diagnosis"
        className="group mt-6 flex items-center justify-between gap-4 rounded-2xl bg-accent px-5 py-4 text-ink transition-colors duration-300 hover:bg-accent-strong sm:px-7 sm:py-5"
      >
        <span className="font-display text-sm font-bold italic leading-snug sm:text-base md:text-lg">
          {report.cta}
        </span>
        <span className="shrink-0 text-lg transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </article>
  );
}
