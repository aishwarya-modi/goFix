"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Bookmark, BookmarkCheck,
  Circle, BookOpen, Brain, Trophy, X, AlertTriangle, Lightbulb,
  ExternalLink, ChevronRight, Code,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";
import { getTopicContent } from "@/lib/data/topic-content";
import { getQuestionsForTopic } from "@/lib/quiz/questions";
import { useQuizStore } from "@/store/quiz";
import { QuizEngine } from "@/components/quiz/QuizEngine";

interface RoadmapTopic {
  id: number;
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  sort_order: number;
}

interface TopicProgress {
  completed: boolean;
  bookmarked: boolean;
  notes: string | null;
}

interface QuizItem {
  id: number;
  topic_slug: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty: string;
  sort_order: number;
}

interface QuizStats {
  total: number;
  attempted: number;
  correct: number;
}

const categoryMeta: Record<string, { label: string; color: string; bg: string }> = {
  fundamentals: { label: "Fundamentals", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  intermediate: { label: "Intermediate", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  advanced: { label: "Advanced", color: "text-purple-400", bg: "bg-purple-500/10" },
  packages: { label: "Standard Library", color: "text-blue-400", bg: "bg-blue-500/10" },
  frameworks: { label: "Frameworks", color: "text-orange-400", bg: "bg-orange-500/10" },
  tools: { label: "Tools & Toolchain", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  testing: { label: "Testing", color: "text-pink-400", bg: "bg-pink-500/10" },
  projects: { label: "Projects", color: "text-amber-400", bg: "bg-amber-500/10" },
};

const difficultyColors: Record<string, string> = {
  beginner: "text-emerald-400 bg-emerald-500/10",
  intermediate: "text-yellow-400 bg-yellow-500/10",
  advanced: "text-red-400 bg-red-500/10",
};

export default function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = use(params);
  const { currentUser } = useAuthStore();
  const [topic, setTopic] = useState<RoadmapTopic | null>(null);
  const [progress, setProgress] = useState<TopicProgress | null>(null);
  const { startQuiz } = useQuizStore();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"content" | "quiz">("content");
  const [expandedExample, setExpandedExample] = useState<number | null>(0);

  const content = getTopicContent(slug);
  const questions = getQuestionsForTopic(slug);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(`/api/roadmap?category=&difficulty=`);
        const data = await res.json();
        const found = data.topics?.find((t: RoadmapTopic) => t.slug === slug);
        setTopic(found || null);

        if (currentUser && found) {
          const progressRes = await fetch(`/api/progress?userId=${currentUser.id}`);
          const progressData = await progressRes.json();
          const topicProgress = progressData.progress?.find(
            (p: { topic_slug: string }) => p.topic_slug === slug
          );
          setProgress(topicProgress || { completed: false, bookmarked: false, notes: null });
        }
        
        if (questions.length > 0) {
            startQuiz(slug, questions);
        }
      } catch (error) {
        console.error("Failed to fetch topic:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [slug, currentUser, questions, startQuiz]);

  const toggleComplete = async () => {
    if (!currentUser || !topic) return;
    const newCompleted = !progress?.completed;
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id, topicSlug: slug, completed: newCompleted }),
    });
    setProgress({ completed: newCompleted, bookmarked: progress?.bookmarked || false, notes: progress?.notes ?? null });
  };

  const toggleBookmark = async () => {
    if (!currentUser || !topic) return;
    const newBookmarked = !progress?.bookmarked;
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id, topicSlug: slug, bookmarked: newBookmarked }),
    });
    setProgress({ completed: progress?.completed || false, bookmarked: newBookmarked, notes: progress?.notes ?? null });
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Topic not found</h1>
        <Link href="/learn" className="mt-4 inline-block text-sm text-purple-400">
          Back to Learn
        </Link>
      </div>
    );
  }

  const meta = categoryMeta[topic.category] || { label: topic.category, color: "text-zinc-400", bg: "bg-zinc-500/10" };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Roadmap
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className={cn("rounded-lg px-2 py-1 text-[10px] font-medium", meta.bg, meta.color)}>
                  {meta.label}
                </span>
                <span className={cn("rounded-lg px-2 py-1 text-[10px] font-medium", difficultyColors[topic.difficulty])}>
                  {topic.difficulty}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white">{content?.title || topic.title}</h1>
              <p className="mt-2 text-sm text-zinc-400">{content?.summary}</p>
            </div>
            {currentUser && (
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleBookmark}
                  className={cn(
                    "rounded-lg p-2 transition-colors",
                    progress?.bookmarked
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10"
                  )}
                >
                  {progress?.bookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                </button>
                <button
                  onClick={toggleComplete}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    progress?.completed
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10"
                  )}
                >
                  {progress?.completed ? (
                    <><CheckCircle2 className="h-4 w-4" /> Completed</>
                  ) : (
                    <><Circle className="h-4 w-4" /> Mark Complete</>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 rounded-lg bg-white/5 p-1">
          <button
            onClick={() => setActiveTab("content")}
            className={cn(
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "content" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-300"
            )}
          >
            <BookOpen className="mr-2 inline h-4 w-4" />
            Learn
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={cn(
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "quiz" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-300"
            )}
          >
            <Brain className="mr-2 inline h-4 w-4" />
            Quiz {questions.length > 0 && `(${questions.length})`}
          </button>
        </div>

        {/* Content Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 space-y-6"
            >
              {content ? (
                <>
                  {/* Description */}
                  <section className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-6">
                    <h2 className="text-lg font-semibold text-white">
                      What is <span className="text-gradient-green">{content.title}</span>?
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400 whitespace-pre-line">
                      {content.description}
                    </p>
                  </section>

                  {/* Key Points */}
                  <section className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-6">
                    <h2 className="text-lg font-extrabold tracking-tight text-white">Key <span className="text-gradient-cyan">Points</span></h2>
                    <ul className="mt-4 space-y-3">
                      {content.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
                          <span className="text-sm leading-relaxed text-zinc-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Code Examples */}
                  {content.codeExamples.length > 0 && (
                    <section className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-6">
                      <h2 className="text-lg font-semibold text-white">
                        <Code className="mr-2 inline h-5 w-5 text-purple-400" />
                        Code Examples
                      </h2>
                      <div className="mt-4 space-y-4">
                        {content.codeExamples.map((example, i) => (
                          <div key={i} className="rounded-lg border border-white/[0.06] overflow-hidden">
                            <button
                              onClick={() => setExpandedExample(expandedExample === i ? null : i)}
                              className="flex w-full items-center justify-between p-4 text-left hover:bg-white/[0.02]"
                            >
                              <div>
                                <p className="text-sm font-medium text-white">{example.title}</p>
                                <p className="mt-1 text-xs text-zinc-500">{example.description}</p>
                              </div>
                              <ChevronRight
                                className={cn(
                                  "h-4 w-4 text-zinc-500 transition-transform",
                                  expandedExample === i && "rotate-90"
                                )}
                              />
                            </button>
                            {expandedExample === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-white/[0.06]"
                              >
                                <div className="p-4 space-y-3">
                                  {/* Bad Example */}
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                      <span className="text-xs font-medium text-red-400">Bad Practice</span>
                                    </div>
                                    <pre className="overflow-x-auto rounded-lg bg-[#0d1117] p-4 text-[12px] leading-relaxed text-zinc-300">
                                      <code>{example.bad}</code>
                                    </pre>
                                  </div>
                                  {/* Good Example */}
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                      <span className="text-xs font-medium text-emerald-400">Best Practice</span>
                                    </div>
                                    <pre className="overflow-x-auto rounded-lg bg-[#0d1117] p-4 text-[12px] leading-relaxed text-zinc-300">
                                      <code>{example.good}</code>
                                    </pre>
                                  </div>
                                  {/* Explanation */}
                                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                                    <p className="text-sm text-zinc-300">{example.explanation}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Best Practices */}
                  <section className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-6">
                    <h2 className="text-lg font-extrabold tracking-tight text-white">Best <span className="text-gradient-green">Practices</span></h2>
                    <ul className="mt-4 space-y-3">
                      {content.bestPractices.map((practice, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          <span className="text-sm leading-relaxed text-zinc-300">{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Common Mistakes */}
                  {content.commonMistakes.length > 0 && (
                    <section className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-6">
                      <h2 className="text-lg font-semibold text-red-400">
                        <AlertTriangle className="mr-2 inline h-5 w-5" />
                        <span className="font-extrabold tracking-tight">Common <span className="text-red-300">Mistakes</span></span>
                      </h2>
                      <ul className="mt-4 space-y-3">
                        {content.commonMistakes.map((mistake, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                            <span className="text-sm leading-relaxed text-zinc-300">{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Related Topics */}
                  {content.relatedTopics.length > 0 && (
                    <section className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-6">
                      <h2 className="text-lg font-semibold text-white">Related Topics</h2>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {content.relatedTopics.map((topic, i) => (
                          <Link
                            key={i}
                            href={`/learn/${topic}`}
                            className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10"
                          >
                            {topic}
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* External Resources */}
                  {content.externalResources.length > 0 && (
                    <section className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-6">
                      <h2 className="text-lg font-semibold text-white">External Resources</h2>
                      <div className="mt-4 space-y-2">
                        {content.externalResources.map((resource, i) => (
                          <a
                            key={i}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg bg-white/5 p-3 text-sm text-zinc-300 hover:bg-white/10"
                          >
                            <ExternalLink className="h-4 w-4 shrink-0 text-zinc-500" />
                            {resource.title}
                          </a>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Practice CTA */}
                  <section className="rounded-xl border border-purple-500/10 bg-purple-500/[0.03] p-6">
                    <h2 className="text-lg font-semibold text-purple-400">Practice What You Learned</h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      Apply these concepts in the Go challenge project.
                    </p>
                    <Link
                      href="/challenge"
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-purple-500/10 border border-purple-500/20 px-4 py-2 text-sm font-medium text-purple-400 transition-all hover:bg-purple-500/20"
                    >
                      Go to Challenge
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </section>
                </>
              ) : (
                /* Fallback for topics without detailed content */
                <section className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-12 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-zinc-600" />
                  <h3 className="mt-4 text-lg font-semibold text-white">Content Coming Soon</h3>
                  <p className="mt-2 text-sm text-zinc-400 max-w-md mx-auto">
                    Detailed content for this topic is being prepared. In the meantime,
                    try the quiz to test your knowledge or explore the challenge project.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <Link
                      href="/challenge"
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/20"
                    >
                      Try Challenge
                    </Link>
                    <a
                      href="https://go.dev/doc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/[0.06] px-4 py-2 text-sm font-medium text-zinc-400 transition-all hover:bg-white/10"
                    >
                      Official Docs
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </section>
              )}
            </motion.div>
          )}

          {/* Quiz Tab */}
          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6"
            >
              {questions.length === 0 ? (
                <div className="rounded-xl border border-white/[0.06] bg-[#0c0c12] p-12 text-center">
                  <Brain className="mx-auto h-12 w-12 text-zinc-600" />
                  <h3 className="mt-4 text-lg font-semibold text-white">No quizzes available</h3>
                </div>
              ) : (
                <QuizEngine />
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
