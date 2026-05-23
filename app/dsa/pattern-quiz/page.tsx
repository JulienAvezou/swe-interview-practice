import { QuizQuestion } from "@/components/QuizQuestion";
import { GroupedStudyLayout } from "@/components/GroupedStudyLayout";
import { SectionLayout } from "@/components/SectionLayout";
import { dsaProblems } from "@/data/dsaProblems";
import { dsaStudyNavItems } from "@/lib/studyNav";

export default function PatternQuizPage() {
  return (
    <SectionLayout
      eyebrow="Problem -> pattern quiz"
      title="Choose the likely pattern before solving."
      description="Most interview problems become easier once you can name the shape. Some prompts intentionally have more than one correct pattern."
    >
      <GroupedStudyLayout sidebarTitle="DS&A modes" items={dsaStudyNavItems}>
        <QuizQuestion questions={dsaProblems} mode="Problem -> Pattern Quiz" />
      </GroupedStudyLayout>
    </SectionLayout>
  );
}
