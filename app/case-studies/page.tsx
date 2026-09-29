import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { BarChart, CARD, caseNumber } from "@/components/case-studies/CaseReport";
import {
  CASE_STUDIES,
  CASE_STUDIES_PATH,
  CASE_STUDIES_PDF,
  REPORT_INTRO,
  REPORT_STATS,
  REPORT_SUMMARY,
} from "@/lib/caseStudies";

export const metadata: Metadata = {
  title: "Case Studies — ScaleXpertz",
  description:
    "Real campaigns, real numbers, real growth — five verified engagements across eCommerce, EV & mobility, and new-brand launches.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-6 pb-20 pt-28 md:px-12 md:pt-36">
        {/* Cover */}
        <header className="text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-accent dark:text-amber">
            Research by ScaleXpertz
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.03em] text-ink dark:text-white sm:text-5xl md:text-6xl">
            Case Study Portfolio
          </h1>
          <p className="mt-4 text-base font-medium text-body dark:text-slate-300 sm:text-lg">
            Real Campaigns. Real Numbers. Real Growth.
          </p>
          <div aria-hidden className="mx-auto mt-8 h-px w-40 bg-accent" />

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {REPORT_STATS.map((s) => (
              <div key={s.label} className={`${CARD} p-5 text-center last:col-span-2 sm:last:col-span-1`}>
                <p className="font-display text-2xl font-bold tracking-tight text-accent dark:text-amber">
                  {s.value}
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/60 dark:text-slate-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-body dark:text-slate-400">
            Performance Marketing · Social Media Growth · SEO · Lead Generation
          </p>
        </header>

        {/* What's inside */}
        <section id="contents" className="mt-16 scroll-mt-28 md:mt-24">
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink dark:text-white sm:text-3xl md:text-4xl">
            What&apos;s Inside
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-body dark:text-slate-300 sm:text-base">
            {REPORT_INTRO}
          </p>

          <nav aria-label="Case studies" className="mt-8">
            {CASE_STUDIES.map((study, i) => (
              <Link
                key={study.id}
                href={`${CASE_STUDIES_PATH}/${study.id}`}
                className="group flex items-center gap-5 border-b border-black/[0.08] py-5 transition-colors duration-300 first:border-t hover:bg-ink/[0.02] dark:border-white/10 dark:hover:bg-white/[0.03] sm:gap-8"
              >
                <span className="font-display text-xl font-extrabold text-accent dark:text-amber sm:text-2xl">
                  {caseNumber(i)}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-base font-bold tracking-tight text-ink dark:text-white sm:text-lg">
                    {study.client}
                  </span>
                  <span className="mt-0.5 block text-xs text-body dark:text-slate-400 sm:text-sm">
                    {study.summary}
                  </span>
                </span>
                <span className="text-accent transition-transform duration-300 group-hover:translate-x-1 dark:text-amber">
                  →
                </span>
              </Link>
            ))}
          </nav>
        </section>

        {/* Summary */}
        <section
          id="summary"
          className="mt-16 scroll-mt-28 border-t border-black/[0.08] dark:border-white/10 py-14 md:mt-24 md:py-20"
        >
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink dark:text-white sm:text-3xl md:text-4xl">
            The Bigger Picture
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-body dark:text-slate-300 sm:text-base">
            {REPORT_SUMMARY.text}
          </p>

          <div className="mt-8">
            <BarChart chart={REPORT_SUMMARY.chart} />
          </div>

          <div className="mt-10 rounded-3xl border border-accent/60 bg-surface p-8 text-center shadow-card dark:bg-[#141419] md:p-12">
            <h3 className="font-display text-xl font-extrabold tracking-tight text-ink dark:text-white sm:text-2xl md:text-3xl">
              Ready to see numbers like these for your brand?
            </h3>
            <p className="mt-3 text-sm text-body dark:text-slate-300 sm:text-base">
              Performance marketing, social growth, SEO, and lead generation — under one roof.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-card transition-colors duration-300 hover:bg-accent-strong"
              >
                Talk to ScaleXpertz →
              </Link>
              <a
                href={CASE_STUDIES_PDF}
                download="ScaleXpertz_Growth_Research.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-colors duration-300 hover:border-accent hover:bg-accent/10 dark:border-accent/50 dark:text-accent"
              >
                Download as PDF
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
