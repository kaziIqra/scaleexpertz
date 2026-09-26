import type { AuditTemplate } from "../types";
import { ecommerceGrowthAudit } from "./ecommerce-growth-audit";

/**
 * Registry of code-defined (read-only) audit templates. Admins can also create
 * custom templates in the panel; see lib/audits/templateStore.ts for the
 * merged view.
 */
const ALL: AuditTemplate[] = [ecommerceGrowthAudit];

export const TEMPLATES: Record<string, AuditTemplate> = Object.fromEntries(
  ALL.map((t) => [t.slug, t])
);

export function getTemplate(slug: string): AuditTemplate | undefined {
  return TEMPLATES[slug];
}
