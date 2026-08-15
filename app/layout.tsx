import type { Metadata, Viewport } from "next";
import { jetbrainsMono, switzer } from "@/lib/fonts";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { MotionPrefProvider, MotionToggle } from "@/components/providers/MotionPref";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Preloader from "@/components/ui/Preloader";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScaleXpertz — Every Service. One Partner.",
  description:
    "Every agency promises to make things simple. Most just give you another WhatsApp group. We bring strategy, branding, marketing, AI, websites, and execution under one team—so you can focus on growth.",
  openGraph: {
    title: "ScaleXpertz — Every Service. One Partner.",
    description:
      "Every agency promises to make things simple. Most just give you another WhatsApp group. We bring strategy, branding, marketing, AI, websites, and execution under one team—so you can focus on growth.",
    siteName: "ScaleXpertz",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0C0E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/** Runs pre-paint so returning visitors never see the preloader flash & default to dark theme */
const PRELOADER_SKIP = `try{var t=localStorage.getItem("theme");if(t==="dark"||!t)document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark");if(sessionStorage.getItem("sx-preloaded")==="1")document.documentElement.dataset.preloaded="1"}catch(e){}`;

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${switzer.variable} ${jetbrainsMono.variable} antialiased dark`}
    >
      <body className="bg-paper font-sans text-body transition-colors duration-400">
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_SKIP }} />
        <MotionPrefProvider>
          <ThemeProvider>
            <SmoothScroll>
              <Preloader />
              {children}
            </SmoothScroll>
          </ThemeProvider>
          <MotionToggle />
        </MotionPrefProvider>
        {/* film grain over everything (including the preloader) */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[220] opacity-[0.035]"
          style={{ backgroundImage: GRAIN }}
        />
      </body>
    </html>
  );
}
