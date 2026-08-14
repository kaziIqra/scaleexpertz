"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny external store so any component (hero, navbar) can wait for the
 * preloader to hand off before playing its entrance animation.
 */
let done = false;
const listeners = new Set<() => void>();

export const preloader = {
  finish() {
    if (done) return;
    done = true;
    listeners.forEach((l) => l());
  },
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
  isDone: () => done,
};

export function usePreloaderDone(): boolean {
  return useSyncExternalStore(preloader.subscribe, preloader.isDone, () => false);
}
