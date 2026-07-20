"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, CheckCircle2, Circle, Lock, Star, ChevronRight,
  Target, Trophy, Bookmark, Filter,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

interface RoadmapTopic {
  id: number;
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  sort_order: number;
}

interface UserProgress {
  topic_slug: string;
  completed: boolean;
  bookmarked: boolean;
}

interface QuizStats {
  topic_slug: string;
  attempted: number;
  correct: number;
}

const categoryMeta: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  fundamentals: { label: "Fundamentals", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: "01" },
  intermediate: { label: "Intermediate", color: "text-cyan-400", bg: "bg-cyan-500/10", icon: "02" },
  advanced: { label: "Advanced", color: "text-purple-400", bg: "bg-purple-500/10", icon: "03" },
  packages: { label: "Standard Library", color: "text-blue-400", bg: "bg-blue-500/10", icon: "04" },
  frameworks: { label: "Frameworks", color: "text-orange-400", bg: "bg-orange-500/10", icon: "05" },
  tools: { label: "Tools & Toolchain", color: "text-yellow-400", bg: "bg-yellow-500/10", icon: "06" },
  testing: { label: "Testing", color: "text-pink-400", bg: "bg-pink-500/10", icon: "07" },
  projects: { label: "Projects", color: "text-amber-400", bg: "bg-amber-500/10", icon: "08" },
};

const difficultyColors: Record<string, string> = {
  beginner: "text-emerald-400 bg-emerald-500/10",
  intermediate: "text-yellow-400 bg-yellow-500/10",
  advanced: "text-red-400 bg-red-500/10",
};

export default function LearnPage() {
  const { currentUser } = useAuthStore();
  const [topics, setTopics] = useState<RoadmapTopic[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [quizStats, setQuizStats] = useState<QuizStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsRes, progressRes, quizzesRes] = await Promise.all([
          fetch("/api/roadmap"),
          currentUser ? fetch(`/api/progress?userId=${currentUser.id}`) : null,
          currentUser ? fetch(`/api/quizzes?topic=all&userId=${currentUser.id}`) : null,
        ]);

        const topicsData = await topicsRes.json();
        setTopics(topicsData.topics || []);

        if (progressRes) {
          const progressData = await progressRes.json();
          setProgress(progressData.progress || []);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const getTopicProgress = (slug: string) => progress.find((p) => p.topic_slug === slug);
  const isCompleted = (slug: string) => getTopicProgress(slug)?.completed || false;
  const isBookmarked = (slug: string) => getTopicProgress(slug)?.bookmarked || false;

  // Group topics by category
  const grouped: Record<string, RoadmapTopic[]> = {};
  topics.forEach((topic) => {
    if (!grouped[topic.category]) {
      grouped[topic.category] = [];
    }
    grouped[topic.category].push(topic);
  });

  // Filter
  const categories = Object.keys(categoryMeta);
  const filteredCategories = selectedCategory
    ? [selectedCategory]
    : categories;

  // Calculate stats
  const totalTopics = topics.length;
  const completedCount = progress.filter((p) => p.completed).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Go Learning Roadmap</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Master Go from fundamentals to advanced topics with 172 structured lessons
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mb-6 rounded-xl border border-white/[0.06] bg-[#0c0c12] p-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <Target className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Progress</p>
                <p className="text-sm font-semibold text-white">{completedCount}/{totalTopics} topics</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="mt-1 text-[10px] text-zinc-500">{progressPercent}% complete</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-2">
                <Trophy className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Bookmarks</p>
                <p className="text-sm font-semibold text-white">
                  {progress.filter((p) => p.bookmarked).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              !selectedCategory
                ? "bg-white/10 text-white"
                : "bg-white/5 text-zinc-400 hover:bg-white/10"
            )}
          >
            All ({totalTopics})
          </button>
          {categories.map((cat) => {
            const meta = categoryMeta[cat];
            const count = grouped[cat]?.length || 0;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  selectedCategory === cat
                    ? "bg-white/10 text-white"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10"
                )}
              >
                {meta.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Roadmap Content */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map((cat) => {
              const catTopics = grouped[cat] || [];
              if (catTopics.length === 0) return null;
              const meta = categoryMeta[cat];
              const completedInCategory = catTopics.filter((t) => isCompleted(t.slug)).length;
              const categoryPercent = Math.round((completedInCategory / catTopics.length) * 100);

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-white/[0.06] bg-[#0c0c12] overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold", meta.bg, meta.color)}>
                        {meta.icon}
                      </div>
                      <div>
                        <h2 className="text-sm font-semibold text-white">{meta.label}</h2>
                        <p className="text-[10px] text-zinc-500">
                          {completedInCategory}/{catTopics.length} completed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                          style={{ width: `${categoryPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-zinc-500">{categoryPercent}%</span>
                    </div>
                  </div>

                  {/* Topics Grid */}
                  <div className="grid grid-cols-1 gap-px bg-white/[0.03] sm:grid-cols-2 lg:grid-cols-3">
                    {catTopics.map((topic) => {
                      const completed = isCompleted(topic.slug);
                      const bookmarked = isBookmarked(topic.slug);
                      return (
                        <Link
                          key={topic.slug}
                          href={`/learn/${topic.slug}`}
                          className={cn(
                            "flex items-center gap-3 bg-[#0c0c12] p-3 transition-colors hover:bg-white/[0.03]",
                            completed && "bg-emerald-500/5"
                          )}
                        >
                          {completed ? (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                          ) : (
                            <Circle className="h-4 w-4 shrink-0 text-zinc-600" />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className={cn(
                              "text-xs font-medium truncate",
                              completed ? "text-zinc-400 line-through" : "text-zinc-200"
                            )}>
                              {topic.title}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className={cn("rounded px-1 py-0.5 text-[9px] font-medium", difficultyColors[topic.difficulty])}>
                                {topic.difficulty}
                              </span>
                            </div>
                          </div>
                          {bookmarked && (
                            <Bookmark className="h-3 w-3 shrink-0 text-amber-400" />
                          )}
                          <ChevronRight className="h-3 w-3 shrink-0 text-zinc-600" />
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
