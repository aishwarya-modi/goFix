"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, CheckCircle2, Circle, Lock, Star, ChevronRight,
  Target, Trophy, Bookmark, Filter, Award, Zap, Clock, Activity,
  RefreshCw, TrendingUp, HelpCircle, Search, X
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useQuizStore } from "@/store/quiz";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { LEVEL_THRESHOLDS, getLevelFromXP } from "@/lib/quiz/types";

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
  const { getDashboardData, unlockedAchievements, attempts } = useQuizStore();
  
  const [topics, setTopics] = useState<RoadmapTopic[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"roadmap" | "dashboard">("roadmap");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsRes, progressRes] = await Promise.all([
          fetch("/api/roadmap"),
          currentUser ? fetch(`/api/progress?userId=${currentUser.id}`) : null,
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

  const categories = Object.keys(categoryMeta);
  const filteredCategories = selectedCategory ? [selectedCategory] : categories;

  // Search filtering
  const matchesSearch = (topic: RoadmapTopic) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return topic.title.toLowerCase().includes(query) || topic.slug.toLowerCase().includes(query);
  };

  // Stats
  const totalTopics = topics.length;
  const completedCount = progress.filter((p) => p.completed).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Dashboard Stats
  const stats = getDashboardData(totalTopics > 0 ? totalTopics : 172);
  const levelInfo = getLevelFromXP(stats.xp);

  const availableAchievements = [
    { id: "first_quiz", title: "First Step", desc: "Complete your first topic quiz", icon: "🎯" },
    { id: "five_quizzes", title: "Persistent Learner", desc: "Complete 5 topic quizzes", icon: "📚" },
    { id: "perfect_quiz", title: "Flawless Execution", desc: "Get 100% score on any quiz", icon: "✨" },
    { id: "streak_3", title: "On Fire", desc: "Maintain a 3-day active streak", icon: "🔥" },
    { id: "level_5", title: "Rising Star", desc: "Reach Level 5 in Go mastery", icon: "🚀" },
    { id: "accuracy_90", title: "Sharp Mind", desc: "Maintain 90%+ average quiz accuracy", icon: "🧠" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0a0a0f] text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Page Title & Navigation Tabs */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Go <span className="text-gradient-hero">Mastery Hub</span>
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Master Go from <span className="font-semibold text-emerald-400">syntax fundamentals</span> to{" "}
              <em className="text-zinc-300">advanced backend cloud-native architecture</em>.
            </p>
          </div>

          <div className="flex gap-1.5 rounded-xl bg-white/5 p-1 border border-white/[0.04]">
            <button
              onClick={() => setActiveView("roadmap")}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-200",
                activeView === "roadmap"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Roadmap
            </button>
            <button
              onClick={() => setActiveView("dashboard")}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-200",
                activeView === "dashboard"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <Award className="h-4 w-4" />
              Learning Dashboard
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeView === "roadmap" ? (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Stats Bar */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c12] p-6 shadow-xl">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/10">
                        <Target className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Total Progress</p>
                        <p className="text-lg font-extrabold text-white">{completedCount}/{totalTopics} topics</p>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-zinc-500 font-medium">{progressPercent}% roadmap complete</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400 border border-amber-500/10">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Bookmarks</p>
                        <p className="text-lg font-extrabold text-white">
                          {progress.filter((p) => p.bookmarked).length} items
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search & Filters */}
                <div className="space-y-3 border-b border-white/[0.04] pb-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Search topics... (e.g. goroutines, channels, interfaces)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] py-2.5 pl-10 pr-10 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500/30 focus:bg-white/[0.04]"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                      "rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 border",
                      !selectedCategory
                        ? "bg-white/10 text-white border-white/20 shadow-md"
                        : "bg-white/[0.02] text-zinc-400 border-white/[0.04] hover:bg-white/5 hover:text-white"
                    )}
                  >
                    All Topics ({totalTopics})
                  </button>
                  {categories.map((cat) => {
                    const meta = categoryMeta[cat];
                    const count = grouped[cat]?.length || 0;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className={cn(
                          "rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 border",
                          selectedCategory === cat
                            ? "bg-white/10 text-white border-white/20 shadow-md"
                            : "bg-white/[0.02] text-zinc-400 border-white/[0.04] hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {meta.label} ({count})
                      </button>
                    );
                  })}
                  </div>
                </div>

                {/* Roadmap Categories */}
                <div className="space-y-8">
                  {filteredCategories.map((cat) => {
                    const catTopics = (grouped[cat] || []).filter(matchesSearch);
                    if (catTopics.length === 0) return null;
                    const meta = categoryMeta[cat];
                    const completedInCategory = catTopics.filter((t) => isCompleted(t.slug)).length;
                    const categoryPercent = Math.round((completedInCategory / catTopics.length) * 100);

                    return (
                      <div key={cat} className="rounded-2xl border border-white/[0.06] bg-[#0c0c12] overflow-hidden shadow-xl">
                        {/* Category Header */}
                        <div className="flex flex-col gap-4 border-b border-white/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between bg-white/[0.01]">
                          <div className="flex items-center gap-3">
                            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold border border-white/[0.04]", meta.bg, meta.color)}>
                              {meta.icon}
                            </div>
                            <div>
                              <h2 className="text-base font-extrabold tracking-tight text-white">{meta.label}</h2>
                              <p className="text-xs text-zinc-500">
                                {completedInCategory} of {catTopics.length} completed
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-32 overflow-hidden rounded-full bg-white/5">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                                style={{ width: `${categoryPercent}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-zinc-400">{categoryPercent}%</span>
                          </div>
                        </div>

                        {/* Topics Grid */}
                        <div className="grid grid-cols-1 gap-px bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
                          {catTopics.map((topic) => {
                            const completed = isCompleted(topic.slug);
                            const bookmarked = isBookmarked(topic.slug);
                            return (
                              <Link
                                key={topic.slug}
                                href={`/learn/${topic.slug}`}
                                className={cn(
                                  "flex items-center gap-4 bg-[#0c0c12] p-4 transition-all duration-200 hover:bg-white/[0.03]",
                                  completed && "bg-emerald-500/[0.02]"
                                )}
                              >
                                {completed ? (
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                                  </div>
                                ) : (
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 text-zinc-700">
                                    <Circle className="h-3 w-3 shrink-0" />
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <p className={cn(
                                    "text-sm font-semibold truncate",
                                    completed ? "text-zinc-500 line-through" : "text-zinc-200"
                                  )}>
                                    {topic.title}
                                  </p>
                                  <div className="mt-1 flex items-center gap-2">
                                    <span className={cn("rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", difficultyColors[topic.difficulty])}>
                                      {topic.difficulty}
                                    </span>
                                  </div>
                                </div>
                                {bookmarked && (
                                  <Bookmark className="h-3.5 w-3.5 shrink-0 text-amber-400 fill-amber-400" />
                                )}
                                <ChevronRight className="h-4 w-4 shrink-0 text-zinc-600" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Level Up & Streak Progress Summary */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {/* Current Level card */}
                  <Card className="relative overflow-hidden border border-white/[0.06] bg-gradient-to-br from-emerald-500/5 to-transparent p-6 shadow-xl md:col-span-2">
                    <div className="absolute right-0 top-0 -mr-16 -mt-16 h-36 w-36 rounded-full bg-emerald-500/5 blur-3xl" />
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Go Mastery Rank</p>
                        <h3 className="text-2xl font-black tracking-tight text-white">{stats.levelTitle}</h3>
                        <p className="text-xs text-zinc-400">Level {stats.level} developer</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                        <Zap className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between text-xs font-bold text-zinc-400">
                        <span>Current XP: {stats.xp} pts</span>
                        <span>Level Progress: {levelInfo.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                          style={{ width: `${levelInfo.progress}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500 italic">Earn more XP by completing lesson quizzes with high scores.</p>
                    </div>
                  </Card>

                  {/* Active Streak card */}
                  <Card className="border border-white/[0.06] bg-[#0c0c12] p-6 shadow-xl flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold tracking-wider text-amber-400 uppercase">Daily Streak</p>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/10">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="my-4 text-center">
                      <span className="text-5xl font-black tracking-tight text-white">{stats.currentStreak}</span>
                      <span className="text-zinc-500 text-lg font-semibold ml-1">Days</span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-normal text-center">
                      {stats.currentStreak > 0
                        ? "Keep practicing every day to lock in knowledge retention!"
                        : "Complete a quiz today to start a new learning streak."}
                    </p>
                  </Card>
                </div>

                {/* Dashboard Stats Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { label: "Accuracy", value: `${stats.quizAccuracy}%`, icon: Target, desc: "Avg quiz performance", color: "text-emerald-400", bg: "bg-emerald-500/5 border-emerald-500/10" },
                    { label: "Hours Studied", value: `${stats.hoursStudied}h`, icon: Clock, desc: "Cumulative time", color: "text-cyan-400", bg: "bg-cyan-500/5 border-cyan-500/10" },
                    { label: "Best Category", value: stats.bestTopic || "None yet", icon: Star, desc: "Highest scoring topic", color: "text-amber-400", bg: "bg-amber-500/5 border-amber-500/10" },
                    { label: "Total Quizzes", value: `${attempts.length}`, icon: Activity, desc: "Finished attempts", color: "text-purple-400", bg: "bg-purple-500/5 border-purple-500/10" }
                  ].map((item, i) => (
                    <div key={item.label} className={cn("rounded-2xl border p-5 space-y-2 shadow-md bg-white/[0.01] border-white/[0.04]", item.bg)}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">{item.label}</span>
                        <item.icon className={cn("h-4 w-4", item.color)} />
                      </div>
                      <p className="text-lg font-bold text-white tracking-tight truncate">{item.value}</p>
                      <p className="text-[10px] text-zinc-500 font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Achievements List */}
                <Card className="border border-white/[0.06] bg-[#0c0c12] p-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-4 mb-6">
                    <div>
                      <h3 className="text-base font-extrabold tracking-tight text-white">Milestone <span className="text-gradient-amber">Achievements</span></h3>
                      <p className="text-xs text-zinc-500">Unlock certifications and digital trophies</p>
                    </div>
                    <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-bold text-zinc-300 border border-white/[0.04]">
                      {unlockedAchievements.length} / {availableAchievements.length} Unlocked
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {availableAchievements.map((ach) => {
                      const isUnlocked = unlockedAchievements.includes(ach.id);
                      return (
                        <div
                          key={ach.id}
                          className={cn(
                            "flex items-start gap-4 rounded-xl border p-4 transition-all duration-300",
                            isUnlocked
                              ? "bg-emerald-500/[0.02] border-emerald-500/20 shadow-md"
                              : "bg-white/[0.01] border-white/[0.04] opacity-50 grayscale"
                          )}
                        >
                          <span className="text-3xl">{ach.icon}</span>
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                            <p className="text-xs text-zinc-400 leading-normal">{ach.desc}</p>
                            {isUnlocked && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 mt-1 uppercase">
                                <CheckCircle2 className="h-3 w-3" /> Unlocked
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Recent Quiz Activity Attempts */}
                <Card className="border border-white/[0.06] bg-[#0c0c12] p-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-4 mb-6">
                    <div>
                      <h3 className="text-base font-extrabold tracking-tight text-white">Recent Quiz <span className="text-gradient-cyan">Activity</span></h3>
                      <p className="text-xs text-zinc-500">History of your knowledge checks</p>
                    </div>
                  </div>

                  {attempts.length === 0 ? (
                    <div className="py-12 text-center text-zinc-500 space-y-2">
                      <HelpCircle className="mx-auto h-8 w-8 text-zinc-600" />
                      <p className="text-sm font-semibold">No quiz attempts yet</p>
                      <p className="text-xs max-w-sm mx-auto">Open any topic from the Roadmap view, switch to the Quiz tab, and complete a knowledge check to see your metrics here.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-zinc-300">
                        <thead className="text-xs uppercase text-zinc-500 border-b border-white/[0.04] bg-white/[0.01]">
                          <tr>
                            <th className="p-3 font-bold">Topic</th>
                            <th className="p-3 font-bold">Completed At</th>
                            <th className="p-3 font-bold">Accuracy Score</th>
                            <th className="p-3 font-bold">Time Taken</th>
                            <th className="p-3 font-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                          {[...attempts].reverse().slice(0, 5).map((att, idx) => {
                            const acc = att.totalPoints > 0 ? Math.round((att.score / att.totalPoints) * 100) : 0;
                            const isPassed = acc >= 70;
                            return (
                              <tr key={idx} className="hover:bg-white/[0.01]">
                                <td className="p-3 font-semibold text-white capitalize">{att.topicSlug.replace(/-/g, " ")}</td>
                                <td className="p-3 text-xs text-zinc-400">{new Date(att.completedAt).toLocaleDateString()}</td>
                                <td className="p-3 font-mono font-bold text-zinc-200">{att.score}/{att.totalPoints} pts ({acc}%)</td>
                                <td className="p-3 text-xs text-zinc-400">{att.timeTaken} seconds</td>
                                <td className="p-3">
                                  <span className={cn(
                                    "rounded px-2 py-0.5 text-[10px] font-bold uppercase",
                                    isPassed ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                                  )}>
                                    {isPassed ? "Passed" : "Needs Review"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
