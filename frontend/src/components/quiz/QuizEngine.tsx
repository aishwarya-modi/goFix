"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore } from "@/store/quiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResultsScreen } from "./ResultsScreen";
import { AlertCircle, Clock, Check, X, ShieldAlert, Award, ArrowRight, BookOpen, Volume2, Timer, Infinity } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuizEngine() {
  const { currentQuestions, answers, submitAnswer, showExplanation, finishQuiz, score, isComplete, resetQuiz, startQuiz, currentTopic } = useQuizStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question for Timed Mode
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [timedMode, setTimedMode] = useState(true);

  const question = currentQuestions[currentIndex];

  // Timer logic for timed quiz challenges
  useEffect(() => {
    if (isComplete || !question || showExplanation || !timedMode) return;
    
    setTimeLeft(60);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, isComplete, showExplanation, question, timedMode]);

  if (isComplete && lastAttempt) {
    // Find wrong question IDs
    const wrongQuestionIds = currentQuestions.filter((q) => {
      const userAnswer = answers[q.id];
      if (userAnswer === undefined) return true;
      return Array.isArray(userAnswer)
        ? !(Array.isArray(q.correctAnswer) && userAnswer.length === q.correctAnswer.length && userAnswer.every(v => q.correctAnswer.includes(v)))
        : userAnswer !== q.correctAnswer;
    }).map(q => q.id);
    const hasWrong = wrongQuestionIds.length > 0;

    const handlePracticeWrong = () => {
      const wrongQuestions = currentQuestions.filter(q => wrongQuestionIds.includes(q.id));
      if (wrongQuestions.length > 0 && currentTopic) {
        startQuiz(currentTopic, wrongQuestions);
        setCurrentIndex(0);
        setSelectedAnswers([]);
        setLastAttempt(null);
      }
    };

    return (
      <ResultsScreen
        attempt={lastAttempt}
        questions={currentQuestions}
        onRetry={() => {
          resetQuiz();
          setCurrentIndex(0);
          setSelectedAnswers([]);
          setLastAttempt(null);
        }}
        onBack={() => {
          resetQuiz();
          setLastAttempt(null);
        }}
        onPracticeWrong={handlePracticeWrong}
        hasWrongAnswers={hasWrong}
      />
    );
  }

  if (!question) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <AlertCircle className="h-10 w-10 text-zinc-500" />
        <h3 className="mt-4 text-sm font-semibold text-white">No active quiz session</h3>
        <p className="mt-1 text-xs text-zinc-500">Go to any roadmap topic and open the Quiz tab to start.</p>
      </div>
    );
  }

  const handleOptionSelect = (optionId: string) => {
    if (showExplanation) return;

    if (question.type === "multiple-select") {
      setSelectedAnswers((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedAnswers([optionId]);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswers.length === 0) return;
    
    const ans = question.type === "multiple-select" ? selectedAnswers : selectedAnswers[0];
    submitAnswer(question.id, ans);
  };

  const handleNextQuestion = () => {
    setSelectedAnswers([]);
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      // reset explanation state inside store through a hack or just direct set
      useQuizStore.setState({ showExplanation: false });
    } else {
      const attempt = finishQuiz();
      setLastAttempt(attempt);
    }
  };

  const hasSelected = selectedAnswers.length > 0;
  const isMultiSelect = question.type === "multiple-select";

  return (
    <div className="space-y-6">
      {/* Quiz Progress & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-zinc-400">
            Question {currentIndex + 1} of {currentQuestions.length}
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className={cn(
              "rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider",
              question.difficulty === "easy" ? "bg-emerald-500/10 text-emerald-400" :
              question.difficulty === "medium" ? "bg-cyan-500/10 text-cyan-400" : "bg-red-500/10 text-red-400"
            )}>
              {question.difficulty}
            </span>
            <span className="text-[10px] text-zinc-500">+{question.points} pts</span>
          </div>
        </div>

        {/* Timer Mode Toggle */}
        <button
          onClick={() => setTimedMode(!timedMode)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all border",
            timedMode
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-white/5 text-zinc-400 border-white/[0.04] hover:bg-white/10"
          )}
          title={timedMode ? "Switch to untimed mode" : "Switch to timed mode"}
        >
          {timedMode ? <Timer className="h-3.5 w-3.5" /> : <Infinity className="h-3.5 w-3.5" />}
          {timedMode ? "Timed" : "Untimed"}
        </button>

        {/* Circular Countdown Timer */}
        {timedMode && (
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 border border-white/[0.04]">
            <Clock className={cn("h-4 w-4", timeLeft <= 10 ? "animate-pulse text-red-400" : "text-emerald-400")} />
            <span className={cn("font-mono text-sm font-semibold", timeLeft <= 10 ? "text-red-400" : "text-white")}>
              {timeLeft}s
            </span>
          </div>
        )}
      </div>

      <Progress value={((currentIndex + 1) / currentQuestions.length) * 100} className="h-1.5 bg-white/5" />

      {/* Main Question Card */}
      <Card className="overflow-hidden border border-white/[0.06] bg-[#0c0c12] p-6 shadow-xl">
        <motion.div
          key={question.id}
          initial={{ x: 15, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -15, opacity: 0 }}
          className="space-y-6"
        >
          {/* Question Text */}
          <div className="space-y-2">
            {isMultiSelect && (
              <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-400">
                Multiple Select (Select all that apply)
              </span>
            )}
            <h3 className="text-base font-semibold leading-relaxed text-white">
              {question.question}
            </h3>
          </div>

          {/* Optional Code Snippet */}
          {question.code && (
            <pre className="overflow-x-auto rounded-xl bg-[#0d1117] p-4 text-[12px] font-mono leading-relaxed text-zinc-300 border border-white/[0.04]">
              <code>{question.code}</code>
            </pre>
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option) => {
              const isSelected = selectedAnswers.includes(option.id);
              const isAnswered = answers[question.id] !== undefined;
              const storeAnswer = answers[question.id];
              
              // Handle color display logic during explanations
              let optionClass = "border-white/[0.06] bg-white/[0.02] text-zinc-300 hover:border-white/10 hover:bg-white/[0.04]";
              
              if (isAnswered) {
                const isCorrectOption = Array.isArray(question.correctAnswer)
                  ? question.correctAnswer.includes(option.id)
                  : question.correctAnswer === option.id;
                
                const wasSelected = Array.isArray(storeAnswer)
                  ? storeAnswer.includes(option.id)
                  : storeAnswer === option.id;

                if (isCorrectOption) {
                  optionClass = "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-medium";
                } else if (wasSelected) {
                  optionClass = "border-red-500/30 bg-red-500/10 text-red-300";
                } else {
                  optionClass = "border-white/[0.04] bg-white/[0.01] text-zinc-500";
                }
              } else if (isSelected) {
                optionClass = "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-semibold";
              }

              return (
                <button
                  key={option.id}
                  disabled={showExplanation}
                  onClick={() => handleOptionSelect(option.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm transition-all duration-200",
                    optionClass
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-[11px] font-bold text-zinc-400 uppercase">
                      {option.id}
                    </span>
                    <span className="leading-normal">{option.text}</span>
                  </div>
                  {isAnswered && (
                    Array.isArray(question.correctAnswer)
                      ? question.correctAnswer.includes(option.id)
                      : question.correctAnswer === option.id
                  ) ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="h-3 w-3" />
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </motion.div>
      </Card>

      {/* Explanation Banner & Action Controls */}
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <Card className="border border-emerald-500/10 bg-emerald-500/[0.02] p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-400" />
                  <h4 className="text-sm font-semibold text-emerald-400">Knowledge Check Explanation</h4>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {question.explanation}
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end">
          {!showExplanation ? (
            <Button
              disabled={!hasSelected}
              onClick={handleAnswerSubmit}
              className="gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold hover:opacity-95"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="gap-2 bg-white text-black hover:bg-zinc-200"
            >
              {currentIndex < currentQuestions.length - 1 ? "Next Question" : "View Results"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
