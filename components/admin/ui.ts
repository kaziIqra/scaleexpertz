/** Shared Tailwind class strings for admin screens. */

export const cardClass =
  "rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#131318] shadow-sm";

export const inputClass =
  "w-full rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-all";

export const smallInputClass =
  "w-full rounded-lg border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-all";

export const textareaClass = `${smallInputClass} min-h-[72px] leading-relaxed font-sans resize-y`;

export const labelClass =
  "font-mono text-[10px] uppercase tracking-widest text-amber font-bold";

export const mutedLabelClass =
  "font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400";

export const primaryBtnClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent via-amber to-pink-500 px-4 py-2.5 text-xs font-extrabold text-ink shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer";

export const secondaryBtnClass =
  "inline-flex items-center justify-center gap-1.5 rounded-xl border border-black/10 dark:border-white/15 bg-black/[0.04] dark:bg-white/[0.05] px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition-all cursor-pointer disabled:opacity-50";

export const dangerBtnClass =
  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:bg-rose-500/15 hover:text-rose-500 dark:hover:text-rose-400 transition-all cursor-pointer";

export const chipClass = (tone: "gold" | "green" | "grey") =>
  tone === "gold"
    ? "inline-block rounded-md border border-accent/30 bg-accent/15 px-2 py-0.5 text-[11px] font-bold text-amber"
    : tone === "green"
      ? "inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
      : "inline-block rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2 py-0.5 text-[11px] font-bold text-slate-600 dark:text-slate-300";
