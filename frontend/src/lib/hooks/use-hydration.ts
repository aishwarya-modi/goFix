"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store";

export function useHydration() {
  const setHydrated = useAppStore((s) => s.setHydrated);
  const hydrated = useAppStore((s) => s.hydrated);

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  return hydrated;
}
