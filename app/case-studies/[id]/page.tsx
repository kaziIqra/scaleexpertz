import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CaseReport, { caseNumber } from "@/components/case-studies/CaseReport";
import { CASE_STUDIES, CASE_STUDIES_PATH, CASE_STUDIES_PDF } from "@/lib/caseStudies";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ id: study.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const study = CASE_STUDIES.find((s) => s.id === id);
  if (!study) return {};
  return {
    title: `${study.client}: ${study.headline} — ScaleXpertz Case Study`,
    description: study.report.quote,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;
  const index = CASE_STUDIES.findIndex((s) => s.id === id);
  if (index === -1) notFound();

  const study = CASE_STUDIES[index];
  const prev = CASE_STUDIES[index - 1];
  const next = CASE_STUDIES[index + 1];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-6 pb-20 pt-28 md:px-12 md:pt-36">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={CASE_STUDIES_PATH}
            className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/60 transition-colors duration-300 hover:text-accent dark:text-slate-400 dark:hover:text-amber"
          >
            ← All Case Studies
          </Link>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent dark:text-amber">
            Research by ScaleXpertz
          </p>
        </div>

        <CaseReport study={study} index={index} />

        <nav
          aria-label="More case studies"
          className="mt-14 grid gap-4 border-t border-black/[0.08] pt-8 dark:border-white/10 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`${CASE_STUDIES_PATH}/${prev.id}`}
              className="group rounded-2xl border border-black/[0.08] p-5 transition-colors duration-300 hover:border-accent dark:border-white/10"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50 dark:text-slate-500">
                ← Previous · {caseNumber(index - 1)}
              </span>
              <span className="mt-1 block font-display text-base font-bold text-ink group-hover:text-accent dark:text-white dark:group-hover:text-amber">
                {prev.client}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next ? (
            <Link
              href={`${CASE_STUDIES_PATH}/${next.id}`}
              className="group rounded-2xl border border-black/[0.08] p-5 text-right transition-colors duration-300 hover:border-accent dark:border-white/10"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50 dark:text-slate-500">
                Next · {caseNumber(index + 1)} →
              </span>
              <span className="mt-1 block font-display text-base font-bold text-ink group-hover:text-accent dark:text-white dark:group-hover:text-amber">
                {next.client}
              </span>
            </Link>
          ) : (
            <Link
              href={`${CASE_STUDIES_PATH}#summary`}
              className="group rounded-2xl border border-black/[0.08] p-5 text-right transition-colors duration-300 hover:border-accent dark:border-white/10"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50 dark:text-slate-500">
                Summary →
              </span>
              <span className="mt-1 block font-display text-base font-bold text-ink group-hover:text-accent dark:text-white dark:group-hover:text-amber">
                The Bigger Picture
              </span>
            </Link>
          )}
        </nav>

        <p className="mt-8 text-center text-sm text-body dark:text-slate-400">
          Prefer a copy?{" "}
          <a
            href={CASE_STUDIES_PDF}
            download="ScaleXpertz_Growth_Research.pdf"
            className="font-medium text-accent underline-offset-4 hover:underline dark:text-amber"
          >
            Download the full report as PDF
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
