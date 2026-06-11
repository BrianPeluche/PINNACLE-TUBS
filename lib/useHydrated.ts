"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * False during SSR/hydration, true after. The server can't know the client's
 * motion preference, so video elements must stay out of the server HTML —
 * else the browser starts downloading them even for reduced-motion users.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
