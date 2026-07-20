"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users, Eye, TrendingUp, Clock, ArrowLeft,
  BarChart3, Activity, UserCheck, AlertTriangle, RefreshCw,
  Database, CheckCircle2, XCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  visitsToday: number;
  topPages: { page: string; count: number }[];
  dailyVisits: Record<string, number>;
  recentLogs: {
    id: string;
    timestamp: string;
    page: string;
    ip: string;
    user_id?: string;
  }[];
}

interface HealthStatus {
  status: string;
  services: { database: string };
}

export default function AdminPage() {
  const { currentUser, isAdmin, users } = useAuthStore();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dbReady, setDbReady] = useState<boolean | null>(null);

  const checkHealth = async () => {
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth(data);
      setDbReady(data.services.database === "up");
      return data.services.database === "up";
    } catch {
      setDbReady(false);
      return false;
    }
  };

  const initDatabase = async () => {
    try {
      const res = await fetch("/api/setup", { method: "POST" });
      if (res.ok) {
        setDbReady(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analytics");
      if (res.status === 401) {
        setError("Analytics API requires authentication. Set ANALYTICS_API_KEY in .env.local");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch analytics");
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      setError("Failed to load analytics data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const healthy = await checkHealth();
      if (healthy) {
        await fetchAnalytics();
      }
    })();
  }, []);

  if (!currentUser || !isAdmin()) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c12] p-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-amber-400" />
            <h2 className="mt-4 text-xl font-bold text-white">Access Denied</h2>
            <p className="mt-2 text-sm text-zinc-400">
              You need admin privileges to access this page.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Sign In as Admin
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Database not ready
  if (dbReady === false) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c12] p-8">
            <Database className="mx-auto h-12 w-12 text-amber-400" />
            <h2 className="mt-4 text-xl font-bold text-white">Database Setup Required</h2>
            <p className="mt-2 text-sm text-zinc-400">
              The analytics database needs to be initialized.
            </p>
            <button
              onClick={async () => {
                const ok = await initDatabase();
                if (ok) {
                  await fetchAnalytics();
                } else {
                  setError("Failed to initialize database. Check PostgreSQL is running.");
                }
              }}
              className="mt-6 inline-block rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Initialize Database
            </button>
            {error && (
              <p className="mt-3 text-xs text-red-400">{error}</p>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  const registeredUsers = users.length;
  const totalVisits = analytics?.totalVisits || 0;
  const uniqueVisitors = analytics?.uniqueVisitors || 0;
  const visitsToday = analytics?.visitsToday || 0;
  const topPages = analytics?.topPages || [];
  const recentLogs = analytics?.recentLogs || [];
  const dailyVisits = analytics?.dailyVisits || {};

  const getDailyVisitData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    }).reverse();

    return last7Days.map((date) => ({
      date,
      count: dailyVisits[date] || 0,
    }));
  };

  const dailyData = getDailyVisitData();
  const maxDaily = Math.max(...dailyData.map((d) => d.count), 1);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Real-time visitor tracking and challenge analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] px-3 py-2">
              <div className={cn(
                "h-2 w-2 rounded-full",
                health?.status === "healthy" ? "bg-emerald-400" : "bg-red-400"
              )} />
              <span className="text-xs text-zinc-400">
                DB: {health?.services?.database || "checking"}
              </span>
            </div>
            <button
              onClick={fetchAnalytics}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border border-white/[0.06] px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            {
              label: "Total Page Views",
              value: totalVisits,
              icon: Eye,
              color: "text-blue-400",
              bg: "bg-blue-500/10",
            },
            {
              label: "Unique Visitors (IPs)",
              value: uniqueVisitors,
              icon: Users,
              color: "text-purple-400",
              bg: "bg-purple-500/10",
            },
            {
              label: "Visits Today",
              value: visitsToday,
              icon: TrendingUp,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
            },
            {
              label: "Registered Users",
              value: registeredUsers,
              icon: UserCheck,
              color: "text-amber-400",
              bg: "bg-amber-500/10",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-zinc-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-white">
                    {loading ? "—" : stat.value}
                  </p>
                </div>
                <div className={cn("rounded-lg p-2.5", stat.bg)}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Daily Visits Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-[#0c0c12] p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-zinc-400" />
              <h3 className="text-sm font-medium text-white">Daily Visits (Last 7 Days)</h3>
            </div>
            {loading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
              </div>
            ) : (
              <div className="flex items-end gap-2 h-40">
                {dailyData.map((day) => (
                  <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[10px] text-zinc-500">{day.count}</span>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-emerald-500 to-cyan-500 transition-all"
                      style={{
                        height: `${(day.count / maxDaily) * 100}%`,
                        minHeight: day.count > 0 ? "4px" : "0px",
                      }}
                    />
                    <span className="text-[10px] text-zinc-600">
                      {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-zinc-400" />
              <h3 className="text-sm font-medium text-white">System Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-zinc-400" />
                  <span className="text-xs text-zinc-300">PostgreSQL</span>
                </div>
                {health?.services?.database === "up" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs text-zinc-400">Storage</p>
                <p className="mt-1 text-sm font-medium text-white">PostgreSQL (persistent)</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs text-zinc-400">Rate Limit</p>
                <p className="mt-1 text-sm font-medium text-white">30 req/min per IP</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs text-zinc-400">Last Updated</p>
                <p className="mt-1 text-sm font-medium text-white">
                  {analytics?.recentLogs?.[0]
                    ? new Date(analytics.recentLogs[0].timestamp).toLocaleTimeString()
                    : "Never"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <Eye className="h-4 w-4 text-zinc-400" />
              <h3 className="text-sm font-medium text-white">Most Visited Pages</h3>
            </div>
            <div className="space-y-2">
              {loading ? (
                <div className="flex h-20 items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                </div>
              ) : topPages.length === 0 ? (
                <p className="text-xs text-zinc-500">No visits recorded yet</p>
              ) : (
                topPages.slice(0, 5).map((item, i) => (
                  <div
                    key={item.page}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-zinc-600">#{i + 1}</span>
                      <span className="text-sm text-zinc-300">{item.page}</span>
                    </div>
                    <span className="text-xs font-medium text-zinc-500">
                      {item.count} {item.count === 1 ? "view" : "views"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-zinc-400" />
              <h3 className="text-sm font-medium text-white">Recent Page Views</h3>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {loading ? (
                <div className="flex h-20 items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                </div>
              ) : recentLogs.length === 0 ? (
                <p className="text-xs text-zinc-500">No activity yet</p>
              ) : (
                recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <Eye className="h-3.5 w-3.5 text-blue-400" />
                      <div>
                        <span className="text-xs text-zinc-300">{log.page}</span>
                        <span className="ml-2 text-[10px] text-zinc-600">
                          from {log.ip}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-600">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Registered Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 rounded-xl border border-white/[0.06] bg-[#0c0c12] p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-zinc-400" />
            <h3 className="text-sm font-medium text-white">Registered Users</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="pb-3 font-medium text-zinc-500">User</th>
                  <th className="pb-3 font-medium text-zinc-500">Email</th>
                  <th className="pb-3 font-medium text-zinc-500">Role</th>
                  <th className="pb-3 font-medium text-zinc-500">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500">
                          <span className="text-[10px] font-bold text-black">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-zinc-300">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-zinc-400">{user.email}</td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[10px] font-medium",
                          user.role === "admin"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-white/5 text-zinc-400"
                        )}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 text-zinc-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
