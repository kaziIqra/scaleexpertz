import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import type { AuditPage as AuditPageModel, CoverBlock } from "../types";
import { colors, page as P, contentWidth, font } from "./theme";
import { renderBlock } from "./blocks";
import { R } from "./RichText";

interface Props {
  docTitle: string;
  pages: AuditPageModel[];
}

function Footer({ docTitle, dark }: { docTitle: string; dark?: boolean }) {
  return (
    <View
      fixed
      style={{
        position: "absolute",
        left: P.paddingX,
        right: P.paddingX,
        bottom: 24,
      }}
    >
      <View style={{ height: 0.9, backgroundColor: dark ? colors.goldStrong : colors.gold, marginBottom: 7 }} />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 6.8, color: dark ? colors.faint : colors.muted }}>
          ScaleXpertz  |  <R t={docTitle} />
        </Text>
        <Text
          style={{ fontSize: 6.8, color: dark ? colors.faint : colors.muted }}
          render={({ pageNumber }) => String(pageNumber)}
        />
      </View>
    </View>
  );
}

function CoverPage({ block, docTitle }: { block: CoverBlock; docTitle: string }) {
  const cell = 68;
  const gridLeft = P.paddingX;
  const gridTop = 96;
  const gridW = contentWidth;
  const gridH = P.height - gridTop - 92;
  const cols = Math.floor(gridW / cell);
  const rows = Math.floor(gridH / cell);

  return (
    <Page size="A4" style={{ backgroundColor: colors.night, fontFamily: font.family, paddingHorizontal: P.paddingX }}>
      {/* grid */}
      <View style={{ position: "absolute", left: gridLeft, top: gridTop, width: cols * cell, height: rows * cell }}>
        {Array.from({ length: rows + 1 }).map((_, i) => (
          <View
            key={`h${i}`}
            style={{ position: "absolute", left: 0, top: i * cell, width: cols * cell, height: 0.6, backgroundColor: colors.white, opacity: 0.07 }}
          />
        ))}
        {Array.from({ length: cols + 1 }).map((_, i) => (
          <View
            key={`v${i}`}
            style={{ position: "absolute", top: 0, left: i * cell, height: rows * cell, width: 0.6, backgroundColor: colors.white, opacity: 0.07 }}
          />
        ))}
      </View>

      <View style={{ marginTop: 52 }}>
        <Text style={{ fontSize: 8.5, fontWeight: 700, color: colors.gold, letterSpacing: 1.6 }}><R t={block.eyebrow} /></Text>
      </View>

      <View style={{ marginTop: 100 }}>
        <Text style={{ fontSize: 34, fontWeight: 800, color: colors.white, lineHeight: 1.12, letterSpacing: -0.6 }}>
          <R t={block.title} />
        </Text>
        <View style={{ width: 78, height: 3, backgroundColor: colors.gold, marginTop: 22, marginBottom: 26 }} />
        <Text style={{ fontSize: 13.5, fontWeight: 500, color: colors.white }}><R t={block.clientLine} /></Text>
        <Text style={{ fontSize: 9, color: colors.faint, marginTop: 8 }}><R t={block.subtitle} /></Text>
      </View>

      <View style={{ position: "absolute", left: P.paddingX, right: P.paddingX, bottom: 118 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          {block.steps.map((step, i) => (
            <React.Fragment key={i}>
              <View
                style={{
                  backgroundColor: i === 0 ? colors.gold : "#2a2a2f",
                  borderRadius: 7,
                  paddingHorizontal: 13,
                  paddingVertical: 15,
                  minWidth: 72,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 7, fontWeight: 600, color: i === 0 ? colors.ink : colors.white, letterSpacing: 0.6 }}><R t={step} /></Text>
              </View>
              {i < block.steps.length - 1 ? (
                <View style={{ width: 16, height: 1.4, backgroundColor: colors.gold, marginHorizontal: 5 }} />
              ) : null}
            </React.Fragment>
          ))}
        </View>
        <Text style={{ fontSize: 7.4, color: colors.faint, marginTop: 44 }}><R t={block.tagline} /></Text>
      </View>

      <Footer docTitle={docTitle} dark />
    </Page>
  );
}

export default function AuditDocument({ docTitle, pages }: Props) {
  return (
    <Document title={docTitle} author="ScaleXpertz" creator="ScaleXpertz" producer="ScaleXpertz">
      {pages.map((pg) => {
        const cover = pg.blocks.find((b): b is CoverBlock => b.type === "cover");
        if (cover) {
          return <CoverPage key={pg.id} block={cover} docTitle={docTitle} />;
        }
        return (
          <Page
            key={pg.id}
            size="A4"
            style={{
              backgroundColor: colors.paper,
              fontFamily: font.family,
              paddingTop: P.paddingTop,
              paddingBottom: P.paddingBottom,
              paddingHorizontal: P.paddingX,
            }}
          >
            {pg.blocks.map((b, i) => renderBlock(b, `${pg.id}-${i}`))}
            <Footer docTitle={docTitle} />
          </Page>
        );
      })}
    </Document>
  );
}
