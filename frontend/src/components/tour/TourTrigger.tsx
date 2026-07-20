"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, X } from "lucide-react";
import { useTour } from "./TourProvider";
import { usePathname } from "next/navigation";
import { homeTourSteps, challengeTourSteps } from "@/lib/data/tour-steps";

export function TourTrigger() {
  const { startTour, isActive, hasCompletedTour } = useTour();
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  if (isActive) return null;

  const getSteps = () => {
    if (pathname === "/challenge") return challengeTourSteps;
    return homeTourSteps;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-56 overflow-hidden rounded-xl border border-white/[0.1] bg-[#111118] shadow-2xl shadow-black/50"
          >
            <div className="border-b border-white/[0.06] px-4 py-3">
              <div className="text-xs font-semibold text-white">Application Tour</div>
              <div className="mt-0.5 text-[10px] text-zinc-500">
                Walk through the platform features
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => {
                  startTour(homeTourSteps);
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <span>🏠</span>
                <div>
                  <div className="font-medium">Tour Homepage</div>
                  <div className="text-[10px] text-zinc-500">Overview & features</div>
                </div>
              </button>
              <button
                onClick={() => {
                  startTour(challengeTourSteps);
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <span>💻</span>
                <div>
                  <div className="font-medium">Tour Challenge</div>
                  <div className="text-[10px] text-zinc-500">Code viewer & tasks</div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMenu(!showMenu)}
        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all ${
          showMenu
            ? "bg-white/10 text-white"
            : "bg-gradient-to-br from-emerald-500 to-cyan-500 text-black hover:shadow-emerald-500/30"
        }`}
      >
        {showMenu ? (
          <X className="h-5 w-5" />
        ) : (
          <Compass className="h-5 w-5" />
        )}
      </motion.button>
    </div>
  );
}
