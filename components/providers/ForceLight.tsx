"use client";

import { useEffect } from "react";

/**
 * Forces the document into the light theme for the lifetime of this subtree
 * (used by booking / diagnosis). Does not overwrite the saved theme preference.
 */
export default function ForceLight({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.forceLight = "1";

    const applyLight = () => {
      if (root.classList.contains("dark")) {
        root.classList.remove("dark");
      }
    };
    applyLight();

    // Hydration / ThemeProvider may re-add `.dark` — keep it off while mounted.
    const observer = new MutationObserver(applyLight);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      delete root.dataset.forceLight;
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || !saved) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };
  }, []);

  return <>{children}</>;
}
