interface SectionIntroProps {
  eyebrow: string;
  title: string;
  /** Large accent statement line under the headline. */
  statement?: string;
}

/** Narrow-column section intro: small-caps eyebrow, giant cream display
 * headline (hero Inter treatment), dusk-pink statement subhead. */
export function SectionIntro({ eyebrow, title, statement }: SectionIntroProps) {
  return (
    <header>
      <p
        data-reveal
        className="text-xs font-semibold uppercase tracking-[0.3em] text-accent"
      >
        {eyebrow}
      </p>
      <h2
        data-reveal
        className="mt-4 text-5xl font-extrabold uppercase leading-[0.92] sm:text-6xl xl:text-7xl"
      >
        {title}
      </h2>
      {statement && (
        <p data-reveal className="mt-6 text-2xl font-extrabold leading-snug text-dusk sm:text-3xl">
          {statement}
        </p>
      )}
    </header>
  );
}
