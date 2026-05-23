import { GroupedStudyLayout } from "@/components/GroupedStudyLayout";
import { QuizQuestion } from "@/components/QuizQuestion";
import { SectionLayout } from "@/components/SectionLayout";
import { systemDesignTradeoffs } from "@/data/systemDesignTradeoffs";
import { systemDesignStudyNavItems } from "@/lib/studyNav";

export default function TradeoffsPage() {
  const questions = systemDesignTradeoffs.map((question) => ({
    id: question.id,
    prompt: question.question,
    options: question.options,
    correctAnswers: [question.correctAnswer],
    explanation: question.explanation,
  }));

  return (
    <SectionLayout
      eyebrow="Tradeoff quiz"
      title="Choose the architecture move that fits the constraint."
      description="These scenarios emphasize the reasoning behind common design choices, not memorized diagrams."
    >
      <GroupedStudyLayout
        sidebarTitle="System design modes"
        items={systemDesignStudyNavItems}
      >
        <QuizQuestion
          questions={questions}
          mode="System Design Tradeoff Quiz"
          multiSelect={false}
        />
      </GroupedStudyLayout>
    </SectionLayout>
  );
}
