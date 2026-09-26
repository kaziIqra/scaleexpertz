import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import type { AuditPage, AuditTemplate, PlaceholderValues } from "../types";
import { interpolatePages, resolveValues } from "../interpolate";
import { registerFonts } from "./fonts";
import AuditDocument from "./AuditDocument";

export interface RenderInput {
  template: Pick<AuditTemplate, "placeholders" | "derive" | "docTitle">;
  placeholderValues: PlaceholderValues;
  sections: AuditPage[];
}

/** Render an audit to a PDF buffer. Fonts are registered once per runtime. */
export async function renderAuditPdf(input: RenderInput): Promise<{ buffer: Buffer; docTitle: string }> {
  registerFonts();

  const values = resolveValues(input.template, input.placeholderValues);
  const pages = interpolatePages(input.sections, values);
  const docTitle = values.doc_title;

  // The brand mark PNG is black-on-transparent; the reference document uses
  // text-only footers, so no logo is passed. AuditDocument accepts `logoSrc`
  // (a file:// URL via publicAssetUrl) if one is wanted later.
  const element = React.createElement(AuditDocument, { docTitle, pages });
  // renderToBuffer's type expects a ReactElement<DocumentProps>; cast keeps createElement generic.
  const buffer = await renderToBuffer(element as React.ReactElement<React.ComponentProps<typeof AuditDocument>> as never);

  return { buffer: Buffer.from(buffer), docTitle };
}

/** Safe filename for downloads: "ScaleXpertz_Growth_Audit_<Company>.pdf" */
export function auditFileName(company: string, version?: number): string {
  const safe = company.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 60) || "Client";
  return `ScaleXpertz_Growth_Audit_${safe}${version ? `_v${version}` : ""}.pdf`;
}
