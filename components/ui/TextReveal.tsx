"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE_OUT_EXPO, REVEAL_DURATION, REVEAL_STAGGER } from "@/lib/animations";

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

type Props = {
  text: string;
  as?: keyof typeof tags;
  className?: string;
  delay?: number;
  /**
   * When provided, playback is controlled (true = play) — used by the hero to
   * wait for the preloader. When omitted, the reveal triggers in-view.
   */
  play?: boolean;
};

/**
 * Word-mask headline reveal: each word slides up out of an overflow-hidden
 * span (y 110% → 0) with a slight rotation settle, staggered left to right.
 */
export default function TextReveal({
  text,
  as = "span",
  className = "",
  delay = 0,
  play,
}: Props) {
  const reduced = useReducedMotion();
  const Tag = tags[as];

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: REVEAL_STAGGER, delayChildren: delay },
    },
  };

  const word: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }
    : {
        hidden: { y: "115%", rotate: 4 },
        visible: {
          y: "0%",
          rotate: 0,
          transition: { duration: REVEAL_DURATION, ease: EASE_OUT_EXPO },
        },
      };

  const controlled = play !== undefined;
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      {...(controlled
        ? { animate: play ? "visible" : "hidden" }
        : { whileInView: "visible", viewport: { once: true, amount: 0.6 } })}
    >
      {/* real accessible text (aria-label is prohibited on generic spans) */}
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-flex overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom"
        >
          <motion.span
            variants={word}
            className="inline-block origin-bottom-left whitespace-pre will-change-transform"
          >
            {i < words.length - 1 ? `${w} ` : w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
