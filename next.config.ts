import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // @react-pdf/renderer is Node-only; keep it out of the bundler.
  serverExternalPackages: ["@react-pdf/renderer"],
  // Ship the PDF fonts + logo inside the serverless function for the audit routes.
  outputFileTracingIncludes: {
    "/api/admin/audits/**": [
      "./public/fonts/switzer/otf/**/*",
      "./public/fonts/inter/**/*",
    ],
  },
};

export default nextConfig;
