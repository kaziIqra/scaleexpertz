import type { AuditPage, AuditTemplate, PlaceholderValues } from "./types";

const TOKEN_RE = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;

/** Format a number as Indian rupees with lakh/crore grouping: 500000 → ₹5,00,000 */
export function formatINR(value: number | string): string {
  const n = typeof value === "string" ? Number(value.replace(/[^\d.]/g, "")) : value;
  if (!Number.isFinite(n)) return String(value);
  return "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

export function parseAmount(value: string | undefined): number {
  if (!value) return 0;
  const n = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatDate(d = new Date()): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Build the full token map for a template + stored values:
 * defaults ← stored values ← derived values ← built-ins (date, doc_title).
 */
export function resolveValues(
  template: Pick<AuditTemplate, "placeholders" | "derive" | "docTitle">,
  stored: PlaceholderValues
): PlaceholderValues {
  const values: PlaceholderValues = {};

  for (const def of template.placeholders) {
    if (def.default !== undefined) values[def.key] = def.default;
  }
  for (const [k, v] of Object.entries(stored)) {
    if (v !== undefined && v !== null && String(v).trim() !== "") values[k] = String(v);
  }

  // Currency placeholders get a formatted twin: investment_total → investment_total_fmt
  for (const def of template.placeholders) {
    if (def.type === "currency" && values[def.key]) {
      values[`${def.key}_fmt`] = formatINR(values[def.key]);
    }
  }

  if (template.derive) Object.assign(values, template.derive(values));

  values.date = values.date || formatDate();
  // Admin may override doc_title via a placeholder; otherwise use the template pattern.
  values.doc_title = values.doc_title?.trim() || interpolateString(template.docTitle, values);

  return values;
}

export function interpolateString(text: string, values: PlaceholderValues): string {
  return text.replace(TOKEN_RE, (match, key: string) => {
    const v = values[key];
    return v === undefined ? match : v;
  });
}

/** Deep-clone `node`, replacing {{tokens}} in every string leaf. */
export function interpolate<T>(node: T, values: PlaceholderValues): T {
  if (typeof node === "string") return interpolateString(node, values) as T;
  if (Array.isArray(node)) return node.map((n) => interpolate(n, values)) as T;
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      out[k] = interpolate(v, values);
    }
    return out as T;
  }
  return node;
}

/** Convenience: pages with every token resolved. */
export function interpolatePages(pages: AuditPage[], values: PlaceholderValues): AuditPage[] {
  return interpolate(pages, values);
}

/** Split a textarea value into trimmed, non-empty lines. */
export function splitLines(value: string | undefined): string[] {
  return (value || "")
    .split(/\r?\n/)
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}
