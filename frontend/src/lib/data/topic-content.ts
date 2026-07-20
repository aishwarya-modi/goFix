import { fundamentalsContent } from "./content/fundamentals";
import { intermediateContent } from "./content/intermediate";
import { advancedContent } from "./content/advanced";
import { packagesContent } from "./content/packages";
import { toolsContent } from "./content/tools";
import { frameworksContent } from "./content/frameworks";
import { testingContent } from "./content/testing";
import { projectsContent } from "./content/projects";

export interface TopicContent {
  slug: string;
  title: string;
  summary: string;
  description: string;
  keyPoints: string[];
  codeExamples: {
    title: string;
    description: string;
    bad: string;
    good: string;
    explanation: string;
  }[];
  bestPractices: string[];
  commonMistakes: string[];
  relatedTopics: string[];
  externalResources: { title: string; url: string }[];
}

export const topicContent: Record<string, TopicContent> = {
  ...fundamentalsContent,
  ...intermediateContent,
  ...advancedContent,
  ...packagesContent,
  ...toolsContent,
  ...frameworksContent,
  ...testingContent,
  ...projectsContent,
};

export function getTopicContent(slug: string): TopicContent | undefined {
  return topicContent[slug];
}

export function getAvailableContentSlugs(): string[] {
  return Object.keys(topicContent);
}
