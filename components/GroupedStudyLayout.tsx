import type { ReactNode } from "react";
import { StudySidebar, type StudySidebarItem } from "./StudySidebar";

type GroupedStudyLayoutProps = {
  sidebarTitle: string;
  items: StudySidebarItem[];
  children: ReactNode;
};

export function GroupedStudyLayout({
  sidebarTitle,
  items,
  children,
}: GroupedStudyLayoutProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <StudySidebar title={sidebarTitle} items={items} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
