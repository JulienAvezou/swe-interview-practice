import type { Metadata } from "next";
import Link from "next/link";
import { TopNav } from "@/components/TopNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interview Pattern Trainer",
  description:
    "Practice coding interview patterns, code templates, complexity, and system design concepts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen bg-[#f6fff0] bg-[linear-gradient(180deg,#e8ffe0_0,#f6fff0_18rem,#fff8dc_100%)]">
          <header className="sticky top-0 z-20 border-b-4 border-line bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-slate-950">
                <span className="grid h-10 w-10 place-items-center rounded-md border-2 border-[#46a302] bg-accent text-sm font-black text-white shadow-[0_4px_0_#46a302]">
                  IP
                </span>
                <span>Interview Pattern Trainer</span>
              </Link>
              <TopNav />
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
