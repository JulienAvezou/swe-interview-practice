"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/dsa", label: "DS&A" },
  { href: "/system-design", label: "System Design" },
  { href: "/explain-back", label: "Explain Back" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 text-sm font-bold text-slate-700">
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "rounded-md border-2 border-[#46a302] bg-accent px-3 py-2 text-white shadow-[0_4px_0_#46a302] transition"
                : "rounded-md border-2 border-line bg-white px-3 py-2 shadow-[0_3px_0_#d7e7df] transition hover:-translate-y-0.5 hover:border-accent hover:text-slate-950 hover:shadow-[0_4px_0_#46a302]"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
