"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import { EASE_OUT_EXPO } from "@/lib/animations";

const BENEFITS = [
  {
    title: "One roadmap, zero hand-offs",
    text: "Your website, app, campaigns, and books are planned together — no vendor ping-pong, no lost context between agencies.",
  },
  {
    title: "Faster from idea to launch",
    text: "Design, engineering, and marketing sit in the same standup, so decisions that used to take weeks happen in a day.",
  },
  {
    title: "Numbers that talk to each other",
    text: "Marketing spend, revenue, and runway live in one model. Every growth decision is made with the full financial picture.",
  },
  {
    title: "One senior team, accountable end-to-end",
    text: "A single partner owns the outcome. When everything is our job, nothing falls between the cracks.",
  },
];

const STATS: { value: number; decimals?: number; suffix: string; label: string }[] = [
  { value: 50, suffix: "+", label: "Clients" },
  { value: 120, suffix: "+", label: "Projects" },
  { value: 3.2, decimals: 1, suffix: "x", label: "Avg. Growth" },
  { value: 98, suffix: "%", label: "Retention" },
];

function Counter({
  value,
  decimals = 0,
  suffix,
}: {
  value: number;
  decimals?: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 55, damping: 16, mass: 1 });
  const display = useTransform(spring, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function WhyOnePartner() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-28 md:px-12 md:py-36">
      <div className="grid gap-16 md:grid-cols-2 md:gap-12">
        {/* sticky headline */}
        <div className="md:sticky md:top-32 md:self-start">
          <Eyebrow index="02" label="Why ScaleXpertz" />
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-ink md:text-6xl">
            <TextReveal as="span" className="block" text="Why one partner" />
            <TextReveal as="span" className="block" text="beats five vendors." delay={0.1} />
          </h2>
          <p className="mt-6 max-w-md text-body">
            Agencies optimize their silo. We optimize your business — because
            we own every layer of it.
          </p>
        </div>

        {/* scrolling benefit rows */}
        <div>
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              className="border-b border-black/[0.07] py-10 first:pt-0"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.05 }}
            >
              <span className="font-mono text-xs text-amber">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink">
                {b.title}
              </h3>
              <p className="mt-3 max-w-lg leading-relaxed text-body">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* animated counters */}
      <div className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
          >
            <p className="font-display text-5xl font-semibold tracking-[-0.02em] text-accent md:text-7xl">
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
