"use client";

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
    span: "md:col-span-2 lg:col-span-4",
    accent: "from-amber-500/20 via-gold/15 to-transparent",
    avatarText: "WD",
  },
  {
    functionName: "Marketing",
    cardTitle: "Meet Your Revenue Engine",
    description:
      "We create predictable demand through strategic marketing and targeted performance ads that turn attention into paying customers.",
    icon: LuTrendingUp,
    span: "md:col-span-2 lg:col-span-2",
    accent: "from-gold/20 via-amber/15 to-transparent",
    avatarText: "MK",
  },
  {
    functionName: "Branding",
    cardTitle: "Meet The Reason They Remember You",
    description:
      "Great brands aren't just recognized—they're remembered, trusted, and chosen. We shape identity and messaging that commands category leadership.",
    icon: LuPalette,
    span: "md:col-span-2 lg:col-span-2",
    accent: "from-rose-500/20 via-pink-500/15 to-transparent",
    avatarText: "BD",
  },
  {
    functionName: "AI & Automation",
    cardTitle: "Meet Your Silent Employee",
    description:
      "Automate repetitive work, streamline customer operations, and let your business run smarter 24×7 without adding overhead.",
    icon: LuBot,
    span: "md:col-span-2 lg:col-span-4",
    accent: "from-emerald-500/20 via-teal-500/15 to-transparent",
    avatarText: "AI",
  },
  {
    functionName: "Finance",
    cardTitle: "Meet Your Profit Partner",
    description:
      "Better financial systems help you make confident decisions, optimize cash flow, and build a business that scales sustainably.",
    icon: LuWallet,
    span: "md:col-span-2 lg:col-span-3",
    accent: "from-amber-500/20 via-yellow-500/15 to-transparent",
    avatarText: "FN",
  },
  {
    functionName: "Technology",
    cardTitle: "Meet Your Business Operating System",
    description:
      "We build the digital infrastructure, custom APIs, and backend systems that keep every part of your business connected and ready for high volume.",
    icon: LuSettings,
    span: "md:col-span-2 lg:col-span-3",
    accent: "from-cyan-500/20 via-sky-500/15 to-transparent",
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

      {/* Dynamic Grid Layout with Engaging Discipline Badges */}
      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {SERVICES.map((s) => (
          <motion.div
            key={s.functionName}
            variants={cardVariants}
            className={`col-span-1 ${s.span}`}
          >
            <TiltCard className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-[#141419] p-6 sm:p-8 shadow-card transition-all duration-500 hover:border-accent/60 hover:shadow-2xl hover:-translate-y-1">
              {/* Dynamic Hover Radial Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 transition-all duration-500 group-hover:opacity-100`}
                aria-hidden
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1 rounded-full border border-accent/20">
                    {s.functionName}
                  </span>
                  
                  {/* Engaging Discipline Tech Avatar Badge */}
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-amber/10 border border-accent/40 font-mono text-xs font-black text-accent dark:text-amber shadow-sm group-hover:scale-105 transition-transform duration-300">
                      {s.avatarText}
                    </span>
                    <IconBadge icon={s.icon} size={18} />
                  </div>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink dark:text-white md:text-2xl group-hover:text-accent dark:group-hover:text-amber transition-colors duration-300">
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
    </section>
  );
}
