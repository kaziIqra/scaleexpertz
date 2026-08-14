import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Careers — ScaleXpertz",
  description:
    "Join one senior team that owns the whole stack — open roles in engineering, design, growth, finance, and AI.",
};

const PERKS = [
  {
    title: "Remote-first",
    text: "Work from anywhere in India. We meet up once a quarter to argue about fonts in person.",
  },
  {
    title: "Ship weekly",
    text: "Your work goes live every Friday. No six-month projects that die in a drawer.",
  },
  {
    title: "Learning budget",
    text: "Courses, books, conferences — if it makes you sharper, we pay for it.",
  },
  {
    title: "Real ownership",
    text: "Small team, no layers. You talk to clients, make calls, and own outcomes.",
  },
];

const ROLES = [
  {
    title: "UI/UX",
    dept: "Design",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Design - Thumbnails",
    dept: "Design",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Design - Branding",
    dept: "Design",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Design - Social Media",
    dept: "Design",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Web Development",
    dept: "Engineering",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "App Development",
    dept: "Engineering",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "SaaS Development",
    dept: "Engineering",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Social Media Management",
    dept: "Marketing",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "SEO",
    dept: "Marketing",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Ads - YouTube",
    dept: "Marketing",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Ads - Google",
    dept: "Marketing",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Ads - Meta",
    dept: "Marketing",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "AI Tools",
    dept: "AI & Automation",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Automation",
    dept: "AI & Automation",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Script Writing",
    dept: "Content",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Video Editing",
    dept: "Media & Production",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Market Research",
    dept: "Strategy",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Competitor Analysis",
    dept: "Strategy",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Business Strategy",
    dept: "Strategy",
    type: "Full-time / Part-time",
    location: "Remote",
  },
  {
    title: "Content Strategy",
    dept: "Strategy",
    type: "Full-time / Part-time",
    location: "Remote",
  },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <Eyebrow index="02" label="Careers" />
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold tracking-[-0.03em] text-ink md:text-6xl">
          Do the best work of your career, weekly.
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-body">
          We're a small senior team that replaces five vendors for our clients.
          That only works when every person here can own a problem end to end —
          which makes this a very good place to grow fast.
        </p>

        {/* perks */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p, i) => (
            <div
              key={p.title}
              className="rounded-3xl border border-black/[0.06] bg-surface p-7 shadow-card"
            >
              <span className="font-mono text-xs text-ink/40">0{i + 1}</span>
              <h2 className="mt-3 font-display text-lg font-semibold tracking-tight text-ink">
                {p.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body">{p.text}</p>
            </div>
          ))}
        </div>

        {/* open roles */}
        <div className="mt-24">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-ink md:text-4xl">
            Open roles
          </h2>
          <div className="mt-8">
            {ROLES.map((r) => (
              <Link
                key={r.title}
                href={`/apply?role=${encodeURIComponent(r.title)}`}
                className="group flex flex-col gap-3 border-b border-black/[0.07] py-6 transition-colors duration-300 first:border-t hover:bg-ink/[0.02] md:flex-row md:items-center md:justify-between md:gap-6"
              >
                <div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
                    {r.dept}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-body">{r.location}</span>
                  <span className="rounded-full border border-black/[0.08] px-3 py-1 text-xs text-body">
                    {r.type}
                  </span>
                  <span className="text-sm font-medium text-accent transition-transform duration-300 group-hover:translate-x-1">
                    Apply →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-body">
            Don't see your role?{" "}
            <Link href="/apply" className="font-medium text-accent underline-offset-4 hover:underline">
              Apply anyway
            </Link>{" "}
            — we hire people, not job descriptions.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
