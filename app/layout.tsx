import type { Metadata, Viewport } from "next";
import { jakarta, jetbrainsMono, playfair, switzer } from "@/lib/fonts";
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

/** Runs pre-paint so returning visitors never see the preloader flash & default to dark theme. */
const PRELOADER_SKIP = `try{var t=localStorage.getItem("theme");if(t==="dark"||!t)document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark");if(sessionStorage.getItem("sx-preloaded")==="1")document.documentElement.dataset.preloaded="1"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${switzer.variable} ${jetbrainsMono.variable} ${playfair.variable} ${jakarta.variable} antialiased dark`}
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
      </body>
    </html>
  );
}
