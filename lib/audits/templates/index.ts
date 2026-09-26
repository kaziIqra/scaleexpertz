import type { AuditTemplate, AuditTemplateSummary } from "../types";
import { ecommerceGrowthAudit } from "./ecommerce-growth-audit";

/**
 * Registry of audit templates. To add a new audit type: create a file in this
 * folder exporting an AuditTemplate and add it to the list below.
 */
const ALL: AuditTemplate[] = [ecommerceGrowthAudit];

export const TEMPLATES: Record<string, AuditTemplate> = Object.fromEntries(
  ALL.map((t) => [t.slug, t])
);

export function getTemplate(slug: string): AuditTemplate | undefined {
  return TEMPLATES[slug];
}

export function listTemplateSummaries(): AuditTemplateSummary[] {
  return ALL.map((t) => ({
    slug: t.slug,
    version: t.version,
    name: t.name,
    description: t.description,
    placeholders: t.placeholders,
    pageCount: t.pages.length,
  }));
}
