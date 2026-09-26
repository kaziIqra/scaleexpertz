import type { AuditPage, Block, BlockType, PlaceholderDef } from "./types";

/** Client-safe factories for new blocks/pages in the template editor. */

export const BLOCK_LABELS: Record<BlockType, string> = {
  cover: "Cover page",
  heading: "Heading",
  paragraph: "Paragraph",
  bullets: "Bullet list",
  twoColBullets: "Two-column bullets",
  cardGrid: "Card grid",
  circleFlow: "Circle flow",
  funnel: "Funnel",
  arrowFlowCards: "Arrow flow cards",
  darkCards: "Dark cards",
  hub: "Hub diagram",
  table: "Table",
  roadmapTable: "Roadmap table",
  callout: "Dark callout",
  note: "Small note",
  boldLine: "Bold line",
  investmentBox: "Investment box",
  milestoneBar: "Milestone bar",
  closingBox: "Closing box",
  featureCards: "Feature cards",
  spacer: "Spacer",
};

/** Order shown in the "Add block" menu. */
export const ADDABLE_BLOCKS: BlockType[] = [
  "heading",
  "paragraph",
  "bullets",
  "twoColBullets",
  "boldLine",
  "note",
  "cardGrid",
  "table",
  "roadmapTable",
  "arrowFlowCards",
  "darkCards",
  "featureCards",
  "circleFlow",
  "funnel",
  "hub",
  "callout",
  "investmentBox",
  "milestoneBar",
  "closingBox",
  "spacer",
  "cover",
];

export function blankBlock(type: BlockType): Block {
  switch (type) {
    case "cover":
      return {
        type,
        eyebrow: "SCALEXPERTZ",
        title: "GROWTH AUDIT &\nEXECUTION BLUEPRINT",
        clientLine: "{{company}}",
        subtitle: "A {{timeline_days}}-Day Growth System built around the SCALE Framework™",
        steps: ["STRATEGY", "CREATE", "ACCELERATE", "LEAD", "EVOLVE"],
        tagline: "Strategy. Systems. Execution. Ownership. Growth.",
      };
    case "heading":
      return { type, eyebrow: "SECTION", title: "Page title", subtitle: "" };
    case "paragraph":
      return { type, text: "Paragraph text." };
    case "bullets":
      return { type, title: "", items: ["First point", "Second point"] };
    case "twoColBullets":
      return {
        type,
        cols: [
          { title: "LEFT", items: ["Point"] },
          { title: "RIGHT", items: ["Point"] },
        ],
      };
    case "cardGrid":
      return { type, title: "", cards: [{ title: "Card one" }, { title: "Card two" }] };
    case "circleFlow":
      return { type, title: "", labels: ["ONE", "TWO", "THREE", "FOUR"] };
    case "funnel":
      return { type, stages: ["UNDERSTAND", "DIAGNOSE", "PRIORITISE", "ROADMAP"] };
    case "arrowFlowCards":
      return { type, title: "", cards: [{ title: "Step 1" }, { title: "Step 2" }, { title: "Step 3" }] };
    case "darkCards":
      return { type, title: "", cards: [{ label: "Label", sub: "Sub-line" }, { label: "Label", sub: "Sub-line" }] };
    case "hub":
      return { type, inputs: ["Input A", "Input B", "Input C"], center: "Centre" };
    case "table":
      return { type, title: "", columns: ["Column", "Detail"], widths: [1, 2.4], rows: [["Row", "Detail"]] };
    case "roadmapTable":
      return {
        type,
        rows: [
          { period: "{{phase_1_range}}", focus: "Foundation", movement: "" },
          { period: "{{phase_2_range}}", focus: "Acceleration", movement: "" },
          { period: "{{phase_3_range}}", focus: "Optimisation", movement: "" },
        ],
      };
    case "callout":
      return { type, headline: "HEADLINE", sub: "Supporting line." };
    case "note":
      return { type, text: "Small disclaimer or note." };
    case "boldLine":
      return { type, text: "Bold statement." };
    case "investmentBox":
      return { type, label: "CONSOLIDATED INVESTMENT", amount: "{{investment_total_fmt}}" };
    case "milestoneBar":
      return {
        type,
        segments: [
          { label: "50%  {{milestone_1_amount}}", pct: 50 },
          { label: "30%  {{milestone_2_amount}}", pct: 30 },
          { label: "20%  {{milestone_3_amount}}", pct: 20 },
        ],
      };
    case "closingBox":
      return { type, brand: "ScaleXpertz", tagline: "Strategy. Systems. Execution. Ownership. Growth." };
    case "featureCards":
      return { type, cards: [{ title: "SEO", sub: "Discover", foot: "Owned growth foundation" }] };
    case "spacer":
      return { type, size: "md" };
  }
}

export function blankPage(index: number): AuditPage {
  return {
    id: `page-${Date.now().toString(36)}-${index}`,
    label: `New page ${index + 1}`,
    blocks: [blankBlock("heading"), blankBlock("paragraph")],
  };
}

export const BASE_PLACEHOLDERS: PlaceholderDef[] = [
  { key: "client_name", label: "Client / founder name", type: "text", required: true },
  { key: "company", label: "Business name (cover page)", type: "text", required: true },
  { key: "industry", label: "Industry label", type: "text", required: true },
  { key: "timeline_days", label: "Engagement length (days)", type: "number", required: true, default: "90" },
  { key: "investment_total", label: "Consolidated investment (₹)", type: "currency", required: true, default: "500000" },
];

export const PLACEHOLDER_TYPES: PlaceholderDef["type"][] = ["text", "textarea", "currency", "number", "date"];
