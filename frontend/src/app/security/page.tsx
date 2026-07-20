"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Lock,
  Database,
  Code2,
  Eye,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { issues } from "@/lib/data/issues";
import { cn } from "@/lib/utils";

const scanCategories = [
  { id: "all", label: "All Checks", icon: Search },
  { id: "security", label: "Security", icon: Lock },
  { id: "architecture", label: "Architecture", icon: Database },
  { id: "best-practice", label: "Best Practices", icon: Code2 },
];

interface ScanResult {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  file: string;
  line?: string;
  description: string;
  status: "pass" | "fail";
  fix: string;
}

const scanResults: ScanResult[] = issues.map((issue) => ({
  id: issue.id,
  title: issue.title,
  severity: issue.severity,
  category: issue.category,
  file: issue.file,
  line: issue.line,
  description: issue.description,
  status: "fail",
  fix: issue.solution,
}));

const severityColors: Record<string, { bg: string; text: string; border: string }> = {
  critical: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
  high: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
  medium: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" },
  low: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
};

export default function SecurityPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [expandedResult, setExpandedResult] = useState<string | null>(null);

  const filtered =
    activeCategory === "all"
      ? scanResults
      : scanResults.filter((r) => r.category === activeCategory);

  const criticalCount = scanResults.filter((r) => r.severity === "critical").length;
  const highCount = scanResults.filter((r) => r.severity === "high").length;
  const mediumCount = scanResults.filter((r) => r.severity === "medium").length;
  const lowCount = scanResults.filter((r) => r.severity === "low").length;

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
          <Shield className="h-6 w-6 text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Security Scanner</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Automated security analysis of the Go backend project
        </p>
      </motion.div>

      {/* Scan Button & Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleScan}
              disabled={isScanning}
              className={cn(
                "flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all",
                isScanning
                  ? "bg-white/5 text-zinc-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:shadow-red-500/25"
              )}
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  {scanComplete ? "Re-scan" : "Run Security Scan"}
                </>
              )}
            </button>
            {scanComplete && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-zinc-400"
              >
                Found <span className="font-bold text-red-400">{scanResults.length}</span> issues
              </motion.span>
            )}
          </div>

          {scanComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              {[
                { count: criticalCount, label: "Critical", color: "text-red-400" },
                { count: highCount, label: "High", color: "text-orange-400" },
                { count: mediumCount, label: "Medium", color: "text-yellow-400" },
                { count: lowCount, label: "Low", color: "text-blue-400" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className={cn("text-2xl font-bold", item.color)}>
                    {item.count}
                  </div>
                  <div className="text-[10px] text-zinc-500">{item.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="mt-6 flex gap-2 overflow-x-auto">
        {scanCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium transition-all",
                activeCategory === cat.id
                  ? "bg-white/10 text-white"
                  : "bg-white/[0.03] text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="mt-6 space-y-3">
        {!scanComplete ? (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
            <Shield className="mx-auto h-10 w-10 text-zinc-700" />
            <p className="mt-4 text-sm text-zinc-500">
              Click &quot;Run Security Scan&quot; to analyze the project for vulnerabilities
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((result, i) => {
              const sev = severityColors[result.severity];
              const isExpanded = expandedResult === result.id;
              return (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "rounded-xl border transition-all",
                    sev.border,
                    isExpanded ? sev.bg : "bg-white/[0.02]"
                  )}
                >
                  <button
                    onClick={() => setExpandedResult(isExpanded ? null : result.id)}
                    className="flex w-full items-center gap-4 p-4 text-left"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {result.title}
                        </span>
                        <span
                          className={cn(
                            "rounded border px-1.5 py-0.5 text-[10px] font-bold",
                            sev.bg,
                            sev.text,
                            sev.border
                          )}
                        >
                          {result.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                        <Code2 className="h-3 w-3" />
                        {result.file}
                        {result.line && <span>Line {result.line}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-400" />
                      <span className="text-xs text-red-400">Vulnerable</span>
                    </div>
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 text-zinc-600 transition-transform",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/[0.06] px-4 pb-4 pt-3">
                          <p className="text-xs leading-relaxed text-zinc-400">
                            {result.description}
                          </p>
                          <div className="mt-3 rounded-lg bg-[#0d1117] p-3">
                            <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                              Fix
                            </div>
                            <pre className="text-[11px] leading-relaxed text-zinc-300">
                              {result.fix}
                            </pre>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
