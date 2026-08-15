"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import TiltCard from "@/components/ui/TiltCard";
import Magnetic from "@/components/ui/Magnetic";
import { usePreloaderDone } from "@/lib/preloader";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

const MEMBERS = [
  {
    name: "Ansh Sharma",
    role: "Founder & Growth Strategy",
    quote: "Growth isn't magic. It's usually better decisions repeated consistently.",
    owns: [
      "Business Strategy",
      "Growth Systems",
      "Performance Direction",
      "Founder Consulting",
    ],
    image: "/ansh.png",
    linkedin: "https://www.linkedin.com/company/scalexpertz/posts/?feedView=all",
  },
  {
    name: "Navya Pundir",
    role: "Content Strategist",
    quote: "People don't remember content. They remember how it made them think.",
    owns: [
      "Content Strategy",
      "Personal Branding",
      "Content Planning",
      "Creative Direction",
    ],
    image: "/navya.png",
    linkedin: "https://www.linkedin.com/company/scalexpertz/posts/?feedView=all",
  },
  {
    name: "Shubham Kumar",
    role: "AI & Research Strategist",
    quote: "The right insight is often more valuable than the right tool.",
    owns: [
      "AI Solutions",
      "Market Research",
      "Competitor Analysis",
      "Process Optimization",
    ],
    image: "/shubham.png",
    linkedin: "https://www.linkedin.com/company/scalexpertz/posts/?feedView=all",
  },
  {
    name: "Vishal Mathur",
    role: "Finance & Operations",
    quote: "Strong businesses are built on disciplined decisions behind the scenes.",
    owns: [
      "Financial Planning",
      "Budget Management",
      "Internal Operations",
      "Resource Allocation",
    ],
    image: "/vishal.png",
    linkedin: "https://www.linkedin.com/company/scalexpertz/posts/?feedView=all",
  },
];

function FadeUp({
  children,
  delay = 0,
  play = true,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  play?: boolean;
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

export default function TeamsPage() {
  const done = usePreloaderDone();

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden bg-[#0c0c0e] text-white">
        {/* 1. Hero Section */}
        <section id="top" className="relative pt-28 pb-14 md:pt-36 md:pb-20">
          {/* Ambient Gold Glow Background */}
          <div className="absolute right-[10%] top-[15%] h-[40vmin] w-[40vmin] rounded-full bg-[#d4af37]/[0.1] blur-[120px]" aria-hidden />
          <div className="absolute left-[10%] top-[35%] h-[30vmin] w-[30vmin] rounded-full bg-accent/[0.1] blur-[120px]" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-12 md:text-left">
            <FadeUp delay={0.15} play={done}>
              <Eyebrow index="01" label="Meet the team" />
            </FadeUp>
            
            <h1 className="mt-4 mx-auto font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white max-w-4xl md:mx-0">
              <TextReveal text="Meet The Team" as="span" className="block" play={done} delay={0.2} />
              <TextReveal text="Behind Every Growth Decision." as="span" className="block text-[#d4af37]" play={done} delay={0.35} />
            </h1>
            
            <FadeUp delay={0.5} play={done}>
              <p className="mt-6 mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-white/80 font-medium md:mx-0">
                At ScaleXpertz, growth isn&apos;t handed from one department to another. Every strategy, campaign, website, automation, and system is built by people who take ownership from start to finish. We&apos;re intentionally small, so every client gets experienced minds—not layers of management.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 2. Our Philosophy */}
        <section className="mx-auto max-w-[1440px] px-6 py-10 md:px-12">
          <motion.div 
            className="rounded-3xl border border-white/10 bg-[#141419]/80 p-6 md:p-10 shadow-2xl backdrop-blur-md flex flex-col items-center text-center md:flex-row md:items-center md:text-left justify-between gap-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            <div className="max-w-md">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">Our Philosophy</span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                Small Team. Big Responsibility.
              </h2>
            </div>
            <div className="max-w-xl space-y-2">
              <p className="text-sm sm:text-base leading-relaxed text-white/80 font-medium">
                We don&apos;t believe great work comes from adding more people. It comes from putting the right people around the right business.
              </p>
              <p className="font-display text-sm sm:text-base font-bold text-[#d4af37] italic">
                You&apos;re never handed from one department to another.
              </p>
            </div>
          </motion.div>
        </section>

        {/* 3. Team Members Grid (Desktop 2-column, Mobile Single-column) */}
        <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            {MEMBERS.map((m, idx) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: (idx % 2) * 0.1 }}
              >
                <TiltCard className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#141419]/90 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af37]">
                  {/* Headshot Photo */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/40">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={idx < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-transparent opacity-60" />
                  </div>
                  
                  <div className="mt-6 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                          {m.name}
                        </h3>
                        <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37] font-semibold bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
                          {m.role}
                        </span>
                      </div>

                      {/* Favourite Quote (italic) */}
                      <p className="mt-4 italic text-white/80 border-l-2 border-[#d4af37] pl-4 py-1 leading-relaxed text-sm md:text-base font-medium">
                        &ldquo;{m.quote}&rdquo;
                      </p>

                      {/* Owns Section */}
                      <div className="mt-6 border-t border-white/10 pt-5">
                        <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 font-semibold mb-3">Owns:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                          {m.owns.map((point) => (
                            <li key={point} className="flex items-center gap-2.5 text-sm text-white/90 font-medium">
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold">
                                ✓
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* LinkedIn button */}
                    {m.linkedin && (
                      <div className="mt-8 flex justify-start border-t border-white/10 pt-4">
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. How We Work */}
        <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24 border-t border-white/10">
          <div className="grid gap-12 md:grid-cols-5 md:gap-8 items-center">
            <div className="md:col-span-2 text-center md:text-left">
              <FadeUp>
                <Eyebrow index="02" label="How We Work" />
                <h2 className="mt-6 font-display text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
                  No Silos.<br />No Handovers.
                </h2>
              </FadeUp>
            </div>
            <div className="md:col-span-3 text-center md:text-left">
              <FadeUp delay={0.15}>
                <div className="space-y-4 text-lg md:text-xl leading-relaxed text-white/80 font-medium">
                  <p className="font-mono text-sm text-[#d4af37] font-semibold uppercase tracking-wider">
                    Strategy. Content. Design. Technology. AI.
                  </p>
                  <p>
                    Every project moves together because every decision affects the next. Good businesses aren&apos;t built department by department.
                  </p>
                  <p className="text-white font-semibold">
                    When you work with ScaleXpertz, you work with one connected team—not a collection of disconnected specialists.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 5. Careers Preview */}
        <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <motion.div 
            className="rounded-3xl border border-white/10 bg-[#141419]/90 p-8 md:p-12 shadow-2xl grid gap-12 md:grid-cols-2"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            <div className="text-center md:text-left">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">Join Us</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                We&apos;re Always Looking For Exceptional People.
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-white/80 font-medium">
                Not because we&apos;re hiring all the time. Because we&apos;re building for the long term. If you&apos;re passionate about solving real business problems, obsessed with learning, and take ownership of your work, we&apos;d love to hear from you.
              </p>
              <div className="mt-8 flex justify-center md:justify-start">
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-7 py-3.5 text-sm font-semibold text-black shadow-card transition-all duration-300 hover:bg-[#e5be48]"
                >
                  Explore Careers &rarr;
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-center border-t border-white/10 pt-8 text-center md:border-t-0 md:pt-0 md:text-left">
              <h3 className="font-mono text-xs uppercase tracking-wider text-white/50 font-semibold mb-6">
                Frequently Hired Roles:
              </h3>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                {[
                  "Graphic Designer",
                  "Video Editor",
                  "Performance Marketer",
                  "Full Stack Developer",
                  "AI Automation Specialist"
                ].map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-sm"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* 6. Final CTA */}
        <section className="relative overflow-hidden bg-black text-white py-28 md:py-36 border-t border-white/10">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[-30%] h-[70%] w-[70%] -translate-x-1/2 rounded-full bg-accent/[0.15] blur-3xl" />
            <span className="animate-drift absolute left-[15%] top-[25%] h-1 w-1 rounded-full bg-white/40" />
            <span className="animate-drift absolute left-[75%] top-[35%] h-1.5 w-1.5 rounded-full bg-[#d4af37]/50 [animation-delay:-2s]" />
          </div>

          <div className="relative mx-auto max-w-[1440px] px-6 text-center md:px-12">
            <h2 className="font-display text-4xl font-bold tracking-[-0.03em] md:text-6xl text-white">
              Think You&apos;d Fit In?
            </h2>
            <p className="mt-6 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-relaxed font-medium">
              We&apos;re building a team that values ownership, curiosity, and execution over job titles.
            </p>
            
            <div className="mt-10">
              <Magnetic strength={12}>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-9 py-5 text-base font-semibold text-ink shadow-card transition-colors duration-300 hover:bg-accent-strong"
                >
                  Let&apos;s Build Something Meaningful Together &rarr;
                </Link>
              </Magnetic>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
