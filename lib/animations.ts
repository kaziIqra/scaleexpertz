/** Shared motion vocabulary — keep every section on the same eases/timings. */

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const REVEAL_DURATION = 0.9;
export const REVEAL_STAGGER = 0.04;

/** Simple fade-up used for sublines, CTAs, meta rows. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay },
  }),
};
