"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import TextReveal from "@/components/ui/TextReveal";
import { EASE_OUT_EXPO } from "@/lib/animations";

/** The one dark moment on the site. */
export default function FinalCTA() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-night">
      {/* faint glow + drifting particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-30%] h-[70%] w-[70%] -translate-x-1/2 rounded-full bg-accent/[0.12] blur-3xl" />
        <span className="animate-drift absolute left-[18%] top-[30%] h-1 w-1 rounded-full bg-white/40" />
        <span className="animate-drift absolute left-[72%] top-[22%] h-1.5 w-1.5 rounded-full bg-amber/50 [animation-delay:-2s]" />
        <span className="animate-drift absolute left-[58%] top-[68%] h-1 w-1 rounded-full bg-white/30 [animation-delay:-4s]" />
        <span className="animate-drift absolute left-[30%] top-[74%] h-1 w-1 rounded-full bg-accent/60 [animation-delay:-6s]" />
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-6 py-32 text-center md:px-12 md:py-44">
        <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-7xl">
          <TextReveal as="span" className="block" text="Ready to scale" />
          <TextReveal as="span" className="block" text="everything at once?" delay={0.12} />
        </h2>

        {/* shimmering accent underline */}
        <motion.span
          aria-hidden
          className="animate-shimmer mt-6 block h-[3px] w-48 rounded-full md:w-72"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #4f46e5, #f59e0b, #4f46e5)",
            backgroundSize: "200% 100%",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.4 }}
        />

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
        >
          <Magnetic strength={14}>
            <a
              href="mailto:scalexpertz@gmail.com"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-accent via-indigo-500 to-accent bg-[length:200%_auto] px-10 py-5 text-lg font-extrabold text-white shadow-2xl shadow-accent/40 transition-all duration-500 hover:bg-[position:right_center] hover:scale-105 hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] active:scale-95"
            >
              Book a Free Strategy Call
            </a>
          </Magnetic>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            Usually replies within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
