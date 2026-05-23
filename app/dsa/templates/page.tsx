import { CodeTemplateExercise } from "@/components/CodeTemplateExercise";
import { GroupedStudyLayout } from "@/components/GroupedStudyLayout";
import { SectionLayout } from "@/components/SectionLayout";
import { codeTemplates } from "@/data/codeTemplates";
import { dsaStudyNavItems } from "@/lib/studyNav";

export default function TemplatesPage() {
  return (
    <SectionLayout
      eyebrow="Code template fill-in"
      title="Build JavaScript template fluency."
      description="Fill in the missing pieces of common interview templates. Answers are normalized for whitespace so the drill stays focused on the important code."
    >
      <GroupedStudyLayout sidebarTitle="DS&A modes" items={dsaStudyNavItems}>
        <CodeTemplateExercise templates={codeTemplates} />
      </GroupedStudyLayout>
    </SectionLayout>
  );
}
