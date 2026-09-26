import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { TEMPLATES } from "./templates";
import type {
  AuditPage,
  AuditTemplate,
  AuditTemplateDoc,
  AuditTemplateSummary,
  DerivedRule,
  PlaceholderDef,
} from "./types";

/**
 * Unified template access: code templates (read-only, shipped with the app)
 * plus custom templates admins create in the panel (audit_templates table).
 */

export interface TemplateRow {
  id: string;
  slug: string;
  name: string;
  description: string;
  doc_title: string;
  placeholders: PlaceholderDef[];
  derived: DerivedRule[];
  pages: AuditPage[];
  version: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const ROW_COLUMNS = "id, slug, name, description, doc_title, placeholders, derived, pages, version, is_active, created_at, updated_at";

export function rowToTemplate(row: TemplateRow): AuditTemplate {
  return {
    id: row.id,
    slug: row.slug,
    version: row.version,
    name: row.name,
    description: row.description ?? "",
    docTitle: row.doc_title,
    placeholders: row.placeholders ?? [],
    derived: row.derived ?? [],
    pages: row.pages ?? [],
    source: "custom",
  };
}

export function toSummary(t: AuditTemplate, updated_at?: string): AuditTemplateSummary {
  return {
    slug: t.slug,
    version: t.version,
    name: t.name,
    description: t.description,
    docTitle: t.docTitle,
    placeholders: t.placeholders,
    derived: t.derived ?? [],
    pageCount: t.pages.length,
    source: t.source ?? "code",
    updated_at,
  };
}

export function toDoc(t: AuditTemplate, updated_at?: string): AuditTemplateDoc {
  return { ...toSummary(t, updated_at), pages: t.pages };
}

export function isCodeTemplate(slug: string): boolean {
  return Boolean(TEMPLATES[slug]);
}

/** Load a template by slug: code first, then DB. */
export async function loadTemplate(slug: string): Promise<AuditTemplate | null> {
  const code = TEMPLATES[slug];
  if (code) return { ...code, source: "code" };
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase.from("audit_templates").select(ROW_COLUMNS).eq("slug", slug).maybeSingle();
  if (error || !data) return null;
  return rowToTemplate(data as TemplateRow);
}

/** All templates (code + active custom), code first. */
export async function listTemplates(): Promise<{ summaries: AuditTemplateSummary[]; error?: string }> {
  const summaries = Object.values(TEMPLATES).map((t) => toSummary({ ...t, source: "code" }));
  if (!isSupabaseConfigured()) return { summaries };

  const { data, error } = await supabase
    .from("audit_templates")
    .select(ROW_COLUMNS)
    .eq("is_active", true)
    .order("updated_at", { ascending: false });

  if (error) {
    // Table may not exist yet; still return code templates so the panel works.
    return { summaries, error: error.message };
  }
  for (const row of (data ?? []) as TemplateRow[]) {
    summaries.push(toSummary(rowToTemplate(row), row.updated_at));
  }
  return { summaries };
}

/** kebab-case a name into a unique slug (checks both code and DB). */
export async function uniqueSlug(name: string): Promise<string> {
  const base =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "template";

  let slug = base;
  for (let i = 2; i < 50; i++) {
    if (!isCodeTemplate(slug)) {
      const { data } = await supabase.from("audit_templates").select("id").eq("slug", slug).maybeSingle();
      if (!data) return slug;
    }
    slug = `${base}-${i}`;
  }
  return `${base}-${Date.now().toString(36)}`;
}
