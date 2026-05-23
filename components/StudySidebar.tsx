"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type StudySidebarItem = {
  href: string;
  label: string;
  description: string;
};

type StudySidebarProps = {
  title: string;
  items: StudySidebarItem[];
};

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function StudySidebar({ title, items }: StudySidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-lg border-2 border-line bg-white p-4 shadow-[0_5px_0_#d7e7df]">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#46a302]">
          {title}
        </p>
        <nav className="mt-4 grid gap-2">
          {items.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-md border-2 border-[#46a302] bg-[#eeffe8] p-3 shadow-[0_4px_0_#46a302]"
                    : "rounded-md border-2 border-line bg-white p-3 shadow-[0_3px_0_#d7e7df] transition hover:-translate-y-0.5 hover:border-accent"
                }
              >
                <span className="block text-sm font-black text-slate-950">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs font-medium leading-5 text-slate-600">
                  {item.description}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
