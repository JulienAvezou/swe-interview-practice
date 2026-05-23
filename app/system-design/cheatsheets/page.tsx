import { CheatsheetBrowser } from "@/components/CheatsheetBrowser";
import { GroupedStudyLayout } from "@/components/GroupedStudyLayout";
import { SectionLayout } from "@/components/SectionLayout";
import { systemDesignCheatsheets } from "@/data/systemDesignCheatsheets";
import { systemDesignStudyNavItems } from "@/lib/studyNav";

export default function CheatsheetsPage() {
  return (
    <SectionLayout
      eyebrow="System design cheatsheets"
      title="Review common interview systems quickly."
      description="Each cheatsheet is structured around requirements, architecture, storage, caching, events, bottlenecks, tradeoffs, failure modes, and talking points."
    >
      <GroupedStudyLayout
        sidebarTitle="System design modes"
        items={systemDesignStudyNavItems}
      >
        <CheatsheetBrowser cheatsheets={systemDesignCheatsheets} />
      </GroupedStudyLayout>
    </SectionLayout>
  );
}
