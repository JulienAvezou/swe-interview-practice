import { ModeCard } from "@/components/ModeCard";
import { SectionLayout } from "@/components/SectionLayout";

const modes = [
  {
    title: "System Design Cheatsheets",
    description: "Review system requirements, architecture, storage, caching, queues, bottlenecks, and talking points.",
    href: "/system-design/cheatsheets",
    meta: "10 systems",
  },
  {
    title: "System Design Flashcards",
    description: "Practice core distributed systems concepts in plain English.",
    href: "/system-design/flashcards",
    meta: "20 concepts",
  },
  {
    title: "Tradeoff Quiz",
    description: "Answer scenario questions about consistency, caching, queues, WebSockets, and scaling.",
    href: "/system-design/tradeoffs",
    meta: "Scenarios",
  },
];

export default function SystemDesignPage() {
  return (
    <SectionLayout
      eyebrow="System design practice"
      title="Build crisp mental models for design interviews."
      description="Study reusable concepts and system templates, then practice explaining the tradeoffs behind common architecture decisions."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {modes.map((mode) => (
          <ModeCard key={mode.href} {...mode} />
        ))}
      </div>
    </SectionLayout>
  );
}
