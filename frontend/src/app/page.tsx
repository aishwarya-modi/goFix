"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Code2,
  Bug,
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Database,
  Zap,
  Target,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const stats = [
  { label: "Issues to Find", value: "12", icon: Bug },
  { label: "Tasks to Complete", value: "7", icon: Target },
  { label: "Skills Covered", value: "20+", icon: Zap },
  { label: "Est. Time", value: "90 min", icon: Clock },
];

const features = [
  {
    icon: Code2,
    title: "Interactive Code Viewer",
    description:
      "Explore the repository with syntax-highlighted code in a Monaco-powered editor.",
  },
  {
    icon: Shield,
    title: "Security Scanner",
    description:
      "Detect hardcoded credentials, SQL injection, plaintext passwords, and more.",
  },
  {
    icon: BookOpen,
    title: "Learning Mode",
    description:
      "Deep-dive into security concepts with interactive examples and explanations.",
  },
  {
    icon: Target,
    title: "Guided Tasks",
    description:
      "Step-by-step challenges that guide you through fixing each vulnerability.",
  },
];

const issues = [
  {
    severity: "critical",
    title: "SQL Injection Vulnerability",
    file: "service.go",
  },
  {
    severity: "critical",
    title: "Hardcoded Database Credentials",
    file: "main.go",
  },
  {
    severity: "critical",
    title: "Plaintext Password Storage",
    file: "service.go",
  },
  {
    severity: "high",
    title: "No Authentication",
    file: "http.go",
  },
  {
    severity: "high",
    title: "panic() in Production Code",
    file: "service.go",
  },
  {
    severity: "medium",
    title: "Missing Return After Error",
    file: "http.go",
  },
];

const severityColors: Record<string, string> = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function HomePage() {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/[0.04] blur-[100px]" />
        <div className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.03] blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-400">
              Live Challenge
            </span>
          </div>

          <h1 className="heading-display">
            <span className="text-white">Go Backend</span>
            <br />
            <span className="text-gradient-hero animate-text-glow">Interview Challenge</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            A <span className="Emphasis">deliberately flawed</span> Go backend project. Your mission: identify{" "}
            <span className="highlight-red">security vulnerabilities</span>, fix{" "}
            <span className="highlight-amber">architectural issues</span>, and learn Go{" "}
            <span className="highlight">best practices</span> — <em className="text-zinc-300">hands-on</em>.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/challenge"
              data-tour="tour-start"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Start Challenge
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/learn"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <BookOpen className="h-4 w-4" />
              Learn First
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center"
              >
                <Icon className="mx-auto mb-2 h-5 w-5 text-emerald-400" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-xs text-zinc-500">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Challenge Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 glow-green"
          data-tour="tour-hero"
        >
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  Simple <span className="text-gradient-green">User Service</span>
                </h2>
                <span className="rounded-md bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-yellow-400">
                  Mid-Level
                </span>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
                This API allows users to register. However, the project contains{" "}
                <span className="Emphasis">multiple intentional production issues</span>.
                Your task is to <span className="highlight">identify them</span> and{" "}
                <span className="highlight">improve the application</span>.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Go",
                  "SQL",
                  "REST APIs",
                  "Security",
                  "Docker",
                  "Testing",
                  "Architecture",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-white/5 border border-white/[0.06] px-2.5 py-1 text-xs font-medium text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  What you&apos;ll find
                </div>
                <div className="space-y-2.5">
                  {issues.map((issue, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex h-1.5 w-1.5 rounded-full ${
                          issue.severity === "critical"
                            ? "bg-red-500"
                            : issue.severity === "high"
                              ? "bg-orange-500"
                              : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-sm text-zinc-300">{issue.title}</span>
                      <span className="text-xs text-zinc-600">
                        {issue.file}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-16"
          data-tour="tour-features"
        >
          <h2 className="heading-section text-center text-white">
            Platform <span className="text-gradient-cyan">Features</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
            Everything you need to practice <span className="font-semibold text-zinc-300">backend engineering</span> skills in a{" "}
            <em className="text-zinc-400">hands-on environment</em>.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/[0.03]"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Expected Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8"
        >
          <h2 className="text-xl font-extrabold tracking-tight text-white">
            Expected Skills <span className="text-gradient-amber">After Completion</span>
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Environment Variables & Configuration",
              "SQL Injection Prevention",
              "Password Hashing with bcrypt",
              "Dependency Injection Pattern",
              "Go Error Handling Idioms",
              "JWT Authentication",
              "Table-Driven Testing",
              "Connection Pool Management",
              "HTTP Middleware Patterns",
              "Code Review Practices",
              "Security Best Practices",
              "Clean Architecture",
            ].map((skill) => (
              <div key={skill} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-zinc-300">{skill}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-16 text-center"
        >
          <Link
            href="/challenge"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-black transition-all hover:shadow-xl hover:shadow-emerald-500/25"
          >
            Begin the Challenge
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
