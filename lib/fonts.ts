import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

/**
 * Switzer (Fontshare / ITF Free Font License) — free Neue Haas Grotesk
 * alternative. Self-hosted woff2 files from Fontshare; do not substitute
 * pirated Neue Haas Grotesk files.
 */
export const switzer = localFont({
  src: [
    {
      path: "../public/fonts/switzer/Switzer-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/switzer/Switzer-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/switzer/Switzer-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/switzer/Switzer-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/switzer/Switzer-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/switzer/Switzer-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
