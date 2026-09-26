/**
 * Audit template + document model.
 *
 * A template is an ordered list of pages; each page is an ordered list of
 * typed blocks. Every string inside a block may contain `{{placeholder}}`
 * tokens which are replaced at render time (see interpolate.ts).
 */

export type PlaceholderType = "text" | "textarea" | "currency" | "date" | "number";

export interface PlaceholderDef {
  key: string;
  label: string;
  type: PlaceholderType;
  required?: boolean;
  default?: string;
  help?: string;
}

// ---------------------------------------------------------------- blocks

export interface CoverBlock {
  type: "cover";
  eyebrow: string;
  title: string;
  clientLine: string;
  subtitle: string;
  steps: string[];
  tagline: string;
}

export interface HeadingBlock {
  type: "heading";
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface BulletsBlock {
  type: "bullets";
  title?: string;
  items: string[];
}

export interface TwoColBulletsBlock {
  type: "twoColBullets";
  cols: [{ title: string; items: string[] }, { title: string; items: string[] }];
}

export interface CardGridBlock {
  type: "cardGrid";
  title?: string;
  cols?: 2 | 3;
  cards: { title: string; body?: string }[];
}

export interface CircleFlowBlock {
  type: "circleFlow";
  title?: string;
  labels: string[];
}

export interface FunnelBlock {
  type: "funnel";
  stages: string[];
}

export interface ArrowFlowCardsBlock {
  type: "arrowFlowCards";
  title?: string;
  cards: { title: string; sub?: string }[];
}

export interface DarkCardsBlock {
  type: "darkCards";
  title?: string;
  cards: { label: string; sub: string }[];
}

export interface HubBlock {
  type: "hub";
  inputs: string[];
  center: string;
}

export interface TableBlock {
  type: "table";
  title?: string;
  columns: string[];
  rows: string[][];
  /** Relative column widths, e.g. [1, 3]. Defaults to equal widths. */
  widths?: number[];
}

export interface RoadmapTableBlock {
  type: "roadmapTable";
  rows: { period: string; focus: string; movement: string }[];
}

export interface CalloutBlock {
  type: "callout";
  headline: string;
  sub?: string;
}

export interface NoteBlock {
  type: "note";
  text: string;
}

export interface BoldLineBlock {
  type: "boldLine";
  text: string;
}

export interface InvestmentBoxBlock {
  type: "investmentBox";
  label: string;
  amount: string;
}

export interface MilestoneBarBlock {
  type: "milestoneBar";
  segments: { label: string; pct: number }[];
}

export interface ClosingBoxBlock {
  type: "closingBox";
  brand: string;
  tagline: string;
}

export interface FeatureCardsBlock {
  type: "featureCards";
  cards: { title: string; sub: string; foot: string }[];
}

export interface SpacerBlock {
  type: "spacer";
  size?: "sm" | "md" | "lg";
}

export type Block =
  | CoverBlock
  | HeadingBlock
  | ParagraphBlock
  | BulletsBlock
  | TwoColBulletsBlock
  | CardGridBlock
  | CircleFlowBlock
  | FunnelBlock
  | ArrowFlowCardsBlock
  | DarkCardsBlock
  | HubBlock
  | TableBlock
  | RoadmapTableBlock
  | CalloutBlock
  | NoteBlock
  | BoldLineBlock
  | InvestmentBoxBlock
  | MilestoneBarBlock
  | ClosingBoxBlock
  | FeatureCardsBlock
  | SpacerBlock;

export type BlockType = Block["type"];

// ----------------------------------------------------------------- pages

export interface AuditPage {
  id: string;
  /** Short label shown in the admin editor accordion. */
  label: string;
  blocks: Block[];
}

// -------------------------------------------------------------- template

export type PlaceholderValues = Record<string, string>;

/**
 * Data-only derivation: `{{key}}` = formatted INR of `source` × pct / 100.
 * Lets DB templates compute milestone splits without code.
 */
export interface DerivedRule {
  key: string;
  source: string;
  pct: number;
}

export type TemplateSource = "code" | "custom";

export interface AuditTemplate {
  slug: string;
  version: number;
  name: string;
  description: string;
  /** Appears in the page footer: "ScaleXpertz | {docTitle}". May use tokens. */
  docTitle: string;
  placeholders: PlaceholderDef[];
  /** Percentage-of-amount tokens (e.g. milestone amounts). */
  derived?: DerivedRule[];
  /** Code templates may add arbitrary computed tokens. */
  derive?: (values: PlaceholderValues) => PlaceholderValues;
  pages: AuditPage[];
  source?: TemplateSource;
  /** DB id for custom templates. */
  id?: string;
}

/** Template metadata safe to send to the client (no functions/pages). */
export interface AuditTemplateSummary {
  slug: string;
  version: number;
  name: string;
  description: string;
  docTitle: string;
  placeholders: PlaceholderDef[];
  derived: DerivedRule[];
  pageCount: number;
  source: TemplateSource;
  updated_at?: string;
}

/** Full editable template as sent to / from the admin template editor. */
export interface AuditTemplateDoc extends AuditTemplateSummary {
  pages: AuditPage[];
}

// ---------------------------------------------------------------- audits

export type AuditStatus = "draft" | "final";

export interface ClientAudit {
  id: string;
  template_slug: string;
  template_version: number;
  client_name: string;
  company: string;
  industry: string | null;
  placeholder_values: PlaceholderValues;
  sections: AuditPage[];
  status: AuditStatus;
  pdf_path: string | null;
  version: number;
  created_at: string;
  updated_at: string;
}

export type ClientAuditListItem = Pick<
  ClientAudit,
  | "id"
  | "template_slug"
  | "client_name"
  | "company"
  | "industry"
  | "status"
  | "pdf_path"
  | "version"
  | "created_at"
  | "updated_at"
>;
