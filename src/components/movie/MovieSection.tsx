import type { ReactNode } from 'react';

interface MovieSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function MovieSection({ title, children, className }: MovieSectionProps) {
  return (
    <section className={className}>
      <h2 className="mb-7 text-3xl font-extrabold tracking-normal md:text-4xl">{title}</h2>
      {children}
    </section>
  );
}
