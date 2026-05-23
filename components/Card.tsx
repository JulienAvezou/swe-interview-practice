import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-lg border-2 border-line bg-panel p-5 shadow-[0_5px_0_#d7e7df] ${className}`}
    >
      {children}
    </section>
  );
}
