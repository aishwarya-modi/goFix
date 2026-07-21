import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizQuestion, QuizAttempt, QuizDashboardData, Achievement } from "../lib/quiz/types";
import { getLevelFromXP, XP_REWARDS } from "../lib/quiz/types";

interface QuizState {
  currentQuestions: QuizQuestion[];
  currentTopic: string | null;
  answers: Record<string, string | string[]>;
  showExplanation: boolean;
  score: number;
  isComplete: boolean;
  startTime: number;
  
  // Persistent metrics
  attempts: QuizAttempt[];
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  unlockedAchievements: string[];

  // Actions
  startQuiz: (topic: string, questions: QuizQuestion[]) => void;
  submitAnswer: (questionId: string, answer: string | string[]) => void;
  finishQuiz: () => QuizAttempt;
  resetQuiz: () => void;
  addXP: (amount: number) => void;
  checkAchievements: () => string[];
  getDashboardData: (totalTopicsCount: number) => QuizDashboardData;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentQuestions: [],
      currentTopic: null,
      answers: {},
      showExplanation: false,
      score: 0,
      isComplete: false,
      startTime: 0,
      
      attempts: [],
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      unlockedAchievements: [],

      startQuiz: (topic, questions) => set({ 
        currentTopic: topic, 
        currentQuestions: questions, 
        answers: {}, 
        showExplanation: false,
        score: 0,
        isComplete: false,
        startTime: Date.now()
      }),

      submitAnswer: (questionId, answer) => {
        const { currentQuestions, answers } = get();
        const question = currentQuestions.find(q => q.id === questionId);
        
        let isCorrect = false;
        if (question) {
          if (Array.isArray(answer)) {
            isCorrect = Array.isArray(question.correctAnswer) && 
              answer.length === question.correctAnswer.length &&
              answer.every(val => question.correctAnswer.includes(val));
          } else {
            isCorrect = answer === question.correctAnswer;
          }
        }

        set({ 
          answers: { ...answers, [questionId]: answer },
          score: get().score + (isCorrect ? (question?.points || 0) : 0),
          showExplanation: true 
        });
      },

      finishQuiz: () => {
        const { currentTopic, currentQuestions, answers, score, startTime, attempts, xp } = get();
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        
        let correctCount = 0;
        let wrongCount = 0;
        
        currentQuestions.forEach(q => {
          const ans = answers[q.id];
          if (!ans) return;
          const isCorrect = Array.isArray(ans) 
            ? Array.isArray(q.correctAnswer) && ans.length === q.correctAnswer.length && ans.every(v => q.correctAnswer.includes(v))
            : ans === q.correctAnswer;
          
          if (isCorrect) correctCount++;
          else wrongCount++;
        });

        const totalPoints = currentQuestions.reduce((sum, q) => sum + q.points, 0);
        const skippedCount = currentQuestions.length - Object.keys(answers).length;

        const attempt: QuizAttempt = {
          topicSlug: currentTopic || "",
          score,
          totalPoints,
          correctCount,
          wrongCount,
          skippedCount,
          timeTaken,
          answers,
          completedAt: new Date().toISOString(),
          mode: "normal"
        };

        // XP calculation
        let earnedXP = XP_REWARDS.QUIZ_PASSED;
        const accuracy = totalPoints > 0 ? (score / totalPoints) * 100 : 0;
        
        if (accuracy === 100) {
          earnedXP += XP_REWARDS.PERFECT_SCORE;
          const alreadyPassed = attempts.some(a => a.topicSlug === currentTopic && a.score === a.totalPoints);
          if (!alreadyPassed) {
            earnedXP += XP_REWARDS.FIRST_ATTEMPT_PERFECT;
          }
        }

        // Streak check
        let newStreak = get().streak;
        const todayStr = new Date().toDateString();
        const lastActiveStr = get().lastActiveDate;

        if (lastActiveStr !== todayStr) {
          if (lastActiveStr) {
            const lastActiveDate = new Date(lastActiveStr);
            const diffTime = Math.abs(new Date().getTime() - lastActiveDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays <= 1) {
              newStreak += 1;
              earnedXP += XP_REWARDS.DAILY_STREAK;
            } else {
              newStreak = 1;
            }
          } else {
            newStreak = 1;
          }
        }

        const newAttempts = [...attempts, attempt];
        const newXP = xp + earnedXP;

        set({ 
          attempts: newAttempts,
          xp: newXP,
          streak: newStreak,
          lastActiveDate: todayStr,
          isComplete: true 
        });

        // Trigger achievement check
        get().checkAchievements();

        return attempt;
      },

      resetQuiz: () => set({ answers: {}, showExplanation: false, score: 0, isComplete: false }),
      
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),

      checkAchievements: () => {
        const { getDashboardData, unlockedAchievements, attempts } = get();
        // Standard topics size is 172
        const stats = getDashboardData(172);
        
        const newAchievements: string[] = [];
        
        const ruleAchievements = [
          { id: "first_quiz", title: "First Step", condition: () => attempts.length >= 1 },
          { id: "five_quizzes", title: "Persistent Learner", condition: () => attempts.length >= 5 },
          { id: "perfect_quiz", title: "Flawless Execution", condition: () => attempts.some(a => a.correctCount === a.correctCount + a.wrongCount && a.correctCount > 0) },
          { id: "streak_3", title: "On Fire", condition: () => stats.currentStreak >= 3 },
          { id: "level_5", title: "Rising Star", condition: () => stats.level >= 5 },
          { id: "accuracy_90", title: "Sharp Mind", condition: () => stats.quizAccuracy >= 90 && attempts.length >= 3 },
        ];

        ruleAchievements.forEach(ach => {
          if (!unlockedAchievements.includes(ach.id) && ach.condition()) {
            newAchievements.push(ach.id);
          }
        });

        if (newAchievements.length > 0) {
          set({ unlockedAchievements: [...unlockedAchievements, ...newAchievements] });
        }

        return newAchievements;
      },

      getDashboardData: (totalTopicsCount) => {
        const { attempts, xp, streak } = get();
        const levelData = getLevelFromXP(xp);

        const topicsCompleted = new Set(attempts.filter(a => a.score / a.totalPoints >= 0.7).map(a => a.topicSlug)).size;
        
        let totalCorrect = 0;
        let totalAnswered = 0;
        let totalScore = 0;
        let totalTime = 0;

        attempts.forEach(a => {
          totalCorrect += a.correctCount;
          totalAnswered += (a.correctCount + a.wrongCount);
          totalScore += a.score;
          totalTime += a.timeTaken;
        });

        const quizAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

        // Weakest/best topic finder
        const topicStats: Record<string, { correct: number; total: number }> = {};
        attempts.forEach(a => {
          if (!topicStats[a.topicSlug]) {
            topicStats[a.topicSlug] = { correct: 0, total: 0 };
          }
          topicStats[a.topicSlug].correct += a.correctCount;
          topicStats[a.topicSlug].total += (a.correctCount + a.wrongCount);
        });

        let bestTopic = "None yet";
        let bestAcc = -1;
        let weakestTopic = "None yet";
        let weakestAcc = 101;

        Object.entries(topicStats).forEach(([slug, s]) => {
          const acc = s.total > 0 ? (s.correct / s.total) * 100 : 0;
          if (acc > bestAcc) {
            bestAcc = acc;
            bestTopic = slug;
          }
          if (acc < weakestAcc) {
            weakestAcc = acc;
            weakestTopic = slug;
          }
        });

        // Weekly progress mock data mapped to actual recent attempts
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weeklyProgress = days.map(day => {
          // Find attempts on this day in current week
          const count = attempts.filter(a => {
            const date = new Date(a.completedAt);
            return days[date.getDay()] === day;
          }).length;
          
          const score = attempts.filter(a => {
            const date = new Date(a.completedAt);
            return days[date.getDay()] === day;
          }).reduce((sum, a) => sum + a.score, 0);

          return { day, score, count };
        });

        return {
          topicsCompleted,
          totalTopics: totalTopicsCount,
          quizAccuracy,
          currentStreak: streak,
          xp,
          level: levelData.level,
          levelTitle: levelData.title,
          totalScore,
          bestTopic: bestTopic.replace(/-/g, " "),
          weakestTopic: weakestTopic.replace(/-/g, " "),
          hoursStudied: Math.round(totalTime / 3600 * 10) / 10 || 0,
          weeklyProgress,
          quizScores: attempts.map(a => ({ topic: a.topicSlug, score: a.score })),
          completionPercent: totalTopicsCount > 0 ? Math.round((topicsCompleted / totalTopicsCount) * 100) : 0
        };
      }
    }),
    {
      name: "gofix-quiz-state",
      partialize: (state) => ({
        attempts: state.attempts,
        xp: state.xp,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
        unlockedAchievements: state.unlockedAchievements,
      })
    }
  )
);
