"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScroll";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] =
  [
    {
      heading: "Services",
      links: [
        { label: "Web Development", href: "#services" },
        { label: "App Development", href: "#services" },
        { label: "Digital Marketing", href: "#services" },
        { label: "Finance & Accounting", href: "#services" },
        { label: "Branding & Design", href: "#services" },
        { label: "AI Solutions", href: "#services" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Why ScaleXpertz", href: "#about" },
        { label: "Our Process", href: "#process" },
        { label: "Featured Work", href: "#work" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Case Studies", href: "#work" },
        { label: "Careers", href: "/careers" },
        { label: "Teams", href: "/teams" },
      ],
    },
  ];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/scalexpertz/posts/?feedView=all",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden
      >
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/scalexpertz/?hl=en",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ScaleXpertz",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden
      >
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107A30.12 30.12 0 0 0 0 12c0 2.18.1 4.358.502 6.163a3.003 3.003 0 0 0 2.11 2.107c1.883.51 9.388.51 9.388.51s7.505 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.107A30.12 30.12 0 0 0 24 12a30.12 30.12 0 0 0-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [subscribed, setSubscribed] = useState(false);
  const lenis = useLenis();

  // massive watermark slides up slightly as the footer scrolls into view
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const watermark = ref.current?.querySelector("[data-watermark]");
      if (watermark) {
        gsap.fromTo(
          watermark,
          { yPercent: 36 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  const goTo = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith("#") || href === "#") return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(href, { offset: -96, duration: 1.4 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-black/[0.05]"
    >
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-20 md:px-12 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* brand + newsletter */}
          <div className="md:col-span-4 text-center md:text-left">
            <p className="font-display text-2xl font-semibold tracking-tight text-ink">
              ScaleXpertz<span className="text-accent">.</span>
            </p>
            <p className="mt-4 mx-auto max-w-xs text-sm leading-relaxed text-body md:mx-0">
              The all-in-one partner for businesses that want to scale
              everything at once.
            </p>

            <form onSubmit={onSubscribe} className="mt-8 mx-auto max-w-xs md:mx-0">
              <label
                htmlFor="newsletter"
                className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50"
              >
                Growth notes, monthly
              </label>
              <div className="group mt-3 flex items-center border-b border-ink/20 pb-2 transition-colors duration-300 focus-within:border-accent">
                <input
                  id="newsletter"
                  type="email"
                  required
                  disabled={subscribed}
                  placeholder={subscribed ? "You're in ✓" : "you@company.com"}
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35 disabled:placeholder:text-accent"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  disabled={subscribed}
                  className="text-ink transition-transform duration-300 ease-out hover:translate-x-1 disabled:opacity-40"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2 8h11M9 3.5 13.5 8 9 12.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* link columns */}
          {COLUMNS.map((col) => (
            <nav
              key={col.heading}
              aria-label={col.heading}
              className="md:col-span-2 text-center md:text-left"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={goTo(l.href)}
                      className="text-sm text-body transition-colors duration-300 hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* contact + socials */}
          <div className="md:col-span-2 text-center md:text-left">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-body">
              <li>
                <a
                  href="mailto:scalexpertz@gmail.com"
                  className="transition-colors duration-300 hover:text-ink"
                >
                  scalexpertz@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919211564169"
                  className="transition-colors duration-300 hover:text-ink"
                >
                  +91 9211564169
                </a>
              </li>
              <li>Remote-first, worldwide</li>
            </ul>
            <div className="mt-6 flex justify-center gap-3 md:justify-start">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-surface text-ink/70 shadow-card transition-all duration-300 hover:-translate-y-1 hover:text-ink hover:shadow-card-hover"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 border-t border-black/[0.05] pt-6 text-center sm:flex-row sm:flex-wrap sm:justify-between sm:text-left">
          <p className="text-xs text-ink/40">
            © {new Date().getFullYear()} ScaleXpertz. All rights reserved.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
            Made with precision
          </p>
        </div>
      </div>

      {/* massive watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden"
      >
        <p
          data-watermark
          className="whitespace-nowrap text-center font-display text-[12.5vw] font-bold leading-[0.8] tracking-[-0.02em] text-ink/[0.45]"
        >
          SCALEXPERTZ
        </p>
      </div>
    </footer>
  );
}
