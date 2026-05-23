import type { StudySidebarItem } from "@/components/StudySidebar";

export const dsaStudyNavItems: StudySidebarItem[] = [
  {
    href: "/dsa/flashcards",
    label: "Pattern Flashcards",
    description: "Signals, templates, complexity, and voice-over practice.",
  },
  {
    href: "/dsa/pattern-quiz",
    label: "Problem -> Pattern Quiz",
    description: "Map prompts to likely reusable patterns.",
  },
  {
    href: "/dsa/templates",
    label: "Code Template Fill-in",
    description: "Build JavaScript template fluency.",
  },
  {
    href: "/dsa/complexity",
    label: "Complexity Quiz",
    description: "Identify time and space complexity.",
  },
];

export const systemDesignStudyNavItems: StudySidebarItem[] = [
  {
    href: "/system-design/cheatsheets",
    label: "Cheatsheets",
    description: "System requirements, architecture, and tradeoffs.",
  },
  {
    href: "/system-design/flashcards",
    label: "Flashcards",
    description: "Core distributed systems concepts.",
  },
  {
    href: "/system-design/tradeoffs",
    label: "Tradeoff Quiz",
    description: "Scenario-based architecture decisions.",
  },
];
