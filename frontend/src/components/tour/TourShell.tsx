"use client";

import { TourProvider, TourOverlay, TourTrigger } from "@/components/tour";

export function TourShell({ children }: { children: React.ReactNode }) {
  return (
    <TourProvider>
      {children}
      <TourOverlay />
      <TourTrigger />
    </TourProvider>
  );
}
