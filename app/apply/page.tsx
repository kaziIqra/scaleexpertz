import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply — ScaleXpertz",
  description: "Apply to join the ScaleXpertz team.",
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-6 pb-20 pt-28 md:px-12 md:pt-36">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <Eyebrow index="03" label="Apply" />
            <h1 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl md:text-4xl">
              Show us what you've shipped.
            </h1>
            <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-body font-medium">
              No cover-letter theatre. A few honest lines and a link to your
              best work tell us more than any resume format ever could.
            </p>
            <ul className="mt-10 space-y-4">
              {[
                "We reply to every application within a week",
                "Interviews are two calls, not five rounds",
                "You'll meet the team you'd actually work with",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-body">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <ApplyForm initialRole={role} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
