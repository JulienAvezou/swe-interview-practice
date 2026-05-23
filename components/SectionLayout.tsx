import type { ReactNode } from "react";

type SectionLayoutProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function SectionLayout({
  eyebrow,
  title,
  description,
  children,
}: SectionLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="mb-2 inline-flex rounded-md border-2 border-[#e7c531] bg-banana px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-950 shadow-[0_3px_0_#e7c531]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-base font-medium leading-7 text-slate-700">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
