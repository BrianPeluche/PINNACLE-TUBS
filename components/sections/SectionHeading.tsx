interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

/** Eyebrow + large display heading in the hero's Inter treatment. */
export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <header className="max-w-4xl">
      <p
        data-reveal
        className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent"
      >
        {eyebrow}
      </p>
      <h2
        data-reveal
        className="text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
      >
        {title}
      </h2>
    </header>
  );
}
