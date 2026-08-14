"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScroll";

/**
 * Infinite marquee. Content is duplicated once and translated -50% on loop.
 * Scroll velocity (via Lenis) eases the playback rate up to ~3.5x.
 */
export default function Marquee({
  children,
  speed = 70,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  /** base speed in px/s */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    if (!track) return;

    const distance = track.scrollWidth / 2;
    const tween = gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      {
        xPercent: reverse ? 0 : -50,
        duration: Math.max(distance / speed, 5),
        ease: "none",
        repeat: -1,
      }
    );

    const tick = () => {
      const v = lenis ? Math.abs(lenis.velocity) : 0;
      const target = 1 + Math.min(v / 15, 2.5);
      tween.timeScale(gsap.utils.interpolate(tween.timeScale(), target, 0.06));
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      tween.kill();
    };
  }, [lenis, reverse, speed]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
