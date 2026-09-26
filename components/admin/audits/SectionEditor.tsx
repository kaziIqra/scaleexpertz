"use client";

import { useState } from "react";
import { LuChevronDown, LuChevronUp, LuArrowUp, LuArrowDown, LuTrash2 } from "react-icons/lu";
import type { AuditPage, Block } from "@/lib/audits/types";
import { smallInputClass, textareaClass, mutedLabelClass, dangerBtnClass } from "../ui";

interface Props {
  pages: AuditPage[];
  onChange: (pages: AuditPage[]) => void;
}

const BLOCK_LABELS: Record<Block["type"], string> = {
  cover: "Cover",
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

// ------------------------------------------------------------ field helpers

function TextField({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <label className="grid gap-1">
      <span className={mutedLabelClass}>{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} className={textareaClass} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={smallInputClass} />
      )}
    </label>
  );
}

/** string[] edited as one item per line */
function LinesField({ label, value, onChange, hint }: { label: string; value: string[]; onChange: (v: string[]) => void; hint?: string }) {
  return (
    <label className="grid gap-1">
      <span className={mutedLabelClass}>
        {label} <span className="normal-case tracking-normal text-slate-400">— {hint ?? "one per line"}</span>
      </span>
      <textarea
        value={value.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n"))}
        onBlur={(e) => onChange(e.target.value.split("\n").filter((l) => l.trim() !== ""))}
        className={textareaClass}
        rows={Math.min(10, Math.max(3, value.length + 1))}
      />
    </label>
  );
}

/** string[][] edited as "cell | cell | cell" per line */
function GridField({ label, value, onChange }: { label: string; value: string[][]; onChange: (v: string[][]) => void }) {
  const text = value.map((r) => r.join(" | ")).join("\n");
  return (
    <label className="grid gap-1">
      <span className={mutedLabelClass}>
        {label} <span className="normal-case tracking-normal text-slate-400">— one row per line, cells separated by |</span>
      </span>
      <textarea
        defaultValue={text}
        key={text.length + ":" + value.length}
        onBlur={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .filter((l) => l.trim() !== "")
              .map((l) => l.split("|").map((c) => c.trim()))
          )
        }
        className={textareaClass}
        rows={Math.min(12, Math.max(3, value.length + 1))}
      />
    </label>
  );
}

/** Array of objects with a fixed set of string keys, rendered as a small row list. */
function RowsField<T extends Record<string, string | number | undefined>>({
  label,
  value,
  fields,
  onChange,
  blank,
}: {
  label: string;
  value: T[];
  fields: { key: keyof T & string; label: string; multiline?: boolean; number?: boolean }[];
  onChange: (v: T[]) => void;
  blank: T;
}) {
  const update = (i: number, key: keyof T & string, v: string) => {
    const next = value.map((row, ri) => (ri === i ? { ...row, [key]: fields.find((f) => f.key === key)?.number ? Number(v) : v } : row));
    onChange(next);
  };
  return (
    <div className="grid gap-2">
      <span className={mutedLabelClass}>{label}</span>
      {value.map((row, i) => (
        <div key={i} className="flex items-start gap-2 rounded-lg border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] p-2">
          <div className="grid flex-1 gap-1.5 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={f.key} className={`grid gap-0.5 ${f.multiline ? "sm:col-span-2" : ""}`}>
                <span className="text-[10px] text-slate-400">{f.label}</span>
                {f.multiline ? (
                  <textarea value={String(row[f.key] ?? "")} onChange={(e) => update(i, f.key, e.target.value)} className={`${textareaClass} min-h-[48px]`} />
                ) : (
                  <input
                    type={f.number ? "number" : "text"}
                    value={String(row[f.key] ?? "")}
                    onChange={(e) => update(i, f.key, e.target.value)}
                    className={smallInputClass}
                  />
                )}
              </label>
            ))}
          </div>
          <button
            type="button"
            title="Remove"
            onClick={() => onChange(value.filter((_, ri) => ri !== i))}
            className={`${dangerBtnClass} mt-4`}
          >
            <LuTrash2 size={13} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { ...blank }])}
        className="justify-self-start text-[11px] font-semibold text-amber hover:underline cursor-pointer"
      >
        + Add row
      </button>
    </div>
  );
}

// ------------------------------------------------------------- block editor

function BlockEditor({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const patch = <B extends Block>(p: Partial<B>) => onChange({ ...(block as B), ...p } as Block);

  switch (block.type) {
    case "cover":
      return (
        <div className="grid gap-3">
          <TextField label="Eyebrow" value={block.eyebrow} onChange={(v) => patch({ eyebrow: v })} />
          <TextField label="Title" value={block.title} onChange={(v) => patch({ title: v })} multiline />
          <TextField label="Client line" value={block.clientLine} onChange={(v) => patch({ clientLine: v })} />
          <TextField label="Subtitle" value={block.subtitle} onChange={(v) => patch({ subtitle: v })} />
          <LinesField label="Step chips" value={block.steps} onChange={(v) => patch({ steps: v })} />
          <TextField label="Tagline" value={block.tagline} onChange={(v) => patch({ tagline: v })} />
        </div>
      );
    case "heading":
      return (
        <div className="grid gap-3">
          <TextField label="Eyebrow" value={block.eyebrow} onChange={(v) => patch({ eyebrow: v })} />
          <TextField label="Title" value={block.title} onChange={(v) => patch({ title: v })} />
          <TextField label="Subtitle" value={block.subtitle ?? ""} onChange={(v) => patch({ subtitle: v })} />
        </div>
      );
    case "paragraph":
    case "note":
    case "boldLine":
      return <TextField label="Text" value={block.text} onChange={(v) => patch({ text: v })} multiline />;
    case "bullets":
      return (
        <div className="grid gap-3">
          <TextField label="Section label (optional)" value={block.title ?? ""} onChange={(v) => patch({ title: v })} />
          <LinesField label="Items" value={block.items} onChange={(v) => patch({ items: v })} />
        </div>
      );
    case "twoColBullets":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {block.cols.map((col, ci) => (
            <div key={ci} className="grid gap-2">
              <TextField
                label={`Column ${ci + 1} label`}
                value={col.title}
                onChange={(v) => {
                  const cols = [...block.cols] as typeof block.cols;
                  cols[ci] = { ...col, title: v };
                  patch({ cols });
                }}
              />
              <LinesField
                label="Items"
                value={col.items}
                onChange={(v) => {
                  const cols = [...block.cols] as typeof block.cols;
                  cols[ci] = { ...col, items: v };
                  patch({ cols });
                }}
              />
            </div>
          ))}
        </div>
      );
    case "cardGrid":
      return (
        <div className="grid gap-3">
          <TextField label="Section label (optional)" value={block.title ?? ""} onChange={(v) => patch({ title: v })} />
          <RowsField
            label="Cards"
            value={block.cards}
            fields={[
              { key: "title", label: "Title" },
              { key: "body", label: "Body (optional)", multiline: true },
            ]}
            onChange={(v) => patch({ cards: v })}
            blank={{ title: "", body: "" }}
          />
        </div>
      );
    case "circleFlow":
      return (
        <div className="grid gap-3">
          <TextField label="Section label (optional)" value={block.title ?? ""} onChange={(v) => patch({ title: v })} />
          <LinesField label="Circle labels" value={block.labels} onChange={(v) => patch({ labels: v })} />
        </div>
      );
    case "funnel":
      return <LinesField label="Funnel stages (top → bottom)" value={block.stages} onChange={(v) => patch({ stages: v })} />;
    case "arrowFlowCards":
      return (
        <div className="grid gap-3">
          <TextField label="Section label (optional)" value={block.title ?? ""} onChange={(v) => patch({ title: v })} />
          <RowsField
            label="Cards"
            value={block.cards}
            fields={[
              { key: "title", label: "Title" },
              { key: "sub", label: "Sub-line (optional)" },
            ]}
            onChange={(v) => patch({ cards: v })}
            blank={{ title: "", sub: "" }}
          />
        </div>
      );
    case "darkCards":
      return (
        <div className="grid gap-3">
          <TextField label="Section label (optional)" value={block.title ?? ""} onChange={(v) => patch({ title: v })} />
          <RowsField
            label="Cards"
            value={block.cards}
            fields={[
              { key: "label", label: "Label (gold)" },
              { key: "sub", label: "Sub-line" },
            ]}
            onChange={(v) => patch({ cards: v })}
            blank={{ label: "", sub: "" }}
          />
        </div>
      );
    case "featureCards":
      return (
        <RowsField
          label="Feature cards"
          value={block.cards}
          fields={[
            { key: "title", label: "Title (big gold)" },
            { key: "sub", label: "Sub-line" },
            { key: "foot", label: "Footer text" },
          ]}
          onChange={(v) => patch({ cards: v })}
          blank={{ title: "", sub: "", foot: "" }}
        />
      );
    case "hub":
      return (
        <div className="grid gap-3">
          <LinesField label="Input boxes" value={block.inputs} onChange={(v) => patch({ inputs: v })} />
          <TextField label="Centre box" value={block.center} onChange={(v) => patch({ center: v })} />
        </div>
      );
    case "table":
      return (
        <div className="grid gap-3">
          <TextField label="Section label (optional)" value={block.title ?? ""} onChange={(v) => patch({ title: v })} />
          <LinesField label="Column headers" value={block.columns} onChange={(v) => patch({ columns: v })} />
          <GridField label="Rows" value={block.rows} onChange={(v) => patch({ rows: v })} />
        </div>
      );
    case "roadmapTable":
      return (
        <RowsField
          label="Roadmap rows"
          value={block.rows}
          fields={[
            { key: "period", label: "Period" },
            { key: "focus", label: "Primary focus" },
            { key: "movement", label: "Key movement", multiline: true },
          ]}
          onChange={(v) => patch({ rows: v })}
          blank={{ period: "", focus: "", movement: "" }}
        />
      );
    case "callout":
      return (
        <div className="grid gap-3">
          <TextField label="Headline (gold)" value={block.headline} onChange={(v) => patch({ headline: v })} />
          <TextField label="Sub-line" value={block.sub ?? ""} onChange={(v) => patch({ sub: v })} />
        </div>
      );
    case "investmentBox":
      return (
        <div className="grid gap-3">
          <TextField label="Label" value={block.label} onChange={(v) => patch({ label: v })} />
          <TextField label="Amount" value={block.amount} onChange={(v) => patch({ amount: v })} />
        </div>
      );
    case "milestoneBar":
      return (
        <RowsField
          label="Segments"
          value={block.segments}
          fields={[
            { key: "label", label: "Label" },
            { key: "pct", label: "Width %", number: true },
          ]}
          onChange={(v) => patch({ segments: v })}
          blank={{ label: "", pct: 10 }}
        />
      );
    case "closingBox":
      return (
        <div className="grid gap-3">
          <TextField label="Brand" value={block.brand} onChange={(v) => patch({ brand: v })} />
          <TextField label="Tagline" value={block.tagline} onChange={(v) => patch({ tagline: v })} />
        </div>
      );
    case "spacer":
      return (
        <label className="grid gap-1">
          <span className={mutedLabelClass}>Size</span>
          <select value={block.size ?? "md"} onChange={(e) => patch({ size: e.target.value as "sm" | "md" | "lg" })} className={smallInputClass}>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </label>
      );
    default:
      return null;
  }
}

// ---------------------------------------------------------------- editor

export default function SectionEditor({ pages, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(pages[1]?.id ?? pages[0]?.id ?? null);

  const updatePage = (pi: number, next: AuditPage) => onChange(pages.map((p, i) => (i === pi ? next : p)));

  return (
    <div className="grid gap-2">
      {pages.map((page, pi) => {
        const isOpen = open === page.id;
        return (
          <div key={page.id} className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#131318]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : page.id)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.03] cursor-pointer"
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-[10px] text-amber font-bold w-6 shrink-0">{String(pi + 1).padStart(2, "0")}</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">{page.label}</span>
                <span className="text-[10px] text-slate-400 shrink-0">{page.blocks.length} blocks</span>
              </span>
              {isOpen ? <LuChevronUp size={16} className="text-slate-400" /> : <LuChevronDown size={16} className="text-slate-400" />}
            </button>

            {isOpen ? (
              <div className="grid gap-3 border-t border-black/5 dark:border-white/5 bg-slate-50/60 dark:bg-black/20 p-3">
                {page.blocks.map((block, bi) => (
                  <div key={bi} className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#17171d] p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {BLOCK_LABELS[block.type] ?? block.type}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          title="Move up"
                          disabled={bi === 0}
                          onClick={() => {
                            const blocks = [...page.blocks];
                            [blocks[bi - 1], blocks[bi]] = [blocks[bi], blocks[bi - 1]];
                            updatePage(pi, { ...page, blocks });
                          }}
                          className={`${dangerBtnClass} hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30`}
                        >
                          <LuArrowUp size={12} />
                        </button>
                        <button
                          type="button"
                          title="Move down"
                          disabled={bi === page.blocks.length - 1}
                          onClick={() => {
                            const blocks = [...page.blocks];
                            [blocks[bi + 1], blocks[bi]] = [blocks[bi], blocks[bi + 1]];
                            updatePage(pi, { ...page, blocks });
                          }}
                          className={`${dangerBtnClass} hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30`}
                        >
                          <LuArrowDown size={12} />
                        </button>
                        <button
                          type="button"
                          title="Remove block"
                          onClick={() => {
                            if (!confirm("Remove this block from the page?")) return;
                            updatePage(pi, { ...page, blocks: page.blocks.filter((_, i) => i !== bi) });
                          }}
                          className={dangerBtnClass}
                        >
                          <LuTrash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <BlockEditor
                      block={block}
                      onChange={(b) => updatePage(pi, { ...page, blocks: page.blocks.map((x, i) => (i === bi ? b : x)) })}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
