import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";

export const clashDisplay = localFont({
  src: [
    { path: "../app/fonts/ClashDisplay-400.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "../app/fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
