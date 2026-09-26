/** Brand tokens for the PDF renderer. Mirrors app/globals.css. */
export const colors = {
  ink: "#0a0a0a",
  night: "#0c0c0e",
  nightCard: "#141419",
  paper: "#f7f5ef",
  surface: "#ffffff",
  gold: "#d4af37",
  goldStrong: "#b8962e",
  goldSoft: "#e2c968",
  goldFaint: "#efe1b3",
  amber: "#f59e0b",
  body: "#3f3f46",
  muted: "#6b6b74",
  faint: "#9a9aa3",
  line: "#e2dfd6",
  lineDark: "#26262c",
  rowAlt: "#f0eee8",
  white: "#ffffff",
} as const;

/** A4 in points: 595.28 x 841.89 */
export const page = {
  width: 595.28,
  height: 841.89,
  paddingTop: 50,
  paddingBottom: 64,
  paddingX: 44,
} as const;

export const contentWidth = page.width - page.paddingX * 2;

export const font = {
  family: "Switzer",
  /** Used only for glyphs Switzer lacks (→ ₹). */
  fallback: "Inter",
} as const;

export const type = {
  eyebrow: { fontSize: 7.5, letterSpacing: 1.2, color: colors.goldStrong, fontWeight: 600 },
  title: { fontSize: 24, fontWeight: 700, color: colors.ink, letterSpacing: -0.4, lineHeight: 1.15 },
  subtitle: { fontSize: 9.5, color: colors.muted, fontWeight: 400 },
  body: { fontSize: 9.8, lineHeight: 1.5, color: colors.body },
  bold: { fontSize: 10, lineHeight: 1.45, color: colors.ink, fontWeight: 600 },
  note: { fontSize: 7.4, lineHeight: 1.45, color: colors.muted },
  sectionLabel: { fontSize: 7.5, letterSpacing: 1, color: colors.goldStrong, fontWeight: 600 },
  cardTitle: { fontSize: 9.6, fontWeight: 600, color: colors.ink, lineHeight: 1.3 },
  small: { fontSize: 7.5, color: colors.muted },
} as const;
