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
    role: "Founder",
    quote: "I connect the dots between a business’s current position, its long-term ambition, and the strategy required to turn that ambition into reality.",
    owns: [
      "Business Strategy",
      "Growth Systems",
      "Performance Direction",
      "Founder Consulting",
    ],
    image: "/ansh-perfect.jpg",
    linkedin: "https://www.linkedin.com/in/ansh-sharma-6b1a18384",
    quoteColor: "border-amber-500 bg-amber-500/[0.08] dark:bg-amber-400/10 text-amber-950 dark:text-amber-200",
    badgeColor: "text-amber-600 dark:text-amber-300 bg-amber-500/10 border-amber-500/20",
    glowColor: "group-hover:border-amber-500/50 group-hover:shadow-[0_20px_45px_rgba(245,158,11,0.15)]",
  },
  {
    name: "Navya Pundir",
    role: "Founder",
    quote: "I don’t create content to fill a feed. I create narratives that shape how a brand is remembered.",
    owns: [
      "Content Strategy",
      "Personal Branding",
      "Content Planning",
      "Creative Direction",
    ],
    image: "/navya-perfect.jpg",
    linkedin: "https://www.linkedin.com/in/navya-pundir-4a19933b2?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    quoteColor: "border-purple-500 bg-purple-500/[0.08] dark:bg-purple-400/10 text-purple-950 dark:text-purple-200",
    badgeColor: "text-purple-600 dark:text-purple-300 bg-purple-500/10 border-purple-500/20",
    glowColor: "group-hover:border-purple-500/50 group-hover:shadow-[0_20px_45px_rgba(168,85,247,0.15)]",
  },
  {
    name: "Shubham Panjiyar",
    role: "Founder",
    quote: "I don’t chase trends. I find the insight behind them and turn it into smarter decisions.",
    owns: [
      "AI Solutions",
      "Market Research",
      "Competitor Analysis",
      "Process Optimization",
    ],
    image: "/shubham-perfect.jpg",
    linkedin: "https://www.linkedin.com/in/shubham-panjiyar-034a033b0?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    quoteColor: "border-emerald-500 bg-emerald-500/[0.08] dark:bg-emerald-400/10 text-emerald-950 dark:text-emerald-200",
    badgeColor: "text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    glowColor: "group-hover:border-emerald-500/50 group-hover:shadow-[0_20px_45px_rgba(16,185,129,0.15)]",
  },
  {
    name: "Vishal Mathur",
    role: "Founder",
    quote: "I don’t just manage numbers. I build the operational backbone that turns big vision into sustainable growth.",
    owns: [
      "Financial Planning",
      "Budget Management",
      "Internal Operations",
      "Resource Allocation",
    ],
    image: "/vishal-perfect.jpg",
    linkedin: "https://www.linkedin.com/in/vishal-mathur-b5728b3b1?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    quoteColor: "border-cyan-500 bg-cyan-500/[0.08] dark:bg-cyan-400/10 text-cyan-950 dark:text-cyan-200",
    badgeColor: "text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
    glowColor: "group-hover:border-cyan-500/50 group-hover:shadow-[0_20px_45px_rgba(6,182,212,0.15)]",
  },
  {
    name: "Jafar Khan",
    role: "Tech Lead",
    quote: "I don’t just build technology. I turn business vision into scalable systems, high-performing teams, and lasting competitive advantage.",
    owns: [
      "Technology Strategy",
      "System Architecture",
      "Engineering Leadership",
      "Technical Delivery",
    ],
    image: "/jafar-perfect.jpg",
    linkedin: "https://www.linkedin.com/in/jafarkhan0/",
    quoteColor: "border-indigo-500 bg-indigo-500/[0.08] dark:bg-indigo-400/10 text-indigo-950 dark:text-indigo-200",
    badgeColor: "text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
    glowColor: "group-hover:border-indigo-500/50 group-hover:shadow-[0_20px_45px_rgba(99,102,241,0.15)]",
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
      <main className="overflow-x-hidden bg-paper text-body">
        {/* 1. Hero Section + Our Philosophy Card side-by-side */}
        <section id="top" className="relative pt-28 pb-14 md:pt-36 md:pb-20">
          {/* Ambient Gold Glow Background */}
          <div className="absolute right-[10%] top-[15%] h-[40vmin] w-[40vmin] rounded-full bg-[#d4af37]/[0.1] blur-[120px]" aria-hidden />
          <div className="absolute left-[10%] top-[35%] h-[30vmin] w-[30vmin] rounded-full bg-accent/[0.1] blur-[120px]" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Meet The Team Title & Intro */}
              <div className="lg:col-span-7 text-center lg:text-left">
                <FadeUp delay={0.15} play={done}>
                  <Eyebrow index="01" label="Meet the team" />
                </FadeUp>
                
                <h1 className="mt-4 mx-auto font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink lg:mx-0">
                  <TextReveal text="Meet The Team" as="span" className="block" play={done} delay={0.2} />
                  <TextReveal text="Behind Every Growth Decision." as="span" className="block text-accent" play={done} delay={0.35} />
                </h1>
                
                <FadeUp delay={0.5} play={done}>
                  <p className="mt-6 mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-body font-medium lg:mx-0">
                    At ScaleXpertz, growth isn&apos;t handed from one department to another. Every strategy, campaign, website, automation, and system is built by people who take ownership from start to finish. We&apos;re intentionally small, so every client gets experienced minds—not layers of management.
                  </p>
                </FadeUp>
              </div>

              {/* Right Column: Our Philosophy Card aligned to the right */}
              <div className="lg:col-span-5">
                <motion.div 
                  className="rounded-3xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-white/[0.03] p-7 md:p-8 shadow-card backdrop-blur-md flex flex-col justify-between gap-6 transition-all duration-500 hover:border-accent/40 hover:shadow-xl"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-semibold">Our Philosophy</span>
                    <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                      Small Team. Big Responsibility.
                    </h2>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed text-body font-medium">
                      We don&apos;t believe great work comes from adding more people. It comes from putting the right people around the right business.
                    </p>
                    <p className="font-display text-sm font-bold text-accent italic border-l-2 border-accent pl-3 py-0.5">
                      You&apos;re never handed from one department to another.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Team Members Grid (Top 3 cards + Bottom 2 centered) */}
        <section className="mx-auto max-w-[1240px] px-6 py-12 md:px-8 md:py-16">
          {/* Top Row: 3 Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {MEMBERS.slice(0, 3).map((m, idx) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: idx * 0.1 }}
              >
                <div className={`group relative flex h-full flex-col rounded-3xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 sm:p-7 shadow-card backdrop-blur-md transition-all duration-500 hover:-translate-y-2.5 ${m.glowColor}`}>
                  {/* Headshot Photo */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink/5 dark:bg-black/40 border border-black/[0.04] dark:border-white/5">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent opacity-60 dark:from-[#141419]" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/0 via-transparent to-accent/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  
                  <div className="mt-5 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl transition-colors duration-300 group-hover:text-accent">
                          {m.name}
                        </h3>
                        <span className={`font-mono text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full border transition-transform duration-300 group-hover:scale-105 ${m.badgeColor}`}>
                          {m.role}
                        </span>
                      </div>

                      {/* Tagline Quote with vibrant color accent highlight */}
                      <div className={`mt-4 rounded-xl border-l-4 p-3.5 text-xs sm:text-sm font-medium italic leading-relaxed shadow-sm transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-md ${m.quoteColor}`}>
                        &ldquo;{m.quote}&rdquo;
                      </div>

                      {/* Owns Section */}
                      <div className="mt-5 border-t border-black/[0.06] dark:border-white/10 pt-4">
                        <h4 className="font-mono text-[11px] uppercase tracking-wider text-ink/40 font-semibold mb-2.5">Owns:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2">
                          {m.owns.map((point) => (
                            <li key={point} className="flex items-center gap-2 text-xs sm:text-sm text-ink/90 dark:text-white/90 font-medium">
                              <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent text-[9px] font-bold transition-transform duration-300 group-hover:scale-110">
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
                      <div className="mt-6 flex justify-start border-t border-black/[0.06] dark:border-white/10 pt-3.5">
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/15 bg-ink/[0.04] dark:bg-white/5 px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:border-accent hover:bg-accent hover:text-black group-hover:border-accent/40"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:max-w-[840px] lg:mx-auto">
            {MEMBERS.slice(3, 5).map((m, idx) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: idx * 0.1 }}
              >
                <div className={`group relative flex h-full flex-col rounded-3xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 sm:p-7 shadow-card backdrop-blur-md transition-all duration-500 hover:-translate-y-2.5 ${m.glowColor}`}>
                  {/* Headshot Photo */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink/5 dark:bg-black/40 border border-black/[0.04] dark:border-white/5">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent opacity-60 dark:from-[#141419]" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/0 via-transparent to-accent/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  
                  <div className="mt-5 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl transition-colors duration-300 group-hover:text-accent">
                          {m.name}
                        </h3>
                        <span className={`font-mono text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full border transition-transform duration-300 group-hover:scale-105 ${m.badgeColor}`}>
                          {m.role}
                        </span>
                      </div>

                      {/* Tagline Quote with vibrant color accent highlight */}
                      <div className={`mt-4 rounded-xl border-l-4 p-3.5 text-xs sm:text-sm font-medium italic leading-relaxed shadow-sm transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-md ${m.quoteColor}`}>
                        &ldquo;{m.quote}&rdquo;
                      </div>

                      {/* Owns Section */}
                      <div className="mt-5 border-t border-black/[0.06] dark:border-white/10 pt-4">
                        <h4 className="font-mono text-[11px] uppercase tracking-wider text-ink/40 font-semibold mb-2.5">Owns:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2">
                          {m.owns.map((point) => (
                            <li key={point} className="flex items-center gap-2 text-xs sm:text-sm text-ink/90 dark:text-white/90 font-medium">
                              <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent text-[9px] font-bold transition-transform duration-300 group-hover:scale-110">
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
                      <div className="mt-6 flex justify-start border-t border-black/[0.06] dark:border-white/10 pt-3.5">
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/15 bg-ink/[0.04] dark:bg-white/5 px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:border-accent hover:bg-accent hover:text-black group-hover:border-accent/40"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. How We Work Card */}
        <section className="mx-auto max-w-[1240px] px-6 py-12 md:px-8 md:py-20 border-t border-black/[0.07] dark:border-white/10">
          <motion.div
            className="rounded-3xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-white/[0.03] p-8 md:p-12 shadow-card backdrop-blur-md transition-all duration-500 hover:border-accent/40 hover:shadow-xl"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            <div className="grid gap-8 md:grid-cols-5 items-center">
              <div className="md:col-span-2 text-center md:text-left">
                <Eyebrow index="02" label="How We Work" />
                <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
                  No Silos.<br />No Handovers.
                </h2>
                
                {/* Pillars Badges */}
                <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-2">
                  {["Strategy", "Content", "Design", "Technology", "AI"].map((pillar) => (
                    <span
                      key={pillar}
                      className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono font-semibold text-accent"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-black/[0.08] dark:border-white/10 pt-6 md:pt-0 md:pl-8 text-center md:text-left">
                <div className="space-y-4 text-base md:text-lg leading-relaxed text-body font-medium">
                  <p>
                    Every project moves together because every decision affects the next. Good businesses aren&apos;t built department by department.
                  </p>
                  <div className="rounded-2xl border-l-4 border-accent bg-accent/[0.06] dark:bg-accent/10 p-4 text-ink font-semibold text-sm md:text-base">
                    When you work with ScaleXpertz, you work with one connected team—not a collection of disconnected specialists.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 5. Careers Preview */}
        <section className="mx-auto max-w-[1240px] px-6 py-12 md:px-8 md:py-16">
          <motion.div 
            className="rounded-3xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-white/[0.03] p-8 md:p-12 shadow-card backdrop-blur-md transition-all duration-500 hover:border-accent/40 hover:shadow-xl grid gap-10 md:grid-cols-12 md:items-center"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            <div className="md:col-span-7 text-center md:text-left">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-semibold">Join Us</span>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl lg:text-4xl">
                We&apos;re Always Looking For Exceptional People.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-body font-medium">
                Not because we&apos;re hiring all the time. Because we&apos;re building for the long term. If you&apos;re passionate about solving real business problems, obsessed with learning, and take ownership of your work, we&apos;d love to hear from you.
              </p>
              <div className="mt-7 flex justify-center md:justify-start">
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black shadow-card transition-all duration-300 hover:bg-accent-strong hover:scale-105"
                >
                  Explore Careers &rarr;
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-center border-t border-black/[0.08] dark:border-white/10 pt-8 text-center md:border-t-0 md:border-l md:pt-0 md:pl-8 md:text-left">
              <h3 className="font-mono text-xs uppercase tracking-wider text-ink/50 font-semibold mb-4">
                Frequently Hired Roles:
              </h3>
              <div className="flex flex-wrap justify-center gap-2.5 md:justify-start">
                {[
                  "Graphic Designer",
                  "Video Editor",
                  "Performance Marketer",
                  "Full Stack Developer",
                  "AI Automation Specialist"
                ].map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-black/[0.08] dark:border-white/15 bg-ink/[0.04] dark:bg-white/5 px-4 py-2 text-xs sm:text-sm font-semibold text-ink shadow-sm transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* 6. Final CTA — intentional inverted dark band (matches site FinalCTA) */}
        <section className="relative overflow-hidden bg-night text-white py-28 md:py-36 border-t border-white/10">
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
