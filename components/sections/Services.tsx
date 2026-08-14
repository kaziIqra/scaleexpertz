"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import TiltCard from "@/components/ui/TiltCard";
import TextReveal from "@/components/ui/TextReveal";
import { EASE_OUT_EXPO } from "@/lib/animations";

type ServiceCard = {
  functionName: string;
  cardTitle: string;
  description: string;
  icon: string;
  span: string;
  accent: string;
};

const SERVICES: ServiceCard[] = [
  {
    functionName: "Website Development",
    cardTitle: "Meet Your 24/7 Salesperson",
    description:
      "Your website should build trust, answer questions, and convert visitors—even while you sleep.",
    icon: "🌐",
    span: "md:col-span-2 lg:col-span-4",
    accent: "from-indigo-500/10 to-purple-500/5",
  },
  {
    functionName: "Marketing",
    cardTitle: "Meet Your Revenue Engine",
    description:
      "We create predictable demand through strategic marketing that turns attention into customers.",
    icon: "📈",
    span: "md:col-span-2 lg:col-span-2",
    accent: "from-blue-500/10 to-indigo-500/5",
  },
  {
    functionName: "Branding",
    cardTitle: "Meet The Reason They Remember You",
    description:
      "Great brands aren't just recognized—they're remembered, trusted, and chosen.",
    icon: "🎨",
    span: "md:col-span-2 lg:col-span-2",
    accent: "from-pink-500/10 to-rose-500/5",
  },
  {
    functionName: "AI & Automation",
    cardTitle: "Meet Your Silent Employee",
    description:
      "Automate repetitive work, streamline operations, and let your business run smarter 24×7.",
    icon: "🤖",
    span: "md:col-span-2 lg:col-span-4",
    accent: "from-emerald-500/10 to-teal-500/5",
  },
  {
    functionName: "Finance",
    cardTitle: "Meet Your Profit Partner",
    description:
      "Better financial systems help you make confident decisions, improve cash flow, and grow sustainably.",
    icon: "💰",
    span: "md:col-span-2 lg:col-span-3",
    accent: "from-amber-500/10 to-yellow-500/5",
  },
  {
    functionName: "Technology",
    cardTitle: "Meet Your Business Operating System",
    description:
      "We build the digital infrastructure that keeps every part of your business connected and ready to scale.",
    icon: "⚙️",
    span: "md:col-span-2 lg:col-span-3",
    accent: "from-cyan-500/10 to-sky-500/5",
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
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-28 md:px-12 md:py-36"
    >
      <Eyebrow index="03" label="Services & Stack" />

      {/* Header & Intro Copy matching PDF exact specs */}
      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink md:text-6xl leading-[1.05]">
            <TextReveal as="span" className="block" text="Everything You Need." />
            <TextReveal
              as="span"
              className="block text-accent"
              text="One Team To Deliver It."
              delay={0.12}
            />
          </h2>
        </div>

        <div className="lg:col-span-5">
          <p className="text-base md:text-lg leading-relaxed text-body font-medium">
            Growing a business shouldn&apos;t mean managing a different partner for every challenge. One agency for ads. One for branding. One for the website. <span className="text-ink font-semibold">At this point, your business needs an HR department.</span>
          </p>
          <p className="mt-3 text-sm text-body/80">
            From strategy and branding to marketing, websites, AI, finance, and technology—we bring every growth function together under one team that works towards one outcome: <strong className="text-ink">your business growth.</strong>
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <motion.div
        className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-6"
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
            <TiltCard className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-black/[0.08] bg-surface p-8 shadow-card transition-all duration-500 hover:border-accent/40 hover:shadow-card-hover">
              {/* Subtle top ambient glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                aria-hidden
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {s.functionName}
                  </span>
                  <span className="text-3xl transition-transform duration-500 group-hover:scale-125">
                    {s.icon}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl group-hover:text-accent transition-colors duration-300">
                  {s.cardTitle}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-body font-medium">
                  {s.description}
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono text-ink/40 group-hover:text-accent font-semibold uppercase tracking-wider">
                <span>ScaleXpertz Discipline</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
