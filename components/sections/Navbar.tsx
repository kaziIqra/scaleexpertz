"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import LogoEntrance from "@/components/ui/LogoEntrance";
import Magnetic from "@/components/ui/Magnetic";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { usePreloaderDone } from "@/lib/preloader";
import { useLenis } from "@/components/providers/SmoothScroll";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "@/lib/animations";
import { LuLock } from "react-icons/lu";

const LINKS = [
  { label: "Framework", href: "#framework" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const ABOUT_LINKS = [
  { label: "Teams", href: "/teams" },
  { label: "Careers", href: "/careers" },
  { label: "Apply", href: "/apply" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const done = usePreloaderDone();
  const pathname = usePathname();
  const lenis = useLenis();
  const animateHomeLogo = pathname === "/" && done;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll behind the mobile menu; Escape closes it.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const goTo = (href: string) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Anchor targets only exist on the homepage — from other routes, go there.
    if (!document.querySelector(href)) {
      window.location.assign(`/${href}`);
      return;
    }
    lenis?.start();
    if (lenis) lenis.scrollTo(href, { offset: -96, duration: 1.4 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100] flex justify-center"
        initial={{ y: -24, opacity: 0 }}
        animate={done ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
      >
        <div
          className={`flex w-full items-center justify-between transition-all duration-500 ease-out ${scrolled
            ? "mx-3 mt-3 max-w-[1080px] rounded-full border border-black/[0.08] dark:border-white/15 bg-white/90 dark:bg-[#141419]/90 px-5 py-2.5 shadow-card backdrop-blur-xl md:mx-6"
            : "max-w-[1440px] border border-transparent bg-transparent px-6 py-5 md:px-12"
            }`}
        >
          <a
            href="/"
            onClick={(e) => {
              setOpen(false);
              if (pathname === "/") {
                e.preventDefault();
                lenis ? lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex shrink-0 items-center gap-2 font-display text-lg sm:text-xl font-semibold tracking-tight text-ink dark:text-white"
            aria-label="ScaleXpertz — home"
          >
            <div className="relative inline-flex shrink-0 items-center">
              {/* Dark Theme Logo */}
              <Image
                src="/logo-mark-3d-dark.png"
                alt="ScaleXpertz Logo"
                width={441}
                height={344}
                priority
                className="h-7 sm:h-8 w-auto hidden dark:block object-contain"
              />
              {/* Light Theme Logo */}
              <Image
                src="/image.png"
                alt="ScaleXpertz Logo"
                width={212}
                height={160}
                priority
                className="h-7 sm:h-8 w-auto block dark:hidden object-contain"
              />
            </div>
            <span className="whitespace-nowrap">ScaleXpertz<span className="text-accent dark:text-amber">.</span></span>
          </a>

          <nav className="hidden items-center gap-4 lg:gap-6 md:flex" aria-label="Primary">
            {LINKS.slice(0, 2).map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={goTo(l.href)}
                className="group relative text-xs lg:text-sm font-medium text-ink/70 dark:text-slate-300 transition-colors duration-300 hover:text-ink dark:hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink dark:bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}

            {/* About Us — hover dropdown */}
            <div className="group relative">
              <button
                type="button"
                aria-haspopup="menu"
                className="flex items-center gap-1 text-xs lg:text-sm font-medium text-ink/70 dark:text-slate-300 transition-colors duration-300 group-hover:text-ink dark:group-hover:text-white"
              >
                About Us
                <svg
                  viewBox="0 0 12 12"
                  className="h-3 w-3 transition-transform duration-300 ease-out group-hover:rotate-180"
                  aria-hidden
                >
                  <path
                    d="M2.5 4.5 6 8l3.5-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* pt-3 bridges the gap so hover doesn't drop between button and panel */}
              <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="w-44 rounded-2xl border border-black/[0.08] dark:border-white/15 bg-white/95 dark:bg-[#141419]/95 p-2 shadow-card backdrop-blur-xl">
                  {ABOUT_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block rounded-xl px-4 py-2.5 text-xs lg:text-sm font-medium text-ink/70 dark:text-slate-300 transition-colors duration-200 hover:bg-ink/[0.05] dark:hover:bg-white/10 hover:text-ink dark:hover:text-white"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {LINKS.slice(2).map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={goTo(l.href)}
                className="group relative text-xs lg:text-sm font-medium text-ink/70 dark:text-slate-300 transition-colors duration-300 hover:text-ink dark:hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink dark:bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <ThemeToggle />

            <Magnetic className="hidden md:inline-block">
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-strong px-5 py-2.5 text-xs lg:text-sm font-bold text-ink shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/40 active:scale-95"
              >
                Book a Call
              </Link>
            </Magnetic>

            {/* Subtle, elegant Login button at the very end of desktop nav */}
            <Link
              href="/admin"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-2 text-xs font-medium text-ink/60 dark:text-slate-400 backdrop-blur-sm transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:text-ink dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              title="Admin Login"
            >
              <LuLock size={11} className="text-ink/50 dark:text-slate-400" />
              <span>Login</span>
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span
                className={`absolute h-px w-5 bg-ink dark:bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3.5px]"
                  }`}
              />
              <span
                className={`absolute h-px w-5 bg-ink dark:bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3.5px]"
                  }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[95] flex flex-col justify-between overflow-y-auto bg-paper dark:bg-[#0c0c10] px-6 pb-8 pt-24 md:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
          >
            {/* faint texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
            />

            <nav aria-label="Mobile" className="my-auto py-4">
              <div className="space-y-1">
                {LINKS.map((l, i) => (
                  <span key={l.href} className="block overflow-hidden">
                    <motion.a
                      href={l.href}
                      onClick={goTo(l.href)}
                      className="inline-flex items-baseline py-1.5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink dark:text-white transition-colors hover:text-accent dark:hover:text-amber"
                      initial={{ y: "110%" }}
                      animate={{
                        y: 0,
                        transition: { delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE_OUT_EXPO },
                      }}
                      exit={{ y: "110%", transition: { duration: 0.25 } }}
                    >
                      <span className="mr-3 font-mono text-xs sm:text-sm font-semibold tracking-wider text-accent dark:text-amber">
                        0{i + 1}
                      </span>
                      <span>{l.label}</span>
                    </motion.a>
                  </span>
                ))}
              </div>

              {/* About Us group */}
              <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
                <motion.p
                  className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50 dark:text-white/50 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.4 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  About Us
                </motion.p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {ABOUT_LINKS.map((l, i) => (
                    <span key={l.href} className="block overflow-hidden">
                      <motion.span
                        className="block"
                        initial={{ y: "110%" }}
                        animate={{
                          y: 0,
                          transition: {
                            delay: 0.5 + i * 0.05,
                            duration: 0.6,
                            ease: EASE_OUT_EXPO,
                          },
                        }}
                        exit={{ y: "110%", transition: { duration: 0.2 } }}
                      >
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="block py-1 font-display text-lg sm:text-xl font-semibold text-ink/80 dark:text-slate-200 transition-colors hover:text-accent dark:hover:text-amber"
                        >
                          {l.label}
                        </Link>
                      </motion.span>
                    </span>
                  ))}
                </div>
              </div>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex flex-col gap-3.5"
            >
              <Link
                href="/diagnosis"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent via-amber to-accent bg-[length:200%_auto] px-6 py-3.5 text-base font-bold text-ink shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-center"
              >
                <span>Book a Call</span>
                <span className="text-lg">→</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 dark:border-white/12 bg-white/40 dark:bg-white/[0.04] px-6 py-3 text-sm font-semibold text-ink dark:text-white transition-all hover:border-accent hover:text-accent dark:hover:text-amber text-center"
              >
                <LuLock size={14} className="text-accent dark:text-amber" />
                <span>Admin Login</span>
              </Link>
              <a
                href="mailto:scalexpertz@gmail.com"
                className="text-center font-mono text-xs uppercase tracking-[0.2em] text-ink/50 dark:text-white/50 hover:text-accent dark:hover:text-amber transition-colors"
              >
                scalexpertz@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
