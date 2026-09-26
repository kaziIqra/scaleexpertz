"use client";

import type { PlaceholderDef, PlaceholderValues } from "@/lib/audits/types";
import { formatINR } from "@/lib/audits/interpolate";
import { inputClass, labelClass, textareaClass } from "../ui";

interface Props {
  placeholders: PlaceholderDef[];
  values: PlaceholderValues;
  onChange: (next: PlaceholderValues) => void;
  compact?: boolean;
}

export default function PlaceholderForm({ placeholders, values, onChange, compact }: Props) {
  const set = (key: string, value: string) => onChange({ ...values, [key]: value });

  return (
    <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
      {placeholders.map((p) => {
        const value = values[p.key] ?? "";
        const wide = p.type === "textarea";
        return (
          <label key={p.key} className={`grid gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
            <span className={labelClass}>
              {p.label}
              {p.required ? <span className="text-rose-500"> *</span> : null}
            </span>

            {p.type === "textarea" ? (
              <textarea
                value={value}
                onChange={(e) => set(p.key, e.target.value)}
                placeholder={p.default ?? ""}
                rows={Math.min(8, Math.max(3, (p.default ?? "").split("\n").length))}
                className={`${textareaClass} text-sm px-3.5 py-2.5`}
              />
            ) : p.type === "currency" || p.type === "number" ? (
              <div className="relative">
                <input
                  type="number"
                  inputMode="numeric"
                  value={value}
                  onChange={(e) => set(p.key, e.target.value)}
                  placeholder={p.default ?? ""}
                  className={inputClass}
                />
                {p.type === "currency" && (value || p.default) ? (
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-amber">
                    {formatINR(value || p.default || "0")}
                  </span>
                ) : null}
              </div>
            ) : (
              <input
                type={p.type === "date" ? "date" : "text"}
                value={value}
                onChange={(e) => set(p.key, e.target.value)}
                placeholder={p.default ?? ""}
                className={inputClass}
              />
            )}

            {p.help ? <span className="text-[11px] text-slate-500 dark:text-slate-400">{p.help}</span> : null}
          </label>
        );
      })}
    </div>
  );
}
