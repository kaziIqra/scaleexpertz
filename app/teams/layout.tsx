import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team — ScaleXpertz",
  description:
    "Meet the minds behind ScaleXpertz. We're a connected growth team building strategy, branding, websites, marketing, and AI under one roof.",
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
