"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Shield, BookOpen, Home, Trophy, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/challenge", label: "Challenge", icon: Code2 },
  { href: "/security", label: "Security Scanner", icon: Shield },
  { href: "/learn", label: "Learn", icon: BookOpen },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, isAdmin } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5" data-tour="tour-logo">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500">
              <Code2 className="h-4 w-4 text-black" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Go<span className="text-gradient-green">Fix</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              const tourId =
                item.href === "/challenge" ? "tour-nav-challenge" :
                item.href === "/security" ? "tour-nav-security" :
                item.href === "/learn" ? "tour-nav-learn" : undefined;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-tour={tourId}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            {currentUser && isAdmin() && (
              <Link
                href="/admin"
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  pathname === "/admin"
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 sm:flex">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-medium text-zinc-300">0 / 7 tasks</span>
          </div>

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-lg border border-white/[0.06] px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500">
                  <span className="text-[10px] font-bold text-black">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="hidden sm:inline">{currentUser.name}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showDropdown && "rotate-180")} />
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowDropdown(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-white/[0.06] bg-[#0c0c12] p-2 shadow-xl"
                    >
                      <div className="border-b border-white/[0.06] px-3 py-2 mb-1">
                        <p className="text-sm font-medium text-white">{currentUser.name}</p>
                        <p className="text-xs text-zinc-500">{currentUser.email}</p>
                      </div>
                      {isAdmin() && (
                        <Link
                          href="/admin"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          <Settings className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setShowDropdown(false);
                          router.push("/");
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg border border-white/[0.06] px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-emerald-500/25"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
