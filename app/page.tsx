"use client";

import { Card } from "@/components/Card";
import { ModeCard } from "@/components/ModeCard";
import { ProgressBadge } from "@/components/ProgressBadge";
import { SectionLayout } from "@/components/SectionLayout";
import { useProgress } from "@/lib/progress";

const modes = [
  {
    title: "DS&A Pattern Flashcards",
    description:
      "Recall pattern signals, templates, complexities, and interview explanations.",
    href: "/dsa/flashcards",
    meta: "Retrieval",
  },
  {
    title: "Problem -> Pattern Quiz",
    description:
      "Practice mapping common prompts to likely patterns before coding.",
    href: "/dsa/pattern-quiz",
    meta: "Recognition",
  },
  {
    title: "Code Template Fill-in",
    description:
      "Build JavaScript template fluency by filling missing core lines.",
    href: "/dsa/templates",
    meta: "Fluency",
  },
  {
    title: "Complexity Quiz",
    description: "Identify time and space complexity from code snippets.",
    href: "/dsa/complexity",
    meta: "Analysis",
  },
  {
    title: "System Design Cheatsheets",
    description: "Review concise interview plans for common product systems.",
    href: "/system-design/cheatsheets",
    meta: "Design",
  },
  {
    title: "System Design Flashcards",
    description:
      "Memorize core distributed systems concepts and interview phrasing.",
    href: "/system-design/flashcards",
    meta: "Concepts",
  },
  {
    title: "System Design Tradeoff Quiz",
    description: "Choose designs under realistic constraints and review why.",
    href: "/system-design/tradeoffs",
    meta: "Tradeoffs",
  },
  {
    title: "Explain-Back Mode",
    description:
      "Write interview-style explanations and compare with model answers.",
    href: "/explain-back",
    meta: "Speaking",
  },
];

const thinkingEngineerToolkitUrl =
  "https://javz.gumroad.com/l/the-thinking-engineer-toolkit";

export default function DashboardPage() {
  const { summary } = useProgress();

  return (
    <SectionLayout
      eyebrow="Study dashboard"
      title="Practice pattern recognition, templates, and interview explanations."
      description="This trainer focuses on remembering the core reusable shapes behind interview problems instead of completing thousands of problems without any structure."
    >
      <div className="space-y-6">
        <ProgressBadge />

        <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
          <div className="grid gap-4 sm:grid-cols-2">
            {modes.map((mode) => (
              <ModeCard key={mode.href} {...mode} />
            ))}
          </div>

          <div className="space-y-5">
            <Card>
              <h2 className="text-lg font-black text-slate-950">Quick start</h2>
              <div className="mt-4 grid gap-3">
                <a
                  className="rounded-md border-2 border-[#46a302] bg-accent px-4 py-2 text-center text-sm font-black text-white shadow-[0_4px_0_#46a302] transition hover:-translate-y-0.5"
                  href="/dsa/pattern-quiz"
                >
                  Take a pattern quiz
                </a>
                <a
                  className="rounded-md border-2 border-line bg-white px-4 py-2 text-center text-sm font-bold text-slate-700 shadow-[0_3px_0_#d7e7df] transition hover:border-accent"
                  href="/dsa/templates"
                >
                  Drill code templates
                </a>
                <a
                  className="rounded-md border-2 border-line bg-white px-4 py-2 text-center text-sm font-bold text-slate-700 shadow-[0_3px_0_#d7e7df] transition hover:border-accent"
                  href="/explain-back"
                >
                  Practice explain-back
                </a>
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-black text-slate-950">Weak areas</h2>
              {summary.weakAreas.length ? (
                <div className="mt-4 space-y-3">
                  {summary.weakAreas.map(([area, count]) => (
                    <div key={area}>
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="font-bold text-slate-700">{area}</span>
                        <span className="font-black text-coral">{count}</span>
                      </div>
                      <div className="mt-2 h-3 rounded-full bg-[#ecf4e8]">
                        <div
                          className="h-3 rounded-full bg-coral"
                          style={{ width: `${Math.min(100, count * 18)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  Missed quiz answers will appear here after practice.
                </p>
              )}
            </Card>

            <Card className="border-[#1592cc] bg-[#eef9ff] shadow-[0_5px_0_#1592cc]">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border-2 border-[#e7c531] bg-banana text-xl font-black text-slate-950 shadow-[0_3px_0_#e7c531]">
                  T
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1592cc]">
                    Free Toolkit
                  </p>
                  <h2 className="mt-1 text-lg font-black text-slate-950">
                    Thinking Engineer Toolkit
                  </h2>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                    Set healthy engineering practices in your daily workflow.
                  </p>
                </div>
              </div>
              <a
                className="mt-4 block rounded-md border-2 border-[#1592cc] bg-lagoon px-4 py-2 text-center text-sm font-black text-white shadow-[0_4px_0_#1592cc] transition hover:-translate-y-0.5"
                href={thinkingEngineerToolkitUrl}
                target="_blank"
                rel="noreferrer"
              >
                Explore the toolkit
              </a>
            </Card>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
