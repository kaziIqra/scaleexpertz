"use client";

import { LuFileText, LuRefreshCw } from "react-icons/lu";

interface Props {
  url: string | null;
  loading: boolean;
  stale: boolean;
  onRefresh: () => void;
}

export default function PdfPreview({ url, loading, stale, onRefresh }: Props) {
  return (
    <div className="relative flex h-full min-h-[70vh] flex-col overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#e9e7e0] dark:bg-black/40 shadow-sm">
      {url ? (
        <iframe title="Audit preview" src={`${url}#toolbar=1&navpanes=0`} className="h-full w-full flex-1 border-0" />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-slate-500 dark:text-slate-400 p-6">
          {loading ? (
            <LuRefreshCw className="animate-spin text-accent" size={28} />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.03]">
              <LuFileText size={22} />
            </div>
          )}
          <p className="text-sm font-semibold text-slate-800 dark:text-white">
            {loading ? "Rendering preview…" : "No preview yet"}
          </p>
          {!loading ? (
            <button onClick={onRefresh} className="text-xs font-semibold text-amber hover:underline cursor-pointer">
              Render preview
            </button>
          ) : null}
        </div>
      )}

      {url && (loading || stale) ? (
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg bg-black/75 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
          {loading ? (
            <>
              <LuRefreshCw className="animate-spin text-amber" size={12} />
              <span>Rendering…</span>
            </>
          ) : (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              <span>Preview is out of date</span>
              <button onClick={onRefresh} className="ml-1 text-amber hover:underline cursor-pointer">
                Refresh
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
