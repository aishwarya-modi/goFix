"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface VisitorLog {
  id: string;
  timestamp: string;
  page: string;
  userId?: string;
}

export interface ChallengeAttempt {
  id: string;
  userId: string;
  userName: string;
  taskId: number;
  completedAt: string;
}

interface AnalyticsState {
  totalVisits: number;
  uniqueVisitors: string[];
  visitorLogs: VisitorLog[];
  challengeAttempts: ChallengeAttempt[];
  dailyVisits: Record<string, number>;
  hydrated: boolean;

  trackVisit: (page: string, userId?: string) => void;
  trackChallengeAttempt: (userId: string, userName: string, taskId: number) => void;
  setHydrated: () => void;
  getVisitsToday: () => number;
  getTopPages: () => { page: string; count: number }[];
  getRecentActivity: () => (VisitorLog | ChallengeAttempt)[];
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      totalVisits: 0,
      uniqueVisitors: [],
      visitorLogs: [],
      challengeAttempts: [],
      dailyVisits: {},
      hydrated: false,

      trackVisit: (page, userId) => {
        const state = get();
        const visitorId = userId || `anon-${sessionStorage.getItem("visitor-id") || (() => {
          const id = `anon-${Date.now()}`;
          sessionStorage.setItem("visitor-id", id);
          return id;
        })()}`;

        const today = new Date().toISOString().split("T")[0];

        set({
          totalVisits: state.totalVisits + 1,
          uniqueVisitors: state.uniqueVisitors.includes(visitorId)
            ? state.uniqueVisitors
            : [...state.uniqueVisitors, visitorId],
          visitorLogs: [
            ...state.visitorLogs.slice(-99),
            {
              id: `log-${Date.now()}`,
              timestamp: new Date().toISOString(),
              page,
              userId,
            },
          ],
          dailyVisits: {
            ...state.dailyVisits,
            [today]: (state.dailyVisits[today] || 0) + 1,
          },
        });
      },

      trackChallengeAttempt: (userId, userName, taskId) => {
        const state = get();
        set({
          challengeAttempts: [
            ...state.challengeAttempts,
            {
              id: `attempt-${Date.now()}`,
              userId,
              userName,
              taskId,
              completedAt: new Date().toISOString(),
            },
          ],
        });
      },

      setHydrated: () => set({ hydrated: true }),

      getVisitsToday: () => {
        const today = new Date().toISOString().split("T")[0];
        return get().dailyVisits[today] || 0;
      },

      getTopPages: () => {
        const logs = get().visitorLogs;
        const pageCounts: Record<string, number> = {};
        logs.forEach((log) => {
          pageCounts[log.page] = (pageCounts[log.page] || 0) + 1;
        });
        return Object.entries(pageCounts)
          .map(([page, count]) => ({ page, count }))
          .sort((a, b) => b.count - a.count);
      },

      getRecentActivity: () => {
        const state = get();
        const logs: (VisitorLog | ChallengeAttempt)[] = [
          ...state.visitorLogs.slice(-20),
          ...state.challengeAttempts.slice(-20),
        ];
        return logs.sort((a, b) => {
          const dateA = "timestamp" in a ? a.timestamp : a.completedAt;
          const dateB = "timestamp" in b ? b.timestamp : b.completedAt;
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
      },
    }),
    {
      name: "gofix-analytics",
      partialize: (state) => ({
        totalVisits: state.totalVisits,
        uniqueVisitors: state.uniqueVisitors,
        visitorLogs: state.visitorLogs,
        challengeAttempts: state.challengeAttempts,
        dailyVisits: state.dailyVisits,
      }),
    }
  )
);
