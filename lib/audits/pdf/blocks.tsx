import React from "react";
import { View, Text, StyleSheet, Svg, Line, Polygon } from "@react-pdf/renderer";
import type {
  Block,
  BulletsBlock,
  CardGridBlock,
  CircleFlowBlock,
  FunnelBlock,
  ArrowFlowCardsBlock,
  DarkCardsBlock,
  HubBlock,
  TableBlock,
  RoadmapTableBlock,
  CalloutBlock,
  InvestmentBoxBlock,
  MilestoneBarBlock,
  ClosingBoxBlock,
  FeatureCardsBlock,
  TwoColBulletsBlock,
  HeadingBlock,
  SpacerBlock,
} from "../types";
import { colors, type as T, contentWidth } from "./theme";
import { R } from "./RichText";

// ------------------------------------------------------------------ helpers

const s = StyleSheet.create({
  eyebrow: { ...T.eyebrow, marginBottom: 6 },
  sectionLabel: { ...T.sectionLabel, marginBottom: 8 },
  title: { ...T.title, marginBottom: 4 },
  subtitle: { ...T.subtitle, marginBottom: 2 },
  paragraph: { ...T.body, marginTop: 8, marginBottom: 8 },
  note: { ...T.note, marginTop: 6, marginBottom: 4 },
  bold: { ...T.bold, marginTop: 8, marginBottom: 6 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 3.2 },
  bulletDot: {
    width: 3.4,
    height: 3.4,
    borderRadius: 2,
    backgroundColor: colors.goldStrong,
    marginTop: 4.6,
    marginRight: 7,
  },
  bulletText: { ...T.body, flex: 1, lineHeight: 1.4 },
  card: {
    borderWidth: 0.8,
    borderColor: colors.line,
    borderRadius: 7,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingTop: 11,
    paddingBottom: 11,
    overflow: "hidden",
  },
  cardBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 2.6,
    backgroundColor: colors.gold,
    borderTopLeftRadius: 7,
  },
  darkBox: {
    backgroundColor: colors.night,
    borderRadius: 9,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});

/** Items may contain newlines when fed from a textarea placeholder. */
function explodeItems(items: string[]): string[] {
  return items
    .flatMap((i) => i.split(/\r?\n/))
    .map((i) => i.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function Arrow({ width = 22, height = 10, color = colors.goldStrong }: { width?: number; height?: number; color?: string }) {
  const y = height / 2;
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Line x1={0} y1={y} x2={width - 5} y2={y} stroke={color} strokeWidth={1.4} />
      <Polygon points={`${width - 6},${y - 3.5} ${width},${y} ${width - 6},${y + 3.5}`} fill={color} />
    </Svg>
  );
}

function SectionLabel({ text }: { text?: string }) {
  if (!text) return null;
  return <Text style={s.sectionLabel}><R t={text} /></Text>;
}

// ------------------------------------------------------------------- blocks

function Heading({ block }: { block: HeadingBlock }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={s.eyebrow}><R t={block.eyebrow} /></Text>
      <Text style={s.title}><R t={block.title} /></Text>
      {block.subtitle ? <Text style={s.subtitle}><R t={block.subtitle} /></Text> : null}
    </View>
  );
}

function Bullets({ block }: { block: BulletsBlock }) {
  const items = explodeItems(block.items);
  return (
    <View style={{ marginTop: 6, marginBottom: 6 }}>
      <SectionLabel text={block.title} />
      {items.map((item, i) => (
        <View key={i} style={s.bulletRow} wrap={false}>
          <View style={s.bulletDot} />
          <Text style={s.bulletText}><R t={item} /></Text>
        </View>
      ))}
    </View>
  );
}

function TwoColBullets({ block }: { block: TwoColBulletsBlock }) {
  return (
    <View style={{ flexDirection: "row", gap: 24, marginTop: 6, marginBottom: 6 }} wrap={false}>
      {block.cols.map((col, ci) => (
        <View key={ci} style={{ flex: 1 }}>
          <SectionLabel text={col.title} />
          {explodeItems(col.items).map((item, i) => (
            <View key={i} style={s.bulletRow}>
              <View style={s.bulletDot} />
              <Text style={s.bulletText}><R t={item} /></Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function CardGrid({ block }: { block: CardGridBlock }) {
  const cols = block.cols ?? 2;
  const gap = 10;
  const w = (contentWidth - gap * (cols - 1)) / cols;
  const single = block.cards.length === 1;
  return (
    <View style={{ marginTop: 8, marginBottom: 6 }} wrap={false}>
      <SectionLabel text={block.title} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap }}>
        {block.cards.map((c, i) => (
          <View key={i} style={[s.card, { width: single ? contentWidth : w }]}>
            <View style={s.cardBar} />
            <Text style={T.cardTitle}><R t={c.title} /></Text>
            {c.body ? <Text style={{ ...T.body, fontSize: 8.6, marginTop: 5 }}><R t={c.body} /></Text> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

function CircleFlow({ block }: { block: CircleFlowBlock }) {
  const n = block.labels.length;
  const arrowW = 24;
  const size = Math.min(66, (contentWidth - arrowW * (n - 1) - 8 * (n - 1)) / n);
  return (
    <View style={{ marginTop: 14, marginBottom: 12 }} wrap={false}>
      <SectionLabel text={block.title} />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        {block.labels.map((label, i) => (
          <React.Fragment key={i}>
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: 0.9,
                borderColor: colors.line,
                backgroundColor: colors.surface,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 4,
              }}
            >
              <Text style={{ fontSize: 6.6, fontWeight: 600, color: colors.goldStrong, textAlign: "center", letterSpacing: 0.5 }}>
          <R t={label} />
        </Text>
            </View>
            {i < n - 1 ? (
              <View style={{ marginHorizontal: 4 }}>
                <Arrow width={arrowW} />
              </View>
            ) : null}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

function Funnel({ block }: { block: FunnelBlock }) {
  const n = block.stages.length;
  return (
    <View style={{ marginTop: 14, marginBottom: 8, alignItems: "center" }} wrap={false}>
      {block.stages.map((stage, i) => {
        const pct = 1 - (i / Math.max(n, 1)) * 0.55;
        const alpha = 1 - i * 0.16;
        return (
          <View
            key={i}
            style={{
              width: contentWidth * 0.86 * pct,
              backgroundColor: colors.gold,
              opacity: alpha,
              borderRadius: 9,
              paddingVertical: 4.5,
              marginBottom: 4,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 7, fontWeight: 600, color: colors.ink, letterSpacing: 0.8 }}><R t={stage} /></Text>
          </View>
        );
      })}
    </View>
  );
}

function ArrowFlowCards({ block }: { block: ArrowFlowCardsBlock }) {
  const n = block.cards.length;
  const arrowW = 20;
  const gap = 6;
  const w = (contentWidth - (arrowW + gap * 2) * (n - 1)) / n;
  return (
    <View style={{ marginTop: 12, marginBottom: 8 }} wrap={false}>
      <SectionLabel text={block.title} />
      <View style={{ flexDirection: "row", alignItems: "stretch" }}>
        {block.cards.map((c, i) => (
          <React.Fragment key={i}>
            <View style={[s.card, { width: w, paddingTop: 12, paddingBottom: 12, justifyContent: "center" }]}>
              <View style={s.cardBar} />
              <Text style={{ fontSize: 9.4, fontWeight: 600, color: colors.ink }}><R t={c.title} /></Text>
              {c.sub ? <Text style={{ fontSize: 7.2, color: colors.muted, marginTop: 4, lineHeight: 1.35 }}><R t={c.sub} /></Text> : null}
            </View>
            {i < n - 1 ? (
              <View style={{ width: arrowW + gap * 2, alignItems: "center", justifyContent: "center" }}>
                <Arrow width={arrowW} />
              </View>
            ) : null}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

function DarkCards({ block }: { block: DarkCardsBlock }) {
  const n = block.cards.length;
  const gap = 8;
  const w = (contentWidth - gap * (n - 1)) / n;
  return (
    <View style={{ marginTop: 12, marginBottom: 8 }} wrap={false}>
      <SectionLabel text={block.title} />
      <View style={{ flexDirection: "row", gap }}>
        {block.cards.map((c, i) => (
          <View key={i} style={[s.darkBox, { width: w, paddingHorizontal: 11, paddingVertical: 12 }]}>
            <Text style={{ fontSize: 8.4, fontWeight: 600, color: colors.gold }}><R t={c.label} /></Text>
            <Text style={{ fontSize: 7, color: colors.white, marginTop: 5, lineHeight: 1.35 }}><R t={c.sub} /></Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function Hub({ block }: { block: HubBlock }) {
  const W = contentWidth;
  const n = block.inputs.length;
  const boxW = Math.min(118, (W - 14 * (n - 1)) / n);
  const boxH = 44;
  const gapX = (W - boxW * n) / Math.max(n - 1, 1);
  const centerW = 118;
  const centerH = 44;
  const centerY = boxH + 62;
  const H = centerY + centerH;
  const cx = W / 2;
  return (
    <View style={{ marginTop: 16, marginBottom: 10 }} wrap={false}>
      <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {block.inputs.map((_, i) => {
          const x = i * (boxW + gapX) + boxW / 2;
          return (
            <Line key={i} x1={x} y1={boxH} x2={cx} y2={centerY} stroke={colors.goldStrong} strokeWidth={1.4} />
          );
        })}
        <Polygon points={`${cx - 4},${centerY - 8} ${cx + 4},${centerY - 8} ${cx},${centerY - 1}`} fill={colors.goldStrong} />
      </Svg>
      {block.inputs.map((label, i) => (
        <View
          key={i}
          style={[
            s.card,
            {
              position: "absolute",
              left: i * (boxW + gapX),
              top: 0,
              width: boxW,
              height: boxH,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 6,
            },
          ]}
        >
          <Text style={{ fontSize: 7.6, fontWeight: 600, color: colors.goldStrong, textAlign: "center" }}><R t={label} /></Text>
        </View>
      ))}
      <View
        style={[
          s.card,
          {
            position: "absolute",
            left: cx - centerW / 2,
            top: centerY,
            width: centerW,
            height: centerH,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 8.4, fontWeight: 600, color: colors.goldStrong }}><R t={block.center} /></Text>
      </View>
    </View>
  );
}

function Table({ block }: { block: TableBlock }) {
  const widths = block.widths && block.widths.length === block.columns.length ? block.widths : block.columns.map(() => 1);
  const sum = widths.reduce((a, b) => a + b, 0);
  const cellStyle = (i: number) => ({ flex: widths[i] / sum, paddingHorizontal: 9, paddingVertical: 7 });
  return (
    <View style={{ marginTop: 10, marginBottom: 8, borderWidth: 0.8, borderColor: colors.line, borderRadius: 4, overflow: "hidden" }}>
      <SectionLabel text={block.title} />
      <View style={{ flexDirection: "row", backgroundColor: colors.ink }} fixed>
        {block.columns.map((c, i) => (
          <View key={i} style={cellStyle(i)}>
            <Text style={{ fontSize: 7.8, fontWeight: 600, color: colors.white }}><R t={c} /></Text>
          </View>
        ))}
      </View>
      {block.rows.map((row, ri) => (
        <View
          key={ri}
          wrap={false}
          style={{
            flexDirection: "row",
            backgroundColor: ri % 2 === 0 ? colors.rowAlt : colors.surface,
            borderTopWidth: 0.6,
            borderTopColor: colors.line,
          }}
        >
          {row.map((cell, ci) => (
            <View key={ci} style={cellStyle(ci)}>
              <Text style={{ fontSize: 8.4, lineHeight: 1.4, color: colors.body, fontWeight: ci === 0 ? 500 : 400 }}><R t={cell} /></Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function RoadmapTable({ block }: { block: RoadmapTableBlock }) {
  return (
    <Table
      block={{
        type: "table",
        columns: ["Period", "Primary Focus", "Key Movement"],
        widths: [1, 1.1, 4],
        rows: block.rows.map((r) => [r.period, r.focus, r.movement]),
      }}
    />
  );
}

function Callout({ block }: { block: CalloutBlock }) {
  return (
    <View style={[s.darkBox, { marginTop: 10, marginBottom: 8, paddingVertical: 18, paddingHorizontal: 20 }]} wrap={false}>
      <Text style={{ fontSize: 10, fontWeight: 600, color: colors.gold, letterSpacing: 0.4 }}><R t={block.headline} /></Text>
      {block.sub ? <Text style={{ fontSize: 7.8, color: colors.white, marginTop: 7, lineHeight: 1.4 }}><R t={block.sub} /></Text> : null}
    </View>
  );
}

function InvestmentBox({ block }: { block: InvestmentBoxBlock }) {
  return (
    <View style={[s.darkBox, { marginTop: 14, marginBottom: 12, paddingVertical: 22, alignItems: "center" }]} wrap={false}>
      <Text style={{ fontSize: 7.6, color: colors.faint, letterSpacing: 1.2 }}><R t={block.label} /></Text>
      <Text style={{ fontSize: 34, fontWeight: 700, color: colors.gold, marginTop: 6, letterSpacing: -0.5 }}><R t={block.amount} /></Text>
    </View>
  );
}

function MilestoneBar({ block }: { block: MilestoneBarBlock }) {
  const last = block.segments.length - 1;
  return (
    <View style={{ flexDirection: "row", marginTop: 14, marginBottom: 6, borderRadius: 4, overflow: "hidden" }} wrap={false}>
      {block.segments.map((seg, i) => (
        <View
          key={i}
          style={{
            flex: seg.pct,
            backgroundColor: i === last ? colors.gold : i % 2 === 0 ? colors.ink : "#1c1c21",
            paddingVertical: 11,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 7.4, fontWeight: 600, color: i === last ? colors.ink : colors.white }}><R t={seg.label} /></Text>
        </View>
      ))}
    </View>
  );
}

function ClosingBox({ block }: { block: ClosingBoxBlock }) {
  return (
    <View style={[s.darkBox, { marginTop: 12, paddingVertical: 16, paddingHorizontal: 20 }]} wrap={false}>
      <Text style={{ fontSize: 10.5, fontWeight: 600, color: colors.gold }}><R t={block.brand} /></Text>
      <Text style={{ fontSize: 7.8, color: colors.white, marginTop: 6 }}><R t={block.tagline} /></Text>
    </View>
  );
}

function FeatureCards({ block }: { block: FeatureCardsBlock }) {
  const n = block.cards.length;
  const gap = 24;
  const w = (contentWidth * 0.88 - gap * (n - 1)) / n;
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap, marginTop: 14, marginBottom: 8 }} wrap={false}>
      {block.cards.map((c, i) => (
        <View key={i} style={[s.darkBox, { width: w, paddingVertical: 20, paddingHorizontal: 18 }]}>
          <Text style={{ fontSize: 17, fontWeight: 700, color: colors.gold }}><R t={c.title} /></Text>
          <Text style={{ fontSize: 8, color: colors.white, marginTop: 4 }}><R t={c.sub} /></Text>
          <View style={{ height: 1, backgroundColor: colors.gold, marginTop: 12, marginBottom: 8, width: "100%" }} />
          <Text style={{ fontSize: 6.8, color: colors.faint }}><R t={c.foot} /></Text>
        </View>
      ))}
    </View>
  );
}

function Spacer({ block }: { block: SpacerBlock }) {
  const h = block.size === "lg" ? 26 : block.size === "sm" ? 6 : 14;
  return <View style={{ height: h }} />;
}

// ---------------------------------------------------------------- dispatch

export function renderBlock(block: Block, key: React.Key) {
  switch (block.type) {
    case "heading":
      return <Heading key={key} block={block} />;
    case "paragraph":
      return (
        <Text key={key} style={s.paragraph}>
          <R t={block.text} />
        </Text>
      );
    case "bullets":
      return <Bullets key={key} block={block} />;
    case "twoColBullets":
      return <TwoColBullets key={key} block={block} />;
    case "cardGrid":
      return <CardGrid key={key} block={block} />;
    case "circleFlow":
      return <CircleFlow key={key} block={block} />;
    case "funnel":
      return <Funnel key={key} block={block} />;
    case "arrowFlowCards":
      return <ArrowFlowCards key={key} block={block} />;
    case "darkCards":
      return <DarkCards key={key} block={block} />;
    case "hub":
      return <Hub key={key} block={block} />;
    case "table":
      return <Table key={key} block={block} />;
    case "roadmapTable":
      return <RoadmapTable key={key} block={block} />;
    case "callout":
      return <Callout key={key} block={block} />;
    case "note":
      return (
        <Text key={key} style={s.note}>
          <R t={block.text} />
        </Text>
      );
    case "boldLine":
      return (
        <Text key={key} style={s.bold}>
          <R t={block.text} />
        </Text>
      );
    case "investmentBox":
      return <InvestmentBox key={key} block={block} />;
    case "milestoneBar":
      return <MilestoneBar key={key} block={block} />;
    case "closingBox":
      return <ClosingBox key={key} block={block} />;
    case "featureCards":
      return <FeatureCards key={key} block={block} />;
    case "spacer":
      return <Spacer key={key} block={block} />;
    case "cover":
      // Rendered by the page component, not as an inline block.
      return null;
    default:
      return null;
  }
}
