import { ComplexityExercise } from "@/components/ComplexityExercise";
import { GroupedStudyLayout } from "@/components/GroupedStudyLayout";
import { SectionLayout } from "@/components/SectionLayout";
import { complexityQuestions } from "@/data/complexityQuestions";
import { dsaStudyNavItems } from "@/lib/studyNav";

export default function ComplexityPage() {
  return (
    <SectionLayout
      eyebrow="Complexity quiz"
      title="Read code and call out Big O clearly."
      description="Choose both time and space complexity, then compare against the interview-style explanation."
    >
      <GroupedStudyLayout sidebarTitle="DS&A modes" items={dsaStudyNavItems}>
        <ComplexityExercise questions={complexityQuestions} />
      </GroupedStudyLayout>
    </SectionLayout>
  );
}
