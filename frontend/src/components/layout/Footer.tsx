"use client";

import Link from "next/link";
import { Code2, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#08080c]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500">
                <Code2 className="h-4 w-4 text-black" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Go<span className="text-emerald-400">Fix</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
              An interactive platform for learning Go backend engineering through
              hands-on debugging, security hardening, and code review.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Platform</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: "/challenge", label: "Challenge" },
                { href: "/security", label: "Security Scanner" },
                { href: "/learn", label: "Learn" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Topics</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: "/learn/sql-injection", label: "SQL Injection" },
                { href: "/learn/password-hashing", label: "Password Hashing" },
                { href: "/learn/error-handling", label: "Error Handling" },
                { href: "/learn/testing", label: "Go Testing" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-white/[0.06] pt-8">
          <p className="text-xs text-zinc-600">
            Built for learning. Not for production.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 transition-colors hover:text-zinc-400"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
