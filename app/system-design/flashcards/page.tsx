import { Flashcard } from "@/components/Flashcard";
import { GroupedStudyLayout } from "@/components/GroupedStudyLayout";
import { SectionLayout } from "@/components/SectionLayout";
import { systemDesignConcepts } from "@/data/systemDesignConcepts";
import { systemDesignStudyNavItems } from "@/lib/studyNav";

export default function SystemDesignFlashcardsPage() {
  const items = systemDesignConcepts.map((concept) => ({
    id: concept.id,
    front: concept.concept,
    tag: "Concept",
    back: (
      <div className="grid gap-4 md:grid-cols-2">
        <InfoBlock title="Plain English" value={concept.explanation} />
        <InfoBlock title="When it matters" value={concept.whenItMatters} />
        <InfoBlock title="Interview phrase" value={concept.interviewPhrase} />
        <InfoBlock title="Example usage" value={concept.exampleUsage} />
      </div>
    ),
  }));

  return (
    <SectionLayout
      eyebrow="System design flashcards"
      title="Recall concepts in interview language."
      description="Try to explain each concept before revealing the plain-English answer, common phrasing, and example usage."
    >
      <GroupedStudyLayout
        sidebarTitle="System design modes"
        items={systemDesignStudyNavItems}
      >
        <Flashcard
          items={items}
          progressPrefix="system-concept"
          recallPrompt="Recall what the concept means, when it matters, where it appears in a system design interview, and a concrete example before revealing."
        />
      </GroupedStudyLayout>
    </SectionLayout>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <section className="rounded-lg border-2 border-line bg-[#f7fff0] p-4">
      <h3 className="text-sm font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{value}</p>
    </section>
  );
}
