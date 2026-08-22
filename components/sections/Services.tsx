"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  LuBot,
  LuGlobe,
  LuPalette,
  LuSettings,
  LuTrendingUp,
  LuWallet,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import Eyebrow from "@/components/ui/Eyebrow";
import TiltCard from "@/components/ui/TiltCard";
import TextReveal from "@/components/ui/TextReveal";
import { EASE_OUT_EXPO } from "@/lib/animations";

function IconBadge({ icon: Icon, size = 20 }: { icon: IconType; size?: number }) {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/15 text-accent shadow-sm transition-transform duration-500 group-hover:scale-110">
      <Icon size={size} strokeWidth={1.8} aria-hidden />
    </span>
  );
}

type ServiceCard = {
  functionName: string;
  cardTitle: string;
  description: string;
  icon: IconType;
  image: string;
  span: string;
  accent: string;
  avatarText: string;
};

const SERVICES: ServiceCard[] = [
  {
    functionName: "Website Development",
    cardTitle: "Meet Your 24/7 Salesperson",
    description:
      "Your website should build trust, answer questions, and convert visitors—even while you sleep. We design high-converting web applications built for speed and sales.",
    icon: LuGlobe,
    image: "/services/salesman_icon.jpg",
    span: "col-span-1",
    accent: "from-amber-500/25 via-gold/18 to-transparent",
    avatarText: "WD",
  },
  {
    functionName: "Marketing",
    cardTitle: "Meet Your Revenue Engine",
    description:
      "We create predictable demand through strategic marketing and targeted performance ads that turn attention into paying customers.",
    icon: LuTrendingUp,
    image: "/services/marketing_icon.png",
    span: "col-span-1",
    accent: "from-gold/25 via-amber/18 to-transparent",
    avatarText: "MK",
  },
  {
    functionName: "Branding",
    cardTitle: "Meet The Reason They Remember You",
    description:
      "Great brands aren't just recognized—they're remembered, trusted, and chosen. We shape identity and messaging that commands category leadership.",
    icon: LuPalette,
    image: "/services/branding_icon.png",
    span: "col-span-1",
    accent: "from-rose-500/25 via-pink-500/18 to-transparent",
    avatarText: "BD",
  },
  {
    functionName: "AI & Automation",
    cardTitle: "Meet Your Silent Employee",
    description:
      "Automate repetitive work, streamline customer operations, and let your business run smarter 24×7 without adding overhead.",
    icon: LuBot,
    image: "/services/ai_icon.jpg",
    span: "col-span-1",
    accent: "from-emerald-500/25 via-teal-500/18 to-transparent",
    avatarText: "AI",
  },
  {
    functionName: "Finance",
    cardTitle: "Meet Your Profit Partner",
    description:
      "Better financial systems help you make confident decisions, optimize cash flow, and build a business that scales sustainably.",
    icon: LuWallet,
    image: "/services/finance_icon.png",
    span: "col-span-1",
    accent: "from-amber-500/25 via-yellow-500/18 to-transparent",
    avatarText: "FN",
  },
  {
    functionName: "Technology",
    cardTitle: "Meet Your Business Operating System",
    description:
      "We build the digital infrastructure, custom APIs, and backend systems that keep every part of your business connected and ready for high volume.",
    icon: LuSettings,
    image: "/services/tech_icon.jpg",
    span: "col-span-1",
    accent: "from-cyan-500/25 via-sky-500/18 to-transparent",
    avatarText: "TC",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-10 md:px-12 md:py-14"
    >
      {/* Header & Intro Copy matching alignment requirements */}
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center justify-center">
        <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-ink dark:text-white sm:text-4xl md:text-5xl">
          03 — Services & Stack
        </h2>
        <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-accent dark:text-amber sm:text-2xl md:text-3xl leading-snug">
          Everything You Need. One Team To Deliver It.
        </h3>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-body dark:text-slate-300 font-medium">
          Growing a business shouldn&apos;t mean managing a different partner for every challenge. One agency for ads. One for branding. One for the website.{" "}
          <em className="italic text-ink dark:text-white font-semibold">
            At this point, your business needs an HR department.
          </em>
        </p>
      </div>

      {/* Dynamic Grid Layout - 6 Equal Sized Cards */}
      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {SERVICES.map((s) => (
          <motion.div
            key={s.functionName}
            variants={cardVariants}
            className="col-span-1 flex flex-col"
          >
            <TiltCard className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-[#141419] p-6 sm:p-8 shadow-card transition-all duration-500 hover:border-slate-800/40 dark:hover:border-accent/60 hover:shadow-2xl hover:-translate-y-1">
              {/* Mobile On-Scroll & Hover Gold Gradient Shimmer Sweep */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                whileInView={{ x: ["-100%", "130%"], opacity: [0, 0.85, 0] }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.1, ease: "easeInOut", delay: 0.1 }}
                className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-amber-400/40 via-yellow-300/30 to-transparent -skew-x-12"
                aria-hidden
              />

              {/* Light Theme Hover & Mobile On-Scroll Gold Gradient Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-br from-amber-500/18 via-amber-400/12 to-amber-300/15 opacity-0 transition-opacity duration-500 group-hover:!opacity-100 dark:hidden pointer-events-none"
                aria-hidden
              />

              {/* Mobile View Scroll Ambient Gold Gradient Overlay (sm:hidden: Mobile Only for both Light & Dark Theme) */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.45 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.8 }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/18 via-amber-400/12 to-amber-300/15 dark:from-accent/25 dark:via-amber/15 sm:hidden"
                aria-hidden
              />

              {/* Service Logo Watermark — Matching Card Color in Dark Theme */}
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl">
                {/* Ambient Gold Radial Glow */}
                <div className="absolute right-3 top-3 h-28 w-28 rounded-full bg-accent/10 dark:bg-amber/12 blur-2xl transition-all duration-700 group-hover:scale-125 group-hover:bg-amber/20" />

                {/* Embedded Top-Right Service Logo Watermark Image (s.image) — 100% Card Color Matched in Dark Theme */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 h-20 w-20 sm:h-24 sm:w-24 opacity-25 dark:opacity-35 dark:invert transition-all duration-500 group-hover:opacity-50 dark:group-hover:opacity-65 group-hover:scale-105">
                  <Image
                    src={s.image.replace('.jpg', '_trans.png').replace('.png', '_trans.png').replace('_trans_trans.png', '_trans.png')}
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>

                {/* Embedded Tech Grid overlay matching graph aesthetic */}
                <svg className="absolute inset-0 h-full w-full opacity-15 dark:opacity-25" viewBox="0 0 360 280" aria-hidden>
                  <line x1="0" y1="44" x2="360" y2="44" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" className="text-amber/40" />
                  <line x1="290" y1="0" x2="290" y2="280" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" className="text-amber/40" />
                  <circle cx="290" cy="44" r="14" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" className="text-amber/60" />
                  <circle cx="290" cy="44" r="3" className="fill-amber/80" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1 rounded-full border border-accent/20 transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/20">
                    {s.functionName}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink dark:text-white md:text-2xl group-hover:text-amber-800 dark:group-hover:text-amber transition-colors duration-300 pr-20 sm:pr-24">
                  {s.cardTitle}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-body dark:text-slate-300 font-medium group-hover:text-slate-950 dark:group-hover:text-white transition-colors duration-300">
                  {s.description}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between text-xs font-mono text-ink/50 dark:text-slate-400 group-hover:text-accent dark:group-hover:text-amber font-semibold uppercase tracking-wider transition-colors duration-300">
                <span>ScaleXpertz Discipline</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Services Footer Sprint Badges */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-5 border-t border-black/[0.08] dark:border-white/10 pt-8 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-ink/50 dark:text-slate-400 font-semibold">
          Growth Sprints & Solutions:
        </span>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 dark:border-amber/35 dark:bg-amber/10 px-4 py-1.5 font-mono text-xs font-bold text-accent dark:text-amber transition-transform duration-300 hover:scale-105"
        >
          B2C Growth Sprint
        </a>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 dark:border-amber/35 dark:bg-amber/10 px-4 py-1.5 font-mono text-xs font-bold text-accent dark:text-amber transition-transform duration-300 hover:scale-105"
        >
          B2B Growth Sprint
        </a>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 dark:border-amber/35 dark:bg-amber/10 px-4 py-1.5 font-mono text-xs font-bold text-accent dark:text-amber transition-transform duration-300 hover:scale-105"
        >
          Custom Growth Solutions
        </a>
      </div>
    </section>
  );
}
