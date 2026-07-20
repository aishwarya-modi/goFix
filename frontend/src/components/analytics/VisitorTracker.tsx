"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";

const COOLDOWN_MS = 30_000; // 30 seconds per page

export function VisitorTracker() {
  const pathname = usePathname();
  const { currentUser } = useAuthStore();

  useEffect(() => {
    // Don't track API routes
    if (pathname.startsWith("/api")) return;

    const storageKey = `gofix-last-track`;
    const trackKey = `track:${pathname}`;

    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) {
        const last: Record<string, number> = JSON.parse(raw);
        const lastTime = last[trackKey] || 0;
        if (Date.now() - lastTime < COOLDOWN_MS) return;
      }
    } catch {
      // ignore
    }

    // Mark as tracked immediately to prevent double-fire
    try {
      const raw = sessionStorage.getItem(storageKey);
      const last: Record<string, number> = raw ? JSON.parse(raw) : {};
      last[trackKey] = Date.now();
      sessionStorage.setItem(storageKey, JSON.stringify(last));
    } catch {
      // ignore
    }

    const abort = new AbortController();

    fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pathname,
        userId: currentUser?.id,
      }),
      signal: abort.signal,
    }).catch(() => {});

    return () => abort.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
