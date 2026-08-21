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
              {/* Scroll Shimmer Light Sweep */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                whileInView={{ x: ["-100%", "120%"], opacity: [0, 0.6, 0] }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
                className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-slate-800/20 via-slate-900/15 dark:via-accent/35 dark:via-amber/20 to-transparent -skew-x-12"
                aria-hidden
              />

              {/* Dynamic Scroll & Hover Gradient */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8 }}
                className={`absolute inset-0 bg-gradient-to-br from-slate-900/[0.06] via-indigo-950/[0.04] to-transparent dark:${s.accent} transition-opacity duration-500 group-hover:!opacity-100 pointer-events-none`}
                aria-hidden
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1 rounded-full border border-accent/20">
                    {s.functionName}
                  </span>
                  
                  {/* Enhanced & Zoomed Service Image Icon Badge */}
                  <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-black/10 dark:border-white/20 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#1f1f2a] dark:via-[#181824] dark:to-[#14141d] p-2 shadow-lg shadow-black/5 dark:shadow-black/60 ring-1 ring-black/5 dark:ring-white/10 transition-all duration-500 group-hover:scale-105 group-hover:border-slate-800/60 dark:group-hover:border-amber/60 group-hover:shadow-2xl group-hover:shadow-indigo-950/15 dark:group-hover:shadow-amber/20">
                    <Image
                      src={s.image}
                      alt={s.functionName}
                      width={64}
                      height={64}
                      unoptimized
                      className="h-full w-full object-contain scale-105 group-hover:scale-120 transition-all duration-500 dark:invert dark:brightness-200 dark:contrast-125"
                    />
                    <span aria-hidden className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-slate-900 dark:bg-amber ring-2 ring-white dark:ring-[#141419] shadow-sm" />
                  </div>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink dark:text-white md:text-2xl group-hover:text-slate-950 dark:group-hover:text-amber transition-colors duration-300">
                  {s.cardTitle}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-body dark:text-slate-300 font-medium">
                  {s.description}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between text-xs font-mono text-ink/50 dark:text-slate-400 group-hover:text-accent dark:group-hover:text-amber font-semibold uppercase tracking-wider">
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
