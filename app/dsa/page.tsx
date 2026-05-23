import { ModeCard } from "@/components/ModeCard";
import { SectionLayout } from "@/components/SectionLayout";

const dsaModes = [
  {
    title: "Pattern Flashcards",
    description: "Study core DS&A patterns with signals, templates, complexity, and voice-over explanations.",
    href: "/dsa/flashcards",
    meta: "17 patterns",
  },
  {
    title: "Problem -> Pattern Quiz",
    description: "See a problem prompt and choose the likely pattern or pattern combination.",
    href: "/dsa/pattern-quiz",
    meta: "Multi-select",
  },
  {
    title: "Code Template Fill-in",
    description: "Fill missing JavaScript syntax in common interview templates.",
    href: "/dsa/templates",
    meta: "JavaScript",
  },
  {
    title: "Complexity Quiz",
    description: "Choose time and space complexity from realistic snippets.",
    href: "/dsa/complexity",
    meta: "Big O",
  },
];

export default function DSAPage() {
  return (
    <SectionLayout
      eyebrow="DS&A practice"
      title="Recognize the pattern before writing the code."
      description="Use these drills to connect problem signals, reusable JavaScript templates, and concise interview explanations."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dsaModes.map((mode) => (
          <ModeCard key={mode.href} {...mode} />
        ))}
      </div>
    </SectionLayout>
  );
}
