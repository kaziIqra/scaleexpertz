/**
 * Render an audit template to a PDF for visual checks (no Supabase needed).
 *   npm run audit:render -- [template-slug] [out.pdf]
 * Bundled with esbuild as ESM because @react-pdf/renderer is ESM-only.
 */
import fs from "node:fs";
import path from "node:path";
import { getTemplate, listTemplateSummaries } from "../lib/audits/templates";
import { renderAuditPdf } from "../lib/audits/pdf/render";

async function main() {
  const slug = process.argv[2] || "ecommerce-growth-audit";
  const out = process.argv[3] || path.join(process.cwd(), `audit-${slug}.pdf`);

  const template = getTemplate(slug);
  if (!template) {
    console.error(`Unknown template "${slug}". Available:`, listTemplateSummaries().map((t) => t.slug));
    process.exit(1);
  }

  const started = Date.now();
  const { buffer, docTitle } = await renderAuditPdf({
    template,
    placeholderValues: {
      client_name: "Rohan Mehta",
      company: "Urban Threads Apparel",
    },
    sections: template.pages,
  });

  fs.writeFileSync(out, buffer);
  console.log(`Rendered "${docTitle}" → ${out} (${(buffer.length / 1024).toFixed(0)} KB, ${Date.now() - started} ms)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
