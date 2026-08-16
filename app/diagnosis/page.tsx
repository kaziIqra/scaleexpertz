import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import ForceLight from "@/components/providers/ForceLight";
import DiagnosisForm from "./DiagnosisForm";

export const metadata: Metadata = {
  title: "Founder Growth Diagnosis — ScaleXpertz",
  description:
    "Book a free 45-minute Founder Growth Diagnosis. Uncover bottlenecks, review your systems, and leave with a 90-day growth roadmap.",
};

const INCLUDED = [
  "Growth Bottleneck Analysis",
  "Business Systems Review",
  "90-Day Growth Roadmap",
  "Founder Action Plan",
];

const WHO_ITS_FOR = [
  "Want sustainable, long-term growth",
  "Are juggling agencies, freelancers, or internal teams",
  "Need clarity before investing more time or money",
  "Want a partner who thinks beyond marketing",
];

export default function DiagnosisPage() {
  return (
    <ForceLight>
      <div className="min-h-dvh bg-paper text-body">
        <Navbar />
        <main className="mx-auto max-w-[1440px] px-6 pb-20 pt-28 md:px-12 md:pt-36">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2 text-center lg:text-left">
              <Eyebrow index="06" label="Founder Growth Diagnosis" />
              <h1 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl md:text-4xl">
                Every business has blind spots.{" "}
                <span className="text-accent">Let&apos;s find yours.</span>
              </h1>
              <p className="mt-4 mx-auto max-w-md text-sm sm:text-base leading-relaxed text-body font-medium lg:mx-0">
                A free 45-minute strategy session to uncover bottlenecks, review how
                your branding, marketing, tech, and operations work together, and
                leave with a practical 90-day growth roadmap—whether we work
                together or not.
              </p>

              <div className="mt-10 space-y-8 text-left">
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold text-center lg:text-left">
                    What&apos;s included
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {INCLUDED.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-body">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold text-center lg:text-left">
                    Designed for founders who
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {WHO_ITS_FOR.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-body">
                        <span className="mt-1.5 shrink-0 font-bold text-accent">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-10 text-sm text-body font-medium">
                We don&apos;t start with solutions. We start with understanding.
              </p>
            </div>

            <div className="lg:col-span-3">
              <h2 className="mb-5 text-center font-display text-xl font-semibold tracking-tight text-ink lg:text-left">
                Book your session
              </h2>
              <DiagnosisForm />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ForceLight>
  );
}
