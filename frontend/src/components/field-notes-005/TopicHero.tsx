type TopicHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function TopicHero({ eyebrow, title, subtitle }: TopicHeroProps) {
  return (
    <header className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">{eyebrow}</p>
      <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
      <p className="max-w-2xl text-lg text-slate-300">{subtitle}</p>
    </header>
  );
}
