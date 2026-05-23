import Link from "next/link";
import { Card } from "./Card";

type ModeCardProps = {
  title: string;
  description: string;
  href: string;
  meta?: string;
};

export function ModeCard({ title, description, href, meta }: ModeCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full transition group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-[0_8px_0_#46a302]">
        <div className="flex h-full flex-col justify-between gap-4">
          <div>
            {meta ? (
              <span className="mb-3 inline-flex rounded-md border-2 border-[#1592cc] bg-lagoon px-2 py-1 text-xs font-black text-white shadow-[0_3px_0_#1592cc]">
                {meta}
              </span>
            ) : null}
            <h2 className="text-lg font-black text-slate-950">{title}</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{description}</p>
          </div>
          <span className="text-sm font-black text-[#46a302]">Start lesson</span>
        </div>
      </Card>
    </Link>
  );
}
