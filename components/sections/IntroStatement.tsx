"use client";

import { useEffect, useRef } from "react";
import Eyebrow from "../ui/Eyebrow";

const PLAYBACK_RATE = 0.75;

function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyRate = () => {
      video.playbackRate = PLAYBACK_RATE;
    };

    applyRate();
    video.addEventListener("loadedmetadata", applyRate);
    video.addEventListener("play", applyRate);

    return () => {
      video.removeEventListener("loadedmetadata", applyRate);
      video.removeEventListener("play", applyRate);
    };
  }, []);

  return (
    <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl border border-black/[0.08] bg-surface shadow-card dark:border-white/15 dark:bg-[#141419]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full scale-[1.18] object-cover"
        src="/services/introvideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="How ScaleXpertz unifies services into one team for your business"
      />
    </div>
  );
}

export default function IntroStatement() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      <Eyebrow index="02" label="The Problem" className="text-center lg:text-left" />

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 text-center lg:text-left">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl md:text-4xl leading-[1.12]">
            Five Experts.<br />
            Five Priorities.<br />
            One Business.<br />
            <span className="text-accent">Congratulations. You&apos;re now managing six teams.</span>
          </h2>

          <div className="mt-6 mx-auto space-y-3 max-w-2xl text-sm sm:text-base leading-relaxed text-body font-medium lg:mx-0">
            <p>
              Every partner is optimizing their own work. Very few are optimizing your business.
            </p>
            <p>
              ScaleXpertz brings strategy, branding, websites, marketing, AI and execution under one strategy, so every decision moves your business in the same direction.
            </p>
          </div>

          <div className="mt-6 mx-auto max-w-md border-l-2 border-amber pl-4 py-1 text-left lg:mx-0 lg:max-w-none">
            <p className="font-display text-base font-bold tracking-tight text-ink sm:text-lg">
              One strategy. One team. One direction.
            </p>
          </div>
        </div>

        {/* Intro video */}
        <div className="lg:col-span-5 flex justify-center">
          <IntroVideo />
        </div>
      </div>
    </section>
  );
}
