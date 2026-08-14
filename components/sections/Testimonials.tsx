"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { EASE_OUT_EXPO } from "@/lib/animations";

const QUOTES = [
  {
    quote:
      "We fired four agencies and hired one partner. Our site, ads, and books finally tell the same story — and revenue followed.",
    name: "Maya Chen",
    role: "Founder, Northwind Commerce",
    image: "/testimonials/maya.jpg",
  },
  {
    quote:
      "The app shipped in twelve weeks, and the brand work made it feel like a company twice our size. One team, one invoice, zero chaos.",
    name: "Daniel Okafor",
    role: "CEO, Pulse Fitness",
    image: "/testimonials/daniel.jpg",
  },
  {
    quote:
      "Their finance team closes our books while their engineers automate them. I stopped being the middleman between my own vendors.",
    name: "Sofia Ramírez",
    role: "COO, Ledgerly",
    image: "/testimonials/sofia.jpg",
  },
  {
    quote:
      "Every growth decision now comes with the full picture — traffic, conversion, and cash flow in one report. That's the unlock.",
    name: "James Whitfield",
    role: "MD, Marlowe & Co",
    image: "/testimonials/james.jpg",
  },
];

const AUTO_ADVANCE_MS = 5000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const slideTo = (i: number) => {
    const w = viewportRef.current?.offsetWidth ?? 0;
    const next = Math.max(0, Math.min(QUOTES.length - 1, i));
    setIndex(next);
    animate(x, -next * w, { duration: 0.7, ease: EASE_OUT_EXPO });
  };

  // auto-advance, paused on hover/drag
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      slideTo(index + 1 > QUOTES.length - 1 ? 0 : index + 1);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  // keep position in sync on resize
  useEffect(() => {
    const onResize = () => {
      const w = viewportRef.current?.offsetWidth ?? 0;
      x.set(-index * w);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, x]);

  const onDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const w = viewportRef.current?.offsetWidth ?? 1;
    const projected = -x.get() + -info.velocity.x * 0.2;
    slideTo(Math.round(projected / w));
    setPaused(false);
  };

  const maxDrag = () => -(QUOTES.length - 1) * (viewportRef.current?.offsetWidth ?? 0);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-36">
      <Eyebrow index="05" label="What clients say" />

      <div
        ref={viewportRef}
        data-cursor="Drag"
        className="mt-12 cursor-grab overflow-hidden active:cursor-grabbing"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: maxDrag(), right: 0 }}
          dragElastic={0.12}
          onDragStart={() => setPaused(true)}
          onDragEnd={onDragEnd}
        >
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="grid w-full shrink-0 select-none items-center gap-10 pr-8 md:grid-cols-[1fr_auto] md:gap-16 md:pr-24"
            >
              <div>
                <blockquote className="max-w-4xl font-display text-2xl font-medium leading-snug tracking-[-0.01em] text-ink md:text-4xl">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <Image
                    src={q.image}
                    alt={q.name}
                    width={96}
                    height={96}
                    draggable={false}
                    className="h-12 w-12 rounded-full border border-black/[0.08] object-cover"
                  />
                  <span>
                    <span className="block font-medium text-ink">{q.name}</span>
                    <span className="block text-sm text-body">{q.role}</span>
                  </span>
                </figcaption>
              </div>

              {/* reviewer portrait */}
              <div className="relative mx-auto w-52 md:w-64 lg:w-72">
                <div
                  aria-hidden
                  className="absolute -inset-3 rotate-3 rounded-[2rem] bg-accent/10"
                />
                <div
                  aria-hidden
                  className="absolute -inset-3 -rotate-2 rounded-[2rem] border border-accent/20"
                />
                <Image
                  src={q.image}
                  alt=""
                  width={800}
                  height={1000}
                  draggable={false}
                  className="pointer-events-none relative aspect-[4/5] w-full rounded-[1.75rem] border border-black/[0.06] object-cover shadow-card"
                />
                <span className="absolute -bottom-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-2xl font-semibold text-white shadow-card">
                  &ldquo;
                </span>
              </div>
            </figure>
          ))}
        </motion.div>
      </div>

      {/* dots */}
      <div className="mt-10 flex gap-2">
        {QUOTES.map((q, i) => (
          <button
            key={q.name}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => slideTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-accent" : "w-1.5 bg-ink/15 hover:bg-ink/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
