import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Font } from "@react-pdf/renderer";
import { font } from "./theme";

/**
 * Switzer (Fontshare, ITF Free Font License) is the brand face. It has no
 * glyphs for "→" (U+2192) or "₹" (U+20B9), so Inter (SIL OFL) is registered
 * as a fallback family and RichText.tsx swaps those runs to it.
 */
const FAMILIES = [
  {
    family: font.family,
    dir: ["fonts", "switzer", "otf"],
    files: { 400: "Switzer-Regular.otf", 500: "Switzer-Medium.otf", 600: "Switzer-Semibold.otf", 700: "Switzer-Bold.otf", 800: "Switzer-Extrabold.otf" },
  },
  {
    family: font.fallback,
    dir: ["fonts", "inter"],
    files: { 400: "Inter-Regular.ttf", 500: "Inter-Medium.ttf", 600: "Inter-SemiBold.ttf", 700: "Inter-Bold.ttf", 800: "Inter-ExtraBold.ttf" },
  },
] as const;

let registered = false;

/**
 * Resolve where a font file lives for this runtime.
 * 1. Local file under public/ (dev, and Netlify when traced via outputFileTracingIncludes)
 * 2. PDF_FONT_BASE_URL env (explicit override, points at the public/fonts folder)
 * 3. Deployed site URL (Netlify sets URL) → /fonts/...
 */
function resolveSource(dir: readonly string[], file: string): string {
  const local = path.join(process.cwd(), "public", ...dir, file);
  if (fs.existsSync(local)) return local;

  const base =
    process.env.PDF_FONT_BASE_URL ||
    (process.env.URL ? `${process.env.URL}/fonts` : null) ||
    (process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/fonts` : null);

  if (!base) {
    throw new Error(`Font file not found at ${local} and no PDF_FONT_BASE_URL / URL env is set.`);
  }
  return `${base.replace(/\/$/, "")}/${dir.slice(1).join("/")}/${file}`;
}

export function registerFonts() {
  if (registered) return;

  for (const fam of FAMILIES) {
    Font.register({
      family: fam.family,
      fonts: Object.entries(fam.files).map(([weight, file]) => ({
        src: resolveSource(fam.dir, file),
        fontWeight: Number(weight),
      })),
    });
  }

  // Never hyphenate — keeps headings and labels intact.
  Font.registerHyphenationCallback((word) => [word]);

  registered = true;
}

/** Absolute path to a public asset (for fs checks). */
export function publicAssetPath(relative: string): string {
  return path.join(process.cwd(), "public", relative);
}

/**
 * file:// URL for <Image src>. A bare Windows path such as C:\... parses as a
 * URL with protocol "c:" inside @react-pdf/image and gets fetched over HTTP.
 */
export function publicAssetUrl(relative: string): string {
  return pathToFileURL(publicAssetPath(relative)).href;
}
