import { fundamentalsQuestions } from "./fundamentals";
import { intermediateQuestions } from "./intermediate";
import { advancedQuestions } from "./advanced";
import { packagesQuestions } from "./packages";
import { toolsQuestions } from "./tools";
import { frameworksQuestions } from "./frameworks";
import { testingQuestions } from "./testing";
import { projectsQuestions } from "./projects";
import type { QuizQuestion } from "../types";

export const allQuestions: Record<string, QuizQuestion[]> = {
  ...fundamentalsQuestions,
  ...intermediateQuestions,
  ...advancedQuestions,
  ...packagesQuestions,
  ...toolsQuestions,
  ...frameworksQuestions,
  ...testingQuestions,
  ...projectsQuestions,
};

export const categoryQuestions: Record<string, Record<string, QuizQuestion[]>> = {
  fundamentals: fundamentalsQuestions,
  intermediate: intermediateQuestions,
  advanced: advancedQuestions,
  packages: packagesQuestions,
  tools: toolsQuestions,
  frameworks: frameworksQuestions,
  testing: testingQuestions,
  projects: projectsQuestions,
};

export function getQuestionsForTopic(slug: string): QuizQuestion[] {
  return allQuestions[slug] || [];
}

export function getQuestionsForCategory(category: string): Record<string, QuizQuestion[]> {
  return categoryQuestions[category] || {};
}

export function getAllTopicSlugs(): string[] {
  return Object.keys(allQuestions);
}

export function getQuizStats(slug: string) {
  const qs = allQuestions[slug] || [];
  const easy = qs.filter(q => q.difficulty === "easy").length;
  const medium = qs.filter(q => q.difficulty === "medium").length;
  const hard = qs.filter(q => q.difficulty === "hard").length;
  const points = qs.reduce((sum, q) => sum + q.points, 0);
  return { total: qs.length, easy, medium, hard, points };
}
