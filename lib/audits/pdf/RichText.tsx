import React from "react";
import { Text } from "@react-pdf/renderer";
import { font } from "./theme";

/** Characters Switzer cannot render; these runs are set in the fallback family. */
const FALLBACK_CHARS = "←↑→↓↔₹";
const HAS_FALLBACK = new RegExp(`[${FALLBACK_CHARS}]`);
const SPLIT_FALLBACK = new RegExp(`([${FALLBACK_CHARS}]+)`, "g");

/**
 * Renders a string inside a parent <Text>, switching font family only for
 * the glyph runs Switzer lacks. Nested <Text> inherits size/weight/color.
 */
export function R({ t }: { t: string | undefined | null }) {
  if (!t) return null;
  if (!HAS_FALLBACK.test(t)) return <>{t}</>;

  const parts = t.split(SPLIT_FALLBACK);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Text key={i} style={{ fontFamily: font.fallback }}>
            {part}
          </Text>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
