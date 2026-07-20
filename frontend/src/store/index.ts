"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Progress {
  completedTasks: number[];
  securityScore: number;
  totalScore: number;
  achievements: string[];
}

interface AppState {
  progress: Progress;
  activeFile: string;
  activeTask: number | null;
  sidebarTab: "tasks" | "issues" | "learn" | "progress";
  hydrated: boolean;

  setActiveFile: (path: string) => void;
  setActiveTask: (id: number | null) => void;
  setSidebarTab: (tab: "tasks" | "issues" | "learn" | "progress") => void;
  completeTask: (taskId: number) => void;
  unlockAchievement: (id: string) => void;
  isTaskCompleted: (taskId: number) => boolean;
  setHydrated: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      progress: {
        completedTasks: [],
        securityScore: 0,
        totalScore: 0,
        achievements: [],
      },
      activeFile: "cmd/main.go",
      activeTask: null,
      sidebarTab: "tasks",
      hydrated: false,

      setActiveFile: (path) => set({ activeFile: path }),
      setActiveTask: (id) => set({ activeTask: id }),
      setSidebarTab: (tab) => set({ sidebarTab: tab }),

      completeTask: (taskId) =>
        set((state) => {
          if (state.progress.completedTasks.includes(taskId)) return state;
          const completedTasks = [...state.progress.completedTasks, taskId];
          const totalScore = completedTasks.length * 14;
          return {
            progress: { ...state.progress, completedTasks, totalScore },
          };
        }),

      unlockAchievement: (id) =>
        set((state) => {
          if (state.progress.achievements.includes(id)) return state;
          return {
            progress: {
              ...state.progress,
              achievements: [...state.progress.achievements, id],
            },
          };
        }),

      isTaskCompleted: (taskId) => get().progress.completedTasks.includes(taskId),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "gofix-progress",
      partialize: (state) => ({
        progress: state.progress,
      }),
    }
  )
);
