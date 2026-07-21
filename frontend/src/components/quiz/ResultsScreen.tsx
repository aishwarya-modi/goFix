"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Clock, Target, ArrowLeft, RefreshCw, Eye, Award, Zap, ChevronRight, Check, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateGrade, getLevelFromXP, formatTime, type QuizAttempt, type QuizQuestion } from "@/lib/quiz/types";

interface ResultsScreenProps {
  attempt: QuizAttempt;
  questions: QuizQuestion[];
  onRetry: () => void;
  onBack: () => void;
  onPracticeWrong?: () => void;
  hasWrongAnswers?: boolean;
}

export function ResultsScreen({ attempt, questions, onRetry, onBack, onPracticeWrong, hasWrongAnswers }: ResultsScreenProps) {
  const percentage = attempt.totalPoints > 0 ? Math.round((attempt.score / attempt.totalPoints) * 100) : 0;
  const grade = calculateGrade(percentage);
  const levelData = getLevelFromXP(attempt.score); // This uses score just to preview level progress increase
  const isPerfect = percentage === 100;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isPerfect) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isPerfect]);

  return (
    <div className="space-y-8 relative">
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-5%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              <div
                className="w-2 h-3 rounded-sm"
                style={{
                  backgroundColor: ["#00ff88", "#fbbf24", "#3b82f6", "#ec4899", "#8b5cf6", "#06b6d4"][i % 6],
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}
      {/* Grade and Celebration Header */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-8 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50" />
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <Trophy className="h-8 w-8" />
          </div>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white">Quiz <span className="text-gradient-green">Completed!</span></h2>
          <p className="mt-1 text-sm text-zinc-400">
            Great effort preparing for your <span className="font-semibold text-emerald-400">Go backend</span> interview.
          </p>

          <div className="mt-6 flex items-baseline justify-center gap-1">
            <span className={`text-6xl font-extrabold tracking-tight ${grade.color}`}>{grade.grade}</span>
            <span className="text-zinc-500">/ {grade.label}</span>
          </div>

          <div className="mt-4 text-sm font-semibold text-zinc-300">
            Score: <span className="text-emerald-400">{attempt.score}</span> / {attempt.totalPoints} pts ({percentage}%)
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Accuracy", value: `${percentage}%`, sub: `${attempt.correctCount} correct`, icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/5 border-emerald-500/10" },
          { label: "Time Taken", value: formatTime(attempt.timeTaken), sub: "Avg 12s / q", icon: Clock, color: "text-cyan-400", bg: "bg-cyan-500/5 border-cyan-500/10" },
          { label: "XP Earned", value: `+${attempt.score * 2} XP`, sub: "Double XP active", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/5 border-amber-500/10" },
          { label: "Status", value: percentage >= 70 ? "Passed" : "Failed", sub: "70% passing score", icon: Award, color: percentage >= 70 ? "text-emerald-400" : "text-red-400", bg: percentage >= 70 ? "bg-emerald-500/5 border-emerald-500/10" : "bg-red-500/5 border-red-500/10" }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * (i + 1) }}
            className={`rounded-xl border p-4 ${stat.bg}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">{stat.label}</span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <p className="mt-2 text-lg font-bold text-white">{stat.value}</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Review Mode Panel */}
      <Card className="border border-white/[0.08] bg-[#0c0c12] p-6">
        <h3 className="text-sm font-extrabold tracking-tight text-white mb-4">Question <span className="text-gradient-cyan">Review</span></h3>
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const userAnswer = attempt.answers[q.id];
            const isCorrect = Array.isArray(userAnswer)
              ? Array.isArray(q.correctAnswer) && userAnswer.length === q.correctAnswer.length && userAnswer.every(v => q.correctAnswer.includes(v))
              : userAnswer === q.correctAnswer;

            return (
              <div key={q.id} className="border-b border-white/[0.04] pb-4 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isCorrect ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                    {isCorrect ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-zinc-400">Question {idx + 1}</p>
                    <p className="text-sm font-medium text-white">{q.question}</p>
                    
                    {q.code && (
                      <pre className="mt-2 overflow-x-auto rounded-lg bg-[#0d1117] p-3 text-[11px] font-mono leading-relaxed text-zinc-300">
                        <code>{q.code}</code>
                      </pre>
                    )}

                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="rounded bg-white/5 px-2 py-0.5 text-zinc-400">
                        Your answer: <span className={isCorrect ? "text-emerald-400" : "text-red-400 font-semibold"}>
                          {Array.isArray(userAnswer) ? userAnswer.join(", ") : (userAnswer || "Skipped")}
                        </span>
                      </span>
                      {!isCorrect && (
                        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                          Correct: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(", ") : q.correctAnswer}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 mt-2 italic">Explanation: {q.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="outline" className="gap-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" /> Back to Roadmap
        </Button>
        {hasWrongAnswers && onPracticeWrong && (
          <Button variant="outline" className="gap-2 border-amber-500/20 text-amber-400 hover:bg-amber-500/10" onClick={onPracticeWrong}>
            <RefreshCw className="h-4 w-4" /> Practice Wrong Questions
          </Button>
        )}
        <Button className="gap-2 bg-emerald-500 text-black hover:bg-emerald-400" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" /> Retry Quiz
        </Button>
      </div>
    </div>
  );
}
