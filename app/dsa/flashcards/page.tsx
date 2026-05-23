import { Flashcard } from "@/components/Flashcard";
import { GroupedStudyLayout } from "@/components/GroupedStudyLayout";
import { SectionLayout } from "@/components/SectionLayout";
import { dsaPatterns } from "@/data/dsaPatterns";
import { dsaStudyNavItems } from "@/lib/studyNav";

export default function DSAFlashcardsPage() {
  const items = dsaPatterns.map((pattern) => ({
    id: pattern.id,
    front: pattern.name,
    tag: "Patterns",
    back: (
      <div className="space-y-4">
        <p>{pattern.explanation}</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <InfoList title="When to use" items={pattern.whenToUse} />
          <InfoList title="Signals" items={pattern.signals} />
          <InfoList title="Common problems" items={pattern.commonProblems} />
          <div>
            <h3 className="font-black text-slate-950">Complexity</h3>
            <p className="mt-2 text-slate-700">
              Time: {pattern.complexity.time}; Space: {pattern.complexity.space}
            </p>
          </div>
        </div>
        {pattern.template ? (
          <pre className="overflow-x-auto rounded-lg border-2 border-[#0d1820] bg-ink p-4 text-xs leading-6 text-slate-100 shadow-[0_5px_0_#0d1820]">
            {pattern.template}
          </pre>
        ) : null}
        <div className="rounded-lg border-2 border-line bg-[#fff9df] p-4">
          <h3 className="font-black text-slate-950">Interview voice-over</h3>
          <p className="mt-2 text-slate-700">{pattern.voiceOver}</p>
        </div>
      </div>
    ),
  }));

  return (
    <SectionLayout
      eyebrow="DS&A flashcards"
      title="Memorize pattern signals and explanations."
      description="Reveal each card after trying to recall when to use the pattern, what code shape it uses, and how to explain the complexity."
    >
      <GroupedStudyLayout sidebarTitle="DS&A modes" items={dsaStudyNavItems}>
        <Flashcard items={items} progressPrefix="dsa-pattern" />
      </GroupedStudyLayout>
    </SectionLayout>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-black text-slate-950">{title}</h3>
      <ul className="mt-2 space-y-1 text-slate-700">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}
