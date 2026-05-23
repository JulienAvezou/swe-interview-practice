import { ExplainBackExercise } from "@/components/ExplainBackExercise";
import { SectionLayout } from "@/components/SectionLayout";
import { explainBackPrompts } from "@/data/explainBackPrompts";

export default function ExplainBackPage() {
  return (
    <SectionLayout
      eyebrow="Explain-back mode"
      title="Practice saying the reasoning out loud."
      description="Write the explanation you would give in an interview, then compare it with a model answer and a short checklist."
    >
      <ExplainBackExercise prompts={explainBackPrompts} />
    </SectionLayout>
  );
}
